import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center p-3 bg-primary/20 rounded-2xl text-primary mb-4">
              <Shield size={40} />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white">Privacy Policy</h1>
            <p className="text-gray-400 font-medium">Last Updated: April 7, 2026</p>
          </div>

          <div className="glassmorphism p-8 md:p-12 rounded-[2.5rem] border border-white/10 space-y-10 text-gray-300 leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Eye className="text-primary" size={24} /> 1. Information We Collect
              </h2>
              <p>
                At Geeks Crowd, we collect information that you provide directly to us when using our onboarding wizard or contact forms. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-400">
                <li>Name, email address, and phone number.</li>
                <li>Project details, requirements, and technical preferences.</li>
                <li>Budget ranges and project timelines.</li>
                <li>Any other information you choose to provide during the consultation process.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <FileText className="text-primary" size={24} /> 2. How We Use Your Information
              </h2>
              <p>
                The information we collect is used solely to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-400">
                <li>Provide accurate project estimations and technical consultations.</li>
                <li>Communicate with you regarding your inquiries.</li>
                <li>Improve our services and website user experience.</li>
                <li>Ensure the security of our platform and prevent fraudulent activities.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Lock className="text-primary" size={24} /> 3. Data Security
              </h2>
              <p>
                We implement robust security measures to protect your personal information. Your data is stored securely using Supabase (PostgreSQL) with Row Level Security (RLS) enabled, ensuring that unauthorized parties cannot access your project details.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Shield className="text-primary" size={24} /> 4. Third-Party Services
              </h2>
              <p>
                We use trusted third-party services to enhance our operations:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-400">
                <li><strong>Supabase:</strong> For secure data storage and management.</li>
                <li><strong>Resend:</strong> For automated transactional email notifications.</li>
                <li><strong>Vercel:</strong> For hosting our high-performance application.</li>
              </ul>
              <p>These providers have their own privacy policies and are committed to protecting your data.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <MessageSquare className="text-primary" size={24} /> 5. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <p className="font-bold text-white">Geeks Crowd Support</p>
                <p>Email: support@geekscrowd.com</p>
                <p>Address: A18 Sudarshan park, New Delhi 110015</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

import { MessageSquare } from 'lucide-react';

export default PrivacyPolicy;
