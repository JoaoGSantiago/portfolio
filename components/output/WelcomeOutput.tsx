import { personal } from "@/data/personal";
import { i18n } from "@/data/i18n";
import { useLanguage } from "@/contexts/LanguageContext";

export default function WelcomeOutput() {
  const { lang } = useLanguage();

  return (
    <div className="space-y-1">
      <pre className="text-term-green opacity-80 text-xs leading-tight select-none">
        {`                   -\`
                  .o+\`
                 \`ooo/
                \`+oooo:
               \`+oooooo:
               -+oooooo+:
             \`/:-:++oooo+:
            \`/++++/+++++++:
           \`/++++++++++++++:
          \`/+++ooooooooooooo/\`
         ./ooosssso++osssssso+\`
        .oossssso-\`\`\`\`/ossssss+\`
       -osssssso.      :ssssssso.
      :osssssss/        osssso+++.
     /ossssssss/        +ssssooo/-
   \`/ossssso+/:-        -:/+osssso+-
  \`+sso+:-\`                 \`.-/+oso:
 \`++:.                           \`-/+/
 .\`                                 \`/`}
      </pre>

      <div className="mt-3 space-y-1 text-sm">
        <p className="text-term-text font-semibold">
          {personal.name}
        </p>
        <p className="text-term-muted">
          {personal.title} · {personal.location}
        </p>
        <p className="text-term-muted">{personal.bio[lang]}</p>
      </div>

      <div className="mt-3 text-sm space-y-1">
        <p className="text-term-muted">
          {i18n.welcome.typeHelp[lang]}{" "}
          <span className="text-term-green">help</span>
          {" "}{i18n.welcome.toSeeCommands[lang]}
        </p>
        <p className="text-term-muted">
          {i18n.welcome.try[lang]}{" "}
          <span className="text-term-green">ls</span>
          {" "}{i18n.welcome.toExploreStack[lang]}
        </p>
      </div>
    </div>
  );
}
