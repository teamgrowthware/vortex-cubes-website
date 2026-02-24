import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, ShoppingCart, Landmark, Stethoscope, GraduationCap, Rocket, Building2, Home as HomeIcon, Truck, Cpu } from 'lucide-react';
import './Industries.css';

const industries = [
  { id: 1, name: 'IT & Software', icon: <Code size={24} />, desc: "Custom enterprise software, cloud architecture, and modern scalable web applications." },
  { id: 2, name: 'E-Commerce', icon: <ShoppingCart size={24} />, desc: "High-conversion storefronts, inventory systems, and secure global payment gateways." },
  { id: 3, name: 'FinTech', icon: <Landmark size={24} />, desc: "Secure banking portals, algorithmic trading tools, and blockchain integrations." },
  { id: 4, name: 'Healthcare', icon: <Stethoscope size={24} />, desc: "HIPAA-compliant patient portals, telemetry, and advanced hospital management CRM." },
  { id: 5, name: 'EdTech', icon: <GraduationCap size={24} />, desc: "Interactive Learning Management Systems (LMS) and virtual classroom platforms." },
  { id: 6, name: 'Startups & SaaS', icon: <Rocket size={24} />, desc: "Rapid MVP development, multi-tenant architectures, and scalable cloud deployments." },
  { id: 7, name: 'Enterprises', icon: <Building2 size={24} />, desc: "Legacy system modernization, secure data migrations, and automated workflows." },
  { id: 8, name: 'Real Estate', icon: <HomeIcon size={24} />, desc: "Virtual property tours, smart contract leasing, and comprehensive broker dashboards." },
  { id: 9, name: 'Logistics Tech', icon: <Truck size={24} />, desc: "Real-time fleet tracking, supply chain AI, and automated warehouse management." },
];

const Industries = () => {
  const [activeId, setActiveId] = useState(1);

  const activeIndustry = industries.find(ind => ind.id === activeId);

  return (
    <section id="industries" className="section container" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      <div className="section-header" style={{ marginBottom: '1.5rem' }}>
        <h2 className="mono"><span className="text-accent">02.</span> <span>SECTORS</span></h2>
        <div className="header-line"></div>
      </div>

      <div className="industries-header" style={{ marginBottom: '4rem', maxWidth: '800px' }}>
        <h3 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>
          For Every Industry We have Solution
        </h3>
        <p className="text-muted" style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>
          We deliver custom software solutions for every industry, enhancing productivity, streamlining operations, and driving growth with innovative, reliable, and scalable technology.
        </p>
      </div>

      <div className="industries-layout">

        {/* Left Side: Interactive List */}
        <div className="industries-list">
          {industries.map((ind) => (
            <div
              key={ind.id}
              className={`industry-list-item mono ${activeId === ind.id ? 'active' : ''}`}
              onMouseEnter={() => setActiveId(ind.id)}
              onClick={() => {
                const portfolioSection = document.getElementById('portfolio');
                if (portfolioSection) portfolioSection.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <div className="item-indicator"></div>
              <span className="item-name">{ind.name}</span>
              {activeId === ind.id && <span className="item-status text-accent">[ACTIVE]</span>}
            </div>
          ))}
        </div>

        {/* Right Side: Dynamic Presentation Panel */}
        <div className="industries-display glass-panel">
          <div className="display-scanline"></div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              className="display-content"
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="display-icon-wrapper">
                <div className="icon-glow"></div>
                <div className="icon-main text-accent">
                  {activeIndustry?.icon}
                </div>
              </div>

              <div className="display-text">
                <h3 className="mono text-accent" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                  {activeIndustry?.name}
                </h3>
                <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
                  {activeIndustry?.desc}
                </p>
              </div>

              <div className="display-metrics mono">
                <div className="metric">
                  <span className="text-muted">SYS_READY:</span>
                  <span className="text-accent">TRUE</span>
                </div>
                <div className="metric">
                  <span className="text-muted">SECTOR_ID:</span>
                  <span className="text-main">0x0{activeIndustry?.id}</span>
                </div>
              </div>

              <button
                className="btn btn-primary mono mt-6"
                style={{ width: '100%', marginTop: '2rem' }}
                onClick={() => {
                  alert(`SYSTEM_MSG: Routing to ${activeIndustry?.name} solutions...`);
                }}
              >
                INITIALIZE_SOLUTION
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Industries;
