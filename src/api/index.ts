// src/utils/api.ts
import axios from "axios";

// we no longer manually read or set Authorization headers
const api = axios.create({
        baseURL:
                (import.meta as unknown as { env: Record<string, string> }).env
                        ?.VITE_API_BASE_URL || "/api",
        timeout: 30000,
        withCredentials: true, // cookies are sent automatically
        headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
        },
});

// global error handling stays the same…
api.interceptors.response.use(
        (res) => res,
        (err) => {
                // if (err.response?.status === 401) {
                //         window.location.href = "/signin";
                //         return Promise.reject(new Error("Not authenticated"));
                // }
                return Promise.reject(err);
        }
);

export default api;
