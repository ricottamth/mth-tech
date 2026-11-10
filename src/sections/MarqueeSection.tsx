import { useRef } from 'react';
import {
  siReact, siTypescript, siNextdotjs, siTailwindcss, siVite, siFramer, siJavascript, siNodedotjs,
  siSupabase, siPostgresql, siDocker, siPython, siGit, siGithub, siVercel, siFigma,
  siClaude, siGooglegemini, siObsidian, type SimpleIcon,
} from 'simple-icons';
import { marqueeHighlights, marqueeSkills, techLogos } from '../data';
import { Marquee } from '../components/ui/marquee';
import { useViewport } from '../lib/viewport';

// Layout da seção:
//  1. faixa de logos (loop contínuo)            ┐ separadas por um divisor fino,
//  2. duas fileiras de pills (loop em CSS)      ┘ com o mesmo respiro acima e abaixo
// Ritmo: 16px entre itens (gap-x-4) e entre fileiras (gap-y-4); 20px a partir de sm.

// importados um a um (e não `import *`) para o build levar só estes 19 logos
const LOGOS: Record<(typeof techLogos)[number], SimpleIcon> = {
  React: siReact, TypeScript: siTypescript, 'Next.js': siNextdotjs, 'Tailwind CSS': siTailwindcss, Vite: siVite,
  Motion: siFramer, JavaScript: siJavascript, 'Node.js': siNodedotjs, Supabase: siSupabase, PostgreSQL: siPostgresql,
  Docker: siDocker, Python: siPython, Git: siGit, GitHub: siGithub, Vercel: siVercel, Figma: siFigma,
  Claude: siClaude, Gemini: siGooglegemini, Obsidian: siObsidian,
};

// fade igual nas duas laterais de todas as faixas
const EDGE_FADE = '[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]';

// textos longos ficam um pouco menores e menos pesados, para equilibrar com os curtos (VERCEL, CLAUDE)
const LONG_LABEL = 18;

function TechLogo({ name, i }: { name: (typeof techLogos)[number]; i: number }) {
  const path = LOGOS[name].path;
  return (
    // margem (e não gap) porque o Marquee duplica os itens: o espaço precisa existir também na emenda do loop.
    // Camadas: entrada em cascata (reveal-item) > escala no hover/toque (tech-icon) > flutuação (tech-float).
    <div className="reveal-item mx-3 sm:mx-6" style={{ ['--i' as string]: i }}>
      <div className="tech-logo flex items-center gap-2 sm:gap-3 text-[#D7E2EA]">
        <span className="tech-icon shrink-0">
          <span className="tech-float relative h-5 w-5 sm:h-6 sm:w-6" style={{ animationDelay: `${-((i * 0.53) % 3.4)}s` }}>
            <svg viewBox="0 0 24 24" role="img" aria-label={name} className="tech-dim absolute inset-0 h-full w-full fill-current">
              <path d={path} />
            </svg>
            {/* destaque de cor: cópia em ciano que só ganha opacidade (sem animar a cor) */}
            <svg viewBox="0 0 24 24" aria-hidden="true" className="tech-accent absolute inset-0 h-full w-full fill-[#00E5FF]">
              <path d={path} />
            </svg>
          </span>
        </span>
        <span className="tech-dim font-medium uppercase tracking-wider text-xs sm:text-sm whitespace-nowrap">{name}</span>
      </div>
    </div>
  );
}

function Pill({ label }: { label: string }) {
  const long = label.length > LONG_LABEL;
  return (
    // altura fixa (em relação à fonte da fileira) e só o texto encolhe: todas as pills ficam do mesmo tamanho
    <span
      className="shrink-0 inline-flex items-center h-[2.1em] rounded-full border-2 border-[#D7E2EA]/20 px-6 sm:px-8
        uppercase tracking-tight leading-none whitespace-nowrap text-[#D7E2EA]"
    >
      <span className={long ? 'font-extrabold text-[0.82em]' : 'font-black'}>{label}</span>
    </span>
  );
}

// Fileira de pills em loop: CSS puro (@keyframes com translate3d), velocidade linear constante.
// O conteúdo aparece duas vezes e a faixa anda exatamente metade da largura: o loop emenda sem pulo.
// O espaço depois do último item (pr) é igual ao gap, para a emenda ter o mesmo respiro.
function PillRow({ items, reverse, duration }: { items: string[]; reverse?: boolean; duration: number }) {
  const half = (hidden: boolean) => (
    <div className="flex items-center gap-x-4 sm:gap-x-5 pr-4 sm:pr-5" aria-hidden={hidden || undefined}>
      {items.map((t) => <Pill key={t} label={t} />)}
    </div>
  );
  return (
    <div className={`overflow-hidden ${EDGE_FADE}`}>
      <div
        className={`flex w-max ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} motion-reduce:animate-none`}
        style={{ ['--duration' as string]: `${duration}s`, fontSize: 'clamp(1.15rem, 2.6vw, 2.4rem)' }}
      >
        {half(false)}
        {half(true)}
      </div>
    </div>
  );
}

export default function MarqueeSection() {
  const ref = useRef<HTMLElement>(null);
  // entrada em cascata das logos + pausa de todos os loops da seção quando ela sai da tela
  useViewport(ref, { reveal: true, pause: true });

  return (
    <section ref={ref} className="bg-[#0C0C0C] pt-10 sm:pt-14 md:pt-16 pb-12 sm:pb-16 overflow-hidden">
      {/* 1. tecnologias */}
      <Marquee speed={45} pauseOnHover aria-label="Tecnologias que uso">
        {techLogos.map((name, i) => <TechLogo key={name} name={name} i={i} />)}
      </Marquee>

      {/* divisor: separa as tecnologias das pills, com o mesmo respiro dos dois lados */}
      <div className="mx-auto my-8 sm:my-10 md:my-12 h-px w-[min(72rem,90%)] bg-gradient-to-r from-transparent via-[#D7E2EA]/15 to-transparent" />

      {/* 2. pills: duas fileiras em sentidos opostos */}
      <div className="flex flex-col gap-y-4 sm:gap-y-5">
        <PillRow items={marqueeSkills} duration={55} />
        <PillRow items={marqueeHighlights} duration={48} reverse />
      </div>
    </section>
  );
}
