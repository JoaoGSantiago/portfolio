import { stacks, StackItem } from "@/data/personal";
import { i18n } from "@/data/i18n";
import { useLanguage } from "@/contexts/LanguageContext";

const BAR_LENGTH = 20;

function buildBar(level: number): string {
  const filled = Math.round((level / 100) * BAR_LENGTH);
  const empty = BAR_LENGTH - filled;
  return "█".repeat(filled) + "░".repeat(empty);
}

function levelColorClass(level: number): string {
  if (level >= 90) return "text-term-green";
  if (level >= 75) return "text-term-blue";
  if (level >= 60) return "text-term-yellow";
  return "text-term-orange";
}

function SkillBar({ item, levelLabel }: { readonly item: StackItem; readonly levelLabel: string }) {
  const colorClass = levelColorClass(item.level);
  const bar = buildBar(item.level);

  return (
    <div className="flex items-center gap-3 text-sm font-mono">
      <span className="text-term-text w-36 shrink-0">{item.name}</span>
      <span className={`bar-fill ${colorClass}`}>
        [{bar}]
      </span>
      <span className={`text-xs ${colorClass}`}>
        {item.level}% · {levelLabel}
      </span>
    </div>
  );
}

export default function StackOutput() {
  const { lang } = useLanguage();

  function getLevelLabel(level: number): string {
    if (level >= 90) return i18n.stack.levels.expert[lang];
    if (level >= 75) return i18n.stack.levels.advanced[lang];
    if (level >= 60) return i18n.stack.levels.intermediate[lang];
    return i18n.stack.levels.learning[lang];
  }

  return (
    <div className="space-y-5 text-sm">
      <div>
        <p className="text-term-green">
          $ ./stack <span className="text-term-muted">--show-all</span>
        </p>
        <p className="text-term-muted text-xs mt-1">
          {i18n.stack.loading[lang]}{" "}
          <span className="text-term-green">{i18n.stack.done[lang]}</span>
        </p>
      </div>

      {stacks.map((category) => (
        <div key={category.category.en} className="space-y-2">
          <p className="text-term-text font-semibold">
            {category.icon} {category.category[lang]}
          </p>
          <div className="space-y-1 pl-2 border-l border-term-border">
            {category.items.map((item) => (
              <SkillBar key={item.name} item={item} levelLabel={getLevelLabel(item.level)} />
            ))}
          </div>
        </div>
      ))}

      <div className="text-xs text-term-muted border-t border-term-border pt-2">
        <span className="text-term-green">█</span> {i18n.stack.legend.expert[lang]} &nbsp;
        <span className="text-term-blue">█</span> {i18n.stack.legend.advanced[lang]} &nbsp;
        <span className="text-term-yellow">█</span> {i18n.stack.legend.intermediate[lang]} &nbsp;
        <span className="text-term-orange">█</span> {i18n.stack.legend.learning[lang]}
      </div>
    </div>
  );
}
