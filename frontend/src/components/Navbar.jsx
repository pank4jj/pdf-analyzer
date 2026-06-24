import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: "Features", href: "/#features" },
    { label: "How it works", href: "/#how" },
    { label: "FAQ", href: "/#faq" },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-hairline-soft bg-canvas/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3.5 sm:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 no-underline">

          <span className="text-[15px] font-semibold text-ink tracking-[-0.15px]">DocuMind</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[14px] font-medium text-ink-muted no-underline transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <Link to="/dashboard" className="btn-primary text-[14px] no-underline">Dashboard</Link>
          ) : (
            <>
              <Link to="/login" className="btn-secondary text-[14px] no-underline">Log in</Link>
              <Link to="/signup" className="btn-primary no-underline">Sign up</Link>
            </>
          )}
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-hairline-soft md:hidden"
          style={{ background: "var(--color-surface-1)", color: "var(--color-ink)", cursor: "pointer" }}
          aria-label="Toggle menu"
        >
          {open ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="4" y1="4" x2="14" y2="14" /><line x1="14" y1="4" x2="4" y2="14" /></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="2" y1="4.5" x2="16" y2="4.5" /><line x1="2" y1="9" x2="16" y2="9" /><line x1="2" y1="13.5" x2="16" y2="13.5" /></svg>
          )}
        </button>
      </nav>

      {open && (
        <div className="border-t border-hairline-soft px-4 py-4 md:hidden" style={{ background: "var(--color-canvas)" }}>
          <div className="flex flex-col gap-2">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-[14px] font-medium text-ink-muted no-underline hover:bg-surface-1 hover:text-ink"
              >
                {l.label}
              </a>
            ))}
            <hr className="my-1 border-hairline-soft" />
            {user ? (
              <Link to="/dashboard" className="btn-primary block w-full text-center no-underline">Dashboard</Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="mb-2 block rounded-full px-4 py-2.5 text-center text-[14px] font-medium text-ink no-underline"
                  style={{ background: "var(--color-surface-1)" }}
                >
                  Log in
                </Link>
                <Link to="/signup" className="btn-primary block w-full text-center no-underline">Sign up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
