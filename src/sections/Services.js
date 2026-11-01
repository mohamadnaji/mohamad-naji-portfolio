import Icon from '../components/Icon';
import SectionHeading, { annotation } from '../components/SectionHeading';
import SwipeDots from '../components/SwipeDots';
import { SERVICES } from '../data/portfolio';

export default function Services() {
  return (
    <section className="band alt" id="services">
      <div className="wrap">
        <SectionHeading eyebrow={annotation('Service', 'services')} title="What I can do for you.">
          <p className="rv">Leveraging 7+ years of expertise in backend development, databases, and modern tech stacks.</p>
        </SectionHeading>
        <SwipeDots>
          <div className="svc-grid carousel">
            {SERVICES.map((s, i) => (
              <article className="spot svc rv" key={s.title} style={{ '--c': s.color, '--d': `${(i % 3) * 0.08}s` }}>
                <span className="ico"><Icon name={s.icon} /></span>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <ul>{s.features.map((f) => <li key={f}><Icon name="check" /><span>{f}</span></li>)}</ul>
              </article>
            ))}
          </div>
        </SwipeDots>
        <div className="svc-cta rv">
          <p>Ready to build scalable, robust solutions? Let&apos;s discuss how my expertise in Java, Python, databases, and modern technologies can help bring your project to life.</p>
          <a className="btn primary mag" href="#contact">Start a Conversation <span className="arr"><Icon name="arrow" /></span></a>
        </div>
      </div>
    </section>
  );
}
