import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, MessageCircle, Mail } from 'lucide-react';
import './ContactCTA.css';

const ContactCTA = () => {
  return (
    <section className="contact-cta-wrapper">
      {/* Background Ambience */}
      <div className="cta-glow-bg"></div>

      <motion.div
        className="contact-cta-content container text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Availability Pill */}
        <div className="availability-pill mx-auto">
          <span className="pulse-dot"></span>
          <span className="mono text-sm">Available For Work</span>
        </div>

        {/* Main Heading */}
        <h2 className="cta-heading mx-auto">
          Curious about what we can create together?<br />
          <span>Let's bring something extraordinary to life!</span>
        </h2>

        {/* Contact Button */}
        <a href="mailto:info@vortexcubes.com" className="cta-button-primary mono">
          Contact Us
          <div className="btn-glow-layer"></div>
        </a>

        {/* Social Icons */}
        <div className="cta-socials">
          <a href="#" className="social-icon group">
            <Instagram size={22} className="transition-colors group-hover:text-white" />
          </a>
          <a href="#" className="social-icon group">
            <Linkedin size={22} className="transition-colors group-hover:text-white" />
          </a>
          <a href="#" className="social-icon group">
            <MessageCircle size={22} className="transition-colors group-hover:text-white" />
          </a>
          <a href="#" className="social-icon group">
            <Mail size={22} className="transition-colors group-hover:text-white" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactCTA;
