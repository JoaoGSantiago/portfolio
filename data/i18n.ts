import type { Lang } from "@/contexts/LanguageContext";

type T = Record<Lang, string>;

export const i18n = {
  welcome: {
    typeHelp: { pt: "Digite", en: "Type" } as T,
    toSeeCommands: {
      pt: "para ver os comandos disponíveis.",
      en: "to see available commands.",
    } as T,
    try: { pt: "Tente", en: "Try" } as T,
    toExploreStack: {
      pt: "para explorar meu stack tecnológico.",
      en: "to explore my tech stack.",
    } as T,
  },
  help: {
    title: { pt: "Comandos disponíveis:", en: "Available commands:" } as T,
    history: {
      pt: "Use ↑ / ↓ para navegar no histórico de comandos.",
      en: "Use ↑ / ↓ to navigate command history.",
    } as T,
    commands: {
      welcome: { pt: "Mostrar a tela de boas-vindas", en: "Show the welcome screen" } as T,
      help: { pt: "Mostrar esta mensagem de ajuda", en: "Show this help message" } as T,
      about: { pt: "Um pouco sobre mim", en: "A bit about me" } as T,
      whoami: { pt: "Bio rápida", en: "Quick bio" } as T,
      stack: {
        pt: "Meu stack tecnológico com níveis de proficiência",
        en: "My tech stack with proficiency levels",
      } as T,
      experience: {
        pt: "Experiência profissional e histórico",
        en: "Work experience & history",
      } as T,
      projects: {
        pt: "Projetos pessoais e open-source",
        en: "Open-source & personal projects",
      } as T,
      education: { pt: "Formação acadêmica", en: "Academic background" } as T,
      certifications: {
        pt: "Certificações profissionais",
        en: "Professional certifications",
      } as T,
      contact: { pt: "Como me encontrar", en: "How to reach me" } as T,
      theme: {
        pt: "Listar ou trocar temas de cores",
        en: "List or switch color themes",
      } as T,
      clear: { pt: "Limpar o terminal", en: "Clear the terminal screen" } as T,
    },
  },
  sections: {
    experience: { pt: "Experiência Profissional", en: "Work Experience" } as T,
    projects: { pt: "Projetos", en: "Projects" } as T,
    education: { pt: "Educação", en: "Education" } as T,
    certifications: { pt: "Certificações", en: "Certifications" } as T,
    contact: { pt: "Contato", en: "Contact" } as T,
    bio: { pt: "bio", en: "bio" } as T,
    findMeAt: { pt: "me encontre em", en: "find me at" } as T,
  },
  status: {
    active: { pt: "ativo", en: "active" } as T,
    wip: { pt: "em progresso", en: "wip" } as T,
    archived: { pt: "arquivado", en: "archived" } as T,
    completed: { pt: "concluído", en: "completed" } as T,
    ongoing: { pt: "em andamento", en: "ongoing" } as T,
    dropped: { pt: "trancado", en: "dropped" } as T,
  },
  stack: {
    loading: {
      pt: "Carregando níveis de proficiência...",
      en: "Loading proficiency levels...",
    } as T,
    done: { pt: "pronto", en: "done" } as T,
    levels: {
      expert: { pt: "Expert", en: "Expert" } as T,
      advanced: { pt: "Avançado", en: "Advanced" } as T,
      intermediate: { pt: "Intermediário", en: "Intermediate" } as T,
      learning: { pt: "Aprendendo", en: "Learning" } as T,
    },
    legend: {
      expert: { pt: "Expert (90%+)", en: "Expert (90%+)" } as T,
      advanced: { pt: "Avançado (75%+)", en: "Advanced (75%+)" } as T,
      intermediate: { pt: "Intermediário (60%+)", en: "Intermediate (60%+)" } as T,
      learning: { pt: "Aprendendo", en: "Learning" } as T,
    },
  },
  contact: {
    openTo: {
      pt: "Aberto a freelas, consultoria e oportunidades remotas.",
      en: "Open to freelance, consulting, and full-time remote opportunities.",
    } as T,
  },
  errors: {
    commandNotFound: { pt: "comando não encontrado", en: "command not found" } as T,
    typeHelpSuffix: {
      pt: "— digite help para ver os comandos disponíveis",
      en: "— type help to see available commands",
    } as T,
  },
  devops: {
    sectionTitle: { pt: "Outros comandos:", en: "Other commands:" } as T,
    docker: { pt: "Lista containers em execução", en: "List running containers" } as T,
    kubectl: { pt: "Inspeciona pods Kubernetes", en: "Inspect Kubernetes pods" } as T,
    terraform: { pt: "Plano de infraestrutura IaC", en: "IaC infrastructure plan" } as T,
    deploy: { pt: "Simula pipeline CI/CD completo", en: "Simulate full CI/CD pipeline" } as T,
    uptime: { pt: "Uptime e carga do servidor", en: "Server uptime & load average" } as T,
    doom:   { pt: "Roda DOOM no terminal", en: "Run DOOM in the terminal" } as T,
    usageDocker: {
      pt: 'Uso: docker ps | docker images',
      en: 'Usage: docker ps | docker images',
    } as T,
    usageKubectl: {
      pt: 'Uso: kubectl get pods | kubectl get nodes',
      en: 'Usage: kubectl get pods | kubectl get nodes',
    } as T,
    usageTerraform: {
      pt: 'Uso: terraform plan | terraform init',
      en: 'Usage: terraform plan | terraform init',
    } as T,
  },
};
