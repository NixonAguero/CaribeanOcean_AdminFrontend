export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  name : string;
  password: string;
  email : string;
}

export interface LoginResponse {
  token?: string;
  username?: string;
  expiresAt?: string;
}

export interface AuthSession {
  token: string;
  username: string;
  expiresAt?: string;
}
