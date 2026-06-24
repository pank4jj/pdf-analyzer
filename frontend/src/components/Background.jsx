// Decorative animated gradient blobs — pure CSS. Uses DESIGN.md gradient colors.
export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="animate-float absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full opacity-30 blur-[100px]"
        style={{ background: "var(--color-gradient-violet)" }}
      />
      <div
        className="animate-float absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full opacity-25 blur-[100px]"
        style={{ background: "var(--color-gradient-magenta)", animationDelay: "2.5s" }}
      />
      <div
        className="animate-float absolute -bottom-20 left-1/4 h-[400px] w-[400px] rounded-full opacity-20 blur-[100px]"
        style={{ background: "var(--color-gradient-orange)", animationDelay: "5s" }}
      />
      {/* Vignette overlay to keep edges dark */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(circle at center, transparent 0%, #090909 80%)" }}
      />
    </div>
  );
}
