import { KEYS, load } from "./storage.js";

export const sections = ["Aptitude", "Technical", "Coding"];

// Questions added in the Admin Panel. Only verified ones are used in mock tests.
export function getCustomQuestions() {
  return load(KEYS.customQuestions, []);
}

export function getVerifiedCustom() {
  return getCustomQuestions().filter((q) => q.verified);
}

// Checks one question object; returns an error message or "".
export function validateQuestion(q) {
  if (!q || typeof q.question !== "string" || q.question.trim().length < 10) return "The question must be at least 10 characters.";
  if (!Array.isArray(q.options) || q.options.length !== 4 || q.options.some((o) => typeof o !== "string" || !o.trim())) return "Provide four non-empty options.";
  if (new Set(q.options.map((o) => o.trim().toLowerCase())).size !== 4) return "The four options must be different.";
  if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) return "Choose which option is correct.";
  if (!sections.includes(q.section)) return "Choose a section.";
  return "";
}
