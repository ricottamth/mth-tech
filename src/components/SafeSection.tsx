import { Component, type ReactNode } from 'react';

// Se uma seção quebrar (erro de JavaScript num celular/navegador específico), só ela some:
// o resto da página continua aparecendo, em vez de a tela inteira ficar preta.
export default class SafeSection extends Component<{ children: ReactNode; name: string }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error(`Seção "${this.props.name}" falhou e foi ocultada:`, error);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
