export default function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="pt-[120px] lg:pt-[140px] pb-[clamp(3rem,6vw,5rem)] px-6 md:px-10 lg:px-16 text-center">
      <div className="w-12 lg:w-16 h-px bg-[var(--color-accent)] mx-auto mb-6 lg:mb-10" />
      <h1 className="font-[family-name:var(--font-cormorant)] text-[clamp(2.8rem,7vw,5rem)] font-light uppercase tracking-[0.2em] lg:tracking-[0.25em] leading-[1.05] mb-5">
        {title}
      </h1>
      {subtitle && (
        <p className="text-[0.85rem] lg:text-[0.95rem] text-[var(--color-text-muted)] tracking-[0.08em] max-w-[500px] mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
