// ===== Avatar interativo =====
// PNGs transparentes do mesmo tamanho, empilhados no mesmo lugar. O olhar e a cabeça seguem o cursor em 360°.
// JS puro, sem bibliotecas.
//
// Como funciona:
//  1. pointermove (sem debounce nem throttle) guarda o ALVO: a posição do cursor relativa ao centro do rosto,
//     normalizada entre -1 e 1 em x e y.
//  2. A pose (frame dos olhos) é escolhida NA HORA, no próprio evento: perto do centro mostra o frame base,
//     senão o frame cuja direção é a mais próxima do ângulo (com histerese). A troca é instantânea
//     (os frames só diferem nos olhos). Não depende de requestAnimationFrame, então não atrasa nem
//     com a página ocupada.
//  3. Um loop de requestAnimationFrame + lerp suaviza só o movimento da cabeça (giro e deslocamento
//     de alguns graus/pixels, transform 3D na GPU) e para sozinho quando alcança o cursor.

const DIR = '/assets/avatar/';

// Frame olhando para a frente.
const BASE = 'base.webp';

// Um frame por direção. Ângulo em graus: 0 = direita, sentido anti-horário (90 = cima, 180 = esquerda, 270 = baixo).
// Para mais direções, é só salvar o PNG em public/assets/avatar/ e acrescentar uma linha aqui.
const GAZE = [
  { file: 'look-000.webp', angle: 0 },     // direita
  { file: 'look-045.webp', angle: 45 },    // cima-direita
  { file: 'look-090.webp', angle: 90 },    // cima
  { file: 'look-135.webp', angle: 135 },   // cima-esquerda
  { file: 'look-180.webp', angle: 180 },   // esquerda
  { file: 'look-225.webp', angle: 225 },   // baixo-esquerda
  { file: 'look-270.webp', angle: 270 },   // baixo
  { file: 'look-315.webp', angle: 315 },   // baixo-direita
];

const CENTER = [0.5, 0.52];  // centro do rosto, em fração da imagem
const LERP = 0.3;            // quanto da distância até o alvo é percorrida por quadro (a 60fps)
const CENTER_IN = 0.1;       // intensidade (0–1) abaixo da qual volta para o frame base …
const CENTER_OUT = 0.16;     // … e acima da qual sai dela (histerese, para não piscar na borda)
const HYSTERESIS = 5;        // graus além da fronteira entre dois frames antes de trocar
const HEAD = { rotY: 9, rotX: 7, moveX: 10, moveY: 7 };  // giro máximo (graus) e deslocamento máximo (px)
const TOUCH_RELEASE_MS = 1000;

const angDist = (a, b) => { const d = Math.abs(a - b) % 360; return d > 180 ? 360 - d : d; };
const clamp = (v) => Math.max(-1, Math.min(1, v));

export function initAvatar(root) {
  root.classList.add('avatar');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stage = document.createElement('div');
  stage.className = 'avatar__stage';
  root.appendChild(stage);

  // pré-carrega e decodifica tudo: frame não decodificado aparece em branco por um instante
  const imgs = {};
  const files = [BASE, ...GAZE.map((g) => g.file)];
  for (const file of files) {
    const img = new Image();
    img.alt = file === BASE ? 'Avatar 3D de Matheus Amorim' : '';
    img.decoding = 'sync';   // ao trocar, pinta já decodificado em vez de mostrar vazio por um quadro
    img.src = DIR + file;
    stage.appendChild(img);
    imgs[file] = img;
  }
  // o frame base fica SEMPRE visível por baixo; o frame do olhar é pintado por cima.
  // Se o navegador ainda não tiver pintado o frame novo, aparece o base (olhos ao centro), nunca um buraco.
  imgs[BASE].classList.add('is-base', 'is-active');
  let ready = false;
  Promise.all(files.map((f) => imgs[f].decode().catch(() => {}))).then(() => { ready = true; pose(); kick(); });

  // troca instantânea: liga o novo antes de desligar o antigo, no mesmo quadro (nunca fica vazio)
  let current = BASE;
  function show(file) {
    if (!ready || file === current) return;
    imgs[file].classList.add('is-active');
    imgs[current].classList.remove('is-active');
    current = file;
  }

  // frame mais próximo do ângulo, com histerese em relação ao atual
  let gazeIndex = -1;
  function pickGaze(angle) {
    let best = 0;
    for (let i = 1; i < GAZE.length; i++) if (angDist(angle, GAZE[i].angle) < angDist(angle, GAZE[best].angle)) best = i;
    if (gazeIndex >= 0 && best !== gazeIndex) {
      const keep = angDist(angle, GAZE[gazeIndex].angle), take = angDist(angle, GAZE[best].angle);
      if (keep - take < 2 * HYSTERESIS) return gazeIndex;
    }
    return best;
  }

  // alvo (cursor) e posição suavizada, ambos em -1..1 relativos ao centro do rosto
  let tx = 0, ty = 0, sx = 0, sy = 0;
  function setTarget(x, y) {
    const r = root.getBoundingClientRect();     // relido a cada evento: funciona com scroll e resize
    const cx = r.left + r.width * CENTER[0], cy = r.top + r.height * CENTER[1];
    // normaliza pela distância do rosto até a borda da tela em cada direção: a borda da tela vale ±1
    tx = clamp((x - cx) / Math.max(1, x < cx ? cx : innerWidth - cx));
    ty = clamp((y - cy) / Math.max(1, y < cy ? cy : innerHeight - cy));
    pose();
    kick();
  }

  // olhos: decididos direto do alvo, sem esperar quadro de animação
  function pose() {
    const mag = Math.hypot(tx, ty);
    if (gazeIndex < 0 ? mag < CENTER_OUT : mag < CENTER_IN) { gazeIndex = -1; show(BASE); }
    else {
      gazeIndex = pickGaze(((Math.atan2(-ty, tx) * 180) / Math.PI + 360) % 360);
      show(GAZE[gazeIndex].file);
    }
  }

  // cabeça: segue a posição suavizada
  function render() {
    if (!reduced) {
      stage.style.transform =
        `perspective(1200px) translate3d(${(sx * HEAD.moveX).toFixed(2)}px, ${(sy * HEAD.moveY).toFixed(2)}px, 0) ` +
        `rotateY(${(sx * HEAD.rotY).toFixed(2)}deg) rotateX(${(-sy * HEAD.rotX).toFixed(2)}deg)`;
    }
  }

  // loop de animação: roda só enquanto a posição suavizada não alcançou o alvo
  let raf = 0, last = 0;
  function frame(now) {
    const dt = Math.min(0.05, (now - (last || now)) / 1000); last = now;
    const k = reduced ? 1 : 1 - Math.pow(1 - LERP, dt * 60 || 1);   // lerp independente da taxa de quadros
    sx += (tx - sx) * k; sy += (ty - sy) * k;
    if (Math.abs(tx - sx) < 0.002 && Math.abs(ty - sy) < 0.002) { sx = tx; sy = ty; render(); raf = 0; last = 0; return; }
    render();
    raf = requestAnimationFrame(frame);
  }
  function kick() { if (!raf) raf = requestAnimationFrame(frame); }

  // mouse / caneta: cada evento atualiza o alvo na hora
  const onMove = (e) => { if (e.pointerType !== 'touch') setTarget(e.clientX, e.clientY); };

  // celular: acompanha o dedo enquanto toca/arrasta; ao soltar, volta ao centro. Listeners passivos: o scroll continua.
  let releaseTimer = 0;
  const onTouch = (e) => {
    const t = e.touches[0];
    if (!t) return;
    clearTimeout(releaseTimer);
    setTarget(t.clientX, t.clientY);
  };
  const onTouchEnd = () => {
    clearTimeout(releaseTimer);
    releaseTimer = setTimeout(() => { tx = 0; ty = 0; pose(); kick(); }, TOUCH_RELEASE_MS);
  };

  addEventListener('pointermove', onMove);
  addEventListener('touchstart', onTouch, { passive: true });
  addEventListener('touchmove', onTouch, { passive: true });
  addEventListener('touchend', onTouchEnd, { passive: true });
  addEventListener('touchcancel', onTouchEnd, { passive: true });

  return () => {
    removeEventListener('pointermove', onMove);
    removeEventListener('touchstart', onTouch);
    removeEventListener('touchmove', onTouch);
    removeEventListener('touchend', onTouchEnd);
    removeEventListener('touchcancel', onTouchEnd);
    clearTimeout(releaseTimer);
    cancelAnimationFrame(raf);
    root.replaceChildren();
  };
}
