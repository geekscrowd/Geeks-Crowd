import { WizardData } from '../store/useWizardStore';
import { supabase } from './supabase';

/**
 * Handles the project brief submission for Production.
 * 
 * Flow:
 * 1. Inserts the lead into Supabase 'leads' table.
 * 2. Supabase triggers a webhook or Edge Function to send email via Resend.
 */
export const submitProjectBrief = async (data: Partial<WizardData>): Promise<boolean> => {
  try {
    console.log('--- SUBMITTING PROJECT BRIEF TO SUPABASE ---');

    // Check if Supabase is configured
    const isSupabaseConfigured = !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

    if (!isSupabaseConfigured) {
      console.warn('Supabase not configured. Simulating success in dev environment.');
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return true;
    }

    // Insert lead into Supabase
    const { error } = await supabase
      .from('leads')
      .insert([
        { 
          project_name: data.projectName || 'Unnamed Project', 
          client_email: data.email,
          service_type: data.websitePurpose || 'Not Specified',
          budget_range: data.budgetRange,
          timeline: data.launchTimeline,
          tech_stack: [
            ...(data.frameworkRequirements ? [data.frameworkRequirements] : []),
            ...(data.integrations || [])
          ],
          features: data.featuresChecklist || [],
          domain_status: data.domainStatus,
          domain_name: data.domainName,
          raw_data: data 
        },
      ]);
    
    if (error) {
      console.error('Supabase insertion error:', error.message);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Critical submission error:', error);
    return false;
  }
};
