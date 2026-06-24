import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Background from "../components/Background.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const features = [
  { title: "Instant Summaries", desc: "Get a clear summary of any PDF in seconds, no matter how long it is." },
  { title: "Key Points", desc: "Pull out the most important points and takeaways automatically." },
  { title: "Ask Anything", desc: "Chat back and forth — ask follow-up questions about the content." },
  { title: "Private & Secure", desc: "Your PDFs are tied to your account and only you can access them." },
];

const steps = [
  { step: 1, title: "Upload your PDF", desc: "Drag and drop or pick a file. We support documents up to 20 MB." },
  { step: 2, title: "Ask a question", desc: "Request a summary, key points, or ask anything about the document." },
  { step: 3, title: "Get instant answers", desc: "The AI reads the full PDF and replies in a familiar chat view." },
];

const faqs = [
  { q: "Is it really free?", a: "Yes. It runs on Google Gemini's free tier, so you can analyze PDFs at no cost." },
  { q: "What file types are supported?", a: "Currently PDF files up to 20 MB. More formats may come later." },
  { q: "Are my documents safe?", a: "Your PDFs are linked to your account and protected behind login — only you can open them." },
  { q: "Do I need to install anything?", a: "No. It runs entirely in your browser. Just sign up and upload." },
];

export default function Home() {
  const { user } = useAuth();
  const primaryHref = user ? "/dashboard" : "/signup";
  const primaryLabel = user ? "Open Dashboard" : "Get started — it's free";

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Background />
      <Navbar />

      <section className="mx-auto grid max-w-[1200px] items-center gap-12 px-4 pt-16 pb-24 sm:px-6 md:grid-cols-2 md:pt-28 md:pb-32">
        <div className="animate-fade-up text-center md:text-left">
          <span
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
            style={{ borderColor: "rgba(0,153,255,0.25)", background: "rgba(0,153,255,0.08)", color: "var(--color-accent)" }}
          >
            Powered by Google Gemini AI
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-[0.95] tracking-[-1.5px] text-ink sm:text-5xl lg:text-6xl lg:tracking-[-2.5px]">
            Chat with your{" "}
            <span className="bg-gradient-to-r from-[#6a4cf5] to-[#d44df0] bg-clip-text text-transparent">PDFs</span>{" "}
            in seconds
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-[16px] leading-relaxed text-ink-muted sm:text-[18px] md:mx-0 md:tracking-[-0.18px]">
            Upload any PDF and instantly get summaries, key points, and answers to
            your questions — just like chatting with an assistant who has read the
            whole document for you.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:justify-start">
            <Link to={primaryHref} className="btn-primary px-7 py-3.5 text-[15px] no-underline shadow-lg">
              {primaryLabel}
            </Link>
            <a href="#how" className="btn-secondary px-7 py-3.5 text-[15px] no-underline">See how it works</a>
          </div>
          <p className="mt-4 text-xs text-ink-muted">No credit card needed · Your files stay private</p>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: "150ms" }}>
          <div className="relative mx-auto max-w-md rounded-[30px] border border-hairline-soft p-5 shadow-2xl" style={{ background: "var(--color-surface-1)" }}>
            <div className="mb-4 flex items-center gap-2 border-b border-hairline-soft pb-3">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[13px] font-bold"
                style={{ background: "linear-gradient(135deg, var(--color-gradient-violet), var(--color-gradient-magenta))" }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 10V4.5a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h4" /><rect x="6" y="12" width="8" height="3.5" rx="1" /></svg>
              </span>
              <span className="truncate text-[14px] font-semibold text-ink">Quarterly-Report-2026.pdf</span>
            </div>
            <div className="space-y-3 text-[14px]">
              <div className="ml-auto max-w-[80%] rounded-[20px] rounded-br-[6px] px-4 py-2.5 text-canvas" style={{ background: "var(--color-ink)" }}>
                Summarize this document in 3 points.
              </div>
              <div className="max-w-[88%] rounded-[20px] rounded-bl-[6px] border border-hairline-soft px-4 py-2.5" style={{ background: "var(--color-surface-2)" }}>
                <p className="font-semibold text-ink">Here's the summary:</p>
                <ul className="mt-1.5 space-y-1 text-ink-muted">
                  <li>• Revenue grew 25% in Q1, led by online sales.</li>
                  <li>• Main risk: supply-chain delays.</li>
                  <li>• Recommendation: expand the mobile app.</li>
                </ul>
              </div>
              <div className="ml-auto max-w-[70%] rounded-[20px] rounded-br-[6px] px-4 py-2.5 text-canvas" style={{ background: "var(--color-ink)" }}>
                What were the key risks?
              </div>
              <div className="flex max-w-[60%] items-center gap-1.5 rounded-[20px] rounded-bl-[6px] border border-hairline-soft px-4 py-3" style={{ background: "var(--color-surface-2)" }}>
                <Dot /> <Dot delay="0.2s" /> <Dot delay="0.4s" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-[1200px] scroll-mt-20 px-4 py-24 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-[-1px] text-ink sm:text-4xl sm:tracking-[-1.5px]">
            Everything you need to understand a PDF
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[16px] text-ink-muted sm:text-[18px]">
            Stop scrolling through long documents. Let AI do the reading and give
            you exactly what you're looking for.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="animate-fade-up card-surface p-6 transition hover:-translate-y-1 hover:border-hairline"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div
                className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-[11px] font-bold tracking-[-0.5px]"
                style={{ background: "var(--color-surface-2)", color: "var(--color-accent)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-[15px] font-semibold text-ink tracking-[-0.15px]">{f.title}</h3>
              <p className="mt-1.5 text-[14px] leading-relaxed text-ink-muted tracking-[-0.14px]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how" className="mx-auto max-w-[1200px] scroll-mt-20 px-4 py-24 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-[-1px] text-ink sm:text-4xl sm:tracking-[-1.5px]">How it works</h2>
          <p className="mx-auto mt-3 max-w-xl text-[16px] text-ink-muted sm:text-[18px]">
            Three simple steps from upload to insight.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.step} className="relative card-surface p-7 pt-10">
              <span
                className="absolute -top-3.5 left-7 flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-bold text-ink shadow-lg"
                style={{ background: "var(--color-gradient-violet)" }}
              >
                {s.step}
              </span>
              <h3 className="text-[15px] font-semibold text-ink tracking-[-0.15px]">{s.title}</h3>
              <p className="mt-1.5 text-[14px] leading-relaxed text-ink-muted tracking-[-0.14px]">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-[800px] scroll-mt-20 px-4 py-24 sm:px-6">
        <h2 className="text-center text-3xl font-bold tracking-[-1px] text-ink sm:text-4xl sm:tracking-[-1.5px]">
          Frequently asked questions
        </h2>
        <div className="mt-10 space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group card-surface p-5 transition hover:border-hairline" style={{ cursor: "pointer" }}>
              <summary className="flex list-none items-center justify-between text-[15px] font-medium text-ink tracking-[-0.15px]">
                {f.q}
                <span
                  className="text-lg text-ink-muted transition-transform duration-200 group-open:rotate-45"
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "20px", height: "20px", flexShrink: 0 }}
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-muted tracking-[-0.14px]">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6">
        <div
          className="relative overflow-hidden rounded-[30px] border border-hairline-soft px-6 py-16 text-center sm:px-12"
          style={{ background: "linear-gradient(135deg, rgba(106,76,245,0.15), rgba(212,77,240,0.1))" }}
        >
          <h2 className="text-3xl font-bold tracking-[-1px] text-ink sm:text-4xl sm:tracking-[-1.5px]">
            Ready to talk to your documents?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[16px] text-ink-muted sm:text-[18px]">
            Create a free account and upload your first PDF in under a minute.
          </p>
          <Link to={primaryHref} className="mt-8 inline-block btn-primary px-8 py-3.5 text-[15px] no-underline shadow-lg">
            {user ? "Open Dashboard" : "Get started for free"}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Dot({ delay = "0s" }) {
  return (
    <span
      className="inline-block h-2 w-2 rounded-full"
      style={{ background: "var(--color-ink-muted)", animation: `pulse-dot 1.4s ease-in-out ${delay} infinite` }}
    />
  );
}
