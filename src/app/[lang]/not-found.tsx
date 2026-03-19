import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[100svh] flex items-center justify-center px-6 bg-[var(--color-bg)]">
      <div className="text-center max-w-[400px]">
        <div className="w-10 h-px bg-[var(--color-accent)] mx-auto mb-8" />

        <h1 className="font-[family-name:var(--font-cormorant)] text-[3rem] font-light uppercase tracking-[0.25em] mb-3 text-[var(--color-text)]">
          404
        </h1>

        <p className="text-[var(--color-text-muted)] text-[0.9rem] mb-8 leading-[1.7]">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <Link
          href="/en"
          className="inline-block px-8 py-3 border border-[var(--color-accent)]/40 text-[var(--color-accent)] text-[0.7rem] font-semibold uppercase tracking-[0.15em] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] transition-all duration-300"
        >
          Back to Home
        </Link>

        <div className="w-10 h-px bg-[var(--color-accent)] mx-auto mt-8" />
      </div>
    </div>
  );
}
