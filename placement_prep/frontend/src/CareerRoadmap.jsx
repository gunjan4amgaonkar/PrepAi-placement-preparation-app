import { useState } from "react";
import { postJson } from "./api.js";
import { KEYS, useStored, logActivity } from "./storage.js";
import { roles, focusAreas, buildTemplateRoadmap } from "./data/roadmapTemplate.js";

export default function CareerRoadmap() {
  const [form, setForm] = useState({ role: roles[0], level: "Beginner", weeks: 6, hours: 2, focus: [] });
  const [roadmap, setRoadmap] = useStored(KEYS.roadmap, null);
  const [done, setDone] = useStored(KEYS.roadmapDone, {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function toggleFocus(area) {
    setForm((prev) => ({
      ...prev,
      focus: prev.focus.includes(area) ? prev.focus.filter((a) => a !== area) : [...prev.focus, area].slice(0, 6),
    }));
  }

  function applyRoadmap(plan) {
    setRoadmap({ ...plan, role: form.role, level: form.level, createdAt: new Date().toISOString() });
    setDone({});
  }

  async function generateWithAi() {
    setLoading(true);
    setError("");
    try {
      const data = await postJson("/api/roadmap/generate", {
        role: form.role,
        level: form.level,
        weeks: Number(form.weeks),
        hours: Number(form.hours),
        focus: form.focus,
      });
      applyRoadmap({ ...data, source: "ai" });
    } catch (err) {
      setError(`${err.message} You can still use the built-in template plan below.`);
    } finally {
      setLoading(false);
    }
  }

  function generateTemplate() {
    setError("");
    applyRoadmap(buildTemplateRoadmap(form));
  }

  function toggleTask(key) {
    setDone((prev) => {
      const next = { ...prev };
      if (next[key]) delete next[key];
      else {
        next[key] = true;
        logActivity();
      }
      return next;
    });
  }

  const totalTasks = roadmap ? roadmap.weeks.reduce((t, w) => t + w.tasks.length, 0) : 0;
  const doneCount = roadmap ? Object.keys(done).filter((k) => done[k]).length : 0;
  const percent = totalTasks ? Math.round((doneCount / totalTasks) * 100) : 0;

  return (
    <div className="coding-page">
      <div className="coding-header">
        <div>
          <p className="coding-eyebrow">PREPAI CAREER COACH</p>
          <h1>AI Career Roadmap</h1>
          <p>Tell us your goal and time. Get a week-by-week plan and tick off tasks as you go.</p>
        </div>
        <div className="coding-progress">
          <strong>{percent}%</strong>
          <span>{roadmap ? `${doneCount} of ${totalTasks} tasks done` : "No plan yet"}</span>
        </div>
      </div>

      <section className="practice-card">
        <h2>Plan your preparation</h2>
        <div className="m-form-grid">
          <label>
            Target role
            <select value={form.role} onChange={(e) => update("role", e.target.value)}>
              {roles.map((r) => <option key={r}>{r}</option>)}
            </select>
          </label>
          <label>
            Current level
            <select value={form.level} onChange={(e) => update("level", e.target.value)}>
              {["Beginner", "Intermediate", "Advanced"].map((l) => <option key={l}>{l}</option>)}
            </select>
          </label>
          <label>
            Weeks available
            <select value={form.weeks} onChange={(e) => update("weeks", e.target.value)}>
              {[2, 4, 6, 8, 10, 12].map((w) => <option key={w} value={w}>{w} weeks</option>)}
            </select>
          </label>
          <label>
            Study hours per day
            <select value={form.hours} onChange={(e) => update("hours", e.target.value)}>
              {[1, 2, 3, 4, 6].map((h) => <option key={h} value={h}>{h} hour{h > 1 ? "s" : ""}</option>)}
            </select>
          </label>
        </div>

        <p className="m-label">Areas you want extra time on</p>
        <div className="m-row m-wrap">
          {focusAreas.map((area) => (
            <button
              key={area}
              type="button"
              className={`m-pill ${form.focus.includes(area) ? "on" : ""}`}
              aria-pressed={form.focus.includes(area)}
              onClick={() => toggleFocus(area)}
            >
              {area}
            </button>
          ))}
        </div>

        <div className="practice-actions">
          <button className="primary-btn" onClick={generateWithAi} disabled={loading}>
            {loading ? "Creating your plan..." : "Generate with AI"}
          </button>
          <button className="secondary-btn" onClick={generateTemplate} disabled={loading}>
            Use built-in template
          </button>
        </div>
        {error && <p className="apt-error" role="alert">{error}</p>}
      </section>

      {roadmap && (
        <>
          <section className="m-summary">
            <div className="m-row m-space m-wrap">
              <h2>Your plan: {roadmap.role}</h2>
              <span className="m-tag">{roadmap.source === "ai" ? "Created by AI" : "Template plan"}</span>
            </div>
            <p>{roadmap.summary}</p>
            <div className="practice-track"><div style={{ width: `${percent}%` }} /></div>
            <button
              className="secondary-btn"
              onClick={() => {
                if (window.confirm("Remove this roadmap and your progress on it?")) {
                  setRoadmap(null);
                  setDone({});
                }
              }}
            >
              Clear roadmap
            </button>
          </section>

          <div className="m-grid">
            {roadmap.weeks.map((week) => {
              const weekDone = week.tasks.filter((_, i) => done[`${week.week}-${i}`]).length;
              return (
                <article className="m-card" key={week.week}>
                  <div className="m-row m-space">
                    <span className="m-tag">Week {week.week}</span>
                    <span className="m-muted">{weekDone}/{week.tasks.length}</span>
                  </div>
                  <h3>{week.title}</h3>
                  <p className="m-label">Goals</p>
                  <ul className="m-list">{week.goals.map((g, i) => <li key={i}>{g}</li>)}</ul>
                  <p className="m-label">Tasks</p>
                  {week.tasks.map((task, i) => {
                    const key = `${week.week}-${i}`;
                    return (
                      <label className="m-check" key={key}>
                        <input type="checkbox" checked={Boolean(done[key])} onChange={() => toggleTask(key)} />
                        <span className={done[key] ? "struck" : ""}>{task}</span>
                      </label>
                    );
                  })}
                </article>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
