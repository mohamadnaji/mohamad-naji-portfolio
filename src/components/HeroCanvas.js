import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../hooks/useEffects';

const BLOBS = [
  { x: 0.18, y: 0.3, r: 0.42, sx: 0.0011, sy: 0.0009, p: 0 },
  { x: 0.78, y: 0.25, r: 0.36, sx: 0.0008, sy: 0.0012, p: 2 },
  { x: 0.6, y: 0.85, r: 0.4, sx: 0.001, sy: 0.0007, p: 4 },
];

const rgba = (color, a) => {
  let h = color.replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const n = parseInt(h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

// Soft drifting light fields behind the hero; they lean toward the pointer and pause off-screen.
export default function HeroCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv.getContext('2d');
    const hero = cv.parentElement;
    const reduce = prefersReducedMotion();
    const pointer = { x: 0.5, y: 0.4 };
    let w = 0;
    let h = 0;
    let frame;
    let visible = true;

    const size = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const r = cv.getBoundingClientRect();
      w = r.width;
      h = r.height;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = (t) => {
      const cs = getComputedStyle(document.documentElement);
      const colors = [cs.getPropertyValue('--accent').trim(), cs.getPropertyValue('--accent-2').trim(), '#8B6CF0'];
      const alpha = cs.colorScheme.includes('light') ? 0.16 : 0.22;
      ctx.clearRect(0, 0, w, h);
      BLOBS.forEach((b, i) => {
        const x = (b.x + Math.sin(t * b.sx + b.p) * 0.08 + (pointer.x - 0.5) * 0.04 * (i + 1)) * w;
        const y = (b.y + Math.cos(t * b.sy + b.p) * 0.08 + (pointer.y - 0.5) * 0.04 * (i + 1)) * h;
        const rad = b.r * Math.max(w, h);
        const g = ctx.createRadialGradient(x, y, 0, x, y, rad);
        g.addColorStop(0, rgba(colors[i], alpha));
        g.addColorStop(1, rgba(colors[i], 0));
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      });
      if (visible && !reduce) frame = requestAnimationFrame(draw);
    };
    const onPointer = (e) => {
      const r = cv.getBoundingClientRect();
      pointer.x = (e.clientX - r.left) / r.width;
      pointer.y = (e.clientY - r.top) / r.height;
    };
    const onResize = () => { size(); if (reduce) draw(0); };

    size();
    draw(0);
    hero.addEventListener('pointermove', onPointer);
    window.addEventListener('resize', onResize);
    const io = 'IntersectionObserver' in window && !reduce
      ? new IntersectionObserver(([entry]) => {
        const was = visible;
        visible = entry.isIntersecting;
        if (visible && !was) frame = requestAnimationFrame(draw);
      })
      : null;
    if (io) io.observe(hero);
    const themeObserver = new MutationObserver(() => { if (reduce) draw(0); });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      cancelAnimationFrame(frame);
      hero.removeEventListener('pointermove', onPointer);
      window.removeEventListener('resize', onResize);
      if (io) io.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" />;
}
