import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../lib/api.js";
import Background from "../components/Background.jsx";

export default function VerifyEmail() {
  const { token } = useParams();
  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"
  const [message, setMessage] = useState("");

  useEffect(() => {
    api
      .get(`/auth/verify-email/${token}`)
      .then((res) => {
        setMessage(res.data.message);
        setStatus("success");
      })
      .catch((err) => {
        setMessage(err.response?.data?.message || "Verification failed.");
        setStatus("error");
      });
  }, [token]);

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4">
      <Background />
      <div
        className="w-full max-w-md animate-fade-up rounded-[20px] p-8 text-center shadow-2xl"
        style={{ background: "var(--color-surface-1)", border: "1px solid var(--color-hairline-soft)" }}
      >
        {status === "loading" && (
          <>
            <div className="mb-4 flex items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-transparent" style={{ borderTopColor: "var(--color-accent)" }} />
            </div>
            <p style={{ color: "var(--color-ink-muted)" }}>Verifying your email…</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="mb-4 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ background: "rgba(34,197,94,0.12)" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>
            <h2 className="mb-2 text-xl font-bold tracking-[-0.5px]" style={{ color: "var(--color-ink)" }}>Email Verified!</h2>
            <p className="mb-6 text-[14px]" style={{ color: "var(--color-ink-muted)" }}>{message}</p>
            <Link to="/login" className="btn-primary inline-block px-8 py-3 text-[15px] no-underline">
              Log in
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mb-4 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ background: "rgba(239,68,68,0.12)" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
            </div>
            <h2 className="mb-2 text-xl font-bold tracking-[-0.5px]" style={{ color: "var(--color-ink)" }}>Verification Failed</h2>
            <p className="mb-6 text-[14px]" style={{ color: "var(--color-ink-muted)" }}>{message}</p>
            <Link to="/signup" className="text-[14px] no-underline hover:underline" style={{ color: "var(--color-accent)" }}>
              Sign up again
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
