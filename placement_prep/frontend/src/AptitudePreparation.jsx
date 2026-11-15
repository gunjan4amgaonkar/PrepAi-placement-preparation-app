import { useState } from "react";
import { recordAptitudeResult } from "./storage.js";

const API_URL =
  (import.meta.env.VITE_API_URL || "http://localhost:5000") +
  "/api/aptitude/generate";

export default function AptitudePreparation() {
  const [topic, setTopic] = useState("Quantitative Aptitude");
  const [difficulty, setDifficulty] = useState("Easy");
  const [count, setCount] = useState("5");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generateQuestions(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setQuestions([]);
    setAnswers({});
    setSubmitted(false);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          difficulty,
          count: Number(count),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not generate questions.");
      }

      if (!Array.isArray(data.questions) || data.questions.length === 0) {
        throw new Error("The AI returned no questions. Please try again.");
      }

      setQuestions(data.questions);
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to PrepAI backend. Make sure node server.js is running."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }

  function submitAnswers() {
    setSubmitted(true);
    recordAptitudeResult({ topic, difficulty, score, total: questions.length });
  }

  function restartPractice() {
    setQuestions([]);
    setAnswers({});
    setSubmitted(false);
    setError("");
  }

  const score = questions.reduce(
    (total, question, index) =>
      total + (answers[index] === question.answer ? 1 : 0),
    0
  );

  return (
    <section className="module-page">
      <div className="feature-icon">🧠</div>
      <h2>AI Aptitude Preparation</h2>
      <p>
        Generate a fresh practice set with Gemini AI. Choose your
        topic and difficulty to begin.
      </p>

      <form onSubmit={generateQuestions} className="profile-form">
        <label>
          Topic
          <select value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option>Quantitative Aptitude</option>
            <option>Logical Reasoning</option>
            <option>Verbal Ability</option>
            <option>Data Interpretation</option>
          </select>
        </label>

        <label>
          Difficulty
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </label>

        <label>
          Number of questions
          <select value={count} onChange={(e) => setCount(e.target.value)}>
            <option value="3">3 questions</option>
            <option value="5">5 questions</option>
            <option value="10">10 questions</option>
          </select>
        </label>

        <button type="submit" className="save-button" disabled={loading}>
          {loading ? "Generating with AI..." : "✨ Generate AI Questions"}
        </button>
      </form>

      {error && <p role="alert" className="apt-error">{error}</p>}

      {questions.length > 0 && (
        <div>
          <h3>Your AI-Generated Practice Set</h3>

          {questions.map((question, index) => (
            <article key={index} className="apt-card">
              <h3>
                {index + 1}. {question.question}
              </h3>

              {question.options.map((option, optionIndex) => (
                <label key={optionIndex} className="apt-option">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    checked={answers[index] === optionIndex}
                    disabled={submitted}
                    onChange={() =>
                      setAnswers((previous) => ({
                        ...previous,
                        [index]: optionIndex,
                      }))
                    }
                  />{" "}
                  {option}
                </label>
              ))}

              {submitted && (
                <div className="apt-explain">
                  <p>
                    {answers[index] === question.answer
                      ? "✓ Correct!"
                      : `Correct answer: ${question.options[question.answer]}`}
                  </p>
                  <p>{question.explanation}</p>
                </div>
              )}
            </article>
          ))}

          {!submitted ? (
            <button
              onClick={submitAnswers}
              disabled={Object.keys(answers).length !== questions.length}
            >
              Submit Answers
            </button>
          ) : (
            <>
              <h3>
                Your Score: {score} / {questions.length}
              </h3>
              <button onClick={restartPractice}>
                Generate Another Practice Set
              </button>
            </>
          )}
        </div>
      )}
    </section>
  );
}