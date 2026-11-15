# PrepAI – Placement Preparation Platform

An all-in-one web app that helps college students prepare for campus placements: aptitude and coding practice, technical and HR interview preparation, group discussion training, timed mock tests and progress analytics, with optional AI features powered by Google Gemini.

## Features

| Module | What it does |
|---|---|
| **Dashboard** | Overview with live stats: coding solved, aptitude accuracy, day streak and career readiness score. |
| **Login & Profile** | Save your name, college and course (stored in the browser). |
| **AI Career Roadmap** | Generates a week-by-week study plan for your target role with Gemini, or from a built-in template. Includes a task checklist and progress bar. |
| **Coding Preparation** | MCQ quiz plus coding exercises with a multi-language editor and progress tracking. |
| **Aptitude Preparation** | AI-generated aptitude questions by topic and difficulty, with scoring and explanations. |
| **Technical Interviews** | 36 flashcards across OS, DBMS, OOP, Networks, DSA and Web, with model answers and AI feedback on your answers. |
| **HR Interview** | 16 common questions with STAR guidance, a practice timer and AI feedback. |
| **Group Discussion** | 27 topics, random topic picker, timer, notes, voice recorder, frameworks and useful phrases. |
| **Learning Resources** | Curated free resources with search and bookmarks. |
| **PYQs & FAQs** | Placement FAQs, commonly asked coding problems and a personal question vault. |
| **Mock Tests** | Timed papers with a question navigator, flagging, detailed review and score history. |
| **Progress Tracking** | Readiness score, mock-test chart, accuracy by area, activity heatmap and recommendations. |
| **Admin Panel** | Add and verify custom questions, view content counts, back up or restore data. |

## Tech Stack

- **Frontend:** React (Vite), plain CSS with an animated dark glass theme
- **Backend:** Node.js, Express
- **AI:** Google Gemini API
- **Storage:** Browser localStorage (no database yet)

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) 18 or newer
- A Gemini API key from [Google AI Studio](https://aistudio.google.com) (only needed for the AI features)

### 1. Clone the repository
```bash
git clone https://github.com/YOUR-USERNAME/prepai-placement-app.git
cd prepai-placement-app
```

### 2. Start the backend
```bash
cd backend
npm install
cp .env.example .env     # Windows: copy .env.example .env
# open .env and add your GEMINI_API_KEY
node server.js           # runs on http://localhost:5000
```

### 3. Start the frontend (in a second terminal)
```bash
cd frontend
npm install
npm run dev              # runs on http://localhost:5173
```

Open http://localhost:5173 in your browser.

### Environment variables

| Variable | Where | Purpose |
|---|---|---|
| `GEMINI_API_KEY` | `backend/.env` | Enables AI features |
| `GEMINI_MODEL` | `backend/.env` (optional) | Choose the Gemini model |
| `PORT` | `backend/.env` (optional) | Backend port (default 5000) |
| `VITE_API_URL` | `frontend/.env` (optional) | Backend address if not `http://localhost:5000` |

Without a Gemini key, everything works except AI question generation, the AI roadmap and AI answer feedback. The roadmap also has a template option that needs no AI.

> **Never commit your `.env` file.** It is listed in `.gitignore`.

## Project Structure

```
placement_prep/
├── backend/
│   ├── server.js            # Express API (aptitude, roadmap, feedback)
│   └── .env.example
└── frontend/
    └── src/
        ├── App.jsx          # Layout, navigation, dashboard
        ├── AnimatedBackground.jsx
        ├── CareerRoadmap.jsx, TechnicalInterviews.jsx, HRInterview.jsx,
        │   GroupDiscussion.jsx, LearningResources.jsx, PyqFaqs.jsx,
        │   MockTests.jsx, ProgressTracking.jsx, AdminPanel.jsx
        ├── CodingPractice.jsx, AptitudePreparation.jsx
        ├── data/            # Question banks, interview and resource content
        └── storage.js, progress.js, api.js, hooks.js
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Server status and AI configuration |
| POST | `/api/aptitude/generate` | Generate aptitude questions |
| POST | `/api/roadmap/generate` | Generate a preparation roadmap |
| POST | `/api/feedback` | AI feedback on a technical or HR answer |

## Roadmap

- [ ] User accounts and a database so progress syncs across devices
- [ ] Run code in the Coding module with a sandboxed judge
- [ ] Company-wise preparation tracks
- [ ] Deployment with a live demo link

## Notes

- Progress and custom questions are stored in the browser. Use **Admin Panel → Backup & data** to export a backup.
- The Admin Panel has no login yet; it is a prototype feature.

## Author

Built by **Gunjan** as a placement preparation project.
