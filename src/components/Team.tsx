import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Github, Award } from 'lucide-react';

const Team: React.FC = () => {
  const team = [
    {
      name: "Alex Rivera",
      role: "Lead Solution Architect",
      specialty: "Full-Stack & Cloud Architecture",
      bio: "12+ years of experience building scalable web ecosystems for Fortune 500 companies.",
      image: "/images/team-1.jpg",
      credentials: ["AWS Certified", "Kubernetes Expert"],
    },
    {
      name: "Jordan Smith",
      role: "Mobile Strategy Director",
      specialty: "iOS & Android Specialist",
      bio: "Crafting intuitive mobile experiences that bridge the gap between AI and user engagement.",
      image: "/images/team-2.jpg",
      credentials: ["Google Dev Expert", "React Native"],
    },
    {
      name: "Casey Taylor",
      role: "DevOps & Security Lead",
      specialty: "Automation & Infrastructure",
      bio: "Focusing on secure, automated deployment pipelines that scale with your business.",
      image: "/images/team-3.jpg",
      credentials: ["Security Hardening", "CI/CD Architect"],
    },
  ];

  return (
    <section id="team" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block"
          >
            Meet the Experts
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6"
          >
            Passionate Technology Pioneers
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group glassmorphism p-10 rounded-[3rem] border border-white/5 hover:border-primary/30 transition-all duration-500 overflow-hidden"
            >
              <div className="relative mb-10 group">
                <div className="absolute inset-0 bg-primary/20 rounded-[2rem] transform rotate-6 scale-105 group-hover:rotate-0 group-hover:scale-100 transition-all duration-500" />
                <img src={member.image} alt={member.name} className="w-full h-72 rounded-[2rem] object-cover relative z-10 border border-white/10" />
                <div className="absolute bottom-6 left-6 z-20 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-3 glassmorphism rounded-xl text-white hover:text-primary transition-colors cursor-pointer">
                    <Linkedin size={20} />
                  </div>
                  <div className="p-3 glassmorphism rounded-xl text-white hover:text-primary transition-colors cursor-pointer">
                    <Twitter size={20} />
                  </div>
                  <div className="p-3 glassmorphism rounded-xl text-white hover:text-primary transition-colors cursor-pointer">
                    <Github size={20} />
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-black mb-2">{member.name}</h3>
                  <p className="text-primary font-bold text-sm uppercase tracking-widest">{member.role}</p>
                </div>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {member.bio}
                </p>
                <div className="pt-8 border-t border-white/5">
                  <div className="flex flex-wrap gap-4">
                    {member.credentials.map((cred) => (
                      <div key={cred} className="flex items-center space-x-2 text-xs font-bold text-gray-300 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                        <Award size={14} className="text-primary" />
                        <span>{cred}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
