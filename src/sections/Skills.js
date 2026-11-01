import { useState } from 'react';
import Icon from '../components/Icon';
import SectionHeading, { annotation } from '../components/SectionHeading';
import SwipeDots from '../components/SwipeDots';
import { SKILL_GROUPS, levelLabel } from '../data/portfolio';

const MODES = [
  { id: 'experience', label: 'Experience' },
  { id: 'level', label: 'Proficiency' },
  { id: 'pom', label: 'pom.xml' },
];
const slug = (t) => t.toLowerCase().replace(/[()&,]/g, ' ').trim().replace(/\s+/g, '-');
const sortByLevel = (skills) => [...skills].sort((a, b) => b[1] - a[1]);

function Tag({ name, value }) {
  return <><span className="tg">&lt;{name}&gt;</span><span className="tv">{value}</span><span className="tg">&lt;/{name}&gt;</span></>;
}

// The same skills rendered as Maven dependencies: years as <version>, proficiency as <classifier>.
function PomView() {
  return (
    <div className="pom show">
      <div className="pom-head"><span>pom.xml</span><span>dev.mohamadnaji : portfolio : 7.0</span></div>
      <pre>
        <span className="blk"><span className="tg">&lt;dependencies&gt;</span></span>
        {SKILL_GROUPS.map((g) => (
          <span key={g.title}>
            <span className="blk"><span className="tc">{`    <!-- ${g.title} -->`}</span></span>
            {sortByLevel(g.skills).map(([name, level, years]) => (
              <span className="blk" key={name}>
                {'    '}<span className="tg">&lt;dependency&gt;</span>{'\n        '}
                <Tag name="groupId" value={`dev.mohamadnaji.${slug(g.title.split(' ')[0])}`} />{'\n        '}
                <Tag name="artifactId" value={slug(name)} />{'\n        '}
                <Tag name="version" value={years} />{'\n        '}
                <Tag name="classifier" value={levelLabel(level).toLowerCase()} />{'\n    '}
                <span className="tg">&lt;/dependency&gt;</span>
              </span>
            ))}
          </span>
        ))}
        <span className="blk"><span className="tg">&lt;/dependencies&gt;</span></span>
      </pre>
    </div>
  );
}

export default function Skills() {
  const [mode, setMode] = useState('experience');
  const [badgeMode, setBadgeMode] = useState('experience'); // last card view, kept while pom.xml is open
  const [remounted, setRemounted] = useState(false); // cards return from pom.xml already revealed

  const choose = (id) => {
    setMode(id);
    if (id === 'pom') setRemounted(true);
    else setBadgeMode(id);
  };

  return (
    <section className="band" id="skills">
      <div className="wrap">
        <SectionHeading eyebrow={annotation('Configuration', 'skills')} title="Technologies I use to build scalable solutions.">
          <div className={`seg rv${mode === 'level' ? ' mid' : ''}${mode === 'pom' ? ' right' : ''}`} role="group" aria-label="Show skills as">
            <span className="thumb" aria-hidden="true" />
            {MODES.map((m) => (
              <button key={m.id} type="button" aria-pressed={mode === m.id} onClick={() => choose(m.id)}>{m.label}</button>
            ))}
          </div>
        </SectionHeading>
        {mode === 'pom' ? <PomView /> : (
          <SwipeDots>
            <div className="skills-grid carousel">
              {SKILL_GROUPS.map((g, i) => (
                <article className={`spot sk rv${remounted ? ' in' : ''}`} key={g.title} style={{ '--c': g.color, '--d': `${(i % 2) * 0.08}s` }}>
                  <div className="sk-head"><span className="ico"><Icon name={g.icon} /></span><h3>{g.title}</h3></div>
                  {sortByLevel(g.skills).map(([name, level, years], j) => (
                    <div className="sk-row" key={name}>
                      <div className="t">
                        <span>{name}</span>
                        <span className="badge-slot" style={{ '--bd': `${j * 0.03}s` }}>
                          {/* keyed on the view so the flip animation replays on every switch */}
                          <span className="badge" key={badgeMode}>{badgeMode === 'experience' ? years : levelLabel(level)}</span>
                        </span>
                      </div>
                      <div className="bar" aria-hidden="true"><i style={{ '--w': `${level}%` }} /></div>
                    </div>
                  ))}
                </article>
              ))}
            </div>
          </SwipeDots>
        )}
      </div>
    </section>
  );
}
