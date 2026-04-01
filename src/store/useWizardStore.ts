import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type WizardData = {
  // Personal Info (New)
  fullName: string;
  email: string;
  phone: string;

  // Step 1: Project Overview
  projectName: string;
  projectDescription: string;
  websitePurpose: string;
  targetAudience: string;
  launchTimeline: string;
  urgencyLevel: 'standard' | 'expedited' | 'flexible';

  // Step 2: Technical Requirements
  currentSetup: string;
  cmsPreference: string;
  frameworkRequirements: string;
  hostingRequirements: 'shared' | 'vps' | 'dedicated' | 'cloud';
  cloudProvider?: string;
  databaseNeeds: 'mysql' | 'postgresql' | 'mongodb' | 'none';
  integrations: string[];
  trafficExpected: string;
  securityRequirements: string[];

  // Step 3: Design & Content
  pagesCount: string;
  pages: { name: string; type: string }[];
  designPreference: 'dark' | 'light' | 'both' | 'clean-professional';
  brandAssetsAvailable: boolean;
  contentStatus: string;
  aiContentAccepted: boolean;
  referenceUrls: string[];
  featuresChecklist: string[];

  // Step 4: Domain & Infrastructure
  domainStatus: 'owned' | 'need-purchase' | 'undecided';
  domainName?: string;
  emailSetup: string;
  cdnRequired: boolean;
  backupMonitoring: boolean;

  // Step 5: Budget & Timeline
  budgetRange: string;
  paymentMilestones: string;
  maintenanceBudget: string;
  phasedDevelopment: boolean;
};

interface WizardStore {
  currentStep: number;
  isOpen: boolean;
  isCompleted: boolean;
  data: Partial<WizardData>;
  setStep: (step: number) => void;
  setCompleted: (status: boolean) => void;
  openWizard: () => void;
  closeWizard: () => void;
  updateData: (data: Partial<WizardData>) => void;
  resetWizard: () => void;
}

export const useWizardStore = create<WizardStore>()(
  persist(
    (set) => ({
      currentStep: 1,
      isOpen: false,
      isCompleted: false,
      data: {
        fullName: '',
        email: '',
        phone: '',
        pagesCount: '1-5',
        pages: [],
        referenceUrls: ['', '', ''],
        integrations: [],
        securityRequirements: [],
        featuresChecklist: [],
        aiContentAccepted: false,
      },
      setStep: (step) => set({ currentStep: step }),
      setCompleted: (status) => set({ isCompleted: status }),
      openWizard: () => set({ 
        isOpen: true, 
        isCompleted: false,
        currentStep: 1,
        data: {
          fullName: '',
          email: '',
          phone: '',
          pagesCount: '1-5',
          pages: [],
          referenceUrls: ['', '', ''],
          integrations: [],
          securityRequirements: [],
          featuresChecklist: [],
          aiContentAccepted: false,
        }
      }),
      closeWizard: () => set({ isOpen: false }),
      updateData: (newData) =>
        set((state) => ({ data: { ...state.data, ...newData } })),
      resetWizard: () =>
        set({
          currentStep: 1,
          isCompleted: false,
          data: {
            fullName: '',
            email: '',
            phone: '',
            pagesCount: '1-5',
            referenceUrls: ['', '', ''],
            integrations: [],
            securityRequirements: [],
            featuresChecklist: [],
            aiContentAccepted: false,
          },
        }),
    }),
    {
      name: 'geeks-crowd-onboarding',
    }
  )
);
