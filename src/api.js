const API_BASE = "https://silver-backend-real.onrender.com/api";

export async function fetchLatest() {
  const res = await fetch(`${API_BASE}/latest`);
  return res.json();
}

export async function fetchHistory() {
  const res = await fetch(`${API_BASE}/history`);
  return res.json();
}
