# Product Requirements Document (PRD) - Geeks Crowd

## 1. Project Overview
**Geeks Crowd** is a premium technology services landing page designed to capture high-intent leads for web development, mobile app development, and DevOps services. The core value proposition is a high-performance, visually stunning interface that builds trust through an interactive "Project Scoping" wizard.

## 2. Target Audience
- Startups needing technical implementation (MVP).
- Businesses looking to modernize their tech stack.
- Entrepreneurs requiring custom software solutions.

## 3. Core Features
### 3.1. Immersive UI/UX
- **3D Background**: A performant Three.js-based particle system that responds to the dark theme aesthetic.
- **Premium Dark Mode**: A hardcoded dark aesthetic (using Tailwind CSS `dark` mode) to convey technical sophistication.
- **Responsive Design**: Seamless experience across mobile, tablet, and desktop.

### 3.2. Interactive Onboarding Wizard
- **Step-by-Step Scoping**: Multi-page form to collect project details (service type, tech stack, features, budget).
- **Real-time Validation**: Interactive UI feedback for user input.
- **Domain Availability**: Integrated check via API Ninjas to help users brainstorm their online presence.

### 3.3. Lead Management System
- **Lead Capture**: Securely store project briefs in a centralized database (Supabase).
- **Real-time Notifications**: Immediate email alerts for the team upon lead submission (Resend).
- **Lead Persistence**: Ensure data is captured even if the user experiences network issues during submission.

## 4. Technical Requirements
- **Framework**: React (Vite) for fast performance.
- **Styling**: Tailwind CSS for high-speed development and theme consistency.
- **State Management**: Zustand for global wizard data and transient UI states.
- **Animations**: Framer Motion for smooth transitions between wizard steps.
- **Backend-as-a-Service**: Supabase for lead storage (PostgreSQL).
- **Transactional Email**: Resend for automated lead alerts.
- **Deployment**: Vercel for CI/CD and edge-optimized hosting.

## 5. Success Metrics
- **Conversion Rate**: Percentage of landing page visitors who complete the onboarding wizard.
- **Lead Quality**: Completeness of the project briefs captured via the wizard.
- **Engagement**: Time spent on the interactive elements (3D background and wizard).

## 6. Future Enhancements (Roadmap)
- **Client Dashboard**: Allow users to track their project request status.
- **Dynamic Pricing Engine**: Provide real-time cost estimates based on wizard selections.
- **Multi-language Support**: Reach a global audience with localized content.
