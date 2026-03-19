"use client";

import { useState, useEffect } from "react";

export default function StickyPageTitle({ title, alwaysVisible = false }: { title: string; alwaysVisible?: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (alwaysVisible) {
      // Animate once on mount, then stay visible permanently
      const timer = setTimeout(() => setVisible(true), 100);
      return () => clearTimeout(timer);
    }
    const onScroll = () => setVisible(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [alwaysVisible]);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] pointer-events-none flex items-center justify-center"
      style={{
        height: 72,
        paddingTop: "env(safe-area-inset-top)",
      }}
    >
      <div className="flex flex-col items-center gap-1.5">
        <span
          className="font-[family-name:var(--font-cormorant)] text-[0.75rem] lg:text-[0.85rem] font-normal uppercase tracking-[0.25em] text-white"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-3px)",
            transition: visible
              ? "opacity 0.4s ease 0.35s, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.35s"
              : "opacity 0.2s ease, transform 0.2s ease",
          }}
        >
          {title}
        </span>

        <div
          className="h-px bg-[var(--color-accent)]"
          style={{
            width: visible ? 32 : 0,
            transition: visible
              ? "width 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.05s"
              : "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );
}
