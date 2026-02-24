import React, { useEffect, useRef } from 'react';
import { Layers, Server, Database, Cloud, MonitorSmartphone, Hexagon } from 'lucide-react';
import { motion } from 'framer-motion';
import { scrambleText } from '../utils/textEffects';
import './TechStack.css';

const stackData = [
  {
    category: 'Frontend',
    icon: <MonitorSmartphone size={20} />,
    techs: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Three.js']
  },
  {
    category: 'Backend',
    icon: <Server size={20} />,
    techs: ['Node.js', 'Express', 'Python', 'GraphQL', 'REST APIs']
  },
  {
    category: 'Database',
    icon: <Database size={20} />,
    techs: ['MongoDB', 'PostgreSQL', 'Redis', 'MySQL', 'Prisma']
  },
  {
    category: 'Cloud & DevOps',
    icon: <Cloud size={20} />,
    techs: ['AWS', 'Docker', 'Vercel', 'GitHub Actions', 'Nginx']
  }
];

const TechStack = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) scrambleText(titleRef.current, 'CORE_STACK');
  }, []);

  return (
    <section id="tech" className="section container">
      <div className="section-header">
        <h2 className="mono"><span className="text-accent">05.</span> <span ref={titleRef}>CORE_STACK</span></h2>
        <div className="header-line"></div>
      </div>

      <div className="stack-grid">
        {stackData.map((item, index) => (
          <motion.div
            key={index}
            className="stack-card glass-panel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div className="stack-header">
              <div className="stack-icon text-accent">{item.icon}</div>
              <h3 className="mono">{item.category}</h3>
            </div>
            <div className="stack-body">
              {item.techs.map((tech, i) => (
                <div key={i} className="tech-item mono">
                  <span className="tech-bullet text-accent"><Hexagon size={12} fill="currentColor" fillOpacity={0.2} /></span> {tech}
                </div>
              ))}
            </div>
            <div className="scan-line"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
