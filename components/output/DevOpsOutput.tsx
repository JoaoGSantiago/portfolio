"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { i18n } from "@/data/i18n";
import { unlockSnake } from "@/lib/gameState";

const dockerContainers = [
  { id: "a1b2c3d4", image: "nginx:1.25-alpine",              status: "Up 2 hours",  ports: "0.0.0.0:80->80/tcp",     name: "nginx-proxy"    },
  { id: "b2c3d4e5", image: "node:20-alpine",                 status: "Up 3 hours",  ports: "0.0.0.0:3000->3000/tcp", name: "api-service"    },
  { id: "c3d4e5f6", image: "postgres:16",                    status: "Up 2 days",   ports: "5432/tcp",               name: "postgres-db"    },
  { id: "d4e5f6a1", image: "redis:7.2-alpine",               status: "Up 2 days",   ports: "6379/tcp",               name: "redis-cache"    },
  { id: "e5f6a1b2", image: "prom/prometheus:v2.48",          status: "Up 5 days",   ports: "0.0.0.0:9090->9090/tcp", name: "prometheus"     },
  { id: "f6a1b2c3", image: "grafana/grafana:10.2",           status: "Up 5 days",   ports: "0.0.0.0:3001->3000/tcp", name: "grafana"        },
  { id: "a7b8c9d0", image: "joaogsantiago/portfolio:latest", status: "Up 1 hour",   ports: "0.0.0.0:3000->3000/tcp", name: "portfolio-web"  },
  { id: "b8c9d0e1", image: "joaogsantiago/snake:v1.0",       status: "Up 1 hour",   ports: "-",                      name: "snake-game"     },
];

export function DockerPsOutput() {
  return (
    <div className="text-xs font-mono space-y-1">
      <p className="text-term-green text-sm">$ docker ps</p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-term-muted">
              <th className="text-left pr-4 pb-1 font-normal">CONTAINER ID</th>
              <th className="text-left pr-4 pb-1 font-normal">IMAGE</th>
              <th className="text-left pr-4 pb-1 font-normal">STATUS</th>
              <th className="text-left pr-4 pb-1 font-normal">PORTS</th>
              <th className="text-left pb-1 font-normal">NAMES</th>
            </tr>
          </thead>
          <tbody>
            {dockerContainers.map((c) => (
              <tr key={c.id}>
                <td className="pr-4 text-term-muted">{c.id}</td>
                <td className="pr-4 text-term-blue">{c.image}</td>
                <td className="pr-4 text-term-green">{c.status}</td>
                <td className="pr-4 text-term-blue">{c.ports}</td>
                <td className="text-term-text font-semibold">{c.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-term-muted pt-1">
        {dockerContainers.length} containers running
      </p>
    </div>
  );
}


const dockerImages = [
  { repo: "joaogsantiago/api",    tag: "v2.3.1",    id: "sha256:a1b2c3", size: "148MB",  created: "2 hours ago"  },
  { repo: "joaogsantiago/api",    tag: "v2.3.0",    id: "sha256:b2c3d4", size: "147MB",  created: "3 days ago"   },
  { repo: "nginx",                tag: "1.25-alpine",id: "sha256:c3d4e5", size: "41MB",   created: "2 weeks ago"  },
  { repo: "node",                 tag: "20-alpine",  id: "sha256:d4e5f6", size: "131MB",  created: "3 weeks ago"  },
  { repo: "postgres",             tag: "16",         id: "sha256:e5f6a1", size: "425MB",  created: "1 month ago"  },
  { repo: "prom/prometheus",      tag: "v2.48.0",    id: "sha256:f6a1b2", size: "237MB",  created: "2 months ago" },
];

export function DockerImagesOutput() {
  return (
    <div className="text-xs font-mono space-y-1">
      <p className="text-term-green text-sm">$ docker images</p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-term-muted">
              <th className="text-left pr-4 pb-1 font-normal">REPOSITORY</th>
              <th className="text-left pr-4 pb-1 font-normal">TAG</th>
              <th className="text-left pr-4 pb-1 font-normal">IMAGE ID</th>
              <th className="text-left pr-4 pb-1 font-normal">CREATED</th>
              <th className="text-left pb-1 font-normal">SIZE</th>
            </tr>
          </thead>
          <tbody>
            {dockerImages.map((img) => (
              <tr key={`${img.repo}:${img.tag}`}>
                <td className="pr-4 text-term-blue">{img.repo}</td>
                <td className="pr-4 text-term-green">{img.tag}</td>
                <td className="pr-4 text-term-muted">{img.id}</td>
                <td className="pr-4 text-term-muted">{img.created}</td>
                <td className="text-term-blue">{img.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function DockerUsageHint() {
  const { lang } = useLanguage();
  return (
    <p className="text-sm">
      <span className="text-term-muted">{i18n.devops.usageDocker[lang]}</span>
    </p>
  );
}


function nsColorClass(ns: string) {
  if (ns === "production") return "text-term-blue";
  if (ns === "monitoring") return "text-term-purple";
  return "text-term-muted";
}

const kubePods = [
  { ns: "production",  name: "api-deploy-7d9f8b-xk2lp",    ready: "1/1", status: "Running",           restarts: 0,  age: "2d5h" },
  { ns: "production",  name: "api-deploy-7d9f8b-mn3qr",    ready: "1/1", status: "Running",           restarts: 0,  age: "2d5h" },
  { ns: "production",  name: "nginx-ingress-5c8d9f-p4wvz", ready: "1/1", status: "Running",           restarts: 0,  age: "7d"   },
  { ns: "production",  name: "portfolio-web-9f3a2b-k7xmn", ready: "1/1", status: "Running",           restarts: 0,  age: "1h"   },
  { ns: "production",  name: "postgres-statefulset-0",     ready: "1/1", status: "Running",           restarts: 0,  age: "14d"  },
  { ns: "production",  name: "redis-statefulset-0",        ready: "1/1", status: "Running",           restarts: 0,  age: "14d"  },
  { ns: "monitoring",  name: "prometheus-stack-0",         ready: "1/1", status: "Running",           restarts: 1,  age: "30d"  },
  { ns: "monitoring",  name: "grafana-7b8c9d-r5tzx",       ready: "1/1", status: "Running",           restarts: 0,  age: "30d"  },
  { ns: "kube-system", name: "coredns-5d78c-l8rqm",        ready: "2/2", status: "Running",           restarts: 0,  age: "45d"  },
  { ns: "kube-system", name: "whale-battle-x9z3q",         ready: "0/1", status: "CrashLoopBackOff",  restarts: 47, age: "2m"   },
];

export function KubectlPodsOutput() {
  return (
    <div className="text-xs font-mono space-y-1">
      <p className="text-term-green text-sm">$ kubectl get pods --all-namespaces</p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-term-muted">
              <th className="text-left pr-4 pb-1 font-normal">NAMESPACE</th>
              <th className="text-left pr-4 pb-1 font-normal">NAME</th>
              <th className="text-left pr-4 pb-1 font-normal">READY</th>
              <th className="text-left pr-4 pb-1 font-normal">STATUS</th>
              <th className="text-left pr-4 pb-1 font-normal">RESTARTS</th>
              <th className="text-left pb-1 font-normal">AGE</th>
            </tr>
          </thead>
          <tbody>
            {kubePods.map((pod) => (
              <tr key={pod.name}>
                <td className={`pr-4 ${nsColorClass(pod.ns)}`}>
                  {pod.ns}
                </td>
                <td className="pr-4 text-term-text">{pod.name}</td>
                <td className="pr-4 text-term-green">{pod.ready}</td>
                <td className={`pr-4 ${pod.status === "Running" ? "text-term-green" : "text-term-red"}`}>
                  {pod.status}
                </td>
                <td className={`pr-4 ${pod.restarts > 0 ? "text-term-blue" : "text-term-muted"}`}>
                  {pod.restarts}
                </td>
                <td className="text-term-muted">{pod.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-term-muted pt-1">
        {kubePods.length} pods · {kubePods.filter(p => p.status === "Running").length} running
      </p>
    </div>
  );
}

const kubeNodes = [
  { name: "node-master-01",  status: "Ready", roles: "control-plane", age: "45d", version: "v1.28.4" },
  { name: "node-worker-01",  status: "Ready", roles: "worker",         age: "45d", version: "v1.28.4" },
  { name: "node-worker-02",  status: "Ready", roles: "worker",         age: "45d", version: "v1.28.4" },
];

export function KubectlNodesOutput() {
  return (
    <div className="text-xs font-mono space-y-1">
      <p className="text-term-green text-sm">$ kubectl get nodes</p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-term-muted">
              <th className="text-left pr-4 pb-1 font-normal">NAME</th>
              <th className="text-left pr-4 pb-1 font-normal">STATUS</th>
              <th className="text-left pr-4 pb-1 font-normal">ROLES</th>
              <th className="text-left pr-4 pb-1 font-normal">AGE</th>
              <th className="text-left pb-1 font-normal">VERSION</th>
            </tr>
          </thead>
          <tbody>
            {kubeNodes.map((node) => (
              <tr key={node.name}>
                <td className="pr-4 text-term-text">{node.name}</td>
                <td className="pr-4 text-term-green">{node.status}</td>
                <td className={`pr-4 ${node.roles === "control-plane" ? "text-term-blue" : "text-term-muted"}`}>
                  {node.roles}
                </td>
                <td className="pr-4 text-term-muted">{node.age}</td>
                <td className="text-term-cyan">{node.version}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function KubectlUsageHint() {
  const { lang } = useLanguage();
  return (
    <p className="text-sm">
      <span className="text-term-muted">{i18n.devops.usageKubectl[lang]}</span>
    </p>
  );
}


const tfResources = [
  {
    action: "add",
    type: "aws_instance",
    name: "web_server",
    attrs: [
      { key: "ami",           value: '"ami-0c55b159cbfafe1f0"' },
      { key: "instance_type", value: '"t3.micro"'              },
      { key: "tags",          value: '{ Environment = "production", ManagedBy = "Terraform", Name = "api-web-server" }' },
    ],
  },
  {
    action: "add",
    type: "aws_s3_bucket",
    name: "static_assets",
    attrs: [
      { key: "bucket",        value: '"joaogsantiago-static-prod"' },
      { key: "force_destroy", value: "false"                       },
    ],
  },
  {
    action: "add",
    type: "aws_security_group",
    name: "web_sg",
    attrs: [
      { key: "name",        value: '"web-sg-prod"'   },
      { key: "description", value: '"Web server SG"' },
    ],
  },
  {
    action: "change",
    type: "aws_vpc",
    name: "main",
    attrs: [
      { key: "id",   value: '"vpc-0a1b2c3d4e5f6a7b8"'                   },
      { key: "tags", value: '{ LastUpdated = "2025-11-01" → "2026-03-25" }' },
    ],
  },
];

function actionLabel(action: string) {
  if (action === "add")    return "created";
  if (action === "change") return "updated in-place";
  return "destroyed";
}

const actionSymbols: Record<string, string> = {
  add:    "+",
  change: "~",
  remove: "-",
};

const actionColors: Record<string, string> = {
  add:    "text-term-green",
  change: "text-term-blue",
  remove: "text-term-blue",
};

export function TerraformPlanOutput() {
  const adds    = tfResources.filter(r => r.action === "add").length;
  const changes = tfResources.filter(r => r.action === "change").length;
  const removes = tfResources.filter(r => r.action === "remove").length;

  return (
    <div className="text-xs font-mono space-y-3">
      <p className="text-term-green text-sm">$ terraform plan</p>

      <p className="text-term-muted">
        Terraform will perform the following actions:
      </p>

      <div className="space-y-3">
        {tfResources.map((res) => {
          const color  = actionColors[res.action];
          const symbol = actionSymbols[res.action];
          return (
            <div key={`${res.type}.${res.name}`} className="space-y-0.5">
              <p className="text-term-muted">
                # {res.type}.{res.name} will be{" "}
                <span className={color}>
                  {actionLabel(res.action)}
                </span>
              </p>
              <p>
                <span className={color}>{symbol}</span>
                <span className="text-term-text"> resource </span>
                <span className="text-term-blue">&quot;{res.type}&quot;</span>
                <span className="text-term-text"> &quot;{res.name}&quot;</span>
                <span className="text-term-muted"> {"{"}</span>
              </p>
              {res.attrs.map((attr) => (
                <p key={attr.key} className="pl-4">
                  <span className={`${color} w-2 inline-block`}>{symbol}</span>
                  <span className="text-term-green ml-2">{attr.key}</span>
                  <span className="text-term-muted"> = </span>
                  <span className="text-term-blue">{attr.value}</span>
                </p>
              ))}
              <p className="text-term-muted">{"  }"}</p>
            </div>
          );
        })}
      </div>

      <div className="border-t border-term-border pt-2 space-y-1">
        <p>
          <span className="text-term-text font-semibold">Plan: </span>
          <span className="text-term-green">{adds} to add</span>
          <span className="text-term-muted">, </span>
          <span className="text-term-blue">{changes} to change</span>
          <span className="text-term-muted">, </span>
          <span className="text-term-red">{removes} to destroy</span>
          <span className="text-term-muted">.</span>
        </p>
        <p className="text-term-muted">
          Note: You didn&apos;t use the -out option to save this plan, so
          Terraform can&apos;t guarantee to take exactly these actions.
        </p>
      </div>
    </div>
  );
}

export function TerraformUsageHint() {
  const { lang } = useLanguage();
  return (
    <p className="text-sm">
      <span className="text-term-muted">{i18n.devops.usageTerraform[lang]}</span>
    </p>
  );
}


const deploySteps = [
  { step: 1, label: { pt: "Checkout do código",          en: "Checkout code"             }, time: "0.2s",  note: null                              },
  { step: 2, label: { pt: "Lint (ESLint + Hadolint)",    en: "Lint (ESLint + Hadolint)"  }, time: "4.1s",  note: null                              },
  { step: 3, label: { pt: "Testes (42 passou, 0 falhou)",en: "Tests (42 passed, 0 failed)" }, time: "11.8s", note: null                              },
  { step: 4, label: { pt: "Build da imagem Docker",      en: "Build Docker image"        }, time: "23.4s", note: "joaogsantiago/api:v2.3.1"         },
  { step: 5, label: { pt: "Scan de vulnerabilidades",    en: "Vulnerability scan"        }, time: "6.2s",  note: "0 critical · 0 high"             },
  { step: 6, label: { pt: "Push → Amazon ECR",           en: "Push → Amazon ECR"         }, time: "14.7s", note: null                              },
  { step: 7, label: { pt: "Rolling update (ECS)",        en: "Rolling update (ECS)"      }, time: "38.1s", note: "2/2 tasks healthy"               },
  { step: 8, label: { pt: "Smoke tests",                 en: "Smoke tests"               }, time: "3.9s",  note: "/health → 200 OK"                },
];

export function DeployOutput() {
  const { lang } = useLanguage();

  const title      = lang === "pt" ? "Iniciando pipeline de deploy..." : "Starting deploy pipeline...";
  const envLine    = lang === "pt" ? "Ambiente:    production" : "Environment: production";
  const doneLabel  = lang === "pt" ? "Deploy concluído em" : "Deployed in";

  return (
    <div className="text-sm font-mono space-y-2">
      <p className="text-term-green">$ ./deploy --env production</p>

      <p className="text-term-muted text-xs">[pipeline] {title}</p>

      <div className="border border-term-border rounded bg-term-bg-secondary px-3 py-2 space-y-1">
        {deploySteps.map(({ step, label, time, note }) => (
          <div key={step} className="flex items-center gap-2 text-xs">
            <span className="text-term-muted w-4 shrink-0 text-right">{step}</span>
            <span className="text-term-green shrink-0">✓</span>
            <span className="text-term-text w-44 shrink-0">{label[lang]}</span>
            <span className="text-term-muted w-12 shrink-0 text-right">{time}</span>
            {note && (
              <span className="text-term-muted text-xs">
                <span className="text-term-muted">╸ </span>
                <span className="text-term-blue">{note}</span>
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="border-t border-term-border pt-2 space-y-0.5 text-xs">
        <p>
          <span className="text-term-green font-semibold">✔ {doneLabel} 102.4s</span>
        </p>
        <p className="text-term-muted">{envLine}</p>
        <p className="text-term-muted">Version:     v2.3.1</p>
        <p className="text-term-muted">Replicas:    2 / 2</p>
      </div>
    </div>
  );
}


export function UptimeOutput() {
  return (
    <div className="text-sm font-mono space-y-1">
      <p className="text-term-green">$ uptime</p>
      <p>
        <span className="text-term-muted"> 15:42:07 </span>
        <span className="text-term-text">up </span>
        <span className="text-term-green font-semibold">47 days, 3:22</span>
        <span className="text-term-muted">,  1 user,  load average: </span>
        <span className="text-term-green">0.42</span>
        <span className="text-term-muted">, </span>
        <span className="text-term-blue">0.38</span>
        <span className="text-term-muted">, </span>
        <span className="text-term-blue">0.31</span>
      </p>
      <div className="text-xs text-term-muted border-t border-term-border pt-1 mt-1 space-y-0.5">
        <p>
          <span className="text-term-text">CPU  </span>
          <span className="text-term-green">████████░░░░░░░░░░░░</span>
          <span className="text-term-muted"> 42%</span>
        </p>
        <p>
          <span className="text-term-text">MEM  </span>
          <span className="text-term-blue">██████████████░░░░░░</span>
          <span className="text-term-muted"> 71%  (5.6GB / 8GB)</span>
        </p>
        <p>
          <span className="text-term-text">DISK </span>
          <span className="text-term-blue">█████████░░░░░░░░░░░</span>
          <span className="text-term-muted"> 48%  (48GB / 100GB)</span>
        </p>
      </div>
    </div>
  );
}



type ComposeLine = { id: string; text: string; color: string };

const composeMessages: ComposeLine[] = [
  { id: "c00", text: "[+] Building 5/5",                                              color: "text-term-green"  },
  { id: "c01", text: " ✔ Network portfolio_default                      Created",     color: "text-term-green"  },
  { id: "c02", text: " ✔ Volume   portfolio_data                        Created",     color: "text-term-green"  },
  { id: "c03", text: " ⠿ Container portfolio-db         Pulling image...",            color: "text-term-blue"   },
  { id: "c04", text: "   → docker.io/library/postgres:16 — 425 MB",                  color: "text-term-muted"  },
  { id: "c05", text: " ✔ Container portfolio-db         Started",                     color: "text-term-green"  },
  { id: "c06", text: " ⠿ Container portfolio-redis      Pulling image...",            color: "text-term-blue"   },
  { id: "c07", text: "   → docker.io/library/redis:7.2-alpine — 38 MB",              color: "text-term-muted"  },
  { id: "c08", text: " ✔ Container portfolio-redis      Started",                     color: "text-term-green"  },
  { id: "c09", text: " ⠿ Container portfolio-api        Building...",                 color: "text-term-blue" },
  { id: "c10", text: "   → Step 1/8  FROM node:20-alpine",                           color: "text-term-muted"  },
  { id: "c11", text: "   → Step 2/8  WORKDIR /app",                                  color: "text-term-muted"  },
  { id: "c12", text: "   → Step 3/8  COPY package*.json ./",                         color: "text-term-muted"  },
  { id: "c13", text: "   → Step 4/8  RUN npm ci --only=production",                  color: "text-term-muted"  },
  { id: "c14", text: "   → Step 5/8  COPY . .",                                      color: "text-term-muted"  },
  { id: "c15", text: "   → Step 6/8  RUN npm run build",                             color: "text-term-muted"  },
  { id: "c16", text: "   → Step 7/8  EXPOSE 3000",                                   color: "text-term-muted"  },
  { id: "c17", text: '   → Step 8/8  CMD ["node", "server.js"]',                     color: "text-term-muted"  },
  { id: "c18", text: " ✔ Container portfolio-api        Started   → :3000",          color: "text-term-green"  },
  { id: "c19", text: " ⠿ Container portfolio-nginx      Pulling image...",            color: "text-term-blue"   },
  { id: "c20", text: " ✔ Container portfolio-nginx      Started   → :80",            color: "text-term-green"  },
  { id: "c21", text: " ⠿ Container snake-game           Pulling image...",            color: "text-term-blue"   },
  { id: "c22", text: "   → docker.io/joaogsantiago/snake:v1.0 — 12 MB",             color: "text-term-muted"  },
  { id: "c23", text: " ✔ Container snake-game           Started",                     color: "text-term-green"  },
];

const lock   = (): void => { globalThis.dispatchEvent(new CustomEvent("terminal:lock")); };
const unlock = (): void => { globalThis.dispatchEvent(new CustomEvent("terminal:unlock")); };

/** Registers a terminal:cancel listener that clears an interval and marks the component as cancelled. */
function useCancelHandler(
  intervalRef: React.RefObject<ReturnType<typeof setInterval> | null>,
  setCancelled: (v: boolean) => void,
) {
  useEffect(() => {
    const handler = () => {
      if (intervalRef.current != null) clearInterval(intervalRef.current);
      setCancelled(true);
      unlock();
    };
    globalThis.addEventListener("terminal:cancel", handler);
    return () => globalThis.removeEventListener("terminal:cancel", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export function DockerComposeOutput() {
  const { lang } = useLanguage();
  const [shown,     setShown]     = useState<ComposeLine[]>([]);
  const [done,      setDone]      = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const idxRef      = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    lock();
    intervalRef.current = setInterval(() => {
      const line = composeMessages[idxRef.current];
      if (line) {
        idxRef.current += 1;
        setShown((prev) => [...prev, line]);
      } else {
        clearInterval(intervalRef.current!);
        setDone(true);
        unlockSnake();
        unlock();
      }
    }, 750);
    return () => { clearInterval(intervalRef.current!); unlock(); };
  }, []);

  useCancelHandler(intervalRef, setCancelled);

  return (
    <div className="text-xs font-mono space-y-0.5">
      <p className="text-term-green text-sm mb-1">$ docker compose up -d</p>

      {shown.map((line) => (
        <p key={line.id} className={line.color}>{line.text}</p>
      ))}

      {cancelled && (
        <p className="text-term-red font-bold mt-1">^C</p>
      )}

      {done && !cancelled && (
        <div className="border-t border-term-border pt-2 mt-1 space-y-1">
          <p className="text-term-green font-semibold">
            ✔ {lang === "pt" ? "Todos os containers iniciados com sucesso!" : "All containers started successfully!"}
          </p>
          <p className="text-term-muted">
            {lang === "pt"
              ? "Portfolio disponível em http://localhost:3000"
              : "Portfolio available at http://localhost:3000"}
          </p>
          <p className="text-term-muted">
            {lang === "pt" ? "Dica: rode " : "Tip: run "}
            <span className="text-term-blue font-bold">docker ps</span>
            {lang === "pt" ? " para ver os containers ativos" : " to see active containers"}
          </p>
          <p className="text-term-cyan">
            {lang === "pt"
              ? "O container snake-game está rodando! Digite "
              : "snake-game container is running! Type "}
            <span className="text-term-blue font-bold">snake</span>
            {lang === "pt" ? " para jogar." : " to play."}
          </p>
        </div>
      )}
    </div>
  );
}


// ─── kubectl apply -f k8s/ (whale vs K8s ship animation) ─────────────────────

const WHALE_FRAMES = [
  // frame: [whale col, scene]
  [0,  false],
  [4,  false],
  [8,  false],
  [12, false],
  [16, false],
  [20, false],
  [24, false],
  [28, false],
  [32, false],
  [36, true ],   // approaching
  [40, true ],   // close
  [44, true ],   // impact
] as const;

const SCENE_W = 56;

function buildWhaleLine(col: number, line: number): string {
  // Docker whale ASCII (5 lines tall)
  const whale = [
    "   ##    ",
    " ######  ",
    "(  🐳  ) ",
    " ######  ",
    "  ~~~~   ",
  ];
  // K8s ship (5 lines tall, right side)
  const ship = [
    String.raw`   /\   `,
    String.raw`  /K8\  `,
    String.raw` /____\ `,
    "|  ⚓  |",
    "|______|",
  ];

  const wh = whale[line] ?? "         ";
  const sh = ship[line]  ?? "        ";
  const gap = Math.max(0, SCENE_W - col - wh.length - sh.length);
  return wh + " ".repeat(gap) + sh;
}

const IMPACT_ART = [
  String.raw`   ##              💥  /\   `,
  String.raw` ##XX##     BOOM!      /K8\  `,
  String.raw`(  🐳  )  >----<>  /____\ `,
  " ##XX##            |  ⚓  |",
  "  ~~~~             |______|",
];

const AFTERMATH_ART = [
  "                  💥        ",
  "  🐳  ~  ~  ~  ~  ~  ~  ⚓  ",
  "       Error: CrashLoopBackOff",
  "       whale-battle-x9z3q  0/1",
  "       Restarts: 47         ",
];

type ApplyStep = { id: string; text: string; color: string };

const applySteps: ApplyStep[] = [
  { id: "a0", text: "namespace/portfolio created",                     color: "text-term-green" },
  { id: "a1", text: "deployment.apps/portfolio-web created",           color: "text-term-green" },
  { id: "a2", text: "service/portfolio-svc created",                   color: "text-term-green" },
  { id: "a3", text: "ingress.networking.k8s.io/portfolio-ing created", color: "text-term-green" },
  { id: "a4", text: "horizontalpodautoscaler/portfolio-hpa created",   color: "text-term-green" },
  { id: "a5", text: "configmap/portfolio-config created",              color: "text-term-green" },
];

export function KubectlApplyOutput() {
  const { lang } = useLanguage();
  const [phase,     setPhase]     = useState<"deploy" | "whale" | "impact" | "aftermath" | "done">("deploy");
  const [frameIdx,  setFrameIdx]  = useState(0);
  const [steps,     setSteps]     = useState<ApplyStep[]>([]);
  const [cancelled, setCancelled] = useState(false);
  const stepRef      = useRef(0);
  const cancelledRef = useRef(false);

  // Lock terminal for the whole animation
  useEffect(() => {
    lock();
    return () => unlock();
  }, []);

  useEffect(() => {
    const onCancel = () => {
      cancelledRef.current = true;
      setCancelled(true);
      unlock();
    };
    globalThis.addEventListener("terminal:cancel", onCancel);
    return () => globalThis.removeEventListener("terminal:cancel", onCancel);
  }, []);

  // Phase 1: show apply steps
  useEffect(() => {
    if (phase !== "deploy") return;
    const t = setInterval(() => {
      if (cancelledRef.current) { clearInterval(t); return; }
      const item = applySteps[stepRef.current];
      if (item) {
        stepRef.current += 1;
        setSteps((p) => [...p, item]);
      } else {
        clearInterval(t);
        setPhase("whale");
      }
    }, 600);
    return () => clearInterval(t);
  }, [phase]);

  // Phase 2: animate whale approaching
  useEffect(() => {
    if (phase !== "whale" || cancelledRef.current) return;
    setFrameIdx(0);
    const t = setInterval(() => {
      if (cancelledRef.current) { clearInterval(t); return; }
      setFrameIdx((f: number) => {
        const next = f + 1;
        if (next >= WHALE_FRAMES.length) {
          clearInterval(t);
          setPhase("impact");
          return f;
        }
        return next;
      });
    }, 220);
    return () => clearInterval(t);
  }, [phase]);

  // Phase 3: impact pause → aftermath
  useEffect(() => {
    if (phase !== "impact" || cancelledRef.current) return;
    const t = setTimeout(() => setPhase("aftermath"), 900);
    return () => clearTimeout(t);
  }, [phase]);

  // Phase 4: aftermath → done
  useEffect(() => {
    if (phase !== "aftermath" || cancelledRef.current) return;
    const t = setTimeout(() => {
      setPhase("done");
      globalThis.dispatchEvent(new CustomEvent("terminal:unlock"));
    }, 2500);
    return () => clearTimeout(t);
  }, [phase]);

  const col = WHALE_FRAMES[frameIdx]?.[0] ?? 44;

  return (
    <div className="text-xs font-mono space-y-1">
      <p className="text-term-green text-sm">$ kubectl apply -f k8s/</p>

      {steps.map((s) => (
        <p key={s.id} className={s.color}>{s.text}</p>
      ))}

      {cancelled && (
        <p className="text-term-red font-bold mt-1">^C</p>
      )}

      {!cancelled && (phase === "whale" || phase === "impact" || phase === "aftermath") && (
        <div className="border border-term-border rounded bg-term-bg-secondary p-2 mt-1 space-y-0">
          <p className="text-term-muted text-xs mb-1">
            {lang === "pt" ? "# detectando conflito de orquestração..." : "# detecting orchestration conflict..."}
          </p>

          {phase === "whale" && (
            <div className="text-term-blue font-mono leading-tight">
              {[0,1,2,3,4].map((l) => (
                <p key={l} className="whitespace-pre">{buildWhaleLine(col, l)}</p>
              ))}
              <p className="text-term-muted mt-1">{"~".repeat(SCENE_W)}</p>
            </div>
          )}

          {phase === "impact" && (
            <div className="text-term-blue font-mono leading-tight">
              {IMPACT_ART.map((ln) => <p key={ln} className="whitespace-pre">{ln}</p>)}
              <p className="text-term-muted mt-1">{"~".repeat(SCENE_W)}</p>
            </div>
          )}

          {phase === "aftermath" && (
            <div className="font-mono leading-tight">
              {AFTERMATH_ART.map((ln) => (
                <p key={ln} className={ln.startsWith("       Error") || ln.startsWith("       whale") || ln.startsWith("       Restarts") ? "text-term-red" : "text-term-cyan"}>{ln}</p>
              ))}
              <p className="text-term-muted mt-1">{"~".repeat(SCENE_W)}</p>
            </div>
          )}
        </div>
      )}

      {phase === "done" && !cancelled && (
        <div className="border-t border-term-border pt-2 space-y-1">
          <p className="text-term-green font-semibold">
            ✔ {lang === "pt" ? "Deploy concluído (com... incidentes)" : "Deploy complete (with... incidents)"}
          </p>
          <p className="text-term-muted">
            {lang === "pt"
              ? "Use kubectl get pods --all-namespaces para inspecionar"
              : "Use kubectl get pods --all-namespaces to inspect"}
          </p>
          <p className="text-term-red text-xs">
            Warning: whale-battle-x9z3q está em CrashLoopBackOff (47 restarts).
            A baleia do Docker não gostou do Kubernetes. 🐳💥⛵
          </p>
        </div>
      )}
    </div>
  );
}


// ─── terraform init (matrix rain + provisioning) ─────────────────────────────

type TfInitLine = { id: string; text: string; color: string };

const tfInitMessages: TfInitLine[] = [
  { id: "t00", text: "Initializing the backend...",                                    color: "text-term-text"  },
  { id: "t01", text: "  ✔ Backend initialized (s3://joao-tfstate/portfolio.tfstate)", color: "text-term-green" },
  { id: "t02", text: "",                                                               color: "text-term-muted" },
  { id: "t03", text: "Initializing provider plugins...",                               color: "text-term-text"  },
  { id: "t04", text: '  - Finding hashicorp/aws versions matching "~> 5.0"...',       color: "text-term-muted" },
  { id: "t05", text: '  - Finding hashicorp/random versions matching "~> 3.5"...',    color: "text-term-muted" },
  { id: "t06", text: "  - Installing hashicorp/aws v5.31.0...",                       color: "text-term-blue"  },
  { id: "t07", text: "  ✔ Installed hashicorp/aws v5.31.0 (signed by HashiCorp)",    color: "text-term-green" },
  { id: "t08", text: "  - Installing hashicorp/random v3.6.0...",                     color: "text-term-blue"  },
  { id: "t09", text: "  ✔ Installed hashicorp/random v3.6.0 (signed by HashiCorp)",  color: "text-term-green" },
  { id: "t10", text: "",                                                               color: "text-term-muted" },
  { id: "t11", text: "Terraform has been successfully initialized!",                   color: "text-term-green" },
  { id: "t12", text: "",                                                               color: "text-term-muted" },
  { id: "t13", text: "  You may now begin working with Terraform. Try running",       color: "text-term-muted" },
  { id: "t14", text: '  "terraform plan" to see any changes required.',               color: "text-term-muted" },
];

function scheduleRain() {
  setTimeout(() => {
    globalThis.dispatchEvent(new CustomEvent("portfolio:navigate", { detail: { section: "" } }));
    setTimeout(() => globalThis.dispatchEvent(new CustomEvent("terraform:rain")), 400);
  }, 800);
}

export function TerraformInitOutput() {
  const { lang } = useLanguage();
  const [shown,     setShown]     = useState<TfInitLine[]>([]);
  const [done,      setDone]      = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const idxRef      = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    lock();
    return () => unlock();
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const item = tfInitMessages[idxRef.current];
      if (item) {
        idxRef.current += 1;
        setShown((p) => [...p, item]);
      } else {
        clearInterval(intervalRef.current!);
        setDone(true);
        unlock();
        scheduleRain();
      }
    }, 650);
    return () => clearInterval(intervalRef.current!);
  }, []);

  useCancelHandler(intervalRef, setCancelled);

  return (
    <div className="text-xs font-mono space-y-0.5">
      <p className="text-term-green text-sm mb-1">$ terraform init</p>

      {shown.map((line) => (
        <p key={line.id} className={line.color || "text-term-muted"}>{line.text || "\u00a0"}</p>
      ))}

      {cancelled && (
        <p className="text-term-red font-bold mt-1">^C</p>
      )}

      {done && !cancelled && (
        <div className="border-t border-term-border pt-2 mt-1 space-y-1">
          <p className="text-term-purple font-semibold">
            ⛈ {lang === "pt"
              ? "Infraestrutura inicializada. Verificando ambiente..."
              : "Infrastructure initialized. Checking environment..."}
          </p>
          <p className="text-term-muted text-xs">
            {lang === "pt"
              ? "Um efeito colateral foi detectado no ambiente de produção..."
              : "A side effect was detected in the production environment..."}
          </p>
        </div>
      )}
    </div>
  );
}
