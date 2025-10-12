import React, { useEffect, useState, useCallback } from 'react';
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
  const [isScrolling, setIsScrolling] = useState(false);

  // Use Intersection Observer with simpler logic
  useEffect(() => {
    // Create intersection observer with generous margins
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio
        let maxRatio = 0;
        let activeEntry = null;

        entries.forEach(entry => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            activeEntry = entry;
          }
        });

        // If we found a visible section, update active
        if (activeEntry && maxRatio > 0 && !isScrolling) {
          const sectionId = activeEntry.target.id;
          const href = `#${sectionId}`;
          setActive(href);
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        rootMargin: '-50% 0px -50% 0px'
      }
    );

    // Observe all sections
    NAV_ITEMS.forEach(item => {
      const element = document.getElementById(item.href.slice(1));
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [isScrolling]);

  // Handle navigation click
  const handleNavClick = useCallback((href) => (e) => {
    e.preventDefault();
    const targetId = href.slice(1);
    const target = document.getElementById(targetId);
    
    if (!target) return;

    setActive(href);
    setIsScrolling(true);

    // Scroll to section
    target.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });

    // Set focus
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });

    // Re-enable observer after scroll completes
    setTimeout(() => {
      setIsScrolling(false);
    }, 2000);
  }, []);

  return (
    <nav className="nav-rail" role="navigation" aria-label="Main navigation">
      <ul className="nav-list">
        {NAV_ITEMS.map(({ href, icon, text }) => {
          const isActive = active === href;
          return (
            <li key={href} className={`nav-item${isActive ? ' active' : ''}`}>
              <a
                href={href}
                className={`nav-link${isActive ? ' active' : ''}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={handleNavClick(href)}
                title={text}
                aria-label={`Navigate to ${text} section`}
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
};

export default Navbar;