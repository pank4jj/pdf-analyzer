import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../lib/api.js";

const SUGGESTIONS = [
  { label: "Summarize this PDF", prompt: "Give me a clear summary of this document." },
  { label: "Key points", prompt: "List the most important points as bullet points." },
  { label: "Explain simply", prompt: "Explain the main ideas in simple, beginner-friendly terms." },
  { label: "Possible questions", prompt: "Generate 5 important questions and answers based on this document." },
];

export default function Chat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfName, setPdfName] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    api
      .get("/pdf")
      .then(({ data }) => {
        const pdf = data.pdfs?.find((p) => p._id === id);
        if (pdf) setPdfName(pdf.originalName);
      })
      .catch(() => {});

    api
      .get(`/pdf/${id}/chat`)
      .then(({ data }) => setMessages(data.messages))
      .catch(() => setMessages([]));
  }, [id]);

  // Auto-scroll to the newest message.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text) => {
    const question = (text ?? input).trim();
    if (!question || loading) return;

    setInput("");
    setMessages((m) => [...m, { role: "user", content: question }]);
    setLoading(true);

    try {
      const { data } = await api.post(`/pdf/${id}/ask`, { question });
      setMessages((m) => [...m, { role: "ai", content: data.answer }]);
    } catch (err) {
      setMessages((m) => [...m, { role: "ai", content: err.response?.data?.message || "Something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen flex-col" style={{ background: "var(--color-canvas)" }}>
  
      <header className="sticky top-0 z-10 border-b backdrop-blur-xl" style={{ background: "rgba(9,9,9,0.7)", borderColor: "var(--color-hairline-soft)" }}>
        <div className="mx-auto flex max-w-[800px] items-center gap-3 px-4 py-3.5">
          <button onClick={() => navigate("/dashboard")} className="btn-secondary text-[13px] cursor-pointer" style={{ padding: "6px 14px" }}>
            ← Back
          </button>
          <span className="text-[15px] font-semibold tracking-[-0.15px]" style={{ color: "var(--color-ink)" }}>
            {pdfName || "Document chat"}
          </span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[800px] px-4 py-6">
          {/* Empty state */}
          {messages.length === 0 && !loading && (
            <div className="animate-fade-up py-12 text-center">
              <div
                className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-[20px] text-lg font-bold shadow-lg"
                style={{ background: "linear-gradient(135deg, var(--color-gradient-violet), var(--color-gradient-magenta))", color: "var(--color-ink)" }}
              >
                AI
              </div>
              <h2 className="text-xl font-bold tracking-[-0.8px]" style={{ color: "var(--color-ink)" }}>Ask anything about your PDF</h2>
              <p className="mt-1 text-[15px]" style={{ color: "var(--color-ink-muted)" }}>Pick a quick action or type your own question.</p>

              <div className="mx-auto mt-6 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => send(s.prompt)}
                    className="flex items-center gap-3 rounded-[15px] p-4 text-left transition hover:-translate-y-0.5"
                    style={{ background: "var(--color-surface-1)", border: "1px solid var(--color-hairline-soft)", cursor: "pointer" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-hairline)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-hairline-soft)"; }}
                  >
                    <span className="text-[15px] font-medium tracking-[-0.15px]" style={{ color: "var(--color-ink)" }}>{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            {messages.map((m, i) => (
              <Message key={i} role={m.role} content={m.content} />
            ))}
            {loading && <Typing />}
            <div ref={bottomRef} />
          </div>
        </div>
      </div>

      <div className="border-t backdrop-blur-xl" style={{ background: "rgba(9,9,9,0.7)", borderColor: "var(--color-hairline-soft)" }}>
        <form onSubmit={(e) => { e.preventDefault(); send(); }} className="mx-auto flex max-w-[800px] items-end gap-2 px-4 py-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            rows={1}
            placeholder="Ask about this document..."
            className="max-h-40 flex-1 resize-none rounded-[15px] px-4 py-3 text-[15px] text-white placeholder-gray-500 outline-none transition"
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
          <button type="submit" disabled={loading || !input.trim()} className="btn-primary rounded-[20px] px-5 py-3 text-[15px]" style={{ opacity: loading || !input.trim() ? 0.4 : 1 }}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

function Message({ role, content }) {
  const isUser = role === "user";
  return (
    <div className={`flex animate-fade-up ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div
          className="mr-2.5 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
          style={{ background: "linear-gradient(135deg, var(--color-gradient-violet), var(--color-gradient-magenta))", color: "var(--color-ink)" }}
        >
          AI
        </div>
      )}
      <div
        className="max-w-[80%] whitespace-pre-wrap rounded-[20px] px-4 py-3 text-[14px] leading-relaxed tracking-[-0.14px]"
        style={
          isUser
            ? { background: "var(--color-ink)", color: "var(--color-canvas)", borderBottomRightRadius: "6px" }
            : { background: "var(--color-surface-1)", border: "1px solid var(--color-hairline-soft)", color: "var(--color-ink)", borderBottomLeftRadius: "6px" }
        }
      >
        {content}
      </div>
    </div>
  );
}

function Typing() {
  return (
    <div className="flex animate-fade-up justify-start">
      <div
        className="mr-2.5 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
        style={{ background: "linear-gradient(135deg, var(--color-gradient-violet), var(--color-gradient-magenta))", color: "var(--color-ink)" }}
      >
        AI
      </div>
      <div className="flex items-center gap-1.5 rounded-[20px] px-4 py-4" style={{ background: "var(--color-surface-1)", border: "1px solid var(--color-hairline-soft)", borderBottomLeftRadius: "6px" }}>
        <Dot /> <Dot delay="0.2s" /> <Dot delay="0.4s" />
      </div>
    </div>
  );
}

function Dot({ delay = "0s" }) {
  return (
    <span className="inline-block h-2 w-2 rounded-full" style={{ background: "var(--color-ink-muted)", animation: `pulse-dot 1.4s ease-in-out ${delay} infinite` }} />
  );
}
