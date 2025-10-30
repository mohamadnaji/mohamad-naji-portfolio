import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUser,
  FaStar,
  FaBriefcase,
  FaFolderOpen,
  FaGraduationCap,
  FaEnvelope,
  FaCogs,
  FaChevronRight
} from 'react-icons/fa';
import './MobileNavbar.css';
import logo from '../../../assets/logo.png';

const NAV_ITEMS = [
  { 
    href: '#hero', 
    icon: <FaHome />, 
    text: 'Home',
    color: '#0ea5e9'
  },
  { 
    href: '#about', 
    icon: <FaUser />, 
    text: 'About',
    color: '#06b6d4'
  },
  { 
    href: '#skills', 
    icon: <FaStar />, 
    text: 'Skills',
    color: '#8b5cf6'
  },
  { 
    href: '#services', 
    icon: <FaCogs />, 
    text: 'Services',
    color: '#10b981'
  },
  { 
    href: '#experience', 
    icon: <FaBriefcase />, 
    text: 'Experience',
    color: '#f59e0b'
  },
  { 
    href: '#projects', 
    icon: <FaFolderOpen />, 
    text: 'Projects',
    color: '#ec4899'
  },
  { 
    href: '#education', 
    icon: <FaGraduationCap />, 
    text: 'Education',
    color: '#6366f1'
  },
  { 
    href: '#contact', 
    icon: <FaEnvelope />, 
    text: 'Contact',
    color: '#ef4444'
  },
];

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');
  const [isScrolled, setIsScrolled] = useState(false);
  
  const drawerRef = useRef(null);
  const toggleRef = useRef(null);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const observers = NAV_ITEMS.map(item => {
      const element = document.querySelector(item.href);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(item.href);
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
  }, [isOpen]);

  // Handle navigation click
  const handleNavClick = useCallback((href) => (e) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;

    setActiveSection(href);
    setIsOpen(false);

    setTimeout(() => {
      target.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 300);
  }, []);

  // Toggle menu
  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // Close on backdrop click
  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  }, []);

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Close menu on large screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  return (
    <div className="mobile-nav-wrapper">
      {/* Floating Toggle Button */}
      <button
        ref={toggleRef}
        className={`nav-toggle ${isOpen ? 'open' : ''} ${isScrolled ? 'scrolled' : ''}`}
        onClick={toggleMenu}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <span className="toggle-icon">
          {isOpen ? <FaTimes /> : <FaBars />}
        </span>
        <span className="toggle-bg"></span>
      </button>

      {/* Navigation Drawer */}
      <nav 
        ref={drawerRef}
        className={`nav-drawer ${isOpen ? 'open' : ''}`}
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div className="nav-header">
          <div className="nav-logo-container">
            <img 
              src={logo} 
              alt="Logo" 
              className="nav-logo"
            />
          </div>
        </div>

        {/* Navigation Items */}
        <ul className="nav-list">
          {NAV_ITEMS.map((item, index) => {
            const isActive = activeSection === item.href;
            return (
              <li 
                key={item.href} 
                className="nav-item"
                style={{ '--item-index': index }}
              >
                <a
                  href={item.href}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  onClick={handleNavClick(item.href)}
                  style={{ '--item-color': item.color }}
                >
                  <span className="nav-icon-wrapper">
                    <span className="nav-icon">
                      {item.icon}
                    </span>
                    <span className="nav-icon-glow"></span>
                  </span>
                  
                  <span className="nav-text-wrapper">
                    <span className="nav-label">{item.text}</span>
                  </span>
                  
                  <span className="nav-arrow">
                    <FaChevronRight />
                  </span>
                  
                  <span className="nav-link-bg"></span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Footer */}
        <div className="nav-footer">
          <p className="nav-footer-text">© 2024 Portfolio</p>
        </div>
      </nav>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="nav-backdrop"
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default React.memo(MobileNav);