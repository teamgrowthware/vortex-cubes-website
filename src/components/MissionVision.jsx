import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye } from 'lucide-react';
import './MissionVision.css';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const MissionVision = () => {
  return (
    <section id="mission-vision" className="section container">

      <div className="mv-grid">
        {/* Mission Card */}
        <motion.div
          className="mv-card glass-panel group"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="mv-card-bg bg-mission"></div>
          <div className="mv-content relative z-10">
            <div className="mv-header">
              <div className="mv-icon-wrapper">
                <Target size={28} className="text-accent group-hover:text-white transition-colors" />
                <div className="mv-icon-glow"></div>
              </div>
              <h3 className="mono text-2xl font-bold">OUR_MISSION</h3>
            </div>
            <p className="mv-desc text-muted mt-6">
              To empower global businesses by engineering highly scalable, secure, and innovative software solutions. We bridge the gap between complex technological challenges and streamlined, data-driven growth strategies.
            </p>
          </div>
        </motion.div>

        {/* Vision Card */}
        <motion.div
          className="mv-card glass-panel group"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2 }}
        >
          <div className="mv-card-bg bg-vision"></div>
          <div className="mv-content relative z-10">
            <div className="mv-header">
              <div className="mv-icon-wrapper">
                <Eye size={28} className="text-accent group-hover:text-white transition-colors" />
                <div className="mv-icon-glow"></div>
              </div>
              <h3 className="mono text-2xl font-bold">OUR_VISION</h3>
            </div>
            <p className="mv-desc text-muted mt-6">
              To be the premier digital transformation partner for enterprises worldwide, setting the industry benchmark for blending cutting-edge Artificial Intelligence with bespoke, high-performance product architecture.
            </p>
          </div>
        </motion.div>
      </div>

    </section>
  );
};

export default MissionVision;
