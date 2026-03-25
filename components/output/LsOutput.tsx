"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const SECTIONS = [
  { name: "about",      perms: "drwxr-xr-x", size: "4.0K" },
  { name: "experience", perms: "drwxr-xr-x", size: "4.0K" },
  { name: "projects",   perms: "drwxr-xr-x", size: "4.0K" },
  { name: "stack",      perms: "drwxr-xr-x", size: "4.0K" },
  { name: "education",  perms: "drwxr-xr-x", size: "4.0K" },
  { name: "contact",    perms: "drwxr-xr-x", size: "4.0K" },
];

export default function LsOutput() {
  const { lang } = useLanguage();

  const hint = {
    pt: "Use cat <seção> para ler e cd <seção> para navegar no portfolio",
    en: "Use cat <section> to read and cd <section> to navigate in the portfolio",
  };

  return (
    <div className="font-mono text-sm space-y-0.5">
      <p className="text-term-muted text-xs mb-2">
        {lang === "pt" ? "total 6" : "total 6"}
      </p>
      {SECTIONS.map((s) => (
        <div key={s.name} className="flex items-center gap-3">
          <span className="text-term-muted text-xs">{s.perms}</span>
          <span className="text-term-muted text-xs">{s.size}</span>
          <span className="text-term-blue">{s.name}/</span>
        </div>
      ))}
      <p className="text-term-muted text-xs mt-3 italic">{hint[lang]}</p>
    </div>
  );
}
