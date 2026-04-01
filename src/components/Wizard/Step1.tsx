import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useWizardStore } from '../../store/useWizardStore';
import { Rocket, Target, Calendar, Clock, Globe } from 'lucide-react';

const schema = z.object({
  fullName: z.string().min(3, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required'),
  projectName: z.string().min(3, 'Project name is required (min 3 chars)'),
  projectDescription: z.string().min(10, 'Description is required (min 10 chars)'),
  websitePurpose: z.string().min(1, 'Please select a website purpose'),
  targetAudience: z.string().min(5, 'Target audience is required'),
  launchTimeline: z.string().min(1, 'Please select a timeline'),
  urgencyLevel: z.enum(['standard', 'expedited', 'flexible']),
});

type Step1Data = z.infer<typeof schema>;

const Step1: React.FC = () => {
  const { data, updateData } = useWizardStore();
  
  const { register, formState: { errors } } = useForm<Step1Data>({
    resolver: zodResolver(schema),
    defaultValues: data as Step1Data,
    mode: 'onChange',
  });

  // Update store on field change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    updateData({ [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-10">
      {/* Personal Information Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-primary flex items-center space-x-2">
          <Rocket size={20} /> <span>Personal Information</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Full Name</label>
            <input
              {...register('fullName', { onChange: handleChange })}
              className={`w-full px-6 py-4 bg-gray-100 dark:bg-white/5 border rounded-2xl focus:border-primary outline-none transition-all text-gray-950 dark:text-white font-medium ${errors.fullName ? 'border-red-500' : 'border-gray-200 dark:border-white/10'}`}
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Email Address</label>
            <input
              {...register('email', { onChange: handleChange })}
              className={`w-full px-6 py-4 bg-gray-100 dark:bg-white/5 border rounded-2xl focus:border-primary outline-none transition-all text-gray-950 dark:text-white font-medium ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-white/10'}`}
              placeholder="john@example.com"
            />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Phone Number</label>
            <input
              {...register('phone', { onChange: handleChange })}
              className={`w-full px-6 py-4 bg-gray-100 dark:bg-white/5 border rounded-2xl focus:border-primary outline-none transition-all text-gray-950 dark:text-white font-medium ${errors.phone ? 'border-red-500' : 'border-gray-200 dark:border-white/10'}`}
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>
      </div>

      <hr className="border-white/5" />

      <div className="space-y-6">
        <h3 className="text-xl font-bold text-primary flex items-center space-x-2">
          <Globe size={20} /> <span>Project Overview</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Project Name */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center space-x-2">
              <Rocket size={16} /> <span>Project Name</span>
            </label>
            <input
              {...register('projectName', { onChange: handleChange })}
              className={`w-full px-6 py-4 bg-gray-100 dark:bg-white/5 border rounded-2xl focus:border-primary outline-none transition-all text-gray-950 dark:text-white font-medium ${errors.projectName ? 'border-red-500' : 'border-gray-200 dark:border-white/10'}`}
              placeholder="e.g. NexGen E-commerce Platform"
            />
            {errors.projectName && <p className="text-red-500 text-xs font-bold">{errors.projectName.message}</p>}
          </div>

          {/* Website Purpose */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center space-x-2">
              <Globe size={16} /> <span>Website Purpose</span>
            </label>
            <select
              {...register('websitePurpose', { onChange: handleChange })}
              className={`w-full px-6 py-4 bg-gray-100 dark:bg-white/5 border rounded-2xl focus:border-primary outline-none transition-all text-gray-950 dark:text-white font-medium appearance-none cursor-pointer ${errors.websitePurpose ? 'border-red-500' : 'border-gray-200 dark:border-white/10'}`}
            >
              <option value="">Select Purpose...</option>
              <option value="ecommerce">E-commerce Store</option>
              <option value="saas">SaaS Application</option>
              <option value="portfolio">Personal Portfolio</option>
              <option value="corporate">Corporate Website</option>
              <option value="blog">Content/Blog Platform</option>
            </select>
            {errors.websitePurpose && <p className="text-red-500 text-xs font-bold">{errors.websitePurpose.message}</p>}
          </div>
        </div>
      </div>

      {/* Project Description */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center space-x-2">
          <Target size={16} /> <span>Brief Description</span>
        </label>
        <textarea
          {...register('projectDescription', { onChange: handleChange })}
          rows={3}
          className={`w-full px-6 py-4 bg-gray-100 dark:bg-white/5 border rounded-2xl focus:border-primary outline-none transition-all text-gray-900 dark:text-white font-medium resize-none ${errors.projectDescription ? 'border-red-500' : 'border-gray-200 dark:border-white/10'}`}
          placeholder="What are the main goals of your project?"
        />
        {errors.projectDescription && <p className="text-red-500 text-xs font-bold">{errors.projectDescription.message}</p>}
      </div>

      {/* Target Audience */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center space-x-2">
          <Target size={16} /> <span>Target Audience & Industry</span>
        </label>
        <input
          {...register('targetAudience', { onChange: handleChange })}
          className={`w-full px-6 py-4 bg-gray-100 dark:bg-white/5 border rounded-2xl focus:border-primary outline-none transition-all text-gray-900 dark:text-white font-medium ${errors.targetAudience ? 'border-red-500' : 'border-gray-200 dark:border-white/10'}`}
          placeholder="e.g. Young professionals in tech, healthcare providers, etc."
        />
        {errors.targetAudience && <p className="text-red-500 text-xs font-bold">{errors.targetAudience.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Launch Timeline */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center space-x-2">
            <Calendar size={16} /> <span>Expected Launch Date</span>
          </label>
          <input
            {...register('launchTimeline', { onChange: handleChange })}
            type="date"
            className={`w-full px-6 py-4 bg-gray-100 dark:bg-white/5 border rounded-2xl focus:border-primary outline-none transition-all text-gray-900 dark:text-white font-medium ${errors.launchTimeline ? 'border-red-500' : 'border-gray-200 dark:border-white/10'}`}
          />
          {errors.launchTimeline && <p className="text-red-500 text-xs font-bold">{errors.launchTimeline.message}</p>}
        </div>

        {/* Urgency Level */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center space-x-2">
            <Clock size={16} /> <span>Project Urgency</span>
          </label>
          <div className="flex space-x-4">
            {['standard', 'expedited', 'flexible'].map((level) => (
              <label key={level} className="flex-1">
                <input
                  {...register('urgencyLevel', { onChange: handleChange })}
                  type="radio"
                  value={level}
                  className="hidden peer"
                />
                <div className="w-full text-center px-4 py-4 rounded-xl glassmorphism border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary transition-all cursor-pointer font-bold uppercase text-xs tracking-widest">
                  {level}
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
