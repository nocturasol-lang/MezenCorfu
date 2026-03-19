export default function NotFound() {
  return (
    <div className="min-h-[100svh] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-cormorant)] text-[2rem] font-light uppercase tracking-[0.2em] mb-4">
          404
        </h1>
        <p className="text-[var(--color-text-muted)] text-[0.9rem]">
          Page not found
        </p>
      </div>
    </div>
  );
}
