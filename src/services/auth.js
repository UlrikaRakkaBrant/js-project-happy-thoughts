// src/services/auth.js
import { API_BASE } from "./apiBase";

// helper to extract meaningful backend errors
function extractError(data, fallback) {
  return data?.error || data?.message || fallback;
}

export async function signup({ username, password }) {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(extractError(data, "Signup failed"));
  }

  // expected: { userId, username, token }
  return data;
}

export async function login({ username, password }) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(extractError(data, "Login failed"));
  }

  return data;
}
