import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { CONTACTS, CV_URL, JOBS, PROJECTS, SKILL_GROUPS } from '../data/portfolio';
import { useSectionNav } from '../hooks/useSectionNav';
import { prefersReducedMotion } from '../hooks/useEffects';

const OPEN_EVENT = 'terminal:open';
export const openTerminal = () => window.dispatchEvent(new Event(OPEN_EVENT));
const isMac = () => /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
export const terminalShortcut = () => (isMac() ? '⌘K' : 'Ctrl K');

const PROMPT = 'mohamad@portfolio:~$';
const SECTIONS = {
  about: 'about', 'about.java': 'about', services: 'services', 'services.java': 'services',
  skills: 'skills', 'pom.xml': 'skills', experience: 'experience', 'experience.java': 'experience',
  projects: 'projects', 'projects.java': 'projects', education: 'education', 'education.java': 'education',
  contact: 'contact', 'contactcontroller.java': 'contact',
};
const FILES = ['About.java', 'Services.java', 'pom.xml', 'Experience.java', 'Projects.java', 'Education.java', 'ContactController.java'];
const SPRING_BANNER = [
  '  .   ____          _',
  " /\\\\ / ___'_ __ _ _(_)_ __  __ _",
  "( ( )\\___ | '_ | '_| | '_ \\/ _` |",
  " \\\\/  ___)| |_)| | | | | || (_| |",
  "  '  |____| .__|_| |_|_| |_\\__, |",
  ' =========|_|==============|___/',
];
const HELP = `Available commands
  whoami                who I am
  ls                    list the sections
  cat <section>         jump to a section (e.g. cat projects)
  experience            my roles at a glance
  projects              what I have built
  skills                my stack
  contact               how to reach me
  cv                    download my CV
  mvn spring-boot:run   start the app
  theme                 switch light/dark
  clear                 clear the screen
  exit                  close the terminal`;

const ext = (href, text) => <a href={href} target="_blank" rel="noopener noreferrer">{text}</a>;

/** Developer shell opened with Ctrl/Cmd+K, the header >_ button or the status bar. */
export default function Terminal() {
  const { scrollToSection } = useSectionNav();
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false); // drives the enter/exit transition
  const [lines, setLines] = useState([]);
  const [value, setValue] = useState('');
  const history = useRef([]);
  const histIdx = useRef(0);
  const inputRef = useRef(null);
  const outRef = useRef(null);
  const lastFocus = useRef(null);
  const timers = useRef([]);
  const nextId = useRef(0);
  const welcomed = useRef(false);
  const reduce = prefersReducedMotion();

  const print = useCallback((node, cls = '') => {
    nextId.current += 1;
    const id = nextId.current;
    setLines((prev) => [...prev, { id, node, cls }]);
  }, []);

  const later = (fn, ms) => { timers.current.push(setTimeout(fn, reduce ? 0 : ms)); };

  const close = useCallback(() => {
    setShown(false);
    timers.current.push(setTimeout(() => {
      setOpen(false);
      if (lastFocus.current) lastFocus.current.focus();
    }, reduce ? 0 : 250));
  }, [reduce]);

  const show = useCallback(() => {
    lastFocus.current = document.activeElement;
    setOpen(true);
    requestAnimationFrame(() => setShown(true));
  }, []);

  const go = useCallback((id) => {
    close();
    timers.current.push(setTimeout(() => scrollToSection(id), 180));
  }, [close, scrollToSection]);

  useEffect(() => {
    const onOpen = () => show();
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (open) close(); else show();
      }
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    document.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener(OPEN_EVENT, onOpen);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, show, close]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return undefined;
    if (!welcomed.current) {
      welcomed.current = true;
      print(<><span className="c-ok">Welcome to Mohamad&apos;s portfolio shell.</span> Type <b>help</b> to see commands.{'\n'}<span className="c-mut">Tip: try &quot;whoami&quot;, &quot;projects&quot; or &quot;mvn spring-boot:run&quot;.</span></>);
    }
    const t = setTimeout(() => inputRef.current && inputRef.current.focus(), 60);
    return () => clearTimeout(t);
  }, [open, print]);

  useEffect(() => {
    if (outRef.current) outRef.current.scrollTop = outRef.current.scrollHeight;
  }, [lines]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const email = CONTACTS.find((c) => c.label === 'Email');
  const phone = CONTACTS.find((c) => c.label === 'Phone');

  const commands = {
    help: () => print(HELP),
    whoami: () => print('Mohamad Naji\nFull Stack Developer · Java, Spring Boot, Vue/Quasar, SQL\nMontreal, QC · 7+ years in banking, fintech and financial software'),
    ls: () => print(<>{FILES.map((f) => <span key={f} className={f.endsWith('.xml') ? 'c-mut' : 'c-info'}>{f}{'   '}</span>)}</>),
    experience: () => print(<>{JOBS.map((j) => <div key={j.company}><span className="c-ok">{j.date.padEnd(22)}</span>{j.title} · {j.company}</div>)}</>),
    projects: () => print(<>{PROJECTS.map((p) => (
      <div key={p.title}>
        <span className="c-info">{p.title}</span> ({p.year}){'  '}
        {p.live && ext(p.live, p.live.replace(/^https?:\/\//, ''))}
        {!p.live && p.github && ext(p.github, 'github')}
      </div>
    ))}</>),
    skills: () => print(<>{SKILL_GROUPS.map((g) => <div key={g.title}><span className="c-ok">{g.title}:</span> {g.skills.map((s) => s[0]).join(', ')}</div>)}</>),
    contact: () => print(<>
      <div>email     {email.value}</div>
      <div>phone     {phone.value}</div>
      <div>linkedin  {ext('https://linkedin.com/in/mohamad-naji-b84310174', 'in/mohamad-naji-b84310174')}</div>
      <div>github    {ext('https://github.com/mohamadnaji', 'github.com/mohamadnaji')}</div>
    </>),
    cv: () => print(<>CV: <a href={CV_URL} download>Mohamad_Naji_CV.pdf</a></>),
    theme: () => {
      const btn = document.getElementById('themeBtn');
      if (btn) btn.click();
      print('Theme switched.', 'c-mut');
    },
    clear: () => setLines([]),
    exit: () => close(),
    'sudo hire-me': () => {
      print('Permission granted. Opening contact…', 'c-ok');
      later(() => go('contact'), 600);
    },
    'mvn spring-boot:run': () => {
      const out = [
        ['c-mut', '[INFO] Scanning for projects...'],
        ['c-mut', '[INFO] Building portfolio 7.0'],
        ...SPRING_BANNER.map((l) => ['c-info', l]),
        ['c-ok', 'Started MohamadNaji in 0.84 seconds (JVM running for 7 years)'],
        ['c-mut', 'Opening projects…'],
      ];
      out.forEach(([cls, text], k) => later(() => print(text, cls), k * 110));
      later(() => go('projects'), out.length * 110 + 500);
    },
  };

  const exec = (raw) => {
    const cmd = raw.trim();
    if (!cmd) return;
    print(<span className="cmd"><b>{PROMPT}</b> {cmd}</span>);
    history.current.push(cmd);
    histIdx.current = history.current.length;
    const low = cmd.toLowerCase();
    if (commands[low]) { commands[low](); return; }
    const m = low.match(/^(cat|cd|open)\s+(.+)$/);
    if (m && SECTIONS[m[2]]) {
      print(`Opening ${m[2]}…`, 'c-mut');
      later(() => go(SECTIONS[m[2]]), 300);
      return;
    }
    print(<>command not found: {cmd}  <span className="c-mut">(type &quot;help&quot;)</span></>);
  };

  const onInputKey = (e) => {
    const h = history.current;
    if (e.key === 'ArrowUp' && h.length) {
      e.preventDefault();
      histIdx.current = Math.max(0, histIdx.current - 1);
      setValue(h[histIdx.current]);
    } else if (e.key === 'ArrowDown' && h.length) {
      e.preventDefault();
      histIdx.current = Math.min(h.length, histIdx.current + 1);
      setValue(h[histIdx.current] || '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const options = [...Object.keys(commands), ...Object.keys(SECTIONS).map((k) => `cat ${k}`)]
        .filter((k) => k.startsWith(value.toLowerCase()));
      if (options.length === 1) setValue(options[0]);
      else if (options.length > 1) print(options.join('   '), 'c-mut');
    }
  };

  if (!open) return null;

  return (
    <div
      className={`term-overlay${shown ? ' open' : ''}`}
      onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}
      onKeyDown={(e) => { if (e.key === 'Escape') { e.preventDefault(); close(); } }}
      role="presentation"
    >
      <div className="term" role="dialog" aria-modal="true" aria-label="Terminal">
        <div className="term-bar">
          <span className="lights" aria-hidden="true"><i /><i /><i /></span>
          <span className="t">mohamad@portfolio: ~</span>
          <button className="term-x" type="button" onClick={close} aria-label="Close terminal"><Icon name="close" /></button>
        </div>
        <div className="term-out" ref={outRef}>
          {lines.map((l) => <div key={l.id} className={l.cls || undefined}>{l.node}</div>)}
        </div>
        <form className="term-in" onSubmit={(e) => { e.preventDefault(); exec(value); setValue(''); }}>
          <label htmlFor="termInput">{PROMPT}</label>
          <input
            id="termInput"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onInputKey}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
            enterKeyHint="send"
          />
        </form>
      </div>
    </div>
  );
}
