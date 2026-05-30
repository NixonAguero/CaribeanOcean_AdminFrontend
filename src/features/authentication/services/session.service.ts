import type { AuthSession } from "../types/authentication.type";

const TOKEN_KEY = "token";
const USER_KEY = "user";
const USER_ID_KEY = "userId";
const EXPIRES_AT_KEY = "expiresAt";

export function saveSession(session: AuthSession): void {
  localStorage.setItem(TOKEN_KEY, session.token);
  localStorage.setItem(USER_KEY, session.username);
  localStorage.setItem(USER_ID_KEY, session.userId.toString());

  if (session.expiresAt) {
    localStorage.setItem(EXPIRES_AT_KEY, session.expiresAt);
  } else {
    localStorage.removeItem(EXPIRES_AT_KEY);
  }
}

export function clearSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(EXPIRES_AT_KEY);
  sessionStorage.clear();
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUsername(): string {
  return localStorage.getItem(USER_KEY) ?? "Admin";
}

export function getUserId(): number | null {
  const userId = localStorage.getItem(USER_ID_KEY);
  return userId ? parseInt(userId, 10) : null;
}

export function isAuthenticated(): boolean {
  const token = getToken();
  const expiresAt = localStorage.getItem(EXPIRES_AT_KEY);

  if (!token) {
    return false;
  }

  if (expiresAt && new Date(expiresAt).getTime() <= Date.now()) {
    clearSession();
    return false;
  }

  return true;
}
