import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaCode, FaServer, FaTools, FaChartLine, FaLaptopCode,
  FaJava, FaPython, FaDatabase, FaJs, FaDocker, FaGitAlt
} from 'react-icons/fa';
import { SiRedis, SiPrometheus } from 'react-icons/si';
import SectionTitle from '../../components/common/Section/SectionTitle';
import './Skills.css';
import { fadeUp, scaleIn, staggerContainer, skillItemFade, skillListStagger } from '../../utils/motionVariants';

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
  expert:       { min: 90, label: 'Expert',       className: 'expert' },
  advanced:     { min: 75, label: 'Advanced',     className: 'advanced' },
  proficient:   { min: 60, label: 'Proficient',   className: 'proficient' },
  intermediate: { min: 0,  label: 'Intermediate', className: 'intermediate' }
};

const SKILLS_DATA = [
  {
    title: 'Core Languages', icon: FaCode, color: 'var(--hero-primary)',
    skills: [
      { name: 'Java (Spring Boot, JSF)', level: 95, years: '7+ years' },
      { name: 'SQL (Oracle, MySQL)',      level: 90, years: '7+ years' },
      { name: 'JavaScript (Vue)',         level: 80, years: '3 years' },
      { name: 'Python (FastAPI)',         level: 70, years: '2 years' }
    ]
  },
  {
    title: 'IDEs & Platforms', icon: FaLaptopCode, color: 'var(--hero-warning)',
    skills: [
      { name: 'IntelliJ', level: 95, years: '5 years' },
      { name: 'VS Code',  level: 90, years: '4 years' },
      { name: 'Eclipse',  level: 80, years: '3 years' },
      { name: 'JBoss',    level: 70, years: '2 years' }
    ]
  },
  {
    title: 'DevOps & Monitoring', icon: FaTools, color: 'var(--hero-accent)',
    skills: [
      { name: 'Git',    level: 95, years: '7+ years' },
      { name: 'Maven',  level: 90, years: '7+ years' },
      { name: 'Jira',   level: 90, years: '7+ years' },
      { name: 'Docker', level: 80, years: '3 years' }
    ]
  },
  {
    title: 'Backend & API Tools', icon: FaServer, color: 'var(--hero-secondary)',
    skills: [
      { name: 'Swagger & OpenAPI', level: 85, years: '3 years' },
      { name: 'Liquibase',         level: 85, years: '3 years' },
      { name: 'RabbitMQ',          level: 80, years: '3 years' },
      { name: 'JUnit & Mockito',   level: 80, years: '3 years' },
      { name: 'Redis',             level: 70, years: '2 years' },
      { name: 'Firebase',          level: 70, years: '1 year' }
    ]
  },
  {
    title: 'Data Science & GIS', icon: FaChartLine, color: 'var(--hero-success)',
    skills: [
      { name: 'BeautifulSoup', level: 80, years: '2 years' },
      { name: 'Selenium',      level: 80, years: '2 years' },
      { name: 'ArcGIS Pro',    level: 70, years: '1 year' },
      { name: 'Spacy',         level: 70, years: '2 years' },
      { name: 'NLTK',          level: 70, years: '2 years' }
    ]
  }
];

const getProficiency = (level) =>
  Object.values(PROFICIENCY_CONFIG).find((c) => level >= c.min) || PROFICIENCY_CONFIG.intermediate;

const sortSkillsByLevel = (skills) => [...skills].sort((a, b) => b.level - a.level);

const DisplayModeToggle = ({ displayMode, onModeChange }) => (
  <div className="skill-display-toggle">
    <div className="toggle-track">
      <div className={`toggle-thumb ${displayMode === 'level' ? 'right' : 'left'}`} />
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
  </div>
);

const SkillItem = ({ skill, displayMode }) => {
  const proficiency = getProficiency(skill.level);
  const SkillIcon = SKILL_ICONS[skill.name];
  const displayValue = displayMode === 'experience' ? skill.years : proficiency.label;

  return (
    <motion.li className="skill-item" variants={skillItemFade}>
      <div className="skill-info">
        {SkillIcon && (
          <span className="skill-icon" aria-hidden="true">
            <SkillIcon />
          </span>
        )}
        <span className="skill-name">{skill.name}</span>
      </div>
      <span className={`skill-level ${proficiency.className}`}>{displayValue}</span>
    </motion.li>
  );
};

const SkillGroup = ({ group, displayMode }) => {
  const CategoryIcon = group.icon;
  const sortedSkills = sortSkillsByLevel(group.skills);

  return (
    <motion.div className="skills-group" style={{ '--category-color': group.color }} variants={scaleIn}>
      <header className="category-header">
        <span className="category-icon" aria-hidden="true">
          <CategoryIcon />
        </span>
        <h3>{group.title}</h3>
      </header>
      <motion.ul className="skills-list" variants={skillListStagger}>
        {sortedSkills.map((skill) => (
          <SkillItem key={skill.name} skill={skill} displayMode={displayMode} />
        ))}
      </motion.ul>
    </motion.div>
  );
};

const Skills = () => {
  const [displayMode, setDisplayMode] = useState('experience');

  return (
    <section id="skills" className="skills-section" aria-labelledby="skills-title">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeUp}
      >
        <SectionTitle subtitle="Technologies I use to build scalable solutions">
          Technical Skills
        </SectionTitle>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeUp}
      >
        <DisplayModeToggle displayMode={displayMode} onModeChange={setDisplayMode} />
      </motion.div>

      <motion.div
        className="skills-container"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        variants={staggerContainer}
      >
        {SKILLS_DATA.map((group) => (
          <SkillGroup key={group.title} group={group} displayMode={displayMode} />
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
