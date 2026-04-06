import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Calculator, Info, User, Mail, MessageSquare, Briefcase, Loader2, Calendar } from 'lucide-react';
import { useCurrency } from '../hooks/useCurrency';
import { submitProjectBrief } from '../utils/submission';

const Contact: React.FC = () => {
  const { currency, formatPrice } = useCurrency();
  
  const handleScheduleMeeting = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ 
        url: 'https://calendly.com/geekscrowd/30min',
        parentElement: document.getElementById('root'),
        prefill: {},
        utm: {},
        color: '#6366f1',
        textColor: '#ffffff',
        backgroundColor: '#030712'
      });
    }
  };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'website',
    requirements: '',
    budget: '5000',
    timeline: '1-3 months',
  });

  const [estimatedCost, setEstimatedCost] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const initialBudget = parseInt(formData.budget);
    let estimatedLocal = initialBudget;

    // Apply timeline logic: Under 1 month adds 33% (initial/3)
    if (formData.timeline === '1 month') {
      estimatedLocal = Math.round(initialBudget + (initialBudget / 3));
    }

    // Convert local currency estimate back to USD for the formatPrice function
    // since formatPrice(usd) = usd * rate
    const estimatedUSD = estimatedLocal / currency.rate;
    setEstimatedCost(estimatedUSD);
  }, [formData.budget, formData.timeline, currency]);

  // Set initial slider value based on currency
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      budget: currency.minBudget.toString()
    }));
  }, [currency]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const success = await submitProjectBrief({
      fullName: formData.name,
      email: formData.email,
      websitePurpose: formData.service,
      projectDescription: formData.requirements,
      budgetRange: `${currency.symbol}${parseInt(formData.budget).toLocaleString()}+`,
      launchTimeline: formData.timeline,
      projectName: 'Website Inquiry', // Default name for inquiries
    });

    setIsSubmitting(false);

    if (success) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
    } else {
      alert('There was an issue submitting your inquiry. Please try again or contact us directly at support@geekscrowd.com.');
    }
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-gray-50 dark:bg-surface/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          
          {/* Contact Information */}
          <div className="space-y-16">
            <div className="max-w-2xl">
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block"
              >
                Let's Build Together
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-black mb-8 leading-tight text-gray-900 dark:text-white"
              >
                Ready to Start Your Digital Journey?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-700 dark:text-gray-400 leading-relaxed mb-12"
              >
                Fill out the form to get a preliminary project estimation and schedule a 
                free 30-minute technical consultation with our experts.
              </motion.p>
            </div>

            {/* Estimation Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="glassmorphism p-6 md:p-10 rounded-[3rem] border border-gray-200 dark:border-primary/20 shadow-2xl relative overflow-hidden group bg-white/50 dark:bg-transparent"
            >
              <div className="absolute top-0 right-0 p-8 text-primary/10 group-hover:text-primary/20 transition-colors">
                <Calculator size={80} />
              </div>
              <div className="relative z-10 space-y-6">
                <div className="flex items-center space-x-3 text-primary">
                  <Info size={24} />
                  <span className="text-lg font-bold uppercase tracking-widest">Project Estimation</span>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">Estimated Starting Budget ({currency.code})</p>
                  <div className="text-5xl font-black text-gray-900 dark:text-white">
                    {formatPrice(estimatedCost)}
                    <span className="text-xl text-gray-400 dark:text-gray-500 font-medium ml-2">+</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-100 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5">
                  <CheckCircle className="text-green-500 w-5 h-5" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">Final quote provided after detailed discovery phase.</span>
                </div>
                
                {/* Calendly CTA in Card */}
                <button
                  onClick={handleScheduleMeeting}
                  className="w-full py-4 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded-2xl font-bold transition-all flex items-center justify-center space-x-3"
                >
                  <Calendar size={20} />
                  <span>Or Schedule a Call Now</span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="glassmorphism p-8 md:p-12 rounded-[3rem] border border-gray-200 dark:border-white/10 shadow-3xl relative bg-white/80 dark:bg-surface/30 backdrop-blur-xl"
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center space-x-2">
                        <User size={16} /> <span>Full Name</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-6 py-4 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl focus:border-primary outline-none transition-all text-gray-900 dark:text-white font-medium"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center space-x-2">
                        <Mail size={16} /> <span>Email Address</span>
                      </label>
                      <input 
                        type="email" 
                        required
                        className="w-full px-6 py-4 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl focus:border-primary outline-none transition-all text-gray-900 dark:text-white font-medium"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center space-x-2">
                      <Briefcase size={16} /> <span>Primary Service</span>
                    </label>
                    <select 
                      className="w-full px-6 py-4 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl focus:border-primary outline-none transition-all text-gray-900 dark:text-white font-medium appearance-none cursor-pointer"
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                    >
                      <option value="website">Custom Website Development</option>
                      <option value="mobile">Mobile Application Development</option>
                      <option value="devops">Comprehensive DevOps Solutions</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center space-x-2">
                      <MessageSquare size={16} /> <span>Project Requirements</span>
                    </label>
                    <textarea 
                      rows={4}
                      className="w-full px-6 py-4 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl focus:border-primary outline-none transition-all text-gray-900 dark:text-white font-medium resize-none"
                      placeholder="Briefly describe your project goals..."
                      value={formData.requirements}
                      onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Initial Budget ({currency.symbol})</label>
                      <input 
                        type="range" 
                        min={currency.minBudget} 
                        max={currency.code === 'INR' ? 1000000 : 100000} 
                        step={currency.code === 'INR' ? 10000 : 1000}
                        className="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                        value={formData.budget}
                        onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      />
                      <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest">
                        <span>{currency.symbol}{currency.minBudget.toLocaleString()}</span>
                        <span>{currency.symbol}{(currency.code === 'INR' ? 1000000 : 100000).toLocaleString()}+</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Desired Timeline</label>
                      <select 
                        className="w-full px-6 py-4 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl focus:border-primary outline-none transition-all text-gray-900 dark:text-white font-medium appearance-none cursor-pointer"
                        value={formData.timeline}
                        onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                      >
                        <option value="1 month">Under 1 Month</option>
                        <option value="1-3 months">1-3 Months</option>
                        <option value="3-6 months">3-6 Months</option>
                        <option value="6+ months">6+ Months</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-primary text-white font-bold text-lg rounded-2xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all flex items-center justify-center space-x-3 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        <span>Sending Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Project Inquiry</span>
                        <Send size={20} />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20 space-y-8"
                >
                  <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                    <CheckCircle size={48} />
                  </div>
                  <h3 className="text-4xl font-black text-gray-950 dark:text-white">Message Sent Successfully!</h3>
                  <p className="text-xl text-gray-700 dark:text-gray-400 max-w-sm mx-auto">
                    Thank you for reaching out, {formData.name.split(' ')[0]}. Our technical team will review your requirements and contact you within 24 hours.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="px-10 py-4 glassmorphism text-gray-900 dark:text-white font-bold rounded-2xl border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all bg-white/50 dark:bg-transparent"
                  >
                    Send Another Inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
