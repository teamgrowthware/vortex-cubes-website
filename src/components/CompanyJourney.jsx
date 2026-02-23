import React, { useEffect, useRef } from 'react';
import { Database, Users, Globe2, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import { scrambleText } from '../utils/textEffects';
import './CompanyJourney.css';

const stats = [
  { id: 1, icon: <Cpu />, title: 'Projects Delivered', value: '50+', desc: 'Enterprise grade applications delivered.' },
  { id: 2, icon: <Users />, title: 'Active Clients', value: '30+', desc: 'Startups and corporations empowered.' },
  { id: 3, icon: <Globe2 />, title: 'Cities Served', value: '10+', desc: 'Global presence across major tech hubs.' },
];

const milestones = [
  { id: 1, year: '2022', title: 'Inception as AI Integrator', desc: 'Founded by Pratyaksh Lutare in November 2022, focusing on AI-driven solutions and seamless technology integrations.' },
  { id: 2, year: '2023-24', title: 'Growth & Expansion', desc: 'Expanded our services globally, delivering enterprise-grade applications and empowering startups with cutting-edge tech.' },
  { id: 3, year: '2025', title: 'Evolution to Vortex Cubes', desc: 'In September 2025, rebranded as Vortex Cubes to reflect our broader mission of building highly scalable systems and SaaS platforms.' },
  { id: 4, year: 'Present', title: 'Global Operations', desc: 'Continuing to drive business growth through custom software development, AI integration, and robust data center solutions.' },
];

const CompanyJourney = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) scrambleText(titleRef.current, 'SYSTEM_METRICS');
  }, []);

  return (
    <section id="journey" className="section container">
      <div className="section-header">
        <h2 className="mono"><span className="text-accent">01.</span> <span ref={titleRef}>SYSTEM_METRICS</span></h2>
        <div className="header-line"></div>
      </div>

      <div className="journey-stats grid-cols-1 md:grid-cols-3" style={{ display: 'grid', gap: '2rem', marginBottom: '4rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
        {stats.map((item, index) => (
          <motion.div
            key={item.id}
            className="timeline-node glass-panel"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div className="node-icon text-accent">{item.icon}</div>
            <div className="node-content">
              <h3 className="node-value">{item.value}</h3>
              <h4 className="node-title mono">{item.title}</h4>
              <p className="node-desc text-muted">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="journey-timeline relative">
        {/* The central wire that spans the whole height */}
        <div className="timeline-wire"></div>

        {/* The animated glow traversing down the wire */}
        <motion.div
          className="timeline-glow"
          initial={{ top: '0%', opacity: 0 }}
          whileInView={{ top: '100%', opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 2, ease: "linear" }}
        />

        {milestones.map((item, index) => (
          <motion.div
            key={item.id}
            className="timeline-item"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* The little glowing connection dot on the wire */}
            <motion.div
              className="timeline-node-point"
              initial={{ scale: 0, backgroundColor: 'var(--bg-dark)' }}
              whileInView={{ scale: 1, backgroundColor: '#00f0ff' }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ duration: 0.4, delay: 0.3 }}
            />

            <div className="timeline-content glass-panel">
              <span className="timeline-year mono">{item.year}</span>
              <h4 className="timeline-title mono text-accent">{item.title}</h4>
              <p className="timeline-desc">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CompanyJourney;
