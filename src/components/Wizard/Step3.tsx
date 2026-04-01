import React from 'react';
import { useWizardStore } from '../../store/useWizardStore';
import { Layout, Palette, FileText, Link, CheckSquare, Plus, Trash2, Cpu } from 'lucide-react';

const Step3: React.FC = () => {
  const { data, updateData } = useWizardStore();

  const handleAddPage = () => {
    const currentPages = data.pages || [];
    updateData({ pages: [...currentPages, { name: '', type: 'page' }] });
  };

  const handleRemovePage = (index: number) => {
    const currentPages = data.pages || [];
    updateData({ pages: currentPages.filter((_, i) => i !== index) });
  };

  const handlePageChange = (index: number, name: string) => {
    const currentPages = data.pages || [];
    const newPages = [...currentPages];
    newPages[index] = { ...newPages[index], name };
    updateData({ pages: newPages });
  };

  const handleReferenceUrlChange = (index: number, url: string) => {
    const currentUrls = data.referenceUrls || ['', '', ''];
    const newUrls = [...currentUrls];
    newUrls[index] = url;
    updateData({ referenceUrls: newUrls });
  };

  const handleCheckboxChange = (field: 'featuresChecklist' | 'aiContentAccepted', value: string | boolean) => {
    if (field === 'aiContentAccepted') {
      updateData({ aiContentAccepted: value as boolean });
    } else {
      const currentList = data.featuresChecklist || [];
      const val = value as string;
      const newList = currentList.includes(val)
        ? currentList.filter(v => v !== val)
        : [...currentList, val];
      updateData({ featuresChecklist: newList });
    }
  };

  const handleFeatureCheck = (feature: string) => {
    const currentList = data.featuresChecklist || [];
    const newList = currentList.includes(feature)
      ? currentList.filter(v => v !== feature)
      : [...currentList, feature];
    updateData({ featuresChecklist: newList });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    updateData({ [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-12">
      {/* Pages Count */}
      <div className="space-y-4">
        <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center space-x-2">
          <Layout size={16} /> <span>Estimated Page Count</span>
        </label>
        <select
          name="pagesCount"
          value={data.pagesCount || ''}
          onChange={handleChange}
          className="w-full px-6 py-4 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl focus:border-primary outline-none transition-all text-gray-950 dark:text-white font-medium appearance-none cursor-pointer"
        >
          <option value="1-5">1-5 Pages</option>
          <option value="5-10">5-10 Pages</option>
          <option value="10-20">10-20 Pages</option>
          <option value="20+">20+ Pages (Custom)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Design Preferences */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center space-x-2">
            <Palette size={16} /> <span>Design Style Preferences</span>
          </label>
          <select
            name="designPreference"
            value={data.designPreference || ''}
            onChange={handleChange}
            className="w-full px-6 py-4 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl focus:border-primary outline-none transition-all text-gray-950 dark:text-white font-medium appearance-none cursor-pointer"
          >
            <option value="">Select Style...</option>
            <option value="dark">Dark Mode</option>
            <option value="light">Light Mode</option>
            <option value="both">Having Both Modes</option>
            <option value="clean-professional">Clean Professional Mode</option>
          </select>
        </div>

        {/* Brand Assets Availability */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center space-x-2">
            <FileText size={16} /> <span>Content Readiness</span>
          </label>
          <select
            name="contentStatus"
            value={data.contentStatus || ''}
            onChange={handleChange}
            className="w-full px-6 py-4 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl focus:border-primary outline-none transition-all text-gray-950 dark:text-white font-medium appearance-none cursor-pointer"
          >
            <option value="">Select Readiness...</option>
            <option value="ready">Content is Ready</option>
            <option value="need-copywriting">Need Copywriting Services</option>
            <option value="multilingual">Need Multilingual Support</option>
            <option value="partial">Partial Content Available</option>
          </select>
        </div>
      </div>

      {/* AI Content Acceptance */}
      <div className="space-y-4">
        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center space-x-2">
          <Cpu size={16} /> <span>AI-Driven Content</span>
        </label>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleCheckboxChange('aiContentAccepted', true)}
            className={`flex-1 py-4 rounded-xl font-bold text-xs uppercase tracking-widest border transition-all ${
              data.aiContentAccepted === true
                ? 'bg-primary/10 border-primary text-primary'
                : 'glassmorphism border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400'
            }`}
          >
            AI Driven Content Accepted
          </button>
          <button
            onClick={() => handleCheckboxChange('aiContentAccepted', false)}
            className={`flex-1 py-4 rounded-xl font-bold text-xs uppercase tracking-widest border transition-all ${
              data.aiContentAccepted === false
                ? 'bg-primary/10 border-primary text-primary'
                : 'glassmorphism border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400'
            }`}
          >
            Human Only Content
          </button>
        </div>
      </div>

      {/* Reference Websites */}
      <div className="space-y-6">
        <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center space-x-2">
          <Link size={16} /> <span>Reference Websites</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.referenceUrls?.map((url, index) => (
            <input
              key={index}
              value={url}
              onChange={(e) => handleReferenceUrlChange(index, e.target.value)}
              className="w-full px-6 py-4 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl focus:border-primary outline-none transition-all text-gray-950 dark:text-white font-medium"
              placeholder={`Reference URL ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Features Checklist */}
      <div className="space-y-6">
        <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center space-x-2">
          <CheckSquare size={16} /> <span>Specific Features Required</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Contact Forms', 'Image Galleries', 'User Auth', 'Site Search', 'Chat Integration', 'Member Area', 'Job Board', 'Booking System'].map((feature) => (
            <label key={feature} className="flex-1">
              <input
                type="checkbox"
                checked={data.featuresChecklist?.includes(feature)}
                onChange={() => handleFeatureCheck(feature)}
                className="hidden peer"
              />
              <div className="w-full text-center px-4 py-3 rounded-xl glassmorphism border border-gray-200 dark:border-white/5 text-gray-600 dark:text-gray-400 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary transition-all cursor-pointer font-bold text-xs uppercase tracking-widest">
                {feature}
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step3;
