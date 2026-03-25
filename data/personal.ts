export type Bilingual = { pt: string; en: string };

export const personal = {
  name: "João Gustavo Santiago de Lima",
  shortName: "joao",
  title: "DevOps Engineer",
  subtitle: "Cloud · Infrastructure · SRE",
  location: "Arapiraca-AL, Brazil",
  email: "joaogsantiagol@gmail.com",
  phone: "(82) 99828-5122",
  github: "https://github.com/JoaoGSantiago",
  linkedin: "https://linkedin.com/in/joao-gustavo-santiago",
  bio: {
    pt: "Estudante de Sistemas de Informação com foco em DevOps, Cloud e SRE. Habilidades em Docker, AWS e ferramentas de observabilidade como Prometheus, Grafana e Sentry. Certificado pela Amazon Web Services (AWS Cloud Practitioner).",
    en: "Information Systems student focused on DevOps, Cloud and SRE. Skilled in Docker, AWS and observability tools such as Prometheus, Grafana and Sentry. AWS Certified Cloud Practitioner.",
  } as Bilingual,
};

export interface StackItem {
  name: string;
  level: number;
}

export interface StackCategory {
  category: Bilingual;
  icon: string;
  items: StackItem[];
}

export const stacks: StackCategory[] = [
  {
    category: { pt: "Cloud & Infraestrutura", en: "Cloud & Infrastructure" },
    icon: "☁",
    items: [
      { name: "AWS (EC2, S3, VPC, IAM)", level: 75 },
      { name: "Terraform", level: 72 },
      { name: "Linux (Server Admin)", level: 80 },
    ],
  },
  {
    category: { pt: "Containers & Orquestração", en: "Containers & Orchestration" },
    icon: "🐳",
    items: [
      { name: "Docker", level: 85 },
      { name: "Kubernetes", level: 50 },
    ],
  },
  {
    category: { pt: "CI/CD", en: "CI/CD" },
    icon: "⚙",
    items: [
      { name: "GitHub Actions", level: 75 },
      { name: "GitLab CI", level: 70 },
      { name: "Git", level: 85 },
    ],
  },
  {
    category: { pt: "Observabilidade & Monitoramento", en: "Observability & Monitoring" },
    icon: "📊",
    items: [
      { name: "Prometheus", level: 68 },
      { name: "Grafana", level: 70 },
      { name: "Zabbix", level: 65 },
      { name: "Sentry", level: 72 },
    ],
  },
  {
    category: { pt: "Scripting & Programação", en: "Scripting & Programming" },
    icon: "💻",
    items: [
      { name: "Python (Automation)", level: 68 },
      { name: "Bash/Shell", level: 72 },
    ],
  },
  {
    category: { pt: "Redes & Segurança", en: "Networking & Security" },
    icon: "🔒",
    items: [
      { name: "TCP/IP", level: 70 },
      { name: "DNS", level: 68 },
      { name: "HTTP", level: 72 },
      { name: "Firewalls", level: 65 },
    ],
  },
];

export interface Experience {
  role: string;
  company: string;
  period: Bilingual;
  location: Bilingual;
  description: Bilingual[];
  tech: string[];
}

export const experiences: Experience[] = [
  {
    role: "Freelancer DevOps / Infrastructure",
    company: "Prime Code",
    period: {
      pt: "Novembro 2025 – Presente",
      en: "November 2025 – Present",
    },
    location: {
      pt: "Remoto",
      en: "Remote",
    },
    description: [
      {
        pt: "Implementei Docker e Docker Compose em projetos de clientes, padronizando ambientes de desenvolvimento e eliminando inconsistências entre máquinas",
        en: "Implemented Docker and Docker Compose in client projects, standardizing development environments and eliminating cross-machine inconsistencies",
      },
      {
        pt: "Configurei stack de observabilidade completa com Prometheus, Grafana, Loki e OpenTelemetry, centralizando métricas, logs e traces em um único painel",
        en: "Set up a full observability stack with Prometheus, Grafana, Loki and OpenTelemetry, centralizing metrics, logs and traces in a single dashboard",
      },
      {
        pt: "Integrei Sentry para rastreamento de erros em produção, aumentando a visibilidade sobre falhas e acelerando o ciclo de resposta a incidentes",
        en: "Integrated Sentry for production error tracking, improving failure visibility and accelerating incident response cycles",
      },
      {
        pt: "Colaborei em ajustes no backend aplicando boas práticas de segurança e performance, com foco em redução de superfície de ataque e confiabilidade",
        en: "Collaborated on backend improvements applying security and performance best practices, focused on reducing attack surface and improving reliability",
      },
    ],
    tech: ["Docker", "Docker Compose", "Prometheus", "Grafana", "Loki", "OpenTelemetry", "Sentry", "Linux"],
  },
];

export interface Project {
  name: string;
  description: Bilingual;
  tech: string[];
  github?: string;
  url?: string;
  status: "active" | "archived" | "wip";
}

export const projects: Project[] = [
  {
    name: "aws-terraform",
    description: {
      pt: "Provisionamento de infraestrutura AWS com Terraform. Resolve inconsistência entre ambientes causada por provisionamento manual, utilizando IaC para provisionar recursos de forma reproduzível e ágil.",
      en: "AWS infrastructure provisioning with Terraform. Solves environment inconsistency caused by manual provisioning, using IaC to provision resources in a reproducible and agile way.",
    },
    tech: ["Terraform", "AWS", "IaC"],
    github: "https://github.com/JoaoGSantiago/aws-terraform",
    status: "active",
  },
  {
    name: "migracao-aws",
    description: {
      pt: "Planejamento e modelagem completa de migração de infraestrutura on-premises para AWS utilizando estratégia Lift-and-Shift com AWS Application Migration Service e modernização posterior com Kubernetes (EKS). Arquitetura com foco em alta disponibilidade, escalabilidade, segurança e confiabilidade.",
      en: "Complete planning and modeling of on-premises infrastructure migration to AWS using Lift-and-Shift strategy with AWS Application Migration Service and subsequent modernization with Kubernetes (EKS). Architecture focused on high availability, scalability, security and reliability.",
    },
    tech: ["AWS", "Kubernetes", "EKS", "AWS MGN"],
    github: "https://github.com/JoaoGSantiago/migracao-aws",
    status: "active",
  },
  {
    name: "stack-observabilidade",
    description: {
      pt: "Stack de observabilidade completa integrada a uma aplicação Next.js. Implementa rastreamento distribuído com OpenTelemetry e Tempo, métricas com Prometheus, agregação de logs com Loki e dashboards no Grafana — tudo orquestrado via Docker Compose.",
      en: "Full observability stack integrated with a Next.js application. Implements distributed tracing with OpenTelemetry and Tempo, metrics with Prometheus, log aggregation with Loki and dashboards in Grafana — all orchestrated via Docker Compose.",
    },
    tech: ["OpenTelemetry", "Tempo", "Prometheus", "Loki", "Grafana", "Next.js", "PostgreSQL", "Docker Compose"],
    github: "https://github.com/JoaoGSantiago/stack-observabilidade",
    status: "active",
  },
  {
    name: "portfolio-joao",
    description: {
      pt: "Este portfolio estilo terminal. Desenvolvido com Next.js + React + Tailwind CSS v4. Digite 'help' para explorar.",
      en: "This terminal-style portfolio. Built with Next.js + React + Tailwind CSS v4. Type 'help' to explore.",
    },
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS v4"],
    github: "https://github.com/JoaoGSantiago/portfolio",
    status: "active",
  },
];

export interface Education {
  degree: Bilingual;
  institution: string;
  period: Bilingual;
  status: "completed" | "ongoing" | "dropped";
}

export const education: Education[] = [
  {
    degree: {
      pt: "Bacharelado em Sistemas de Informação",
      en: "Bachelor's in Information Systems",
    },
    institution: "IFAL – Instituto Federal de Alagoas (Arapiraca)",
    period: {
      pt: "Março 2025 – Previsão 2029",
      en: "March 2025 – Expected 2029",
    },
    status: "ongoing",
  },
  {
    degree: {
      pt: "Tecnólogo em Segurança da Informação",
      en: "Associate's Degree in Information Security",
    },
    institution: "UNINTER (EAD)",
    period: {
      pt: "Setembro 2024 – Previsão 2027",
      en: "September 2024 – Expected 2027",
    },
    status: "ongoing",
  },
  {
    degree: {
      pt: "Curso Técnico Integrado em Eletrotécnica",
      en: "Integrated Technical Course in Electrical Engineering",
    },
    institution: "IFAL – Instituto Federal de Alagoas",
    period: {
      pt: "Fevereiro 2020 – Janeiro 2023",
      en: "February 2020 – January 2023",
    },
    status: "completed",
  },
];

export interface Certification {
  name: string;
  issuer: string;
  date: Bilingual;
  badge?: string;
}

export const certifications: Certification[] = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    date: { pt: "Maio 2025", en: "May 2025" },
    badge: "CLF-C02",
  },
  {
    name: "Bootcamp DevSecOps & AWS",
    issuer: "Compass UOL",
    date: { pt: "2025", en: "2025" },
    badge: "200+ hours",
  },
];
