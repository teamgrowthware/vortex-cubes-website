import React from 'react';
import { Terminal, Crosshair, Box } from 'lucide-react';
import './Navigation.css';

const Navigation = () => {
  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="nav-container glass-panel">
      <div className="nav-brand">
        <Box size={24} className="text-accent" />
        <span className="mono brand-text">VORTEX CUBES </span>
      </div>

      <div className="nav-links mono">
        <a href="#hero" onClick={(e) => handleScroll(e, 'hero')}>SYS_INIT</a>
        <a href="#tech" onClick={(e) => handleScroll(e, 'tech')}>STACK</a>
        <a href="#globe" onClick={(e) => handleScroll(e, 'globe')}>GLOBAL_NET</a>
        <a href="#portfolio" onClick={(e) => handleScroll(e, 'portfolio')}>DATA_BANKS</a>
      </div>

      <div className="nav-actions">
        <button
          className="btn btn-secondary"
          onClick={() => alert('SYSTEM.DOCS: Accessing internal documentation...')}
          data-code-tooltip="fetch('/api/v1/docs/internal')&#10;  .then(res => res.json())"
        >
          <Terminal size={16} /> <span style={{ marginLeft: '0.5rem' }}>DOCS</span>
        </button>
        <button
          className="btn btn-primary"
          onClick={(e) => handleScroll(e, 'demo')}
          data-code-tooltip="function initDeployment() {&#10;  router.push('#demo');&#10;}"
        >
          <Crosshair size={16} /> <span style={{ marginLeft: '0.5rem' }}>DEPLOY</span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
