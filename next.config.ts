import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/doom/:path*.wasm",
        headers: [
          { key: "Content-Type", value: "application/wasm" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "Cross-Origin-Opener-Policy",   value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy",  value: "require-corp" },
        ],
      },
    ];
  },
};

export default nextConfig;
