"use client";

import { useState, useCallback, useRef } from "react";
import { HistoryEntry } from "@/types/terminal";
import { commandRegistry } from "@/data/commands";
import { THEMES } from "@/data/themes";
import { i18n } from "@/data/i18n";
import { useLanguage } from "@/contexts/LanguageContext";
import WelcomeOutput from "@/components/output/WelcomeOutput";
import ThemeOutput from "@/components/output/ThemeOutput";

function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

export function useTerminal(onThemeChange: (name: string) => boolean) {
  const { lang } = useLanguage();
  const [history, setHistory] = useState<HistoryEntry[]>([
    { id: "welcome", output: <WelcomeOutput /> },
  ]);
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentTheme, setCurrentTheme] = useState("github");

  const inputRef = useRef<HTMLInputElement>(null);

  const runCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;

      const [name, ...args] = trimmed.split(/\s+/);

      setInputHistory((prev) => {
        const filtered = prev.filter((c) => c !== trimmed);
        return [trimmed, ...filtered].slice(0, 100);
      });
      setHistoryIndex(-1);

      const cmd = commandRegistry[name];
      if (name === "clear" || cmd?.name === "clear") {
        setHistory([]);
        return;
      }

      if (name === "theme") {
        const themeName = args[0];
        if (!themeName) {
          setHistory((prev) => [
            ...prev,
            {
              id: generateId(),
              command: trimmed,
              output: <ThemeOutput current={currentTheme} />,
            },
          ]);
          return;
        }
        if (!THEMES[themeName]) {
          setHistory((prev) => [
            ...prev,
            {
              id: generateId(),
              command: trimmed,
              isError: true,
              output: (
                <ThemeOutput
                  current={currentTheme}
                  error={`theme not found: "${themeName}" — run theme to see options`}
                />
              ),
            },
          ]);
          return;
        }
        onThemeChange(themeName);
        setCurrentTheme(themeName);
        setHistory((prev) => [
          ...prev,
          {
            id: generateId(),
            command: trimmed,
            output: <ThemeOutput current={themeName} switched={themeName} />,
          },
        ]);
        return;
      }

      if (!cmd) {
        setHistory((prev) => [
          ...prev,
          {
            id: generateId(),
            command: trimmed,
            isError: true,
            output: (
              <p className="text-sm">
                <span className="text-term-red">
                  {i18n.errors.commandNotFound[lang]}: {name}
                </span>
                <span className="text-term-muted">
                  {" "}{i18n.errors.typeHelpSuffix[lang]}
                </span>
              </p>
            ),
          },
        ]);
        return;
      }

      setHistory((prev) => [
        ...prev,
        {
          id: generateId(),
          command: trimmed,
          output: cmd.execute(args),
        },
      ]);
    },
    [onThemeChange, currentTheme, lang]
  );

  const navigateHistory = useCallback(
    (direction: "up" | "down") => {
      if (inputHistory.length === 0) return;
      setHistoryIndex((prev) => {
        if (direction === "up") return Math.min(prev + 1, inputHistory.length - 1);
        return Math.max(prev - 1, -1);
      });
    },
    [inputHistory]
  );

  const getHistoryValue = useCallback(
    (index: number): string => {
      if (index < 0 || index >= inputHistory.length) return "";
      return inputHistory[index];
    },
    [inputHistory]
  );

  return {
    history,
    inputRef,
    historyIndex,
    getHistoryValue,
    runCommand,
    navigateHistory,
  };
}
