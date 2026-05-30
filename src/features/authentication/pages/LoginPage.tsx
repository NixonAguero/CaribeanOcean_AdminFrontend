import { useState } from "react";
import type { FormEvent } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import heroImage from "../../../assets/images/rooms/ocean-view-suite.jpg";
import { login } from "../services/authentication.service";
import { isAuthenticated } from "../services/session.service";
import "./Authentication.css";

type LocationState = {
  from?: {
    pathname?: string;
  };
};

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const redirectTo = state?.from?.pathname ?? "/admin/rooms";

  if (isAuthenticated()) {
    return <Navigate to="/admin/rooms" replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!username.trim() || !password) {
      setError("Enter your username and password.");
      return;
    }

    try {
      setIsSubmitting(true);
      await login({ username: username.trim(), password: password });
      navigate(redirectTo, { replace: true });
    } catch {
      setError("Username or password is incorrect.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-panel">
        <form className="auth-form" onSubmit={handleSubmit}>
          <p className="auth-eyebrow">Admin module</p>
          <h1>Login</h1>
          <p className="auth-subtitle">Enter your account details</p>

          <label className="auth-field">
            <span>Username</span>
            <input
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Username"
            />
          </label>

          <label className="auth-field">
            <span>Password</span>
            <div className="auth-password">
              <input
                autoComplete="current-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((current) => !current)}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </label>

          {error && <p className="auth-error">{error}</p>}

          <button className="auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Loading..." : "Login"}
          </button>

          <div className="auth-switch">
            <span>Don&apos;t have an account?</span>
            <Link to="/admin/register">Sign up</Link>
          </div>
        </form>
      </div>

      <div className="auth-hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="auth-hero__overlay" />
        <div className="auth-hero__content">
          <p>Welcome to</p>
          <h2>Caribbean Ocean</h2>
        </div>
      </div>
    </section>
  );
}
