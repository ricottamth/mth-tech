import { useEffect, type RefObject } from 'react';
import { CAPTURE } from '../capture';

// Liga classes CSS conforme o elemento entra/sai da tela. Sem state do React: zero re-render durante o scroll.
//  reveal → 'reveal-pending' enquanto ainda não apareceu; 'reveal-in' na primeira vez que entra (uma vez só).
//           Os filhos com .reveal-item fazem a entrada em cascata (ver index.css).
//           Segurança: sem IntersectionObserver nada é escondido; o conteúdo nunca depende da animação.
//  pause  → 'loop-paused' enquanto fora da tela: pausa as animações em loop dos filhos.
type Opts = { reveal?: boolean; pause?: boolean };

const SHOW_RATIO = 0.15;

export function useViewport(ref: RefObject<Element>, { reveal = false, pause = false }: Opts) {
  useEffect(() => {
    const el = ref.current;
    if (!el || CAPTURE || !('IntersectionObserver' in window)) return;
    let first = true;
    const io = new IntersectionObserver(
      ([e]) => {
        if (reveal && !el.classList.contains('reveal-in')) {
          if (e.isIntersecting && e.intersectionRatio >= SHOW_RATIO) {
            el.classList.remove('reveal-pending');
            el.classList.add('reveal-in');
          } else if (first) {
            // ainda não está visível de verdade (fora da tela ou só encostando na borda): esconde até entrar
            el.classList.add('reveal-pending');
          }
        }
        if (pause) el.classList.toggle('loop-paused', !e.isIntersecting);
        first = false;
        if (!pause && el.classList.contains('reveal-in')) io.disconnect();
      },
      { threshold: [0, SHOW_RATIO] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, reveal, pause]);
}
