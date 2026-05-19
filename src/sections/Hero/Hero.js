import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaWhatsapp, FaLinkedinIn, FaTelegramPlane } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
import './Hero.css';
import profileImg from '../../assets/hero/profile-hero.png';
import { heroContentStagger, heroItemFade, wordReveal, nameStagger } from '../../utils/motionVariants';

const symbols = ["{}", "</>", "()", "!=", ";", "[]", "/* */", "==", "if", "else", "01", "&&", "||", "sysout", "<>", "<!-- -->", "++", "--", "return"];

const CodeSymbols = React.memo(({ isMobile }) => {
  const symbolsContainerRef = useRef(null);

  useEffect(() => {
    if (!symbolsContainerRef.current) return;
    const numberOfSymbols = isMobile ? 12 : 25;
    const container = symbolsContainerRef.current;
    container.innerHTML = '';
    for (let i = 0; i < numberOfSymbols; i++) {
      const el = document.createElement('span');
      el.className = 'code-symbol';
      el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      el.style.top = `${Math.random() * 100}%`;
      el.style.left = `${Math.random() * 100}%`;
      el.style.animationDuration = isMobile ? `${12 + Math.random() * 8}s` : `${8 + Math.random() * 10}s`;
      el.style.animationDelay = `${Math.random() * 8}s`;
      el.style.setProperty('--x', `${Math.random() * 100 - 50}px`);
      el.style.setProperty('--y', `${Math.random() * 100 - 50}px`);
      el.style.setProperty('--r', `${Math.random() * 60 - 30}deg`);
      container.appendChild(el);
    }
  }, [isMobile]);

  return <div className="code-symbols" ref={symbolsContainerRef} aria-hidden="true" />;
});

const Particles = React.memo(({ numberOfParticles }) => (
  <div className="particles" aria-hidden="true">
    {Array.from({ length: numberOfParticles }).map((_, i) => (
      <div key={i} className="particle" />
    ))}
  </div>
));

const Hero = () => {
  const heroRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const symbolsY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const particlesY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);

  useEffect(() => {
    let timeoutId = null;
    const resizeListener = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsMobile(window.innerWidth <= 768), 150);
    };
    window.addEventListener('resize', resizeListener);
    return () => window.removeEventListener('resize', resizeListener);
  }, []);

  const numberOfParticles = useMemo(() => (isMobile ? 4 : 5), [isMobile]);

  return (
    <section ref={heroRef} className="hero-container" id="hero">
      {/* Parallax layers */}
      <motion.div style={{ y: particlesY }} className="parallax-layer">
        <Particles numberOfParticles={numberOfParticles} />
      </motion.div>
      <motion.div style={{ y: symbolsY }} className="parallax-layer">
        <CodeSymbols isMobile={isMobile} />
      </motion.div>

      {/* Left Column — staggered entrance */}
      <motion.div
        className="hero-left"
        initial="hidden"
        animate="show"
        variants={heroContentStagger}
      >
        <motion.div
          className="hero-status-badge"
          variants={heroItemFade}
          aria-label="Availability status"
        >
          <span className="status-dot" aria-hidden="true" />
          Available for opportunities
        </motion.div>

        <motion.h1
          className="hero-name"
          variants={nameStagger}
          aria-label="My name is Mohamad Naji"
        >
          {['Mohamad', 'NAJI'].map((word, i) => (
            <motion.span key={i} className="hero-name-word" variants={wordReveal}>
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.h2 variants={heroItemFade}>
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
        </motion.h2>

        <motion.div className="hero-socials" variants={heroItemFade}>
          <a href="https://www.linkedin.com/in/mohamad-naji-b84310174/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
          <a href="https://github.com/mohamadnaji" target="_blank" className="git-icon" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://wa.me/15146062270" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <FaWhatsapp />
          </a>
          <a href="https://t.me/mohamadnaji1" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
            <FaTelegramPlane />
          </a>
        </motion.div>

        <motion.div className="hero-buttons" variants={heroItemFade}>
          <a href="#contact" className="hero-button" aria-label="Contact me">
            Let's Connect
          </a>
          <a href="/Mohamad_Naji_CV.pdf" className="hero-button cv-button" download aria-label="Download my CV">
            Download CV
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <a className="scroll-indicator" href="#about" aria-label="Scroll to about section">
        <span className="scroll-chevron" aria-hidden="true" />
      </a>

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
