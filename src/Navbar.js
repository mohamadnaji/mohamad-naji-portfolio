// src/components/Navbar.js
import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  FaHome,
  FaUser,
  FaStar,
  FaSuitcase,
  FaFolderOpen,
  FaGraduationCap,
  FaEnvelope,
} from 'react-icons/fa';
import './Navbar.css';

const NAV_ITEMS = [
  { href: '#hero', icon: <FaHome />, text: 'Home' },
  { href: '#about', icon: <FaUser />, text: 'About' },
  { href: '#skills', icon: <FaStar />, text: 'Skills' },
  { href: '#experience', icon: <FaSuitcase />, text: 'Experience' },
  { href: '#projects', icon: <FaFolderOpen />, text: 'Projects' },
  { href: '#education', icon: <FaGraduationCap />, text: 'Education' },
  { href: '#contact', icon: <FaEnvelope />, text: 'Contact' },
];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export default function Navbar() {
  const [active, setActive] = useState('#hero');

  const isNavScrollRef = useRef(false);
  const pendingHrefRef = useRef(null);
  const lastScrollYRef = useRef(0);
  const scrollDirectionRef = useRef('down');
  const unlockTimerRef = useRef(null);

  // Track scroll direction
  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      scrollDirectionRef.current = currentY > lastScrollYRef.current ? 'down' : 'up';
      lastScrollYRef.current = currentY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // IntersectionObserver for section highlighting
  useEffect(() => {
    const ids = NAV_ITEMS.map(i => i.href.slice(1));
    const sections = ids
      .map(id => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visible[0]?.target?.id) return;

        const newHref = `#${visible[0].target.id}`;
        if (newHref === active) return;

        if (isNavScrollRef.current) {
          const currentIndex = NAV_ITEMS.findIndex(i => i.href === active);
          const newIndex = NAV_ITEMS.findIndex(i => i.href === newHref);

          if (
            (scrollDirectionRef.current === 'down' && newIndex > currentIndex) ||
            (scrollDirectionRef.current === 'up' && newIndex < currentIndex)
          ) {
            setActive(newHref);
          }

          if (newHref === pendingHrefRef.current) {
            clearTimeout(unlockTimerRef.current);
            unlockTimerRef.current = setTimeout(() => {
              isNavScrollRef.current = false;
              pendingHrefRef.current = null;
            }, 120);
          }
        } else {
          setActive(newHref);
        }
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );

    sections.forEach(s => observer.observe(s));
    return () => {
      observer.disconnect();
      clearTimeout(unlockTimerRef.current);
    };
  }, [active]);

  const onNavClick = useCallback(
    href => e => {
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      isNavScrollRef.current = true;
      pendingHrefRef.current = href;

      target.scrollIntoView({
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        block: 'start',
      });

      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    },
    []
  );

  return (
    <nav className="nav-rail" role="navigation" aria-label="Main navigation">
      <ul className="nav-list">
        {NAV_ITEMS.map(({ href, icon, text }) => {
          const isActive = active === href;
          return (
            <li key={href} className="nav-item">
              <a
                href={href}
                className={`nav-link${isActive ? ' active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
                onClick={onNavClick(href)}
                title={text}
              >
                <span className="icon" aria-hidden="true">{icon}</span>
                <span className="label">{text}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
