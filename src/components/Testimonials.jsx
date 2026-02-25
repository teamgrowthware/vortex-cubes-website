import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, MessageSquareQuote } from 'lucide-react';
import './Testimonials.css';

gsap.registerPlugin(ScrollTrigger);

const reviewsData = [
  {
    author: "CEO, TechInnovate",
    rating: 5,
    text: "Vortex Cubes completely overhauled our legacy ERP system. The transition to their custom cloud architecture reduced our operational latency by 40%."
  },
  {
    author: "Founder, ScaleUp SaaS",
    rating: 5,
    text: "Their team doesn't just write code; they understand business logic. The SaaS platform they built for us scaled to 10,000+ users seamlessly within the first month."
  },
  {
    author: "Marketing Director, GlobalReach",
    rating: 5,
    text: "We partnered with Vortex Cubes for our digital growth strategy. Their data-driven approach and targeted funnels increased our lead conversion rate by exactly 150%."
  },
  {
    author: "CTO, FinServe Network",
    rating: 5,
    text: "Security and compliance were our top concerns. Vortex built a banking-grade web application for us with flawless architecture and deep integration capabilities."
  },
  {
    author: "Operations Manager, Logistix",
    rating: 5,
    text: "The automated logistics dashboard they created gave us real-time visibility into our supply chain. Outstanding UI/UX and rock-solid backend performance."
  }
];

const Testimonials = () => {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const container = containerRef.current;
      const slider = sliderRef.current;

      if (!container || !slider) return;

      // Calculate the width needed to scroll all cards horizontally
      const scrollAmount = slider.scrollWidth - window.innerWidth + 40;

      // Only apply scroll animation if there's enough content to scroll
      if (scrollAmount > 0) {
        gsap.to(slider, {
          x: -scrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top center",
            end: () => `+=${scrollAmount}`,
            scrub: 1,
            pin: false, // Not pinning, just translating horizontally as you scroll down
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" className="section container testimonials-section" ref={containerRef}>

      <div className="section-header" style={{ marginBottom: '3rem' }}>
        <h2 className="mono">
          <span className="text-accent">07.</span> <span>TESTIMONIALS</span>
        </h2>
        <div className="header-line"></div>
      </div>

      <div className="testimonials-header text-center mx-auto" style={{ maxWidth: '800px', marginBottom: '4rem' }}>
        <h3 className="testimonials-main-heading">
          Trusted by Innovative Leaders
        </h3>

        <p className="testimonials-subheading text-muted">
          Hear straight from our partners about the impact of our engineered solutions and growth strategies on their businesses.
        </p>
      </div>

      <div className="testimonials-slider-container">
        <div className="testimonials-slider" ref={sliderRef}>
          {reviewsData.map((review, idx) => (
            <div key={idx} className="testimonial-card glass-panel group">
              <div className="quote-icon text-muted group-hover:text-accent transition-colors duration-300">
                <MessageSquareQuote size={32} strokeWidth={1.5} />
              </div>

              <div className="stars">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-accent" fill="currentColor" />
                ))}
              </div>

              <p className="testimonial-text text-muted">
                "{review.text}"
              </p>

              <div className="testimonial-author">
                <div className="author-avatar mono">
                  {review.author.charAt(0)}
                </div>
                <div className="author-info">
                  <span className="author-name">{review.author}</span>
                  <span className="author-role text-muted text-sm mono">Verified Client</span>
                </div>
              </div>

              <div className="card-border-glow"></div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Testimonials;
