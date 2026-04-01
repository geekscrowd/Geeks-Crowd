import React from 'react';
import { useWizardStore } from '../../store/useWizardStore';
import { DollarSign, CreditCard, Clock, Layers, ShieldCheck } from 'lucide-react';
import { useCurrency } from '../../hooks/useCurrency';

const Step5: React.FC = () => {
  const { data, updateData } = useWizardStore();
  const { formatPrice, currency } = useCurrency();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    updateData({ [e.target.name]: e.target.value });
  };

  const handleToggle = (field: 'phasedDevelopment') => {
    updateData({ [field]: !data[field] });
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Budget Range */}
        <div className="space-y-6">
          <label className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center space-x-2">
            <DollarSign size={16} /> <span>Budget Range ({currency.code})</span>
          </label>
          <div className="grid grid-cols-1 gap-4">
            {currency.code === 'INR' ? (
              [
                { label: `Under ${currency.symbol}25,000`, value: 'under-25k' },
                { label: `${currency.symbol}25,000 - ${currency.symbol}100,000`, value: '25k-100k' },
                { label: `${currency.symbol}100,000 - ${currency.symbol}500,000`, value: '100k-500k' },
                { label: `${currency.symbol}500,000+`, value: '500k-plus' },
                { label: 'Enterprise', value: 'enterprise' },
              ].map((budget) => (
                <label key={budget.value} className="flex-1">
                  <input
                    type="radio"
                    name="budgetRange"
                    value={budget.value}
                    checked={data.budgetRange === budget.value}
                    onChange={handleChange}
                    className="hidden peer"
                  />
                  <div className="w-full text-left px-6 py-4 rounded-xl glassmorphism border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary transition-all cursor-pointer font-bold text-sm uppercase tracking-widest flex items-center justify-between">
                    <span>{budget.label}</span>
                    {data.budgetRange === budget.value && <ShieldCheck size={18} />}
                  </div>
                </label>
              ))
            ) : (
              [
                { label: `Under ${currency.symbol}499`, value: 'under-499' },
                { label: `${currency.symbol}499 - ${currency.symbol}5,000`, value: '499-5k' },
                { label: `${currency.symbol}5,000 - ${currency.symbol}15,000`, value: '5k-15k' },
                { label: `${currency.symbol}15,000+`, value: '15k-plus' },
                { label: 'Enterprise', value: 'enterprise' },
              ].map((budget) => (
                <label key={budget.value} className="flex-1">
                  <input
                    type="radio"
                    name="budgetRange"
                    value={budget.value}
                    checked={data.budgetRange === budget.value}
                    onChange={handleChange}
                    className="hidden peer"
                  />
                  <div className="w-full text-left px-6 py-4 rounded-xl glassmorphism border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary transition-all cursor-pointer font-bold text-sm uppercase tracking-widest flex items-center justify-between">
                    <span>{budget.label}</span>
                    {data.budgetRange === budget.value && <ShieldCheck size={18} />}
                  </div>
                </label>
              ))
            )}
          </div>
        </div>

        <div className="space-y-10">
          {/* Payment Milestones */}
          <div className="space-y-4">
            <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center space-x-2">
              <CreditCard size={16} /> <span>Payment Milestones</span>
            </label>
            <select
              name="paymentMilestones"
              value={data.paymentMilestones || ''}
              onChange={handleChange}
              className="w-full px-6 py-4 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl focus:border-primary outline-none transition-all text-gray-950 dark:text-white font-medium appearance-none cursor-pointer"
            >
              <option value="">Select Milestones...</option>
              <option value="50/50">50% Advance / 50% Launch</option>
              <option value="30/40/30">30% Start / 40% Beta / 30% Final</option>
              <option value="full-after-demo">Full payment after demo design review</option>
            </select>
          </div>

          {/* Maintenance Budget */}
          <div className="space-y-4">
            <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center space-x-2">
              <Clock size={16} /> <span>Ongoing Maintenance Budget</span>
            </label>
            <select
              name="maintenanceBudget"
              value={data.maintenanceBudget || ''}
              onChange={handleChange}
              className="w-full px-6 py-4 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl focus:border-primary outline-none transition-all text-gray-950 dark:text-white font-medium appearance-none cursor-pointer"
            >
              <option value="">Select Maintenance Plan...</option>
              <option value="none">None Required</option>
              <option value="monthly-basic">Basic (Monthly Updates)</option>
              <option value="monthly-pro">Professional (24/7 Monitoring)</option>
              <option value="annual">Annual Priority Support</option>
            </select>
          </div>

          {/* Phased Development */}
          <div className="space-y-4">
            <label className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center space-x-2">
              <Layers size={16} /> <span>Development Approach</span>
            </label>
            <button
              onClick={() => handleToggle('phasedDevelopment')}
              className={`w-full px-6 py-5 rounded-xl font-bold text-xs uppercase tracking-widest border transition-all flex items-center justify-between ${
                data.phasedDevelopment
                  ? 'bg-primary/10 border-primary text-primary'
                  : 'glassmorphism border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white'
              }`}
            >
              <span>MVP Phased Development First</span>
              {data.phasedDevelopment && <ShieldCheck size={18} />}
            </button>
            <p className="text-gray-500 text-[10px] leading-relaxed px-2 font-medium">
              We recommend MVP (Minimum Viable Product) approach for SaaS and complex platforms to gather user feedback earlier.
            </p>
          </div>
        </div>
      </div>

      {/* GDPR Notice */}
      <div className="text-center space-y-4 pt-12">
        <p className="text-gray-500 text-xs font-medium">
          By submitting this form, you agree to our GDPR-compliant privacy policy. 
          Your data is encrypted and used solely for project estimation and consultation.
        </p>
      </div>
    </div>
  );
};

export default Step5;
