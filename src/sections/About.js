import Counter from '../components/Counter';
import SectionHeading from '../components/SectionHeading';
import profile from '../assets/about/profile-about.png';
import { FACTS, STATS } from '../data/portfolio';

export default function About() {
  return (
    <section className="band" id="about">
      <div className="wrap">
        <SectionHeading eyebrow="about me" title="Turning complex problems into elegant solutions.">
          <p className="rv">Get to know me better: who I am, how I work, and what I care about in software.</p>
        </SectionHeading>
        <div className="about-grid">
          <div className="spot id-card rv">
            <div className="id-top">
              <img className="avatar" src={profile} alt="Mohamad Naji" width="72" height="72" loading="lazy" />
              <div><h3>Mohamad Naji</h3><p>Full Stack Developer · Montreal, QC</p></div>
            </div>
            <div className="facts">
              {FACTS.map(([k, v]) => <div key={k}><span>{k}</span><span>{v}</span></div>)}
            </div>
          </div>
          <div className="about-text">
            <p className="rv">
              I&apos;m <strong>Mohamad NAJI</strong>, a passionate Full Stack Developer with over <span className="hl">7 years of experience</span>{' '}
              building scalable backend systems, APIs, and cloud-native applications. I specialize in{' '}
              <span className="chip">Java, Spring Boot, Python, and SQL</span>, and I love turning complex problems into elegant solutions.
            </p>
            <p className="rv" style={{ '--d': '.1s' }}>
              Beyond code, I enjoy <span className="hl">mentoring junior developers</span>, optimizing performance, and exploring new tech stacks.
              Whether it&apos;s designing microservices or debugging legacy systems, I thrive on challenges that push the boundaries of what&apos;s possible.
            </p>
            <blockquote className="rv" style={{ '--d': '.15s' }}>Code is poetry, and I write it with precision.</blockquote>
            <div className="stats">
              {STATS.map((s, i) => (
                <div className="spot stat rv" key={s.label} style={{ '--d': `${0.05 + i * 0.1}s` }}>
                  <Counter value={s.value} suffix={s.suffix} /><span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
