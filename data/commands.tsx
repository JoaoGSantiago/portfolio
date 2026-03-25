import { CommandMap } from "@/types/terminal";
import AboutOutput from "@/components/output/AboutOutput";
import ContactOutput from "@/components/output/ContactOutput";
import EducationOutput from "@/components/output/EducationOutput";
import ExperienceOutput from "@/components/output/ExperienceOutput";
import HelpOutput from "@/components/output/HelpOutput";
import ProjectsOutput from "@/components/output/ProjectsOutput";
import StackOutput from "@/components/output/StackOutput";
import WelcomeOutput from "@/components/output/WelcomeOutput";
import {
  DockerPsOutput,
  DockerImagesOutput,
  DockerUsageHint,
  KubectlPodsOutput,
  KubectlNodesOutput,
  KubectlUsageHint,
  TerraformPlanOutput,
  TerraformUsageHint,
  DeployOutput,
  UptimeOutput,
} from "@/components/output/DevOpsOutput";
import DoomOutput from "@/components/output/DoomOutput";
import LsOutput from "@/components/output/LsOutput";
import CdOutput from "@/components/output/CdOutput";
import { personal } from "@/data/personal";

export const commands: CommandMap = {
  welcome: {
    name: "welcome",
    description: "Show the welcome screen",
    execute: () => <WelcomeOutput />,
  },

  help: {
    name: "help",
    description: "Show available commands",
    aliases: ["?"],
    execute: () => <HelpOutput />,
  },

  whoami: {
    name: "whoami",
    description: "Quick bio",
    execute: () => (
      <p className="text-sm">
        <span className="text-term-yellow">{personal.name}</span>
        <span className="text-term-muted"> — </span>
        <span className="text-term-text">{personal.title}</span>
        <span className="text-term-muted"> · {personal.location}</span>
      </p>
    ),
  },

  cat: {
    name: "cat",
    description: "Display a portfolio section",
    usage: "cat <section>",
    execute: (args) => {
      const section = args[0]?.toLowerCase();
      if (section === "about") return <AboutOutput />;
      if (section === "experience") return <ExperienceOutput />;
      if (section === "projects") return <ProjectsOutput />;
      if (section === "stack") return <StackOutput />;
      if (section === "education") return <EducationOutput />;
      if (section === "contact") return <ContactOutput />;

      return (
        <p className="text-sm text-term-red">
          cat: {args[0] ?? ""}: no such file. Try: about, experience, projects, stack, education, contact
        </p>
      );
    },
  },

  clear: {
    name: "clear",
    description: "Clear the terminal",
    execute: () => null,
  },


  docker: {
    name: "docker",
    description: "List running containers or images",
    usage: "docker ps | docker images",
    execute: (args) => {
      if (args[0] === "ps")     return <DockerPsOutput />;
      if (args[0] === "images") return <DockerImagesOutput />;
      return <DockerUsageHint />;
    },
  },

  kubectl: {
    name: "kubectl",
    description: "Inspect Kubernetes resources",
    usage: "kubectl get pods | kubectl get nodes",
    execute: (args) => {
      if (args[0] === "get" && args[1] === "pods")  return <KubectlPodsOutput />;
      if (args[0] === "get" && args[1] === "nodes") return <KubectlNodesOutput />;
      return <KubectlUsageHint />;
    },
  },

  terraform: {
    name: "terraform",
    description: "IaC infrastructure plan",
    usage: "terraform plan | terraform init",
    execute: (args) => {
      if (args[0] === "plan") return <TerraformPlanOutput />;
      return <TerraformUsageHint />;
    },
  },

  "./deploy": {
    name: "./deploy",
    description: "Simulate a full CI/CD deploy pipeline",
    execute: () => <DeployOutput />,
  },

  uptime: {
    name: "uptime",
    description: "Server uptime & load average",
    execute: () => <UptimeOutput />,
  },

  "./doom": {
    name: "./doom",
    description: "Run DOOM in the terminal",
    execute: () => <DoomOutput />,
  },

  ls: {
    name: "ls",
    description: "List portfolio sections",
    execute: () => <LsOutput />,
  },

  cd: {
    name: "cd",
    description: "Navigate to a portfolio section",
    usage: "cd <section>",
    execute: (args) => <CdOutput section={args[0] ?? ""} />,
  },
};


export function buildCommandMap(map: CommandMap): CommandMap {
  const resolved: CommandMap = { ...map };
  for (const cmd of Object.values(map)) {
    if (cmd.aliases) {
      for (const alias of cmd.aliases) {
        resolved[alias] = cmd;
      }
    }
  }
  return resolved;
}

export const commandRegistry = buildCommandMap(commands);
