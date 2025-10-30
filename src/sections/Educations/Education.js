import React, { useEffect, useRef, useState } from 'react';
import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt, FaAward } from 'react-icons/fa';
import SectionTitle from '../../components/common/Section/SectionTitle';
import './Education.css';
import ulLogo from '../../assets/educations/ul.png';


const education = [
  {
    degree: "Master's degree, GIS and Data Science",
    school: 'Lebanese University',
    location: 'Beirut, Lebanon',
    date: '2022 – 2024',
    type: 'Master\'s',
    level: 'Graduate',
    details: [
      'Relevant courses: Python, Deep Learning, Big Data, NLP, Remote Sensing, Geodatabase, Spatial Analysis'
    ],
    logo: ulLogo,
    current: false
  },
  {
    degree: "Bachelor's degree, Computer Science",
    school: 'Lebanese University',
    location: 'Beirut, Lebanon',
    date: '2016 – 2019',
    type: 'Bachelor\'s',
    level: 'Undergraduate',
    details: [
      'Relevant courses: Java, PHP, Design Patterns, Data Structures, Database, Operating Systems, Parallel Programming, System Administration'
    ],
    logo: ulLogo,
    current: false
  }
];

function getInitials(name = '') {
  const parts = name.trim().split(/\s+/);
  return parts.slice(0, 2).map(w => (w[0] || '').toUpperCase()).join('');
}

const Education = () => {
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
      className={`education-section ${isVisible ? 'animate-in' : ''}`} 
      id="education"
      ref={sectionRef}
      role="region"
      aria-label="Educational background and qualifications"
    >
      <SectionTitle subtitle="My academic journey and educational qualifications">
        Education
      </SectionTitle>

      <div className="education-timeline">
        {education.map((edu, index) => (
          <article
            key={`${edu.school}-${edu.degree}-${edu.date}-${index}`}
            className="education-item"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="timeline-dot">
              <FaGraduationCap />
            </div>

            <div className="education-card">
              <div className="education-header">
                <div className="education-logo-section">
                  {edu.logo ? (
                    <img
                      className="education-logo"
                      src={edu.logo}
                      alt={`${edu.school} logo`}
                      loading="lazy"
                    />
                  ) : (
                    <span className="education-logo education-initials">
                      {getInitials(edu.school)}
                    </span>
                  )}
                  <div className="degree-badge">
                    <FaAward />
                    <span>{edu.type}</span>
                  </div>
                </div>

                <div className="education-info">
                  <h3 className="degree-title">{edu.degree}</h3>
                  <h4 className="school-name">{edu.school}</h4>
                  
                  <div className="education-meta">
                    <div className="meta-item">
                      <FaCalendarAlt />
                      <span>{edu.date}</span>
                    </div>
                    <div className="meta-item">
                      <FaMapMarkerAlt />
                      <span>{edu.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {edu.details && edu.details.length > 0 && (
                <div className="education-details">
                  <h5>Relevant Coursework:</h5>
                  <ul className="course-list">
                    {edu.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Education summary */}
      <div className="education-summary">
        <div className="summary-item">
          <div className="summary-icon">
            <FaGraduationCap />
          </div>
          <div className="summary-content">
            <h4>Master's Degree</h4>
            <p>GIS and Data Science</p>
          </div>
        </div>
        <div className="summary-item">
          <div className="summary-icon">
            <FaAward />
          </div>
          <div className="summary-content">
            <h4>7+ Years</h4>
            <p>Academic Excellence</p>
          </div>
        </div>
        <div className="summary-item">
          <div className="summary-icon">
            <FaMapMarkerAlt />
          </div>
          <div className="summary-content">
            <h4>Lebanese University</h4>
            <p>Prestigious Institution</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;