import { personal } from "@/data/personal";
import { i18n } from "@/data/i18n";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactOutput() {
  const { lang } = useLanguage();

  return (
    <div className="space-y-3 text-sm">
      <p className="text-term-green">{i18n.sections.contact[lang]}</p>

      <div className="space-y-2">
        <p>
          <span className="text-term-green w-16 inline-block">
            Email
          </span>
          <span className="text-term-muted"> → </span>
          <a
            href={`mailto:${personal.email}`}
            className="text-term-blue underline underline-offset-2 hover:text-term-green transition-colors"
          >
            {personal.email}
          </a>
        </p>

        <p>
          <span className="text-term-green w-16 inline-block">
            GitHub
          </span>
          <span className="text-term-muted"> → </span>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-term-blue underline underline-offset-2 hover:text-term-green transition-colors"
          >
            {personal.github}
          </a>
        </p>

        <p>
          <span className="text-term-green w-16 inline-block">
            LinkedIn
          </span>
          <span className="text-term-muted"> → </span>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-term-blue underline underline-offset-2 hover:text-term-green transition-colors"
          >
            {personal.linkedin}
          </a>
        </p>

        <p>
          <span className="text-term-green w-16 inline-block">
            Phone
          </span>
          <span className="text-term-muted"> → </span>
          <span className="text-term-text">{personal.phone}</span>
        </p>

        <p>
          <span className="text-term-green w-16 inline-block">
            Location
          </span>
          <span className="text-term-muted"> → </span>
          <span className="text-term-text">{personal.location}</span>
        </p>
      </div>

      <p className="text-term-muted text-xs pt-1">
        {i18n.contact.openTo[lang]}
      </p>
    </div>
  );
}
