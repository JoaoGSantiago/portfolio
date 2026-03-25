import { stacks, StackItem } from "@/data/personal";
import { i18n } from "@/data/i18n";
import { useLanguage } from "@/contexts/LanguageContext";


const COL_WIDTH = 28;

function SkillRow({ item }: { readonly item: StackItem }) {
  const dots = "·".repeat(Math.max(2, COL_WIDTH - item.name.length));
  return (
    <div className="flex items-baseline font-mono text-sm">
      <span className="text-term-green mr-2">▸</span>
      <span className="text-term-text">{item.name}</span>
      <span className="text-term-border mx-1">{dots}</span>
    </div>
  );
}

export default function StackOutput() {
  const { lang } = useLanguage();

  return (
    <div className="space-y-4 text-sm font-mono">
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
        <div key={category.category.en}>
          <p className="text-term-muted text-xs mb-1">
            {"──"} {category.category[lang]} {"─".repeat(20)}
          </p>
          <div className="space-y-0.5 pl-2">
            {category.items.map((item) => (
              <SkillRow key={item.name} item={item} />
            ))}
          </div>
        </div>
      ))}

    </div>
  );
}
