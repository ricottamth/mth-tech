import { Github, Linkedin, type LucideIcon } from 'lucide-react';
import { contact } from '../../data';

// Ícones sociais do rodapé (baseado no "ButtonSocialIcon" do 21st.dev).
// Adaptado: são links (<a>), não botões; ícones do lucide-react em vez de imagens de CDN;
// cores do site em vez do tema shadcn. Um ícone só aparece se o link estiver preenchido em data.ts.
const SOCIALS: { label: string; href?: string; icon: LucideIcon }[] = [
  { label: 'GitHub', href: contact.github, icon: Github },
  { label: 'LinkedIn', href: contact.linkedin, icon: Linkedin },
];

export default function SocialIcons({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      {SOCIALS.filter((s) => s.href).map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#D7E2EA]/25 text-[#D7E2EA]
            transition-all duration-300 hover:scale-110 hover:border-[#00E5FF]/60 hover:text-[#00E5FF] hover:bg-[#D7E2EA]/5
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] motion-reduce:hover:scale-100"
        >
          <Icon size={18} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
