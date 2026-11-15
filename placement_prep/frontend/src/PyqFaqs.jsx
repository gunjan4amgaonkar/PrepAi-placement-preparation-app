import { useState } from "react";
import { KEYS, useStored } from "./storage.js";
import { faqs, commonProblems } from "./data/resourcesData.js";

const blank = { company: "", year: "", topic: "", question: "", answer: "" };

export default function PyqFaqs() {
  const [tab, setTab] = useState("faqs");
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("All");
  const [vault, setVault] = useStored(KEYS.customPyqs, []);
  const [form, setForm] = useState(blank);
  const [error, setError] = useState("");

  const q = query.trim().toLowerCase();
  const matches = (text) => !q || text.toLowerCase().includes(q);

  function addQuestion(event) {
    event.preventDefault();
    if (form.question.trim().length < 8) {
      setError("Please write the question (at least a few words).");
      return;
    }
    setVault((prev) => [{ ...form, id: `v${Date.now()}`, createdAt: new Date().toISOString() }, ...prev]);
    setForm(blank);
    setError("");
  }

  const vaultList = vault.filter((v) => matches(`${v.company} ${v.topic} ${v.question} ${v.answer} ${v.year}`));

  return (
    <div className="coding-page">
      <div className="coding-header">
        <div>
          <p className="coding-eyebrow">PREPAI KNOWLEDGE BASE</p>
          <h1>PYQs & FAQs</h1>
          <p>Answers to common placement doubts, frequently asked coding questions, and your own question vault.</p>
        </div>
        <div className="coding-progress">
          <strong>{vault.length}</strong>
          <span>questions in your vault</span>
        </div>
      </div>

      <div className="coding-tabs">
        <button className={tab === "faqs" ? "active" : ""} onClick={() => setTab("faqs")}>FAQs</button>
        <button className={tab === "common" ? "active" : ""} onClick={() => setTab("common")}>Commonly asked problems</button>
        <button className={tab === "vault" ? "active" : ""} onClick={() => setTab("vault")}>My question vault</button>
      </div>

      <label className="m-search m-block">
        <span className="m-label">Search</span>
        <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search this section..." />
      </label>

      {tab === "faqs" && (
        <section className="m-stack">
          {faqs.filter((f) => matches(`${f.q} ${f.a}`)).map((f) => (
            <details className="m-details" key={f.q}><summary><span>{f.q}</span></summary><p>{f.a}</p></details>
          ))}
        </section>
      )}

      {tab === "common" && (
        <>
          <div className="m-row m-wrap m-gap">
            {["All", "Easy", "Medium"].map((l) => (
              <button key={l} className={`m-pill ${level === l ? "on" : ""}`} aria-pressed={level === l} onClick={() => setLevel(l)}>{l}</button>
            ))}
          </div>
          <section className="m-stack">
            {commonProblems.filter((p) => (level === "All" || p.level === level) && matches(`${p.title} ${p.topic} ${p.idea}`)).map((p) => (
              <details className="m-details" key={p.id}>
                <summary><span>{p.title}</span><span className="m-tag">{p.topic} · {p.level}</span></summary>
                <p><strong>Approach:</strong> {p.idea}</p>
              </details>
            ))}
          </section>
        </>
      )}

      {tab === "vault" && (
        <>
          <section className="practice-card">
            <h2>Add a question you saw or want to remember</h2>
            <p className="m-muted-text">Record questions from previous year papers, tests or interviews. They stay in this browser.</p>
            <form onSubmit={addQuestion} className="m-form">
              <div className="m-form-grid">
                <label>Company / source (optional)<input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="e.g. campus test" /></label>
                <label>Year (optional)<input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} placeholder="e.g. 2025" inputMode="numeric" /></label>
                <label>Topic<input value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} placeholder="e.g. SQL, Arrays, Probability" /></label>
              </div>
              <label>Question<textarea className="m-textarea" rows={3} value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} required /></label>
              <label>Answer or approach (optional)<textarea className="m-textarea" rows={3} value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} /></label>
              {error && <p className="apt-error" role="alert">{error}</p>}
              <button className="primary-btn" type="submit">Save question</button>
            </form>
          </section>

          {vaultList.length === 0 ? (
            <p className="m-empty">{vault.length ? "No saved questions match your search." : "Your vault is empty. Add the first question above."}</p>
          ) : (
            <section className="m-stack">
              {vaultList.map((v) => (
                <details className="m-details" key={v.id}>
                  <summary>
                    <span>{v.question}</span>
                    <span className="m-tag">{[v.company, v.year, v.topic].filter(Boolean).join(" · ") || "Question"}</span>
                  </summary>
                  <p>{v.answer || "No answer saved yet."}</p>
                  <button className="secondary-btn" onClick={() => setVault((prev) => prev.filter((x) => x.id !== v.id))}>Delete</button>
                </details>
              ))}
            </section>
          )}
        </>
      )}
    </div>
  );
}
