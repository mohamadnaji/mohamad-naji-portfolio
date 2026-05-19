import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../../components/common/Section/SectionTitle.js';
import './About.css';
import profileImg from '../../assets/about/profile-about.png';
import { fadeUp, fadeIn, scaleIn, staggerContainer } from '../../utils/motionVariants';

const stats = [
  { value: '7+', label: 'Years Experience' },
  { value: '4', label: 'Companies' },
  { value: '10+', label: 'Projects Built' },
];

const About = () => {
  return (
    <section
      className="about-section"
      id="about"
      role="region"
      aria-label="About Mohamad Naji"
    >
      <div className="about-bg-decoration" aria-hidden="true">
        <div className="about-particle"></div>
        <div className="about-particle"></div>
        <div className="about-particle"></div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeUp}
      >
        <SectionTitle subtitle="Get to know me better">About Me</SectionTitle>
      </motion.div>

      <div className="about-container">
        <motion.div
          className="about-image"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={scaleIn}
        >
          <div className="image-float">
            <div className="image-wrapper">
              <img
                src={profileImg}
                alt="Mohamad Naji - Full Stack Developer"
                loading="lazy"
                draggable="false"
              />
              <div className="image-glow" aria-hidden="true"></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="about-content"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUp}
        >
          <div className="about-text">
            <p>
              I'm <span className="highlight">Mohamad NAJI</span>, a passionate Full Stack Developer with over{' '}
              <span className="highlight">7 years of experience</span> building scalable backend systems, APIs,
              and cloud-native applications. I specialize in{' '}
              <span className="tech-stack">Java, Spring Boot, Python, and SQL</span>, and I love turning
              complex problems into elegant solutions.
            </p>
            <p>
              Beyond code, I enjoy <span className="highlight">mentoring junior developers</span>, optimizing
              performance, and exploring new tech stacks. Whether it's designing microservices or debugging
              legacy systems, I thrive on challenges that push the boundaries of what's possible.
            </p>
            <div className="quote-container">
              <blockquote className="quote">
                <span className="quote-mark">"</span>
                Code is poetry, and I write it with precision.
                <span className="quote-mark">"</span>
              </blockquote>
            </div>
          </div>

          <div className="about-actions">
            <a href="/Mohamad_Naji_CV.pdf" className="about-btn primary" download aria-label="Download my CV">
              <span>Download CV</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Stats row */}
      <motion.div
        className="about-stats"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        {stats.map((stat) => (
          <motion.div key={stat.label} className="stat-card" variants={scaleIn}>
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default About;
