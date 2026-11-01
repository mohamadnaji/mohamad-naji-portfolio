import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { NAV } from '../data/portfolio';
import { prefersReducedMotion } from '../hooks/useEffects';

const THEME_KEY = 'theme';
const currentlyDark = () => getComputedStyle(document.documentElement).colorScheme.includes('dark');

function useTheme() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    setDark(currentlyDark());
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const sync = () => setDark(currentlyDark());
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const toggle = useCallback((e) => {
    const next = currentlyDark() ? 'light' : 'dark';
    const apply = () => {
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem(THEME_KEY, next); } catch (err) { /* storage unavailable */ }
      setDark(next === 'dark');
    };
    if (!document.startViewTransition || prefersReducedMotion()) {
      apply();
      return;
    }
    const x = e.clientX || window.innerWidth - 40;
    const y = e.clientY || 34;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const vt = document.startViewTransition(apply);
    vt.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 700, easing: 'cubic-bezier(.2,.75,.2,1)', pseudoElement: '::view-transition-new(root)' }
      );
    }).catch(() => {});
  }, []);

  return [dark, toggle];
}

function useActiveSection() {
  const [active, setActive] = useState('home');
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

export default function Header() {
  const [dark, toggleTheme] = useTheme();
  const active = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const [pill, setPill] = useState({ x: 0, w: 0 });
  const linksRef = useRef(null);
  const menuBtnRef = useRef(null);
  const closeBtnRef = useRef(null);

  const placePill = useCallback(() => {
    const link = linksRef.current && linksRef.current.querySelector(`a[href="#${active}"]`);
    if (link) setPill({ x: link.offsetLeft, w: link.offsetWidth });
  }, [active]);

  useLayoutEffect(() => { placePill(); }, [placePill]);
  useEffect(() => {
    window.addEventListener('resize', placePill);
    if (document.fonts) document.fonts.ready.then(placePill);
    return () => window.removeEventListener('resize', placePill);
  }, [placePill]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    if (menuOpen && closeBtnRef.current) closeBtnRef.current.focus();
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    if (menuBtnRef.current) menuBtnRef.current.focus();
  };

  return (
    <>
      <div className="progress" id="progress" aria-hidden="true" />
      <header className="top" id="site-header">
        <div className="wrap nav">
          <a className="brand" href="#home" aria-label="Mohamad Naji, back to top">
            <span className="mark">MN</span><span>Mohamad Naji</span>
          </a>
          <nav className="links" ref={linksRef} aria-label="Sections">
            <span className="pill" aria-hidden="true" style={{ width: pill.w, transform: `translateX(${pill.x}px)`, opacity: pill.w ? 1 : 0 }} />
            {NAV.map(({ id, label }) => (
              <a key={id} href={`#${id}`} className={active === id ? 'active' : undefined} aria-current={active === id ? 'true' : undefined}>{label}</a>
            ))}
          </nav>
          <div className="nav-right">
            <button className="icon-btn" type="button" onClick={toggleTheme} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}>
              <Icon name={dark ? 'sun' : 'moon'} />
            </button>
            <button ref={menuBtnRef} className="icon-btn menu-btn" type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mmenu${menuOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!menuOpen}
        onKeyDown={(e) => { if (e.key === 'Escape') closeMenu(); }}
      >
        <div className="row">
          <button ref={closeBtnRef} className="icon-btn" type="button" onClick={closeMenu} aria-label="Close menu" tabIndex={menuOpen ? 0 : -1}>
            <Icon name="close" />
          </button>
        </div>
        <nav aria-label="Sections">
          {NAV.map(({ id, label }, i) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1} style={{ transitionDelay: `${0.08 + i * 0.04}s` }}>{label}</a>
          ))}
        </nav>
      </div>
    </>
  );
}
