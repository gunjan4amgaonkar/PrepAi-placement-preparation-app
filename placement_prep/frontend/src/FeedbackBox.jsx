import { useState } from "react";
import { postJson } from "./api.js";

// Shared "write your answer, get AI feedback" box for the technical and HR modules.
export default function FeedbackBox({ kind, question, answer, onAnswerChange, onFeedback }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  async function getFeedback() {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const data = await postJson("/api/feedback", { kind, question, answer });
      setResult(data);
      if (onFeedback) onFeedback(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const words = answer.trim() ? answer.trim().split(/\s+/).length : 0;

  return (
    <div className="m-feedback-box">
      <label className="m-label" htmlFor="answer-box">Your answer</label>
      <textarea
        id="answer-box"
        className="m-textarea"
        rows={6}
        value={answer}
        onChange={(e) => onAnswerChange(e.target.value)}
        placeholder="Type your answer here as you would say it in the interview..."
      />
      <div className="m-row m-space">
        <span className="m-muted">{words} words</span>
        <button
          className="primary-btn"
          type="button"
          onClick={getFeedback}
          disabled={loading || answer.trim().length < 15}
        >
          {loading ? "Reviewing..." : "Get AI feedback"}
        </button>
      </div>

      {error && <p className="apt-error" role="alert">{error}</p>}

      {result && (
        <div className="m-feedback" aria-live="polite">
          <div className="m-score">{result.score}<span>/10</span></div>
          <div>
            <h4>What worked</h4>
            <ul>{result.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
            <h4>Improve</h4>
            <ul>{result.improvements.map((s, i) => <li key={i}>{s}</li>)}</ul>
            <h4>A stronger answer</h4>
            <p>{result.betterAnswer}</p>
          </div>
        </div>
      )}
    </div>
  );
}
