import FadeIn from '../components/FadeIn';
import AnimatedText from '../components/AnimatedText';
import ContactButton from '../components/ContactButton';
import { about, events } from '../data';
import EventLogoCard from '../components/EventLogoCard';
import { useRef } from 'react';
import { useViewport } from '../lib/viewport';

export default function AboutSection() {
  // cada grupo de logos entra em cascata quando aparece e pausa seus loops (flutuação, brilho) fora da tela
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  useViewport(desktopRef, { reveal: true, pause: true });
  useViewport(mobileRef, { reveal: true, pause: true });
  return (
    <section id="sobre" className="relative min-h-screen flex items-center justify-center px-5 sm:px-8 md:px-10 py-20">
      {/* desktop: logos nos cantos, entrando em cascata (scale 0.9 → 1). A camada ocupa a seção inteira,
          então as posições em % continuam relativas à seção. */}
      <div ref={desktopRef} className="pointer-events-none absolute inset-0 hidden lg:block z-20">
        {events.map((e, i) => (
          <div key={e.src} className={`pointer-events-auto absolute ${e.pos}`}>
            {/* inclinação e flutuação ficam numa camada própria, para não brigar com a entrada */}
            <div className="logo-float" style={{ ['--tilt' as string]: `${e.tilt}deg`, animationDuration: `${e.float}s` }}>
              <EventLogoCard src={e.src} alt={e.alt} role={e.role} index={i} />
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn
            as="h2"
            delay={0}
            y={40}
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Sobre mim
          </FadeIn>
          {/* um único bloco animado: as letras acendem em ordem de leitura por todos os parágrafos */}
          <AnimatedText
            text={about}
            wrapperClassName="flex flex-col gap-5 sm:gap-6 max-w-[680px] lg:max-w-[560px] xl:max-w-[620px] 2xl:max-w-[680px]"
            className="text-[#D7E2EA] font-medium text-center leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)' }}
          />
          {/* celular e tablet: as logos abaixo do texto (2×2 no celular, em linha no tablet), menores e sem hover */}
          <div ref={mobileRef} className="grid grid-cols-2 md:grid-cols-4 lg:hidden justify-items-center gap-4 sm:gap-5">
            {events.map((e, i) => (
              <EventLogoCard key={e.src} src={e.src} alt={e.alt} role={e.role} index={i} compact />
            ))}
          </div>
        </div>
        <ContactButton />
      </div>
    </section>
  );
}
