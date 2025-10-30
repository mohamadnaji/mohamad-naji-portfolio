// src/components/ThemeToggle.js
import React, { useEffect, useState } from 'react';
import './ThemeToggle.css';

const STORAGE_KEY = 'theme'; // 'light' | 'dark'

function getInitialTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  return prefersLight ? 'light' : 'dark';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggle = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  const isLight = theme === 'light';

  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-pressed={isLight}
      aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      title={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
    >
      <span className="toggle-inner">
        {isLight ? (
          <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.79 1.8-1.79zm10.48 14.32l1.79 1.79 1.79-1.79-1.79-1.8-1.79 1.8zM12 4V1h-0v3h0zm0 19v-3h0v3h0zM4 12H1v0h3v0zm19 0h-3v0h3v0zM6.76 19.16l-1.8 1.79L3.17 19.16l1.79-1.79 1.8 1.79zM17.24 4.84l1.79-1.79 1.79 1.79-1.79 1.79-1.79-1.79zM12 6a6 6 0 100 12A6 6 0 0012 6z"/>
          </svg>
        ) : (
          <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M21.64 13.02A9 9 0 1111 2.36a7 7 0 1010.64 10.66z"/>
          </svg>
        )}
        <span className="label">{isLight ? 'Light' : 'Dark'}</span>
      </span>
    </button>
  );
}
