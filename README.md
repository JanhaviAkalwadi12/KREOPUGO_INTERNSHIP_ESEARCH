# DharwadaSearch — Student Project (Vercel Ready)

**DharwadaSearch** is a web portal showcasing the heritage, education, food, culture, tourism, healthcare, and institutions of Dharwad ("Vidya Kashi"), Karnataka.

---

## 🚀 Features

- **Landing Page (`/` or `/index.html`):** Clean welcoming portal introducing Vidya Kashi Dharwada.
- **Main Portal (`/Main.html`):** Category explorer, interactive places guide, Dharwad Mitra assistant, and quick links.
- **Detailed Category Pages:** Emergency, Healthcare, Education, Food & Dharwad Peda, History, Literature, Hindustani Classical Music, Hotels, Banking, Government Services, Jobs, and Transport.
- **Vercel Serverless Ready:** Pre-configured with WSGI entrypoint (`api/index.py`), modern routing rewrite in `vercel.json`, and Linux case-insensitive template resolution.

---

## 🛠️ Technology Stack

- **Backend:** Python 3 (Flask)
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla ES6+)
- **Data:** JSON (`data/places.json`)
- **Deployment Platform:** Vercel (Serverless Functions)

---

## 📁 Project Structure

```text
DharwadSearch_Mentor_Format/
├── api/
│   └── index.py            # Vercel Serverless Function WSGI entrypoint
├── data/
│   └── places.json         # Places dataset
├── static/
│   ├── css/
│   │   ├── features.css    # Feature styles and components
│   │   ├── health.css      # Health section styles
│   │   └── style.css       # Core design stylesheet
│   ├── images/             # Media assets categorized by section
│   └── js/
│       ├── features.js     # Interactive UI features, quizzes, and planner
│       └── script.js       # Core scripts and navigation
├── templates/
│   ├── land.html           # Original landing page
│   ├── index.html          # Landing page entrypoint
│   ├── Main.html           # Main explore hub
│   └── *.html              # Category and informational pages
├── app.py                  # Flask application with case-insensitive routing
├── requirements.txt        # Python dependencies for Vercel
├── package.json            # Deployment scripts and project metadata
├── vercel.json             # Vercel deployment and routing configuration
├── .vercelignore           # Excluded files for clean production deployment
├── .gitignore              # Git ignore rules
└── README.md               # Documentation
```

---

## 💻 Running Locally

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Start Application
```bash
python app.py
```
Open your browser and navigate to: [http://localhost:5000](http://localhost:5000)

Alternatively, using npm:
```bash
npm start
```

---

## 🌐 Deploying to Vercel

### Option 1: Deploy with Git (Recommended)
1. Initialize Git and commit the project:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Vercel ready DharwadSearch"
   ```
2. Push your repository to GitHub, GitLab, or Bitbucket.
3. In [Vercel Dashboard](https://vercel.com/):
   - Click **Add New Project** → **Import Git Repository**.
   - Select your repository.
   - Leave build settings as default (Framework Preset: **Other**).
   - Click **Deploy**.

### Option 2: Deploy with Vercel CLI
```bash
npm i -g vercel
vercel
```
Follow the interactive prompts to deploy directly.
