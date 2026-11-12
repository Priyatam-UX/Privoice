# Privoice

AI-powered sales, support and intern-hiring platform for tech companies (SaaS, IT services, startups). React + TypeScript + Vite + Tailwind + Recharts.

- **Landing page** (`/`): public home with a hero, workflows, product tabs, WebConnect, FAQ and a company demo-request form (sent via Web3Forms).
- **Internships** (`/#/internships`): public page with tech internships for 2nd & 3rd-year students. Resumes go to hr@dialgrow.com.
- **Live demo app** (`/#/login`, sign in with any role): AI Voice, Pipeline (table + Kanban), WebConnect, Contacts, Analytics, Internships, Integrations, Settings.

```bash
npm install
npm run dev
npm run build
```

## Demo mode
AI calls, transcripts, recordings, website crawling, the chatbot and integration connections are **simulated** and labelled "Demo". Data persists in `localStorage`; sign-in is a demo session with a role picker. Swap `src/lib/store.tsx` for Supabase (RLS per workspace) and the simulated logic in `src/pages/Voice.tsx` / `WebConnect.tsx` for real providers.

## Forms
The demo-request and internship forms post to Web3Forms. Set the access key in `src/lib/api.ts`.
