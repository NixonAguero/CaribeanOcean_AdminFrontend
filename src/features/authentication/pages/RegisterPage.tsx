import { useState } from "react";
import type { FormEvent } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import heroImage from "../../../assets/images/rooms/family-suite.jpg";
import {
  login,
  register,
} from "../services/authentication.service";
import { isAuthenticated } from "../services/session.service";
import "./Authentication.css";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  if (isAuthenticated()) {
    return <Navigate to="/admin/rooms" replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!username.trim() || !name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsSubmitting(true);
      await register({ username: username.trim(), name: name.trim(), password: password, email: email.trim() });
      await login({ username: username.trim(), password: password });
      navigate("/admin/rooms", { replace: true });
    } catch(error : any) {
      console.error("Registration error:", error);
      setError(error.response.data.message || "An error occurred while creating the account.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-panel">
        <form className="auth-form" onSubmit={handleSubmit}>
          <p className="auth-eyebrow">Admin module</p>
          <h1>Sign up</h1>
          <p className="auth-subtitle">Create an administrator account</p>

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
            <span>Name</span>
            <input
              autoComplete="username"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Name"
            />
          </label>

          <label className="auth-field">
            <span>Email</span>
            <input
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
            />
          </label>

          <label className="auth-field">
            <span>Password</span>
            <div className="auth-password">
              <input
                autoComplete="new-password"
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

          <label className="auth-field">
            <span>Confirm password</span>
            <input
              autoComplete="new-password"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirm password"
            />
          </label>

          {error && <p className="auth-error">{error}</p>}

          <button className="auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create account"}
          </button>

          <div className="auth-switch">
            <span>Already have an account?</span>
            <Link to="/admin/login">Login</Link>
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
