"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent({ lang }: { lang: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = document.cookie
      .split("; ")
      .find((c) => c.startsWith("cookie_consent="));
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    document.cookie = "cookie_consent=accepted;path=/;max-age=31536000;SameSite=Lax";
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] px-4 pb-4 md:px-6 md:pb-6 animate-[fadeUp_0.4s_ease_both]">
      <div className="max-w-[600px] mx-auto bg-[var(--color-bg-surface)] border border-[var(--color-border)] backdrop-blur-sm rounded-sm px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 shadow-[0_-4px_24px_rgba(0,0,0,0.3)]">
        <p className="text-[0.78rem] text-[var(--color-text-muted)] leading-[1.6] flex-1">
          We use cookies for language preferences.{" "}
          <Link
            href={`/${lang}/privacy`}
            className="text-[var(--color-accent)] hover:underline"
          >
            Privacy Policy
          </Link>
        </p>
        <button
          onClick={accept}
          className="shrink-0 px-5 py-2 bg-[var(--color-accent)] text-[var(--color-bg)] text-[0.7rem] font-semibold uppercase tracking-[0.12em] hover:bg-[var(--color-accent-hover)] transition-colors duration-300"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
