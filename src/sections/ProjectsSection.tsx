import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import FadeIn from '../components/FadeIn';
import { CAPTURE } from '../capture';
import LiveProjectButton from '../components/LiveProjectButton';
import { projects, type Project } from '../data';

const RADIUS = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]';
const MEDIA_H = 'clamp(220px, 32vw, 460px)';

function Media({ project }: { project: Project }) {
  if (project.images?.length) {
    return (
      <div className="flex flex-col gap-3 sm:gap-4 h-full" style={{ height: MEDIA_H }}>
        {project.images.map((img) => {
          // a imagem inteira aparece (sem cortar): ela se ajusta ao espaço mantendo a proporção do print
          const pic = <img src={img.src} alt={img.alt} loading={CAPTURE ? "eager" : "lazy"} decoding="async" className="block max-w-full max-h-full w-auto h-auto rounded-[18px] sm:rounded-[22px] shadow-[0_10px_30px_rgba(0,0,0,0.45)]" />;
          const box = `flex-1 min-h-0 flex items-center justify-center bg-[#141418] border border-[#D7E2EA]/10 ${RADIUS} p-3 sm:p-4 md:p-5`;
          return img.href ? (
            <a key={img.src} href={img.href} target="_blank" rel="noopener noreferrer" className={`${box} hover:border-[#00E5FF]/40 transition-colors`}>
              {pic}
            </a>
          ) : (
            <div key={img.src} className={box}>{pic}</div>
          );
        })}
      </div>
    );
  }
  return (
    <div className={`h-full bg-[#141418] border border-[#D7E2EA]/10 ${RADIUS} p-6 sm:p-8 md:p-10 font-mono text-[#BBCCD7] overflow-hidden`} style={{ height: MEDIA_H }}>
      <div className="flex gap-2 mb-5" aria-hidden="true">
        <span className="w-3 h-3 rounded-full bg-[#00E5FF]" />
        <span className="w-3 h-3 rounded-full bg-[#8B5CF6]" />
        <span className="w-3 h-3 rounded-full bg-[#D7E2EA]" />
      </div>
      {project.terminal?.map((l, i) => (
        <p key={i} className="leading-relaxed whitespace-pre-wrap" style={{ fontSize: 'clamp(0.75rem, 1.2vw, 1.05rem)', opacity: l.startsWith('$') || l.startsWith('[') ? 0.55 : 1 }}>
          {l}
        </p>
      ))}
    </div>
  );
}

function Card({ project, index, total, progress }: { project: Project; index: number; total: number; progress: MotionValue<number> }) {
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  return (
    <div className="h-[85vh] flex items-start justify-center sticky top-24 md:top-32">
      <motion.div
        className={`relative w-full ${RADIUS} border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 origin-top`}
        style={{ scale, top: `${index * 28}px` }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 sm:mb-6 md:mb-8">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
            <span className="hero-heading font-black leading-none" style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-[#D7E2EA]/60 uppercase tracking-widest text-xs sm:text-sm md:text-base">{project.category}</span>
              <h3 className="text-[#D7E2EA] font-medium uppercase" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>
                {project.name}
              </h3>
            </div>
          </div>
          {project.link && <LiveProjectButton label={project.link.label} href={project.link.href} />}
        </div>
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
          <div className={`md:w-[40%] ${RADIUS} bg-[#16161A] p-6 sm:p-8 flex flex-col justify-between gap-6`}>
            <p className="text-[#D7E2EA] font-light leading-relaxed" style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.2rem)' }}>
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span key={t} className="rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA]/80 uppercase tracking-wider text-[11px] sm:text-xs px-3 py-1.5">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="md:w-[60%] order-first md:order-none">
            <Media project={project} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  return (
    <section
      id="projetos"
      className="relative z-10 bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-20"
    >
      <FadeIn
        as="h2"
        y={40}
        className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Projetos
      </FadeIn>
      <div ref={ref} className="max-w-6xl mx-auto">
        {projects.map((p, i) => (
          <Card key={p.name} project={p} index={i} total={projects.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
