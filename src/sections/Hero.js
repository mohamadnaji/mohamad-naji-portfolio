import { useEffect, useState } from 'react';
import Icon from '../components/Icon';
import HeroCanvas from '../components/HeroCanvas';
import CodeEditor from '../components/CodeEditor';
import { CV_URL, ROLES, SOCIALS } from '../data/portfolio';
import { prefersReducedMotion } from '../hooks/useEffects';

function useTypedRoles() {
  const [text, setText] = useState(ROLES[0]);
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    let role = 0;
    let chars = ROLES[0].length;
    let deleting = true;
    let timer;
    const tick = () => {
      if (deleting) {
        chars -= 1;
        setText(ROLES[role].slice(0, chars));
        if (chars === 0) {
          deleting = false;
          role = (role + 1) % ROLES.length;
        }
        timer = setTimeout(tick, 40);
      } else {
        chars += 1;
        setText(ROLES[role].slice(0, chars));
        if (chars === ROLES[role].length) {
          deleting = true;
          timer = setTimeout(tick, 1600);
        } else {
          timer = setTimeout(tick, 75);
        }
      }
    };
    timer = setTimeout(tick, 2200);
    return () => clearTimeout(timer);
  }, []);
  return text;
}

export default function Hero() {
  const role = useTypedRoles();

  return (
    <section className="hero" id="home">
      <HeroCanvas />
      <div className="wrap hero-grid" id="heroInner">
        <div>
          <span className="status fade-up" title="GET /actuator/health"><span className="dot" /><span className="mono">{'{"status":"UP"}'}</span><span className="sep" aria-hidden="true">·</span>Open to opportunities</span>
          <h1 aria-label="Mohamad Naji">
            <span className="ln" aria-hidden="true"><span>Mohamad</span></span>
            <span className="ln" aria-hidden="true"><span>NAJI</span></span>
          </h1>
          <p className="roles fade-up" style={{ animationDelay: '.35s' }}>
            I&apos;m a <span className="typed" aria-live="polite">{role}</span><span className="caret" aria-hidden="true" />
          </p>
          <p className="lede fade-up" style={{ animationDelay: '.45s' }}>
            Full Stack Developer with 7+ years building scalable backend systems, APIs and cloud-native applications in Java,
            Spring Boot, Python and SQL. Based in Montreal.
          </p>
          <div className="ctas fade-up" style={{ animationDelay: '.55s' }}>
            <a className="btn primary mag" href="#contact">Let&apos;s Connect <span className="arr"><Icon name="arrow" /></span></a>
            <a className="btn ghost mag" href={CV_URL} download><Icon name="download" />Download CV</a>
          </div>
          <div className="socials fade-up" style={{ animationDelay: '.65s' }}>
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}><Icon name={s.icon} /></a>
            ))}
          </div>
        </div>

        <div className="api-wrap fade-up" style={{ animationDelay: '.3s' }}>
          <CodeEditor />
        </div>
      </div>
      <div className="wrap cue-row"><a className="scroll-cue" id="scrollCue" href="#about"><span className="m" aria-hidden="true" />Scroll to explore</a></div>
    </section>
  );
}
