import React, { useEffect, useRef, useState } from 'react';
import {
  FaCode,
  FaServer,
  FaTools,
  FaChartLine,
  FaLaptopCode,
  FaJava,
  FaPython,
  FaDatabase,
  FaJs,
  FaDocker,
  FaGitAlt
} from 'react-icons/fa';
import { SiRedis, SiPrometheus } from 'react-icons/si';
import SectionTitle from '../../components/common/Section/SectionTitle';
import './Skills.css';

/* ==========================================
 * CONSTANTS & CONFIGURATION
 * ========================================== */

const SKILL_ICONS = {
  'Java (Spring Boot, JSF)': FaJava,
  'Python (FastAPI)': FaPython,
  'SQL (Oracle, MySQL)': FaDatabase,
  'JavaScript (Vue)': FaJs,
  'Docker': FaDocker,
  'Git': FaGitAlt,
  'Redis': SiRedis,
  'Prometheus': SiPrometheus
};

const PROFICIENCY_CONFIG = {
  expert: { min: 90, label: 'Expert', className: 'expert' },
  advanced: { min: 75, label: 'Advanced', className: 'advanced' },
  proficient: { min: 60, label: 'Proficient', className: 'proficient' },
  intermediate: { min: 0, label: 'Intermediate', className: 'intermediate' }
};

const SKILLS_DATA = [
  {
    title: 'Core Languages',
    icon: FaCode,
    color: 'var(--hero-primary)',
    skills: [
      { name: 'Java (Spring Boot, JSF)', level: 95, years: '7+ years' },
      { name: 'SQL (Oracle, MySQL)', level: 90, years: '7+ years' },
      { name: 'JavaScript (Vue)', level: 80, years: '3 years' },
      { name: 'Python (FastAPI)', level: 70, years: '2 years' }
    ]
  },
  {
    title: 'IDEs & Platforms',
    icon: FaLaptopCode,
    color: 'var(--hero-warning)',
    skills: [
      { name: 'IntelliJ', level: 95, years: '5 years' },
      { name: 'VS Code', level: 90, years: '4 years' },
      { name: 'Eclipse', level: 80, years: '3 years' },
      { name: 'JBoss', level: 70, years: '2 years' }
    ]
  },
  {
    title: 'DevOps & Monitoring',
    icon: FaTools,
    color: 'var(--hero-accent)',
    skills: [
      { name: 'Git', level: 95, years: '7+ years' },
      { name: 'Maven', level: 90, years: '7+ years' },
      { name: 'Jira', level: 90, years: '7+ years' },
      { name: 'Docker', level: 80, years: '3 years' }
    ]
  },
  {
    title: 'Backend & API Tools',
    icon: FaServer,
    color: 'var(--hero-secondary)',
    skills: [
      { name: 'Swagger & OpenAPI', level: 85, years: '3 years' },
      { name: 'Liquibase', level: 85, years: '3 years' },
      { name: 'RabbitMQ', level: 80, years: '3 years' },
      { name: 'JUnit & Mockito', level: 80, years: '3 years' },
      { name: 'Redis', level: 70, years: '2 years' },
      { name: 'Firebase', level: 70, years: '1 year' }
    ]
  },
  {
    title: 'Data Science & GIS',
    icon: FaChartLine,
    color: 'var(--hero-success)',
    skills: [
      { name: 'BeautifulSoup', level: 80, years: '2 years' },
      { name: 'Selenium', level: 80, years: '2 years' },
      { name: 'ArcGIS Pro', level: 70, years: '1 year' },
      { name: 'Spacy', level: 70, years: '2 years' },
      { name: 'NLTK', level: 70, years: '2 years' }
    ]
  }
];

/* ==========================================
 * HELPER FUNCTIONS
 * ========================================== */

const getProficiency = (level) => {
  const entry = Object.values(PROFICIENCY_CONFIG).find(
    (config) => level >= config.min
  );
  return entry || PROFICIENCY_CONFIG.intermediate;
};

const sortSkillsByLevel = (skills) => {
  return [...skills].sort((a, b) => b.level - a.level);
};

/* ==========================================
 * SUB-COMPONENTS
 * ========================================== */

const DisplayModeToggle = ({ displayMode, onModeChange }) => (
  <div className="skill-display-toggle">
    <button
      className={displayMode === 'experience' ? 'active' : ''}
      onClick={() => onModeChange('experience')}
      aria-pressed={displayMode === 'experience'}
    >
      Experience
    </button>
    <button
      className={displayMode === 'level' ? 'active' : ''}
      onClick={() => onModeChange('level')}
      aria-pressed={displayMode === 'level'}
    >
      Proficiency
    </button>
  </div>
);

const SkillItem = ({ skill, displayMode }) => {
  const proficiency = getProficiency(skill.level);
  const SkillIcon = SKILL_ICONS[skill.name];
  const displayValue =
    displayMode === 'experience'
      ? skill.years
      : proficiency.label;

  return (
    <li className="skill-item">
      <div className="skill-info">
        {SkillIcon && (
          <span className="skill-icon" aria-hidden="true">
            <SkillIcon />
          </span>
        )}
        <span className="skill-name">{skill.name}</span>
      </div>
      <span className={`skill-level ${proficiency.className}`}>
        {displayValue}
      </span>
    </li>
  );
};

const SkillGroup = ({ group, displayMode }) => {
  const CategoryIcon = group.icon;
  const sortedSkills = sortSkillsByLevel(group.skills);

  return (
    <div
      className="skills-group"
      style={{ '--category-color': group.color }}
    >
      <header className="category-header">
        <span className="category-icon" aria-hidden="true">
          <CategoryIcon />
        </span>
        <h3>{group.title}</h3>
      </header>

      <ul className="skills-list">
        {sortedSkills.map((skill) => (
          <SkillItem
            key={skill.name}
            skill={skill}
            displayMode={displayMode}
          />
        ))}
      </ul>
    </div>
  );
};

/* ==========================================
 * MAIN COMPONENT
 * ========================================== */

const Skills = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [displayMode, setDisplayMode] = useState('experience');

  useEffect(() => {
    // Lower threshold for mobile and add rootMargin for earlier triggering
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { 
        threshold: 0.1,  // Reduced from 0.2 for mobile
        rootMargin: '50px' // Trigger 50px before element comes into view
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    // Fallback: Set visible after a delay if IntersectionObserver doesn't trigger
    const fallbackTimer = setTimeout(() => {
      if (!visible) {
        setVisible(true);
      }
    }, 1000);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      clearTimeout(fallbackTimer);
    };
  }, [visible]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className={`skills-section ${visible ? 'animate-in' : ''}`}
      aria-labelledby="skills-title"
    >
      <SectionTitle subtitle="Technologies I use to build scalable solutions">
        Technical Skills
      </SectionTitle>

      <DisplayModeToggle
        displayMode={displayMode}
        onModeChange={setDisplayMode}
      />

      <div className="skills-container">
        {SKILLS_DATA.map((group) => (
          <SkillGroup
            key={group.title}
            group={group}
            displayMode={displayMode}
          />
        ))}
      </div>
    </section>
  );
};

export default Skills;