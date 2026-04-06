import React from 'react';
import { motion } from 'framer-motion';
import { Code, Mail, Phone, MapPin, Linkedin, Twitter, Github, Instagram, ArrowUp, Facebook } from 'lucide-react';

import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { Icon: Github, href: 'https://github.com/Geeks-Crowd' },
    { Icon: Linkedin, href: 'https://in.linkedin.com/company/geekscrowd' },
    { Icon: Instagram, href: 'https://www.instagram.com/geekscrowd/' },
    { Icon: Facebook, href: 'https://www.facebook.com/people/Geeks-Crowd/100082921972103/#' },
  ];

  return (
    <footer className="pt-32 pb-16 relative overflow-hidden bg-gray-100 dark:bg-surface transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Brand Section */}
          <div className="space-y-8">
            <div className="flex items-center space-x-2">
              <div className="bg-primary/20 p-2 rounded-lg">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Geeks Crowd
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-400 text-lg leading-relaxed">
              Bridging the gap between AI-assisted development and secure, 
              scalable deployment expertise.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map(({ Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, color: '#6366f1' }}
                  className="text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-white transition-colors"
                >
                  <Icon size={24} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8 text-gray-900 dark:text-white">
            <h4 className="text-xl font-bold">Quick Links</h4>
            <ul className="space-y-4">
              {['Services', 'Portfolio', 'Testimonials', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors text-lg font-medium">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-8 text-gray-900 dark:text-white">
            <h4 className="text-xl font-bold">Our Services</h4>
            <ul className="space-y-4">
              {[
                'Web Development',
                'Mobile Applications',
                'DevOps Automation',
                'Cloud Infrastructure',
                'Security Hardening',
              ].map((item) => (
                <li key={item}>
                  <a href="#services" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors text-lg font-medium">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-8 text-gray-900 dark:text-white">
            <h4 className="text-xl font-bold">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <Mail className="text-primary w-6 h-6 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400 text-lg font-medium">support@geekscrowd.com</span>
              </li>
              <li className="flex items-start space-x-4">
                <Phone className="text-primary w-6 h-6 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400 text-lg font-medium">+91-8376029127</span>
              </li>
              <li className="flex items-start space-x-4">
                <MapPin className="text-primary w-6 h-6 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400 text-lg font-medium">A18 Sudarshan park, New Delhi 110015</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-gray-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <p className="text-gray-500 dark:text-gray-500 text-sm font-medium">
            &copy; {currentYear} Geeks Crowd. All rights reserved.
          </p>
          <div className="flex space-x-8 text-sm font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
          <button
            onClick={scrollToTop}
            className="p-4 rounded-2xl glassmorphism border border-gray-200 dark:border-white/5 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-all transform hover:-translate-y-2"
          >
            <ArrowUp size={24} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
