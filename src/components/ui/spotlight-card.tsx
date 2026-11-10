// components/ui/spotlight-card.tsx
// Card com borda que brilha seguindo o cursor (spotlight). Adicionado "tone" para funcionar no tema escuro do site.
import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

interface GlowCardProps {
  children?: ReactNode;
  className?: string;
  glowColor?: "brand" | "blue" | "purple";
  tone?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  width?: string | number;
  height?: string | number;
  /** true: tamanho, espaçamento e padding vêm só do className */
  customSize?: boolean;
}

const glowColorMap = {
  brand: { base: 187, spread: 80 },  // ciano → roxo, acompanhando a posição horizontal do cursor
  blue: { base: 200, spread: 40 },
  purple: { base: 245, spread: 30 },
};

const toneMap = {
  light: { backdrop: "rgba(241,244,246,0.92)", border: "rgba(12,12,12,0.06)", fill: 0.08, shadow: "shadow-[0_12px_24px_rgba(10,26,47,0.08)]" },
  dark: { backdrop: "rgba(22,22,26,0.85)", border: "rgba(215,226,234,0.08)", fill: 0.1, shadow: "shadow-[0_12px_24px_rgba(0,0,0,0.35)]" },
};

const sizeMap = { sm: "w-48 h-64", md: "w-64 h-80", lg: "w-80 h-96" };

const GLOW_CSS = `
[data-glow]::before,[data-glow]::after{pointer-events:none;content:"";position:absolute;inset:calc(var(--border-size)*-1);border:var(--border-size) solid transparent;border-radius:calc(var(--radius)*1px);background-attachment:fixed;background-size:calc(100% + (2*var(--border-size))) calc(100% + (2*var(--border-size)));background-repeat:no-repeat;background-position:50% 50%;mask:linear-gradient(transparent,transparent),linear-gradient(white,white);mask-clip:padding-box,border-box;mask-composite:intersect}
[data-glow]::before{background-image:radial-gradient(calc(var(--spotlight-size)*.75) calc(var(--spotlight-size)*.75) at calc(var(--x,0)*1px) calc(var(--y,0)*1px),hsl(var(--hue,210) 100% 55% / 1),transparent 100%);filter:brightness(1.4)}
[data-glow]::after{background-image:radial-gradient(calc(var(--spotlight-size)*.5) calc(var(--spotlight-size)*.5) at calc(var(--x,0)*1px) calc(var(--y,0)*1px),hsl(0 100% 100% / .8),transparent 100%)}
[data-glow] [data-glow]{position:absolute;inset:0;opacity:var(--outer,1);border-radius:calc(var(--radius)*1px);filter:blur(calc(var(--border-size)*10));background:none;pointer-events:none;border:none}
[data-glow]>[data-glow]::before{inset:-10px;border-width:10px}
`;

let stylesInjected = false;

// Um único listener de ponteiro para todos os cards, aplicado uma vez por quadro (rAF).
// Telas de toque não têm cursor: nenhum listener e nenhum degradê "fixed" (que repinta a cada scroll no Android).
const HOVER = typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const cards = new Set<HTMLElement>();
let lastX = 0, lastY = 0, frame = 0, listening = false;
function flush() {
  frame = 0;
  const xp = (lastX / window.innerWidth).toFixed(2), yp = (lastY / window.innerHeight).toFixed(2);
  const x = lastX.toFixed(0), y = lastY.toFixed(0);
  cards.forEach((el) => {
    el.style.setProperty("--x", x);
    el.style.setProperty("--xp", xp);
    el.style.setProperty("--y", y);
    el.style.setProperty("--yp", yp);
  });
}
function onPointer(e: PointerEvent) {
  lastX = e.clientX; lastY = e.clientY;
  if (!frame) frame = requestAnimationFrame(flush);
}

export function GlowCard({
  children,
  className = "",
  glowColor = "brand",
  tone = "light",
  size = "md",
  width,
  height,
  customSize = false,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!stylesInjected) {
      const tag = document.createElement("style");
      tag.textContent = GLOW_CSS;
      document.head.appendChild(tag);
      stylesInjected = true;
    }
    const el = cardRef.current;
    if (!HOVER || !el) return;
    cards.add(el);
    if (!listening) { document.addEventListener("pointermove", onPointer, { passive: true }); listening = true; }
    return () => {
      cards.delete(el);
      if (!cards.size && listening) { document.removeEventListener("pointermove", onPointer); listening = false; }
    };
  }, []);

  const { base, spread } = glowColorMap[glowColor];
  const t = toneMap[tone];

  const style = {
    "--base": base,
    "--spread": spread,
    "--radius": "28",
    "--border": "2",
    "--backdrop": t.backdrop,
    "--size": "220",
    "--outer": "1",
    "--border-size": "calc(var(--border, 2) * 1px)",
    "--spotlight-size": "calc(var(--size, 150) * 1px)",
    "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
    ...(HOVER && {
      backgroundImage: `radial-gradient(var(--spotlight-size) var(--spotlight-size) at calc(var(--x,0)*1px) calc(var(--y,0)*1px), hsl(var(--hue,210) 100% 70% / ${t.fill}), transparent)`,
      backgroundAttachment: "fixed",
    }),
    backgroundColor: "var(--backdrop)",
    border: `var(--border-size) solid ${t.border}`,
    position: "relative",
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
  } as CSSProperties;

  return (
    <div
      ref={cardRef}
      data-glow
      style={style}
      className={`${customSize ? "" : `${sizeMap[size]} aspect-[3/4] gap-4 p-8`} relative grid rounded-[28px] ${t.shadow} ${className}`}
    >
      <div data-glow />
      {children}
    </div>
  );
}
