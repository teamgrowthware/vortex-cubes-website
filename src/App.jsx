import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import StatusHUD from './components/StatusHUD';
import Loader from './components/Loader';
import ScrollHexTracker from './components/ScrollHexTracker';
import CustomCursor from './components/CustomCursor';
import CodeTooltip from './components/CodeTooltip';
import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';
// Component to handle Lenis scroll instantiation globally
const ScrollToTopAndLenis = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Smooth scrolling using Lenis wrapper
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Also forcefully reset scroll on route change just to be safe
    window.scrollTo(0, 0);

    return () => {
      lenis.destroy();
    };
  }, [pathname]);

  return null;
}

// Separate component for the animated routing content
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio/:id" element={<CaseStudy />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [isBooting, setIsBooting] = useState(true);

  return (
    <Router>
      <div className={`app-container ${isBooting ? 'no-scroll' : ''}`}>
        <ScrollToTopAndLenis />
        <CustomCursor />
        <CodeTooltip />
        {isBooting && <Loader onComplete={() => setIsBooting(false)} />}

        <div className="bg-grid"></div>
        <Navigation />
        <StatusHUD />
        <ScrollHexTracker />

        <AnimatedRoutes />

        <footer className="section container" style={{ borderTop: '1px solid var(--bg-border)', padding: '4rem 0', marginTop: '4rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem', textAlign: 'left' }}>

            <div>
              <div className="mono text-accent" style={{ marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: 'bold' }}>VORTEX_CUBES</div>
              <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                Your trusted partner for comprehensive IT solutions and product development. We build custom software that drives business growth.
              </p>
              <div className="mono" style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem' }}>
                <a href="#" className="text-muted hover:text-accent transition-colors">[X]</a>
                <a href="#" className="text-muted hover:text-accent transition-colors">[GITH]</a>
                <a href="#" className="text-muted hover:text-accent transition-colors">[LINK]</a>
              </div>
            </div>

            <div>
              <div className="mono" style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>SYSTEM_LINKS</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} className="text-muted text-sm space-y-3">
                <li style={{ marginBottom: '0.75rem' }}><a href="/#about" className="hover:text-accent transition-colors">About Us</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a href="/#tech" className="hover:text-accent transition-colors">Services</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a href="/#portfolio" className="hover:text-accent transition-colors">Portfolio</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a href="/#contact" className="hover:text-accent transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <div className="mono" style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>SERVICES</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} className="text-muted text-sm space-y-3">
                <li style={{ marginBottom: '0.75rem' }}><a href="/#services" className="hover:text-accent transition-colors">Web Development</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a href="/#services" className="hover:text-accent transition-colors">App Development</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a href="/#services" className="hover:text-accent transition-colors">ERP Solutions</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a href="/#services" className="hover:text-accent transition-colors">CRM Solutions</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a href="/#services" className="hover:text-accent transition-colors">AI & Automation</a></li>
              </ul>
            </div>

            <div>
              <div className="mono text-accent" style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>CONTACT_NODE</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} className="text-muted text-sm space-y-3 mono">
                <li style={{ marginBottom: '0.75rem' }}>
                  <a href="mailto:info@vortexcubes.com" className="hover:text-accent transition-colors">{'>'} info@vortexcubes.com</a>
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <a href="tel:+917049820057" className="hover:text-accent transition-colors">{'>'} +91 7049820057</a>
                </li>
                <li style={{ lineHeight: '1.6', marginTop: '1rem' }}>
                  106, Navrang Plaza, Tower Square<br />
                  Sapna Sangeeta Rd, Indore<br />
                  M.P - 452010
                </li>
              </ul>
            </div>

          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--bg-border)', paddingTop: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <p className="mono text-muted text-sm">© {(new Date()).getFullYear()} VORTEX CUBES // ALL_SYSTEMS_NOMINAL</p>
            <div className="mono text-muted text-sm" style={{ display: 'flex', gap: '2rem' }}>
              <a href="/privacy" className="hover:text-accent transition-colors">PRIVACY_POLICY</a>
              <a href="/terms" className="hover:text-accent transition-colors">TERMS_OF_SERVICE</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
