import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { NAV } from '../data/portfolio';
import { prefersReducedMotion } from './useEffects';

const SectionNavContext = createContext({ active: 'home', scrollToSection: () => {} });
export const useSectionNav = () => useContext(SectionNavContext);

// Where a section should land: its heading just under the sticky header (offsetTop ignores reveal transforms).
function sectionTop(id) {
  if (id === 'home') return 0;
  const section = document.getElementById(id);
  if (!section) return null;
  const head = section.querySelector('.sh');
  const header = document.getElementById('site-header');
  const y = section.offsetTop + (head ? head.offsetTop : 0);
  return Math.max(0, y - (header ? header.offsetHeight : 0) - 24);
}

/** Tracks the section in view and scrolls to sections precisely; in-page #links are handled automatically. */
export function SectionNavProvider({ children }) {
  const [active, setActive] = useState('home');
  const locked = useRef(false);
  const lockTimer = useRef(null);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting && !locked.current) setActive(e.target.id); }),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const scrollToSection = useCallback((id) => {
    const top = sectionTop(id);
    if (top === null) return;
    // Hold the highlight on the destination so it doesn't flicker through every section on the way.
    locked.current = true;
    setActive(id);
    const release = () => {
      locked.current = false;
      clearTimeout(lockTimer.current);
      window.removeEventListener('scrollend', release);
    };
    clearTimeout(lockTimer.current);
    window.addEventListener('scrollend', release, { once: true });
    lockTimer.current = setTimeout(release, 1200);
    window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      const link = e.target.closest && e.target.closest('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute('href').slice(1);
      if (!id || !document.getElementById(id)) return;
      e.preventDefault();
      scrollToSection(id);
    };
    document.addEventListener('click', onClick);
    return () => { document.removeEventListener('click', onClick); clearTimeout(lockTimer.current); };
  }, [scrollToSection]);

  return <SectionNavContext.Provider value={{ active, scrollToSection }}>{children}</SectionNavContext.Provider>;
}
