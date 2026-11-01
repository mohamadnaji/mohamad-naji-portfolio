import { useEffect } from 'react';
import Header from './components/Header';
import Marquee from './components/Marquee';
import BackToTop from './components/BackToTop';
import StatusBar from './components/StatusBar';
import Terminal from './components/Terminal';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Education from './sections/Education';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import { SectionNavProvider } from './hooks/useSectionNav';
import { usePointerEffects, useScrollEffects, useScrollReveal } from './hooks/useEffects';

const BANNER = [
  '  __  __  _   _',
  ' |  \\/  || \\ | |',
  ' | |\\/| ||  \\| |',
  ' | |  | || |\\  |',
  ' |_|  |_||_| \\_|',
  '',
  ' :: Mohamad Naji ::   (v7.0 · Java 21 · Spring Boot)',
].join('\n');

function Effects() {
  useScrollReveal();
  useScrollEffects();
  usePointerEffects();
  useEffect(() => {
    // A Spring-style banner for anyone who opens DevTools.
    // eslint-disable-next-line no-console
    console.log(`%c\n${BANNER}\n`, 'color:#F89820;font-family:monospace;font-weight:bold',
      '\nHi, fellow developer. Press Ctrl+K (⌘K on Mac) to open the terminal, or write to mohamadd.najii@gmail.com.');
  }, []);
  return null;
}

export default function App() {
  return (
    <SectionNavProvider>
      <Effects />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <StatusBar />
      <Terminal />
    </SectionNavProvider>
  );
}
