import React, { useEffect } from 'react';
import './Experience.css';

const experience = [
  {
    title: 'Software Developer',
    company: 'Nakisa Inc',
    date: 'May 2025 – Present (Montreal, QC, Canada)',
    logo: './assets/nakisa.png',
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
    date: 'Nov 2022 – Jun 2025 (Remote)',
    logo: './assets/mymonty.png',
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
    date: 'Oct 2021 – Oct 2022 (Lebanon)',
    logo: './assets/cbs.png',
    details: [
      'Developed enterprise APIs using Oracle ADF and Spring Boot.',
      'Designed and implemented Oracle PL/SQL databases.',
      'Led code reviews, reducing bug rates by 25%.'
    ]
  },
  {
    title: 'Software Engineer',
    company: 'Cedar IT Services',
    date: 'Nov 2019 – Aug 2021 (Lebanon)',
    logo: './assets/cits.png',
    details: [
      'Delivered banking solutions for Banque du Liban, Al Rajhi Bank, and others.',
      'Engineered features with JSF and Spring Boot to meet client specs.',
      'Enhanced data management with Spring Data and Oracle.',
      'Maintained and improved legacy systems across multiple environments.'
    ]
  }
];

const Experience = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = document.querySelectorAll('.timeline-item');
    items.forEach((el) => observer.observe(el));

    return () => {
      items.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="experience-section" id="experience">
      <h2>Experience</h2>
      <div className="timeline">
        {experience.map((item, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-dot" />
            <div className="timeline-content">
              <img
                src={item.logo}
                alt={`${item.company} logo`}
                className="company-logo company-logo-centered"
              />
              <h4>{item.company}</h4>
              <h3>{item.title}</h3>
              <span>{item.date}</span>
              <ul>
                {item.details.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
