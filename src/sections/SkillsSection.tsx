import { Download } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import { GlowCard } from '../components/ui/spotlight-card';
import { cv, skillGroups } from '../data';

const CHIP = {
  cyan: 'border-[#00E5FF]/40 text-[#BFF6FF] bg-[#00E5FF]/[0.06]',
  purple: 'border-[#8B5CF6]/40 text-[#DCCFFF] bg-[#8B5CF6]/[0.07]',
};

export default function SkillsSection() {
  return (
    <section id="skills" className="relative z-10 bg-[#0C0C0C] px-5 sm:px-8 md:px-10 pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-24">
      <FadeIn
        as="h2"
        y={40}
        className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-14 sm:mb-16 md:mb-20"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Skills
      </FadeIn>

      {/* um card por grupo, em grade 2×2 a partir do tablet */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {skillGroups.map((g, i) => (
          <FadeIn key={g.title} delay={i * 0.08} className="h-full">
            <GlowCard customSize tone="dark" className="h-full content-start gap-0 p-6 sm:p-8">
              <div className="flex items-baseline justify-between gap-4 mb-5">
                <h3 className="text-[#D7E2EA] font-medium uppercase tracking-wide" style={{ fontSize: 'clamp(1rem, 1.6vw, 1.35rem)' }}>
                  {g.title}
                </h3>
                <span className="text-[#D7E2EA]/40 text-xs sm:text-sm tabular-nums">{String(g.items.length).padStart(2, '0')}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span key={s} className={`rounded-full px-3.5 py-1.5 text-xs sm:text-sm uppercase tracking-wider border ${CHIP[g.accent]}`}>
                    {s}
                  </span>
                ))}
              </div>
            </GlowCard>
          </FadeIn>
        ))}
      </div>

      {/* currículo completo: só o link, sem prévia */}
      <FadeIn delay={0.2} className="max-w-6xl mx-auto mt-10 sm:mt-12 flex justify-center">
        <a
          href={cv.pdf}
          download={cv.fileName}
          className="inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA]/60 text-[#D7E2EA] font-medium uppercase tracking-widest px-7 py-3 text-xs sm:text-sm hover:bg-[#D7E2EA]/10 transition-colors"
        >
          <Download size={16} /> Baixar currículo (PDF)
        </a>
      </FadeIn>
    </section>
  );
}
