import React, { useEffect } from 'react';
import './Education.css';

// If your logos are inside /public/assets, use the string path: "/assets/ul.png".
// If they're in src, import them:
// import ulLogo from '../assets/ul.png';

const education = [
  {
    degree: "Master's degree, GIS and Data Science",
    school: 'Lebanese University',
    location: 'Beirut, Lebanon',
    date: '2022 – 2024',
    details: [
      'Relevant courses: Python, Deep Learning, Big Data, NLP, Remote Sensing, Geodatabase, Spatial Analysis'
    ],
    // Use one of the following:
    logo: '/assets/ul.png',
    // logo: ulLogo,
  },
  {
    degree: "Bachelor's degree, Computer Science",
    school: 'Lebanese University',
    location: 'Beirut, Lebanon',
    date: '2016 – 2019',
    details: [
      'Relevant courses: Java, PHP, Design Patterns, Data Structures, Database, Operating Systems, Parallel Programming, System Administration'
    ],
    logo: '/assets/ul.png',
    // logo: ulLogo,
  }
];

function getInitials(name = '') {
  const parts = name.trim().split(/\s+/);
  return parts.slice(0, 2).map(w => (w[0] || '').toUpperCase()).join('');
}

export default function Education() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReduced =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const items = Array.from(document.querySelectorAll('.timeline-item'));

    // If reduced motion is preferred or IntersectionObserver isn't supported,
    // show everything immediately.
    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      items.forEach(el => el.classList.add('in-view'));
      return;
    }

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    items.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="education" aria-labelledby="education-title">
      <h2 id="education-title" className="section-title">Education</h2>

      <div className="timeline" role="list">
        {education.map((edu, idx) => {
          const key = `${edu.school}-${edu.degree}-${edu.date}-${idx}`;
          return (
            <article
              role="listitem"
              className="timeline-item"
              key={key}
              // Force stagger timing without relying on extra CSS selectors
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <div className="timeline-dot" aria-hidden="true" />

              <div className="card">
                <header className="edu-card-header">
                  {edu.logo ? (
                    <img
                      className="edu-logo"
                      src={edu.logo}
                      alt={`${edu.school} logo`}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <span className="edu-logo edu-initials" aria-hidden="true">
                      {getInitials(edu.school)}
                    </span>
                  )}

                  <div className="edu-heading">
                    <time className="edu-date">{edu.date}</time>
                    <h3 className="edu-degree">{edu.degree}</h3>
                    <div className="edu-meta">
                      <span className="edu-school">{edu.school}</span>
                      <span className="edu-sep" aria-hidden="true">•</span>
                      <span className="edu-location">{edu.location}</span>
                    </div>
                  </div>
                </header>

                {edu.details?.length > 0 && (
                  <ul className="edu-bullets">
                    {edu.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
