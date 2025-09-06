import React, { useEffect, useRef, useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaRocket, FaChartLine, FaBroadcastTower } from 'react-icons/fa';
import { SiPython, SiFastapi, SiPhp, SiLaravel, SiJquery, SiBootstrap } from 'react-icons/si';
import SectionTitle from './components/SectionTitle';
import './Projects.css';

const TECH_ICONS = {
  'Python': <SiPython />,
  'FastAPI': <SiFastapi />,
  'BeautifulSoup': <FaRocket />,
  'Selenium': <FaRocket />,
  'Optuna': <FaChartLine />,
  'PHP (Laravel)': <SiLaravel />,
  'jQuery': <SiJquery />,
  'Bootstrap': <SiBootstrap />,
  'Dynamic Programming': <FaChartLine />
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
    logo: './assets/realEstate.png',
    status: 'Completed',
    year: '2024'
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
    logo: './assets/RFS.png',
    status: 'Completed',
    year: '2023'
  }
];

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const sectionRef = useRef(null);

  // Get unique categories from projects
  const categories = ['All', ...new Set(projects.map(project => project.category))];

  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '50px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleFilterChange = (category) => {
    setActiveFilter(category);
  };

  return (
    <section 
      className={`projects-section ${isVisible ? 'animate-in' : ''}`} 
      id="projects"
      ref={sectionRef}
      role="region"
      aria-label="Featured projects and work"
    >
      <SectionTitle subtitle="Featured projects showcasing my technical expertise">
        Featured Projects
      </SectionTitle>

      {/* Category Filter */}
      <div className="project-filters">
        {/* <div className="filter-label">
          <span>Filter by category:</span>
        </div> */}
        <div className="filter-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
              onClick={() => handleFilterChange(category)}
              aria-label={`Filter projects by ${category}`}
            >
              {category}
              {category !== 'All' && (
                <span className="project-count">
                  {projects.filter(p => p.category === category).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <article 
            key={`${project.title}-${project.category}`} 
            className="project-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="project-header">
              <div className="project-logo-container">
                <img
                  src={project.logo}
                  alt={`${project.title} logo`}
                  className="project-logo"
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
                  <h4>Technologies Used:</h4>
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

                <div className="project-status">
                  <span className={`status-badge ${project.status.toLowerCase()}`}>
                    {project.status}
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Show message when no projects match filter */}
      {filteredProjects.length === 0 && (
        <div className="no-projects-message">
          <p>No projects found in the "{activeFilter}" category.</p>
        </div>
      )}

      {/* Call to action */}
      <div className="projects-cta">
        <p>Want to see more projects or discuss a collaboration?</p>
        <a href="#contact" className="cta-button">
          Let's Connect
        </a>
      </div>
    </section>
  );
};

export default Projects;