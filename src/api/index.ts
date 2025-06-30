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

// Handle authentication errors
api.interceptors.response.use(
        (res) => res,
        (err) => {
                return Promise.reject(err);
        }
);

export default api;
