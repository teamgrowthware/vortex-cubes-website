import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import './FAQ.css';

const faqsData = [
  {
    id: 1,
    question: 'What services do you provide?',
    answer: 'We provide a comprehensive suite of digital services including scalable Web & SaaS Product Development, Mobile App Development, Enterprise Software (ERP/CRM), AI Integrations, Cloud & DevOps setup, and data-driven Digital Marketing Strategies.'
  },
  {
    id: 2,
    question: 'How do I start working with you?',
    answer: 'Starting is simple. You can reach out to us via our contact form or email. We will schedule an initial discovery call to understand your business requirements, technical needs, and goals. From there, we propose a customized roadmap and architecture plan.'
  },
  {
    id: 3,
    question: 'What design tools do you use?',
    answer: 'Our UI/UX design team leverages industry-standard tools like Figma and Adobe Creative Cloud to create wireframes, high-fidelity prototypes, and design systems. We ensure developer handoff is seamless and the final product matches the envisioned design precisely.'
  },
  {
    id: 4,
    question: 'How long does a project take?',
    answer: 'Project timelines vary heavily based on scope and complexity. A landing page might take 2-4 weeks, while a full-scale SaaS platform or enterprise mobile app can take 3-6 months. We provide clear sprint schedules and milestone estimates during the proposal phase.'
  },
  {
    id: 5,
    question: 'Do you provide revisions?',
    answer: 'Yes, we follow an agile development process that includes multiple feedback loops. During the design and prototyping phases, we offer iterative revisions to ensure the product perfectly aligns with your brand and functional requirements before full deployment.'
  },
  {
    id: 6,
    question: 'What industries do you work with?',
    answer: 'We have delivered solutions across a wide range of sectors including IT & Software, E-Commerce, Finance & FinTech, Healthcare, Education (EdTech), Real Estate, Logistics, and rapidly scaling Startups. Our tech stack is adaptable to any industry.'
  }
];

const FAQ = () => {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faqs" className="faq-section section container">
      <div className="faq-layout">
        <div className="faq-left">
          <div className="faq-pill mono">
            <span className="faq-dot"></span> FAQ'S
          </div>
          <h2 className="faq-heading"><span className="text-accent text-3xl mr-3 font-normal">09.</span>Answers</h2>
          <p className="faq-subheading text-muted">
            Find answers to common questions about our design process, services, and how we build scalable solutions.
          </p>
          <div className="faq-image-wrapper glass-panel">
            {/* Adding a tech/abstract gradient or image placeholder to match the vibe */}
            <div className="faq-abstract-shape"></div>
            <div className="faq-image-text mono">SYSTEM_QUERY</div>
          </div>
        </div>

        <div className="faq-right">
          <div className="faq-accordion">
            {faqsData.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`faq-item glass-panel ${isOpen ? 'open' : ''}`}
                  onClick={() => toggleFAQ(faq.id)}
                >
                  <div className="faq-question-row">
                    <h3 className="faq-question">{faq.question}</h3>
                    <div className={`faq-icon ${isOpen ? 'text-accent' : 'text-muted'}`}>
                      {isOpen ? <Minus size={20} strokeWidth={2} /> : <Plus size={20} strokeWidth={2} />}
                    </div>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="faq-answer-wrapper"
                      >
                        <p className="faq-answer text-muted">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
