# PrepAI – Placement Preparation App

React (Vite) frontend + Node/Express backend, with Gemini generating aptitude questions.

## Run it

**Backend** (terminal 1)
```bash
cd backend
npm install
cp .env.example .env      # then put your own GEMINI_API_KEY in .env
node server.js            # http://localhost:5000
```

**Frontend** (terminal 2)
```bash
cd frontend
npm install
npm run dev               # http://localhost:5173
```

Check the backend at http://localhost:5000/api/health – it reports whether the key is configured and which model is used.
If question generation fails, set `GEMINI_MODEL` in `backend/.env` to a model your key can use.

## Modules
| Module | Status |
|---|---|
| Dashboard (real progress stats) | done |
| Login & Profile (browser-only) | prototype |
| Coding Preparation (MCQs + exercises, no code execution) | partial |
| Aptitude Preparation (Gemini generated, results saved) | done |
| AI Career Roadmap (Gemini or built-in template, task checklist) | done |
| Technical Interviews (36 flashcards, list view, AI answer feedback) | done |
| HR Interview (16 questions, STAR guidance, timer, AI feedback) | done |
| Group Discussion (27 topics, timer, notes, voice recorder, frameworks) | done |
| Learning Resources (26 curated links, search, bookmarks) | done |
| PYQs & FAQs (FAQs, common coding problems, your own question vault) | done |
| Mock Tests (3 timed papers, navigator, flagging, review, history) | done |
| Progress Tracking (readiness, charts, heatmap, recommendations) | done |
| Admin Panel (add/verify questions, content overview, backup/restore) | done |

AI features (aptitude, roadmap, answer feedback) need `GEMINI_API_KEY` in `backend/.env`. Everything else works without it.
All progress is saved in your browser (localStorage). Use Admin Panel → Backup & data to download a backup.

## Animated background
`frontend/src/AnimatedBackground.jsx` + `background.css` draw the moving grid, circuit pulses, orbs, sparkles and floating code chips.
`theme-dark.css` turns the app dark so panels sit on top of it. Motion is turned off automatically for users who prefer reduced motion.
