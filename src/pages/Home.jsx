import React from 'react';
import Hero from '../components/Hero';
import CompanyJourney from '../components/CompanyJourney';
import TechStack from '../components/TechStack';
import InteractiveGlobe from '../components/InteractiveGlobe';
import PortfolioGrid from '../components/PortfolioGrid';
import DemoTerminal from '../components/DemoTerminal';
import PageTransition from '../components/PageTransition';

const Home = () => {
  return (
    <PageTransition>
      <main>
        <Hero />
        <CompanyJourney />
        <TechStack />
        <InteractiveGlobe />
        <PortfolioGrid />
        <DemoTerminal />
      </main>
    </PageTransition>
  );
};

export default Home;
