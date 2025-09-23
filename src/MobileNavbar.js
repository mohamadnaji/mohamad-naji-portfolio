import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUser,
  FaStar,
  FaSuitcase,
  FaFolderOpen,
  FaGraduationCap,
  FaEnvelope
} from 'react-icons/fa';
import './MobileNavbar.css';
import logo from './assets/logo.png';

const NAV_ITEMS = [
  { href: '#hero', icon: <FaHome />, text: 'Home', ariaLabel: 'Navigate to Home section' },
  { href: '#about', icon: <FaUser />, text: 'About', ariaLabel: 'Navigate to About section' },
  { href: '#skills', icon: <FaStar />, text: 'Skills', ariaLabel: 'Navigate to Skills section' },
  { href: '#experience', icon: <FaSuitcase />, text: 'Experience', ariaLabel: 'Navigate to Experience section' },
  { href: '#projects', icon: <FaFolderOpen />, text: 'Projects', ariaLabel: 'Navigate to Projects section' },
  { href: '#education', icon: <FaGraduationCap />, text: 'Education', ariaLabel: 'Navigate to Education section' },
  { href: '#contact', icon: <FaEnvelope />, text: 'Contact', ariaLabel: 'Navigate to Contact section' },
];

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('#hero');
  
  const drawerRef = useRef(null);
  const toggleRef = useRef(null);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef(null);

  // Enhanced scroll handling with auto-hide functionality
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;
      const scrolledEnough = Math.abs(currentScrollY - lastScrollY.current) > 10;

      if (scrolledEnough && !open) {
        setIsVisible(!scrollingDown || currentScrollY < 100);
      }

      lastScrollY.current = currentScrollY;

      // Clear existing timeout
      clearTimeout(scrollTimeout.current);
      
      // Show navbar after scroll stops
      scrollTimeout.current = setTimeout(() => {
        if (!open) {
          setIsVisible(true);
        }
      }, 150);
    };

    const throttledScroll = throttle(handleScroll, 16);
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      clearTimeout(scrollTimeout.current);
    };
  }, [open]);

  // Body scroll lock management
  useEffect(() => {
    const body = document.body;
    if (open) {
      const scrollY = window.scrollY;
      body.style.position = 'fixed';
      body.style.top = `-${scrollY}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.classList.add('mnav-open');
    } else {
      const scrollY = body.style.top;
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.classList.remove('mnav-open');
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }

    return () => {
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.classList.remove('mnav-open');
    };
  }, [open]);

  // Enhanced navigation click handler
  const onNavClick = useCallback((href) => (e) => {
    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    
    // Update active section immediately for better UX
    setActiveSection(href);
    
    // Close menu with slight delay for better visual feedback
    setTimeout(() => setOpen(false), 150);

    // Smooth scroll to target
    setTimeout(() => {
      target.scrollIntoView({ 
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
        inline: 'nearest'
      });

      // Set focus for accessibility
      if (!target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1');
      }
      
      setTimeout(() => {
        target.focus({ preventScroll: true });
        // Clean up tabindex after focus
        setTimeout(() => {
          if (target.getAttribute('tabindex') === '-1') {
            target.removeAttribute('tabindex');
          }
        }, 1000);
      }, 300);
    }, 200);

  }, []);

  // Enhanced toggle handler with haptic feedback
  const handleToggle = useCallback(() => {
    setOpen(prev => !prev);
    
    // Haptic feedback on supported devices
    // if ('vibrate' in navigator) {
    //   navigator.vibrate(50);
    // }
  }, []);

  // Close menu on backdrop click
  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      setOpen(false);
    }
  }, []);

  // Enhanced keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (!open) return;

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        setOpen(false);
        toggleRef.current?.focus();
        break;
      case 'Tab':
        // Trap focus within drawer
        const focusableElements = drawerRef.current?.querySelectorAll(
          'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        const firstElement = focusableElements?.[0];
        const lastElement = focusableElements?.[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
        break;
    }
  }, [open]);

  // Attach keyboard event listeners
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800 && open) {
        setOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [open]);

  return (
    <div className="mobile-nav-container">
      {/* Enhanced toggle button */}
      <button
        ref={toggleRef}
        className={`mnav-toggle ${open ? 'open' : ''}`}
        onClick={handleToggle}
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={open}
        aria-controls="mobile-navigation-drawer"
        style={{
          transform: `scale(${isVisible ? '1' : '0.8'})`,
          opacity: isVisible ? 1 : 0.7,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>

      {/* Enhanced navigation drawer */}
      <nav 
        ref={drawerRef}
        className={`mnav-drawer ${open ? 'open' : ''}`} 
        id="mobile-navigation-drawer"
        aria-label="Mobile primary navigation"
        role="navigation"
      >
        {/* Logo section with enhanced styling */}
        <div className="mnav-logo-wrap">
          <img 
            src={logo} 
            alt="Portfolio logo" 
            className="mnav-logo"
            loading="lazy"
            draggable="false"
          />
          <div className="mnav-brand-text">
            Mohamad Naji
          </div>
        </div>

        {/* Navigation items */}
        <ul className="mnav-list" role="menubar">
          {NAV_ITEMS.map((item, index) => {
            const isActive = activeSection === item.href;
            return (
              <li key={item.href} className="mnav-item" role="none">
                <a
                  href={item.href}
                  className={`mnav-link ${isActive ? 'active' : ''}`}
                  onClick={onNavClick(item.href)}
                  role="menuitem"
                  aria-label={item.ariaLabel}
                  aria-current={isActive ? 'page' : undefined}
                  style={{
                    animationDelay: `${index * 0.05 + 0.1}s`
                  }}
                >
                  <span className="mnav-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="mnav-label">{item.text}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Footer section */}
        <div className="mnav-footer">
          <p className="mnav-footer-text">
            &copy; 2024 Mohamad Naji
          </p>
        </div>
      </nav>

      {/* Enhanced backdrop */}
      {open && (
        <div 
          className="mnav-backdrop" 
          onClick={handleBackdropClick}
          aria-hidden="true"
          role="presentation"
        />
      )}
    </div>
  );
};

// Utility function for throttling scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Performance optimization: Memoize the component
export default React.memo(MobileNav);