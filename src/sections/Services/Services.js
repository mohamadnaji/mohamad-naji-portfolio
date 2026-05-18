import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaJava, FaPython, FaDatabase, FaChartLine,
  FaTools, FaCode, FaCheckCircle, FaArrowRight
} from 'react-icons/fa';
import SectionTitle from '../../components/common/Section/SectionTitle';
import './Services.css';
import { fadeUp, scaleIn, staggerContainer } from '../../utils/motionVariants';

const SERVICES = [
  {
    icon: <FaJava />,
    title: 'Enterprise Java Development',
    description: 'Building robust, scalable enterprise applications using Java ecosystem. 7+ years of experience with Spring Boot, JSF, and microservices architecture.',
    features: ['Spring Boot & Spring Framework', 'JSF Enterprise Applications', 'RESTful API Development', 'Microservices Architecture'],
    color: '#f89820'
  },
  {
    icon: <FaDatabase />,
    title: 'Database & Backend Systems',
    description: 'Designing and optimizing database architectures with SQL expertise. Building high-performance backend systems with advanced caching and message queuing.',
    features: ['Oracle & MySQL Database Design', 'SQL Query Optimization', 'Redis Caching Solutions', 'RabbitMQ Message Queuing'],
    color: '#0ea5e9'
  },
  {
    icon: <FaPython />,
    title: 'Python API & Automation',
    description: 'Developing fast, modern APIs with FastAPI and automating complex workflows. Expertise in web scraping, data processing, and Python-based solutions.',
    features: ['FastAPI Development', 'Web Scraping (Selenium, BeautifulSoup)', 'Workflow Automation', 'Firebase Integration'],
    color: '#3776ab'
  },
  {
    icon: <FaChartLine />,
    title: 'GIS & Data Science',
    description: 'Geospatial analysis and data visualization with ESRI certification. Expertise in ArcGIS Pro, spatial data processing, and integrating GIS with modern web applications.',
    features: ['ArcGIS Pro & ESRI Tools', 'Spatial Data Analysis & Mapping', 'Web Scraping & Data Extraction', 'NLP & Text Processing (Spacy, NLTK)'],
    color: '#10b981'
  },
  {
    icon: <FaCode />,
    title: 'Full Stack Development',
    description: 'Building complete web applications from frontend to backend. Proficient in JavaScript frameworks, responsive design, and modern development practices.',
    features: ['Vue.js Applications', 'JavaScript Development', 'Responsive UI/UX Design', 'Single Page Applications'],
    color: '#8b5cf6'
  },
  {
    icon: <FaTools />,
    title: 'DevOps & Monitoring',
    description: 'Implementing CI/CD pipelines, containerization, and monitoring solutions. Ensuring application reliability with modern DevOps practices.',
    features: ['Docker Containerization', 'Git Version Control', 'Prometheus Monitoring', 'Swagger & OpenAPI Documentation'],
    color: '#ec4899'
  }
];

const Services = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section
      className="services-section"
      id="services"
      role="region"
      aria-label="Professional services offered"
    >
      <div className="services-bg-decoration" aria-hidden="true">
        <div className="service-particle"></div>
        <div className="service-particle"></div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeUp}
      >
        <SectionTitle subtitle="Leveraging 7+ years of expertise in backend development, databases, and modern tech stacks">
          What I Can Do For You
        </SectionTitle>
      </motion.div>

      <motion.div
        className="services-grid"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        variants={staggerContainer}
      >
        {SERVICES.map((service, index) => (
          <motion.article
            key={index}
            className={`service-card ${hoveredIndex === index ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{ '--service-color': service.color }}
            variants={scaleIn}
          >
            <div className="service-top-bar" />
            <div className="service-glow" />

            <div className="service-icon-wrapper">
              <span className="service-icon" aria-hidden="true">{service.icon}</span>
            </div>

            <div className="service-content">
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>

              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="service-feature-item">
                    <FaCheckCircle className="feature-check-icon" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        className="services-cta"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
      >
        <p className="cta-text">
          Ready to build scalable, robust solutions? Let's discuss how my expertise in Java, Python,
          databases, and modern technologies can help bring your project to life.
        </p>
        <a href="#contact" className="cta-button">
          <span>Start a Conversation</span>
          <FaArrowRight />
        </a>
      </motion.div>
    </section>
  );
};

export default Services;
