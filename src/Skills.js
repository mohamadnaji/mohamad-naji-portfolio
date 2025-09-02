import './Skills.css';
import SectionTitle from './components/SectionTitle.js';
import React, { useEffect } from 'react';

const skills = [
  {
    category: 'Core Languages & Frameworks',
    items: [
      'Java (Spring Boot, JSF)',
      'Python (FastAPI)',
      'SQL (Oracle, MySQL)',
      'JavaScript (JQuery, Angular)',
    ],
  },
  {
    category: 'Backend & API Tools',
    items: [
      'RabbitMQ',
      'Redis',
      'Firebase',
      'Swagger & OpenAPI',
      'JUnit & Mockito',
      'Apache Camel',
      'Liquibase',
      'MapStruct',
    ],
  },
  {
    category: 'DevOps & Monitoring',
    items: [
      'Docker',
      'Git',
      'Maven',
      'Jira',
      'Prometheus',
      'Fluentd',
      'Grafana',
    ],
  },
  {
    category: 'Data Science & GIS',
    items: [
      'Spacy',
      'NLTK',
      'ArcGIS Pro',
      'BeautifulSoup',
      'Selenium',
    ],
  },
  {
    category: 'IDEs & Platforms',
    items: ['IntelliJ', 'Eclipse', 'JBoss'],
  },
];

const Skills = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.skills-group');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="skills-section" id="skills">
      
      <SectionTitle subtitle="My Technical Expertise">
        Skills
      </SectionTitle>
      <div className="skills-container">
        {skills.map((group, index) => (
          <div key={index} className="skills-group">
            <h3 className="skills-category">{group.category}</h3>
            <ul className="skills-list">
              {group.items.map((skill, i) => (
                <li key={i} className="skill-item">{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
