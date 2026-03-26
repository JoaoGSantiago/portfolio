import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "João Gustavo | DevOps & Cloud";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0d1117",
          padding: "64px 80px",
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(#30363d 1px, transparent 1px), linear-gradient(90deg, #30363d 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            opacity: 0.06,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", marginBottom: "24px" }}>
          <span style={{ color: "#3fb950", fontSize: "18px", marginRight: "10px" }}>$</span>
          <span style={{ color: "#8b949e", fontSize: "18px" }}>whoami</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginBottom: "28px" }}>
          <span style={{ color: "#c9d1d9", fontSize: "64px", fontWeight: "bold", lineHeight: 1.1 }}>
            João Gustavo
          </span>
          <span style={{ color: "#3fb950", fontSize: "64px", fontWeight: "bold", lineHeight: 1.1 }}>
            Santiago de Lima
          </span>
        </div>

        <div style={{ width: "4px", height: "80px", backgroundColor: "#30363d", marginBottom: "28px" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "40px" }}>
          <span style={{ color: "#c9d1d9", fontSize: "24px" }}>DevOps · Cloud · Infrastructure · SRE</span>
          <span style={{ color: "#8b949e", fontSize: "18px" }}>
            Docker · Kubernetes · AWS · Terraform · Prometheus · Grafana
          </span>
          <span style={{ color: "#30363d", fontSize: "14px", marginTop: "4px" }}>
            kernel: Linux · shell: /bin/bash · Arapiraca-AL, Brazil
          </span>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          {["AWS Certified Cloud Practitioner", "DevSecOps Bootcamp · Compass UOL"].map((label) => (
            <div
              key={label}
              style={{
                border: "1px solid #30363d",
                color: "#8b949e",
                fontSize: "13px",
                padding: "6px 14px",
              }}
            >
              {label}
            </div>
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "80px",
            color: "#3fb950",
            fontSize: "16px",
          }}
        >
          joaogsantiago.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
