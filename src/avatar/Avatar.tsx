import { useEffect, useRef } from 'react';
import { initAvatar } from './avatar-engine.js';
import './avatar.css';

// React só monta a div; todo o comportamento está em avatar-engine.js (JS puro).
// Se o motor falhar em algum navegador, mostra o rosto parado em vez de quebrar o hero.
export default function Avatar() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current!;
    try {
      return initAvatar(root);
    } catch (err) {
      console.error('Avatar interativo indisponível:', err);
      root.className = 'avatar';
      root.innerHTML = '<img src="/assets/avatar/base.webp" alt="Avatar 3D de Matheus Amorim" style="width:100%;height:100%;object-fit:contain" />';
    }
  }, []);
  return <div ref={ref} />;
}
