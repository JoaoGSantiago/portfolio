"use client";

import { useEffect, useRef, useState } from "react";

interface Drop {
  x: number;
  y: number;
  speed: number;
  length: number;
  opacity: number;
  char: string;
}

const TF_CHARS = "01{}[]=><+#$@!%^&*terraform|/\\~";

function makeDrops(count: number, w: number): Drop[] {
  return Array.from({ length: count }, () => ({
    x:       Math.random() * w,
    y:       Math.random() * -600,
    speed:   Math.random() * 3 + 1.5,
    length:  Math.floor(Math.random() * 16) + 6,
    opacity: Math.random() * 0.6 + 0.2,
    char:    TF_CHARS[Math.floor(Math.random() * TF_CHARS.length)],
  }));
}

export function RainEffect({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropsRef  = useRef<Drop[]>([]);
  const animRef   = useRef<number>(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) return;
    setVisible(true);
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !visible) return;

    const w = canvas.offsetWidth  || window.innerWidth;
    const h = canvas.offsetHeight || window.innerHeight;
    canvas.width  = w;
    canvas.height = h;

    const count = Math.floor(w / 18);
    dropsRef.current = makeDrops(count, w);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      const drops = dropsRef.current;

      for (const drop of drops) {
        const charH = 14;
        for (let i = 0; i < drop.length; i++) {
          const alpha = (drop.opacity * (i + 1)) / drop.length;
          const isHead = i === drop.length - 1;
          ctx.fillStyle = isHead
            ? `rgba(160, 130, 255, ${alpha})`
            : `rgba(100, 80, 180, ${alpha * 0.7})`;
          ctx.font = "12px monospace";
          ctx.fillText(drop.char, drop.x, drop.y - i * charH);
        }
        drop.y += drop.speed;
        // Occasionally change char
        if (Math.random() < 0.04) {
          drop.char = TF_CHARS[Math.floor(Math.random() * TF_CHARS.length)];
        }
        // Reset when off screen
        if (drop.y > h + drop.length * 14) {
          drop.y = -drop.length * 14;
          drop.x = Math.random() * w;
        }
      }

      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [visible]);

  if (!visible) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 w-full h-full"
    />
  );
}
