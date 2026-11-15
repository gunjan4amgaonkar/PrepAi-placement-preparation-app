import { useMemo, useState } from "react";
import FeedbackBox from "./FeedbackBox.jsx";
import { KEYS, useStored, logActivity } from "./storage.js";
import { techQuestions, techSubjects } from "./data/interviewData.js";
import { shuffle } from "./hooks.js";

export default function TechnicalInterviews() {
  const [subject, setSubject] = useState("All");
  const [known, setKnown] = useStored(KEYS.techKnown, {}); // id -> "known" | "revise"
  const [order, setOrder] = useState(0);
  const [seed, setSeed] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [mode, setMode] = useState("cards");
  const [answer, setAnswer] = useState("");

  const deck = useMemo(() => {
    const pool = subject === "All" ? techQuestions : techQuestions.filter((q) => q.subject === subject);
    return seed ? shuffle(pool) : pool;
  }, [subject, seed]);

  const card = deck[Math.min(order, deck.length - 1)];
  const knownCount = Object.values(known).filter((v) => v === "known").length;
  const reviseCount = Object.values(known).filter((v) => v === "revise").length;

  function go(step) {
    setRevealed(false);
    setAnswer("");
    setOrder((o) => (o + step + deck.length) % deck.length);
  }

  function mark(value) {
    setKnown((prev) => ({ ...prev, [card.id]: value }));
    logActivity();
    go(1);
  }

  function changeSubject(next) {
    setSubject(next);
    setOrder(0);
    setRevealed(false);
    setAnswer("");
  }

  return (
    <div className="coding-page">
      <div className="coding-header">
        <div>
          <p className="coding-eyebrow">PREPAI INTERVIEW LAB</p>
          <h1>Technical Interviews</h1>
          <p>{techQuestions.length} core questions across 6 subjects, with model answers and AI feedback.</p>
        </div>
        <div className="coding-progress">
          <strong>{knownCount}/{techQuestions.length}</strong>
          <span>marked as known{reviseCount ? ` · ${reviseCount} to revise` : ""}</span>
        </div>
      </div>

      <div className="m-row m-wrap m-gap">
        {["All", ...techSubjects].map((s) => (
          <button key={s} className={`m-pill ${subject === s ? "on" : ""}`} aria-pressed={subject === s} onClick={() => changeSubject(s)}>
            {s}
          </button>
        ))}
      </div>

      <div className="coding-tabs">
        <button className={mode === "cards" ? "active" : ""} onClick={() => setMode("cards")}>Flashcards</button>
        <button className={mode === "list" ? "active" : ""} onClick={() => setMode("list")}>All questions</button>
        <button className={mode === "practice" ? "active" : ""} onClick={() => setMode("practice")}>Answer with AI feedback</button>
      </div>

      {mode === "cards" && card && (
        <section className="practice-card m-flash">
          <div className="practice-meta">
            <span>{card.subject}</span>
            <span>Card {Math.min(order, deck.length - 1) + 1} of {deck.length}</span>
          </div>
          <h2>{card.q}</h2>

          {revealed ? (
            <div className="m-answer"><p className="m-label">Model answer</p><p>{card.a}</p></div>
          ) : (
            <p className="m-muted">Try answering out loud first, then reveal the model answer.</p>
          )}

          <div className="practice-actions">
            {!revealed ? (
              <button className="primary-btn" onClick={() => setRevealed(true)}>Show answer</button>
            ) : (
              <>
                <button className="primary-btn" onClick={() => mark("known")}>I know this</button>
                <button className="secondary-btn" onClick={() => mark("revise")}>Revise later</button>
              </>
            )}
            <button className="secondary-btn" onClick={() => go(-1)}>Previous</button>
            <button className="secondary-btn" onClick={() => go(1)}>Skip</button>
            <button className="secondary-btn" onClick={() => { setSeed((s) => s + 1); setOrder(0); setRevealed(false); }}>Shuffle</button>
          </div>
          {known[card.id] && <p className="practice-feedback">Marked: {known[card.id] === "known" ? "known" : "revise later"}</p>}
        </section>
      )}

      {mode === "list" && (
        <section className="m-stack">
          {deck.map((q) => (
            <details className="m-details" key={q.id}>
              <summary>
                <span>{q.q}</span>
                {known[q.id] && <span className={`m-tag ${known[q.id]}`}>{known[q.id] === "known" ? "Known" : "Revise"}</span>}
              </summary>
              <p>{q.a}</p>
            </details>
          ))}
        </section>
      )}

      {mode === "practice" && card && (
        <section className="practice-card">
          <div className="practice-meta"><span>{card.subject}</span>
            <button className="secondary-btn" onClick={() => go(1)}>Different question</button>
          </div>
          <h2>{card.q}</h2>
          <FeedbackBox kind="technical" question={card.q} answer={answer} onAnswerChange={setAnswer} onFeedback={() => logActivity()} />
          <details className="m-details">
            <summary>Compare with the model answer</summary>
            <p>{card.a}</p>
          </details>
        </section>
      )}
    </div>
  );
}
