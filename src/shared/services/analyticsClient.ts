import axios from "axios";
import { getToken } from "../../features/authentication/services/session.service";

const analyticsClient = axios.create({
  baseURL: "http://localhost:8091",
});

analyticsClient.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

analyticsClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Analytics API Error:", error);
    return Promise.reject(error);
  }
);

export default analyticsClient;