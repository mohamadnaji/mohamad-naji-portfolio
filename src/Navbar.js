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

const Navbar = () => {
  const [active, setActive] = useState('#hero');
  const isNavScrollRef = useRef(false);
  const pendingHrefRef = useRef(null);
  const lastScrollYRef = useRef(0);
  const scrollDirectionRef = useRef('down');
  const unlockTimerRef = useRef(null);

  // Track scroll direction for better section highlighting
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      scrollDirectionRef.current = currentY > lastScrollYRef.current ? 'down' : 'up';
      lastScrollYRef.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection observer for automatic section highlighting
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map(item => item.href.slice(1));
    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Skip updates during programmatic scrolling
        if (isNavScrollRef.current) return;

        const visibleSections = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visibleSections[0]?.target?.id) return;

        const newHref = `#${visibleSections[0].target.id}`;
        
        // Only update if it's actually different
        if (newHref !== active) {
          setActive(newHref);
        }
      },
      { 
        rootMargin: '-20% 0px -20% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    );

    sections.forEach(section => observer.observe(section));
    
    return () => {
      observer.disconnect();
      clearTimeout(unlockTimerRef.current);
    };
  }, [active]);

  // Handle navigation clicks
  const handleNavClick = useCallback((href) => (e) => {
    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    // Immediately update active state
    setActive(href);

    // Set scroll lock with longer duration
    isNavScrollRef.current = true;
    pendingHrefRef.current = href;

    // Clear any existing unlock timer
    clearTimeout(unlockTimerRef.current);

    // Smooth scroll to section
    target.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches 
        ? 'auto' 
        : 'smooth',
      block: 'start',
    });

    // Set focus for accessibility
    if (!target.hasAttribute('tabindex')) {
      target.setAttribute('tabindex', '-1');
    }
    target.focus({ preventScroll: true });

    // Unlock after scroll completes (longer timeout for long scrolls)
    unlockTimerRef.current = setTimeout(() => {
      isNavScrollRef.current = false;
      pendingHrefRef.current = null;
    }, 1500);
  }, []);

  return (
    <nav 
      className="nav-rail" 
      role="navigation" 
      aria-label="Main navigation"
    >
      <ul className="nav-list">
        {NAV_ITEMS.map(({ href, icon, text }) => {
          const isActive = active === href;
          return (
            <li key={href} className="nav-item">
              <a
                href={href}
                className={`nav-link${isActive ? ' active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
                onClick={handleNavClick(href)}
                title={text}
                aria-label={`Navigate to ${text} section`}
              >
                <span className="icon" aria-hidden="true">
                  {icon}
                </span>
                <span className="label">{text}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;