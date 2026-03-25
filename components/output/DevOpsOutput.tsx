"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { i18n } from "@/data/i18n";

const dockerContainers = [
  { id: "a1b2c3d4", image: "nginx:1.25-alpine",     status: "Up 2 hours",  ports: "0.0.0.0:80->80/tcp",     name: "nginx-proxy"  },
  { id: "b2c3d4e5", image: "node:20-alpine",         status: "Up 3 hours",  ports: "0.0.0.0:3000->3000/tcp", name: "api-service"  },
  { id: "c3d4e5f6", image: "postgres:16",             status: "Up 2 days",   ports: "5432/tcp",               name: "postgres-db"  },
  { id: "d4e5f6a1", image: "redis:7.2-alpine",       status: "Up 2 days",   ports: "6379/tcp",               name: "redis-cache"  },
  { id: "e5f6a1b2", image: "prom/prometheus:v2.48",  status: "Up 5 days",   ports: "0.0.0.0:9090->9090/tcp", name: "prometheus"   },
  { id: "f6a1b2c3", image: "grafana/grafana:10.2",   status: "Up 5 days",   ports: "0.0.0.0:3001->3000/tcp", name: "grafana"      },
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
                <td className="pr-4 text-term-yellow">{c.ports}</td>
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
                <td className="text-term-yellow">{img.size}</td>
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


const kubePods = [
  { ns: "production",  name: "api-deploy-7d9f8b-xk2lp",    ready: "1/1", status: "Running", restarts: 0,  age: "2d5h" },
  { ns: "production",  name: "api-deploy-7d9f8b-mn3qr",    ready: "1/1", status: "Running", restarts: 0,  age: "2d5h" },
  { ns: "production",  name: "nginx-ingress-5c8d9f-p4wvz", ready: "1/1", status: "Running", restarts: 0,  age: "7d"   },
  { ns: "production",  name: "postgres-statefulset-0",     ready: "1/1", status: "Running", restarts: 0,  age: "14d"  },
  { ns: "production",  name: "redis-statefulset-0",        ready: "1/1", status: "Running", restarts: 0,  age: "14d"  },
  { ns: "monitoring",  name: "prometheus-stack-0",         ready: "1/1", status: "Running", restarts: 1,  age: "30d"  },
  { ns: "monitoring",  name: "grafana-7b8c9d-r5tzx",       ready: "1/1", status: "Running", restarts: 0,  age: "30d"  },
  { ns: "kube-system", name: "coredns-5d78c-l8rqm",        ready: "2/2", status: "Running", restarts: 0,  age: "45d"  },
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
                <td className={`pr-4 ${pod.ns === "production" ? "text-term-blue" : pod.ns === "monitoring" ? "text-term-purple" : "text-term-muted"}`}>
                  {pod.ns}
                </td>
                <td className="pr-4 text-term-text">{pod.name}</td>
                <td className="pr-4 text-term-green">{pod.ready}</td>
                <td className={`pr-4 ${pod.status === "Running" ? "text-term-green" : "text-term-red"}`}>
                  {pod.status}
                </td>
                <td className={`pr-4 ${pod.restarts > 0 ? "text-term-yellow" : "text-term-muted"}`}>
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
                  {res.action === "add" ? "created" : res.action === "change" ? "updated in-place" : "destroyed"}
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
                  <span className="text-term-yellow">{attr.value}</span>
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
          <span className="text-term-yellow">{changes} to change</span>
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
        <span className="text-term-yellow">0.38</span>
        <span className="text-term-muted">, </span>
        <span className="text-term-yellow">0.31</span>
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
          <span className="text-term-yellow">█████████░░░░░░░░░░░</span>
          <span className="text-term-muted"> 48%  (48GB / 100GB)</span>
        </p>
      </div>
    </div>
  );
}
