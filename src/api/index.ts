import axios from "axios";
const api = axios.create({
        baseURL: (import.meta as unknown as { env: Record<string, string> }).env?.VITE_API_BASE_URL || "/api",
        timeout: 30000,
        withCredentials: true,
        headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
        },
});
api.interceptors.request.use(
        (config) => {
                const token = localStorage.getItem("jwtToken");
                if (token && config.headers) {
                        config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
        },
        (error) => {
                return Promise.reject(error);
        }
);
api.interceptors.response.use(
        (res) => res,
        (err) => {
                return Promise.reject(err);
        }
);

// Form API methods
export const generateForm = async (prompt: string) => {
        const response = await api.post("/form/generate-form", { prompt });
        return response.data;
};

export const reviseForm = async (formId: string, prompt: string) => {
        const response = await api.post(`/form/revise-form/${formId}`, { prompt });
        return response.data;
};

export const finalizeForm = async (formId: string) => {
        const response = await api.post(`/form/finalize-form/${formId}`);
        return response.data;
};

export default api;
