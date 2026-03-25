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
    pt: "Estudante de Sistemas de Informação com foco em DevOps, Cloud e SRE. Experiência com Docker, AWS e ferramentas de monitoramento como Prometheus, Grafana e Sentry. Certificado pela Amazon Web Services (AWS Cloud Practitioner). Busco oportunidade júnior para atuar em times ágeis.",
    en: "Information Systems student focused on DevOps, Cloud and SRE. Experienced with Docker, AWS and monitoring tools such as Prometheus, Grafana and Sentry. AWS Certified Cloud Practitioner. Seeking a junior opportunity to work in agile teams.",
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
      { name: "Docker Compose", level: 83 },
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
        pt: "Implementei Docker e Docker Compose em projetos de clientes, reduzindo tempo de setup de ambientes de desenvolvimento em 45% em média",
        en: "Implemented Docker and Docker Compose in client projects, reducing development environment setup time by 45% on average",
      },
      {
        pt: "Configurei Sentry para monitoramento de erros em produção, aumentando em 25% a detecção proativa de falhas e reduzindo tempo de resposta",
        en: "Configured Sentry for production error monitoring, increasing proactive failure detection by 25% and reducing response time",
      },
      {
        pt: "Colaborei em ajustes no backend, aplicando boas práticas que reduziram riscos de vulnerabilidades e melhoraram performance em requisições",
        en: "Collaborated on backend adjustments, applying best practices that reduced vulnerability risks and improved request performance",
      },
    ],
    tech: ["Docker", "Docker Compose", "Sentry", "Linux"],
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
    name: "portfolio-joao",
    description: {
      pt: "Este portfolio estilo terminal. Desenvolvido com Next.js + React + Tailwind CSS v4. Digite 'help' para explorar.",
      en: "This terminal-style portfolio. Built with Next.js + React + Tailwind CSS v4. Type 'help' to explore.",
    },
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS v4"],
    github: "https://github.com/JoaoGSantiago/portfolio-joao",
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
