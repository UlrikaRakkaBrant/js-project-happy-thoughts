// Use Netlify env in prod, fall back to /api for local dev proxy
export const API_BASE = import.meta.env.VITE_API_BASE || '/api';
export const USE_MOCK = false; // toggle if you need offline dev
