import React, { useState, useEffect } from 'react';
import { useWizardStore } from '../../store/useWizardStore';
import { Globe, Mail, Cloud, Activity, CheckCircle2, Loader2, XCircle } from 'lucide-react';

const Step4: React.FC = () => {
  const { data, updateData } = useWizardStore();
  const [isChecking, setIsChecking] = useState(false);
  const [availability, setAvailability] = useState<'available' | 'unavailable' | null>(null);

  useEffect(() => {
    if (!data.domainName || data.domainName.length < 3) {
      setAvailability(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsChecking(true);
      try {
        const domain = data.domainName || '';
        // Only check if it looks like a domain (has a dot)
        if (!domain.includes('.')) {
          setAvailability(null);
          setIsChecking(false);
          return;
        }

        const response = await fetch(`https://api.api-ninjas.com/v1/domain?domain=${domain}`, {
          headers: {
            'X-Api-Key': 'Xzh58q1UPQsPZ8N1XuqpcfUHuIGI7uIcDJvvXcqV'
          }
        });
        
        const result = await response.json();
        
        if (result && typeof result.available !== 'undefined') {
          setAvailability(result.available ? 'available' : 'unavailable');
        } else {
          setAvailability(null);
        }
      } catch (error) {
        console.error('Error checking domain:', error);
        setAvailability(null);
      } finally {
        setIsChecking(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [data.domainName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    updateData({ [e.target.name]: e.target.value });
  };

  const handleToggle = (field: 'cdnRequired' | 'backupMonitoring') => {
    updateData({ [field]: !data[field] });
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Domain Status */}
        <div className="space-y-4">
          <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center space-x-2">
            <Globe size={16} /> <span>Domain Status</span>
          </label>
          <div className="flex space-x-4">
            {['owned', 'need-purchase', 'undecided'].map((status) => (
              <label key={status} className="flex-1">
                <input
                  type="radio"
                  name="domainStatus"
                  value={status}
                  checked={data.domainStatus === status}
                  onChange={handleChange}
                  className="hidden peer"
                />
                <div className="w-full text-center px-4 py-4 rounded-xl glassmorphism border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary transition-all cursor-pointer font-bold uppercase text-xs tracking-widest">
                  {status.replace('-', ' ')}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Domain Name Suggestion */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center space-x-2">
            <Globe size={16} /> <span>Desired Domain Name</span>
          </label>
          <div className="relative">
            <input
              name="domainName"
              value={data.domainName || ''}
              onChange={handleChange}
              className={`w-full px-6 py-4 bg-gray-100 dark:bg-white/5 border rounded-2xl focus:border-primary outline-none transition-all text-gray-950 dark:text-white font-medium ${
                availability === 'available' ? 'border-green-500/50' : 
                availability === 'unavailable' ? 'border-red-500/50' : 'border-gray-200 dark:border-white/10'
              }`}
              placeholder="e.g. example.com"
            />
            {isChecking && (
              <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center space-x-2 text-primary">
                <Loader2 size={16} className="animate-spin" />
                <span className="text-xs font-bold uppercase tracking-widest">Checking...</span>
              </div>
            )}
            {!isChecking && availability === 'available' && (
              <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center space-x-2 text-green-500">
                <CheckCircle2 size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Available</span>
              </div>
            )}
            {!isChecking && availability === 'unavailable' && (
              <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center space-x-2 text-red-500">
                <XCircle size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Taken</span>
              </div>
            )}
            {!isChecking && !availability && data.domainName && data.domainName.length >= 1 && (
              <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center space-x-2 text-gray-500">
                <span className="text-[10px] font-bold uppercase tracking-widest">Enter valid domain</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Email Setup */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center space-x-2">
            <Mail size={16} /> <span>Email Infrastructure</span>
          </label>
          <select
            name="emailSetup"
            value={data.emailSetup || ''}
            onChange={handleChange}
            className="w-full px-6 py-4 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl focus:border-primary outline-none transition-all text-gray-950 dark:text-white font-medium appearance-none cursor-pointer"
          >
            <option value="">Select Email Setup...</option>
            <option value="none">None Required</option>
            <option value="professional">Professional (IMAP/SMTP)</option>
            <option value="google">Google Workspace (G Suite)</option>
            <option value="microsoft">Microsoft Office 365</option>
          </select>
        </div>

        {/* CDN Requirements */}
        <div className="space-y-4">
          <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center space-x-2">
            <Cloud size={16} /> <span>Infrastructure Services</span>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleToggle('cdnRequired')}
              className={`px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-widest border transition-all ${
                data.cdnRequired
                  ? 'bg-primary/10 border-primary text-primary'
                  : 'glassmorphism border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white'
              }`}
            >
              CDN Required (CloudFlare)
            </button>
            <button
              onClick={() => handleToggle('backupMonitoring')}
              className={`px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-widest border transition-all ${
                data.backupMonitoring
                  ? 'bg-primary/10 border-primary text-primary'
                  : 'glassmorphism border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white'
              }`}
            >
              Backup & Monitoring
            </button>
          </div>
        </div>
      </div>

      {/* Security Info */}
      <div className="p-8 rounded-[2rem] glassmorphism border border-primary/20 bg-primary/5 flex items-start space-x-6">
        <Activity className="w-10 h-10 text-primary flex-shrink-0" />
        <div className="space-y-2">
          <h4 className="text-lg font-bold text-gray-950 dark:text-white">Infrastructure Security Hardening</h4>
          <p className="text-gray-700 dark:text-gray-400 text-sm leading-relaxed">
            Our DevOps team automatically configures advanced firewall rules, 
            automated vulnerability scanning, and daily off-site backups for every 
            deployment to ensure maximum reliability and security.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Step4;
