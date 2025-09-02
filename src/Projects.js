import React, { useEffect } from 'react';
import './Projects.css';
import SectionTitle from './components/SectionTitle.js';

const projects = [
  {
    title: 'Real Estate Price Prediction (Lebanon)',
    description: [
      'Implemented a machine learning model to predict real estate prices.',
      'Built a FastAPI backend, scraped property data with BeautifulSoup & Selenium.',
      'Applied Optuna for hyperparameter tuning and model optimization.'
    ],
    tech: ['Python', 'FastAPI', 'BeautifulSoup', 'Selenium', 'Optuna'],
    logo: './assets/realEstate.png'
  },
  {
    title: 'Base Station Configuration',
    description: [
      'Developed an Antenna Recommendation System using Laravel.',
      'Optimized antenna filtration with dynamic programming, reducing computation by 99.57%.'
    ],
    tech: ['PHP (Laravel)', 'jQuery', 'Bootstrap', 'Dynamic Programming'],
    logo: './assets/RFS.png'
  }
];

const Projects = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.project-card').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="projects-section" id="projects">
      <h2></h2>
      <SectionTitle subtitle="My Recent">
        Projects
      </SectionTitle>
      <div className="projects-list">
        {projects.map((project, i) => (
          <div className="project-card" key={i}>
            <img
              src={project.logo}
              alt={`${project.title} logo`}
              className="project-logo"
            />
            <h3>{project.title}</h3>
            <ul className="description-list">
              {project.description.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
            <ul className="tech-list">
              {project.tech.map((t, idx) => (
                <li key={idx}>{t}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
