import Icon from './Icon';
import { prefersReducedMotion } from '../hooks/useEffects';

// Floating button with a ring that fills with scroll progress (driven by useScrollEffects).
export default function BackToTop() {
  return (
    <button
      className="totop"
      id="toTop"
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })}
    >
      <svg className="ring" viewBox="0 0 52 52" aria-hidden="true"><circle id="toTopRing" cx="26" cy="26" r="25" /></svg>
      <Icon name="up" />
    </button>
  );
}
