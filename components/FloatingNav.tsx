"use client";

import type { Lang } from "@/contexts/LanguageContext";

export type View = "terminal" | "portfolio";

interface FloatingNavProps {
  readonly view: View;
  readonly setView: (v: View) => void;
  readonly lang: Lang;
  readonly toggleLang: () => void;
}

export default function FloatingNav({ view, setView, lang, toggleLang }: FloatingNavProps) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-0.5 px-1.5 py-1.5 rounded-full border border-term-border bg-term-bg-secondary/95 backdrop-blur-sm font-mono text-xs select-none shadow-lg">
      <button
        onClick={() => setView("terminal")}
        className={`px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
          view === "terminal"
            ? "bg-term-green text-term-bg font-semibold"
            : "text-term-muted hover:text-term-text"
        }`}
      >
        &gt;_ terminal
      </button>
      <button
        onClick={() => setView("portfolio")}
        className={`px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
          view === "portfolio"
            ? "bg-term-green text-term-bg font-semibold"
            : "text-term-muted hover:text-term-text"
        }`}
      >
        ◈ portfolio
      </button>
      <div className="w-px h-4 bg-term-border mx-1" />
      <button
        onClick={toggleLang}
        className="flex items-center gap-1 px-2.5 py-1.5 rounded-full cursor-pointer hover:text-term-text transition-colors"
        title={lang === "pt" ? "Switch to English" : "Mudar para Português"}
      >
        <span className={lang === "pt" ? "text-term-green" : "text-term-muted"}>PT</span>
        <span className="text-term-muted">/</span>
        <span className={lang === "en" ? "text-term-green" : "text-term-muted"}>EN</span>
      </button>
    </div>
  );
}
