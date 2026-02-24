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
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Also forcefully reset scroll on route change just to be safe
    window.scrollTo(0, 0);

    return () => {
      gsap.ticker.remove(lenis.raf);
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

        <ContactCTA />

        <Footer />
      </div>
    </Router>
  );
}

export default App;
