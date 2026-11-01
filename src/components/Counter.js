import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../hooks/useEffects';

// Counts up from 0 to `value` the first time it scrolls into view.
export default function Counter({ value, suffix = '' }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !('IntersectionObserver' in window)) return undefined;
    let frame;
    setShown(0);
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (t) => {
        const p = Math.min(1, (t - start) / 1400);
        setShown(Math.round(value * (1 - (1 - p) ** 3)));
        if (p < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);

  return <b ref={ref}>{shown}{suffix}</b>;
}
