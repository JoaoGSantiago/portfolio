import { personal } from "@/data/personal";
import { i18n } from "@/data/i18n";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutOutput() {
  const { lang } = useLanguage();

  return (
    <div className="space-y-3 text-sm">
      <div className="space-y-1">
        <p>
          <span className="text-term-green">name</span>
          <span className="text-term-muted">      =&gt; </span>
          <span className="text-term-text">&quot;{personal.name}&quot;</span>
        </p>
        <p>
          <span className="text-term-green">title</span>
          <span className="text-term-muted">     =&gt; </span>
          <span className="text-term-text">&quot;{personal.title}&quot;</span>
        </p>
        <p>
          <span className="text-term-green">subtitle</span>
          <span className="text-term-muted">  =&gt; </span>
          <span className="text-term-text">&quot;{personal.subtitle}&quot;</span>
        </p>
        <p>
          <span className="text-term-green">location</span>
          <span className="text-term-muted">  =&gt; </span>
          <span className="text-term-muted">&quot;{personal.location}&quot;</span>
        </p>
      </div>

      <div className="border-l-2 border-term-border pl-3 mt-2">
        <p className="text-term-muted mb-1"># {i18n.sections.bio[lang]}</p>
        <p className="text-term-muted leading-relaxed">{personal.bio[lang]}</p>
      </div>

      <div className="mt-2 space-y-1">
        <p className="text-term-muted"># {i18n.sections.findMeAt[lang]}</p>
        <p>
          <span className="text-term-text">GitHub</span>
          <span className="text-term-muted">   → </span>
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
          <span className="text-term-text">LinkedIn</span>
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
          <span className="text-term-text">Email</span>
          <span className="text-term-muted">    → </span>
          <a
            href={`mailto:${personal.email}`}
            className="text-term-blue underline underline-offset-2 hover:text-term-green transition-colors"
          >
            {personal.email}
          </a>
        </p>
      </div>
    </div>
  );
}
