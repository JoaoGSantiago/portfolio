interface TerminalHeaderProps {
  readonly theme: string;
}

export default function TerminalHeader({ theme }: TerminalHeaderProps) {
  return (
    <div className="flex items-center px-4 py-2.5 bg-term-bg-secondary border-b border-term-border select-none shrink-0 mt-12">
      <p className="flex-1 text-xs text-term-muted font-mono">
        joao@portfolio: ~ [{theme}]
      </p>
    </div>
  );
}
