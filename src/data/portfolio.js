// All portfolio content lives here. Edit this file to update the site.
import nakisaLogo from '../assets/experiences/nakisa.png';
import mymontyLogo from '../assets/experiences/mymonty.png';
import cbsLogo from '../assets/experiences/cbs.png';
import citsLogo from '../assets/experiences/cits.png';
import ulLogo from '../assets/educations/ul.png';

export const CV_URL = '/Mohamad_Naji_CV.pdf';

export const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export const SOCIALS = [
  { label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/in/mohamad-naji-b84310174/' },
  { label: 'GitHub', icon: 'github', href: 'https://github.com/mohamadnaji' },
  { label: 'WhatsApp', icon: 'whatsapp', href: 'https://wa.me/15146062270' },
  { label: 'Telegram', icon: 'send', href: 'https://t.me/mohamadnaji1' },
];

export const ROLES = ['Developer', 'Programmer', 'Problem Solver', 'Creative Coder', 'Continuous Learner', 'Builder of Ideas'];

export const STACK = [
  'Java 17/21', 'Spring Boot', 'Vue.js', 'Quasar', 'Oracle', 'MySQL', 'PL/SQL', 'Redis', 'RabbitMQ',
  'Docker', 'FastAPI', 'Python', 'OpenAPI', 'JUnit & Mockito', 'Liquibase', 'ArcGIS Pro', 'Firebase', 'Prometheus',
];

export const FACTS = [
  ['Currently', 'Full Stack Developer, Nakisa Inc'],
  ['Focus', 'Backend, APIs and Vue/Quasar UIs'],
  ['Core stack', 'Java, Spring Boot, Python, SQL'],
  ['Education', 'M.Sc. GIS & Data Science'],
];

export const STATS = [
  { value: 7, suffix: '+', label: 'Years Experience' },
  { value: 4, suffix: '', label: 'Companies' },
  { value: 10, suffix: '+', label: 'Projects Built' },
];

export const SERVICES = [
  {
    icon: 'coffee', color: '#F89820', title: 'Enterprise Java Development',
    description: 'Building robust, scalable enterprise applications using the Java ecosystem. 7+ years of experience with Spring Boot, JSF, and microservices architecture.',
    features: ['Spring Boot & Spring Framework', 'JSF Enterprise Applications', 'RESTful API Development', 'Microservices Architecture'],
  },
  {
    icon: 'db', color: 'var(--accent)', title: 'Database & Backend Systems',
    description: 'Designing and optimizing database architectures with SQL expertise. Building high-performance backend systems with advanced caching and message queuing.',
    features: ['Oracle & MySQL Database Design', 'SQL Query Optimization', 'Redis Caching Solutions', 'RabbitMQ Message Queuing'],
  },
  {
    icon: 'terminal', color: '#5B9BD5', title: 'Python API & Automation',
    description: 'Developing fast, modern APIs with FastAPI and automating complex workflows. Expertise in web scraping, data processing, and Python-based solutions.',
    features: ['FastAPI Development', 'Web Scraping (Selenium, BeautifulSoup)', 'Workflow Automation', 'Firebase Integration'],
  },
  {
    icon: 'globe', color: 'var(--accent-2)', title: 'GIS & Data Science',
    description: 'Geospatial analysis and data visualization with ESRI certification. Expertise in ArcGIS Pro, spatial data processing, and integrating GIS with modern web applications.',
    features: ['ArcGIS Pro & ESRI Tools', 'Spatial Data Analysis & Mapping', 'Web Scraping & Data Extraction', 'NLP & Text Processing (spaCy, NLTK)'],
  },
  {
    icon: 'layers', color: '#A78BFA', title: 'Full Stack Development',
    description: 'Building complete web applications from frontend to backend. Proficient in JavaScript frameworks, responsive design, and modern development practices.',
    features: ['Vue.js Applications', 'JavaScript Development', 'Responsive UI/UX Design', 'Single Page Applications'],
  },
  {
    icon: 'box', color: '#EC6FA8', title: 'DevOps & Monitoring',
    description: 'Implementing CI/CD pipelines, containerization, and monitoring solutions. Ensuring application reliability with modern DevOps practices.',
    features: ['Docker Containerization', 'Git Version Control', 'Prometheus Monitoring', 'Swagger & OpenAPI Documentation'],
  },
];

export const SKILL_GROUPS = [
  {
    title: 'Core Languages', icon: 'code', color: 'var(--accent)',
    skills: [['Java (Spring Boot, JSF)', 95, '7+ years'], ['SQL (Oracle, MySQL)', 90, '7+ years'], ['JavaScript (Vue)', 80, '3 years'], ['Python (FastAPI)', 70, '2 years']],
  },
  {
    title: 'DevOps & Monitoring', icon: 'box', color: '#A78BFA',
    skills: [['Git', 95, '7+ years'], ['Maven', 90, '7+ years'], ['Jira', 90, '7+ years'], ['Docker', 80, '3 years']],
  },
  {
    title: 'Backend & API Tools', icon: 'server', color: '#5BC0EB',
    skills: [['Swagger & OpenAPI', 85, '3 years'], ['Liquibase', 85, '3 years'], ['RabbitMQ', 80, '3 years'], ['JUnit & Mockito', 80, '3 years'], ['Redis', 70, '2 years'], ['Firebase', 70, '1 year']],
  },
  {
    title: 'Data Science & GIS', icon: 'chart', color: 'var(--accent-2)',
    skills: [['BeautifulSoup', 80, '2 years'], ['Selenium', 80, '2 years'], ['ArcGIS Pro', 70, '1 year'], ['spaCy', 70, '2 years'], ['NLTK', 70, '2 years']],
  },
];

export const levelLabel = (v) => {
  if (v >= 90) return 'Expert';
  if (v >= 75) return 'Advanced';
  if (v >= 60) return 'Proficient';
  return 'Intermediate';
};

export const JOBS = [
  {
    title: 'Full Stack Developer', company: 'Nakisa Inc', logo: nakisaLogo, current: true,
    date: 'May 2025 – Present', location: 'Montreal, QC, Canada', type: 'Full-time',
    details: [
      'Finance Department – building and maintaining financial applications end to end, across backend and frontend.',
      'Backend services and REST APIs with Java and Spring Boot.',
      'User interfaces with Vue.js and the Quasar framework.',
      'Cross-functional collaboration to deliver high-quality, performant software.',
    ],
  },
  {
    title: 'Senior Full Stack Developer', company: 'MyMonty (Monty Mobile)', logo: mymontyLogo,
    date: 'Nov 2022 – Jun 2025', location: 'Remote', type: 'Contract',
    details: [
      'Created 30+ RESTful APIs with Java Spring Boot, OpenAPI, and Swagger.',
      'Developed dynamic microservices; integrated Redis for high-speed performance.',
      'Used Java 17/21, RabbitMQ, Firebase, and Docker for scalable backends.',
      'Implemented secure, test-driven code with JUnit and Mockito.',
      'Worked in Agile sprints with Jira and Git, delivering card and exchange integrations.',
    ],
  },
  {
    title: 'Software Developer', company: 'Capital Banking Solutions', logo: cbsLogo,
    date: 'Oct 2021 – Oct 2022', location: 'Lebanon', type: 'Full-time',
    details: [
      'Developed enterprise code using Oracle ADF and Spring Boot.',
      'Designed and implemented Oracle PL/SQL databases.',
      'Enhanced code through reviews, reducing bug rates by 25%.',
    ],
  },
  {
    title: 'Software Engineer', company: 'Cedar IT Services', logo: citsLogo,
    date: 'Nov 2019 – Aug 2021', location: 'Lebanon', type: 'Full-time',
    details: [
      'Delivered banking solutions for Banque du Liban, Al Rajhi Bank, and others.',
      'Engineered features with JSF and Spring Boot to meet client specs.',
      'Enhanced data management with Spring Data and Oracle.',
      'Maintained and improved systems across multiple environments.',
    ],
  },
];

export const CATEGORY_COLORS = {
  'Full Stack & AI': '#F2B44C',
  'Machine Learning': '#A78BFA',
  'Web Development': 'var(--accent)',
  'Software Development': 'var(--accent-2)',
};

export const PROJECTS = [
  {
    title: 'SpendSense', tagline: 'Clarity to spend. Confidence to save.', featured: true,
    category: 'Full Stack & AI', icon: 'wallet', year: '2026', status: 'Completed', live: 'https://spendsense.app',
    description: [
      'Personal finance app for individuals and families: it sets aside bills and savings first, so the number you see is truly free to spend.',
      'Sense, an AI assistant on Llama 3.3 70B via Groq, writes a once-a-day dashboard brief and answers questions by looking up real bills and months through the app’s own endpoints, streamed over SSE.',
      'Month-end close for leftovers and overspending, analytics, savings goals, household members, guided onboarding, a notification center with email and browser push, paid plans with Stripe, and multiple languages.',
      'Built end to end on my own, with Claude as my AI pair programmer; deployed with Docker, Nginx and GitHub Actions to separate dev and prod environments on my own server.',
    ],
    tech: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Groq · Llama 3.3', 'Stripe', 'Docker', 'GitHub Actions', 'Claude'],
  },
  {
    title: 'Real Estate Price Prediction (Lebanon)', category: 'Machine Learning', icon: 'home', year: '2024', status: 'Completed',
    github: 'https://github.com/mohamadnaji/Real-Estate-Web-Scraping-Lebanon',
    description: [
      'Implemented a machine learning model to predict real estate prices.',
      'Built a FastAPI backend, scraped property data with BeautifulSoup & Selenium.',
      'Applied Optuna for hyperparameter tuning and model optimization.',
    ],
    tech: ['Python', 'FastAPI', 'BeautifulSoup', 'Selenium', 'Optuna'],
  },
  {
    title: 'Base Station Configuration', category: 'Web Development', icon: 'tower', year: '2019', status: 'Completed',
    github: 'https://github.com/mohamadnaji/base_station',
    description: [
      'Developed an Antenna Recommendation System using Laravel.',
      'Optimized antenna filtration with dynamic programming, reducing computation by 99.57%.',
    ],
    tech: ['PHP (Laravel)', 'jQuery', 'Bootstrap', 'Dynamic Programming'],
  },
  {
    title: 'Insurance Office Management System', category: 'Software Development', icon: 'shield', year: '2019', status: 'Completed',
    github: 'https://github.com/mohamadnaji/assure-jfx',
    description: [
      'Built a desktop application using JavaFX and SQL Server to automate insurance operations.',
      'Supports registration of agents, companies, and clients, along with management of contracts and payments.',
      'Enhanced productivity through an intuitive interface and streamlined data processing.',
    ],
    tech: ['Java', 'JavaFX', 'CSS', 'SQL Server'],
  },
  {
    title: 'Airline Reservation System', category: 'Software Development', icon: 'plane', year: '2022', status: 'Completed',
    github: 'https://github.com/mohamadnaji/Airplaine-System',
    description: [
      'Developed a university project to manage airline reservations, ticketing, and seat allocation.',
      'Enables staff to monitor flights, manage seat availability, and handle bookings efficiently.',
    ],
    tech: ['Java', 'JavaFX'],
  },
];

export const EDUCATION = [
  {
    degree: "Master's degree, GIS and Data Science", type: "Master's", level: 'Graduate',
    school: 'Lebanese University', logo: ulLogo, location: 'Beirut, Lebanon', date: '2022 – 2024',
    courses: ['Python', 'Deep Learning', 'Big Data', 'NLP', 'Remote Sensing', 'Geodatabase', 'Spatial Analysis'],
  },
  {
    degree: "Bachelor's degree, Computer Science", type: "Bachelor's", level: 'Undergraduate',
    school: 'Lebanese University', logo: ulLogo, location: 'Beirut, Lebanon', date: '2016 – 2019',
    courses: ['Java', 'PHP', 'Design Patterns', 'Data Structures', 'Database', 'Operating Systems', 'Parallel Programming', 'System Administration'],
  },
];

export const CONTACTS = [
  { icon: 'mail', label: 'Email', value: 'mohamadd.najii@gmail.com', href: 'mailto:mohamadd.najii@gmail.com', copy: true },
  { icon: 'phone', label: 'Phone', value: '+1 (514) 606-2270', href: 'tel:+15146062270', copy: true },
  { icon: 'linkedin', label: 'LinkedIn', value: 'in/mohamad-naji-b84310174', href: 'https://linkedin.com/in/mohamad-naji-b84310174', external: true },
  { icon: 'pin', label: 'Location', value: 'Montreal, QC' },
];
