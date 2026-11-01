import Header from './components/Header';
import Marquee from './components/Marquee';
import BackToTop from './components/BackToTop';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Education from './sections/Education';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import { usePointerEffects, useScrollEffects, useScrollReveal } from './hooks/useEffects';

export default function App() {
  useScrollReveal();
  useScrollEffects();
  usePointerEffects();

  return (
    <>
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
    </>
  );
}
