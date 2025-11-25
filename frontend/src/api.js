import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5174/api",
  withCredentials: true,
});

// Attach token to all requests automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and we haven't tried to refresh yet
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        // user is not logged in at all
        return Promise.reject(error);
      }

      // If a refresh is already happening, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            originalRequest.headers.Authorization = "Bearer " + newToken;
            return API(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // get userId from localStorage so backend knows whose refresh token to check
        const userStr = localStorage.getItem("user");
        const user = userStr ? JSON.parse(userStr) : null;
        const userId = user?.id;

        const res = await API.post("/refresh", { userId });
        const newToken = res.data.token;

        // save new access token
        localStorage.setItem("token", newToken);

        // wake up queued requests
        processQueue(null, newToken);
        isRefreshing = false;

        // retry the original request with the new token
        originalRequest.headers.Authorization = "Bearer " + newToken;
        return API(originalRequest);
      } catch (err) {
        processQueue(err, null);
        isRefreshing = false;

        // refresh failed → log user out locally
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");

        // optional: redirect to login
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);



export default API;
