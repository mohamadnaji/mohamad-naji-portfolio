import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Icon from '../components/Icon';
import SectionHeading from '../components/SectionHeading';
import { CATEGORY_COLORS, PROJECTS } from '../data/portfolio';
import { prefersReducedMotion } from '../hooks/useEffects';

const CATEGORIES = ['All', ...new Set(PROJECTS.map((p) => p.category))];

function ProjectCard({ p, featured, index, entering }) {
  return (
    <article
      className={`spot proj tilt${featured ? ' featured' : ''}${entering ? ' enter in' : ' rv'}`}
      style={{ '--c': CATEGORY_COLORS[p.category], '--d': `${index * 0.07}s` }}
    >
      <div className="p-top">
        <span className="p-ico"><Icon name={p.icon} /></span>
        <div className="p-meta"><span className="cat">{p.category}</span><span className="yr">{p.year}</span></div>
      </div>
      <h3>{p.title}</h3>
      {p.tagline && <p className="tagline">{p.tagline}</p>}
      <ul>{p.description.map((d) => <li key={d}>{d}</li>)}</ul>
      <div className="tech">{p.tech.map((t) => <span key={t}>{t}</span>)}</div>
      <div className="p-foot">
        <span className={`st ${p.status === 'Completed' ? 'done' : 'wip'}`}><i />{p.status}</span>
        {p.live && (
          <a className="code-link" href={p.live} target="_blank" rel="noopener noreferrer">
            Visit {p.live.replace(/^https?:\/\//, '')} <Icon name="arrowUpRight" />
          </a>
        )}
        {!p.live && p.github && (
          <a className="code-link" href={p.github} target="_blank" rel="noopener noreferrer" aria-label={`View ${p.title} code on GitHub`}>
            <Icon name="github" />Code
          </a>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  const [category, setCategory] = useState('All');
  const [shown, setShown] = useState('All');
  const [leaving, setLeaving] = useState(false);
  const [pill, setPill] = useState(null);
  const [filtered, setFiltered] = useState(false); // after the first filter, cards animate in instead of waiting for scroll
  const filtersRef = useRef(null);
  const gridRef = useRef(null);
  const timer = useRef(null);

  const placePill = useCallback(() => {
    const box = filtersRef.current;
    const btn = box && box.querySelector(`button[data-cat="${category}"]`);
    if (!btn) return;
    setPill({ left: btn.offsetLeft, top: btn.offsetTop, width: btn.offsetWidth, height: btn.offsetHeight });
  }, [category]);

  useLayoutEffect(() => { placePill(); }, [placePill]);
  useEffect(() => {
    window.addEventListener('resize', placePill);
    if (document.fonts) document.fonts.ready.then(placePill);
    return () => window.removeEventListener('resize', placePill);
  }, [placePill]);
  useEffect(() => () => clearTimeout(timer.current), []);

  const choose = (cat, btn) => {
    if (cat === category) return;
    setCategory(cat);
    setFiltered(true);
    btn.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'nearest', inline: 'center' });
    if (gridRef.current) gridRef.current.style.minHeight = `${gridRef.current.offsetHeight}px`;
    setLeaving(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setShown(cat);
      setLeaving(false);
      if (gridRef.current) gridRef.current.style.minHeight = '';
    }, prefersReducedMotion() ? 0 : 320);
  };

  const list = shown === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === shown);

  return (
    <section className="band" id="projects">
      <div className="wrap">
        <SectionHeading eyebrow="featured projects" title="Projects showcasing my technical expertise." />
        <div className="filters rv" ref={filtersRef} role="group" aria-label="Filter projects">
          {pill && <span className="fpill" aria-hidden="true" style={pill} />}
          {CATEGORIES.map((c) => (
            <button key={c} type="button" data-cat={c} aria-pressed={category === c} onClick={(e) => choose(c, e.currentTarget)}>
              {c}{c !== 'All' && <span className="cnt">{PROJECTS.filter((p) => p.category === c).length}</span>}
            </button>
          ))}
        </div>
        <div className={`proj-grid${leaving ? ' leaving' : ''}`} ref={gridRef}>
          {list.map((p, i) => (
            <ProjectCard key={`${shown}-${p.title}`} p={p} index={i} featured={p.featured && shown === 'All'} entering={filtered} />
          ))}
        </div>
        <p className="proj-cta rv">Want to see more projects or discuss a collaboration? <a href="#contact">Let&apos;s Connect</a></p>
      </div>
    </section>
  );
}
