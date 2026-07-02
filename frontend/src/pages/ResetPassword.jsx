import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../lib/api.js";
import Background from "../components/Background.jsx";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }
    if (password !== confirm) {
      return setError("Passwords do not match.");
    }

    setLoading(true);
    try {
      await api.post(`/auth/reset-password/${token}`, { password });
      setDone(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4">
      <Background />
      <div
        className="w-full max-w-md animate-fade-up rounded-[20px] p-8 shadow-2xl"
        style={{ background: "var(--color-surface-1)", border: "1px solid var(--color-hairline-soft)" }}
      >
        {done ? (
          <div className="py-4 text-center">
            <div className="mb-4 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ background: "rgba(34,197,94,0.12)" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>
            <h2 className="mb-2 text-xl font-bold tracking-[-0.5px]" style={{ color: "var(--color-ink)" }}>Password Reset!</h2>
            <p className="mb-4 text-[14px]" style={{ color: "var(--color-ink-muted)" }}>Your password has been updated. Redirecting to login…</p>
            <Link to="/login" className="text-[14px] no-underline hover:underline" style={{ color: "var(--color-accent)" }}>
              Go to login
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold tracking-[-0.8px]" style={{ color: "var(--color-ink)" }}>Set new password</h1>
              <p className="mt-1 text-[14px]" style={{ color: "var(--color-ink-muted)" }}>Choose a new password for your account</p>
            </div>

            {error && (
              <div className="mb-4 rounded-[10px] px-4 py-3 text-[14px]" style={{ border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.1)", color: "#fca5a5" }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Field label="New password" value={password} onChange={setPassword} placeholder="At least 6 characters" />
              <Field label="Confirm password" value={confirm} onChange={setConfirm} placeholder="Repeat your password" />
              <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-[15px]" style={{ opacity: loading ? 0.5 : 1 }}>
                {loading ? "Saving..." : "Reset password"}
              </button>
            </form>

            <p className="mt-6 text-center text-[14px]">
              <Link to="/login" className="no-underline hover:underline" style={{ color: "var(--color-ink-muted)" }}>
                ← Back to login
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="mb-1.5 block text-[14px] font-medium" style={{ color: "var(--color-ink-muted)" }}>{label}</label>
      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required
        className="w-full rounded-[10px] px-4 py-3 text-[15px] text-white placeholder-gray-500 outline-none transition"
        style={{ background: "var(--color-surface-2)", border: "1px solid var(--color-hairline-soft)" }}
        onFocus={(e) => {
          e.target.style.borderColor = "var(--color-accent)";
          e.target.style.boxShadow = "0 0 0 1px rgba(0,153,255,0.25)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "var(--color-hairline-soft)";
          e.target.style.boxShadow = "none";
        }}
      />
    </div>
  );
}
