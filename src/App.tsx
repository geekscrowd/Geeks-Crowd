import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WizardContainer from './components/Wizard/WizardContainer';
import ThreeBackground from './components/ThreeBackground';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-background text-white">
      {/* Wizard Overlay */}
      <WizardContainer />

      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <ThreeBackground />
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <Portfolio />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
