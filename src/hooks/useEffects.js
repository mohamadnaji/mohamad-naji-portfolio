import { useEffect } from 'react';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isPhone = () => window.matchMedia('(max-width: 640px)').matches;

/**
 * Reveals `.rv` and `.split` elements as they scroll into view by adding `.in`.
 * Cards inside a phone carousel reveal together so off-screen cards are never blurred mid-swipe.
 */
export function useScrollReveal() {
  useEffect(() => {
    const targets = () => document.querySelectorAll('.rv:not(.in), .split:not(.in)');
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      targets().forEach((el) => el.classList.add('in'));
      return undefined;
    }
    document.documentElement.classList.add('rv-init');

    const reveal = (el) => {
      el.classList.add('in');
      const parent = el.parentElement;
      if (parent && parent.matches('.carousel') && isPhone()) {
        Array.from(parent.children).forEach((c) => c.classList.add('in'));
      }
    };

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          reveal(e.target);
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.14, rootMargin: '0px 0px -6% 0px' }
    );
    targets().forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/** Scroll-linked effects: progress bar, header state, hero parallax, timeline fill, back-to-top ring. */
export function useScrollEffects() {
  useEffect(() => {
    const reduce = prefersReducedMotion();
    const progress = document.getElementById('progress');
    const header = document.getElementById('site-header');
    const hero = document.getElementById('heroInner');
    const tl = document.getElementById('timeline');
    const tlFill = document.getElementById('timelineFill');
    const toTop = document.getElementById('toTop');
    const ring = document.getElementById('toTopRing');
    const cue = document.getElementById('scrollCue');
    const line = document.getElementById('sbLn');
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? y / max : 0;
      if (progress) progress.style.transform = `scaleX(${p})`;
      if (header) header.classList.toggle('scrolled', y > 10);
      if (toTop) toTop.classList.toggle('show', y > 600);
      if (ring) ring.style.strokeDashoffset = String(157 * (1 - p));
      if (cue) cue.classList.toggle('gone', y > 40);
      if (line) line.textContent = `Ln ${Math.floor(y / 24) + 1}, Col 1`;
      if (hero) {
        // Parallax only on wide screens; on phones the hero is tall and should stay solid.
        const wide = window.innerWidth > 960;
        const h = Math.min(y, 700);
        hero.style.transform = !reduce && wide ? `translateY(${h * 0.18}px)` : '';
        hero.style.opacity = !reduce && wide ? String(1 - h / 900) : '';
      }
      if (tl && tlFill) {
        const r = tl.getBoundingClientRect();
        const t = reduce ? 1 : Math.max(0, Math.min(1, (window.innerHeight * 0.6 - r.top) / r.height));
        tlFill.style.transform = `scaleY(${t})`;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
}

/** Pointer effects via delegation: card spotlight (.spot), 3D tilt (.tilt), magnetic buttons (.mag). */
export function usePointerEffects() {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const canHover = window.matchMedia('(hover: hover)').matches;

    const onMove = (e) => {
      const spot = e.target.closest && e.target.closest('.spot');
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty('--x', `${e.clientX - r.left}px`);
        spot.style.setProperty('--y', `${e.clientY - r.top}px`);
      }
      if (!canHover) return;
      const tilt = e.target.closest && e.target.closest('.tilt');
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.transform = `perspective(1000px) rotateX(${-y * 5}deg) rotateY(${x * 6}deg) translateY(-4px)`;
      }
      const mag = e.target.closest && e.target.closest('.mag');
      if (mag) {
        const r = mag.getBoundingClientRect();
        mag.style.setProperty('--mx', `${((e.clientX - r.left) / r.width - 0.5) * 10}px`);
        mag.style.setProperty('--my', `${((e.clientY - r.top) / r.height - 0.5) * 8}px`);
      }
    };
    const onOut = (e) => {
      const tilt = e.target.closest && e.target.closest('.tilt');
      if (tilt && !tilt.contains(e.relatedTarget)) tilt.style.transform = '';
      const mag = e.target.closest && e.target.closest('.mag');
      if (mag && !mag.contains(e.relatedTarget)) {
        mag.style.setProperty('--mx', '0px');
        mag.style.setProperty('--my', '0px');
      }
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerout', onOut);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerout', onOut);
    };
  }, []);
}
