import { contact } from '../data';

export default function ContactButton({ label = 'Fale comigo', href = contact.whatsapp }: { label?: string; href?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="contact-btn inline-block rounded-full text-white font-medium uppercase tracking-widest px-7 py-3.5 sm:px-10 sm:py-4 md:px-12 md:py-4 text-[13px] sm:text-sm md:text-base whitespace-nowrap"
      style={{
        background: 'linear-gradient(123deg, #0B0620 6%, #3A1D8A 34%, #6B3FD6 58%, #1E9FE0 82%, #00E0FF 100%)',
        boxShadow: '0px 4px 16px rgba(107, 63, 214, 0.32), 4px 4px 12px #4B2BA8 inset',
        outline: '2px solid #fff',
        outlineOffset: '-3px',
      }}
    >
      {label}
    </a>
  );
}
