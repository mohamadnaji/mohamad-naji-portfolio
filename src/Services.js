import React, { useEffect, useRef, useState } from 'react';
import { 
  FaCode, 
  FaServer, 
  FaMobileAlt,
  FaRocket,
  FaCogs,
  FaCheckCircle,
  FaArrowRight
} from 'react-icons/fa';
import SectionTitle from './components/SectionTitle';
import './Services.css';

const SERVICES = [
  {
    icon: <FaCode />,
    title: 'Custom Software Development',
    description: 'Building tailored software solutions from scratch using Java, Python, and modern frameworks. Expertise in creating scalable applications that solve complex business problems.',
    features: [
      'Enterprise Java Applications',
      'Spring Boot Microservices',
      'FastAPI & Python Solutions',
      'Legacy System Modernization'
    ],
    color: '#0ea5e9'
  },
  {
    icon: <FaServer />,
    title: 'Backend & API Development',
    description: 'Designing and implementing robust RESTful APIs and backend systems with focus on performance, security, and scalability.',
    features: [
      'RESTful API Architecture',
      'Database Design & Optimization',
      'Integration with Third-party APIs',
      'Microservices Implementation'
    ],
    color: '#8b5cf6'
  },
  {
    icon: <FaMobileAlt />,
    title: 'Full Stack Web Development',
    description: 'End-to-end web application development with modern frontend frameworks and responsive design principles.',
    features: [
      'React & Angular Applications',
      'Responsive UI/UX Design',
      'Single Page Applications',
      'Progressive Web Apps'
    ],
    color: '#ec4899'
  },
  {
    icon: <FaRocket />,
    title: 'System Architecture & Design',
    description: 'Creating scalable and maintainable system architectures with best practices and design patterns.',
    features: [
      'Microservices Architecture',
      'System Design & Planning',
      'Code Review & Refactoring',
      'Technical Documentation'
    ],
    color: '#10b981'
  },
  {
    icon: <FaCogs />,
    title: 'Data Processing & Automation',
    description: 'Automating workflows and processing large datasets with Python, web scraping, and machine learning integration.',
    features: [
      'Web Scraping (BeautifulSoup)',
      'Data Analysis & Visualization',
      'NLP & Text Processing',
      'Workflow Automation'
    ],
    color: '#6366f1'
  },
  {
    icon: <FaCode />,
    title: 'Technical Consulting',
    description: 'Providing expert guidance on technology selection, architecture decisions, and best practices for your projects.',
    features: [
      'Technology Stack Selection',
      'Performance Optimization',
      'Security Best Practices',
      'Team Mentoring & Training'
    ],
    color: '#ef4444'
  }
];

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 600;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: isMobile ? 0.05 : 0.1,
        rootMargin: isMobile ? '0px' : '50px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      className={`services-section ${isVisible ? 'animate-in' : ''}`}
      id="services"
      ref={sectionRef}
      role="region"
      aria-label="Professional services offered"
    >
      {/* Background decoration */}
      <div className="services-bg-decoration" aria-hidden="true">
        <div className="service-particle"></div>
        <div className="service-particle"></div>
      </div>

      <SectionTitle subtitle="Comprehensive solutions backed by 7 years of experience">
        What I Can Do For You
      </SectionTitle>

      {/* Services Grid */}
      <div className="services-grid">
        {SERVICES.map((service, index) => (
          <article
            key={index}
            className={`service-card ${hoveredIndex === index ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{ 
              '--service-color': service.color,
              '--animation-delay': `${index * 0.1}s`
            }}
          >
            {/* Top gradient bar */}
            <div className="service-top-bar"></div>

            {/* Background glow */}
            <div className="service-glow"></div>

            {/* Icon */}
            <div className="service-icon-wrapper">
              <span className="service-icon" aria-hidden="true">
                {service.icon}
              </span>
            </div>

            {/* Content */}
            <div className="service-content">
              <h3 className="service-title">{service.title}</h3>

              <p className="service-description">
                {service.description}
              </p>

              {/* Features */}
              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="service-feature-item">
                    <FaCheckCircle className="feature-check-icon" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Learn More Link */}
              {/* <div className="service-link">
                <span>Discuss Your Project</span>
                <FaArrowRight className="service-arrow" aria-hidden="true" />
              </div> */}
            </div>
          </article>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="services-cta">
        <p className="cta-text">
          Ready to bring your ideas to life? Let's collaborate and build something amazing together.
        </p>
        <a href="#contact" className="cta-button">
          <span>Start a Conversation</span>
          <FaArrowRight />
        </a>
      </div>
    </section>
  );
};

export default Services;