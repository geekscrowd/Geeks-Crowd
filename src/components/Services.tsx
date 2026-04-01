import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Smartphone, Server, CheckCircle, ArrowRight } from 'lucide-react';

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const services = [
    {
      id: 0,
      title: "Custom Website Development",
      icon: Globe,
      description: "Build a digital presence that stands out with modern, high-performance web applications tailored to your business goals.",
      categories: [
        { name: "Custom Web Apps", detail: "High-performance enterprise solutions built with React/Next.js." },
        { name: "Portfolio Sites", detail: "Visually stunning, interactive portfolios to showcase your brand." },
        { name: "E-Commerce", detail: "Modern Shopify & custom stores with high conversion focus." },
        { name: "CMS Solutions", detail: "Scalable WordPress & headless CMS setups for content control." },
        { name: "Web Dashboards", detail: "Complex admin panels and data visualization tools." },
      ],
      features: [
        "Fully Responsive & Mobile-First Design",
        "SEO Optimization & Core Web Vitals Focus",
        "Modern Frameworks (React, Next.js, Vue)",
        "Progressive Web Apps (PWA) Capabilities",
      ],
      color: "primary",
    },
    {
      id: 1,
      title: "Mobile App Development",
      icon: Smartphone,
      description: "Reach your users everywhere with native and cross-platform mobile experiences that feel premium and fast.",
      categories: [
        { name: "Native iOS & Android", detail: "Swift & Kotlin apps for maximum performance and OS features." },
        { name: "React Native", detail: "Cross-platform efficiency without compromising on quality." },
        { name: "Flutter Apps", detail: "Beautiful, expressive UIs for multi-platform experiences." },
        { name: "Mobile Strategy", detail: "Expert consulting on app growth and user retention." },
        { name: "App Maintenance", detail: "Continuous updates and feature rollouts." },
      ],
      features: [
        "Native iOS & Android Development",
        "Cross-Platform (React Native, Flutter)",
        "App Store & Play Store Optimization",
        "Seamless Offline Functionality",
      ],
      color: "secondary",
    },
    {
      id: 2,
      title: "Comprehensive DevOps Solutions",
      icon: Server,
      description: "Automate your infrastructure and deployment pipelines for maximum efficiency and security.",
      categories: [
        { name: "Pipeline Automation", detail: "Advanced CI/CD setups for zero-downtime deployments." },
        { name: "Monitoring Setup", detail: "Real-time health monitoring & alerting for your apps." },
        { name: "AI Tool Integration", detail: "Automate operations using modern AI-driven toolsets." },
        { name: "Cloud Infrastructure", detail: "Optimized AWS, GCP, and Azure management." },
        { name: "Security Hardening", detail: "Robust security protocols and vulnerability scanning." },
      ],
      features: [
        "CI/CD Pipeline Setup & Management",
        "Cloud Infrastructure (AWS, GCP, Azure)",
        "Container Orchestration (Kubernetes, Docker)",
        "Security Hardening & 24/7 Monitoring",
      ],
      color: "accent",
    },
  ];

  return (
    <section id="services" className="py-32 relative overflow-hidden bg-gray-50 dark:bg-surface/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block"
          >
            What We Do
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6 text-gray-900 dark:text-white"
          >
            Tailored Technology Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-xl text-gray-700 dark:text-gray-400"
          >
            We don't just build software; we engineer solutions that bridge the gap 
            between concept and production-ready excellence.
          </motion.p>
        </div>

        {/* Mobile Selection (Horizontal Scroll) */}
        <div className="lg:hidden flex overflow-x-auto pb-8 mb-8 space-x-4 no-scrollbar">
          {services.map((service, index) => (
            <button
              key={service.id}
              onClick={() => setActiveTab(index)}
              className={`flex-shrink-0 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === index ? 'bg-primary text-white shadow-lg' : 'glassmorphism text-gray-600 dark:text-gray-400'}`}
            >
              {service.title.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Desktop Tabs */}
        <div className="hidden lg:flex items-stretch justify-center space-x-8 mb-16">
          {services.map((service, index) => (
            <motion.button
              key={service.id}
              onClick={() => setActiveTab(index)}
              className={`flex-1 p-10 rounded-3xl text-left transition-all duration-300 transform ${activeTab === index ? 'glassmorphism border-primary shadow-2xl scale-105' : 'bg-transparent border-gray-200 dark:border-white/5 opacity-60 hover:opacity-100 hover:bg-gray-100 dark:hover:bg-white/5'}`}
            >
              <div className={`p-4 rounded-2xl w-fit mb-8 ${activeTab === index ? 'bg-primary/20 text-primary' : 'bg-gray-200 dark:bg-white/5 text-gray-700 dark:text-gray-400'}`}>
                <service.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{service.title}</h3>
              <p className="text-gray-700 dark:text-gray-400 text-lg leading-relaxed mb-8">
                {service.description}
              </p>
              <div className={`flex items-center space-x-2 font-bold ${activeTab === index ? 'text-primary' : 'text-gray-500 dark:text-gray-500'}`}>
                <span>Explore Details</span>
                <ArrowRight size={20} />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Active Content */}
        <div className="glassmorphism rounded-[3rem] p-8 md:p-16 border border-gray-200 dark:border-white/10 shadow-3xl bg-white/50 dark:bg-transparent transition-colors duration-300">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
            >
              <div>
                <h3 className="text-3xl md:text-5xl font-black mb-8 leading-tight text-gray-900 dark:text-white">
                  {services[activeTab].title}
                </h3>
                <p className="text-xl text-gray-700 dark:text-gray-400 mb-12 leading-relaxed">
                  Our {services[activeTab].title.toLowerCase()} service is designed to deliver maximum value 
                  through cutting-edge technology and industry best practices.
                </p>
                
                {/* Sub-Categories */}
                <div className="space-y-6 mb-12">
                  <h4 className="text-sm font-bold text-primary uppercase tracking-widest">Service Breakdown</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {services[activeTab].categories.map((cat, i) => (
                      <div key={i} className="p-6 rounded-2xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 hover:border-primary/30 transition-all group">
                        <p className="font-bold text-gray-950 dark:text-white mb-2 group-hover:text-primary transition-colors">{cat.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-500 leading-relaxed">{cat.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {services[activeTab].features.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <CheckCircle className="text-primary w-6 h-6 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-16 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                  <button className="px-10 py-5 bg-primary text-white font-bold rounded-2xl shadow-xl hover:bg-primary/90 transition-all">
                    Get Proposal
                  </button>
                </div>
              </div>
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl group lg:sticky lg:top-32">
                <div className={`absolute inset-0 bg-gradient-to-br from-${services[activeTab].color}/20 to-transparent z-10`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  {(() => {
                    const ServiceIcon = services[activeTab].icon;
                    return <ServiceIcon className={`w-48 h-48 text-${services[activeTab].color}/40 transform group-hover:scale-110 transition-transform duration-500`} />;
                  })()}
                </div>
                {/* Visual Representation (Abstract) */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 glassmorphism border-t border-white/10 p-8">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm font-bold text-primary block mb-2 uppercase tracking-widest">Success Rate</span>
                      <span className="text-3xl font-black">99.9%</span>
                    </div>
                    <div>
                      <span className="text-sm font-bold text-primary block mb-2 uppercase tracking-widest">Experience</span>
                      <span className="text-3xl font-black">10+ Years</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Services;
