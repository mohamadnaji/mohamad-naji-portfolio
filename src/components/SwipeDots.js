import { Children, useEffect, useRef, useState } from 'react';
import Icon from './Icon';

// Wraps a `.carousel` grid. On phones the grid becomes a swipe row (CSS); this adds the position dots.
export default function SwipeDots({ children }) {
  const wrapRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const track = wrapRef.current && wrapRef.current.querySelector('.carousel');
    if (!track) return undefined;
    setCount(track.children.length);
    const onScroll = () => {
      const first = track.children[0];
      if (!first) return;
      const step = first.offsetWidth + parseFloat(getComputedStyle(track).columnGap || '0');
      setIndex(Math.min(track.children.length - 1, Math.round(track.scrollLeft / step)));
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={wrapRef}>
      {Children.only(children)}
      <div className="swipe" aria-hidden="true">
        Swipe for more <Icon name="arrow" />
        <span className="dots">
          {Array.from({ length: count }, (_, i) => <i key={i} className={i === index ? 'on' : undefined} />)}
        </span>
      </div>
    </div>
  );
}
