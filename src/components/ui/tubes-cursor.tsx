// components/ui/tubes-cursor.tsx
// Tubos de neon em WebGL que seguem o cursor. Clicar num espaço vazio troca a paleta.
// Desligado em telas de toque e para quem pede menos movimento (prefers-reduced-motion).
import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import { CAPTURE } from "../../capture";

type TubesApp = {
  tubes: { setColors: (c: string[]) => void; setLightsColors: (c: string[]) => void };
  dispose?: () => void;
};

const PALETTES = [
  { tubes: ["#00E5FF", "#A9A4F5", "#E9E7FD"], lights: ["#00E5FF", "#A9A4F5", "#7C83FD", "#E9E7FD"] },
  { tubes: ["#A9A4F5", "#7C83FD", "#00E5FF"], lights: ["#E9E7FD", "#00E5FF", "#A9A4F5", "#7C83FD"] },
  { tubes: ["#E9E7FD", "#00E5FF", "#7C83FD"], lights: ["#A9A4F5", "#E9E7FD", "#00E5FF", "#7C83FD"] },
  // meio rosa: rosa misturado com lavanda
  { tubes: ["#FF8AD8", "#C9A7FF", "#FFD1EC"], lights: ["#FF6EC7", "#C084FC", "#F9A8D4", "#E9E7FD"] },
];

// Ajuste do efeito: menos tubos (rastros) e brilho mais baixo que o padrão da biblioteca
const TUBE_COUNT = 9;          // padrão da biblioteca: 16
const LIGHT_INTENSITY = 45;    // padrão: 200 (antes usávamos 120)
const SPREAD = 0.015;          // quanto os tubos se afastam uns dos outros (noise); padrão: 0.05. Menor = mais juntos
const BLOOM = { threshold: 0, strength: 0.55, radius: 0.4 };  // brilho em volta dos tubos; padrão: strength 1.5, radius 0.5

const LIB_URL = "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js";

type Props = {
  children?: ReactNode;
  /** classes do <section> externo (tamanho, fundo) */
  className?: string;
  /** classes do container do conteúdo, que fica por cima do canvas */
  innerClassName?: string;
};

export default function TubesCursor({ children, className = "", innerClassName = "relative z-10" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<TubesApp | null>(null);
  const idx = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || touch || CAPTURE) return;

    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        const mod = await import(/* @vite-ignore */ LIB_URL);
        if (cancelled || !canvasRef.current) return;
        const p = PALETTES[0];
        appRef.current = mod.default(canvasRef.current, {
          bloom: BLOOM,
          tubes: { count: TUBE_COUNT, noise: SPREAD, colors: p.tubes, lights: { intensity: LIGHT_INTENSITY, colors: p.lights } },
        });
      } catch (err) {
        console.error("Falha ao carregar TubesCursor:", err);
      }
    }, 100);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      appRef.current?.dispose?.();
      appRef.current = null;
    };
  }, []);

  const cyclePalette = (e: MouseEvent) => {
    // clique em link ou botão faz só o que ele faz; a paleta muda só em clique no espaço vazio
    if ((e.target as HTMLElement).closest("a, button, [role='button']")) return;
    if (!appRef.current) return;
    idx.current = (idx.current + 1) % PALETTES.length;
    const p = PALETTES[idx.current];
    appRef.current.tubes.setColors(p.tubes);
    appRef.current.tubes.setLightsColors(p.lights);
  };

  return (
    <section onClick={cyclePalette} className={`relative overflow-hidden bg-[#0C0C0C] ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <div className="hero-glow pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#A9A4F5]/10 blur-[120px]" />
      <div className={innerClassName}>{children}</div>
    </section>
  );
}
