import { Github, Mail, MapPin, MessageCircle } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';
import { contact } from '../data';
import SocialIcons from '../components/ui/social-icon';
import MthSymbol from '../components/MthSymbol';

const LINKS = [
  { icon: Mail, label: contact.email, href: `mailto:${contact.email}` },
  { icon: MessageCircle, label: contact.phone, href: contact.whatsapp },
  { icon: Github, label: 'github.com/ricottamth', href: contact.github },
];

export default function ContactSection() {
  return (
    <section id="contato" className="cv-auto relative z-10 bg-[#0C0C0C] px-5 sm:px-8 md:px-10 pt-10 pb-12 sm:pb-16">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-10 sm:gap-14">
        <FadeIn y={20}>
          <MthSymbol className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36" />
        </FadeIn>
        <FadeIn
          as="h2"
          y={40}
          className="hero-heading font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(2.6rem, 10vw, 150px)' }}
        >
          Bora conversar?
        </FadeIn>
        <FadeIn delay={0.1} as="p" className="text-[#D7E2EA] font-light max-w-xl leading-relaxed" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.3rem)' }}>
          Aberto a estágio em Sistemas de Informação e a novos projetos de sites. Respondo rápido pelo WhatsApp.
        </FadeIn>
        <FadeIn delay={0.2}>
          <ContactButton label="Chamar no WhatsApp" />
        </FadeIn>
        <FadeIn delay={0.3} className="flex flex-wrap justify-center gap-3">
          {LINKS.map(({ icon: Icon, label, href }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA]/30 text-[#D7E2EA] px-5 py-2.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors"
            >
              <Icon size={18} /> {label}
            </a>
          ))}
        </FadeIn>
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-2 pt-10 mt-4 border-t border-[#D7E2EA]/10 text-[#D7E2EA]/50 text-xs sm:text-sm uppercase tracking-wider">
          <span className="inline-flex items-center gap-2 justify-center">
            <img src="/brand/mth-symbol.svg" alt="" className="w-5 h-5 opacity-80" /> © 2026 MTH TECH · Matheus Ricotta Pereira Amorim
          </span>
          <SocialIcons className="sm:order-none" />
          <span className="inline-flex items-center gap-1.5 justify-center"><MapPin size={14} /> {contact.location}</span>
        </div>
      </div>
    </section>
  );
}
