import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt, FaAward } from 'react-icons/fa';
import SectionTitle from '../../components/common/Section/SectionTitle';
import './Education.css';
import ulLogo from '../../assets/educations/ul.png';
import { fadeUp, scaleIn, staggerContainer } from '../../utils/motionVariants';

const education = [
  {
    degree: "Master's degree, GIS and Data Science",
    school: 'Lebanese University',
    location: 'Beirut, Lebanon',
    date: '2022 – 2024',
    type: "Master's",
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
    type: "Bachelor's",
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
  return parts.slice(0, 2).map((w) => (w[0] || '').toUpperCase()).join('');
}

const Education = () => {
  return (
    <section
      className="education-section"
      id="education"
      role="region"
      aria-label="Educational background and qualifications"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeUp}
      >
        <SectionTitle subtitle="My academic journey and educational qualifications">
          Education
        </SectionTitle>
      </motion.div>

      <motion.div
        className="education-timeline"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        {education.map((edu, index) => (
          <motion.article
            key={`${edu.school}-${edu.degree}-${edu.date}-${index}`}
            className="education-item"
            variants={scaleIn}
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
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        className="education-summary"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        {[
          { icon: <FaGraduationCap />, title: "Master's Degree", sub: 'GIS and Data Science' },
          { icon: <FaAward />,         title: '7+ Years',         sub: 'Academic Excellence' },
          { icon: <FaMapMarkerAlt />,  title: 'Lebanese University', sub: 'Prestigious Institution' }
        ].map((item) => (
          <motion.div key={item.title} className="summary-item" variants={scaleIn}>
            <div className="summary-icon">{item.icon}</div>
            <div className="summary-content">
              <h4>{item.title}</h4>
              <p>{item.sub}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Education;
