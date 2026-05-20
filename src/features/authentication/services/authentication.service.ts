import apiClient from "../../../shared/services/apliClient";
import type {
  AuthSession,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from "../types/authentication.type";
import { saveSession } from "./session.service";

function normalizeSession(response: LoginResponse, fallbackUsername: string): AuthSession {
  const token = response.token ?? "";
  const userId = response.userId;
  const username = response.username ?? fallbackUsername;
  const expiresAt = response.expiresAt;

  return { token, userId, username, expiresAt };
}

export async function login(payload: LoginRequest): Promise<AuthSession> {
  const { data } = await apiClient.post<LoginResponse>("/Auth/login", payload);
  const session = normalizeSession(data, payload.username);

  if (!session.token) {
    throw new Error("The server response does not include a token.");
  }

  saveSession(session);
  return session;
}

export async function register(payload: RegisterRequest): Promise<number | string> {
  const { data } = await apiClient.post<{ id: number | string }>("/Auth/register", payload);
  return data.id;
}
