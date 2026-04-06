import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';

const Portfolio: React.FC = () => {
  const projects = [
    {
      title: "NexGen Fintech Dashboard",
      category: "Web Development",
      description: "A secure, real-time financial monitoring system with interactive 3D data visualization and AI-driven insights.",
      image: "/images/portfolio-1.jpg",
      tags: ["React", "Three.js", "Node.js", "AWS"],
    },
    {
      title: "OmniHealth Mobile App",
      category: "Mobile Development",
      description: "A comprehensive health tracking application for iOS and Android featuring real-time health data sync and telemedicine support.",
      image: "/images/portfolio-2.jpg",
      tags: ["React Native", "Firebase", "HealthKit"],
    },
    {
      title: "CloudScale DevOps Platform",
      category: "DevOps Solutions",
      description: "An automated infrastructure management platform that reduces deployment time by 80% using advanced CI/CD pipelines.",
      image: "/images/portfolio-3.jpg",
      tags: ["Kubernetes", "Terraform", "GitHub Actions"],
    },
  ];

  return (
    <section id="portfolio" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 space-y-8 md:space-y-0">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block"
            >
              Our Success Stories
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black mb-6 text-gray-900 dark:text-white"
            >
              Proven Track Record of Innovation
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group glassmorphism rounded-[2.5rem] overflow-hidden border border-gray-200 dark:border-white/5 hover:border-primary/30 transition-all duration-500 bg-white/50 dark:bg-transparent"
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay group-hover:bg-primary/0 transition-all duration-500 z-10" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6 z-20">
                  <span className="px-4 py-2 glassmorphism rounded-full text-xs font-bold uppercase tracking-widest text-gray-900 dark:text-white border border-gray-200 dark:border-white/10">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-10 space-y-6">
                <h3 className="text-2xl font-bold group-hover:text-primary transition-colors text-gray-900 dark:text-white">{project.title}</h3>
                <p className="text-gray-700 dark:text-gray-400 leading-relaxed text-lg line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs font-semibold px-3 py-1 bg-gray-100 dark:bg-white/5 rounded-lg text-gray-700 dark:text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
