"use client";

import { useEffect, useState, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

// ─── Types ────────────────────────────────────────────────────────────────────

type PodStatus = "Pending" | "Running" | "CrashLoopBackOff" | "Terminating";

interface Pod {
  id: string;
  name: string;
  namespace: string;
  status: PodStatus;
  node: 0 | 1 | 2;
  restarts: number;
  isWhale?: true;
}

// ─── Initial cluster state ────────────────────────────────────────────────────

const INITIAL_PODS: Pod[] = [
  { id: "p0",  name: "coredns-5d78c-l8rqm",        namespace: "kube-system", status: "Running",           node: 0, restarts: 0  },
  { id: "p1",  name: "kube-proxy-n2xrp",            namespace: "kube-system", status: "Running",           node: 0, restarts: 0  },
  { id: "p2",  name: "portfolio-web-9f3a2b-k7xmn",  namespace: "production",  status: "Running",           node: 1, restarts: 0  },
  { id: "p3",  name: "api-deploy-7d9f8b-xk2lp",     namespace: "production",  status: "Running",           node: 1, restarts: 0  },
  { id: "p4",  name: "nginx-ingress-5c8d9f-p4wvz",  namespace: "production",  status: "Running",           node: 1, restarts: 0  },
  { id: "p5",  name: "whale-battle-x9z3q",           namespace: "kube-system", status: "CrashLoopBackOff", node: 1, restarts: 47, isWhale: true },
  { id: "p6",  name: "api-deploy-7d9f8b-mn3qr",     namespace: "production",  status: "Running",           node: 2, restarts: 0  },
  { id: "p7",  name: "redis-statefulset-0",          namespace: "production",  status: "Running",           node: 2, restarts: 0  },
  { id: "p8",  name: "postgres-statefulset-0",       namespace: "production",  status: "Running",           node: 2, restarts: 0  },
];

const NODES = [
  { name: "node-master-01", role: "control-plane" },
  { name: "node-worker-01", role: "worker"         },
  { name: "node-worker-02", role: "worker"         },
];

const WHALE_LOGS = [
  "time=\"2026-03-25T18:42:01Z\" level=error msg=\"Failed to establish dominance over Kubernetes\"",
  "time=\"2026-03-25T18:42:01Z\" level=error msg=\"orca: cannot override scheduler, permission denied\"",
  "time=\"2026-03-25T18:42:02Z\" level=warn  msg=\"Attempting to board vessel /k8s/ship... access denied\"",
  "time=\"2026-03-25T18:42:02Z\" level=error msg=\"collision with HelmChart detected, container crashing\"",
  "time=\"2026-03-25T18:42:03Z\" level=info  msg=\"Sending distress signal: 🐳 → ⚓\"",
  "time=\"2026-03-25T18:42:03Z\" level=fatal msg=\"panic: runtime error: index out of bounds [ship]\"",
  "time=\"2026-03-25T18:42:03Z\" level=info  msg=\"Container exited with code 137 (OOMKilled by Helm)\"",
  "time=\"2026-03-25T18:42:04Z\" level=info  msg=\"Back-off restarting failed container... (47th attempt)\"",
];

const DESCRIBE_LINES = [
  { label: "Name:",        value: "whale-battle-x9z3q",       color: "text-term-text"   },
  { label: "Namespace:",   value: "kube-system",              color: "text-term-blue"   },
  { label: "Node:",        value: "node-worker-01",           color: "text-term-text"   },
  { label: "Status:",      value: "CrashLoopBackOff",         color: "text-term-red"    },
  { label: "Restarts:",    value: "47",                       color: "text-term-blue" },
  { label: "Image:",       value: "docker.io/whale:latest",   color: "text-term-blue"   },
  { label: "Reason:",      value: "OOMKilled by Helm",        color: "text-term-red"    },
  { label: "Message:",     value: "Docker whale tried to board the K8s ship. It did not go well.", color: "text-term-muted" },
];

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status, pulse }: { status: PodStatus; pulse?: boolean }) {
  const colors: Record<PodStatus, string> = {
    Running:           "text-term-green",
    Pending:           "text-term-blue",
    CrashLoopBackOff:  "text-term-red",
    Terminating:       "text-term-muted",
  };
  const dots: Record<PodStatus, string> = {
    Running:           "🟢",
    Pending:           "🟡",
    CrashLoopBackOff:  "🔴",
    Terminating:       "⚪",
  };
  return (
    <span className={`${colors[status]} text-xs font-mono ${pulse ? "animate-pulse" : ""}`}>
      {dots[status]} {status}
    </span>
  );
}

// ─── Main overlay ─────────────────────────────────────────────────────────────

interface KubeClusterOverlayProps {
  visible: boolean;
  onClose: () => void;
}

type Panel = "none" | "logs" | "describe";

export default function KubeClusterOverlay({ visible, onClose }: KubeClusterOverlayProps) {
  const { lang } = useLanguage();
  const [pods,      setPods]     = useState<Pod[]>([]);
  const [panel,     setPanel]    = useState<Panel>("none");
  const [deleting,  setDeleting] = useState(false);
  const [deleted,   setDeleted]  = useState(false);
  const [events,    setEvents]   = useState<string[]>([]);

  // Animate pods appearing on mount
  useEffect(() => {
    if (!visible) return;
    setPods([]);
    setPanel("none");
    setDeleting(false);
    setDeleted(false);
    setEvents([
      lang === "pt"
        ? "2m atrás: Back-off reiniciando container whale-battle (47 tentativas)"
        : "2m ago: Back-off restarting failed container whale-battle (47 attempts)",
      lang === "pt"
        ? "5m atrás: Pulling image docker.io/whale:latest"
        : "5m ago: Pulling image docker.io/whale:latest",
      lang === "pt"
        ? "5m atrás: Colisão com HelmChart detectada — OOMKilled"
        : "5m ago: Collision with HelmChart detected — OOMKilled",
    ]);

    let i = 0;
    const t = setInterval(() => {
      const pod = INITIAL_PODS[i];
      if (pod) {
        setPods((p) => [...p, pod]);
        i += 1;
      } else {
        clearInterval(t);
      }
    }, 120);
    return () => clearInterval(t);
  }, [visible, lang]);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, onClose]);

  const whale = pods.find((p) => p.isWhale);

  const handleForceDelete = useCallback(() => {
    if (deleting || deleted) return;
    setDeleting(true);
    setPanel("none");

    // Terminating
    setPods((prev) => prev.map((p) => p.isWhale ? { ...p, status: "Terminating" } : p));
    setEvents((e) => [
      lang === "pt" ? "agora: pod/whale-battle-x9z3q Terminando..." : "now: pod/whale-battle-x9z3q Terminating...",
      ...e,
    ]);

    // Removed
    setTimeout(() => {
      setPods((prev) => prev.filter((p) => !p.isWhale));
      setEvents((e) => [
        lang === "pt" ? "agora: pod/whale-battle-x9z3q deletado" : "now: pod/whale-battle-x9z3q deleted",
        ...e,
      ]);
    }, 1200);

    // Recreated as Pending
    setTimeout(() => {
      const newId = `whale-${Date.now()}`;
      setPods((prev) => [
        ...prev,
        { id: newId, name: "whale-battle-x9z3q", namespace: "kube-system",
          status: "Pending", node: 1, restarts: 0, isWhale: true },
      ]);
      setEvents((e) => [
        lang === "pt" ? "agora: pod/whale-battle-x9z3q criado (nova tentativa...)" : "now: pod/whale-battle-x9z3q created (new attempt...)",
        ...e,
      ]);
    }, 2400);

    // Running
    setTimeout(() => {
      setPods((prev) => prev.map((p) => p.isWhale ? { ...p, status: "Running", restarts: 0 } : p));
      setDeleted(true);
      setDeleting(false);
      setEvents((e) => [
        lang === "pt" ? "agora: 🎉 whale-battle-x9z3q Running! A baleia fez as pazes com o K8s." : "now: 🎉 whale-battle-x9z3q Running! Whale made peace with K8s.",
        ...e,
      ]);
    }, 4000);
  }, [deleting, deleted, lang]);

  if (!visible) return null;

  const running = pods.filter((p) => p.status === "Running").length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/85 overflow-auto py-6 px-4">
      <div className="w-full max-w-4xl bg-term-bg border border-term-border rounded-lg shadow-2xl font-mono text-xs">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-term-border px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="text-term-blue text-sm font-bold">☸ Kubernetes Cluster</span>
            <span className="text-term-muted">portfolio-cluster</span>
            <span className="text-term-green">● Nodes: 3/3</span>
            <span className={running === pods.length ? "text-term-green" : "text-term-blue"}>
              ● Pods: {running}/{pods.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-term-muted hover:text-term-text border border-term-border px-2 py-0.5 rounded"
          >
            ESC {lang === "pt" ? "fechar" : "close"}
          </button>
        </div>

        {/* Nodes grid */}
        <div className="grid grid-cols-3 gap-3 p-4">
          {NODES.map((node, ni) => {
            const nodePods = pods.filter((p) => p.node === ni);
            return (
              <div key={node.name} className="border border-term-border rounded p-3 space-y-2 bg-term-bg-secondary">
                <div className="border-b border-term-border pb-1 mb-2">
                  <p className="text-term-blue font-semibold">{node.name}</p>
                  <p className="text-term-muted text-xs">{node.role} · v1.28.4</p>
                </div>
                {nodePods.length === 0 && (
                  <p className="text-term-muted italic text-xs">no pods scheduled</p>
                )}
                {nodePods.map((pod) => (
                  <div
                    key={pod.id}
                    onClick={() => pod.isWhale && setPanel(panel === "none" ? "describe" : "none")}
                    className={`rounded px-2 py-1 border transition-all ${
                      pod.isWhale
                        ? "border-term-red bg-term-red/10 cursor-pointer hover:bg-term-red/20"
                        : "border-term-border"
                    }`}
                  >
                    <p className={`truncate ${pod.isWhale ? "text-term-red" : "text-term-text"}`}>
                      {pod.isWhale ? "🐳 " : ""}{pod.name.split("-").slice(-1)[0]}…
                    </p>
                    <StatusBadge status={pod.status} pulse={pod.status === "CrashLoopBackOff" || pod.status === "Pending"} />
                    {pod.restarts > 0 && (
                      <span className="text-term-blue ml-2">{pod.restarts}↺</span>
                    )}
                    <p className="text-term-muted text-xs truncate">{pod.namespace}</p>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Whale pod alert */}
        {whale && (
          <div className="mx-4 mb-3 border border-term-red/50 rounded bg-term-red/5 px-3 py-2 space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-term-red font-semibold">
                ⚠ whale-battle-x9z3q
                <span className="text-term-muted font-normal ml-2">kube-system</span>
                <StatusBadge status={whale.status} pulse />
                {whale.restarts > 0 && <span className="text-term-blue ml-2">{whale.restarts}↺</span>}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleForceDelete}
                  disabled={deleting || deleted}
                  className="border border-term-red text-term-red px-2 py-0.5 rounded hover:bg-term-red/20 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  {lang === "pt" ? "Force Delete" : "Force Delete"}
                </button>
                <button
                  onClick={() => setPanel(panel === "logs" ? "none" : "logs")}
                  className="border border-term-border text-term-text px-2 py-0.5 rounded hover:border-term-blue transition-colors"
                >
                  {lang === "pt" ? "Ver Logs" : "View Logs"}
                </button>
                <button
                  onClick={() => setPanel(panel === "describe" ? "none" : "describe")}
                  className="border border-term-border text-term-text px-2 py-0.5 rounded hover:border-term-blue transition-colors"
                >
                  Describe
                </button>
              </div>
            </div>

            {deleted && (
              <p className="text-term-green text-xs">
                🎉 {lang === "pt" ? "Baleia reconciliada com o Kubernetes. Pod saudável!" : "Whale reconciled with Kubernetes. Pod is healthy!"}
              </p>
            )}
          </div>
        )}

        {/* Logs panel */}
        {panel === "logs" && (
          <div className="mx-4 mb-3 border border-term-border rounded bg-term-bg-secondary p-3 space-y-1">
            <p className="text-term-muted mb-2">
              $ kubectl logs whale-battle-x9z3q -n kube-system
            </p>
            {WHALE_LOGS.map((line) => (
              <p key={line} className="text-term-red text-xs break-all">{line}</p>
            ))}
          </div>
        )}

        {/* Describe panel */}
        {panel === "describe" && (
          <div className="mx-4 mb-3 border border-term-border rounded bg-term-bg-secondary p-3 space-y-1">
            <p className="text-term-muted mb-2">
              $ kubectl describe pod whale-battle-x9z3q -n kube-system
            </p>
            {DESCRIBE_LINES.map(({ label, value, color }) => (
              <p key={label}>
                <span className="text-term-muted w-16 inline-block">{label}</span>
                <span className={color}>{value}</span>
              </p>
            ))}
          </div>
        )}

        {/* Events */}
        <div className="border-t border-term-border mx-4 mb-4 pt-3">
          <p className="text-term-muted mb-1">Events:</p>
          {events.map((ev) => (
            <p key={ev} className="text-term-muted text-xs">› {ev}</p>
          ))}
        </div>

        {/* Footer hint */}
        <div className="border-t border-term-border px-4 py-2 text-term-muted text-xs">
          {lang === "pt"
            ? "Clique em um pod vermelho para inspecionar · Force Delete para reiniciar a baleia"
            : "Click a red pod to inspect · Force Delete to restart the whale"}
        </div>
      </div>
    </div>
  );
}
