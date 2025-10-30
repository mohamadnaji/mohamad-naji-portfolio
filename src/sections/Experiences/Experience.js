import React, { useEffect, useRef, useState } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaBriefcase } from 'react-icons/fa';
import SectionTitle from '../../components/common/Section/SectionTitle';
import './Experience.css';
import nakisaLogo from '../../assets/experiences/nakisa.png';
import cbsLogo from '../../assets/experiences/cbs.png';
import montyLogo from '../../assets/experiences/mymonty.png';
import citsLogo from '../../assets/experiences/cits.png';

const experience = [
  {
    title: 'Software Developer',
    company: 'Nakisa Inc',
    date: 'May 2025 – Present',
    location: 'Montreal, QC, Canada',
    type: 'Full-time',
    logo: nakisaLogo,
    current: true,
    details: [
      'Finance Department – building and maintaining financial applications.',
      'Backend services with Java Spring Boot.',
      'Frontend development with Vue.js and Quasar Framework.',
      'Cross-functional collaboration to deliver high-quality, performant software.'
    ]
  },
  {
    title: 'Senior Full Stack Developer',
    company: 'MyMonty (Monty Mobile)',
    date: 'Nov 2022 – Jun 2025',
    location: 'Remote',
    type: 'Contract',
    logo: montyLogo,
    current: false,
    details: [
      'Created 30+ RESTful APIs with Java Spring Boot, OpenAPI, and Swagger.',
      'Developed dynamic microservices; integrated Redis for high-speed performance.',
      'Used Java 17/21, RabbitMQ, Firebase, and Docker for scalable backends.',
      'Implemented secure, test-driven code with JUnit and Mockito.',
      'Worked in Agile sprints with Jira and Git, delivering card and exchange integrations.'
    ]
  },
  {
    title: 'Software Developer',
    company: 'Capital Banking Solutions',
    date: 'Oct 2021 – Oct 2022',
    location: 'Lebanon',
    type: 'Full-time',
    logo: cbsLogo,
    current: false,
    details: [
      'Developed enterprise APIs using Oracle ADF and Spring Boot.',
      'Designed and implemented Oracle PL/SQL databases.',
      'Led code reviews, reducing bug rates by 25%.'
    ]
  },
  {
    title: 'Software Engineer',
    company: 'Cedar IT Services',
    date: 'Nov 2019 – Aug 2021',
    location: 'Lebanon',
    type: 'Full-time',
    logo: citsLogo,
    current: false,
    details: [
      'Delivered banking solutions for Banque du Liban, Al Rajhi Bank, and others.',
      'Engineered features with JSF and Spring Boot to meet client specs.',
      'Enhanced data management with Spring Data and Oracle.',
      'Maintained and improved legacy systems across multiple environments.'
    ]
  }
];

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  return (
    <section 
      className={`experience-section ${isVisible ? 'animate-in' : ''}`} 
      id="experience"
      ref={sectionRef}
      role="region"
      aria-label="Professional work experience"
    >
      <SectionTitle subtitle="My professional journey and key achievements">
        Work Experience
      </SectionTitle>

      <div className="timeline">
        {experience.map((item, index) => (
          <div 
            className={`timeline-item ${item.current ? 'current-role' : ''}`}
            key={index}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="timeline-dot">
              <FaBriefcase />
            </div>
            
            <div className="timeline-content">
              <div className="experience-header">
                <div className="company-info">
                  <img
                    src={item.logo}
                    alt={`${item.company} logo`}
                    className="company-logo"
                  />
                  <div className="company-details">
                    <h3 className="job-title">{item.title}</h3>
                    <h4 className="company-name">{item.company}</h4>
                    {item.current && <span className="current-badge">Current</span>}
                  </div>
                </div>
                
                <div className="job-meta">
                  <div className="job-info">
                    <FaCalendarAlt />
                    <span>{item.date}</span>
                  </div>
                  <div className="job-info">
                    <FaMapMarkerAlt />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>

              <div className="experience-details">
                <ul>
                  {item.details.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;