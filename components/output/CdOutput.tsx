"use client";

import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const SECTION_ALIASES: Record<string, string> = {
  about:      "about",
  experience: "experience",
  exp:        "experience",
  projects:   "projects",
  proj:       "projects",
  stack:      "stack",
  education:  "education",
  edu:        "education",
  contact:    "contact",
};

interface CdOutputProps {
  readonly section: string;
}

export default function CdOutput({ section }: CdOutputProps) {
  const { lang } = useLanguage();
  const resolved = SECTION_ALIASES[section?.toLowerCase()];

  useEffect(() => {
    if (!resolved) return;
    globalThis.dispatchEvent(
      new CustomEvent("portfolio:navigate", { detail: { section: resolved } })
    );
  }, [resolved]);

  if (!resolved) {
    const msg = {
      pt: `cd: ${section}: diretório não encontrado. Tente: about, experience, projects, stack, education, contact`,
      en: `cd: ${section}: no such directory. Try: about, experience, projects, stack, education, contact`,
    };
    return <p className="text-term-red text-sm">{msg[lang]}</p>;
  }

  const msg = {
    pt: `→ navegando para /portfolio/${resolved}`,
    en: `→ navigating to /portfolio/${resolved}`,
  };

  return (
    <p className="text-term-green text-sm font-mono">{msg[lang]}</p>
  );
}
