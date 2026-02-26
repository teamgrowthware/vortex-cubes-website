import React from 'react';
import { BookOpen, PhoneCall, Box, Menu, X } from 'lucide-react';
import './Navigation.css';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false); // Close menu on click
    }
  };

  return (
    <nav className="nav-container glass-panel">
      <div className="nav-brand">
        <Box size={24} className="text-accent" />
        <span className="mono brand-text">VORTEX CUBES </span>
      </div>

      <div className="nav-links mono">
        <a href="#hero" onClick={(e) => handleScroll(e, 'hero')}>HOME</a>
        <a href="#industries" onClick={(e) => handleScroll(e, 'industries')}>SECTORS</a>
        <a href="#globe" onClick={(e) => handleScroll(e, 'globe')}>GLOBAL</a>
        <a href="#portfolio" onClick={(e) => handleScroll(e, 'portfolio')}>PORTFOLIO</a>
        <a href="/about">ABOUT US</a>
      </div>

      <div className="nav-actions">
        <button
          className="btn btn-secondary"
          onClick={() => alert('SYSTEM.DOCS: Accessing external resources...')}
          data-code-tooltip="fetch('/api/v1/resources')&#10;  .then(res => res.json())"
        >
          <BookOpen size={16} /> <span style={{ marginLeft: '0.5rem' }}>RESOURCES</span>
        </button>
        <button
          className="btn btn-primary"
          onClick={(e) => handleScroll(e, 'contact')}
          data-code-tooltip="function initContact() {&#10;  router.push('#contact');&#10;}"
        >
          <PhoneCall size={16} /> <span style={{ marginLeft: '0.5rem' }}>CONTACT US</span>
        </button>
      </div>

      {/* Hamburger Menu Toggle (Mobile Only) */}
      <button
        className="mobile-menu-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} className="text-accent" /> : <Menu size={24} className="text-accent" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay glass-panel">
          <div className="mobile-nav-links mono">
            <a href="#hero" onClick={(e) => handleScroll(e, 'hero')}>HOME</a>
            <a href="#industries" onClick={(e) => handleScroll(e, 'industries')}>SECTORS</a>
            <a href="#globe" onClick={(e) => handleScroll(e, 'globe')}>GLOBAL</a>
            <a href="#portfolio" onClick={(e) => handleScroll(e, 'portfolio')}>PORTFOLIO</a>
            <a href="/about">ABOUT US</a>
          </div>
          <div className="mobile-nav-actions">
            <button
              className="btn btn-secondary w-full"
              onClick={() => alert('SYSTEM.DOCS: Accessing external resources...')}
            >
              <BookOpen size={16} /> <span style={{ marginLeft: '0.5rem' }}>RESOURCES</span>
            </button>
            <button
              className="btn btn-primary w-full"
              onClick={(e) => handleScroll(e, 'contact')}
            >
              <PhoneCall size={16} /> <span style={{ marginLeft: '0.5rem' }}>CONTACT US</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
