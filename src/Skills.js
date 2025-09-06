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
import { SiSpring, SiRedis, SiPrometheus } from 'react-icons/si';
import SectionTitle from './components/SectionTitle';
import './Skills.css';

const SKILL_ICONS = {
  'Java (Spring Boot, JSF)': <FaJava />,
  'Python (FastAPI)': <FaPython />,
  'SQL (Oracle, MySQL)': <FaDatabase />,
  'JavaScript (JQuery, Angular)': <FaJs />,
  'Docker': <FaDocker />,
  'Git': <FaGitAlt />,
  'Redis': <SiRedis />,
  'Prometheus': <SiPrometheus />
};

const SKILLS_DATA = [
  {
    category: 'Core Languages & Frameworks',
    icon: <FaCode />,
    color: 'var(--hero-primary)',
    items: [
      { name: 'Java (Spring Boot, JSF)', level: 95 },
      { name: 'Python (FastAPI)', level: 90 },
      { name: 'SQL (Oracle, MySQL)', level: 88 },
      { name: 'JavaScript (JQuery, Angular)', level: 85 }
    ]
  },
  {
    category: 'Backend & API Tools',
    icon: <FaServer />,
    color: 'var(--hero-secondary)',
    items: [
      { name: 'RabbitMQ', level: 85 },
      { name: 'Redis', level: 88 },
      { name: 'Firebase', level: 80 },
      { name: 'Swagger & OpenAPI', level: 90 },
      { name: 'JUnit & Mockito', level: 92 },
      { name: 'Apache Camel', level: 78 },
      { name: 'Liquibase', level: 82 },
      { name: 'MapStruct', level: 80 }
    ]
  },
  {
    category: 'DevOps & Monitoring',
    icon: <FaTools />,
    color: 'var(--hero-accent)',
    items: [
      { name: 'Docker', level: 90 },
      { name: 'Git', level: 95 },
      { name: 'Maven', level: 88 },
      { name: 'Jira', level: 85 },
      { name: 'Prometheus', level: 82 },
      { name: 'Fluentd', level: 75 },
      { name: 'Grafana', level: 80 }
    ]
  },
  {
    category: 'Data Science & GIS',
    icon: <FaChartLine />,
    color: 'var(--hero-success)',
    items: [
      { name: 'Spacy', level: 80 },
      { name: 'NLTK', level: 78 },
      { name: 'ArcGIS Pro', level: 85 },
      { name: 'BeautifulSoup', level: 88 },
      { name: 'Selenium', level: 82 }
    ]
  },
  {
    category: 'IDEs & Platforms',
    icon: <FaLaptopCode />,
    color: 'var(--hero-warning)',
    items: [
      { name: 'IntelliJ', level: 95 },
      { name: 'Eclipse', level: 88 },
      { name: 'JBoss', level: 85 }
    ]
  }
];

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedItems, setAnimatedItems] = useState(new Set());
  const [counters, setCounters] = useState({ years: 0, technologies: 0 });
  const [skillDisplayMode, setSkillDisplayMode] = useState('percentage'); // 'percentage', 'experience', 'proficiency'
  const sectionRef = useRef(null);

  // Counter animation
  const animateCounter = (target, key, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCounters(prev => ({ ...prev, [key]: target }));
        clearInterval(timer);
      } else {
        setCounters(prev => ({ ...prev, [key]: Math.floor(start) }));
      }
    }, 16);
  };

  useEffect(() => {
    const isMobile = window.innerWidth < 600;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Start counters
          setTimeout(() => {
            animateCounter(7, 'years', 2000);
            animateCounter(30, 'technologies', 2500);
          }, 300);

          // Animate skill bars with stagger
          setTimeout(() => {
            SKILLS_DATA.forEach((category, categoryIndex) => {
              category.items.forEach((skill, skillIndex) => {
                setTimeout(() => {
                  setAnimatedItems(prev => new Set([...prev, `${categoryIndex}-${skillIndex}`]));
                }, (categoryIndex * 200) + (skillIndex * 100));
              });
            });
          }, 800);
        }
      },
      {

      threshold: isMobile ? 0.01 : 0.2,
      rootMargin: isMobile ? '0px' : '50px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getSkillDisplay = (skill, mode) => {
    switch (mode) {
      case 'experience':
        return skill.experience;
      case 'proficiency':
        return skill.proficiency;
      default:
        return `${skill.level}%`;
    }
  };

  const getProficiencyClass = (proficiency) => {
    switch (proficiency) {
      case 'Expert': return 'expert';
      case 'Advanced': return 'advanced';
      case 'Proficient': return 'proficient';
      default: return 'intermediate';
    }
  };

  return (
    <section 
      className={`skills-section ${isVisible ? 'animate-in' : ''}`} 
      id="skills"
      ref={sectionRef}
      role="region"
      aria-label="Technical skills and expertise"
    >
      {/* Background decoration */}
      <div className="skills-bg-decoration" aria-hidden="true">
        <div className="skill-particle"></div>
        <div className="skill-particle"></div>
        <div className="skill-particle"></div>
      </div>

      <SectionTitle subtitle="Technologies I use to build amazing solutions">
        Technical Skills
      </SectionTitle>

      {/* Skills summary at top with animated counters */}
      <div className="skills-summary">
        <div className="summary-card">
          <h4>{counters.years}+</h4>
          <p>Years Experience</p>
        </div>
        <div className="summary-card">
          <h4>{counters.technologies}+</h4>
          <p>Technologies Mastered</p>
        </div>
        <div className="summary-card">
          <h4>Full Stack</h4>
          <p>Development Expertise</p>
        </div>
      </div>

      {/* Display mode toggle */}
      <div className="skill-display-toggle">
        <span>View skills by:</span>
        <div className="toggle-buttons">
          <button 
            className={skillDisplayMode === 'percentage' ? 'active' : ''}
            onClick={() => setSkillDisplayMode('percentage')}
          >
            Proficiency %
          </button>
          <button 
            className={skillDisplayMode === 'experience' ? 'active' : ''}
            onClick={() => setSkillDisplayMode('experience')}
          >
            Experience
          </button>
          <button 
            className={skillDisplayMode === 'proficiency' ? 'active' : ''}
            onClick={() => setSkillDisplayMode('proficiency')}
          >
            Level
          </button>
        </div>
      </div>

      <div className="skills-container">
        {SKILLS_DATA.map((category, categoryIndex) => (
          <div 
            key={categoryIndex} 
            className="skills-group"
            style={{ 
              animationDelay: `${categoryIndex * 0.15}s`,
              '--category-color': category.color
            }}
          >
            <div className="category-header">
              <div className="category-icon">
                {category.icon}
              </div>
              <h3 className="category-title">{category.category}</h3>
            </div>
            
            <div className="skills-list">
              {category.items.map((skill, skillIndex) => {
                const skillKey = `${categoryIndex}-${skillIndex}`;
                const isAnimated = animatedItems.has(skillKey);
                const skillIcon = SKILL_ICONS[skill.name];
                
                return (
                  <div key={skillIndex} className="skill-item">
                    <div className="skill-header">
                      <div className="skill-info">
                        {skillIcon && (
                          <span className="skill-icon" aria-hidden="true">
                            {skillIcon}
                          </span>
                        )}
                        <span className="skill-name">{skill.name}</span>
                      </div>
                      <span 
                        className={`skill-level ${skillDisplayMode === 'proficiency' ? getProficiencyClass(skill.proficiency) : ''}`}
                      >
                        {getSkillDisplay(skill, skillDisplayMode)}
                      </span>
                    </div>
                    
                    {skillDisplayMode === 'percentage' && (
                      <div className="skill-bar">
                        <div 
                          className={`skill-progress ${isAnimated ? 'animate' : ''}`}
                          style={{ 
                            '--skill-level': `${skill.level}%`,
                            '--skill-color': category.color
                          }}
                          role="progressbar"
                          aria-valuenow={skill.level}
                          aria-valuemin="0"
                          aria-valuemax="100"
                          aria-label={`${skill.name} proficiency: ${skill.level}%`}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;