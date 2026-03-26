"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const CELL = 16;
const COLS = 22;
const ROWS = 16;
const W = COLS * CELL;
const H = ROWS * CELL;

const ARROWS = new Set(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]);

type Point = { x: number; y: number };
type Dir   = { x: number; y: number };

function randFood(snake: Point[]): Point {
  let p: Point;
  do {
    p = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (snake.some((s) => s.x === p.x && s.y === p.y));
  return p;
}

const initSnake: Point[] = [{ x: 11, y: 8 }, { x: 10, y: 8 }, { x: 9, y: 8 }];

function makeState() {
  return {
    snake:   [...initSnake.map((p) => ({ ...p }))],
    dir:     { x: 1, y: 0 } as Dir,
    nextDir: { x: 1, y: 0 } as Dir,
    food:    randFood(initSnake),
    score:   0,
    alive:   true,
    started: false,
  };
}

function isTouchDevice() {
  return typeof globalThis !== "undefined" &&
    "matchMedia" in globalThis &&
    (globalThis as typeof globalThis & { matchMedia: (q: string) => { matches: boolean } })
      .matchMedia("(pointer: coarse)").matches;
}

function applySwipe(s: ReturnType<typeof makeState>, dx: number, dy: number, setStarted: (v: boolean) => void) {
  if (!s.started) {
    s.started = true;
    setStarted(true);
  }
  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 0 && s.dir.x !== -1)     { s.nextDir = { x: 1,  y: 0 }; }
    else if (dx < 0 && s.dir.x !== 1) { s.nextDir = { x: -1, y: 0 }; }
  } else if (dy > 0 && s.dir.y !== -1) {
    s.nextDir = { x: 0, y: 1 };
  } else if (dy < 0 && s.dir.y !== 1) {
    s.nextDir = { x: 0, y: -1 };
  }
}

function segmentColor(green: string, i: number): string {
  if (i === 0)          return green;
  if (i % 2 === 0)      return `${green}dd`;
  return `${green}99`;
}

type DrawColors = { bg2: string; green: string; red: string; muted: string; border: string };

function readColors(): DrawColors {
  const cs = getComputedStyle(document.documentElement);
  return {
    bg2:    cs.getPropertyValue("--term-bg-secondary").trim() || "#161b22",
    green:  cs.getPropertyValue("--term-green").trim()        || "#3fb950",
    red:    cs.getPropertyValue("--term-red").trim()          || "#f85149",
    muted:  cs.getPropertyValue("--term-text-muted").trim()   || "#8b949e",
    border: cs.getPropertyValue("--term-border").trim()       || "#30363d",
  };
}

function drawGameOver(ctx: CanvasRenderingContext2D, score: number, touch: boolean, lang: string, red: string, muted: string) {
  ctx.fillStyle = "rgba(0,0,0,0.72)";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = red;
  ctx.font = "bold 18px monospace";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", W / 2, H / 2 - 16);
  ctx.fillStyle = muted;
  ctx.font = "12px monospace";
  const scoreLabel  = lang === "pt" ? `Pontuação: ${score}` : `Score: ${score}`;
  const restartPt   = touch ? "Toque para reiniciar" : "Pressione R para reiniciar";
  const restartEn   = touch ? "Tap to restart" : "Press R to restart";
  const restartLabel = lang === "pt" ? restartPt : restartEn;
  ctx.fillText(scoreLabel,   W / 2, H / 2 + 6);
  ctx.fillText(restartLabel, W / 2, H / 2 + 24);
}

function drawStartScreen(ctx: CanvasRenderingContext2D, touch: boolean, lang: string, green: string, muted: string) {
  ctx.fillStyle = "rgba(0,0,0,0.60)";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = green;
  ctx.font = "bold 15px monospace";
  ctx.textAlign = "center";
  const title  = lang === "pt" ? "COBRA CONTAINER" : "CONTAINER SNAKE";
  const hintPt = touch ? "Deslize para começar" : "Pressione qualquer seta para começar";
  const hintEn = touch ? "Swipe to start" : "Press any arrow key to start";
  const hint   = lang === "pt" ? hintPt : hintEn;
  ctx.fillText(title, W / 2, H / 2 - 14);
  ctx.fillStyle = muted;
  ctx.font = "11px monospace";
  ctx.fillText(hint, W / 2, H / 2 + 8);
}

export function SnakeGame() {
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const stateRef      = useRef(makeState());
  const animRef       = useRef<number>(0);
  const lastTickRef   = useRef<number>(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touch         = isTouchDevice();

  const [score,   setScore]   = useState(0);
  const [alive,   setAlive]   = useState(true);
  const [started, setStarted] = useState(false);
  const { lang } = useLanguage();

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const s = stateRef.current;
    const { bg2, green, red, muted, border } = readColors();

    ctx.fillStyle = bg2;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = border;
    for (let x = 0; x < COLS; x++) {
      for (let y = 0; y < ROWS; y++) {
        ctx.fillRect(x * CELL + CELL / 2 - 1, y * CELL + CELL / 2 - 1, 2, 2);
      }
    }

    ctx.fillStyle = red;
    ctx.beginPath();
    ctx.arc(s.food.x * CELL + CELL / 2, s.food.y * CELL + CELL / 2, CELL / 2 - 2, 0, Math.PI * 2);
    ctx.fill();

    s.snake.forEach((seg, i) => {
      ctx.fillStyle = segmentColor(green, i);
      const pad = i === 0 ? 1 : 2;
      ctx.beginPath();
      (ctx as CanvasRenderingContext2D & { roundRect: (...a: unknown[]) => void }).roundRect?.(
        seg.x * CELL + pad, seg.y * CELL + pad, CELL - pad * 2, CELL - pad * 2, 3,
      );
      ctx.fill();
    });

    if (!s.alive) {
      drawGameOver(ctx, s.score, touch, lang, red, muted);
      return;
    }
    if (!s.started) {
      drawStartScreen(ctx, touch, lang, green, muted);
    }
  }, [lang, touch]);

  const tick = useCallback(
    (now: number) => {
      const s = stateRef.current;
      if (!s.alive || !s.started) {
        draw();
        animRef.current = requestAnimationFrame(tick);
        return;
      }
      const speed = Math.max(80, 200 - s.score * 4);
      if (now - lastTickRef.current < speed) {
        draw();
        animRef.current = requestAnimationFrame(tick);
        return;
      }
      lastTickRef.current = now;
      s.dir = { ...s.nextDir };
      const head = { x: s.snake[0].x + s.dir.x, y: s.snake[0].y + s.dir.y };
      const dead = head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS
        || s.snake.some((seg) => seg.x === head.x && seg.y === head.y);
      if (dead) {
        s.alive = false;
        setAlive(false);
        draw();
        animRef.current = requestAnimationFrame(tick);
        return;
      }
      s.snake.unshift(head);
      if (head.x === s.food.x && head.y === s.food.y) {
        s.score += 10;
        setScore(s.score);
        s.food = randFood(s.snake);
      } else {
        s.snake.pop();
      }
      draw();
      animRef.current = requestAnimationFrame(tick);
    },
    [draw],
  );

  const restart = useCallback(() => {
    stateRef.current = makeState();
    setScore(0);
    setAlive(true);
    setStarted(false);
    canvasRef.current?.focus();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.focus();

    const onKey = (e: KeyboardEvent) => {
      const s = stateRef.current;
      const k = e.key;
      if (ARROWS.has(k)) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (!s.alive) {
        if (k === "r" || k === "R") { restart(); }
        return;
      }
      if (!s.started && ARROWS.has(k)) {
        s.started = true;
        setStarted(true);
      }
      if (k === "ArrowUp"    && s.dir.y !== 1)  { s.nextDir = { x: 0,  y: -1 }; }
      if (k === "ArrowDown"  && s.dir.y !== -1) { s.nextDir = { x: 0,  y: 1  }; }
      if (k === "ArrowLeft"  && s.dir.x !== 1)  { s.nextDir = { x: -1, y: 0  }; }
      if (k === "ArrowRight" && s.dir.x !== -1) { s.nextDir = { x: 1,  y: 0  }; }
    };

    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const t = e.touches[0];
      touchStartRef.current = { x: t.clientX, y: t.clientY };
    };

    const onTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      const s = stateRef.current;
      if (!s.alive) { restart(); return; }
      const start = touchStartRef.current;
      touchStartRef.current = null;
      if (!start) return;
      const t  = e.changedTouches[0];
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      if (Math.abs(dx) < 12 && Math.abs(dy) < 12) {
        if (!s.started) { s.started = true; setStarted(true); }
        return;
      }
      applySwipe(s, dx, dy, setStarted);
    };

    canvas.addEventListener("keydown",    onKey);
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchend",   onTouchEnd,   { passive: false });
    animRef.current = requestAnimationFrame(tick);

    return () => {
      canvas.removeEventListener("keydown",    onKey);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchend",   onTouchEnd);
      cancelAnimationFrame(animRef.current);
    };
  }, [tick, restart]);

  const moveHintPt    = touch ? "Deslize para mover" : "↑ ↓ ← → mover";
  const moveHintEn    = touch ? "Swipe to move" : "↑ ↓ ← → move";
  const moveHint      = lang === "pt" ? moveHintPt : moveHintEn;
  const restartHintPt = touch ? "Toque para jogar de novo" : "Pressione R no canvas para jogar de novo";
  const restartHintEn = touch ? "Tap to play again" : "Press R on the canvas to play again";
  const restartHint   = lang === "pt" ? restartHintPt : restartHintEn;
  const extraHintPt   = alive && !started ? "come a comida vermelha" : "velocidade aumenta com a pontuação";
  const extraHintEn   = alive && !started ? "eat the red food" : "speed increases with score";
  const extraHint     = lang === "pt" ? extraHintPt : extraHintEn;

  return (
    <div className="text-xs font-mono space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-term-green">$ snake</span>
        <span className="text-term-muted">
          {lang === "pt" ? "Pontuação:" : "Score:"}
          <span className="text-term-blue font-bold ml-1">{score}</span>
        </span>
      </div>

      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        tabIndex={0}
        onClick={() => canvasRef.current?.focus()}
        style={{ width: "100%", maxWidth: `${W}px`, height: "auto", touchAction: "none" }}
        className="outline-none border border-term-border rounded block cursor-none select-none"
      />

      {!alive && <p className="text-term-muted text-xs">{restartHint}</p>}
      {alive && (
        <p className="text-term-muted text-xs">{moveHint}{"  ·  "}{extraHint}</p>
      )}
    </div>
  );
}
