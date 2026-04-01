import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Save, CheckCircle2, Mail, Send, Loader2 } from 'lucide-react';
import { useWizardStore } from '../../store/useWizardStore';
import { submitProjectBrief } from '../../utils/submission';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import ProgressBar from './ProgressBar';

const SuccessStep: React.FC = () => {
  const { closeWizard } = useWizardStore();
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 text-center space-y-8"
    >
      <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4 animate-bounce">
        <CheckCircle2 size={48} />
      </div>
      <div className="space-y-4 max-w-lg">
        <h3 className="text-4xl font-black text-gray-950 dark:text-white">Project Brief Submitted!</h3>
        <p className="text-xl text-gray-700 dark:text-gray-400">
          Our technical experts will review your requirements and reach out to you within <span className="text-gray-950 dark:text-white font-bold">24 hours</span>.
        </p>
      </div>
      <div className="glassmorphism p-8 rounded-3xl border border-gray-200 dark:border-white/10 w-full max-w-md space-y-6 bg-white/50 dark:bg-transparent">
        <div className="flex items-center space-x-4 text-left">
          <div className="bg-primary/20 p-3 rounded-xl">
            <Mail className="text-primary" size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Support & Follow-up</p>
            <p className="text-gray-950 dark:text-white font-bold">support@geekscrowd.com</p>
          </div>
        </div>
        <button 
          onClick={() => window.location.href = 'mailto:support@geekscrowd.com'}
          className="w-full py-4 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 rounded-2xl text-gray-950 dark:text-white font-bold transition-all flex items-center justify-center space-x-2"
        >
          <Send size={18} />
          <span>Ping Support Now</span>
        </button>
      </div>
      <button 
        onClick={closeWizard}
        className="px-10 py-4 bg-primary text-white font-bold rounded-2xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all transform hover:-translate-y-1"
      >
        Return to Website
      </button>
    </motion.div>
  );
};

const WizardContainer: React.FC = () => {
  const { isOpen, closeWizard, currentStep, setStep, isCompleted, setCompleted, data } = useWizardStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const success = await submitProjectBrief(data);
    setIsSubmitting(false);
    
    if (success) {
      setCompleted(true);
    } else {
      alert('There was an issue submitting your project. Please try again or contact support.');
    }
  };

  const steps = [
    { title: 'Personal & Project Overview', component: Step1 },
    { title: 'Technical Requirements', component: Step2 },
    { title: 'Design & Content', component: Step3 },
    { title: 'Domain & Infrastructure', component: Step4 },
    { title: 'Budget & Timeline', component: Step5 },
  ];

  const ActiveStep = steps[currentStep - 1].component;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={!isSubmitting ? closeWizard : undefined}
        className="absolute inset-0 bg-white/60 dark:bg-background/80 backdrop-blur-md transition-colors duration-300"
      />

      {/* Wizard Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-5xl h-full max-h-[90vh] glassmorphism rounded-[2.5rem] border border-gray-200 dark:border-white/10 shadow-3xl overflow-hidden flex flex-col bg-white/90 dark:bg-background/90"
      >
        {/* Header */}
        {!isCompleted && (
          <div className="p-6 md:p-8 border-b border-gray-200 dark:border-white/5 flex items-center justify-between bg-gray-50 dark:bg-surface/50">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-gradient">
                {steps[currentStep - 1].title}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base font-medium mt-1">
                Step {currentStep} of {steps.length}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  alert('Project progress saved! A link has been sent to your email (simulated).');
                }}
                disabled={isSubmitting}
                className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-xl glassmorphism border border-gray-200 dark:border-white/5 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors text-sm font-bold disabled:opacity-50"
              >
                <Save size={18} />
                <span>Save for later</span>
              </button>
              <button
                onClick={closeWizard}
                disabled={isSubmitting}
                className="p-3 rounded-xl glassmorphism border border-gray-200 dark:border-white/5 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors disabled:opacity-50"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {!isCompleted && <ProgressBar currentStep={currentStep} totalSteps={steps.length} />}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar text-gray-950 dark:text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={isCompleted ? 'success' : currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {isSubmitting ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-6 text-center">
                  <Loader2 className="w-16 h-16 text-primary animate-spin" />
                  <p className="text-xl font-bold text-gray-600 dark:text-gray-400">Submitting your project brief...</p>
                </div>
              ) : isCompleted ? (
                <SuccessStep />
              ) : (
                <ActiveStep />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        {!isCompleted && (
          <div className="p-6 md:p-8 border-t border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-surface/50 flex items-center justify-between">
            <button
              onClick={() => setStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1 || isSubmitting}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all ${
                currentStep === 1
                  ? 'opacity-0 pointer-events-none'
                  : 'glassmorphism border border-gray-200 dark:border-white/5 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white disabled:opacity-50'
              }`}
            >
              <ChevronLeft size={20} />
              <span>Previous Step</span>
            </button>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setStep(Math.min(steps.length, currentStep + 1))}
                disabled={isSubmitting}
                className={`flex items-center space-x-2 px-8 py-3 bg-primary text-white rounded-xl font-bold shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all transform hover:-translate-y-1 disabled:opacity-50 ${
                  currentStep === steps.length ? 'hidden' : ''
                }`}
              >
                <span>Continue</span>
                <ChevronRight size={20} />
              </button>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`flex items-center space-x-2 px-8 py-3 bg-green-600 text-white rounded-xl font-bold shadow-xl shadow-green-600/20 hover:shadow-green-600/40 transition-all transform hover:-translate-y-1 disabled:opacity-50 ${
                  currentStep !== steps.length ? 'hidden' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Brief</span>
                    <CheckCircle2 size={20} />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default WizardContainer;
