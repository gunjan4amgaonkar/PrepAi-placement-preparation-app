import { useEffect, useRef, useState } from "react";
import { KEYS, useStored, logActivity } from "./storage.js";
import { gdTopics, gdCategories, gdFrameworks, gdOpeners, gdLinkers, gdClosers, gdDos, gdDonts } from "./data/gdData.js";
import { useCountdown, formatTime } from "./hooks.js";

const lengths = [
  { label: "Extempore · 2 min", seconds: 120 },
  { label: "Short GD · 5 min", seconds: 300 },
  { label: "Full GD · 10 min", seconds: 600 },
];

export default function GroupDiscussion() {
  const [tab, setTab] = useState("practice");
  const [category, setCategory] = useState("All");
  const [topic, setTopic] = useState(gdTopics[0]);
  const [showHints, setShowHints] = useState(false);
  const [length, setLength] = useState(300);
  const [notes, setNotes] = useState("");
  const [sessions, setSessions] = useStored(KEYS.gdSessions, []);
  const [message, setMessage] = useState("");
  const timer = useCountdown(300, () => setMessage("Time is up! Wrap up with a one-line conclusion, then save the session."));

  // Voice recording (kept only in this browser tab, never uploaded)
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [recError, setRecError] = useState("");
  const recorderRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => () => {
    if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
  }, []);

  useEffect(() => () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
  }, [audioUrl]);

  function randomTopic() {
    const pool = category === "All" ? gdTopics : gdTopics.filter((t) => t.category === category);
    const options = pool.filter((t) => t.id !== topic.id);
    setTopic(options[Math.floor(Math.random() * options.length)] || pool[0]);
    setShowHints(false);
    setNotes("");
    setMessage("");
    timer.reset(length);
  }

  function changeLength(seconds) {
    setLength(seconds);
    timer.reset(seconds);
    setMessage("");
  }

  async function startRecording() {
    setRecError("");
    try {
      if (!navigator.mediaDevices || !window.MediaRecorder) throw new Error("This browser cannot record audio.");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      const chunks = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        setAudioUrl(URL.createObjectURL(new Blob(chunks, { type: recorder.mimeType || "audio/webm" })));
        stream.getTracks().forEach((t) => t.stop());
        setRecording(false);
      };
      recorderRef.current = recorder;
      recorder.start();
      setAudioUrl("");
      setRecording(true);
    } catch (err) {
      setRecError(err.name === "NotAllowedError" ? "Microphone permission was blocked. Allow it in the browser address bar to record." : err.message);
    }
  }

  function stopRecording() {
    if (recorderRef.current && recorderRef.current.state !== "inactive") recorderRef.current.stop();
  }

  function saveSession() {
    const seconds = timer.elapsed;
    if (seconds < 5) {
      setMessage("Run the timer for a little longer before saving a session.");
      return;
    }
    setSessions((prev) => [...prev, { topic: topic.title, category: topic.category, seconds, date: new Date().toISOString() }].slice(-200));
    logActivity();
    setMessage(`Session saved (${formatTime(seconds)} on this topic).`);
  }

  const visible = category === "All" ? gdTopics : gdTopics.filter((t) => t.category === category);

  return (
    <div className="coding-page">
      <div className="coding-header">
        <div>
          <p className="coding-eyebrow">PREPAI COMMUNICATION LAB</p>
          <h1>Group Discussion</h1>
          <p>Random topics, a timer, notes, voice recording and proven frameworks.</p>
        </div>
        <div className="coding-progress">
          <strong>{sessions.length}</strong>
          <span>sessions completed</span>
        </div>
      </div>

      <div className="coding-tabs">
        <button className={tab === "practice" ? "active" : ""} onClick={() => setTab("practice")}>Practice</button>
        <button className={tab === "topics" ? "active" : ""} onClick={() => setTab("topics")}>Topic bank ({gdTopics.length})</button>
        <button className={tab === "frameworks" ? "active" : ""} onClick={() => setTab("frameworks")}>Frameworks</button>
        <button className={tab === "tips" ? "active" : ""} onClick={() => setTab("tips")}>Phrases & tips</button>
      </div>

      {tab === "practice" && (
        <section className="practice-card">
          <div className="coding-controls">
            <label>Category
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {["All", ...gdCategories].map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
            <label>Mode
              <select value={length} onChange={(e) => changeLength(Number(e.target.value))}>
                {lengths.map((l) => <option key={l.seconds} value={l.seconds}>{l.label}</option>)}
              </select>
            </label>
            <button className="primary-btn m-self-end" onClick={randomTopic}>New random topic</button>
          </div>

          <div className="practice-meta"><span>{topic.category}</span></div>
          <h2>{topic.title}</h2>

          <button className="secondary-btn" onClick={() => setShowHints((v) => !v)} aria-expanded={showHints}>
            {showHints ? "Hide angles" : "Show angles to consider"}
          </button>
          {showHints && (
            <div className="m-hints">
              <div><p className="m-label">A point in favour</p><p>{topic.pro}</p></div>
              <div><p className="m-label">A point against</p><p>{topic.con}</p></div>
            </div>
          )}

          <div className="m-timer-row">
            <div className={`m-timer ${timer.left === 0 ? "done" : ""}`} role="timer" aria-label="Discussion timer">{formatTime(timer.left)}</div>
            {timer.running ? (
              <button className="secondary-btn" onClick={timer.pause}>Pause</button>
            ) : (
              <button className="primary-btn" onClick={timer.start} disabled={timer.left === 0}>Start</button>
            )}
            <button className="secondary-btn" onClick={() => { timer.reset(length); setMessage(""); }}>Reset</button>
            <button className="secondary-btn" onClick={saveSession}>Save session</button>
          </div>
          {message && <p className="practice-feedback" aria-live="polite">{message}</p>}

          <label className="m-label" htmlFor="gd-notes">Your notes (points, examples, conclusion)</label>
          <textarea id="gd-notes" className="m-textarea" rows={5} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Opening line... Point 1... Example... Conclusion..." />

          <div className="m-recorder">
            <p className="m-label">Voice recorder</p>
            <div className="m-row m-wrap m-gap">
              {recording ? (
                <button className="primary-btn" onClick={stopRecording}>Stop recording</button>
              ) : (
                <button className="secondary-btn" onClick={startRecording}>Record my speech</button>
              )}
              {recording && <span className="m-live">● Recording</span>}
            </div>
            {audioUrl && (
              <div>
                <audio controls src={audioUrl} className="m-audio" />
                <p className="m-muted">Listen for filler words, pace and clarity. The recording stays in this tab and is not uploaded.</p>
              </div>
            )}
            {recError && <p className="apt-error" role="alert">{recError}</p>}
          </div>
        </section>
      )}

      {tab === "topics" && (
        <>
          <div className="m-row m-wrap m-gap">
            {["All", ...gdCategories].map((c) => (
              <button key={c} className={`m-pill ${category === c ? "on" : ""}`} aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</button>
            ))}
          </div>
          <section className="m-stack">
            {visible.map((t) => (
              <details className="m-details" key={t.id}>
                <summary><span>{t.title}</span><span className="m-tag">{t.category}</span></summary>
                <p><strong>For:</strong> {t.pro}</p>
                <p><strong>Against:</strong> {t.con}</p>
                <button className="secondary-btn" onClick={() => { setTopic(t); setTab("practice"); setNotes(""); setMessage(""); setShowHints(false); timer.reset(length); }}>Practise this topic</button>
              </details>
            ))}
          </section>
        </>
      )}

      {tab === "frameworks" && (
        <div className="m-grid">
          {gdFrameworks.map((f) => (
            <article className="m-card" key={f.name}>
              <h3>{f.name}</h3>
              <ol className="m-list">{f.steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
            </article>
          ))}
        </div>
      )}

      {tab === "tips" && (
        <div className="m-grid">
          <article className="m-card"><h3>Opening lines</h3><ul className="m-list">{gdOpeners.map((s, i) => <li key={i}>{s}</li>)}</ul></article>
          <article className="m-card"><h3>Linking to others</h3><ul className="m-list">{gdLinkers.map((s, i) => <li key={i}>{s}</li>)}</ul></article>
          <article className="m-card"><h3>Closing lines</h3><ul className="m-list">{gdClosers.map((s, i) => <li key={i}>{s}</li>)}</ul></article>
          <article className="m-card"><h3>Do</h3><ul className="m-list">{gdDos.map((s, i) => <li key={i}>{s}</li>)}</ul></article>
          <article className="m-card"><h3>Don't</h3><ul className="m-list">{gdDonts.map((s, i) => <li key={i}>{s}</li>)}</ul></article>
        </div>
      )}
    </div>
  );
}
