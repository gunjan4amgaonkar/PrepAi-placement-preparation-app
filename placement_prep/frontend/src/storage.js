// Small localStorage helpers shared by the modules and the dashboard.
// Everything is wrapped in try/catch so a blocked or full storage never crashes the app.

import { useEffect, useState } from "react";

export const KEYS = {
  profile: "prepai-profile",
  codingCompleted: "prepAI-coding-completed",
  aptitudeHistory: "prepai-aptitude-history",
  roadmap: "prepai-roadmap",
  roadmapDone: "prepai-roadmap-done",
  techKnown: "prepai-tech-known",
  hrPractice: "prepai-hr-practice",
  gdSessions: "prepai-gd-sessions",
  mockHistory: "prepai-mock-history",
  bookmarks: "prepai-bookmarks",
  customQuestions: "prepai-custom-questions",
  customPyqs: "prepai-custom-pyqs",
  activity: "prepai-activity",
};

export function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable – ignore */
  }
}

// Aptitude: [{ topic, difficulty, score, total, date }]
export function recordAptitudeResult(result) {
  const history = load(KEYS.aptitudeHistory, []);
  save(KEYS.aptitudeHistory, [...history, { ...result, date: new Date().toISOString() }].slice(-100));
  logActivity();
}

export function aptitudeSummary() {
  const history = load(KEYS.aptitudeHistory, []);
  const score = history.reduce((t, h) => t + h.score, 0);
  const total = history.reduce((t, h) => t + h.total, 0);
  return { sets: history.length, accuracy: total ? Math.round((score / total) * 100) : null };
}

// React hook: state that is saved to localStorage whenever it changes.
export function useStored(key, initial) {
  const [value, setValue] = useState(() => load(key, initial));
  useEffect(() => {
    save(key, value);
  }, [key, value]);
  return [value, setValue];
}

// ---- Activity log (one counter per day) used for streaks and the progress page ----
export function dayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function logActivity(amount = 1) {
  const log = load(KEYS.activity, {});
  const key = dayKey();
  log[key] = (log[key] || 0) + amount;
  save(KEYS.activity, log);
}

export function currentStreak() {
  const log = load(KEYS.activity, {});
  const date = new Date();
  // If nothing yet today, the streak can still be alive from yesterday.
  if (!log[dayKey(date)]) date.setDate(date.getDate() - 1);
  let streak = 0;
  while (log[dayKey(date)]) {
    streak += 1;
    date.setDate(date.getDate() - 1);
  }
  return streak;
}
