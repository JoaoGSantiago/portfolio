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
  readonly inputLocked?: boolean;
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
  focusLocked  = false,
  inputLocked  = false,
}: TerminalBodyProps) {
  const [value,     setValue]     = useState("");
  const [cursorPos, setCursorPos] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const v = getHistoryValue(historyIndex);
    setValue(v);
    setCursorPos(v.length);
  }, [historyIndex, getHistoryValue]);

  // Global Ctrl+C listener — fires even when the input is not in the DOM
  useEffect(() => {
    if (!inputLocked) return;
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.ctrlKey && e.key === "c") {
        e.preventDefault();
        globalThis.dispatchEvent(new CustomEvent("terminal:cancel"));
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [inputLocked]);

  // Auto-scroll on any DOM change inside the terminal (covers animated outputs too)
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const observer = new MutationObserver(() => {
      el.scrollTop = el.scrollHeight;
    });
    observer.observe(el, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  // Sync cursor position from the actual hidden input
  const syncCursor = useCallback(() => {
    requestAnimationFrame(() => {
      const pos = inputRef.current?.selectionStart ?? value.length;
      setCursorPos(pos);
    });
  }, [inputRef, value.length]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setCursorPos(e.target.selectionStart ?? e.target.value.length);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      // Ctrl+C cancels a running command
      if (e.ctrlKey && e.key === "c") {
        if (inputLocked) {
          e.preventDefault();
          globalThis.dispatchEvent(new CustomEvent("terminal:cancel"));
        }
        return;
      }
      if (e.key === "Enter") {
        onSubmit(value);
        setValue("");
        setCursorPos(0);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        onNavigate("up");
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        onNavigate("down");
      } else if (e.key === "l" && e.ctrlKey) {
        e.preventDefault();
        onSubmit("clear");
      } else {
        // For Left/Right and any other key, sync cursor after browser processes it
        syncCursor();
      }
    },
    [value, onSubmit, onNavigate, inputLocked, syncCursor]
  );

  return (
    <div ref={bodyRef} className="flex-1 overflow-y-auto overflow-x-hidden px-4 sm:px-6 pt-14 pb-2 space-y-1 cursor-text font-mono text-sm">
      {history.map((entry) => (
        <HistoryLine key={entry.id} entry={entry} />
      ))}

      {inputLocked ? (
        <div className="flex items-center gap-2 text-term-muted text-sm leading-relaxed select-none">
          <span className="animate-pulse text-term-green">⠿</span>
          <span>executing... (Ctrl+C to cancel)</span>
        </div>
      ) : (
        <div className="flex items-center leading-relaxed relative">
          <Prompt />
          <span className="text-term-text whitespace-pre">{value.slice(0, cursorPos)}</span>
          <span className="cursor-blink text-term-green">▊</span>
          <span className="text-term-text whitespace-pre">{value.slice(cursorPos)}</span>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onClick={syncCursor}
            onSelect={syncCursor}
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
      )}

    </div>
  );
}
