"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiTerraform, SiLinux,
  SiDocker, SiKubernetes,
  SiGithubactions, SiGitlab, SiGit,
  SiPrometheus, SiGrafana, SiSentry,
  SiPython, SiGnubash, SiOpentelemetry,
  SiPostgresql, SiNextdotjs, SiReact, SiTypescript,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { LuNetwork, LuGlobe, LuShield, LuRouter } from "react-icons/lu";
import { TbWorldWww, TbShieldLock, TbActivityHeartbeat } from "react-icons/tb";
import {
  personal,
  experiences,
  projects,
  stacks,
  education,
  certifications,
} from "@/data/personal";
import { THEMES } from "@/data/themes";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/hooks/useTheme";
import { RainEffect } from "@/components/output/RainEffect";
import SnakeModal from "@/components/SnakeModal";

const ICON_MAP: Record<string, IconType> = {
  "AWS (EC2, S3, VPC, IAM)": FaAws,
  "Terraform":               SiTerraform,
  "Linux (Server Admin)":    SiLinux,
  "Docker":                  SiDocker,
  "Docker Compose":          SiDocker,
  "Kubernetes":              SiKubernetes,
  "GitHub Actions":          SiGithubactions,
  "GitLab CI":               SiGitlab,
  "Git":                     SiGit,
  "Prometheus":              SiPrometheus,
  "Grafana":                 SiGrafana,
  "Sentry":                  SiSentry,
  "Zabbix":                  TbActivityHeartbeat,
  "Python (Automation)":     SiPython,
  "Bash/Shell":              SiGnubash,
  "OpenTelemetry":           SiOpentelemetry,
  "PostgreSQL":              SiPostgresql,
  "Next.js":                 SiNextdotjs,
  "React":                   SiReact,
  "TypeScript":              SiTypescript,
  "TCP/IP":                  LuNetwork,
  "DNS":                     LuGlobe,
  "HTTP":                    TbWorldWww,
  "Firewalls":               TbShieldLock,
  "Networking":              LuRouter,
  "Security":                LuShield,
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function Reveal({ children, delay = 0 }: { readonly children: React.ReactNode; readonly delay?: number }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({ label }: { readonly label: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="text-term-green">▸</span>
      <span className="text-term-muted text-xs tracking-widest uppercase">{label}</span>
      <div className="flex-1 h-px bg-term-border" />
    </div>
  );
}

function projectStatusClass(status: string): string {
  if (status === "active") return "border-term-green text-term-green";
  if (status === "wip") return "border-term-blue text-term-blue";
  return "border-term-muted text-term-muted";
}

function educationBorderClass(status: string): string {
  if (status === "completed") return "border-term-green";
  if (status === "ongoing") return "border-term-yellow";
  return "border-term-muted";
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
  const { theme, setTheme, themeClass } = useTheme();

  const [rain,  setRain]  = useState(false);
  const [snake, setSnake] = useState(false);

  useEffect(() => {
    const onRain  = () => setRain(true);
    const onSnake = () => setSnake(true);
    globalThis.addEventListener("terraform:rain", onRain);
    globalThis.addEventListener("snake:open",     onSnake);
    return () => {
      globalThis.removeEventListener("terraform:rain", onRain);
      globalThis.removeEventListener("snake:open",     onSnake);
    };
  }, []);

  const t = {
    about:      { pt: "sobre",       en: "about" },
    experience: { pt: "experiência", en: "experience" },
    projects:   { pt: "projetos",    en: "projects" },
    stack:      { pt: "stack",       en: "stack" },
    education:  { pt: "formação",    en: "education" },
    contact:    { pt: "contato",     en: "contact" },
    themeTitle: { pt: "tema da interface", en: "interface theme" },
    themeHint: {
      pt: "Personalize as cores da página.",
      en: "Customize page colors.",
    },
    currentTheme: { pt: "tema atual", en: "current theme" },
    scroll:     { pt: "role para explorar", en: "scroll to explore" },
    github:     { pt: "ver no GitHub ↗", en: "view on GitHub ↗" },
  };

  return (
    <>
    <RainEffect active={rain} />
    <SnakeModal visible={snake} onClose={() => setSnake(false)} />
    <div className={`min-h-screen bg-term-bg text-term-text font-mono ${themeClass}`}>

      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
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

      <div className="max-w-4xl pb-32 space-y-28 px-6 mx-auto lg:ml-[20%] xl:ml-[22%]">

        <Reveal>
          <section id="about" className="scroll-mt-24">
            <SectionHeader label={t.about[lang]} />
            <p className="text-sm leading-relaxed text-term-text border-l-2 border-term-green pl-4">
              {personal.bio[lang]}
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section id="experience" className="scroll-mt-24">
            <SectionHeader label={t.experience[lang]} />
            <div className="space-y-12">
              {experiences.map((exp, i) => (
                <Reveal key={exp.company} delay={i * 0.1}>
                  <div className="relative pl-6 border-l border-term-border">
                    <div className="absolute -left-1.5 top-1.5 w-3 h-3 border-2 border-term-green bg-term-bg" />
                    <p className="text-term-green text-sm font-semibold">{exp.role}</p>
                    <p className="text-term-text text-sm">{exp.company}</p>
                    <p className="text-term-muted text-xs mt-0.5">
                      {exp.period[lang]} · {exp.location[lang]}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {exp.description.map((d) => (
                        <li key={d.en} className="text-sm text-term-text flex gap-2">
                          <span className="text-term-muted shrink-0 mt-0.5">·</span>
                          <span>{d[lang]}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.tech.map((tech) => <Tag key={tech} name={tech} />)}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section id="projects" className="scroll-mt-24">
            <SectionHeader label={t.projects[lang]} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {projects.map((proj, i) => (
                <Reveal key={proj.name} delay={i * 0.08}>
                  <div className="border border-term-border p-5 hover:border-term-green transition-colors group flex flex-col h-full">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="text-term-green text-sm font-semibold group-hover:text-term-text transition-colors">
                        {proj.name}
                      </p>
                      <span className={`text-xs px-1.5 py-0.5 border shrink-0 ${projectStatusClass(proj.status)}`}>
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
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section id="stack" className="scroll-mt-24">
            <SectionHeader label={t.stack[lang]} />
            <div className="space-y-10">
              {stacks.map((cat, i) => (
                <Reveal key={cat.category.en} delay={i * 0.05}>
                  <div>
                    <p className="text-term-muted text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
                      <span className="text-term-green">▸</span>
                      {cat.category[lang]}
                    </p>
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
                      {cat.items.map((item) => {
                        const Icon = ICON_MAP[item.name];
                        const displayName = item.name.split(" (")[0];
                        return (
                          <div
                            key={item.name}
                            title={item.name}
                            className="group flex flex-col items-center justify-center gap-2.5 p-4 border border-term-border bg-term-bg-secondary hover:border-term-green hover:bg-term-bg transition-all cursor-default"
                          >
                            {Icon ? (
                              <Icon
                                className="text-term-muted group-hover:text-term-green transition-colors"
                                style={{ width: 30, height: 30 }}
                              />
                            ) : (
                              <span className="text-term-green text-sm font-bold font-mono">{displayName.slice(0, 3).toUpperCase()}</span>
                            )}
                            <span className="text-term-muted text-xs text-center leading-snug group-hover:text-term-text transition-colors line-clamp-2">
                              {displayName}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section id="education" className="scroll-mt-24">
            <SectionHeader label={t.education[lang]} />
            <div className="space-y-6 mb-8">
              {education.map((edu, i) => (
                <Reveal key={edu.institution} delay={i * 0.1}>
                  <div className="relative pl-6 border-l border-term-border">
                    <div className={`absolute -left-1.5 top-1.5 w-3 h-3 border-2 bg-term-bg ${educationBorderClass(edu.status)}`} />
                    <p className="text-term-text text-sm font-semibold">{edu.degree[lang]}</p>
                    <p className="text-term-muted text-xs">{edu.institution}</p>
                    <p className="text-term-border text-xs mt-0.5">{edu.period[lang]}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="space-y-2">
              {certifications.map((cert, i) => (
                <Reveal key={cert.name} delay={i * 0.1}>
                  <div className="flex items-center gap-4 border border-term-border px-4 py-3 hover:border-term-green transition-colors">
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
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section id="contact" className="scroll-mt-24">
            <SectionHeader label={t.contact[lang]} />
            <div className="space-y-3">
              {[
                { label: "email",    value: personal.email,                            href: `mailto:${personal.email}` },
                { label: "github",   value: personal.github.replace("https://", ""),   href: personal.github },
                { label: "linkedin", value: personal.linkedin.replace("https://", ""), href: personal.linkedin },
                { label: "whatsapp", value: personal.phone, href: `https://wa.me/5582998285122` },
              ].map((item, i) => (
                <Reveal key={item.label} delay={i * 0.07}>
                  <a
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
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="scroll-mt-24">
            <SectionHeader label={t.themeTitle[lang]} />
            <div className="border border-term-border bg-term-bg-secondary/50 p-4 sm:p-5">
              <p className="text-term-muted text-xs mb-4">{t.themeHint[lang]}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.values(THEMES).map((item) => {
                  const isActive = item.name === theme;
                  return (
                    <button
                      key={item.name}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setTheme(item.name)}
                      className={`text-left border px-3 py-2 transition-colors cursor-pointer ${
                        isActive
                          ? "border-term-green bg-term-bg text-term-green"
                          : "border-term-border text-term-text hover:border-term-green"
                      }`}
                    >
                      <p className="text-xs font-semibold">{item.label}</p>
                      <p className="text-xs text-term-muted mt-1">{item.description}</p>
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-term-border mt-3">
                {t.currentTheme[lang]}: <span className="text-term-green">{theme}</span>
              </p>
            </div>
          </section>
        </Reveal>

      </div>

      <footer className="border-t border-term-border py-6 text-center text-xs text-term-border font-mono">
        <span className="text-term-green">▸</span> João Gustavo Santiago de Lima &nbsp;·&nbsp; {new Date().getFullYear()}
      </footer>
    </div>
    </>
  );
}
