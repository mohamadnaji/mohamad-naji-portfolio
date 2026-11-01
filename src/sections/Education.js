import Icon from '../components/Icon';
import SectionHeading from '../components/SectionHeading';
import { EDUCATION } from '../data/portfolio';

export default function Education() {
  return (
    <section className="band alt" id="education">
      <div className="wrap">
        <SectionHeading eyebrow="education" title="My academic journey and qualifications." />
        <div className="edu-grid">
          {EDUCATION.map((e, i) => (
            <article className="spot edu rv" key={e.degree} style={{ '--d': `${i * 0.1}s` }}>
              <div className="edu-top">
                <div>
                  <span className="lvl"><Icon name="cap" />{e.type} · {e.level}</span>
                  <h3>{e.degree}</h3>
                </div>
                <img className="edu-logo" src={e.logo} alt={`${e.school} logo`} width="52" height="52" loading="lazy" />
              </div>
              <div className="school">{e.school}</div>
              <div className="em">
                <span><Icon name="calendar" />{e.date}</span>
                <span><Icon name="pin" />{e.location}</span>
              </div>
              <div>
                <div className="courses-title">Relevant coursework</div>
                <div className="courses">{e.courses.map((c) => <span key={c}>{c}</span>)}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
