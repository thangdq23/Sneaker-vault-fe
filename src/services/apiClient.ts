import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://sneaker-vault-be.onrender.com/api";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: {
    serialize: (params) => {
      const searchParams = new URLSearchParams();
      for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
          const val = params[key];
          if (val === undefined || val === null) {
            continue;
          }
          if (Array.isArray(val)) {
            for (const item of val) {
              searchParams.append(key, String(item));
            }
          } else {
            searchParams.append(key, String(val));
          }
        }
      }
      return searchParams.toString();
    },
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
