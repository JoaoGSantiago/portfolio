"use client";

import { useState } from "react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import Terminal from "@/components/Terminal";
import Portfolio from "@/components/Portfolio";
import FloatingNav, { type View } from "@/components/FloatingNav";

function PageContent() {
  const [view, setView] = useState<View>("terminal");
  const { lang, toggleLang } = useLanguage();

  return (
    <main className={`bg-term-bg ${view === "terminal" ? "h-full" : "min-h-screen"}`}>
      <FloatingNav view={view} setView={setView} lang={lang} toggleLang={toggleLang} />
      {view === "terminal" ? <Terminal /> : <Portfolio />}
    </main>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <PageContent />
    </LanguageProvider>
  );
}
