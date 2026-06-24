import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-hairline-soft" style={{ background: "var(--color-canvas)" }}>
      <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-8">
        {/* Top: brand + link columns */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 no-underline">

              <span className="text-[15px] font-semibold tracking-[-0.15px]" style={{ color: "var(--color-ink)" }}>
                DocuMind
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed" style={{ color: "var(--color-ink-muted)" }}>
              Chat with your documents. Upload any PDF and instantly get summaries, key points, and answers — powered by AI.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-[13px] font-semibold tracking-[-0.13px]" style={{ color: "var(--color-ink)" }}>Product</h4>
            <ul className="space-y-2.5 list-none p-0 m-0">
              <li><a href="/#features" className="text-[13px] no-underline transition-colors hover:text-ink" style={{ color: "var(--color-ink-muted)" }}>Features</a></li>
              <li><a href="/#how" className="text-[13px] no-underline transition-colors hover:text-ink" style={{ color: "var(--color-ink-muted)" }}>How it works</a></li>
              <li><a href="/#faq" className="text-[13px] no-underline transition-colors hover:text-ink" style={{ color: "var(--color-ink-muted)" }}>FAQ</a></li>
              <li><Link to="/dashboard" className="text-[13px] no-underline transition-colors hover:text-ink" style={{ color: "var(--color-ink-muted)" }}>Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[13px] font-semibold tracking-[-0.13px]" style={{ color: "var(--color-ink)" }}>Resources</h4>
            <ul className="space-y-2.5 list-none p-0 m-0">
              <li><Link to="/login" className="text-[13px] no-underline transition-colors hover:text-ink" style={{ color: "var(--color-ink-muted)" }}>Log in</Link></li>
              <li><Link to="/signup" className="text-[13px] no-underline transition-colors hover:text-ink" style={{ color: "var(--color-ink-muted)" }}>Sign up</Link></li>
              <li><span className="text-[13px]" style={{ color: "var(--color-ink-muted)" }}>API (coming soon)</span></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[13px] font-semibold tracking-[-0.13px]" style={{ color: "var(--color-ink)" }}>Company</h4>
            <ul className="space-y-2.5 list-none p-0 m-0">
              <li><span className="text-[13px]" style={{ color: "var(--color-ink-muted)" }}>About</span></li>
              <li><span className="text-[13px]" style={{ color: "var(--color-ink-muted)" }}>Blog</span></li>
              <li><span className="text-[13px]" style={{ color: "var(--color-ink-muted)" }}>Contact</span></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[13px] font-semibold tracking-[-0.13px]" style={{ color: "var(--color-ink)" }}>Legal</h4>
            <ul className="space-y-2.5 list-none p-0 m-0">
              <li><span className="text-[13px]" style={{ color: "var(--color-ink-muted)" }}>Privacy Policy</span></li>
              <li><span className="text-[13px]" style={{ color: "var(--color-ink-muted)" }}>Terms of Service</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row" style={{ borderColor: "var(--color-hairline-soft)" }}>
          <p className="text-[12px]" style={{ color: "var(--color-ink-muted)" }}>
            © 2026 DocuMind. All rights reserved.
          </p>
          <p className="text-[12px]" style={{ color: "var(--color-ink-muted)" }}>
            Built with Dedication & Luv
          </p>
        </div>
      </div>
    </footer>
  );
}
