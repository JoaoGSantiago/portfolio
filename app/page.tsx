"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import Terminal from "@/components/Terminal";
import Portfolio from "@/components/Portfolio";
import FloatingNav, { type View } from "@/components/FloatingNav";

function PageContent() {
  const searchParams = useSearchParams();
  const d = searchParams.get("d");
  const [view, setView] = useState<View>(d === "t" ? "terminal" : "portfolio");
  const { lang, toggleLang } = useLanguage();

  useEffect(() => {
    const handler = (e: Event) => {
      const section = (e as CustomEvent<{ section: string }>).detail?.section;
      setView("portfolio");
      if (section) {
        setTimeout(() => {
          document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
        }, 120);
      }
    };
    globalThis.addEventListener("portfolio:navigate", handler);
    return () => globalThis.removeEventListener("portfolio:navigate", handler);
  }, []);

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
      <Suspense>
        <PageContent />
      </Suspense>
    </LanguageProvider>
  );
}
