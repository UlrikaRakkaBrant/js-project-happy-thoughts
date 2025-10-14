// src/services/api.js
const API_BASE = "https://happy-thoughts-ux7hkzgmwa-uc.a.run.app";

export async function fetchThoughts() {
  const res = await fetch(`${API_BASE}/thoughts`);
  if (!res.ok) throw new Error("Failed to fetch thoughts");
  return res.json();
}

export async function createThought(message) {
  const res = await fetch(`${API_BASE}/thoughts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.errors?.message || "Failed to create thought");
  return data; // {_id, message, hearts, createdAt, ...}
}

export async function likeThought(id) {
  const res = await fetch(`${API_BASE}/thoughts/${id}/like`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to like thought");
  return res.json(); // may return the updated thought (safe to ignore)
}
