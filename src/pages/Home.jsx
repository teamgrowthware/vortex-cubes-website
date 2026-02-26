import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Industries from '../components/Industries';
import InteractiveGlobe from '../components/InteractiveGlobe';
import PortfolioGrid from '../components/PortfolioGrid';
import FAQ from '../components/FAQ';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import PageTransition from '../components/PageTransition';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300); // Slight delay for the element to render/transition
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  return (
    <PageTransition>
      <main>
        <Hero />
        <WhyChooseUs />
        <Industries /> {/* Currently: "Sectors" */}
        <Services />
        <InteractiveGlobe />
        <Testimonials />
        <PortfolioGrid />
        <FAQ />
        <Newsletter />
      </main>
    </PageTransition>
  );
};

export default Home;
