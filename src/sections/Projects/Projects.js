import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShieldAlt, FaJava, FaGithub, FaPlane, FaRocket, FaChartLine,
  FaBroadcastTower, FaDesktop, FaDatabase } from 'react-icons/fa';
import { SiPython, SiFastapi, SiLaravel, SiJquery, SiBootstrap, SiCss3 } from 'react-icons/si';
import SectionTitle from '../../components/common/Section/SectionTitle';
import TiltCard from '../../components/common/TiltCard';
import './Projects.css';
import { fadeUp, scaleIn, staggerContainer } from '../../utils/motionVariants';

import arsLogo from '../../assets/projects/ARS.png';
import rfsLogo from '../../assets/projects/RFS.png';
import assuranceLogo from '../../assets/projects/assurance.png';
import realEstateLogo from '../../assets/projects/realEstate.png';

const TECH_ICONS = {
  'Python': <SiPython />,
  'FastAPI': <SiFastapi />,
  'BeautifulSoup': <FaRocket />,
  'Selenium': <FaRocket />,
  'Optuna': <FaChartLine />,
  'PHP (Laravel)': <SiLaravel />,
  'jQuery': <SiJquery />,
  'Bootstrap': <SiBootstrap />,
  'Dynamic Programming': <FaChartLine />,
  'Java': <FaJava />,
  'JavaFX': <FaDesktop />,
  'CSS': <SiCss3 />,
  'SQL Server': <FaDatabase />
};

const CATEGORY_COLORS = {
  'Machine Learning': 'var(--hero-accent)',
  'Web Development': 'var(--hero-secondary)',
  'Software Development': 'var(--hero-success)'
};

const projects = [
  {
    title: 'Real Estate Price Prediction (Lebanon)',
    category: 'Machine Learning',
    icon: <FaChartLine />,
    description: [
      'Implemented a machine learning model to predict real estate prices.',
      'Built a FastAPI backend, scraped property data with BeautifulSoup & Selenium.',
      'Applied Optuna for hyperparameter tuning and model optimization.'
    ],
    tech: ['Python', 'FastAPI', 'BeautifulSoup', 'Selenium', 'Optuna'],
    logo: realEstateLogo,
    status: 'Completed',
    year: '2024',
    github: 'https://github.com/mohamadnaji/Real-Estate-Web-Scraping-Lebanon'
  },
  {
    title: 'Base Station Configuration',
    category: 'Web Development',
    icon: <FaBroadcastTower />,
    description: [
      'Developed an Antenna Recommendation System using Laravel.',
      'Optimized antenna filtration with dynamic programming, reducing computation by 99.57%.'
    ],
    tech: ['PHP (Laravel)', 'jQuery', 'Bootstrap', 'Dynamic Programming'],
    logo: rfsLogo,
    status: 'Completed',
    year: '2019',
    github: 'https://github.com/mohamadnaji/base_station'
  },
  {
    title: 'Insurance Office Management System',
    category: 'Software Development',
    icon: <FaShieldAlt />,
    description: [
      'Built a desktop application using JavaFX and SQL Server to automate insurance operations.',
      'Supports registration of agents, companies, and clients, along with management of contracts and payments.',
      'Enhanced productivity through an intuitive interface and streamlined data processing.'
    ],
    tech: ['Java', 'JavaFX', 'CSS', 'SQL Server'],
    logo: assuranceLogo,
    status: 'Completed',
    year: '2019',
    github: 'https://github.com/mohamadnaji/assure-jfx'
  },
  {
    title: 'Airline Reservation System',
    category: 'Software Development',
    icon: <FaPlane />,
    description: [
      'Developed a university project to manage airline reservations, ticketing, and seat allocation.',
      'Enables staff to monitor flights, manage seat availability, and handle bookings efficiently.'
    ],
    tech: ['Java', 'JavaFX'],
    logo: arsLogo,
    status: 'Completed',
    year: '2022',
    github: 'https://github.com/mohamadnaji/Airplaine-System'
  }
];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const categories = ['All', ...new Set(projects.map((p) => p.category))];
  const filteredProjects =
    activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      className="projects-section"
      id="projects"
      aria-label="Featured projects and work"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeUp}
      >
        <SectionTitle subtitle="Featured projects showcasing my technical expertise">
          Featured Projects
        </SectionTitle>
      </motion.div>

      <motion.div
        className="project-filters"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <div className="filter-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
              onClick={() => setActiveFilter(category)}
              aria-label={`Filter projects by ${category}`}
            >
              {category}
              {category !== 'All' && (
                <span className="project-count">
                  {projects.filter((p) => p.category === category).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          className="projects-grid"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          {filteredProjects.map((project) => (
            <TiltCard
              key={project.title}
              role="article"
              className="project-card"
              variants={scaleIn}
              style={{ '--accent-color': CATEGORY_COLORS[project.category] || 'var(--hero-primary)' }}
              layout
              whileHover={{ y: -7 }}
            >
              <div className="project-accent-bar" aria-hidden="true" />

              <div className="project-header">
                <div className="project-logo-container">
                  <img
                    src={project.logo}
                    alt={`${project.title} logo`}
                    className="project-logo"
                    loading="lazy"
                  />
                  <div className="project-icon" aria-hidden="true">
                    {project.icon}
                  </div>
                </div>

                <div className="project-meta">
                  <span className="project-category">{project.category}</span>
                  <span className="project-year">{project.year}</span>
                </div>
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>

                <ul className="project-description">
                  {project.description.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>

                <div className="project-footer">
                  <div className="tech-stack">
                    <ul className="tech-list">
                      {project.tech.map((tech, idx) => (
                        <li key={idx} className="tech-item">
                          <span className="tech-icon" aria-hidden="true">
                            {TECH_ICONS[tech] || <FaRocket />}
                          </span>
                          <span className="tech-name">{tech}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="project-actions">
                    <span className={`status-badge ${project.status.toLowerCase()}`}>
                      {project.status}
                    </span>

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="github-link"
                        aria-label={`View ${project.title} on GitHub`}
                        title="View on GitHub"
                      >
                        <FaGithub />
                        <span>Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredProjects.length === 0 && (
        <div className="no-projects-message">
          <p>No projects found in the "{activeFilter}" category.</p>
        </div>
      )}

      <motion.div
        className="projects-cta"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
      >
        <p>Want to see more projects or discuss a collaboration?</p>
        <a href="#contact" className="cta-button">Let's Connect</a>
      </motion.div>
    </section>
  );
};

export default Projects;
