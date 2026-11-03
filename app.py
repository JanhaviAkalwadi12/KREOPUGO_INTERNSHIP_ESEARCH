import os
import sys
import json
from pathlib import Path
from flask import Flask, render_template, abort, send_from_directory, jsonify, request

BASE_DIR = Path(__file__).resolve().parent
TEMPLATE_DIR = BASE_DIR / "templates"
STATIC_DIR = BASE_DIR / "static"
DATA_DIR = BASE_DIR / "data"

app = Flask(
    __name__,
    template_folder=str(TEMPLATE_DIR),
    static_folder=str(STATIC_DIR),
    static_url_path="/static"
)

class VercelPathMiddleware:
    def __init__(self, wsgi_app):
        self.wsgi_app = wsgi_app

    def __call__(self, environ, start_response):
        if "debug=1" in environ.get("QUERY_STRING", ""):
            headers = {k: str(v) for k, v in environ.items() if isinstance(v, (str, int, bool))}
            data = json.dumps(headers, indent=2).encode("utf-8")
            start_response("200 OK", [("Content-Type", "application/json"), ("Content-Length", str(len(data)))])
            return [data]

        matched = (
            environ.get("HTTP_X_MATCHED_PATH")
            or environ.get("HTTP_X_FORWARDED_URI")
            or environ.get("HTTP_X_ORIGINAL_URL")
        )
        if matched:
            path_only = matched.split("?")[0]
            environ["PATH_INFO"] = path_only
        elif environ.get("PATH_INFO") in ("/api/index.py", "/api/index", "/api", "/api/"):
            environ["PATH_INFO"] = "/"

        return self.wsgi_app(environ, start_response)

app.wsgi_app = VercelPathMiddleware(app.wsgi_app)

def _get_template_map():
    mapping = {}
    if TEMPLATE_DIR.is_dir():
        for file_path in TEMPLATE_DIR.iterdir():
            if file_path.is_file() and file_path.suffix.lower() == ".html":
                mapping[file_path.name.lower()] = file_path.name
                mapping[file_path.stem.lower()] = file_path.name
    return mapping

TEMPLATE_MAP = _get_template_map()

@app.route("/")
@app.route("/index")
@app.route("/index.html")
@app.route("/land")
@app.route("/land.html")
@app.route("/api/index")
@app.route("/api/index.py")
def home():
    return render_template("land.html")

@app.route("/<path:page>")
def show_page(page):
    clean_page = page.strip("/").strip()
    page_lower = clean_page.lower()

    if page_lower in ("index", "index.html", "land", "land.html", "home", "home.html", "api/index", "api/index.py"):
        return render_template("land.html")

    template_map = _get_template_map() if not TEMPLATE_MAP else TEMPLATE_MAP

    if page_lower in template_map:
        return render_template(template_map[page_lower])

    if not page_lower.endswith(".html"):
        with_html = page_lower + ".html"
        if with_html in template_map:
            return render_template(template_map[with_html])

    return render_template("land.html")

@app.route("/data/<path:filename>")
def serve_data(filename):
    return send_from_directory(str(DATA_DIR), filename)

@app.route("/api/places")
def api_places():
    places_file = DATA_DIR / "places.json"
    if places_file.is_file():
        with open(places_file, "r", encoding="utf-8") as f:
            return app.response_class(f.read(), mimetype="application/json")
    abort(404)

@app.route("/favicon.ico")
def favicon():
    icon_path = STATIC_DIR / "favicon.ico"
    if icon_path.is_file():
        return send_from_directory(str(STATIC_DIR), "favicon.ico")
    return ("", 204)

@app.route("/health")
@app.route("/api/health")
def health_check():
    return jsonify({"status": "healthy", "project": "DharwadSearch"}), 200

@app.errorhandler(404)
def not_found(e):
    return render_template("land.html"), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
