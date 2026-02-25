import React from 'react';
import Hero from '../components/Hero';
import CompanyJourney from '../components/CompanyJourney';
import Services from '../components/Services';
import Industries from '../components/Industries';
import InteractiveGlobe from '../components/InteractiveGlobe';
import PortfolioGrid from '../components/PortfolioGrid';
import FAQ from '../components/FAQ';
import WhyChooseUs from '../components/WhyChooseUs';
import MissionVision from '../components/MissionVision';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import PageTransition from '../components/PageTransition';

const Home = () => {
  return (
    <PageTransition>
      <main>
        <Hero />
        <WhyChooseUs />
        <Industries /> {/* Currently: "Sectors" */}
        <Services />
        <MissionVision />
        <CompanyJourney />
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
