import axios from "axios";
import {
  clearSession,
  getToken,
} from "../../features/authentication/services/session.service";

const apiClient = axios.create({
  baseURL: "http://localhost:5287/api",
  
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Enviar la pantalla actual en cada petición
  config.headers["X-Screen"] = window.location.pathname;

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);

    if (error.response?.status === 401 && window.location.pathname !== "/admin/login") {
      clearSession();
      window.location.href = "/admin/login";
    }

    return Promise.reject(error);
  }
);

export default apiClient;
