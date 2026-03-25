"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

let doomInitialized = false;

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Module: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callMain: (args: string[]) => void;
  }
}

interface DoomGameProps {
  readonly visible: boolean;
  readonly onClose: () => void;
}

export default function DoomGame({ visible, onClose }: DoomGameProps) {
  const { lang } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState(
    lang === "pt" ? "Carregando DOOM..." : "Loading DOOM..."
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (visible) {
      setTimeout(() => canvasRef.current?.focus(), 50);
    }
  }, [visible]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || doomInitialized) return;
    doomInitialized = true;

    window.Module = {
      canvas,
      noInitialRun: true,
      locateFile: (path: string) => `/doom/${path}`,
      preRun: [
        () => {
          window.Module.FS.createPreloadedFile(
            "",
            "doom1.wad",
            "/doom/doom1.wad",
            true,
            true
          );
          window.Module.FS.createPreloadedFile(
            "",
            "default.cfg",
            "/doom/default.cfg",
            true,
            true
          );
        },
      ],
      onRuntimeInitialized: () => {
        setReady(true);
        setStatus("");
        window.callMain([
          "-iwad",    "doom1.wad",
          "-window",
          "-nogui",
          "-nomusic",
          "-config",  "default.cfg",
        ]);
      },
      print:    (t: string) => console.log("[doom]", t),
      printErr: (t: string) => console.error("[doom]", t),
      setStatus: (t: string) => { if (t) setStatus(t); },
      totalDependencies: 0,
      monitorRunDependencies(left: number) {
        this.totalDependencies = Math.max(this.totalDependencies, left);
        const pct = this.totalDependencies - left;
        if (this.totalDependencies > 0) {
          setStatus(
            lang === "pt"
              ? `Carregando... ${pct}/${this.totalDependencies}`
              : `Loading... ${pct}/${this.totalDependencies}`
          );
        }
      },
    };

    const script = document.createElement("script");
    script.src = "/doom/websockets-doom.js";
    document.body.appendChild(script);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const controls =
    lang === "pt"
      ? [
          { key: "↑ ↓ ← →", desc: "mover / girar" },
          { key: "Ctrl",     desc: "atirar"         },
          { key: "Space",    desc: "abrir porta"    },
          { key: "Alt",      desc: "straffe"        },
          { key: "Shift",    desc: "correr"         },
          { key: "1-7",      desc: "trocar arma"    },
        ]
      : [
          { key: "↑ ↓ ← →", desc: "move / turn"  },
          { key: "Ctrl",     desc: "shoot"         },
          { key: "Space",    desc: "open door"     },
          { key: "Alt",      desc: "strafe"        },
          { key: "Shift",    desc: "run"           },
          { key: "1-7",      desc: "switch weapon" },
        ];

  return (
    <div
      className={`fixed inset-0 z-50 bg-black flex flex-col items-center justify-center transition-opacity ${
        visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center justify-between w-full max-w-200 px-3 py-1.5 bg-term-bg-secondary border border-term-border font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="text-term-red font-bold">DOOM</span>
          <span className="text-term-muted">·</span>
          <span className="text-term-muted">id Software 1993 — Shareware</span>
        </div>
        <button
          onClick={onClose}
          className="text-term-muted hover:text-term-red transition-colors cursor-pointer"
          title={lang === "pt" ? "Fechar" : "Close"}
        >
          ✕ {lang === "pt" ? "fechar" : "close"}
        </button>
      </div>

      <div className="relative border-x border-term-border">
        <canvas
          ref={canvasRef}
          id="canvas"
          tabIndex={0}
          width={800}
          height={600}
          className="block bg-black outline-none"
          onContextMenu={(e) => e.preventDefault()}
        />

        {!ready && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 gap-3">
            <pre className="text-term-red text-xs leading-none select-none opacity-80">{`
  _______  ______  ______  __   __
 |  ___  ||  __  ||  __  ||  \\ |  |
 | |   | || |  | || |  | ||   \\|  |
 | |   | || |  | || |  | || |\\    |
 | |___| || |__| || |__| || | \\   |
 |_______||______||______||_|  \\__|
`}</pre>
            <p className="text-term-green font-mono text-sm animate-pulse">
              {status || (lang === "pt" ? "Inicializando..." : "Initializing...")}
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 w-full max-w-200 px-3 py-1.5 bg-term-bg-secondary border border-term-border border-t-0 font-mono text-xs text-term-muted">
        {controls.map(({ key, desc }) => (
          <span key={key}>
            <span className="text-term-text">{key}</span> {desc}
          </span>
        ))}
        <span className="ml-auto">
          <span className="text-term-text">ESC</span>{" "}
          {lang === "pt" ? "menu" : "menu"}
        </span>
      </div>
    </div>
  );
}
