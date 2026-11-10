import FadeIn from '../components/FadeIn';
import { experience, facts } from '../data';
import { GlowCard } from '../components/ui/spotlight-card';

const LINE = '1px solid rgba(12, 12, 12, 0.15)';

export default function ServicesSection() {
  return (
    <section
      id="experiencia"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 pb-32 sm:pb-36 md:pb-44"
    >
      <FadeIn
        as="h2"
        y={40}
        className="text-[#0C0C0C] font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(2.6rem, 10vw, 150px)' }}
      >
        Experiências
      </FadeIn>
      <div className="max-w-5xl mx-auto">
        {experience.map((e, i) => (
          <FadeIn
            key={e.role}
            delay={i * 0.1}
            className="flex items-center gap-6 sm:gap-10 md:gap-14 py-8 sm:py-10 md:py-12 text-[#0C0C0C]"
            style={{ borderTop: i === 0 ? LINE : undefined, borderBottom: LINE }}
          >
            <span className="font-black leading-none shrink-0" style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="font-medium uppercase leading-tight" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>
                {e.role}
              </h3>
              <span className="uppercase tracking-wider text-[#00788F] font-medium" style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.95rem)' }}>
                {e.where}
              </span>
              <p className="font-light leading-relaxed max-w-2xl" style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)', opacity: 0.6 }}>
                {e.description}
              </p>
            </div>
          </FadeIn>
        ))}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-16 sm:mt-20 md:mt-24">
          {facts.map((f, i) => (
            <FadeIn key={f.label} delay={i * 0.08}>
              <GlowCard customSize tone="light" className="h-full gap-0 p-6 sm:p-8 text-[#0C0C0C]">
                <span className="block uppercase tracking-widest text-xs sm:text-sm opacity-50 mb-3">{f.label}</span>
                <span className="block font-medium leading-snug" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.5rem)' }}>
                  {f.value}
                </span>
                <span className="block font-light mt-1 opacity-60 text-sm sm:text-base">{f.detail}</span>
              </GlowCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
