import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { scrambleText } from '../utils/textEffects';
import './PortfolioGrid.css';

import { Link, useNavigate } from 'react-router-dom';
import { projectsData } from '../data/projects';

const TiltCard = ({ project, index }) => {
  const ref = useRef(null);
  const navigate = useNavigate();

  // Motion values for tracking mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth the raw mouse values
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Map mouse position to rotation angle (max 10 degrees)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  // Calculate glare position based on mouse
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse position relative to the center of the card
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalize to -0.5 to 0.5
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`bento-card glass-panel group relative ${index === 0 || index === 3 ? 'featured-card' : ''}`}
    >
      {/* 3D Container specific padding to keep content separate from the outer frame */}
      <div style={{ padding: '1.5rem', transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
        {/* Dynamic Glare Overlay */}
        <motion.div
          className="absolute inset-0 z-50 rounded-xl"
          style={{
            background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.08) 0%, transparent 60%)`,
            opacity: useTransform(x, [-0.5, 0, 0.5], [0.8, 0, 0.8]), // Only show glare near edges
            pointerEvents: "none"
          }}
        />

        <div className="bento-scanline"></div>

        {/* Image Container */}
        <div style={{ height: index === 0 || index === 3 ? '240px' : '160px', overflow: 'hidden', borderRadius: '8px', marginBottom: '1.5rem', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1, transition: 'background-color 0.4s' }} className="group-hover:bg-transparent"></div>
          <img
            src={project.image}
            alt={project.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }}
            className="group-hover:scale-105"
          />
          <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 2, transform: "translateZ(20px)", pointerEvents: "auto" }}>
            <span className="badge" style={{ color: 'var(--text-main)', border: '1px solid var(--accent-blue)', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
              {project.type}
            </span>
          </div>
        </div>

        <div className="card-top" style={{ marginBottom: '1rem', transform: "translateZ(40px)" }}>
          <span className="mono text-muted category-t">{project.category}</span>
        </div>

        <div className="card-mid" style={{ transform: "translateZ(50px)" }}>
          <h3 className="group-hover:text-accent transition-colors duration-300">{project.name}</h3>
          <p className="text-muted">{project.desc}</p>
        </div>

        <div className="card-bottom" style={{ transform: "translateZ(40px)", position: "relative", zIndex: 50 }}>
          <div className="tech-tags mono" style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(`/portfolio/${project.id}`);
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--accent-blue)', textDecoration: 'none', cursor: 'pointer', pointerEvents: 'auto', padding: '0.5rem 0' }} className="hover:text-white transition-colors relative z-50">
              Case Study
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PortfolioGrid = () => {
  const titleRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) scrambleText(titleRef.current, 'DATA_BANKS');
  }, []);

  return (
    <section id="portfolio" className="section container" ref={containerRef} style={{ perspective: "1000px" }}>
      <div className="section-header">
        <h2 className="mono"><span className="text-accent">08.</span> <span ref={titleRef}>DATA_BANKS</span></h2>
        <div className="header-line"></div>
      </div>

      <div className="portfolio-bento">
        {projectsData.map((project, index) => (
          <TiltCard key={project.id} project={project} index={index} />
        ))}
      </div>

      <div className="portfolio-footer" style={{ marginTop: '4rem', textAlign: 'center' }}>
        <button className="btn btn-secondary mono" onClick={() => alert('SYSTEM_MSG: Initializing connection to external secure data banks...')}>LOAD_ALL_RECORDS</button>
      </div>
    </section>
  );
};

export default PortfolioGrid;
