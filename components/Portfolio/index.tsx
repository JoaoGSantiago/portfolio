"use client";

import {
  personal,
  experiences,
  projects,
  stacks,
  education,
  certifications,
} from "@/data/personal";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/hooks/useTheme";

function SectionHeader({ label }: { readonly label: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="text-term-green">▸</span>
      <span className="text-term-muted text-xs tracking-widest uppercase">{label}</span>
      <div className="flex-1 h-px bg-term-border" />
    </div>
  );
}

function Tag({ name }: { readonly name: string }) {
  return (
    <span className="text-xs px-2 py-0.5 border border-term-border text-term-muted font-mono">
      {name}
    </span>
  );
}

export default function Portfolio() {
  const { lang } = useLanguage();
  const { themeClass } = useTheme();

  const t = {
    about:      { pt: "sobre",       en: "about" },
    experience: { pt: "experiência", en: "experience" },
    projects:   { pt: "projetos",    en: "projects" },
    stack:      { pt: "stack",       en: "stack" },
    education:  { pt: "formação",    en: "education" },
    contact:    { pt: "contato",     en: "contact" },
    scroll:     { pt: "role para explorar", en: "scroll to explore" },
    github:     { pt: "ver no GitHub ↗", en: "view on GitHub ↗" },
  };

  return (
    <div className={`min-h-screen bg-term-bg text-term-text font-mono ${themeClass}`}>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(var(--term-border) 1px, transparent 1px),
              linear-gradient(90deg, var(--term-border) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
            opacity: 0.04,
          }}
        />

        <div className="max-w-3xl mx-auto w-full relative pt-20">
          <p className="text-term-muted text-sm mb-5 flex items-center gap-2">
            <span className="text-term-green">$</span> whoami
          </p>

          <h1 className="text-5xl font-bold leading-tight text-term-text mb-1">
            João Gustavo
          </h1>
          <h1 className="text-5xl font-bold leading-tight text-term-green mb-8">
            Santiago de Lima
          </h1>

          <div className="space-y-1 pl-1 border-l-2 border-term-border mb-8">
            <p className="text-lg text-term-text pl-4">{personal.title}</p>
            <p className="text-sm text-term-muted pl-4">{personal.subtitle}</p>
            <p className="text-xs text-term-border pl-4">
              kernel: Linux &nbsp;·&nbsp; shell: /bin/bash &nbsp;·&nbsp; {personal.location}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pl-1">
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 border border-term-green text-term-green text-xs hover:bg-term-green hover:text-term-bg transition-colors"
            >
              $ github ↗
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 border border-term-border text-term-muted text-xs hover:border-term-text hover:text-term-text transition-colors"
            >
              $ linkedin ↗
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="px-4 py-2 border border-term-border text-term-muted text-xs hover:border-term-text hover:text-term-text transition-colors"
            >
              $ email ↗
            </a>
          </div>

          <p className="mt-20 flex items-center gap-2 text-term-border text-xs">
            <span className="cursor-blink text-term-green">_</span>
            {t.scroll[lang]}
          </p>
        </div>
      </section>

      {/* ── Sections ── */}
      <div className="max-w-3xl mx-auto px-6 pb-32 space-y-28">

        {/* About */}
        <section>
          <SectionHeader label={t.about[lang]} />
          <p className="text-sm leading-relaxed text-term-text border-l-2 border-term-green pl-4">
            {personal.bio[lang]}
          </p>
        </section>

        {/* Experience */}
        <section>
          <SectionHeader label={t.experience[lang]} />
          <div className="space-y-12">
            {experiences.map((exp) => (
              <div key={exp.company} className="relative pl-6 border-l border-term-border">
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 border-2 border-term-green bg-term-bg" />
                <p className="text-term-green text-sm font-semibold">{exp.role}</p>
                <p className="text-term-text text-sm">{exp.company}</p>
                <p className="text-term-muted text-xs mt-0.5">
                  {exp.period[lang]} · {exp.location[lang]}
                </p>
                <ul className="mt-4 space-y-2">
                  {exp.description.map((d, i) => (
                    <li key={i} className="text-sm text-term-text flex gap-2">
                      <span className="text-term-muted shrink-0 mt-0.5">·</span>
                      <span>{d[lang]}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.tech.map((tech) => <Tag key={tech} name={tech} />)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <SectionHeader label={t.projects[lang]} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {projects.map((proj) => (
              <div
                key={proj.name}
                className="border border-term-border p-5 hover:border-term-green transition-colors group flex flex-col"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-term-green text-sm font-semibold group-hover:text-term-text transition-colors">
                    {proj.name}
                  </p>
                  <span className={`text-xs px-1.5 py-0.5 border shrink-0 ${
                    proj.status === "active"   ? "border-term-green text-term-green" :
                    proj.status === "wip"      ? "border-term-yellow text-term-yellow" :
                                                 "border-term-muted text-term-muted"
                  }`}>
                    {proj.status}
                  </span>
                </div>
                <p className="text-xs text-term-muted leading-relaxed mb-4 flex-1">
                  {proj.description[lang]}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.tech.map((tech) => <Tag key={tech} name={tech} />)}
                </div>
                {proj.github && (
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-term-muted hover:text-term-green transition-colors"
                  >
                    {t.github[lang]}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Stack */}
        <section>
          <SectionHeader label={t.stack[lang]} />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {stacks.map((cat) => (
              <div key={cat.category.en} className="border border-term-border p-4">
                <p className="text-term-muted text-xs tracking-wider uppercase mb-3">
                  {cat.category[lang]}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item.name}
                      className="text-xs px-2 py-1 bg-term-bg-secondary border border-term-border text-term-text"
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <SectionHeader label={t.education[lang]} />
          <div className="space-y-6 mb-8">
            {education.map((edu) => (
              <div key={edu.institution} className="relative pl-6 border-l border-term-border">
                <div className={`absolute -left-1.5 top-1.5 w-3 h-3 border-2 bg-term-bg ${
                  edu.status === "completed" ? "border-term-green" :
                  edu.status === "ongoing"   ? "border-term-yellow" :
                                               "border-term-muted"
                }`} />
                <p className="text-term-text text-sm font-semibold">{edu.degree[lang]}</p>
                <p className="text-term-muted text-xs">{edu.institution}</p>
                <p className="text-term-border text-xs mt-0.5">{edu.period[lang]}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="flex items-center gap-4 border border-term-border px-4 py-3 hover:border-term-green transition-colors"
              >
                <span className="text-term-green text-xs">✓</span>
                <div className="flex-1">
                  <p className="text-term-text text-sm">{cert.name}</p>
                  <p className="text-term-muted text-xs">{cert.issuer} · {cert.date[lang]}</p>
                </div>
                {cert.badge && (
                  <span className="text-xs border border-term-green text-term-green px-2 py-0.5 shrink-0">
                    {cert.badge}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section>
          <SectionHeader label={t.contact[lang]} />
          <div className="space-y-3">
            {[
              { label: "email",    value: personal.email,                            href: `mailto:${personal.email}` },
              { label: "github",   value: personal.github.replace("https://", ""),   href: personal.github },
              { label: "linkedin", value: personal.linkedin.replace("https://", ""), href: personal.linkedin },
              { label: "phone",    value: personal.phone,                            href: `tel:${personal.phone}` },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="flex items-center gap-4 text-sm group"
              >
                <span className="text-term-muted w-16 shrink-0 text-xs">{item.label}</span>
                <span className="text-term-border">·</span>
                <span className="text-term-text group-hover:text-term-green transition-colors">
                  {item.value}
                </span>
              </a>
            ))}
          </div>
        </section>

      </div>

      <footer className="border-t border-term-border py-6 text-center text-xs text-term-border font-mono">
        <span className="text-term-green">▸</span> João Gustavo Santiago de Lima &nbsp;·&nbsp; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
