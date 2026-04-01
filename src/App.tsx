import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WizardContainer from './components/Wizard/WizardContainer';
import ThreeBackground from './components/ThreeBackground';
import { useThemeStore } from './store/useThemeStore';

const App: React.FC = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="relative min-h-screen bg-white dark:bg-background text-gray-900 dark:text-white transition-colors duration-300">
      {/* Wizard Overlay */}
      <WizardContainer />

      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-100 dark:opacity-40 transition-opacity duration-500">
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
