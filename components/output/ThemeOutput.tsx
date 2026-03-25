import { THEMES } from "@/data/themes";

interface ThemeOutputProps {
  current: string;
  switched?: string;
  error?: string;
}

export default function ThemeOutput({ current, switched, error }: ThemeOutputProps) {
  if (error) {
    return (
      <p className="text-sm">
        <span className="text-term-red">{error}</span>
      </p>
    );
  }

  if (switched) {
    return (
      <p className="text-sm">
        <span className="text-term-green">✓ Theme switched to </span>
        <span className="text-term-text font-semibold">
          {THEMES[switched]?.label ?? switched}
        </span>
      </p>
    );
  }

  return (
    <div className="space-y-2 text-sm">
      <p className="text-term-green">Available themes:</p>
      <div className="space-y-1">
        {Object.values(THEMES).map((t) => {
          const isActive = t.name === current;
          return (
            <div key={t.name} className="flex items-start gap-3">
              <span className={`w-3 shrink-0 ${isActive ? "text-term-green" : "text-term-muted"}`}>
                {isActive ? "●" : "○"}
              </span>
              <span
                className={`w-24 shrink-0 font-mono ${
                  isActive ? "text-term-text font-semibold" : "text-term-muted"
                }`}
              >
                {t.name}
              </span>
              <span className="text-term-muted">{t.description}</span>
            </div>
          );
        })}
      </div>
      <p className="text-term-muted text-xs pt-1">
        Usage:{" "}
        <span className="text-term-green">theme &lt;name&gt;</span>
        {"  "}e.g.{" "}
        <span className="text-term-green">theme dracula</span>
      </p>
    </div>
  );
}
