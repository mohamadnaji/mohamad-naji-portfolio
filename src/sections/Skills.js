import { useState } from 'react';
import Icon from '../components/Icon';
import SectionHeading from '../components/SectionHeading';
import SwipeDots from '../components/SwipeDots';
import { SKILL_GROUPS, levelLabel } from '../data/portfolio';

export default function Skills() {
  const [mode, setMode] = useState('experience');

  return (
    <section className="band" id="skills">
      <div className="wrap">
        <SectionHeading eyebrow="technical skills" title="Technologies I use to build scalable solutions.">
          <div className={`seg rv${mode === 'level' ? ' right' : ''}`} role="group" aria-label="Show skills by">
            <span className="thumb" aria-hidden="true" />
            <button type="button" aria-pressed={mode === 'experience'} onClick={() => setMode('experience')}>Experience</button>
            <button type="button" aria-pressed={mode === 'level'} onClick={() => setMode('level')}>Proficiency</button>
          </div>
        </SectionHeading>
        <SwipeDots>
          <div className="skills-grid carousel">
            {SKILL_GROUPS.map((g, i) => (
              <article className="spot sk rv" key={g.title} style={{ '--c': g.color, '--d': `${(i % 2) * 0.08}s` }}>
                <div className="sk-head"><span className="ico"><Icon name={g.icon} /></span><h3>{g.title}</h3></div>
                {[...g.skills].sort((a, b) => b[1] - a[1]).map(([name, level, years], j) => (
                  <div className="sk-row" key={name}>
                    <div className="t">
                      <span>{name}</span>
                      <span className="badge-slot" style={{ '--bd': `${j * 0.03}s` }}>
                        {/* keyed on mode so the flip animation replays on every switch */}
                        <span className="badge" key={mode}>{mode === 'experience' ? years : levelLabel(level)}</span>
                      </span>
                    </div>
                    <div className="bar" aria-hidden="true"><i style={{ '--w': `${level}%` }} /></div>
                  </div>
                ))}
              </article>
            ))}
          </div>
        </SwipeDots>
      </div>
    </section>
  );
}
