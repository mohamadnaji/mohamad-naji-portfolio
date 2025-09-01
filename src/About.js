import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about-section" id="about">
  <div className="about-image">
    <img src="./assets/profile.png" alt="Mohamad Naji" />
  </div>
  <div className="about-content">
    <h2>About Me</h2>
    <p>
      I'm Mohamad NAJI, a passionate Full Stack Developer with over 7 years of experience building scalable backend systems, APIs, and cloud-native applications. I specialize in Java, Spring Boot, Python, and SQL — and I love turning complex problems into elegant solutions.
    </p>
    <p>
      Beyond code, I enjoy mentoring junior developers, optimizing performance, and exploring new tech stacks. Whether it's designing microservices or debugging legacy systems, I thrive on challenges.
    </p>
    <p className="quote">Code is poetry — and I write it with precision.</p>
    <a href="/MohamadNajiCV.pdf" className="cta-btn">Download CV</a>
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
</section>

  );
};

export default About;
