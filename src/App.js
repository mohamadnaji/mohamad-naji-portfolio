// src/components/App.js
import React, { useEffect, useCallback } from 'react';

// Components
import Navbar from './Navbar';
import MobileNavbar from './MobileNavbar';
import ThemeToggle from './ThemeToggle';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Experience from './Experience';
import Projects from './Projects';
import Education from './Education';
import Contact from './Contact';

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
