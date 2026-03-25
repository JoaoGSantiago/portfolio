"use client";

import { useEffect } from "react";
import { SnakeGame } from "@/components/output/SnakeGame";
import { useLanguage } from "@/contexts/LanguageContext";

interface SnakeModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function SnakeModal({ visible, onClose }: SnakeModalProps) {
  const { lang } = useLanguage();

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-term-bg border border-term-border rounded-lg p-4 shadow-2xl">
        <div className="flex items-center justify-between mb-3">
          <span className="text-term-green text-sm font-mono font-semibold">
            🐍 {lang === "pt" ? "Container Snake" : "Container Snake"}
          </span>
          <button
            onClick={onClose}
            className="text-term-muted hover:text-term-text text-xs font-mono border border-term-border px-2 py-0.5 rounded"
          >
            ESC {lang === "pt" ? "fechar" : "close"}
          </button>
        </div>
        <SnakeGame />
      </div>
    </div>
  );
}
