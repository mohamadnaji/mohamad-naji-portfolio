import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { IDE_FILES } from '../data/ide';
import { prefersReducedMotion } from '../hooks/useEffects';

const FIRST_DELAY = 0.7; // seconds before the first file starts typing (after the hero entrance)
const lineText = (line) => line.map(([, t]) => t).join('');

// Each line "types" itself with a stepped clip-path; returns the per-line timing and the total duration.
function typingPlan(lines, lead, animate) {
  let t = animate ? lead : 0;
  const plan = lines.map((line) => {
    const n = Math.max(1, lineText(line).length);
    const dur = animate ? Math.min(0.5, n * 0.009) : 0;
    const entry = { n, dur, delay: t };
    t += dur + (animate ? 0.02 : 0);
    return entry;
  });
  return { plan, end: t };
}

function ConsoleLine({ line }) {
  const [cls, text, extra] = line;
  return <div className={cls || undefined}>{text}{extra && <span className={extra[0]}>{extra[1]}</span>}</div>;
}

/** Hero editor: file tabs that type themselves out, line numbers, and a Run console. Cycles until touched. */
export default function CodeEditor() {
  const [file, setFile] = useState(0);
  const [lead, setLead] = useState(FIRST_DELAY);
  const [output, setOutput] = useState(null); // null = idle
  const [running, setRunning] = useState(false);
  const tabsRef = useRef(null);
  const timers = useRef([]);
  const autoTimer = useRef(null);
  const userTookOver = useRef(false);
  const reduce = prefersReducedMotion();

  const { plan, end } = typingPlan(IDE_FILES[file].lines, lead, !reduce);

  const clearRun = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  const run = useCallback((index) => {
    clearRun();
    setOutput([]);
    setRunning(false);
    requestAnimationFrame(() => setRunning(true));
    IDE_FILES[index].run.forEach((line, k) => {
      timers.current.push(setTimeout(() => setOutput((prev) => [...(prev || []), line]), reduce ? 0 : 260 + k * 320));
    });
  }, [reduce]);

  const open = useCallback((index) => {
    clearRun();
    setLead(0.15);
    setFile(index);
    setOutput(null);
    setRunning(false);
    const tab = tabsRef.current && tabsRef.current.children[index];
    if (tab) tabsRef.current.scrollTo({ left: tab.offsetLeft - 8, behavior: reduce ? 'auto' : 'smooth' });
  }, [reduce]);

  // Auto-run the current file once it has typed, then move to the next tab, until the visitor interacts.
  useEffect(() => {
    if (reduce) { run(file); return undefined; }
    if (userTookOver.current) return undefined;
    autoTimer.current = setTimeout(() => {
      run(file);
      autoTimer.current = setTimeout(() => {
        if (!userTookOver.current) open((file + 1) % IDE_FILES.length);
      }, 6500);
    }, (end + 0.5) * 1000);
    return () => clearTimeout(autoTimer.current);
  }, [file, end, open, run, reduce]);

  useEffect(() => () => { clearRun(); clearTimeout(autoTimer.current); }, []);

  const takeOver = () => { userTookOver.current = true; clearTimeout(autoTimer.current); };

  const onTabKey = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    takeOver();
    const next = (file + (e.key === 'ArrowRight' ? 1 : -1) + IDE_FILES.length) % IDE_FILES.length;
    open(next);
    tabsRef.current.children[next].focus();
  };

  const current = IDE_FILES[file];

  return (
    <div className="api ide">
      <div className="ide-bar">
        <div className="ide-tabs" ref={tabsRef} role="tablist" aria-label="Code files" onKeyDown={onTabKey}>
          {IDE_FILES.map((f, i) => (
            <button
              key={f.name}
              id={`ide-tab-${i}`}
              className="ide-tab"
              type="button"
              role="tab"
              aria-selected={i === file}
              aria-controls="ide-code"
              tabIndex={i === file ? 0 : -1}
              onClick={() => { takeOver(); open(i); }}
            >
              <span className="fi" style={{ background: f.color }} aria-hidden="true">{f.badge}</span>{f.name}
            </button>
          ))}
        </div>
      </div>
      <div className="ide-body">
        <pre className="gutter" aria-hidden="true">{current.lines.map((_, i) => i + 1).join('\n')}</pre>
        <pre className="code" id="ide-code" role="tabpanel" aria-labelledby={`ide-tab-${file}`} key={`${file}-${lead}`}>
          {current.lines.map((line, i) => {
            const p = plan[i];
            return (
              <span className="l" key={i} style={{ '--n': p.n, '--t': `${p.dur}s`, '--d': `${p.delay.toFixed(2)}s` }}>
                {line.length ? line.map(([cls, txt], j) => (cls ? <span className={cls} key={j}>{txt}</span> : txt)) : ' '}
              </span>
            );
          })}
        </pre>
      </div>
      <div className="console" aria-live="polite">
        <div className="console-head">
          <button className="run" type="button" onClick={() => { takeOver(); run(file); }} aria-label={`Run ${current.name}`}>
            <Icon name="play" /><span>Run</span>
          </button>
          <span className="bar"><i style={{ width: running ? '100%' : 0, transition: running ? undefined : 'none' }} /></span>
        </div>
        <div className="console-out">
          {output === null
            ? <div className="c-mut">Ready. Press Run to execute {current.name}.</div>
            : output.map((line, i) => <ConsoleLine key={i} line={line} />)}
        </div>
      </div>
    </div>
  );
}
