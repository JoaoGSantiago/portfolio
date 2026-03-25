import { ReactNode } from "react";

export interface HistoryEntry {
  id: string;
  command?: string;
  output: ReactNode;
  isError?: boolean;
}

export interface Command {
  name: string;
  description: string;
  usage?: string;
  aliases?: string[];
  execute: (args: string[]) => ReactNode;
}

export type CommandMap = Record<string, Command>;
