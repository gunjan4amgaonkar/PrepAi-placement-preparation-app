import { useRef, useState } from "react";
import { KEYS, useStored } from "./storage.js";
import { sections, validateQuestion } from "./customQuestions.js";
import { aptitudeBank, technicalBank } from "./data/questionBank.js";
import { techQuestions, hrQuestions } from "./data/interviewData.js";
import { gdTopics } from "./data/gdData.js";

const blank = { section: "Aptitude", topic: "", question: "", options: ["", "", "", ""], answer: -1, explanation: "" };

function allPrepaiKeys() {
  const keys = [];
  try {
    for (let i = 0; i < localStorage.length; i += 1) {
      const k = localStorage.key(i);
      if (k && k.toLowerCase().startsWith("prepai")) keys.push(k);
    }
  } catch {
    /* storage unavailable */
  }
  return keys;
}

export default function AdminPanel() {
  const [tab, setTab] = useState("add");
  const [bank, setBank] = useStored(KEYS.customQuestions, []);
  const [vault] = useStored(KEYS.customPyqs, []);
  const [form, setForm] = useState(blank);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [filter, setFilter] = useState("all");
  const fileRef = useRef(null);

  function setOption(i, value) {
    setForm((prev) => ({ ...prev, options: prev.options.map((o, idx) => (idx === i ? value : o)) }));
  }

  function submit(event) {
    event.preventDefault();
    const problem = validateQuestion(form);
    if (problem) {
      setError(problem);
      return;
    }
    const clean = { ...form, question: form.question.trim(), options: form.options.map((o) => o.trim()), topic: form.topic.trim() || "General", explanation: form.explanation.trim() };
    if (editingId) {
      // Editing a question puts it back in the review queue.
      setBank((prev) => prev.map((q) => (q.id === editingId ? { ...q, ...clean, verified: false } : q)));
      setNotice("Question updated and sent back to the review queue.");
    } else {
      setBank((prev) => [{ ...clean, id: `cq${Date.now()}`, verified: false, createdAt: new Date().toISOString() }, ...prev]);
      setNotice("Question added. Verify it in the Review tab to include it in mock tests.");
    }
    setForm(blank);
    setEditingId(null);
    setError("");
  }

  function edit(q) {
    setForm({ section: q.section, topic: q.topic, question: q.question, options: [...q.options], answer: q.answer, explanation: q.explanation || "" });
    setEditingId(q.id);
    setTab("add");
    setNotice("");
  }

  function remove(id) {
    if (window.confirm("Delete this question?")) setBank((prev) => prev.filter((q) => q.id !== id));
  }

  function toggleVerified(id) {
    setBank((prev) => prev.map((q) => (q.id === id ? { ...q, verified: !q.verified } : q)));
  }

  function exportData() {
    const data = {};
    allPrepaiKeys().forEach((k) => {
      try { data[k] = JSON.parse(localStorage.getItem(k)); } catch { /* skip */ }
    });
    const blob = new Blob([JSON.stringify({ app: "PrepAI", exportedAt: new Date().toISOString(), data }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `prepai-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setNotice("Backup downloaded.");
  }

  function importData(event) {
    const file = event.target.files && event.target.files[0];
    event.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (parsed.app !== "PrepAI" || typeof parsed.data !== "object" || parsed.data === null) throw new Error("This is not a PrepAI backup file.");
        const entries = Object.entries(parsed.data).filter(([k]) => k.toLowerCase().startsWith("prepai"));
        if (!entries.length) throw new Error("The backup has no PrepAI data.");
        if (!window.confirm(`Restore ${entries.length} saved item(s)? This replaces your current data.`)) return;
        entries.forEach(([k, v]) => localStorage.setItem(k, JSON.stringify(v)));
        window.location.reload();
      } catch (err) {
        setError(err.message || "Could not read that file.");
      }
    };
    reader.readAsText(file);
  }

  function resetAll() {
    if (!window.confirm("This deletes ALL your PrepAI progress, questions and settings in this browser. Continue?")) return;
    allPrepaiKeys().forEach((k) => localStorage.removeItem(k));
    window.location.reload();
  }

  const shown = bank.filter((q) => filter === "all" || (filter === "verified" ? q.verified : !q.verified));
  const pending = bank.filter((q) => !q.verified).length;

  return (
    <div className="coding-page">
      <div className="coding-header">
        <div>
          <p className="coding-eyebrow">PREPAI ADMIN</p>
          <h1>Admin Panel</h1>
          <p>Add and verify questions for mock tests, review content counts, and back up your data.</p>
        </div>
        <div className="coding-progress"><strong>{pending}</strong><span>awaiting review</span></div>
      </div>
      <p className="m-muted">Prototype note: this panel has no login. It manages data stored in this browser only.</p>

      <div className="coding-tabs">
        <button className={tab === "add" ? "active" : ""} onClick={() => setTab("add")}>{editingId ? "Edit question" : "Add question"}</button>
        <button className={tab === "review" ? "active" : ""} onClick={() => setTab("review")}>Review ({bank.length})</button>
        <button className={tab === "content" ? "active" : ""} onClick={() => setTab("content")}>Content overview</button>
        <button className={tab === "data" ? "active" : ""} onClick={() => setTab("data")}>Backup & data</button>
      </div>

      {notice && <p className="practice-feedback" aria-live="polite">{notice}</p>}

      {tab === "add" && (
        <section className="practice-card">
          <h2>{editingId ? "Edit question" : "New multiple-choice question"}</h2>
          <form className="m-form" onSubmit={submit}>
            <div className="m-form-grid">
              <label>Section
                <select value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })}>
                  {sections.map((s) => <option key={s}>{s}</option>)}
                </select>
              </label>
              <label>Topic<input value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} placeholder="e.g. Probability" /></label>
            </div>
            <label>Question<textarea className="m-textarea" rows={3} value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} /></label>
            <fieldset className="m-options">
              <legend className="m-label">Options (select the correct one)</legend>
              {form.options.map((opt, i) => (
                <div className="m-option-row" key={i}>
                  <input type="radio" name="correct" checked={form.answer === i} onChange={() => setForm({ ...form, answer: i })} aria-label={`Option ${String.fromCharCode(65 + i)} is correct`} />
                  <input value={opt} onChange={(e) => setOption(i, e.target.value)} placeholder={`Option ${String.fromCharCode(65 + i)}`} aria-label={`Option ${String.fromCharCode(65 + i)} text`} />
                </div>
              ))}
            </fieldset>
            <label>Explanation (shown after the test)<textarea className="m-textarea" rows={2} value={form.explanation} onChange={(e) => setForm({ ...form, explanation: e.target.value })} /></label>
            {error && <p className="apt-error" role="alert">{error}</p>}
            <div className="practice-actions">
              <button className="primary-btn" type="submit">{editingId ? "Save changes" : "Add question"}</button>
              {editingId && <button type="button" className="secondary-btn" onClick={() => { setForm(blank); setEditingId(null); setError(""); }}>Cancel edit</button>}
            </div>
          </form>
        </section>
      )}

      {tab === "review" && (
        <>
          <div className="m-row m-wrap m-gap">
            {[["all", "All"], ["pending", "Needs review"], ["verified", "Verified"]].map(([v, label]) => (
              <button key={v} className={`m-pill ${filter === v ? "on" : ""}`} aria-pressed={filter === v} onClick={() => setFilter(v)}>{label}</button>
            ))}
          </div>
          {shown.length === 0 ? (
            <p className="m-empty">{bank.length ? "Nothing in this filter." : "No custom questions yet. Add one in the first tab."}</p>
          ) : (
            <section className="m-stack">
              {shown.map((q) => (
                <article className="m-card" key={q.id}>
                  <div className="m-row m-space m-wrap">
                    <span className="m-tag">{q.section} · {q.topic}</span>
                    <span className={`m-tag ${q.verified ? "known" : "revise"}`}>{q.verified ? "Verified" : "Needs review"}</span>
                  </div>
                  <h3>{q.question}</h3>
                  <ol className="m-list m-alpha">
                    {q.options.map((o, i) => <li key={i} className={i === q.answer ? "m-good" : ""}>{o}{i === q.answer ? " ✓" : ""}</li>)}
                  </ol>
                  {q.explanation && <p className="m-muted-text">{q.explanation}</p>}
                  <div className="practice-actions">
                    <button className="primary-btn" onClick={() => toggleVerified(q.id)}>{q.verified ? "Unverify" : "Verify & publish"}</button>
                    <button className="secondary-btn" onClick={() => edit(q)}>Edit</button>
                    <button className="secondary-btn" onClick={() => remove(q.id)}>Delete</button>
                  </div>
                </article>
              ))}
            </section>
          )}
        </>
      )}

      {tab === "content" && (
        <div className="m-grid">
          {[
            ["Aptitude MCQs (built-in)", aptitudeBank.length],
            ["Technical MCQs (built-in)", technicalBank.length],
            ["Technical flashcards", techQuestions.length],
            ["HR questions", hrQuestions.length],
            ["Group discussion topics", gdTopics.length],
            ["Custom questions (verified)", bank.filter((q) => q.verified).length],
            ["Custom questions (pending)", pending],
            ["Question vault entries", vault.length],
          ].map(([label, count]) => (
            <article className="m-card m-center" key={label}><p className="m-big">{count}</p><p className="m-muted-text">{label}</p></article>
          ))}
        </div>
      )}

      {tab === "data" && (
        <section className="practice-card">
          <h2>Backup, restore and reset</h2>
          <p className="m-muted-text">Your progress is stored only in this browser. Download a backup before clearing browser data or switching device.</p>
          <div className="practice-actions">
            <button className="primary-btn" onClick={exportData}>Download backup</button>
            <button className="secondary-btn" onClick={() => fileRef.current && fileRef.current.click()}>Restore from backup</button>
            <input ref={fileRef} type="file" accept="application/json,.json" onChange={importData} hidden />
            <button className="secondary-btn m-danger" onClick={resetAll}>Reset all data</button>
          </div>
          {error && <p className="apt-error" role="alert">{error}</p>}
        </section>
      )}
    </div>
  );
}
