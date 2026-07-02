import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../lib/api.js";
import Background from "../components/Background.jsx";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/auth/signup", { name, email, password });
      setDone(true);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
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
          <EmailSent email={email} />
        ) : (
          <>
            <Link to="/" className="mb-6 inline-block text-[14px] no-underline transition-colors hover:text-white" style={{ color: "var(--color-ink-muted)" }}>
              ← Back to home
            </Link>

            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold tracking-[-0.8px]" style={{ color: "var(--color-ink)" }}>Create your account</h1>
              <p className="mt-1 text-[14px]" style={{ color: "var(--color-ink-muted)" }}>Start chatting with your PDFs</p>
            </div>

            {error && (
              <div className="mb-4 rounded-[10px] px-4 py-3 text-[14px]" style={{ border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.1)", color: "#fca5a5" }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Field label="Name" type="text" value={name} onChange={setName} placeholder="Your name" />
              <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
              <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="At least 6 characters" />
              <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-[15px]" style={{ opacity: loading ? 0.5 : 1 }}>
                {loading ? "Creating..." : "Sign up"}
              </button>
            </form>

            <p className="mt-6 text-center text-[14px]" style={{ color: "var(--color-ink-muted)" }}>
              Already have an account?{" "}
              <Link to="/login" className="font-semibold no-underline hover:underline" style={{ color: "var(--color-accent)" }}>
                Log in
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function EmailSent({ email }) {
  return (
    <div className="py-4 text-center">
      <div className="mb-4 flex items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ background: "rgba(0,153,255,0.12)" }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0099ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </div>
      </div>
      <h2 className="mb-2 text-xl font-bold tracking-[-0.5px]" style={{ color: "var(--color-ink)" }}>Check your email</h2>
      <p className="mb-1 text-[14px]" style={{ color: "var(--color-ink-muted)" }}>
        We sent a verification link to
      </p>
      <p className="mb-4 font-semibold text-[14px]" style={{ color: "var(--color-ink)" }}>{email}</p>
      <p className="text-[13px]" style={{ color: "var(--color-ink-muted)" }}>
        Click the link in the email to activate your account. The link expires in 24 hours.
      </p>
      <p className="mt-6 text-[13px]" style={{ color: "var(--color-ink-muted)" }}>
        Already verified?{" "}
        <Link to="/login" className="font-semibold no-underline hover:underline" style={{ color: "var(--color-accent)" }}>
          Log in
        </Link>
      </p>
    </div>
  );
}

function Field({ label, type, value, onChange, placeholder }) {
  return (
    <div>
      <label className="mb-1.5 block text-[14px] font-medium" style={{ color: "var(--color-ink-muted)" }}>{label}</label>
      <input
        type={type}
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
