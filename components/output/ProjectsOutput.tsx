import { projects } from "@/data/personal";
import { i18n } from "@/data/i18n";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProjectsOutput() {
  const { lang } = useLanguage();

  return (
    <div className="space-y-4 text-sm">
      <p className="text-term-green">{i18n.sections.projects[lang]}</p>

      {projects.map((proj) => (
        <div
          key={proj.name}
          className="border border-term-border rounded p-3 space-y-2 bg-term-bg-secondary"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-term-text font-semibold hover:text-term-green">
              {proj.github ? (
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-term-green transition-colors"
                >
                  {proj.name}
                </a>
              ) : (
                proj.name
              )}
            </span>
            <span className={`text-xs ${proj.status === "active" ? "text-term-green" : "text-term-muted"}`}>
              ● {i18n.status[proj.status][lang]}
            </span>
          </div>

          <p className="text-term-muted leading-relaxed">
            {proj.description[lang]}
          </p>

          <div className="flex flex-wrap gap-1">
            {proj.tech.map((t) => (
              <span
                key={t}
                className="text-xs px-1.5 py-0.5 rounded border border-term-border text-term-muted bg-term-bg"
              >
                {t}
              </span>
            ))}
          </div>

          {proj.github && (
            <p className="text-xs">
              <span className="text-term-muted">→ </span>
              <a
                href={proj.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-term-blue underline underline-offset-2 hover:text-term-green transition-colors"
              >
                {proj.github}
              </a>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
