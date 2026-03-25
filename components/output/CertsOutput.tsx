import { certifications } from "@/data/personal";
import { i18n } from "@/data/i18n";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CertsOutput() {
  const { lang } = useLanguage();

  return (
    <div className="space-y-3 text-sm">
      <p className="text-term-green">{i18n.sections.certifications[lang]}</p>

      {certifications.map((cert) => (
        <div
          key={cert.name}
          className="flex gap-3 border-l-2 border-term-border pl-3"
        >
          <div className="space-y-0.5">
            <p className="text-term-text font-semibold">
              {cert.name}
            </p>
            <p className="text-term-muted">{cert.issuer}</p>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-term-muted">{cert.date[lang]}</span>
              {cert.badge && (
                <span className="px-1.5 py-0.5 rounded border border-term-border text-term-muted bg-term-bg-secondary">
                  {cert.badge}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
