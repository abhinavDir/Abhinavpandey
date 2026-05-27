import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX, HiSun, HiMoon } from 'react-icons/hi';
import Magnetic from '../Magnetic/Magnetic';
import './Navbar.css';

const navItems = [
  { label: 'home', id: 'home' },
  { label: ' about', id: 'about' },
  { label: ' skills', id: 'skills' },
  { label: ' projects', id: 'projects' },
  { label: ' contact', id: 'contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Always start in light mode on every page load
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const handleScroll = () => {
      // Background styling trigger
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section based on scroll offsets
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Apply theme to <html> immediately
    document.documentElement.setAttribute('data-theme', theme);
    // Only save to localStorage after user has interacted (not on first mount)
  }, [theme]);

  // Save to localStorage only when user toggles (not on initial load)
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem('theme', theme);
    }
  }, [theme, hasMounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo */}
          <Magnetic strength={0.25}>
            <div className="navbar-logo" onClick={() => handleNavClick('home')}>
              <span className="logo-tag">&lt;</span>
              <span className="logo-name">Abhinav Pandey</span>
              <span className="logo-tag"> /&gt;</span>
            </div>
          </Magnetic>

          {/* Desktop Nav Items */}
          <nav className="desktop-nav">
            {navItems.map((item) => (
              <Magnetic key={item.id} strength={0.2}>
                <div
                  className={`nav-link-item ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="nav-active-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </div>
              </Magnetic>
            ))}

            {/* Theme Toggle for Desktop */}
            <Magnetic strength={0.3}>
              <button
                onClick={toggleTheme}
                className="theme-toggle-btn"
                aria-label="Toggle theme mode"
              >
                {theme === 'dark' ? <HiSun size={20} /> : <HiMoon size={20} />}
              </button>
            </Magnetic>
          </nav>

          {/* Mobile Right Controls */}
          <div className="mobile-controls">
            {/* Theme Toggle for Mobile */}
            <Magnetic strength={0.3}>
              <button
                onClick={toggleTheme}
                className="theme-toggle-btn mobile-theme-btn"
                aria-label="Toggle theme mode"
              >
                {theme === 'dark' ? <HiSun size={20} /> : <HiMoon size={20} />}
              </button>
            </Magnetic>

            {/* Hamburger Menu Icon */}
            <div className="mobile-toggle">
              <Magnetic strength={0.4}>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle Menu"
                >
                  {mobileMenuOpen ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-nav-drawer"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="mobile-drawer-header">
              <div className="navbar-logo" onClick={() => handleNavClick('home')}>
                <span className="logo-tag">&lt;</span>
                <span className="logo-name font-title">Abhinav</span>
                <span className="logo-tag"> /&gt;</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Menu"
                className="close-drawer-btn"
              >
                <HiX size={28} />
              </button>
            </div>

            <nav className="mobile-nav-links">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx, type: 'spring' }}
                  className={`mobile-link-item ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <span className="mobile-link-num">0{idx + 1}.</span>
                  <span className="mobile-link-text">{item.label.replace('// ', '')}</span>
                </motion.div>
              ))}
            </nav>
            <div className="mobile-drawer-footer">
              <p>© 2026 Abhinav Pandey</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
