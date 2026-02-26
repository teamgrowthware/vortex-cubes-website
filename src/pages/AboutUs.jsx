import React, { useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import MissionVision from '../components/MissionVision';
import CompanyJourney from '../components/CompanyJourney';
import WhyChooseUs from '../components/WhyChooseUs';
import { Network } from 'lucide-react';

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <main className="about-page">
        {/* About Hero Section */}
        <section className="section container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
          <div className="section-header" style={{ marginBottom: '3rem' }}>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              <span className="text-accent">ABOUT //</span> VORTEX_CUBES
            </h1>
            <div className="header-line"></div>
          </div>
          <div className="glass-panel" style={{ padding: '3rem', borderRadius: '12px', border: '1px solid var(--bg-border)', position: 'relative', overflow: 'hidden' }}>
            <Network className="text-accent" size={120} style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.05, transform: 'rotate(15deg)' }} />
            <h2 className="mono" style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.5rem' }}>PIONEERING DIGITAL ARCHITECTURE</h2>
            <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '800px', marginBottom: '1rem' }}>
              Vortex Cubes is a specialized technology collective focused on building high-performance digital ecosystems. We bridge the gap between complex engineering challenges and elegant, scalable solutions.
            </p>
            <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '800px' }}>
              Our methodology combines cutting-edge stack implementation with rigorous optimization, allowing us to deploy platforms that are resilient, secure, and ready for future-scale demands.
            </p>
          </div>
        </section>

        {/* Existing Components Reused */}
        <MissionVision />
        <WhyChooseUs />
        <CompanyJourney />

      </main>
    </PageTransition>
  );
};

export default AboutUs;
