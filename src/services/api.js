// src/services/api.js
import { USE_MOCK, API_BASE } from "./apiBase";
import {
  fetchThoughtsMock,
  createThoughtMock,
  likeThoughtMock,
} from "./mock";

// Helper: get token from localStorage and build auth header
function authHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// --- Get recent thoughts ---
export async function fetchThoughts() {
  if (USE_MOCK) {
    return fetchThoughtsMock();
  }

  const res = await fetch(`${API_BASE}/thoughts`);
  if (!res.ok) {
    throw new Error(`Failed to fetch thoughts (${res.status})`);
  }

  const data = await res.json();

  // Your backend returns { total, page, limit, results }
  return Array.isArray(data.results) ? data.results : [];
}

// --- Create a new thought (AUTH required) ---
export async function createThought(message) {
  if (USE_MOCK) {
    return createThoughtMock(message);
  }

  const res = await fetch(`${API_BASE}/thoughts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify({ message }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // Your API hopefully sends something like { message: "..." } or { errors: ... }
    throw new Error(data.message || "Failed to create thought");
  }

  return data;
}

// --- Like a thought (AUTH required) ---
export async function likeThought(id) {
  if (USE_MOCK) {
    return likeThoughtMock(id);
  }

  const res = await fetch(`${API_BASE}/thoughts/${id}/like`, {
    method: "POST",
    headers: {
      ...authHeader(),
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || `Failed to like thought (${res.status})`);
  }

  return data;
}

// --- Update a thought (AUTH + owner only) ---
export async function updateThought(id, updates) {
  const res = await fetch(`${API_BASE}/thoughts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(updates),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Failed to update thought");
  }

  return data;
}

// --- Delete a thought (AUTH + owner only) ---
export async function deleteThought(id) {
  const res = await fetch(`${API_BASE}/thoughts/${id}`, {
    method: "DELETE",
    headers: {
      ...authHeader(),
    },
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Failed to delete thought");
  }

  return true;
}
