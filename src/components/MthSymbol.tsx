import { useId, useRef } from 'react';
import { useViewport } from '../lib/viewport';

// Símbolo MTH em SVG inline (mesmo desenho de /brand/mth-symbol.svg), para poder animar o traço.
// Ao entrar na tela: o contorno é desenhado (stroke-dashoffset), o preenchimento aparece e depois
// o degradê pulsa de leve (uma cópia mais clara que só muda de opacidade). Estilos em index.css (.mth-*).
const GRADIENT_PATH = 'M64.0 419.0 L23.0 418.9 L20.0 418.4 L19.6 417.0 L20.0 19.9 L61.5 20.0 L161.9 138.0 L165.0 140.0 L223.6 71.0 L223.9 70.0 L222.0 69.2 L193.0 69.0 L190.5 68.0 L231.0 19.7 L511.0 20.0 L511.3 66.0 L510.1 69.0 L407.0 69.2 L401.2 70.0 L400.9 222.0 L400.0 225.8 L353.0 226.0 L351.4 225.0 L351.2 75.0 L351.0 70.1 L350.0 69.4 L292.0 69.2 L289.3 70.0 L165.0 216.0 L159.6 211.0 L70.0 106.1 L68.8 112.0 L68.8 416.0 L68.0 418.6 L64.0 419.0 Z M400.0 418.7 L357.0 418.9 L351.5 418.0 L351.2 296.0 L352.0 290.8 L400.5 291.0 L401.0 411.0 L400.0 418.7 Z';
const LIGHT_PATH = 'M165.0 78.2 L162.8 78.0 L117.7 24.0 L115.0 19.5 L213.4 20.0 L165.0 78.2 Z M290.0 179.1 L242.0 179.5 L240.9 179.0 L240.7 176.0 L240.8 150.0 L241.7 148.0 L290.0 91.6 L290.0 179.1 Z M511.0 418.5 L463.0 418.8 L462.2 418.0 L462.0 290.5 L352.0 290.3 L347.0 289.9 L346.6 289.0 L356.3 266.0 L363.0 241.0 L461.0 240.7 L462.3 240.0 L463.0 112.5 L511.3 113.0 L511.0 418.5 Z M262.0 259.3 L260.0 258.9 L238.4 221.0 L239.0 219.6 L256.0 211.6 L278.2 250.0 L262.0 259.3 Z M239.0 346.3 L237.0 345.5 L224.9 330.0 L245.0 321.4 L261.0 312.4 L276.0 300.6 L290.2 285.0 L300.3 269.0 L306.4 255.0 L312.3 233.0 L314.5 215.0 L335.0 219.7 L332.3 240.0 L326.2 261.0 L317.4 281.0 L306.2 298.0 L291.0 314.7 L277.0 326.3 L261.0 336.4 L239.0 346.3 Z M219.0 277.0 L216.8 275.0 L196.1 238.0 L214.0 229.0 L235.8 267.0 L235.0 268.5 L219.0 277.0 Z M289.0 511.4 L241.0 510.9 L240.8 382.0 L240.9 377.0 L242.0 376.3 L268.0 366.1 L290.0 353.9 L290.2 510.0 L289.0 511.4 Z';

export default function MthSymbol({ className = '' }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  useViewport(ref, { reveal: true, pause: true });
  const id = useId().replace(/:/g, '');
  return (
    <svg ref={ref} viewBox="0 0 532 532" role="img" aria-label="Símbolo MTH TECH" className={className}>
      <defs>
        <linearGradient id={`g${id}`} gradientUnits="userSpaceOnUse" x1="20" y1="20" x2="512" y2="512">
          <stop offset="0" stopColor="#00F0FF" />
          <stop offset=".15" stopColor="#00F0FF" />
          <stop offset=".85" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id={`p${id}`} gradientUnits="userSpaceOnUse" x1="20" y1="20" x2="512" y2="512">
          <stop offset="0" stopColor="#B5FBFF" />
          <stop offset=".5" stopColor="#7DD3FC" />
          <stop offset="1" stopColor="#C4B5FD" />
        </linearGradient>
      </defs>
      <path className="mth-fill" fill={`url(#g${id})`} fillRule="evenodd" d={GRADIENT_PATH} />
      <path className="mth-fill" fill="#D7E2EA" fillRule="evenodd" d={LIGHT_PATH} />
      <path className="mth-pulse" fill={`url(#p${id})`} fillRule="evenodd" d={GRADIENT_PATH} aria-hidden="true" />
      <path className="mth-stroke" pathLength={1} fill="none" stroke={`url(#g${id})`} strokeWidth={4} strokeLinejoin="round" d={GRADIENT_PATH} aria-hidden="true" />
      <path className="mth-stroke" pathLength={1} fill="none" stroke="#D7E2EA" strokeWidth={4} strokeLinejoin="round" d={LIGHT_PATH} aria-hidden="true" />
    </svg>
  );
}
