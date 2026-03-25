"use client";

import { useEffect, useState } from "react";
import { useTerminal } from "@/hooks/useTerminal";
import { useTheme } from "@/hooks/useTheme";
import TerminalBody from "./TerminalBody";
import DoomGame from "@/components/DoomGame";

export default function Terminal() {
  const { setTheme, themeClass } = useTheme();
  const {
    history,
    inputRef,
    historyIndex,
    getHistoryValue,
    runCommand,
    navigateHistory,
  } = useTerminal(setTheme);

  const [doomOpen,     setDoomOpen]     = useState(false);
  const [doomMounted,  setDoomMounted]  = useState(false);
  const [inputLocked,  setInputLocked]  = useState(false);

  useEffect(() => {
    const handler = () => { setDoomMounted(true); setDoomOpen(true); };
    globalThis.addEventListener("doom:open", handler);
    return () => globalThis.removeEventListener("doom:open", handler);
  }, []);

  useEffect(() => {
    const onLock   = () => setInputLocked(true);
    const onUnlock = () => setInputLocked(false);
    globalThis.addEventListener("terminal:lock",   onLock);
    globalThis.addEventListener("terminal:unlock", onUnlock);
    return () => {
      globalThis.removeEventListener("terminal:lock",   onLock);
      globalThis.removeEventListener("terminal:unlock", onUnlock);
    };
  }, []);

  const handleDoomClose = () => {
    setDoomOpen(false);
    setTimeout(() => inputRef.current?.focus(), 80);
  };

  return (
    <div className={`h-full w-full flex flex-col bg-term-bg ${themeClass}`}>
      <TerminalBody
        history={history}
        inputRef={inputRef}
        onSubmit={runCommand}
        onNavigate={navigateHistory}
        historyIndex={historyIndex}
        getHistoryValue={getHistoryValue}
        focusLocked={doomOpen}
        inputLocked={inputLocked}
      />

      {doomMounted && (
        <DoomGame visible={doomOpen} onClose={handleDoomClose} />
      )}
    </div>
  );
}
