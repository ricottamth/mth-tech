// Todo o conteúdo do site num lugar só: edite aqui sem mexer nos componentes.
// Fonte: currículo de Matheus Ricotta Pereira Amorim (versão de 08/11/2026).

const WHATSAPP = '5521981908736';

export const contact = {
  email: 'ricottamatheus@gmail.com',
  phone: '(21) 98190-8736',
  whatsapp: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Olá, Matheus! Vi seu portfólio e queria conversar.')}`,
  github: 'https://github.com/ricottamth',
  linkedin: 'https://www.linkedin.com/in/matheus-ricotta' as string,   // vazio = ícone escondido
  location: 'Niterói, RJ',
};

export const navLinks = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Experiências', href: '#experiencia' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contato', href: '#contato' },
];

export const heroTagline = 'desenvolvedor web e estudante de sistemas de informação na uff';

// "Sobre mim": um item por parágrafo
export const about = [
  'Oi, eu sou o Matheus. Desenvolvedor web freelancer, estudante de Sistemas de Informação na UFF desde 2024 e morador de Niterói.',
  'Crio sites e landing pages para negócios reais, do domínio ao deploy e com apoio de IA, pensados para um objetivo só: transformar visita em cliente. Meu primeiro projeto no ar foi o site institucional do Amorim Abraão Advogados, e desde então venho trabalhando com negócios locais de Niterói e região.',
  'Antes do código, aprendi na rua: no marketing e na produção de grandes eventos, como Rock in Rio e The Town, nas redes sociais ao vivo da Copa do Mundo como community manager e no atendimento de balcão. É isso que levo pra cada projeto: entender o público, cumprir prazo e fazer a marca aparecer bem.',
  'Hoje busco um estágio onde eu possa aplicar IA na prática. E se o seu negócio ainda não tem um site à altura, vamos conversar.',
];

// faixa que corre com o scroll (linha 1 vai pra direita, linha 2 pra esquerda)
export const marqueeSkills = ['Python', 'React', 'TypeScript', 'Next.js', 'Supabase', 'Docker', 'Git & GitHub', 'Vercel', 'Claude', 'ChatGPT', 'Gemini', 'Obsidian', 'Orca', 'Redes de Computadores', 'UX / IHC'];
export const marqueeHighlights = ['UFF · Sistemas de Informação', 'Rock in Rio 2026', 'THE TOWN', 'Copa do Mundo', 'Grupo Dreamers', 'Microsoft Learn · IA', 'JUBS', 'Inglês avançado', 'Freelancer desde 2026'];

export const experience = [
  {
    role: 'Desenvolvedor Web',
    where: 'Freelancer · MTH TECH · 2026 – atual',
    description:
      'Site institucional no ar para o Amorim Abraão Advogados, com domínio próprio, SEO e feed automático de notícias do STF e STJ. Landing pages para negócios locais de Niterói, versionadas no GitHub e publicadas na Vercel, e prospecção de clientes inclusive nos EUA.',
  },
  {
    role: 'Produtor (Infraestrutura)',
    where: 'Natura · A-Lab / Grupo Dreamers · Rock in Rio 2026',
    description: 'Produção da infraestrutura da ação de marketing da Natura no Rock in Rio 2026, cobrindo a marca no evento pela A-Lab.',
  },
  {
    role: 'Community Manager',
    where: 'CLEAR · Grupo Dreamers · Copa do Mundo',
    description: 'Respostas em tempo real nas redes sociais da marca durante a Copa do Mundo, numa comunicação direta e ágil com o público.',
  },
  {
    role: 'Marketing e Produção',
    where: 'Eisenbahn (patrocinadora) · Grupo Dreamers · THE TOWN',
    description: 'Produção do evento e cobertura da marca patrocinadora, dando suporte às ações de marketing durante o THE TOWN.',
  },
  {
    role: 'Atendente e Operador de Caixa',
    where: 'Delivery',
    description: 'Atendimento ao cliente, operação de caixa e gestão e contagem de estoque.',
  },
];

export const facts = [
  { label: 'Formação', value: 'Bacharelado em Sistemas de Informação', detail: 'UFF · 2024 – atual' },
  { label: 'Certificação', value: 'Conceitos de IA para desenvolvedores', detail: 'Microsoft Learn' },
  { label: 'Idiomas', value: 'Português nativo · Inglês intermediário/avançado', detail: 'Francês: noções (11 anos de escola)' },
  { label: 'Extracurricular', value: 'Equipe competitiva universitária', detail: 'Classificada para os JUBS' },
];

export type Project = {
  name: string;
  category: string;
  description: string;
  tags: string[];
  link?: { label: string; href: string };
  images?: { src: string; alt: string; href?: string }[];
  terminal?: string[];
};

export const projects: Project[] = [
  {
    name: 'Amorim Abraão Advogados',
    category: 'Cliente · site no ar',
    description: 'Site institucional de um escritório de advocacia, com domínio próprio, SEO, feed automático de notícias do STF e STJ e páginas de privacidade e cookies.',
    tags: ['Institucional', 'SEO', 'Domínio próprio'],
    link: { label: 'Ver site', href: 'https://www.amorimabraao.com.br' },
    images: [{ src: '/showcase/amorim-abraao.webp', alt: 'Página inicial do site Amorim Abraão Advogados' }],
  },
  {
    name: 'Landing pages locais',
    category: 'Freelance · Niterói',
    description: 'Páginas de conversão para negócios locais: um barman de eventos que recebe orçamentos pelo WhatsApp e uma clínica que facilita o agendamento de pacientes.',
    tags: ['Landing page', 'Conversão', 'Vercel'],
    images: [
      { src: '/showcase/rr-drinks.webp', alt: 'Landing page RR Drinks Eventos', href: 'https://rr-drinks-eventos.vercel.app' },
      { src: '/showcase/biophysis.webp', alt: 'Landing page Espaço Biophysis', href: 'https://espaco-biophysis.vercel.app' },
    ],
  },
  {
    name: 'Chat TCP Multiusuário',
    category: 'UFF · Redes de Computadores',
    description: 'Bate-papo multiusuário em Python com sockets TCP, multithreading e o padrão Observer. Inclui labs de Wireshark (HTTP) e sockets UDP/TCP.',
    tags: ['Python', 'Sockets', 'Threads'],
    link: { label: 'GitHub', href: 'https://github.com/ricottamth' },
    terminal: [
      '$ python servidor.py --porta 5000',
      '[servidor] ouvindo em 0.0.0.0:5000',
      '[+] ana entrou (2 online)',
      '[+] bruno entrou (3 online)',
      'ana: alguém viu o lab do wireshark?',
      'bruno: vi! o handshake tá na linha 3',
      '[observer] mensagem enviada a 3 clientes',
    ],
  },
  {
    name: 'PIX para Todos',
    category: 'UFF · IHC · 2026.2 · em grupo',
    description: 'Pesquisa e prototipação para melhorar a experiência de idosos com pouca familiaridade tecnológica ao fazer transferências via Pix, num processo completo de imersão, ideação e avaliação com usuários.',
    tags: ['UX', 'Pesquisa', 'Figma'],
    link: { label: 'Ver portfólio', href: 'https://uff-arthurmta.github.io/PortofolioIHC/index.html' },
    terminal: [
      '01 imersão   problema, matriz CSD, mapa de empatia',
      '02 pesquisa  27 respostas no questionário + entrevistas',
      '03 ideação   personas, cenários, Crazy 4',
      '04 protótipo PIX acessível para idosos no Figma',
      '05 avaliação teste da solução com usuários',
      '[equipe] 4 alunos · orientação Daniela Trevisan',
    ],
  },
];

// área "Skills": grupos de habilidades (cada grupo vira um card) + link para o PDF do currículo.
// O PDF é gerado de cv/curriculo.html (veja as instruções no topo desse arquivo).
export const cv = {
  pdf: '/curriculo-matheus-ricotta.pdf',
  fileName: 'Curriculo-Matheus-Ricotta.pdf',
};

export const skillGroups = [
  {
    title: 'Técnicas',
    accent: 'cyan',
    items: ['Python', 'TypeScript', 'React', 'Next.js', 'Supabase', 'PostgreSQL', 'Docker', 'Git/GitHub', 'Vercel', 'C', 'Redes de Computadores', 'Estruturas de Dados', 'UX (IHC)'],
  },
  { title: 'IA e ferramentas', accent: 'cyan', items: ['Claude', 'Claude Code', 'ChatGPT', 'Gemini', 'Obsidian', 'Orca'] },
  { title: 'Comportamentais', accent: 'purple', items: ['Comunicação', 'Vendas e prospecção', 'Trabalho em equipe', 'Organização e gestão', 'Atendimento ao público'] },
  { title: 'Idiomas', accent: 'purple', items: ['Português · nativo', 'Inglês · intermediário/avançado', 'Francês · noções'] },
] as const;

// logos dos eventos na seção "Sobre mim" (arquivos em public/logos).
// Desktop: espalhados de forma orgânica. pos = posição, tilt = inclinação (graus), float = ritmo da flutuação (s).
export const events = [
  { src: '/logos/rock-in-rio.webp', alt: 'Logo do Rock in Rio', role: 'Produção de infraestrutura · Natura', pos: 'top-[5%] left-[1%] xl:left-[3%] 2xl:left-[7%]', tilt: -6, float: 7, x: -80, delay: 0.1 },
  { src: '/logos/copa-do-mundo.webp', alt: 'Logo da Copa do Mundo FIFA 2026', role: 'Community manager · CLEAR', pos: 'top-[22%] right-[1%] xl:right-[2%] 2xl:right-[5%]', tilt: 5, float: 8.5, x: 80, delay: 0.15 },
  { src: '/logos/the-town.png', alt: 'Logo do The Town', role: 'Produção / marketing · Eisenbahn', pos: 'bottom-[20%] left-[1%] xl:left-[3%]', tilt: 4, float: 9, x: -80, delay: 0.25 },
  { src: '/logos/uff.webp', alt: 'Logo da Universidade Federal Fluminense (UFF)', role: 'Sistemas de Informação · 2024 – atual', pos: 'bottom-[5%] right-[6%] xl:right-[7%]', tilt: -5, float: 7.5, x: 80, delay: 0.3 },
];

// faixa de logos entre o hero e as faixas de texto (ordem = ordem na tela).
// Os logos vêm do pacote simple-icons e são ligados aos nomes em MarqueeSection.tsx.
export const techLogos = [
  'React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vite', 'Motion', 'JavaScript', 'Node.js',
  'Supabase', 'PostgreSQL', 'Docker', 'Python', 'Git', 'GitHub', 'Vercel', 'Figma',
  'Claude', 'Gemini', 'Obsidian',
] as const;
