import { Fragment } from "react";
import { i18n } from "@/data/i18n";
import { useLanguage } from "@/contexts/LanguageContext";

interface CommandHelpItem {
  cmd: string;
  descKey: keyof typeof i18n.help.commands;
  alias?: string;
}

const mainCommands: CommandHelpItem[] = [
  { cmd: "welcome",         descKey: "welcome"                           },
  { cmd: "help",            descKey: "help",            alias: "?"       },
  { cmd: "ls",              descKey: "ls"                                },
  { cmd: "cat",             descKey: "cat",             alias: "<section>" },
  { cmd: "cd",              descKey: "cd",              alias: "<section>" },
  { cmd: "whoami",          descKey: "whoami"                            },
  { cmd: "theme",           descKey: "theme"                             },
  { cmd: "clear",           descKey: "clear"                             },
];

interface DevOpsCmdItem {
  cmd: string;
  descKey: keyof typeof i18n.devops;
  usage: string;
}

const devopsCommands: DevOpsCmdItem[] = [
  { cmd: "docker",     descKey: "docker",    usage: "ps | images"    },
  { cmd: "kubectl",    descKey: "kubectl",   usage: "get pods|nodes" },
  { cmd: "terraform",  descKey: "terraform", usage: "plan"           },
  { cmd: "./deploy",   descKey: "deploy",    usage: ""               },
  { cmd: "uptime",     descKey: "uptime",    usage: ""               },
  { cmd: "./doom",     descKey: "doom",      usage: ""               },
];

export default function HelpOutput() {
  const { lang } = useLanguage();

  return (
    <div className="space-y-3 text-sm">
      <p className="text-term-green">{i18n.help.title[lang]}</p>
      <div
        className="gap-x-8 gap-y-1"
        style={{ display: "grid", gridTemplateColumns: "max-content 1fr" }}
      >
        {mainCommands.map(({ cmd, descKey, alias }) => (
          <Fragment key={cmd}>
            <span className="text-term-text font-mono whitespace-nowrap">
              {cmd}
              {alias && (
                <span className="text-term-muted text-xs ml-1">[{alias}]</span>
              )}
            </span>
            <span className="text-term-muted">
              {i18n.help.commands[descKey][lang]}
            </span>
          </Fragment>
        ))}
      </div>

      <div className="pt-1">
        <p className="text-term-blue">{i18n.devops.sectionTitle[lang]}</p>
        <div
          className="mt-1 gap-x-8 gap-y-1"
          style={{ display: "grid", gridTemplateColumns: "max-content 1fr" }}
        >
          {devopsCommands.map(({ cmd, descKey, usage }) => (
            <Fragment key={cmd}>
              <span className="text-term-text font-mono whitespace-nowrap">
                {cmd}
                {usage && (
                  <span className="text-term-muted text-xs ml-1">[{usage}]</span>
                )}
              </span>
              <span className="text-term-muted">
                {(i18n.devops[descKey] as Record<string, string>)[lang]}
              </span>
            </Fragment>
          ))}
        </div>
      </div>

      <p className="text-term-muted pt-1 text-xs">
        {i18n.help.history[lang]}
      </p>
    </div>
  );
}
