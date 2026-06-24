import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import Background from "../components/Background.jsx";
import Navbar from "../components/Navbar.jsx";

export default function Dashboard() {
  const [pdfs, setPdfs] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInput = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/pdf")
      .then(({ data }) => setPdfs(data.pdfs))
      .catch(() => setError("Could not load your PDFs."))
      .finally(() => setLoadingList(false));
  }, []);

  const handleUpload = async (file) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      setError("Please choose a PDF file.");
      return;
    }
    setError("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("pdf", file);
      const { data } = await api.post("/pdf/upload", formData);
      navigate(`/chat/${data.pdf._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="relative min-h-screen">
      <Background />
      <Navbar />

      <main className="mx-auto max-w-[1100px] px-4 py-8 sm:px-6">
        {/* Top bar with user info & logout */}
        <div className="mb-6 mt-4 flex items-center justify-end gap-3">
          {user?.name && (
            <span className="hidden text-[14px] sm:inline" style={{ color: "var(--color-ink-muted)" }}>
              Hi, {user.name}
            </span>
          )}
          <button onClick={handleLogout} className="btn-secondary text-[13px] cursor-pointer" style={{ padding: "6px 14px" }}>
            Log out
          </button>
        </div>

        <div className="animate-fade-up text-center">
          <h1
            className="text-3xl font-bold tracking-[-1px] sm:text-4xl sm:tracking-[-1.5px]"
            style={{ background: "linear-gradient(to right, var(--color-ink), var(--color-ink-muted))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}
          >
            Chat with your documents
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-[16px] text-ink-muted">
            Upload a PDF and ask for summaries, key points, or anything inside it.
          </p>
        </div>

        <div
          onClick={() => fileInput.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleUpload(e.dataTransfer.files[0]);
          }}
          className="group mx-auto mt-6 flex max-w-2xl cursor-pointer flex-col items-center justify-center rounded-[30px] border-2 border-dashed px-6 py-14 text-center transition"
          style={{ borderColor: "var(--color-hairline)", background: "var(--color-surface-1)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--color-accent)";
            e.currentTarget.style.background = "var(--color-surface-2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--color-hairline)";
            e.currentTarget.style.background = "var(--color-surface-1)";
          }}
        >
          <input ref={fileInput} type="file" accept="application/pdf" className="hidden" onChange={(e) => handleUpload(e.target.files[0])} />
          <div
            className="mb-4 flex h-16 w-16 items-center justify-center rounded-[20px] shadow-lg transition-transform group-hover:scale-110"
            style={{ background: "linear-gradient(135deg, var(--color-gradient-violet), var(--color-gradient-magenta))" }}
          >
            {uploading ? (
              <Spinner />
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            )}
          </div>
          <p className="text-[15px] font-semibold" style={{ color: "var(--color-ink)" }}>
            {uploading ? "Uploading & preparing..." : "Click or drag a PDF here"}
          </p>
          <p className="mt-1 text-[13px]" style={{ color: "var(--color-ink-muted)" }}>PDF only · up to 20 MB</p>
        </div>

        {error && (
          <p className="mx-auto mt-4 max-w-2xl rounded-[10px] px-4 py-3 text-center text-[14px]" style={{ border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.1)", color: "#fca5a5" }}>
            {error}
          </p>
        )}

        <section className="mt-12">
          <h2 className="mb-5 text-[13px] font-semibold uppercase tracking-[0.5px]" style={{ color: "var(--color-ink-muted)" }}>
            Your documents
          </h2>

          {loadingList ? (
            <EmptyBox>Loading your documents...</EmptyBox>
          ) : pdfs.length === 0 ? (
            <EmptyBox>No PDFs yet. Upload one above to get started.</EmptyBox>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pdfs.map((pdf) => (
                <button
                  key={pdf._id}
                  onClick={() => navigate(`/chat/${pdf._id}`)}
                  className="group animate-fade-up block rounded-[20px] p-5 text-left transition hover:-translate-y-1 cursor-pointer"
                  style={{ background: "var(--color-surface-1)", border: "1px solid var(--color-hairline-soft)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-hairline)";
                    e.currentTarget.style.background = "var(--color-surface-2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-hairline-soft)";
                    e.currentTarget.style.background = "var(--color-surface-1)";
                  }}
                >
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-[15px]" style={{ background: "var(--color-surface-2)" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </div>
                  <p className="truncate text-[15px] font-semibold tracking-[-0.15px]" style={{ color: "var(--color-ink)" }} title={pdf.originalName}>
                    {pdf.originalName}
                  </p>
                  <p className="mt-1 text-[13px]" style={{ color: "var(--color-ink-muted)" }}>
                    {(pdf.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <span className="mt-3 inline-block text-[14px] font-medium opacity-0 transition-opacity group-hover:opacity-100" style={{ color: "var(--color-accent)" }}>
                    Open chat →
                  </span>
                </button>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function EmptyBox({ children }) {
  return (
    <div className="rounded-[20px] px-4 py-12 text-center" style={{ background: "var(--color-surface-1)", border: "1px solid var(--color-hairline-soft)", color: "var(--color-ink-muted)" }}>
      <p className="text-[15px]">{children}</p>
    </div>
  );
}

function Spinner() {
  return <div className="h-6 w-6 animate-spin-slow rounded-full" style={{ border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white" }} />;
}
