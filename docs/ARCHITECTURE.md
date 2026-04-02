# Architecture Document - Geeks Crowd

## 1. System Overview
The **Geeks Crowd** application is built as a modern, high-performance static site with serverless backend capabilities. The architecture focuses on speed, security, and developer efficiency.

## 2. Tech Stack
- **Frontend**: React (Vite) + TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Animations**: Framer Motion + Three.js (@react-three/fiber)
- **Database/Auth**: Supabase (PostgreSQL)
- **Email**: Resend
- **Hosting**: Vercel

## 3. System Components
### 3.1. Frontend Layer (Vercel)
- **Static Assets**: Pre-built React application optimized by Vite.
- **Edge Runtime**: API routes (if needed) for secure server-side logic.
- **Client-side State**: Zustand manages the project wizard data.
- **3D Particles**: Three.js handles the interactive background.

### 3.2. Data Persistence Layer (Supabase)
- **PostgreSQL Database**: Stores project briefs, leads, and potential user profiles.
- **Supabase Client**: Direct database access with Row Level Security (RLS).
- **Webhooks**: Automatically trigger emails when a new lead is added to the `leads` table.

### 3.3. Transactional Email Layer (Resend)
- **Lead Alerts**: Triggered via Supabase webhooks to notify the team of new project requests.
- **Client Confirmation**: Automated "Thank You" emails to the user upon submission.

## 4. Data Flow Architecture
1. **User Interaction**: User completes the multi-step project wizard.
2. **Submission**: React app sends the `WizardData` to Supabase via the `supabase-js` client.
3. **Storage**: Data is inserted into the `leads` table in PostgreSQL.
4. **Trigger**: Supabase Edge Function or Webhook detects the new row insertion.
5. **Notification**: Supabase calls the Resend API to send a formatted email notification.
6. **Confirmation**: Resend sends a confirmation email to the client's address.

## 5. Security Architecture
- **Environment Variables**: Sensitive API keys (Supabase URL, Anon Key, Resend Key) are stored in Vercel's environment variables. 
- **Row Level Security (RLS)**: **CRITICAL**: The `leads` table must have RLS enabled. Clients should only have `INSERT` permission. `SELECT`, `UPDATE`, and `DELETE` should be restricted to the service role or admin.
- **Client-Side Sanitization**: Data is cleaned before insertion to prevent SQL injection (handled by Supabase SDK).
- **CORS Protection**: API calls are restricted to the production domain within Supabase settings.

## 6. Integration Steps (Production Ready)

### 6.1. Supabase Setup
1.  **Create Project**: Go to [Supabase](https://supabase.com/) and create a new project.
2.  **Create Table**: Run the following SQL in the SQL Editor:
    ```sql
    create table leads (
      id uuid primary key default uuid_generate_v4(),
      created_at timestamp with time zone default now(),
      project_name text,
      client_email text,
      service_type text,
      budget_range text,
      timeline text,
      tech_stack text[],
      features text[],
      domain_status text,
      domain_name text,
      raw_data jsonb
    );

    -- Enable RLS
    alter table leads enable row level security;

    -- Allow public insertions only
    create policy "Enable insert for everyone" on leads for insert with check (true);
    ```

### 6.2. Resend Setup
1.  **Get API Key**: Create an account at [Resend](https://resend.com/) and generate an API key.
2.  **Verify Domain**: In Resend dashboard, verify your domain (e.g., `geekscrowd.com`) to avoid emails going to spam.
3.  **Supabase Edge Function**: 
    - Create a function named `send-lead-email`.
    - Use the code from [docs/supabase-edge-function.ts](file:///docs/supabase-edge-function.ts).
    - Set the `RESEND_API_KEY` in Supabase Secrets.
4.  **Database Webhook**: 
    - Go to Supabase **Database** > **Webhooks**.
    - Create a new webhook for the `leads` table.
    - Set it to trigger on `INSERT`.
    - Select **HTTP POST** and point it to your Edge Function URL.
    - Now, every new lead will automatically trigger two emails (one for you and one for the customer).

### 6.3. Vercel Deployment
1.  **Environment Variables**: In your Vercel project settings, add:
    - `VITE_API_NINJAS_KEY`
    - `VITE_SUPABASE_URL`
    - `VITE_SUPABASE_ANON_KEY`
2.  **Build Command**: Ensure `npm run build` is used. Vercel will handle the rest.

## 7. Data Model (Schema)
### `leads` table:
- `id` (UUID, Primary Key)
- `created_at` (Timestamp)
- `project_name` (Text)
- `client_email` (Text)
- `service_type` (Text)
- `tech_stack` (Text[])
- `budget_range` (Text)
- `timeline` (Text)
- `raw_data` (JSONB) - full wizard data for future-proofing.
