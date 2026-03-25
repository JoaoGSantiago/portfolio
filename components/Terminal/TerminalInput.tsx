"use client";

import { useState, useEffect, KeyboardEvent, RefObject } from "react";

interface TerminalInputProps {
  inputRef: RefObject<HTMLInputElement | null>;
  onSubmit: (value: string) => void;
  onNavigate: (direction: "up" | "down") => void;
  historyIndex: number;
  getHistoryValue: (index: number) => string;
}

export default function TerminalInput({
  inputRef,
  onSubmit,
  onNavigate,
  historyIndex,
  getHistoryValue,
}: Readonly <TerminalInputProps>) {
  const [value, setValue] = useState("");

  // Sync value when navigating history
  useEffect(() => {
    setValue(getHistoryValue(historyIndex));
  }, [historyIndex, getHistoryValue]);

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      onSubmit(value);
      setValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      onNavigate("up");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      onNavigate("down");
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      onSubmit("clear");
    }
  }

  return (
    <div className="flex items-center gap-1 px-4 py-3 border-t border-term-border shrink-0">
      {/* Prompt */}
      <span className="text-term-green text-sm font-mono select-none">
        joao
      </span>
      <span className="text-term-muted text-sm font-mono select-none">
        @
      </span>
      <span className="text-term-blue text-sm font-mono select-none">
        portfolio
      </span>
      <span className="text-term-muted text-sm font-mono select-none">
        :
      </span>
      <span className="text-term-purple text-sm font-mono select-none">
        ~
      </span>
      <span className="text-term-muted text-sm font-mono select-none mr-1">
        $
      </span>

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="none"
        spellCheck={false}
        aria-label="terminal input"
        className="flex-1 bg-transparent text-term-text text-sm font-mono outline-none caret-term-green placeholder:text-term-muted"
        placeholder="type a command…"
      />
    </div>
  );
}
