import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { scrambleText } from '../utils/textEffects';
import './PortfolioGrid.css';

const projects = [
  {
    name: "Samriddhi",
    category: "Agro Tech",
    desc: "Agricultural product registration and online inventory management.",
    type: "Dashboard",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop", // Swapped to a working agriculture tech image
    link: "#",
    caseStudy: "/portfolio/samriddhi"
  },
  {
    name: "Kohlico",
    category: "E-commerce",
    desc: "Digital sales and online business management.",
    type: "E-commerce",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop",
    link: "#",
    caseStudy: "/portfolio/kohlico"
  },
  {
    name: "Orbosis Global",
    category: "IT Services",
    desc: "Comprehensive IT service delivery and scalable infrastructure.",
    type: "Service Portal",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    link: "#",
    caseStudy: "/portfolio/orbosis-global"
  },
  {
    name: "Paper Bill",
    category: "Accounting CRM",
    desc: "Itemized billing and powerful cost calculation engine.",
    type: "Web App",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop",
    link: "#",
    caseStudy: "/portfolio/paper-bill"
  },
  {
    name: "Velocity Corp",
    category: "EdTech Platform",
    desc: "Complete corporate training center website with Student Portal & Admin Dashboard.",
    type: "LMS & CRM",
    image: "/images/velocity-preview.png", // USER_ACTION: Save your screenshot as velocity-preview.png in public/images/ folder
    link: "#",
    caseStudy: "/portfolio/velocity"
  },
  {
    name: "Scalyx",
    category: "Finance Dashboard",
    desc: "Financial cost analysis and modeling application.",
    type: "Web App",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    link: "#",
    caseStudy: "/portfolio/scalyx"
  }
];

const TiltCard = ({ project, index }) => {
  const ref = useRef(null);

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
          className="pointer-events-none absolute inset-0 z-50 rounded-xl"
          style={{
            background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.08) 0%, transparent 60%)`,
            opacity: useTransform(x, [-0.5, 0, 0.5], [0.8, 0, 0.8]), // Only show glare near edges
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
          <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 2, transform: "translateZ(20px)" }}>
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

        <div className="card-bottom" style={{ transform: "translateZ(40px)" }}>
          <div className="tech-tags mono" style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-main)', textDecoration: 'none' }} className="hover:text-accent transition-colors">
              <ExternalLink size={14} /> Visit Site
            </a>
            <a href={project.caseStudy} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--accent-blue)', textDecoration: 'none' }} className="hover:text-white transition-colors">
              Case Study
            </a>
          </div>
          <button className="icon-btn text-accent" onClick={() => alert(`SYSTEM_MSG: Accessing secure project files for ${project.name}...`)}>
            <ArrowUpRight size={20} />
          </button>
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
        {projects.map((project, index) => (
          <TiltCard key={index} project={project} index={index} />
        ))}
      </div>

      <div className="portfolio-footer" style={{ marginTop: '4rem', textAlign: 'center' }}>
        <button className="btn btn-secondary mono" onClick={() => alert('SYSTEM_MSG: Initializing connection to external secure data banks...')}>LOAD_ALL_RECORDS</button>
      </div>
    </section>
  );
};

export default PortfolioGrid;
