import { WizardData } from '../store/useWizardStore';

/**
 * Handles the project brief submission.
 * In a real production environment, this would send the data to:
 * 1. A backend API (e.g. /api/leads)
 * 2. A lead capture service (e.g. Formspree, EmailJS)
 * 3. A CRM (e.g. HubSpot, Salesforce)
 */
export const submitProjectBrief = async (data: Partial<WizardData>): Promise<boolean> => {
  try {
    console.log('--- NEW PROJECT BRIEF SUBMITTED ---');
    console.log('Data collected:', JSON.stringify(data, null, 2));

    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // For testing/demo purposes, we'll log it and return success
    // In production, you would uncomment a fetch call like this:
    /*
    const response = await fetch('https://api.geekscrowd.com/v1/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.ok;
    */

    return true;
  } catch (error) {
    console.error('Error submitting project brief:', error);
    return false;
  }
};
