import React from 'react';
import { motion } from 'framer-motion';
import { MonitorPlay, TrendingUp, LayoutTemplate, Bot, Megaphone, CloudCog } from 'lucide-react';
import './Services.css';

const servicesData = [
  {
    id: 1,
    title: 'Web & SaaS Product Development',
    desc: 'Build custom scalable web applications, SaaS platforms, admin dashboards and business systems optimized for performance.',
    icon: <MonitorPlay size={32} strokeWidth={1.5} />,
  },
  {
    id: 2,
    title: 'Digital Growth & Marketing Strategy',
    desc: 'Craft holistic digital plans including SEO, paid ads, funnels and audience targeting to boost visibility and conversions.',
    icon: <TrendingUp size={32} strokeWidth={1.5} />,
  },
  {
    id: 3,
    title: 'Performance Websites & Conversion Design',
    desc: 'High-speed responsive websites and landing pages focused on engagement and conversion optimization.',
    icon: <LayoutTemplate size={32} strokeWidth={1.5} />,
  },
  {
    id: 4,
    title: 'Automation, AI & Smart Integrations',
    desc: 'Integrate automation workflows, AI features, APIs and smart tools to enhance productivity and intelligence.',
    icon: <Bot size={32} strokeWidth={1.5} />,
  },
  {
    id: 5,
    title: 'Social Media & Paid Campaign Management',
    desc: 'Manage brand growth, social media content, Meta & Google ads and ROI-focused performance campaigns.',
    icon: <Megaphone size={32} strokeWidth={1.5} />,
  },
  {
    id: 6,
    title: 'Cloud, DevOps & Data-Driven Insights',
    desc: 'Setup secure cloud infrastructure, CI/CD pipelines, analytics tracking and performance reporting systems.',
    icon: <CloudCog size={32} strokeWidth={1.5} />,
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const Services = () => {
  return (
    <section id="services" className="services-section section container relative">
      {/* Background abstract elements */}
      <div className="services-bg-glow"></div>

      <div className="section-header" style={{ marginBottom: '2rem' }}>
        <h2 className="mono">
          <span className="text-accent">03.</span> <span>SERVICES</span>
        </h2>
        <div className="header-line"></div>
      </div>

      <div className="services-header text-center mx-auto" style={{ maxWidth: '800px', marginBottom: '4rem' }}>
        <h3 className="services-main-heading">
          Comprehensive Digital Services — From Development to Growth
        </h3>

        <p className="services-subheading text-muted">
          We build scalable technology systems and growth-driven marketing strategies to help businesses scale smarter.
        </p>
      </div>

      <motion.div
        className="services-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {servicesData.map((service) => (
          <motion.div key={service.id} className="service-card glass-panel group" variants={cardVariants}>
            <div className="service-icon-wrapper">
              <div className="service-icon-glow"></div>
              <div className="service-icon text-accent transition-colors duration-300 group-hover:text-white">
                {service.icon}
              </div>
            </div>

            <h4 className="service-title mono text-accent">
              {service.title}
            </h4>

            <p className="service-desc text-muted">
              {service.desc}
            </p>

            {/* Bottom Accent Line */}
            <div className="service-card-line"></div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Services;
