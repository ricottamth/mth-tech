import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../data';

// Header fixo em 3 colunas: logo | links | coluna vazia do mesmo tamanho da 1ª.
// As colunas laterais são 1fr, então os links ficam no centro real da tela.
// Abaixo de 1280px os links não cabem centralizados sem apertar a logo: vira menu hambúrguer.

function Logo() {
  return (
    <a
      href="#"
      aria-label="MTH TECH, início"
      className="logo-tap justify-self-start flex items-center gap-2.5 uppercase leading-none whitespace-nowrap rounded-xl hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0C0C0C]"
    >
      <img src="/brand/mth-symbol.svg" alt="" width={44} height={44} className="w-9 h-9 md:w-11 md:h-11" />
      <span className="font-black tracking-tight text-xl md:text-2xl">
        <span className="text-[#D7E2EA]">MTH</span>{' '}
        <span className="bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] bg-clip-text text-transparent">TECH</span>
      </span>
    </a>
  );
}

function NavLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="group relative inline-block px-4 py-3 rounded-full text-[17px] font-semibold uppercase tracking-[0.08em] text-[#D7E2EA]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]
        after:absolute after:left-4 after:right-4 after:bottom-1.5 after:h-[2px] after:rounded-full after:origin-center after:scale-x-0
        after:bg-gradient-to-r after:from-[#00E5FF] after:to-[#8B5CF6] after:transition-transform after:duration-300
        hover:after:scale-x-100 focus-visible:after:scale-x-100"
    >
      {/* o texto em degradê fica por cima e aparece com fade: transição suave de cor */}
      <span className="relative">
        {label}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] bg-clip-text text-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          {label}
        </span>
      </span>
    </a>
  );
}

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const scrolledRef = useRef(false);

  useEffect(() => {
    // só chama o React quando cruza o limite (não a cada evento de scroll)
    const onScroll = () => {
      const s = window.scrollY > 8;
      if (s !== scrolledRef.current) { scrolledRef.current = s; setScrolled(s); }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        solid ? 'bg-[#0C0C0C]/75 backdrop-blur-md border-white/[0.06]' : 'bg-transparent border-transparent'
      }`}
    >
      {/* abaixo de 1280px: logo à esquerda e menu à direita (flex), sem colunas que espremam a logo em telas estreitas */}
      <div className="flex justify-between gap-4 xl:grid xl:grid-cols-[1fr_auto_1fr] items-center h-16 md:h-20 px-[var(--page-padding)]">
        <Logo />

        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-[clamp(24px,3vw,56px)]">
            {navLinks.map((l) => (
              <li key={l.href}>
                <NavLink href={l.href} label={l.label} />
              </li>
            ))}
          </ul>
        </nav>

        {/* coluna direita: vazia no desktop (só equilibra a logo); no celular/tablet guarda o botão do menu */}
        <div className="justify-self-end shrink-0">
          <button
            type="button"
            className="xl:hidden inline-flex items-center justify-center w-11 h-11 rounded-full text-[#D7E2EA] border border-white/15 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-mobile" aria-label="Principal" className="xl:hidden border-t border-white/[0.06] px-[var(--page-padding)] pb-6 pt-2">
          <ul className="flex flex-col items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <NavLink href={l.href} label={l.label} onClick={() => setOpen(false)} />
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
