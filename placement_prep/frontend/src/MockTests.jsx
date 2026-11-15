import { useMemo, useState } from "react";
import { KEYS, load, save, logActivity } from "./storage.js";
import { aptitudeBank, technicalBank } from "./data/questionBank.js";
import { mcqs as codingMcqs } from "./codingData.js";
import { getVerifiedCustom } from "./customQuestions.js";
import { shuffle, useCountdown, formatTime } from "./hooks.js";

const codingBank = codingMcqs.map((m, i) => ({
  id: `cod-${i + 1}`,
  section: "Coding",
  topic: m.topic,
  question: m.question,
  options: m.options,
  answer: m.answer,
  explanation: `The correct answer is: ${m.options[m.answer]}.`,
}));

const presets = [
  { id: "apt", name: "Aptitude Sprint", minutes: 15, mix: { Aptitude: 15 }, text: "Quantitative, logical and verbal questions." },
  { id: "tech", name: "Technical Round", minutes: 15, mix: { Technical: 15 }, text: "OS, DBMS, OOP, networks, DSA and web basics." },
  { id: "full", name: "Full Placement Mock", minutes: 30, mix: { Aptitude: 10, Technical: 10, Coding: 4 }, text: "A mixed paper like a real screening round." },
];

function buildPaper(preset) {
  const pool = [...aptitudeBank, ...technicalBank, ...codingBank, ...getVerifiedCustom()];
  const paper = [];
  Object.entries(preset.mix).forEach(([section, count]) => {
    paper.push(...shuffle(pool.filter((q) => q.section === section)).slice(0, count));
  });
  return paper;
}

export default function MockTests() {
  const [stage, setStage] = useState("setup"); // setup | running | result
  const [preset, setPreset] = useState(null);
  const [paper, setPaper] = useState([]);
  const [answers, setAnswers] = useState({});
  const [flags, setFlags] = useState({});
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState(() => load(KEYS.mockHistory, []));

  const timer = useCountdown(0, () => finish(true));

  const customCount = useMemo(() => getVerifiedCustom().length, []);

  function start(p) {
    const questions = buildPaper(p);
    setPreset(p);
    setPaper(questions);
    setAnswers({});
    setFlags({});
    setIndex(0);
    setResult(null);
    timer.reset(p.minutes * 60);
    timer.start();
    setStage("running");
  }

  function finish(auto = false) {
    const answeredCount = Object.keys(answers).length;
    if (!auto && answeredCount < paper.length) {
      const ok = window.confirm(`You have ${paper.length - answeredCount} unanswered question(s). Submit anyway?`);
      if (!ok) return;
    }
    timer.pause();
    const sectionsResult = {};
    let score = 0;
    paper.forEach((q, i) => {
      const row = (sectionsResult[q.section] = sectionsResult[q.section] || { score: 0, total: 0 });
      row.total += 1;
      if (answers[i] === q.answer) {
        row.score += 1;
        score += 1;
      }
    });
    const entry = {
      date: new Date().toISOString(),
      test: preset.name,
      score,
      total: paper.length,
      seconds: preset.minutes * 60 - timer.left,
      sections: sectionsResult,
    };
    const next = [...history, entry].slice(-50);
    setHistory(next);
    save(KEYS.mockHistory, next);
    logActivity(3);
    setResult(entry);
    setStage("result");
  }

  if (stage === "setup") {
    const best = history.length ? Math.max(...history.map((h) => Math.round((h.score / h.total) * 100))) : null;
    return (
      <div className="coding-page">
        <div className="coding-header">
          <div>
            <p className="coding-eyebrow">PREPAI TEST CENTRE</p>
            <h1>Mock Tests</h1>
            <p>Timed papers with a question navigator, flagging and a detailed review at the end.</p>
          </div>
          <div className="coding-progress"><strong>{best === null ? "-" : `${best}%`}</strong><span>best score · {history.length} attempt(s)</span></div>
        </div>

        <div className="m-grid">
          {presets.map((p) => (
            <article className="m-card" key={p.id}>
              <span className="m-tag">{p.minutes} minutes</span>
              <h3>{p.name}</h3>
              <p className="m-muted-text">{p.text}</p>
              <p className="m-muted">{Object.entries(p.mix).map(([s, n]) => `${n} ${s}`).join(" · ")}</p>
              <button className="primary-btn" onClick={() => start(p)}>Start test</button>
            </article>
          ))}
        </div>
        <p className="m-muted">{customCount ? `${customCount} verified question(s) from the Admin Panel are included in the pool.` : "Questions you verify in the Admin Panel are added to the pool automatically."}</p>

        {history.length > 0 && (
          <section className="practice-card">
            <h2>Recent attempts</h2>
            <div className="m-table-wrap">
              <table className="m-table">
                <thead><tr><th>Date</th><th>Test</th><th>Score</th><th>Time</th></tr></thead>
                <tbody>
                  {[...history].reverse().slice(0, 8).map((h) => (
                    <tr key={h.date}>
                      <td>{new Date(h.date).toLocaleDateString()}</td>
                      <td>{h.test}</td>
                      <td>{h.score}/{h.total} ({Math.round((h.score / h.total) * 100)}%)</td>
                      <td>{formatTime(h.seconds)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    );
  }

  if (stage === "running") {
    const q = paper[index];
    return (
      <div className="coding-page">
        <div className="m-test-bar">
          <div><strong>{preset.name}</strong><span className="m-muted"> · {Object.keys(answers).length}/{paper.length} answered</span></div>
          <div className={`m-timer ${timer.left < 60 ? "done" : ""}`} role="timer" aria-label="Time left">{formatTime(timer.left)}</div>
          <button className="primary-btn" onClick={() => finish(false)}>Submit test</button>
        </div>

        <div className="m-split">
          <section className="practice-card">
            <div className="practice-meta"><span>Question {index + 1} of {paper.length}</span><span>{q.section} · {q.topic}</span></div>
            <h2>{q.question}</h2>
            <div className="answer-list">
              {q.options.map((option, i) => (
                <button key={i} className={`answer-option ${answers[index] === i ? "chosen" : ""}`} onClick={() => setAnswers({ ...answers, [index]: i })}>
                  <span>{String.fromCharCode(65 + i)}</span>{option}
                </button>
              ))}
            </div>
            <div className="practice-actions">
              <button className="secondary-btn" onClick={() => setIndex(Math.max(0, index - 1))} disabled={index === 0}>Previous</button>
              <button className="secondary-btn" onClick={() => setIndex(Math.min(paper.length - 1, index + 1))} disabled={index === paper.length - 1}>Next</button>
              <button className="secondary-btn" onClick={() => setFlags({ ...flags, [index]: !flags[index] })} aria-pressed={Boolean(flags[index])}>
                {flags[index] ? "Remove flag" : "Flag for review"}
              </button>
              {answers[index] !== undefined && (
                <button className="secondary-btn" onClick={() => { const next = { ...answers }; delete next[index]; setAnswers(next); }}>Clear answer</button>
              )}
            </div>
          </section>

          <aside className="m-navigator" aria-label="Question navigator">
            <p className="m-label">Questions</p>
            <div className="m-nav-grid">
              {paper.map((_, i) => (
                <button
                  key={i}
                  className={`m-nav-btn ${i === index ? "current" : ""} ${answers[i] !== undefined ? "answered" : ""} ${flags[i] ? "flagged" : ""}`}
                  onClick={() => setIndex(i)}
                  aria-label={`Question ${i + 1}${answers[i] !== undefined ? ", answered" : ""}${flags[i] ? ", flagged" : ""}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <p className="m-muted">Blue: answered · Amber outline: flagged</p>
          </aside>
        </div>
      </div>
    );
  }

  // Result
  const percent = Math.round((result.score / result.total) * 100);
  return (
    <div className="coding-page">
      <div className="coding-header">
        <div>
          <p className="coding-eyebrow">TEST COMPLETE</p>
          <h1>{result.score} / {result.total} · {percent}%</h1>
          <p>{preset.name} finished in {formatTime(result.seconds)}. {percent >= 70 ? "Strong result!" : percent >= 40 ? "Good start. Review the mistakes below." : "Use the review below to find what to revise."}</p>
        </div>
        <div className="coding-progress"><strong>{percent}%</strong><span>score</span></div>
      </div>

      <section className="m-grid">
        {Object.entries(result.sections).map(([name, s]) => (
          <article className="m-card" key={name}>
            <h3>{name}</h3>
            <p className="m-big">{s.score}/{s.total}</p>
            <div className="practice-track"><div style={{ width: `${Math.round((s.score / s.total) * 100)}%` }} /></div>
          </article>
        ))}
      </section>

      <section className="practice-card">
        <h2>Review your answers</h2>
        {paper.map((q, i) => {
          const mine = answers[i];
          const right = mine === q.answer;
          return (
            <div className="m-review" key={q.id + i}>
              <p><strong>{i + 1}. {q.question}</strong></p>
              <p className={right ? "m-good" : "m-bad"}>
                {mine === undefined ? "Not answered" : `Your answer: ${q.options[mine]}`} {right ? "✓" : "✗"}
              </p>
              {!right && <p className="m-good">Correct: {q.options[q.answer]}</p>}
              <p className="m-muted-text">{q.explanation}</p>
            </div>
          );
        })}
        <div className="practice-actions">
          <button className="primary-btn" onClick={() => start(preset)}>Retake with new questions</button>
          <button className="secondary-btn" onClick={() => setStage("setup")}>Back to tests</button>
        </div>
      </section>
    </div>
  );
}
