import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail('');

      // Reset success state after a few seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="newsletter" className="section container">
      <motion.div
        className="newsletter-wrapper glass-panel"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="nl-bg-glow"></div>

        <div className="nl-content relative z-10 text-center">
          <div className="nl-pill mx-auto mono">
            <span className="nl-dot"></span> STAY_CONNECTED
          </div>

          <h2 className="nl-heading">
            Join the Vortex Network
          </h2>

          <p className="nl-subheading text-muted mx-auto">
            Subscribe to our newsletter for the latest insights in software architecture, AI integration, and scalable business strategies.
          </p>

          <form className="nl-form mx-auto" onSubmit={handleSubmit}>
            <div className={`nl-input-group ${isSubmitting ? 'submitting' : ''} ${isSuccess ? 'success' : ''}`}>
              <input
                type="email"
                className="nl-input"
                placeholder="ENTER_EMAIL_ADDRESS..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting || isSuccess}
                required
              />
              <button
                type="submit"
                className="nl-submit-btn mono"
                disabled={isSubmitting || isSuccess}
              >
                {isSubmitting ? (
                  <span className="loading-dots">SYNCING<span>.</span><span>.</span><span>.</span></span>
                ) : isSuccess ? (
                  <><CheckCircle size={18} /> CONFIRMED</>
                ) : (
                  <><Send size={18} /> SUBSCRIBE</>
                )}
                <div className="btn-glow-layer"></div>
              </button>
            </div>
          </form>

          <p className="nl-disclaimer mono text-sm text-muted">
            NO_SPAM // OPT_OUT_ANYTIME
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Newsletter;
