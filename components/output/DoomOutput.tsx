"use client";

import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DoomOutput() {
  const { lang } = useLanguage();

  useEffect(() => {
    globalThis.dispatchEvent(new CustomEvent("doom:open"));
  }, []);

  const isEn = lang === "en";

  return (
    <div className="text-sm font-mono space-y-2">
      <p className="text-term-red font-bold">
        {isEn ? "Launching DOOM..." : "Iniciando DOOM..."}
      </p>
      <pre className="text-term-red text-xs leading-none select-none opacity-70">{`
  _______  ______  ______  __   __
 |  ___  ||  __  ||  __  ||  \\ |  |
 | |   | || |  | || |  | ||   \\|  |
 | |   | || |  | || |  | || |\\    |
 | |___| || |__| || |__| || | \\   |
 |_______||______||______||_|  \\__|
`}</pre>
      <div className="text-xs text-term-muted space-y-0.5 border-l-2 border-term-border pl-3">
        <p>
          <span className="text-term-text">↑ ↓ ← →</span>{"  "}
          {isEn ? "move / turn" : "mover / girar"}
        </p>
        <p>
          <span className="text-term-text">Ctrl</span>{"       "}
          {isEn ? "shoot" : "atirar"}
        </p>
        <p>
          <span className="text-term-text">Space</span>{"      "}
          {isEn ? "open door / use" : "abrir porta / usar"}
        </p>
        <p>
          <span className="text-term-text">Alt + ← →</span>{"  "}
          {isEn ? "strafe" : "strafe (andar de lado)"}
        </p>
        <p>
          <span className="text-term-text">Shift</span>{"      "}
          {isEn ? "run" : "correr"}
        </p>
        <p>
          <span className="text-term-text">1 – 7</span>{"      "}
          {isEn ? "switch weapon" : "trocar arma"}
        </p>
      </div>
      <p className="text-term-muted text-xs">
        {isEn
          ? "Click the game to capture keyboard input."
          : "Clique no jogo para capturar o teclado."}
      </p>
    </div>
  );
}
