import React from 'react';
import { useWizardStore } from '../../store/useWizardStore';
import { Server, Database, Cpu, Shield, Activity, HardDrive } from 'lucide-react';

const Step2: React.FC = () => {
  const { data, updateData } = useWizardStore();

  const handleCheckboxChange = (field: 'integrations' | 'securityRequirements', value: string) => {
    const currentList = data[field] || [];
    const newList = currentList.includes(value)
      ? currentList.filter(v => v !== value)
      : [...currentList, value];
    updateData({ [field]: newList });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    updateData({ [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Current Technical Setup */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center space-x-2">
            <Cpu size={16} /> <span>Current Technical Setup</span>
          </label>
          <input
            name="currentSetup"
            value={data.currentSetup || ''}
            onChange={handleChange}
            className="w-full px-6 py-4 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl focus:border-primary outline-none transition-all text-gray-950 dark:text-white font-medium"
            placeholder="e.g. Existing WordPress, Legacy CMS, None"
          />
        </div>

        {/* Framework Preference */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center space-x-2">
            <Cpu size={16} /> <span>Framework Preference</span>
          </label>
          <input
            name="frameworkRequirements"
            value={data.frameworkRequirements || ''}
            onChange={handleChange}
            className="w-full px-6 py-4 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl focus:border-primary outline-none transition-all text-gray-950 dark:text-white font-medium"
            placeholder="e.g. React, Next.js, Vue, Tailwind"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Hosting Requirements */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center space-x-2">
            <Server size={16} /> <span>Hosting Infrastructure</span>
          </label>
          <select
            name="hostingRequirements"
            value={data.hostingRequirements || ''}
            onChange={handleChange}
            className="w-full px-6 py-4 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl focus:border-primary outline-none transition-all text-gray-950 dark:text-white font-medium appearance-none cursor-pointer"
          >
            <option value="">Select Hosting...</option>
            <option value="shared">Shared Hosting</option>
            <option value="vps">Virtual Private Server (VPS)</option>
            <option value="dedicated">Dedicated Server</option>
            <option value="cloud">Cloud (AWS/GCP/Azure)</option>
          </select>
        </div>

        {/* Database Needs */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center space-x-2">
            <Database size={16} /> <span>Database Preferences</span>
          </label>
          <select
            name="databaseNeeds"
            value={data.databaseNeeds || ''}
            onChange={handleChange}
            className="w-full px-6 py-4 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl focus:border-primary outline-none transition-all text-gray-950 dark:text-white font-medium appearance-none cursor-pointer"
          >
            <option value="">Select Database...</option>
            <option value="mysql">MySQL</option>
            <option value="postgresql">PostgreSQL</option>
            <option value="mongodb">MongoDB</option>
            <option value="none">None Required</option>
          </select>
        </div>
      </div>

      {/* Third-party Integrations */}
      <div className="space-y-4">
        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center space-x-2">
          <HardDrive size={16} /> <span>Third-party Integrations Required</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Payment Gateways', 'CRM Systems', 'Analytics', 'External APIs', 'Social Login', 'E-mail Marketing'].map((integration) => (
            <label key={integration} className="flex-1 group">
              <input
                type="checkbox"
                checked={data.integrations?.includes(integration)}
                onChange={() => handleCheckboxChange('integrations', integration)}
                className="hidden peer"
              />
              <div className="w-full text-center px-4 py-3 rounded-xl glassmorphism border border-gray-200 dark:border-white/5 text-gray-500 dark:text-gray-400 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary transition-all cursor-pointer font-bold text-xs uppercase tracking-widest">
                {integration}
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Performance Requirements */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center space-x-2">
            <Activity size={16} /> <span>Performance & Traffic Expectation</span>
          </label>
          <input
            name="trafficExpected"
            value={data.trafficExpected || ''}
            onChange={handleChange}
            className="w-full px-6 py-4 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl focus:border-primary outline-none transition-all text-gray-950 dark:text-white font-medium"
            placeholder="e.g. 10k monthly visitors, sub-2s load time"
          />
        </div>

        {/* Security Requirements */}
        <div className="space-y-4">
          <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center space-x-2">
            <Shield size={16} /> <span>Security Standards</span>
          </label>
          <div className="grid grid-cols-2 gap-4">
            {['SSL/TLS', 'GDPR Compliance', 'PCI-DSS', 'SOC2'].map((security) => (
              <label key={security} className="flex-1">
                <input
                  type="checkbox"
                  checked={data.securityRequirements?.includes(security)}
                  onChange={() => handleCheckboxChange('securityRequirements', security)}
                  className="hidden peer"
                />
                <div className="w-full text-center px-4 py-3 rounded-xl glassmorphism border border-gray-200 dark:border-white/5 text-gray-600 dark:text-gray-400 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary transition-all cursor-pointer font-bold text-xs uppercase tracking-widest">
                  {security}
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
