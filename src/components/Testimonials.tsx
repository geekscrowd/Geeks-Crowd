import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "CTO, FinTech Solutions",
      content: "Geeks Crowd delivered a robust and secure platform that exceeded our expectations. Their DevOps expertise was crucial for our deployment success.",
      avatar: "/images/testimonial-1.jpg",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Founder, HealthApp",
      content: "The mobile experience they built is flawless. Our user engagement increased by 40% after the new release. Highly professional team!",
      avatar: "/images/testimonial-2.jpg",
      rating: 5,
    },
    {
      name: "Emma Watson",
      role: "Product Manager, CloudScale",
      content: "Their DevOps automation transformed our deployment process. We now deploy with confidence multiple times a day. Excellent work!",
      avatar: "/images/testimonial-3.jpg",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block"
          >
            Client Reviews
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6 text-gray-900 dark:text-white"
          >
            Trusted by Industry Leaders
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="glassmorphism p-12 rounded-[3rem] border border-gray-200 dark:border-white/10 hover:border-primary/30 transition-all duration-500 relative group bg-white/50 dark:bg-transparent shadow-xl dark:shadow-none"
            >
              <Quote className="absolute top-10 right-10 w-12 h-12 text-primary/10 group-hover:text-primary/20 transition-colors" />
              <div className="flex space-x-1 mb-8">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" className="text-yellow-500" />
                ))}
              </div>
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-10 italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center space-x-6 border-t border-gray-200 dark:border-white/10 pt-8">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-primary/20" />
                <div>
                  <h4 className="text-lg font-bold text-gray-950 dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-500 font-medium tracking-wide">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
