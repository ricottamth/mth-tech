// Faixa que rola sozinha em loop (origem: 21st.dev "marquee"), adaptada para este site:
//  - sem `cn`/alias "@/": o projeto não usa shadcn, então as classes são juntadas à mão
//  - sem o mt-10/sm:mt-24 e o max-w-[90vw] fixos do original: quem usa decide o espaçamento
//  - bordas esmaecidas (máscara), para os itens surgirem e sumirem suavemente
//  - modo "lite": em telas de toque e com prefers-reduced-motion não há loop infinito;
//    os itens aparecem parados, centralizados e quebrando linha (regra do site desde o caso do iPhone)
import * as React from 'react';
import { CAPTURE } from '../../capture';

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  pauseOnHover?: boolean;
  direction?: 'left' | 'right';
  speed?: number; // segundos para percorrer metade da faixa
}

const LITE =
  CAPTURE ||
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)').matches;

const join = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

export function Marquee({ children, pauseOnHover = false, direction = 'left', speed = 30, className, ...props }: MarqueeProps) {
  if (LITE) {
    return (
      <div className={join('w-full', className)} {...props}>
        <div className="flex flex-wrap justify-center gap-y-4">{children}</div>
      </div>
    );
  }
  return (
    <div className={join('w-full overflow-hidden', className)} {...props}>
      <div className="relative flex overflow-hidden py-5 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div
          className={join(
            'flex w-max',
            direction === 'right' ? 'animate-marquee-reverse' : 'animate-marquee',
            pauseOnHover && 'hover:[animation-play-state:paused]'
          )}
          style={{ '--duration': `${speed}s` } as React.CSSProperties}
        >
          {children}
          {children}
        </div>
      </div>
    </div>
  );
}
