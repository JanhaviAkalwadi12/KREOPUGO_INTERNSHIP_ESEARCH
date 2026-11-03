from pathlib import Path
from flask import Flask, render_template, abort, send_from_directory, jsonify

# Base directory for reliable resolution on Vercel and local runs
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

def _get_template_map():
    """Build a case-insensitive map of templates for Linux/Vercel compatibility."""
    mapping = {}
    if TEMPLATE_DIR.is_dir():
        for file_path in TEMPLATE_DIR.iterdir():
            if file_path.is_file() and file_path.suffix.lower() == ".html":
                mapping[file_path.name.lower()] = file_path.name
                mapping[file_path.stem.lower()] = file_path.name
    return mapping

# Cache template mapping at startup
TEMPLATE_MAP = _get_template_map()

@app.route("/")
@app.route("/index")
@app.route("/index.html")
@app.route("/land")
@app.route("/land.html")
def home():
    """Render the primary landing page."""
    return render_template("land.html")

@app.route("/<path:page>")
def show_page(page):
    """Serve any template with case-insensitivity and extension flexibility."""
    clean_page = page.strip("/").strip()
    page_lower = clean_page.lower()

    # Route landing page aliases
    if page_lower in ("index", "index.html", "land", "land.html", "home", "home.html"):
        return render_template("land.html")

    # Match against template mapping
    template_map = _get_template_map() if not TEMPLATE_MAP else TEMPLATE_MAP

    if page_lower in template_map:
        return render_template(template_map[page_lower])

    if not page_lower.endswith(".html"):
        with_html = page_lower + ".html"
        if with_html in template_map:
            return render_template(template_map[with_html])

    abort(404)

@app.route("/data/<path:filename>")
def serve_data(filename):
    """Serve files from data folder."""
    return send_from_directory(str(DATA_DIR), filename)

@app.route("/api/places")
def api_places():
    """API endpoint providing places data."""
    places_file = DATA_DIR / "places.json"
    if places_file.is_file():
        with open(places_file, "r", encoding="utf-8") as f:
            return app.response_class(f.read(), mimetype="application/json")
    abort(404)

@app.route("/favicon.ico")
def favicon():
    """Handle browser favicon request gracefully."""
    icon_path = STATIC_DIR / "favicon.ico"
    if icon_path.is_file():
        return send_from_directory(str(STATIC_DIR), "favicon.ico")
    return ("", 204)

@app.route("/health")
@app.route("/api/health")
def health_check():
    """Deployment health check endpoint."""
    return jsonify({"status": "healthy", "project": "DharwadSearch"}), 200

@app.errorhandler(404)
def not_found(e):
    """Graceful 404 handler rendering landing page."""
    return render_template("land.html"), 404

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
