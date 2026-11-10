// "Modo captura": abra o site com ?figma no fim do endereço (ex.: https://mth-tech.vercel.app/?figma)
// para importar no Figma (plugin html.to.design) ou tirar prints de página inteira.
// Nele tudo aparece de uma vez: sem animações de entrada, sem loops, todas as imagens carregadas
// e o hero com altura fixa. Visitantes normais não são afetados.
export const CAPTURE = typeof window !== 'undefined' && /[?&]figma\b/.test(window.location.search);
