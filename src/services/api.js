// src/services/api.js
import { USE_MOCK, API_BASE } from "./apiBase";
import {
  fetchThoughtsMock,
  createThoughtMock,
  likeThoughtMock,
} from "./mock";

// --- Fetch recent thoughts ---
export async function fetchThoughts() {
  // 🪄 If mock mode is on, skip real API
  if (USE_MOCK) return fetchThoughtsMock();

  try {
    const res = await fetch(`${API_BASE}/thoughts`);
    if (!res.ok) {
      throw new Error(`API returned ${res.status}`);
    }
    return res.json();
  } catch (err) {
    console.error("Failed to fetch thoughts:", err);
    alert(
      "The Happy Thoughts API is currently unavailable (503). You can keep working with mock data — flip USE_MOCK to true in src/services/apiBase.js."
    );
    return [];
  }
}

// --- Create a new thought ---
export async function createThought(message) {
  if (USE_MOCK) return createThoughtMock(message);

  const res = await fetch(`${API_BASE}/thoughts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.errors?.message || "Failed to create thought");
  }
  return data;
}

// --- Like a thought ---
export async function likeThought(id) {
  if (USE_MOCK) return likeThoughtMock(id);

  const res = await fetch(`${API_BASE}/thoughts/${id}/like`, {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error(`Failed to like thought (${res.status})`);
  }

  return res.json().catch(() => ({}));
}
