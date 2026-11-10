import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { Fragment, useRef, type CSSProperties } from 'react';
import { CAPTURE } from '../capture';

function Char({ char, progress, range }: { char: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative">
      <span className="invisible">{char}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  );
}

// Em telas de toque o texto aparece pronto, sem a revelação letra a letra: são centenas de animações ligadas
// à rolagem, pesadas para o celular (no iPhone usam a linha do tempo de rolagem nativa do Safari, que é nova).
const TOUCH = CAPTURE || (typeof window !== 'undefined' && window.matchMedia('(hover: none), (pointer: coarse)').matches);

// Aceita um texto ou vários parágrafos. Com vários, todos compartilham UMA rolagem:
// as letras acendem na ordem de leitura, do primeiro parágrafo ao último.
type Props = {
  text: string | string[];
  className?: string;       // classes de cada parágrafo
  style?: CSSProperties;    // estilo de cada parágrafo
  wrapperClassName?: string; // classes do bloco que agrupa os parágrafos
};

export default function AnimatedText(props: Props) {
  const paragraphs = Array.isArray(props.text) ? props.text : [props.text];
  if (TOUCH) {
    return (
      <div className={props.wrapperClassName}>
        {paragraphs.map((p, i) => <p key={i} className={props.className} style={props.style}>{p}</p>)}
      </div>
    );
  }
  return <ScrollRevealText {...props} paragraphs={paragraphs} />;
}

function ScrollRevealText({ paragraphs, className, style, wrapperClassName }: Props & { paragraphs: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });
  const total = paragraphs.reduce((n, p) => n + p.length + 1, 0);
  let idx = 0;   // posição global da letra, contando todos os parágrafos
  return (
    <div ref={ref} className={wrapperClassName}>
      {paragraphs.map((text, pi) => {
        const words = text.split(' ');
        const content = words.map((word, w) => {
          const chars = word.split('').map((c) => {
            const i = idx++;
            return <Char key={i} char={c} progress={scrollYProgress} range={[i / total, (i + 1) / total]} />;
          });
          idx++; // espaço entre palavras (ou fim do parágrafo)
          // o espaço fica FORA da palavra: dentro de um inline-block ele seria descartado e as palavras grudariam
          return (
            <Fragment key={w}>
              <span className="inline-block whitespace-nowrap">{chars}</span>
              {w < words.length - 1 && ' '}
            </Fragment>
          );
        });
        return <p key={pi} className={className} style={style}>{content}</p>;
      })}
    </div>
  );
}
