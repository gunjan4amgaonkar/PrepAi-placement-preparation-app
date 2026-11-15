import { useEffect, useState } from "react";
import { KEYS, load, save, logActivity } from "./storage.js";
import { languages, mcqs, problems, initialCode } from "./codingData.js";

export default function CodingPractice() {
  const [tab, setTab] = useState("MCQs");
  const [language, setLanguage] = useState("Python");
  const [difficulty, setDifficulty] = useState("All");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState({});
  const [finished, setFinished] = useState(false);
  const [problemId, setProblemId] = useState(1);
  const [code, setCode] = useState(() => initialCode(problems[0], "Python"));
  const [completed, setCompleted] = useState(() =>
    load(KEYS.codingCompleted, [])
  );
  const [notice, setNotice] = useState("");

  const filtered = problems.filter(
    p => difficulty === "All" || p.difficulty === difficulty
  );

  const problem = problems.find(p => p.id === problemId) || problems[0];
  const mcq = mcqs[questionIndex];

  function changeProblem(id) {
    const next = problems.find(p => p.id === id) || problems[0];
    setProblemId(next.id);
    setCode(initialCode(next, language));
    setNotice("");
  }

  function changeDifficulty(level) {
    setDifficulty(level);
    const options = problems.filter(p => level === "All" || p.difficulty === level);
    if (options.length && !options.some(p => p.id === problemId)) {
      changeProblem(options[0].id);
    }
  }

  function changeLanguage(lang) {
    setLanguage(lang);
    setCode(initialCode(problem, lang));
    setNotice("");
  }

  useEffect(() => {
    save(KEYS.codingCompleted, completed);
  }, [completed]);

  function chooseAnswer(index) {
    if (finished) return;
    setSelected(old => ({ ...old, [questionIndex]: index }));
  }

  function finishQuiz() {
    setFinished(true);
  }

  function resetQuiz() {
    setSelected({});
    setQuestionIndex(0);
    setFinished(false);
  }

  function saveCompletion() {
    if (!completed.includes(problem.id)) logActivity();
    setCompleted(old =>
      old.includes(problem.id) ? old : [...old, problem.id]
    );
    setNotice("Marked as completed! Your progress has been saved.");
  }

  const score = mcqs.reduce(
    (total, q, i) => total + (selected[i] === q.answer ? 1 : 0),
    0
  );

  return (
    <div className="coding-page">
      <header className="coding-header">
        <div>
          <p className="coding-eyebrow">PREPAI LEARNING LAB</p>
          <h1>Coding Practice</h1>
          <p>Practice concepts, solve problems, and track your progress.</p>
        </div>
        <div className="coding-progress">
          <strong>{completed.length}/{problems.length}</strong>
          <span>Problems completed</span>
        </div>
      </header>

      <section className="coding-controls">
        <label>
          Programming language
          <select value={language} onChange={e => changeLanguage(e.target.value)}>
            {languages.map(item => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <label>
          Difficulty
          <select
            value={difficulty}
            onChange={e => changeDifficulty(e.target.value)}
          >
            <option>All</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </label>
      </section>

      <nav className="coding-tabs">
        {["MCQs", "Coding Exercises"].map(item => (
          <button
            key={item}
            className={tab === item ? "active" : ""}
            onClick={() => setTab(item)}
          >
            {item}
          </button>
        ))}
      </nav>

      {tab === "MCQs" ? (
        <section className="practice-card">
          <div className="practice-meta">
            <span>{mcq.topic}</span>
            <span>Question {questionIndex + 1} of {mcqs.length}</span>
          </div>

          <div className="practice-track">
            <div style={{
              width: `${((questionIndex + 1) / mcqs.length) * 100}%`
            }} />
          </div>

          <h2>{mcq.question}</h2>

          <div className="answer-list">
            {mcq.options.map((option, index) => {
              let state = "";
              if (finished && index === mcq.answer) state = "correct";
              else if (
                finished &&
                selected[questionIndex] === index &&
                index !== mcq.answer
              ) state = "incorrect";
              else if (selected[questionIndex] === index) state = "chosen";

              return (
                <button
                  key={option}
                  className={`answer-option ${state}`}
                  onClick={() => chooseAnswer(index)}
                >
                  <span>{String.fromCharCode(65 + index)}</span>
                  {option}
                </button>
              );
            })}
          </div>

          {finished && (
            <p className="practice-feedback">
              {selected[questionIndex] === mcq.answer
                ? "Correct answer!"
                : `Correct answer: ${mcq.options[mcq.answer]}`}
            </p>
          )}

          {finished && (
            <p>Your score: {score} / {mcqs.length}</p>
          )}

          <div className="practice-actions">
            {finished ? (
              <button className="primary-btn" onClick={resetQuiz}>
                Try again
              </button>
            ) : (
              <button
                className="primary-btn"
                onClick={finishQuiz}
                disabled={Object.keys(selected).length !== mcqs.length}
              >
                Submit quiz
              </button>
            )}

            <button
              className="secondary-btn"
              onClick={() => {
                if (questionIndex < mcqs.length - 1) {
                  setQuestionIndex(i => i + 1);
                } else {
                  setQuestionIndex(0);
                }
              }}
            >
              Next question →
            </button>
          </div>
        </section>
      ) : (
        <section className="practice-card">
          <label>
            Select a problem
            <select
              value={problemId}
              onChange={e => changeProblem(Number(e.target.value))}
            >
              {filtered.map(p => (
                <option key={p.id} value={p.id}>
                  {p.title} — {p.difficulty}
                </option>
              ))}
            </select>
          </label>

          {filtered.length === 0 ? (
            <p>No problems for this difficulty yet. Choose All or Easy.</p>
          ) : (
            <>
              <div className="practice-meta">
                <span>{problem.difficulty}</span>
                <span>{language}</span>
              </div>

              <h2>{problem.title}</h2>
              <p>{problem.description}</p>

              <h3>Sample input / output</h3>
              <pre className="sample-box">{problem.example}</pre>

              <label>
                Your code
                <textarea
                  className="code-editor"
                  spellCheck="false"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                />
              </label>

              <p className="editor-note">
                Code execution is not connected yet. You can edit your
                solution and mark the exercise completed for now.
              </p>

              <div className="practice-actions">
                <button
                  className="primary-btn"
                  onClick={saveCompletion}
                >
                  Mark completed
                </button>
                <button
                  className="secondary-btn"
                  onClick={() => setCode(initialCode(problem, language))}
                >
                  Reset code
                </button>
              </div>

              {notice && <p className="practice-feedback">{notice}</p>}
            </>
          )}
        </section>
      )}
    </div>
  );
}