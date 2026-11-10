import type { CSSProperties } from 'react';
import { CAPTURE } from '../capture';
// Card claro com a logo de um evento. No hover (ou foco pelo teclado) fica 100% opaco,
// ganha um brilho ciano/lavanda na borda e mostra embaixo o papel que tive no evento.
// Animações (só transform/opacity): entrada em cascata com scale 0.9 → 1 e um brilho que passa por cima de tempos em tempos.

// Ajustes rápidos:
//  - tamanho do card: SIZE (desktop) e SIZE_COMPACT (celular)
//  - opacidade no estado normal: opacity-[0.85] abaixo
export const SIZE = 'w-[170px] h-[170px] xl:w-[200px] xl:h-[200px] p-6 xl:p-7';
export const SIZE_COMPACT = 'w-[140px] h-[140px] sm:w-36 sm:h-36 p-4';

type Props = {
  src: string;
  alt: string;
  role: string;
  index?: number;      // posição na cascata de entrada e no ritmo do brilho
  compact?: boolean;   // celular/tablet: só a logo, sem legenda
};

export default function EventLogoCard({ src, alt, role, index = 0, compact = false }: Props) {
  return (
    <div
      tabIndex={0}
      className="reveal-item reveal-scale group relative outline-none flex flex-col items-center"
      style={{ ['--i' as string]: index, ['--stagger' as string]: '90ms' } as CSSProperties}
    >
      <div
        className={`brand-card ${compact ? SIZE_COMPACT : SIZE} relative overflow-hidden flex items-center justify-center rounded-[24px]
          border border-white/60 bg-white/[0.92] shadow-[0_12px_32px_rgba(0,0,0,0.35)] opacity-[0.85]
          transition-opacity duration-300 motion-reduce:transition-none
          group-hover:opacity-100 group-focus-visible:opacity-100`}
        style={{ ['--shine-delay' as string]: `${1.2 + index * 1.6}s` } as CSSProperties}
      >
        {/* object-contain mantém a proporção original: as quadradas ocupam a altura, a do The Town (horizontal) a largura */}
        <img src={src} alt={alt} draggable={false} loading={CAPTURE ? 'eager' : 'lazy'} decoding="async" className="relative max-w-full max-h-full object-contain select-none" />
      </div>
      {/* brilho do hover: camada pronta com a sombra colorida, que só ganha opacidade (sem animar box-shadow) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[24px] opacity-0 transition-opacity duration-300 motion-reduce:transition-none
          shadow-[0_0_0_1px_rgba(0,229,255,0.55),0_0_28px_rgba(169,164,245,0.5)]
          group-hover:opacity-100 group-focus-visible:opacity-100"
      />
      {!compact && (
        <span
          className="pointer-events-none absolute top-full mt-3 whitespace-nowrap text-white text-xs tracking-wide
            opacity-0 -translate-y-1 transition duration-300 motion-reduce:transition-none
            group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0"
        >
          {role}
        </span>
      )}
    </div>
  );
}
