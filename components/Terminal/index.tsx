"use client";

import { useEffect, useState } from "react";
import { useTerminal } from "@/hooks/useTerminal";
import { useTheme } from "@/hooks/useTheme";
import TerminalHeader from "./TerminalHeader";
import TerminalBody from "./TerminalBody";
import DoomGame from "@/components/DoomGame";

export default function Terminal() {
  const { theme, setTheme, themeClass } = useTheme();
  const {
    history,
    inputRef,
    historyIndex,
    getHistoryValue,
    runCommand,
    navigateHistory,
  } = useTerminal(setTheme);

  const [doomOpen, setDoomOpen]       = useState(false);
  const [doomMounted, setDoomMounted] = useState(false);

  useEffect(() => {
    const handler = () => {
      setDoomMounted(true);
      setDoomOpen(true);
    };
    globalThis.addEventListener("doom:open", handler);
    return () => globalThis.removeEventListener("doom:open", handler);
  }, []);

  const handleDoomClose = () => {
    setDoomOpen(false);
    setTimeout(() => inputRef.current?.focus(), 80);
  };

  return (
    <div className={`h-full w-full flex flex-col bg-term-bg ${themeClass}`}>
      <TerminalHeader theme={theme} />
      <TerminalBody
        history={history}
        inputRef={inputRef}
        onSubmit={runCommand}
        onNavigate={navigateHistory}
        historyIndex={historyIndex}
        getHistoryValue={getHistoryValue}
        focusLocked={doomOpen}
      />

      {doomMounted && (
        <DoomGame visible={doomOpen} onClose={handleDoomClose} />
      )}
    </div>
  );
}
