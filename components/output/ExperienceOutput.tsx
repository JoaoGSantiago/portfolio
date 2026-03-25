import { experiences } from "@/data/personal";
import { i18n } from "@/data/i18n";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ExperienceOutput() {
  const { lang } = useLanguage();

  return (
    <div className="space-y-5 text-sm">
      <p className="text-term-green">{i18n.sections.experience[lang]}</p>

      {experiences.map((exp) => (
        <div
          key={exp.company}
          className="border-l-2 border-term-border pl-3 space-y-2"
        >
          <div>
            <p>
              <span className="text-term-text font-semibold">
                {exp.role}
              </span>
              <span className="text-term-muted"> @ </span>
              <span className="text-term-green">{exp.company}</span>
            </p>
            <p className="text-term-muted text-xs">
              {exp.period[lang]} · {exp.location[lang]}
            </p>
          </div>

          <ul className="space-y-1">
            {exp.description.map((line) => (
              <li key={line.en} className="flex gap-2">
                <span className="text-term-green shrink-0">›</span>
                <span className="text-term-text">{line[lang]}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1 mt-1">
            {exp.tech.map((t) => (
              <span
                key={t}
                className="text-xs px-1.5 py-0.5 rounded border border-term-border text-term-muted bg-term-bg-secondary"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
