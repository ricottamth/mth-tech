import { motion, useReducedMotion } from 'framer-motion';
import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useEffect, useMemo, useRef } from 'react';
import { CAPTURE } from '../capture';

type Props = {
  children?: ReactNode;
  as?: ElementType;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  id?: string;
};

// Garantia de visibilidade: a entrada é só um enfeite. Se a animação não terminar a tempo
// (celular em modo economia, navegador embutido do WhatsApp, aba que trava os quadros de animação),
// o elemento aparece mesmo assim, em vez de a página ficar preta.
// Sem polling: um único IntersectionObserver para todos os FadeIn avisa quando cada um entra na tela;
// depois do tempo da animação, se ainda estiver invisível, é forçado a aparecer.
// Se o observer nunca responder (quadros travados), um único timer força todos a aparecer.
const SAFETY_MS = 400;
const GLOBAL_FALLBACK_MS = 3000;

const limits = new Map<Element, number>();
let observer: IntersectionObserver | null = null;
let observerWorked = false;
let globalTimer = 0;

function force(el: HTMLElement) {
  if (parseFloat(getComputedStyle(el).opacity) < 0.99) {
    el.style.opacity = '1';
    el.style.transform = 'none';
  }
}

function watch(el: HTMLElement, limit: number) {
  if (!('IntersectionObserver' in window)) { setTimeout(() => force(el), limit); return; }
  observer ??= new IntersectionObserver((entries) => {
    observerWorked = true;
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const t = e.target as HTMLElement;
      const ms = limits.get(t) ?? 1500;
      observer!.unobserve(t);
      limits.delete(t);
      setTimeout(() => force(t), ms);
    }
  }, { rootMargin: '50px' });
  limits.set(el, limit);
  observer.observe(el);
  if (!globalTimer) {
    globalTimer = window.setTimeout(() => {
      if (!observerWorked) limits.forEach((_, t) => force(t as HTMLElement));
    }, GLOBAL_FALLBACK_MS);
  }
}

function unwatch(el: HTMLElement) {
  limits.delete(el);
  observer?.unobserve(el);
}

export default function FadeIn({ children, as = 'div', delay = 0, duration = 0.7, x = 0, y = 30, className, style, id }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Comp = useMemo(() => motion.create(as as any), [as]) as any;
  // prefers-reduced-motion: só aparece (fade curto), sem deslizar
  const reduce = useReducedMotion();
  if (reduce) { x = 0; y = 0; duration = 0.2; }

  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    watch(el, (delay + duration) * 1000 + SAFETY_MS);
    return () => unwatch(el);
  }, [delay, duration]);

  if (CAPTURE) {
    // modo captura (?figma): sem animação, já visível
    const Tag = as;
    return <Tag id={id} className={className} style={style}>{children}</Tag>;
  }

  return (
    <Comp
      ref={ref}
      id={id}
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </Comp>
  );
}
