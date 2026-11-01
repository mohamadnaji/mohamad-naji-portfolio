import Icon from '../components/Icon';
import SectionHeading from '../components/SectionHeading';
import { JOBS } from '../data/portfolio';

export default function Experience() {
  return (
    <section className="band alt" id="experience">
      <div className="wrap">
        <SectionHeading eyebrow={<><span className="a">@Entity</span> <span className="a">@Table</span>(name = <span className="s">&quot;experience&quot;</span>)</>} title="My professional journey and key achievements.">
          <p className="rv">Banking platforms, fintech integrations and financial applications, from Lebanon to Montreal.</p>
        </SectionHeading>
        <div className="tl" id="timeline">
          <div className="tl-rail" aria-hidden="true"><div className="tl-fill" id="timelineFill" /></div>
          {JOBS.map((j) => (
            <article className={`job rv${j.current ? ' current' : ''}`} key={j.company}>
              <span className="job-dot" aria-hidden="true" />
              <div className="spot job-card">
                <div className="job-top">
                  <div className="co">
                    <img className="co-logo" src={j.logo} alt={`${j.company} logo`} width="54" height="54" loading="lazy" />
                    <div>
                      <h3>{j.title}{j.current && <span className="tag-now"><span className="dot" />Current</span>}</h3>
                      <div className="cn">{j.company}</div>
                    </div>
                  </div>
                  <div className="meta">
                    <span><Icon name="calendar" />{j.date}</span>
                    <span><Icon name="pin" />{j.location}</span>
                    <span><Icon name="briefcase" />{j.type}</span>
                  </div>
                </div>
                <ul>{j.details.map((d) => <li key={d}>{d}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
