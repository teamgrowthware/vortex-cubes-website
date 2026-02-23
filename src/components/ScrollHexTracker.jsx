import React, { useState, useEffect } from 'react';
import './ScrollHexTracker.css';

const ScrollHexTracker = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      const maxScroll = documentHeight - windowHeight;
      const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Convert 0-100 progress into a pseudo-hex string
  // For example, 0 -> 0x00, 100 -> 0xFF
  const hexValue = "0x" + Math.floor((scrollProgress / 100) * 255).toString(16).toUpperCase().padStart(2, '0');

  // Interpolate binary bits
  const getBinaryBars = () => {
    const activeBars = Math.floor((scrollProgress / 100) * 8);
    return Array(8).fill(0).map((_, i) => (
      <div key={i} className={`hex-bar ${i < activeBars ? 'active' : ''}`} />
    ));
  };

  return (
    <div className="scroll-hex-tracker glass-panel mono">
      <div className="hex-timeline">
        {getBinaryBars()}
      </div>
      <div className="hex-value text-accent">
        {hexValue}
      </div>
    </div>
  );
};

export default ScrollHexTracker;
