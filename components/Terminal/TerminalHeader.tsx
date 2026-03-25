import type { Lang } from "@/contexts/LanguageContext";

interface TerminalHeaderProps {
  readonly theme: string;
  readonly lang: Lang;
  readonly toggleLang: () => void;
}

export default function TerminalHeader({ theme, lang, toggleLang }: TerminalHeaderProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-term-bg-secondary border-b border-term-border select-none shrink-0">
      <p className="flex-1 text-center text-xs text-term-muted font-mono">
        {`joao@portfolio: ~ [${theme}]`}
      </p>
      <button
        onClick={toggleLang}
        className="flex items-center gap-1 text-xs font-mono border border-term-border rounded px-2 py-0.5 hover:border-term-green transition-colors cursor-pointer"
        title={lang === "pt" ? "Switch to English" : "Mudar para Português"}
      >
        <span className={lang === "pt" ? "text-term-green" : "text-term-muted"}>PT</span>
        <span className="text-term-muted">/</span>
        <span className={lang === "en" ? "text-term-green" : "text-term-muted"}>EN</span>
      </button>
    </div>
  );
}
