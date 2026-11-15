import { KEYS, load, dayKey } from "./storage.js";
import { getOverview, readinessLabel } from "./progress.js";

function pct(score, total) {
  return total ? Math.round((score / total) * 100) : null;
}

function buildHeatmap(days = 70) {
  const log = load(KEYS.activity, {});
  const cells = [];
  const date = new Date();
  date.setDate(date.getDate() - (days - 1));
  for (let i = 0; i < days; i += 1) {
    const count = log[dayKey(date)] || 0;
    cells.push({ key: dayKey(date), count, level: count === 0 ? 0 : count < 2 ? 1 : count < 4 ? 2 : 3 });
    date.setDate(date.getDate() + 1);
  }
  return cells;
}

function recommendations(o, goTo) {
  const tips = [];
  if (!o.profileDone) tips.push({ text: "Complete your profile so your dashboard is personalised.", go: "Login & Profile" });
  if (!o.roadmap) tips.push({ text: "Create a week-by-week plan in the AI Career Roadmap.", go: "AI Career Roadmap" });
  if (o.mockHistory.length === 0) tips.push({ text: "Take your first mock test to find weak areas.", go: "Mock Tests" });

  const weak = Object.entries({ ...o.mockSections })
    .filter(([, s]) => s.total >= 3)
    .map(([name, s]) => [name, pct(s.score, s.total)])
    .sort((a, b) => a[1] - b[1])[0];
  if (weak && weak[1] < 70) tips.push({ text: `Your weakest mock-test section is ${weak[0]} (${weak[1]}%). Practise it next.`, go: weak[0] === "Aptitude" ? "Aptitude Preparation" : weak[0] === "Technical" ? "Technical Interviews" : "Coding Preparation" });

  const weakApt = Object.entries(o.aptByTopic).map(([t, s]) => [t, pct(s.score, s.total)]).filter(([, p]) => p !== null).sort((a, b) => a[1] - b[1])[0];
  if (weakApt && weakApt[1] < 70) tips.push({ text: `In aptitude sets, ${weakApt[0]} is at ${weakApt[1]}%. Generate another set on it.`, go: "Aptitude Preparation" });

  if (o.codingDone < o.codingTotal) tips.push({ text: `Solve the remaining ${o.codingTotal - o.codingDone} coding problem(s).`, go: "Coding Preparation" });
  if (o.techKnown < o.techTotal / 2) tips.push({ text: "Go through more technical flashcards.", go: "Technical Interviews" });
  if (o.hrPracticed < 5) tips.push({ text: "Practise at least 5 HR questions out loud.", go: "HR Interview" });
  if (o.gdSessions.length === 0) tips.push({ text: "Do one timed group discussion or extempore session.", go: "Group Discussion" });
  if (tips.length === 0) tips.push({ text: "You are on track. Keep taking mock tests and polishing your resume.", go: "Mock Tests" });
  return tips.slice(0, 5).map((t) => ({ ...t, goTo }));
}

function Bar({ label, value, note }) {
  return (
    <div className="m-bar-row">
      <div className="m-row m-space"><span>{label}</span><span className="m-muted">{value === null ? "no data" : `${value}%`}{note ? ` · ${note}` : ""}</span></div>
      <div className="practice-track"><div style={{ width: `${value || 0}%` }} /></div>
    </div>
  );
}

export default function ProgressTracking({ profile, goTo }) {
  const o = getOverview(profile);
  const cells = buildHeatmap();
  const lastMocks = o.mockHistory.slice(-10);
  const tips = recommendations(o, goTo);
  const ringLen = 2 * Math.PI * 62;

  return (
    <div className="coding-page">
      <div className="coding-header">
        <div>
          <p className="coding-eyebrow">PREPAI ANALYTICS</p>
          <h1>Progress Tracking</h1>
          <p>Everything you have practised, in one place. Data is saved in this browser.</p>
        </div>
        <div className="coding-progress"><strong>{o.streak}</strong><span>day streak</span></div>
      </div>

      <section className="m-grid m-top">
        <article className="m-card m-center">
          <h3>Career readiness</h3>
          <div className="m-ring">
            <svg width="150" height="150" viewBox="0 0 150 150" role="img" aria-label={`${o.readiness} percent ready`}>
              <circle cx="75" cy="75" r="62" className="m-ring-bg" />
              <circle cx="75" cy="75" r="62" className="m-ring-fg" strokeDasharray={`${(o.readiness / 100) * ringLen} ${ringLen}`} transform="rotate(-90 75 75)" />
            </svg>
            <div className="m-ring-text">{o.readiness}%</div>
          </div>
          <p className="m-muted-text">{readinessLabel(o.readiness)}</p>
        </article>

        <article className="m-card">
          <h3>Snapshot</h3>
          <div className="m-stats">
            <div><span>{o.codingDone}/{o.codingTotal}</span><p>Coding solved</p></div>
            <div><span>{o.aptAccuracy === null ? "-" : `${o.aptAccuracy}%`}</span><p>Aptitude accuracy</p></div>
            <div><span>{o.mockHistory.length}</span><p>Mock tests</p></div>
            <div><span>{o.mockAvg === null ? "-" : `${o.mockAvg}%`}</span><p>Mock average</p></div>
            <div><span>{o.techKnown}/{o.techTotal}</span><p>Tech cards known</p></div>
            <div><span>{o.hrPracticed}/{o.hrTotal}</span><p>HR practised</p></div>
            <div><span>{o.gdSessions.length}</span><p>GD sessions</p></div>
            <div><span>{o.roadmap ? `${o.roadmapPercent}%` : "-"}</span><p>Roadmap done</p></div>
          </div>
        </article>
      </section>

      <section className="m-grid">
        <article className="m-card">
          <h3>Mock test scores (last {lastMocks.length || 10})</h3>
          {lastMocks.length === 0 ? (
            <p className="m-empty">No mock tests yet. Your scores will appear here.</p>
          ) : (
            <div className="m-chart" role="img" aria-label="Bar chart of recent mock test scores">
              {lastMocks.map((m) => {
                const p = Math.round((m.score / m.total) * 100);
                return (
                  <div className="m-chart-col" key={m.date} title={`${m.test}: ${p}%`}>
                    <span className="m-chart-val">{p}</span>
                    <div className="m-chart-bar" style={{ height: `${Math.max(p, 3)}%` }} />
                  </div>
                );
              })}
            </div>
          )}
        </article>

        <article className="m-card">
          <h3>Accuracy by area</h3>
          {Object.keys(o.mockSections).length === 0 && Object.keys(o.aptByTopic).length === 0 ? (
            <p className="m-empty">Take a mock test or an aptitude set to see accuracy.</p>
          ) : (
            <>
              {Object.entries(o.mockSections).map(([name, s]) => <Bar key={name} label={`Mock: ${name}`} value={pct(s.score, s.total)} note={`${s.score}/${s.total}`} />)}
              {Object.entries(o.aptByTopic).map(([name, s]) => <Bar key={name} label={`Aptitude: ${name}`} value={pct(s.score, s.total)} note={`${s.score}/${s.total}`} />)}
            </>
          )}
        </article>
      </section>

      <section className="m-card">
        <div className="m-row m-space m-wrap"><h3>Practice activity · last 10 weeks</h3><span className="m-muted">darker = more activity</span></div>
        <div className="m-heat" role="img" aria-label="Activity heatmap for the last 10 weeks">
          {cells.map((c) => <div key={c.key} className={`m-heat-cell l${c.level}`} title={`${c.key}: ${c.count} activities`} />)}
        </div>
      </section>

      <section className="practice-card">
        <h2>What to do next</h2>
        <ul className="m-todo">
          {tips.map((t, i) => (
            <li key={i}>
              <span>{t.text}</span>
              <button className="secondary-btn" onClick={() => t.goTo(t.go)}>Open</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
