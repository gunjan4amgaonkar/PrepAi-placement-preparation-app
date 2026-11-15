import { useState } from "react";
import FeedbackBox from "./FeedbackBox.jsx";
import { KEYS, useStored, logActivity } from "./storage.js";
import { hrQuestions } from "./data/interviewData.js";
import { useCountdown, formatTime } from "./hooks.js";

export default function HRInterview() {
  const [selected, setSelected] = useState(hrQuestions[0].id);
  const [practiced, setPracticed] = useStored(KEYS.hrPractice, {}); // id -> times practiced
  const [answers, setAnswers] = useState({});
  const [saved, setSaved] = useState("");
  const timer = useCountdown(120);

  const item = hrQuestions.find((q) => q.id === selected);
  const practicedCount = Object.keys(practiced).length;

  function pick(id) {
    setSelected(id);
    setSaved("");
    timer.reset(120);
  }

  function markPracticed() {
    setPracticed((prev) => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }));
    logActivity();
    setSaved("Saved. Nice work, repeat it once more tomorrow to make it natural.");
  }

  return (
    <div className="coding-page">
      <div className="coding-header">
        <div>
          <p className="coding-eyebrow">PREPAI INTERVIEW LAB</p>
          <h1>HR Interview</h1>
          <p>Practise the {hrQuestions.length} most common HR questions with structure, a timer and AI feedback.</p>
        </div>
        <div className="coding-progress">
          <strong>{practicedCount}/{hrQuestions.length}</strong>
          <span>questions practised</span>
        </div>
      </div>

      <div className="m-split">
        <nav className="m-side" aria-label="HR questions">
          {hrQuestions.map((q, i) => (
            <button key={q.id} className={`m-side-item ${selected === q.id ? "on" : ""}`} onClick={() => pick(q.id)}>
              <span className="m-num">{i + 1}</span>
              <span>{q.q}</span>
              {practiced[q.id] ? <span className="m-dot" title="Practised" /> : null}
            </button>
          ))}
        </nav>

        <section className="practice-card">
          <h2>{item.q}</h2>
          <div className="m-hints">
            <div><p className="m-label">How to approach it</p><p>{item.tip}</p></div>
            <div><p className="m-label">Structure</p><p>{item.structure}</p></div>
            <div><p className="m-label">Avoid</p><p>{item.avoid}</p></div>
          </div>

          <div className="m-timer-row">
            <div className={`m-timer ${timer.left === 0 ? "done" : ""}`} role="timer" aria-label="Answer timer">{formatTime(timer.left)}</div>
            {timer.running ? (
              <button className="secondary-btn" onClick={timer.pause}>Pause</button>
            ) : (
              <button className="primary-btn" onClick={timer.start} disabled={timer.left === 0}>Start 2-minute timer</button>
            )}
            <button className="secondary-btn" onClick={() => timer.reset(120)}>Reset</button>
          </div>
          {timer.left === 0 && <p className="practice-feedback">Time is up. A strong HR answer usually fits in 1 to 2 minutes.</p>}

          <FeedbackBox
            kind="hr"
            question={item.q}
            answer={answers[item.id] || ""}
            onAnswerChange={(value) => setAnswers((prev) => ({ ...prev, [item.id]: value }))}
          />

          <div className="practice-actions">
            <button className="primary-btn" onClick={markPracticed}>Mark as practised</button>
            <button className="secondary-btn" onClick={() => pick(hrQuestions[(hrQuestions.indexOf(item) + 1) % hrQuestions.length].id)}>Next question</button>
          </div>
          {saved && <p className="practice-feedback">{saved}</p>}
        </section>
      </div>
    </div>
  );
}
