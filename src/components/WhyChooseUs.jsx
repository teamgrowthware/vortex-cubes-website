import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Code2, LineChart, Globe, Cpu } from 'lucide-react';
import './WhyChooseUs.css';

const features = [
  {
    icon: <Zap size={28} strokeWidth={1.5} />,
    title: 'High-Performance Systems',
    desc: 'Lightning-fast architecture optimized for heavy workloads and rapid scaling.'
  },
  {
    icon: <ShieldCheck size={28} strokeWidth={1.5} />,
    title: 'Enterprise-Grade Security',
    desc: 'Advanced data protection and compliance measures built into every layer.'
  },
  {
    icon: <Code2 size={28} strokeWidth={1.5} />,
    title: 'Custom Product Engineering',
    desc: 'Tailor-made software solutions designed precisely for your business needs.'
  },
  {
    icon: <Cpu size={28} strokeWidth={1.5} />,
    title: 'AI & Automation Ready',
    desc: 'Future-proof integrations to automate workflows and enhance intelligence.'
  },
  {
    icon: <LineChart size={28} strokeWidth={1.5} />,
    title: 'Data-Driven Growth',
    desc: 'Marketing and analytics strategies focused entirely on ROI and conversions.'
  },
  {
    icon: <Globe size={28} strokeWidth={1.5} />,
    title: 'Global Delivery Network',
    desc: 'Reliable cloud deployments and support teams spanning across time zones.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="section container relative">
      <div className="wcu-bg-glow"></div>

      <div className="section-header" style={{ marginBottom: '4rem' }}>
        <h2 className="mono">
          <span className="text-accent">01.</span> <span>WHY_CHOOSE_US</span>
        </h2>
        <div className="header-line"></div>
      </div>

      <div className="wcu-layout">
        <div className="wcu-text-side">
          <motion.h3
            className="wcu-main-heading"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Engineering digital excellence. <br />
            <span>Built to scale.</span>
          </motion.h3>

          <motion.p
            className="text-muted wcu-desc"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
          >
            At Vortex Cubes, we don't just write code—we build comprehensive technology ecosystems. We pair elite software engineering with strategic digital growth initiatives to ensure your product not only functions flawlessly but dominates its market.
          </motion.p>
        </div>

        <motion.div
          className="wcu-grid-side"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, idx) => (
            <motion.div key={idx} className="wcu-feature-card glass-panel group" variants={itemVariants}>
              <div className="wcu-icon-wrapper text-accent group-hover:text-white transition-colors duration-300">
                {feature.icon}
              </div>
              <div>
                <h4 className="wcu-feature-title">{feature.title}</h4>
                <p className="text-muted text-sm">{feature.desc}</p>
              </div>
              <div className="wcu-card-highlight"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
