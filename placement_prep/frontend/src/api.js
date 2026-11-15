// Tiny helper for calling the PrepAI backend.
const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function postJson(path, body) {
  let response;
  try {
    response = await fetch(BASE + path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("Cannot reach the backend. Start it with: node server.js (inside the backend folder).");
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Request failed.");
  return data;
}
