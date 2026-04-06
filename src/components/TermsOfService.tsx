import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Gavel, Scale, AlertCircle, HelpCircle } from 'lucide-react';

const TermsOfService: React.FC = () => {
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
            <div className="inline-flex items-center justify-center p-3 bg-secondary/20 rounded-2xl text-secondary mb-4">
              <Gavel size={40} />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white">Terms of Service</h1>
            <p className="text-gray-400 font-medium">Last Updated: April 7, 2026</p>
          </div>

          <div className="glassmorphism p-8 md:p-12 rounded-[2.5rem] border border-white/10 space-y-10 text-gray-300 leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <FileText className="text-secondary" size={24} /> 1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using the Geeks Crowd website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Scale className="text-secondary" size={24} /> 2. Use of Services
              </h2>
              <p>
                Geeks Crowd provides digital solutions including web and mobile app development, DevOps automation, and security hardening. You agree to use our services only for lawful purposes and in accordance with these Terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <AlertCircle className="text-secondary" size={24} /> 3. Project Consultations
              </h2>
              <p>
                Project estimations provided through our onboarding wizard are preliminary and subject to change based on a detailed discovery phase and final technical assessment. We reserve the right to modify quotes or project timelines after a thorough consultation.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <HelpCircle className="text-secondary" size={24} /> 4. Intellectual Property
              </h2>
              <p>
                Unless otherwise specified in a signed agreement, all intellectual property rights related to the Geeks Crowd platform, including its design, source code, and content, belong exclusively to Geeks Crowd.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Gavel className="text-secondary" size={24} /> 5. Limitation of Liability
              </h2>
              <p>
                Geeks Crowd shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our services, even if we have been advised of the possibility of such damages.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <AlertCircle className="text-secondary" size={24} /> 6. Changes to Terms
              </h2>
              <p>
                We reserve the right to update or modify these Terms of Service at any time without prior notice. Continued use of the platform after any changes constitute acceptance of the updated terms.
              </p>
            </section>

            <section className="space-y-4 border-t border-white/5 pt-8 mt-12">
              <h2 className="text-2xl font-bold text-white">7. Contact Us</h2>
              <p>For any questions regarding our Terms of Service, please reach out to us:</p>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <p className="font-bold text-white">Geeks Crowd Legal Team</p>
                <p>Email: legal@geekscrowd.com</p>
                <p>Address: A18 Sudarshan park, New Delhi 110015</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
