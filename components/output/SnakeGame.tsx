"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const CELL = 16;
const COLS = 22;
const ROWS = 16;
const W = COLS * CELL;
const H = ROWS * CELL;

type Point = { x: number; y: number };
type Dir   = { x: number; y: number };

function randFood(snake: Point[]): Point {
  let p: Point;
  do {
    p = {
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random() * ROWS),
    };
  } while (snake.some((s) => s.x === p.x && s.y === p.y));
  return p;
}

const initSnake: Point[] = [
  { x: 11, y: 8 },
  { x: 10, y: 8 },
  { x: 9,  y: 8 },
];

function makeState() {
  return {
    snake:    [...initSnake.map((p) => ({ ...p }))],
    dir:      { x: 1, y: 0 } as Dir,
    nextDir:  { x: 1, y: 0 } as Dir,
    food:     randFood(initSnake),
    score:    0,
    alive:    true,
    started:  false,
  };
}

export function SnakeGame() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const stateRef    = useRef(makeState());
  const animRef     = useRef<number>(0);
  const lastTickRef = useRef<number>(0);

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

    const cs = getComputedStyle(document.documentElement);
    const bg2   = cs.getPropertyValue("--term-bg-secondary").trim()  || "#161b22";
    const green = cs.getPropertyValue("--term-green").trim()          || "#3fb950";
    const red   = cs.getPropertyValue("--term-red").trim()            || "#f85149";
    const muted = cs.getPropertyValue("--term-text-muted").trim()     || "#8b949e";
    const bg    = cs.getPropertyValue("--term-bg").trim()             || "#0d1117";
    const border = cs.getPropertyValue("--term-border").trim()        || "#30363d";

    // Background
    ctx.fillStyle = bg2;
    ctx.fillRect(0, 0, W, H);

    // Grid dots
    ctx.fillStyle = border;
    for (let x = 0; x < COLS; x++) {
      for (let y = 0; y < ROWS; y++) {
        ctx.fillRect(x * CELL + CELL / 2 - 1, y * CELL + CELL / 2 - 1, 2, 2);
      }
    }

    // Food (red circle)
    ctx.fillStyle = red;
    ctx.beginPath();
    ctx.arc(s.food.x * CELL + CELL / 2, s.food.y * CELL + CELL / 2, CELL / 2 - 2, 0, Math.PI * 2);
    ctx.fill();

    // Snake
    s.snake.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? green : (i % 2 === 0 ? green + "dd" : green + "99");
      const pad = i === 0 ? 1 : 2;
      ctx.beginPath();
      (ctx as CanvasRenderingContext2D & { roundRect: (...a: unknown[]) => void }).roundRect?.(
        seg.x * CELL + pad, seg.y * CELL + pad,
        CELL - pad * 2, CELL - pad * 2, 3,
      );
      ctx.fill();
    });

    // Game Over overlay
    if (!s.alive) {
      ctx.fillStyle = "rgba(0,0,0,0.72)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = red;
      ctx.font = "bold 18px monospace";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", W / 2, H / 2 - 16);
      ctx.fillStyle = muted;
      ctx.font = "12px monospace";
      ctx.fillText(
        lang === "pt" ? `Pontuação: ${s.score}` : `Score: ${s.score}`,
        W / 2, H / 2 + 6,
      );
      ctx.fillText(
        lang === "pt" ? "Pressione R para reiniciar" : "Press R to restart",
        W / 2, H / 2 + 24,
      );
    }

    // Start screen overlay
    if (!s.started && s.alive) {
      ctx.fillStyle = "rgba(0,0,0,0.60)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = green;
      ctx.font = "bold 15px monospace";
      ctx.textAlign = "center";
      ctx.fillText(
        lang === "pt" ? "COBRA CONTAINER" : "CONTAINER SNAKE",
        W / 2, H / 2 - 14,
      );
      ctx.fillStyle = muted;
      ctx.font = "11px monospace";
      ctx.fillText(
        lang === "pt" ? "Pressione qualquer seta para começar" : "Press any arrow key to start",
        W / 2, H / 2 + 8,
      );
      ctx.fillText(
        lang === "pt" ? "Clique no canvas se precisar focar" : "Click canvas if you need to focus",
        W / 2, H / 2 + 24,
      );
    }
  }, [lang]);

  const tick = useCallback(
    (now: number) => {
      const s = stateRef.current;

      if (!s.alive || !s.started) {
        draw();
        animRef.current = requestAnimationFrame(tick);
        return;
      }

      // Speed increases with score
      const speed = Math.max(80, 200 - s.score * 4);
      if (now - lastTickRef.current < speed) {
        draw();
        animRef.current = requestAnimationFrame(tick);
        return;
      }
      lastTickRef.current = now;

      s.dir = { ...s.nextDir };
      const head = { x: s.snake[0].x + s.dir.x, y: s.snake[0].y + s.dir.y };

      if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
        s.alive = false;
        setAlive(false);
        draw();
        animRef.current = requestAnimationFrame(tick);
        return;
      }

      if (s.snake.some((seg) => seg.x === head.x && seg.y === head.y)) {
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

      if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(k)) {
        e.preventDefault();
        e.stopPropagation();
      }

      if (!s.alive) {
        if (k === "r" || k === "R") restart();
        return;
      }

      if (!s.started && ["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(k)) {
        s.started = true;
        setStarted(true);
      }

      if (k === "ArrowUp"    && s.dir.y !== 1)  s.nextDir = { x: 0,  y: -1 };
      if (k === "ArrowDown"  && s.dir.y !== -1) s.nextDir = { x: 0,  y: 1  };
      if (k === "ArrowLeft"  && s.dir.x !== 1)  s.nextDir = { x: -1, y: 0  };
      if (k === "ArrowRight" && s.dir.x !== -1) s.nextDir = { x: 1,  y: 0  };
    };

    canvas.addEventListener("keydown", onKey);
    animRef.current = requestAnimationFrame(tick);

    return () => {
      canvas.removeEventListener("keydown", onKey);
      cancelAnimationFrame(animRef.current);
    };
  }, [tick, restart]);

  return (
    <div className="text-xs font-mono space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-term-green">$ snake</span>
        <span className="text-term-muted">
          {lang === "pt" ? "Pontuação:" : "Score:"}
          <span className="text-term-yellow font-bold ml-1">{score}</span>
        </span>
      </div>

      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        tabIndex={0}
        onClick={() => canvasRef.current?.focus()}
        className="outline-none border border-term-border rounded block cursor-none select-none"
      />

      {!alive && (
        <p className="text-term-muted text-xs">
          {lang === "pt"
            ? "Pressione R no canvas para jogar de novo"
            : "Press R on the canvas to play again"}
        </p>
      )}
      {alive && !started && (
        <p className="text-term-muted text-xs">
          {lang === "pt"
            ? "↑ ↓ ← → mover  ·  come a comida vermelha  ·  não bata nas paredes!"
            : "↑ ↓ ← → move  ·  eat the red food  ·  don't hit the walls!"}
        </p>
      )}
      {alive && started && (
        <p className="text-term-muted text-xs">
          {lang === "pt"
            ? "↑ ↓ ← → mover  ·  velocidade aumenta com a pontuação"
            : "↑ ↓ ← → move  ·  speed increases with score"}
        </p>
      )}
    </div>
  );
}
