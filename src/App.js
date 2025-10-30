// src/components/App.js
import React, { useEffect, useCallback } from 'react';

// Components
import Navbar from './components/common/Navbar/Navbar';
import MobileNavbar from './components/common/MobileNavbar/MobileNavbar';
import ThemeToggle from './components/common/ThemeToggle/ThemeToggle';
import Hero from './sections/Hero/Hero';
import About from './sections/About/About';
import Skills from './sections/Skills/Skills';
import Experience from './sections/Experiences/Experience';
import Projects from './sections/Projects/Projects';
import Education from './sections/Educations/Education';
import Contact from './sections/Contact/Contact';
import Services from './sections/Services/Services';

// Styles
import './App.css';

function useAnchorFocus() {
  const focusAnchor = useCallback(() => {
    const targetId = window.location.hash.slice(1);
    const el = targetId && document.getElementById(targetId);
    if (!el) return;

    const hadTabIndex = el.hasAttribute('tabindex');
    if (!hadTabIndex) el.setAttribute('tabindex', '-1');

    requestAnimationFrame(() => el.focus({ preventScroll: true }));

    if (!hadTabIndex) {
      setTimeout(() => el.removeAttribute('tabindex'), 500);
    }
  }, []);

  useEffect(() => {
    focusAnchor();
    window.addEventListener('hashchange', focusAnchor);
    return () => window.removeEventListener('hashchange', focusAnchor);
  }, [focusAnchor]);
}


export default function App() {
  useAnchorFocus();

  return (
    <div className="App">
      <Navbar />
      <MobileNavbar />
      <ThemeToggle />

      <main>
        <Hero />

        <section id="about" className="section" aria-labelledby="about-title">
          <About />
        </section>

        <section id="services" className="section" aria-labelledby="services-title">
          <Services />
        </section>

        <section id="skills" className="section" aria-labelledby="skills-title">
          <Skills />
        </section>

        <section id="experience" className="section" aria-labelledby="experience-title">
          <Experience />
        </section>

        <section id="projects" className="section" aria-labelledby="projects-title">
          <Projects />
        </section>

        <section id="education" className="section" aria-labelledby="education-title">
          <Education />
        </section>

        <section id="contact" className="section" aria-labelledby="contact-title">
          <Contact />
        </section>
      </main>
    </div>
  );
}
