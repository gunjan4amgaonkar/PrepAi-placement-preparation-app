// Builds one overview object from everything the modules saved in this browser.
import { KEYS, load, currentStreak } from "./storage.js";
import { problems } from "./codingData.js";
import { techQuestions, hrQuestions } from "./data/interviewData.js";

export function getOverview(profile) {
  const codingDone = load(KEYS.codingCompleted, []).length;
  const codingTotal = problems.length;

  const aptHistory = load(KEYS.aptitudeHistory, []);
  const aptScore = aptHistory.reduce((t, h) => t + h.score, 0);
  const aptTotal = aptHistory.reduce((t, h) => t + h.total, 0);
  const aptAccuracy = aptTotal ? Math.round((aptScore / aptTotal) * 100) : null;
  const aptByTopic = {};
  aptHistory.forEach((h) => {
    const row = (aptByTopic[h.topic] = aptByTopic[h.topic] || { score: 0, total: 0 });
    row.score += h.score;
    row.total += h.total;
  });

  const mockHistory = load(KEYS.mockHistory, []);
  const mockPercents = mockHistory.map((m) => Math.round((m.score / m.total) * 100));
  const mockAvg = mockPercents.length ? Math.round(mockPercents.reduce((a, b) => a + b, 0) / mockPercents.length) : null;
  const mockBest = mockPercents.length ? Math.max(...mockPercents) : null;
  const mockSections = {};
  mockHistory.forEach((m) => {
    Object.entries(m.sections || {}).forEach(([name, s]) => {
      const row = (mockSections[name] = mockSections[name] || { score: 0, total: 0 });
      row.score += s.score;
      row.total += s.total;
    });
  });

  const techKnown = Object.values(load(KEYS.techKnown, {})).filter((v) => v === "known").length;
  const hrPracticed = Object.keys(load(KEYS.hrPractice, {})).length;
  const gdSessions = load(KEYS.gdSessions, []);

  const roadmap = load(KEYS.roadmap, null);
  const roadmapDone = load(KEYS.roadmapDone, {});
  const roadmapTasks = roadmap ? roadmap.weeks.reduce((t, w) => t + w.tasks.length, 0) : 0;
  const roadmapPercent = roadmapTasks ? Math.round((Object.keys(roadmapDone).length / roadmapTasks) * 100) : 0;

  const profileDone = Boolean(profile && profile.name && profile.email);

  const parts = [
    [10, profileDone ? 100 : 0],
    [20, (codingDone / codingTotal) * 100],
    [20, aptAccuracy ?? 0],
    [20, mockAvg ?? 0],
    [10, (techKnown / techQuestions.length) * 100],
    [10, (hrPracticed / hrQuestions.length) * 100],
    [5, Math.min(100, (gdSessions.length / 5) * 100)],
    [5, roadmapPercent],
  ];
  const readiness = Math.round(parts.reduce((t, [w, v]) => t + (w * Math.min(100, v)) / 100, 0));

  return {
    profileDone, codingDone, codingTotal,
    aptHistory, aptAccuracy, aptByTopic, aptSets: aptHistory.length,
    mockHistory, mockAvg, mockBest, mockSections,
    techKnown, techTotal: techQuestions.length,
    hrPracticed, hrTotal: hrQuestions.length,
    gdSessions, roadmap, roadmapPercent, roadmapTasks,
    streak: currentStreak(),
    readiness,
  };
}

export function readinessLabel(value) {
  if (value >= 75) return "Almost ready";
  if (value >= 40) return "Making progress";
  return "Getting started";
}
