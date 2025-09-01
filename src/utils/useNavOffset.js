// src/utils/useNavOffset.js
import { useEffect } from 'react';

export function useNavOffset(navSelector = '.navbar', extra = 0) {
  useEffect(() => {
    const root = document.documentElement;

    const update = () => {
      const nav = document.querySelector(navSelector);
      const height = nav
        ? Math.ceil(nav.getBoundingClientRect().height) + extra
        : 80;
      root.style.setProperty('--nav-offset', `${height}px`);
    };

    update();
    window.addEventListener('resize', update);

    let ro;
    const nav = document.querySelector(navSelector);
    if (window.ResizeObserver && nav) {
      ro = new ResizeObserver(update);
      ro.observe(nav);
    }

    return () => {
      window.removeEventListener('resize', update);
      if (ro) ro.disconnect();
    };
  }, [navSelector, extra]);
}
