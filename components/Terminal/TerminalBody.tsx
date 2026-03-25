"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type KeyboardEvent,
  type RefObject,
} from "react";
import { HistoryEntry } from "@/types/terminal";

interface TerminalBodyProps {
  readonly history: HistoryEntry[];
  readonly inputRef: RefObject<HTMLInputElement | null>;
  readonly onSubmit: (value: string) => void;
  readonly onNavigate: (direction: "up" | "down") => void;
  readonly historyIndex: number;
  readonly getHistoryValue: (index: number) => string;
  readonly focusLocked?: boolean;
}

function Prompt() {
  return (
    <>
      <span className="text-term-green select-none">joao@arch</span>
      <span className="text-term-muted select-none">:~$&nbsp;</span>
    </>
  );
}

function HistoryLine({ entry }: { readonly entry: HistoryEntry }) {
  return (
    <div className="space-y-0.5">
      {entry.command != null && (
        <div className="flex items-center flex-wrap text-sm font-mono leading-relaxed">
          <Prompt />
          <span className={entry.isError ? "text-term-red" : "text-term-text"}>
            {entry.command}
          </span>
        </div>
      )}
      {entry.output != null && (
        <div className="pb-1">{entry.output}</div>
      )}
    </div>
  );
}

export default function TerminalBody({
  history,
  inputRef,
  onSubmit,
  onNavigate,
  historyIndex,
  getHistoryValue,
  focusLocked = false,
}: TerminalBodyProps) {
  const [value, setValue] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setValue(getHistoryValue(historyIndex));
  }, [historyIndex, getHistoryValue]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
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
    },
    [value, onSubmit, onNavigate]
  );

  return (
    <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2 space-y-1 cursor-text font-mono text-sm">
      {history.map((entry) => (
        <HistoryLine key={entry.id} entry={entry} />
      ))}

      <div className="flex items-center leading-relaxed relative">
        <Prompt />
        <span className="text-term-text whitespace-pre">{value}</span>
        <span className="cursor-blink text-term-green">▊</span>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => { if (!focusLocked) setTimeout(() => inputRef.current?.focus(), 50); }}
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          aria-label="terminal input"
          className="absolute opacity-0 w-full h-full top-0 left-0 cursor-text"
        />
      </div>

      <div ref={bottomRef} />
    </div>
  );
}
