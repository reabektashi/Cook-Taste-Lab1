import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5173/api",
  withCredentials: true,
});

// Attach token to all requests automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
