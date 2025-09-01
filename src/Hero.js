// src/components/Hero.js
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { FaGithub, FaWhatsapp, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { TypeAnimation } from 'react-type-animation';
import './Hero.css';
import profileImg from './assets/profile.png';

const symbols = ["{}", "</>", "()", "!=", ";", "[]", "/* */", "==", "if", "else", "01", "&&", "||", "sysout", "<>", "<!-- -->", "++", "--", "return"];

const CodeSymbols = React.memo(({ isMobile }) => {
  const symbolsContainerRef = useRef(null);

  useEffect(() => {
    if (!symbolsContainerRef.current) return;

    const numberOfSymbols = isMobile ? 12 : 25;
    const container = symbolsContainerRef.current;
    container.innerHTML = '';

    // Create each symbol only once
    for (let i = 0; i < numberOfSymbols; i++) {
      const el = document.createElement('span');
      el.className = 'code-symbol';
      el.textContent = symbols[Math.floor(Math.random() * symbols.length)];

      el.style.top = `${Math.random() * 100}%`;
      el.style.left = `${Math.random() * 100}%`;

      el.style.animationDuration = isMobile
        ? `${12 + Math.random() * 8}s`
        : `${8 + Math.random() * 10}s`;
      el.style.animationDelay = `${Math.random() * 8}s`;

      el.style.setProperty('--x', `${Math.random() * 100 - 50}px`);
      el.style.setProperty('--y', `${Math.random() * 100 - 50}px`);
      el.style.setProperty('--r', `${Math.random() * 60 - 30}deg`);

      container.appendChild(el);
    }
  }, [isMobile]);

  return <div className="code-symbols" ref={symbolsContainerRef} aria-hidden="true" />;
});

const Particles = React.memo(({ numberOfParticles }) => {
  return (
    <div className="particles" aria-hidden="true">
      {Array.from({ length: numberOfParticles }).map((_, i) => (
        <div key={i} className="particle"></div>
      ))}
    </div>
  );
});

const Hero = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update isMobile on resize with debounce for better performance
  useEffect(() => {
    let timeoutId = null;
    const resizeListener = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth <= 768);
      }, 150);
    };
    window.addEventListener('resize', resizeListener);
    return () => window.removeEventListener('resize', resizeListener);
  }, []);

  const numberOfParticles = useMemo(() => (isMobile ? 4 : 5), [isMobile]);

  return (
    <section className="hero-container" id="hero">
      {/* Particles */}
      <Particles numberOfParticles={numberOfParticles} />

      {/* Programming Symbols */}
      <CodeSymbols isMobile={isMobile} />

      {/* Left Column */}
      <div className="hero-left">
        <h1 aria-label="My name is Mohamad Naji">Mohamad NAJI</h1>
        <h2>
          I'm a{' '}
          <TypeAnimation
            sequence={[
              'Developer', 1600,
              'Programmer', 1600,
              'Problem Solver', 1600,
              'Creative Coder', 1600,
              'Continuous Learner', 1600,
              'Builder of Ideas', 1600,
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            style={{ color: 'var(--hero-primary)', fontWeight: '700', fontFamily: "'JetBrains Mono', monospace" }}
            aria-live="polite"
            aria-atomic="true"
          />
        </h2>
        
        {/* Social Links */}
        <div className="hero-socials">
          <a
            href="https://www.linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            className="git-icon"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://wa.me/yourphonenumber"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://x.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
          >
            <FaXTwitter />
          </a>
        </div>
        <div className="hero-buttons">
          <a href="#contact" className="hero-button" aria-label="Contact me">
            Let’s Connect
          </a>
          <a
            href="/Mohamad_Naji_CV.pdf"
            className="hero-button cv-button"
            download
            aria-label="Download my CV"
          >
            Download CV
          </a>
        </div>
      </div>

      {/* Right Column */}
      <div className="hero-right">
        <div
          className={`portrait-wrapper pulse ${isMobile ? 'mobile' : ''}`}
          tabIndex={0}
          aria-label="Portrait with ambient pulse effect"
          role="img"
        >
          <img
            src={profileImg}
            alt="Portrait of Mohamad Naji"
            loading="lazy"
            draggable="false"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;