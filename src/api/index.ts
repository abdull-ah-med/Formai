import axios from "axios";

// Standard timeout for most requests
const DEFAULT_TIMEOUT = 30000; // 30 seconds

// Extended timeout for form generation/revision operations that use Claude API
const FORM_GENERATION_TIMEOUT = 60000; // 1 minute (decreased from 3 minutes)

const api = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
	timeout: DEFAULT_TIMEOUT,
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

export const generateForm = async (prompt: string) => {
	// Use the longer timeout for Claude API calls
	const response = await api.post(
		"/form/generate-form",
		{ prompt },
		{
			timeout: FORM_GENERATION_TIMEOUT,
		}
	);
	return response.data;
};

export const reviseForm = async (formId: string, prompt: string) => {
	// Use the longer timeout for Claude API calls
	const response = await api.post(
		`/form/revise-form/${formId}`,
		{ prompt },
		{
			timeout: FORM_GENERATION_TIMEOUT,
		}
	);
	return response.data;
};

export const finalizeForm = async (formId: string) => {
	const response = await api.post(`/form/finalize-form/${formId}`);
	return response.data;
};

export const getFormHistory = async () => {
	const response = await api.get("/form/forms/history");
	return response.data;
};

export const deleteAccount = async () => {
	const response = await api.delete("/account");
	return response.data;
};

export default api;
