import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Shield, Globe, Cpu, Calendar } from 'lucide-react';
import { useWizardStore } from '../store/useWizardStore';

const Hero: React.FC = () => {
  const { openWizard } = useWizardStore();

  const handleScheduleMeeting = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ 
        url: 'https://calendly.com/geekscrowd0/30min',
        parentElement: document.getElementById('root'),
        prefill: {},
        utm: {},
        color: '#6366f1',
        textColor: '#ffffff',
        backgroundColor: '#030712'
      });
    }
  };
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const headlines = [
    "Bridging AI-Assisted Development with Secure Deployment.",
    "Websites Built with Intelligence, Deployed with Precision.",
    "Your Vision, Our Technical Mastery, Seamlessly Automated.",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlines.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center space-x-2 px-4 py-2 glassmorphism rounded-full border border-primary/30"
          >
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-semibold tracking-wide uppercase text-primary/80">
              AI Integrated Tech Solution
            </span>
          </motion.div>

          {/* Headline */}
          <div className="relative min-h-[12rem] sm:min-h-[14rem] md:min-h-[18rem] flex items-center justify-center py-8">
            <AnimatePresence mode="wait">
              <motion.h1
                key={headlineIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight"
              >
                <span className="text-gradient leading-tight block">
                  {headlines[headlineIndex]}
                </span>
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Sub-headline */}
          <motion.p
            variants={itemVariants}
            className="max-w-3xl mx-auto text-xl md:text-2xl text-gray-700 dark:text-gray-400 font-light leading-relaxed mt-12 px-4"
          >
            While AI tools can build websites, <span className="text-gray-950 dark:text-white font-medium">professional deployment</span> and 
            <span className="text-gray-950 dark:text-white font-medium"> infrastructure management</span> require specialized expertise. 
            Geeks Crowd bridges that gap.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <button 
              onClick={openWizard}
              className="w-full sm:w-auto px-10 py-5 bg-primary text-white text-lg font-bold rounded-2xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all transform hover:-translate-y-1"
            >
              Start Your Project
            </button>
            <button 
              onClick={handleScheduleMeeting}
              className="w-full sm:w-auto px-10 py-5 glassmorphism text-gray-900 dark:text-white text-lg font-bold rounded-2xl border border-gray-200 dark:border-white/20 hover:border-gray-300 dark:hover:border-white/40 transition-all transform hover:-translate-y-1 flex items-center justify-center space-x-3"
            >
              <Calendar size={24} />
              <span>Schedule Meeting</span>
            </button>
            <button 
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-10 py-5 glassmorphism text-gray-900 dark:text-white text-lg font-bold rounded-2xl border border-gray-200 dark:border-white/20 hover:border-gray-300 dark:hover:border-white/40 transition-all transform hover:-translate-y-1"
            >
              View Our Work
            </button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            variants={itemVariants}
            className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60"
          >
            {[
              { icon: Rocket, text: "Rapid Delivery" },
              { icon: Shield, text: "Security First" },
              { icon: Globe, text: "Global Standards" },
              { icon: Cpu, text: "Modern Stack" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex flex-col items-center space-y-2">
                  <Icon className="w-8 h-8 text-primary" />
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px] -z-10 animate-pulse" />
    </section>
  );
};

export default Hero;
