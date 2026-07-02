import axios from "axios";

// VITE_API_URL is set in frontend/.env for local dev
// and in the Vercel dashboard for production.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Before every request, attach the saved login token (if we have one).
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
