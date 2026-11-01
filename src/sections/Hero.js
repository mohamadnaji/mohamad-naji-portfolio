import { useEffect, useRef, useState } from 'react';
import Icon from '../components/Icon';
import HeroCanvas from '../components/HeroCanvas';
import { CV_URL, ROLES, SOCIALS } from '../data/portfolio';
import { prefersReducedMotion } from '../hooks/useEffects';

const CODE = [
  [['ta', '@RestController']],
  [['ta', '@RequestMapping'], ['', '('], ['ts', '"/api/v1/entries"'], ['', ')']],
  [['tk', 'public class '], ['tn', 'JournalEntryController'], ['', ' {']],
  [],
  [['', '  '], ['tk', 'private final '], ['', 'LedgerService ledger;']],
  [],
  [['', '  '], ['ta', '@PostMapping']],
  [['', '  '], ['tk', 'public '], ['', 'ResponseEntity<EntryDto> '], ['tn', 'post'], ['', '(']],
  [['', '      '], ['ta', '@Valid @RequestBody '], ['', 'EntryRequest req) {']],
  [['', '    '], ['tc', '// debits must equal credits']],
  [['', '    '], ['tk', 'return '], ['', 'ResponseEntity.'], ['tn', 'status'], ['', '('], ['ts', '201'], ['', ')']],
  [['', '        .'], ['tn', 'body'], ['', '(ledger.'], ['tn', 'post'], ['', '(req));']],
  [['', '  }']],
  [['', '}']],
];

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
  const cardRef = useRef(null);

  const onCardMove = (e) => {
    if (prefersReducedMotion() || !window.matchMedia('(hover: hover)').matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    cardRef.current.style.transform = `rotateX(${-y * 7}deg) rotateY(${x * 9}deg)`;
  };

  return (
    <section className="hero" id="home">
      <HeroCanvas />
      <div className="wrap hero-grid" id="heroInner">
        <div>
          <span className="status fade-up"><span className="dot" />Available for opportunities</span>
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

        <div className="api-wrap fade-up" style={{ animationDelay: '.3s' }} onPointerMove={onCardMove} onPointerLeave={() => { cardRef.current.style.transform = ''; }}>
          <div className="api" ref={cardRef}>
            <div className="api-bar"><i /><i /><i /><span className="file mono">JournalEntryController.java</span></div>
            <pre className="code">
              {CODE.map((line, i) => (
                <span className="l" key={i} style={{ animationDelay: `${0.6 + i * 0.1}s` }}>
                  {line.length ? line.map(([cls, txt], j) => (cls ? <span className={cls} key={j}>{txt}</span> : txt)) : ' '}
                </span>
              ))}
            </pre>
            <div className="resp">
              <div className="resp-top"><span className="ok"><Icon name="check" />201 Created</span><span>38 ms</span></div>
              <pre>{'{ "debit": 1250.00, "credit": 1250.00, "balanced": true }'}</pre>
            </div>
          </div>
          <span className="float-tag">Spring Boot · Java 21</span>
        </div>
      </div>
      <div className="wrap"><a className="scroll-cue" href="#about"><span className="m" aria-hidden="true" />Scroll to explore</a></div>
    </section>
  );
}
