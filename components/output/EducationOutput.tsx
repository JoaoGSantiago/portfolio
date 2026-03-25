import { education } from "@/data/personal";
import { i18n } from "@/data/i18n";
import { useLanguage } from "@/contexts/LanguageContext";

const statusIcon: Record<string, string> = {
  completed: "✓",
  ongoing: "⟳",
  dropped: "✗",
};

const statusColorClass: Record<string, string> = {
  completed: "text-term-green",
  ongoing: "text-term-muted",
  dropped: "text-term-muted",
};

export default function EducationOutput() {
  const { lang } = useLanguage();

  return (
    <div className="space-y-4 text-sm">
      <p className="text-term-green">{i18n.sections.education[lang]}</p>

      {education.map((edu) => (
        <div key={edu.institution} className="flex gap-3">
          <span
            className={`mt-0.5 text-base shrink-0 ${statusColorClass[edu.status]}`}
          >
            {statusIcon[edu.status]}
          </span>
          <div className="space-y-0.5">
            <p className="text-term-text font-semibold">
              {edu.degree[lang]}
            </p>
            <p className="text-term-muted">{edu.institution}</p>
            <p className="text-term-muted text-xs">
              {edu.period[lang]} · {i18n.status[edu.status][lang]}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
