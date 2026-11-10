import HeroSection from './sections/HeroSection';
import MarqueeSection from './sections/MarqueeSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import ContactSection from './sections/ContactSection';
import SafeSection from './components/SafeSection';
import SiteHeader from './components/SiteHeader';

export default function App() {
  return (
    <>
    <SafeSection name="header"><SiteHeader /></SafeSection>
    <main style={{ background: '#0C0C0C', overflowX: 'clip' }}>
      <SafeSection name="hero"><HeroSection /></SafeSection>
      <SafeSection name="faixa"><MarqueeSection /></SafeSection>
      <SafeSection name="sobre"><AboutSection /></SafeSection>
      <SafeSection name="experiências"><ServicesSection /></SafeSection>
      <SafeSection name="projetos"><ProjectsSection /></SafeSection>
      <SafeSection name="skills"><SkillsSection /></SafeSection>
      <SafeSection name="contato"><ContactSection /></SafeSection>
    </main>
    </>
  );
}
