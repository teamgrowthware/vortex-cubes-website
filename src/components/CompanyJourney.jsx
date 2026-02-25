import React, { useEffect, useRef } from 'react';
import { Database, Users, Globe2, Cpu, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrambleText } from '../utils/textEffects';
import './CompanyJourney.css';

const stats = [
  { id: 1, icon: <Cpu size={44} strokeWidth={1.5} color="#3b82f6" />, title: 'Projects Delivered', value: '145+', desc: 'Enterprise grade applications delivered.' },
  { id: 2, icon: <Users size={44} strokeWidth={1.5} color="#3b82f6" />, title: 'Active Clients', value: '30+', desc: 'Startups and corporations empowered.' },
  { id: 3, icon: <Globe2 size={44} strokeWidth={1.5} color="#3b82f6" />, title: 'Countries Served', value: '10+', desc: 'Global presence across major tech hubs.' },
  { id: 4, icon: <Activity size={44} strokeWidth={1.5} color="#3b82f6" />, title: 'Client Retention Rate', value: '95%', desc: 'Long-term partnerships built on trust and reliable delivery.' },
];

const milestones = [
  { id: 1, year: '2022', title: 'Inception as AI Integrator', desc: 'Founded by Pratyaksh Lutare in November 2022, focusing on AI-driven solutions and seamless technology integrations.' },
  { id: 2, year: '2023-24', title: 'Growth & Expansion', desc: 'Expanded our services globally, delivering enterprise-grade applications and empowering startups with cutting-edge tech.' },
  { id: 3, year: '2025', title: 'Evolution to Vortex Cubes', desc: 'In September 2025, rebranded as Vortex Cubes to reflect our broader mission of building highly scalable systems and SaaS platforms.' },
  { id: 4, year: 'Present', title: 'Global Operations', desc: 'Continuing to drive business growth through custom software development, AI integration, and robust data center solutions.' },
];

const CompanyJourney = () => {
  const titleRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (titleRef.current) scrambleText(titleRef.current, 'SYSTEM_METRICS');
  }, []);

  // GSAP ScrollTrigger for pinning and sequential highlight
  useEffect(() => {
    const container = scrollContainerRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !wrapper) return;

    let ctx = gsap.context(() => {
      // Only apply horizontal scroll pinning on desktop
      if (window.innerWidth > 768) {
        // Calculate how much horizontal scroll is needed to show all cards
        const overflow = Math.max(0, container.scrollWidth - window.innerWidth + 100);

        // Pin the section and animate horizontal scroll
        gsap.to(container, {
          x: -overflow, // Pan horizontally only if it overflows
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            pin: true,
            scrub: 1,
            start: 'center center', // Pin perfectly in the center of the viewport
            end: '+=2500', // Pin duration (scroll distance)
            onUpdate: (self) => {
              // Calculate which card should be active (only ONE at a time)
              let idx = Math.floor(self.progress * milestones.length);
              // Clamp value to array bounds
              idx = Math.max(0, Math.min(idx, milestones.length - 1));

              // Manually update the DOM to avoid React re-renders during pinning
              if (container && container.children) {
                Array.from(container.children).forEach((child, i) => {
                  if (i === idx) {
                    child.classList.add('active');
                  } else {
                    child.classList.remove('active');
                  }
                });
              }
            }
          }
        });
      } else {
        // On mobile, just apply standard fade-in or leave it to CSS
        // GSAP ScrollTrigger could still highlight items as they scroll into view
        const items = gsap.utils.toArray('.timeline-item');
        items.forEach((item) => {
          gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: 'top center+=200',
              end: 'bottom center',
              toggleClass: 'active',
            }
          });
        });
      }
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" className="section container">
      <div className="section-header">
        <h2 className="mono"><span className="text-accent">04.</span> <span ref={titleRef}>SYSTEM_METRICS</span></h2>
        <div className="header-line"></div>
      </div>

      <div className="journey-stats">
        {stats.map((item, index) => (
          <motion.div
            key={item.id}
            className="timeline-node glass-panel"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div className="node-icon">{item.icon}</div>
            <div className="node-content">
              <h3 className="node-value text-accent">{item.value}</h3>
              <h4 className="node-title mono">{item.title}</h4>
              <p className="node-desc text-muted">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="journey-container-pinned" ref={wrapperRef} style={{ width: '100%' }}>
        <div className="section-header" style={{ marginTop: '6rem', marginBottom: '4rem' }}>
          <h2 className="mono"><span className="text-accent">05.</span> <span>COMPANY_JOURNEY</span></h2>
          <div className="header-line"></div>
        </div>

        <div style={{ overflow: 'hidden' }}>
          <div className="journey-timeline relative" ref={scrollContainerRef} style={{ width: 'max-content', paddingRight: '10vw' }}>

            {milestones.map((item, index) => (
              <div
                key={item.id}
                className={`timeline-item ${index === 0 ? 'active' : ''}`}
              >
                {/* The little glowing connection dot on the wire */}
                <div className="timeline-node-point" />

                <div className="timeline-content glass-panel">
                  <span className="timeline-year mono">{item.year}</span>
                  <h4 className="timeline-title mono text-accent">{item.title}</h4>
                  <p className="timeline-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyJourney;
