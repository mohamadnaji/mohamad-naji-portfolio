import { useEffect, useRef } from 'react';
import { STACK } from '../data/portfolio';
import { prefersReducedMotion } from '../hooks/useEffects';

// Endless tech strip that speeds up and follows the direction you scroll.
export default function Marquee() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return undefined;
    let x = 0;
    let dir = 1;
    let boost = 0;
    let lastY = window.scrollY;
    let frame;
    const tick = () => {
      const vel = window.scrollY - lastY;
      lastY = window.scrollY;
      if (Math.abs(vel) > 0.5) {
        dir = vel > 0 ? 1 : -1;
        boost = Math.min(14, Math.abs(vel) * 0.35);
      }
      boost *= 0.94;
      x -= (0.6 + boost) * dir;
      const half = track.scrollWidth / 2;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      track.style.transform = `translateX(${x}px)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="marquee" aria-label="Technologies I work with">
      <div className="track" ref={trackRef}>
        {[...STACK, ...STACK].map((s, i) => <span key={`${s}-${i}`} aria-hidden={i >= STACK.length}>{s}</span>)}
      </div>
    </div>
  );
}
