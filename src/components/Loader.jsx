import React, { useState, useEffect } from 'react';
import './Loader.css';

const Loader = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const [isFading, setIsFading] = useState(false);

  const bootSequence = [
    { text: "INIT VORTEX_NUCLEUS_V2.0.4...", delay: 200 },
    { text: "MOUNTING CORE MODULES [OK]", delay: 400 },
    { text: "ESTABLISHING AWS SECURE_TUNNEL...", delay: 600 },
    { text: "LOADING WEBGL 3D_ENVIRONMENT [OK]", delay: 900 },
    { text: "BYPASSING MAINFRAME ENCRYPTION... [ACCESS GRANTED]", delay: 1200 },
    { text: "TARGET ACQUIRED. SYSTEM READY.", delay: 1500 },
  ];

  useEffect(() => {
    // Add lines progressively
    bootSequence.forEach((step, index) => {
      setTimeout(() => {
        setLines(prev => [...prev, step.text]);

        // When the last line is printed, start fade out
        if (index === bootSequence.length - 1) {
          setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
              onComplete();
            }, 500); // Wait for fade out animation
          }, 600); // Hold final screen for a bit
        }
      }, step.delay);
    });
  }, [onComplete]);

  return (
    <div className={`boot-loader mono ${isFading ? 'fade-out' : ''}`}>
      <div className="boot-terminal text-accent">
        {lines.map((line, i) => (
          <div key={i} className="boot-line">
            <span className="prompt">{'>'}</span> {line}
          </div>
        ))}
        {!isFading && <div className="boot-cursor"></div>}
      </div>
    </div>
  );
};

export default Loader;
