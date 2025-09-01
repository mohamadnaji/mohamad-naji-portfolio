import React, { useState, useCallback } from 'react';
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
import logo from './assets/logo.png'; // adjust path if needed

const NAV_ITEMS = [
  { href: '#hero', icon: <FaHome />, text: 'Home' },
  { href: '#about', icon: <FaUser />, text: 'About' },
  { href: '#skills', icon: <FaStar />, text: 'Skills' },
  { href: '#experience', icon: <FaSuitcase />, text: 'Experience' },
  { href: '#projects', icon: <FaFolderOpen />, text: 'Projects' },
  { href: '#education', icon: <FaGraduationCap />, text: 'Education' },
  { href: '#contact', icon: <FaEnvelope />, text: 'Contact' },
];

const MobileNav = () => {
  const [open, setOpen] = useState(false);

  const onNavClick = useCallback((href) => (e) => {
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setOpen(false);
  }, []);

  return (
    <div className="mobile-nav-container">
      {/* Top bar with toggle */}
      <div className="mnav-header">
        <button
          className={`mnav-toggle ${open ? 'open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Drawer */}
      <nav className={`mnav-drawer ${open ? 'open' : ''}`} aria-label="Mobile primary">
        <div className="mnav-logo-wrap">
          <img src={logo} alt="Site logo" className="mnav-logo" />
        </div>
        <ul className="mnav-list">
          {NAV_ITEMS.map((item) => (
            <li key={item.href} className="mnav-item">
              <a
                href={item.href}
                className="mnav-link"
                onClick={onNavClick(item.href)}
              >
                <span className="mnav-icon">{item.icon}</span>
                <span className="mnav-label">{item.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Backdrop */}
      {open && <div className="mnav-backdrop" onClick={() => setOpen(false)} />}
    </div>
  );
};

export default MobileNav;
