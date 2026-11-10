import { useEffect, useRef, useState, type KeyboardEvent, type RefObject } from 'react';
import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';
import Avatar from '../avatar/Avatar';
import TubesCursor from '../components/ui/tubes-cursor';
import { heroTagline } from '../data';
import { CAPTURE } from '../capture';

// Perguntas do balão que aparece ao clicar no avatar. Edite à vontade.
const BUBBLE_QUESTIONS = [
  'Bora criar um site juntos?',
  'Já viu meus projetos aqui embaixo?',
  'Precisa de uma landing page?',
  'Curtiu o avatar? Ele segue o seu mouse!',
  'Quer baixar meu currículo?',
  'Tem vaga de estágio por aí?',
  'Sabia que este site foi feito com React?',
  'Que tal conversar no WhatsApp?',
];
const BUBBLE_MS = 3000;

// Efeito do nome ao rolar: escala máxima (desktop / celular) e inclinação no fim.
const NAME_SCALE_MAX = { desktop: 3.5, mobile: 2 };
const NAME_TILT_DEG = 14;

const reduceMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function useNameScrollEffect(nameRef: RefObject<HTMLElement>, heroRef: RefObject<HTMLElement>) {
  useEffect(() => {
    const el = nameRef.current, hero = heroRef.current;
    if (!el || !hero || CAPTURE || reduceMotion()) return;
    let raf = 0;
    // altura medida só no início e no resize: nada de ler layout a cada quadro do scroll
    let h = hero.offsetHeight || window.innerHeight;
    const update = () => {
      raf = 0;
      const p = Math.min(1, Math.max(0, window.scrollY / (h * 0.9)));   // progresso amarrado à rolagem (scrub)
      const max = window.innerWidth < 768 ? NAME_SCALE_MAX.mobile : NAME_SCALE_MAX.desktop;
      const eased = p * p * (3 - 2 * p);
      el.style.transform = `scale(${1 + eased * (max - 1)}) rotateX(${eased * NAME_TILT_DEG}deg)`;
      el.style.opacity = String(p < 0.55 ? 1 : Math.max(0, 1 - (p - 0.55) / 0.45));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    const onResize = () => { h = hero.offsetHeight || window.innerHeight; onScroll(); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
    };
  }, [nameRef, heroRef]);
}

function useBubble() {
  const [bubble, setBubble] = useState<{ text: string; key: number } | null>(null);
  const last = useRef(-1);
  const timer = useRef(0);
  const show = () => {
    let i = Math.floor(Math.random() * BUBBLE_QUESTIONS.length);
    if (BUBBLE_QUESTIONS.length > 1 && i === last.current) i = (i + 1) % BUBBLE_QUESTIONS.length;   // nunca repete a anterior
    last.current = i;
    setBubble({ text: BUBBLE_QUESTIONS[i], key: Date.now() });   // key nova = animação "pop" de novo
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setBubble(null), BUBBLE_MS);
  };
  useEffect(() => () => window.clearTimeout(timer.current), []);
  return { bubble, show };
}

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  useNameScrollEffect(nameRef, heroRef);
  const { bubble, show } = useBubble();

  const onAvatarKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(); }
  };

  return (
    <TubesCursor className="h-screen" innerClassName="relative z-10 h-full">
      {/* pt = espaço do header fixo (64px no celular, 80px no desktop) */}
      <div ref={heroRef} className="relative h-full flex flex-col pt-16 md:pt-20">
        {/* nome: mesmo eixo central do avatar e do menu, mesma margem dos dois lados */}
        <div className="relative px-[var(--page-padding)] pt-6 md:pt-8 [perspective:900px]">
          <FadeIn delay={0.15} y={40}>
            <h1
              ref={nameRef}
              className="hero-name hero-heading font-black uppercase tracking-tight leading-[0.92] text-center whitespace-nowrap origin-center will-change-transform"
            >
              <span className="block md:inline">Matheus</span> <span className="block md:inline">Ricotta</span>
            </h1>
          </FadeIn>
        </div>

        {/* rodapé do hero: texto e botão com a mesma margem lateral e a mesma distância da base */}
        <div className="mt-auto relative z-20 flex justify-between items-end gap-4 sm:gap-8 px-[var(--page-padding)] pb-8 md:pb-10 lg:pb-12">
          <FadeIn
            as="p"
            delay={0.35}
            y={16}
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[176px] sm:max-w-[240px] md:max-w-[264px]"
            style={{ fontSize: 'clamp(0.875rem, 1.4vw, 1.5rem)' }}
          >
            {heroTagline}
          </FadeIn>
          <FadeIn delay={0.5} y={16} className="shrink-0">
            <ContactButton />
          </FadeIn>
        </div>

        {/* avatar: na frente do nome; clicar (ou Enter/Espaço) mostra um balão com uma pergunta */}
        <div className="hero-portrait-wrap">
          <FadeIn delay={0.6} y={24}>
            <div
              role="button"
              tabIndex={0}
              aria-label="Avatar do Matheus: clique para ver uma pergunta"
              onClick={show}
              onKeyDown={onAvatarKey}
              className="relative cursor-pointer rounded-[40%] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]"
            >
              <Avatar />
            </div>
          </FadeIn>
          <div aria-live="polite" className="speech-anchor">
            {bubble && (
              <p key={bubble.key} className="speech-bubble">
                {bubble.text}
              </p>
            )}
          </div>
        </div>
      </div>
    </TubesCursor>
  );
}
