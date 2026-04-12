# LeadForge AI

**AI-Powered Lead Acquisition & Appointment Booking Platform**

LeadForge AI is an autonomous sales platform that finds prospects, crafts personalized outreach, follows up intelligently, and books qualified meetings on your calendar — all powered by AI agents.

## Features

- **7 Autonomous AI Agents** — Prospect Finder, Research, Personalization, Outreach, Follow-up, Meeting, and CRM agents working in a coordinated pipeline
- **Multi-Channel Outreach** — Email, LinkedIn, and WhatsApp with A/B testing and smart rotation
- **Visual Workflow Builder** — Drag-and-drop automation for custom sales processes
- **CRM Pipeline** — Full lead management with table and kanban views, scoring, and tagging
- **Campaign Management** — Multi-step sequences with analytics and conversion tracking
- **Client Onboarding** — ICP definition wizard with auto knowledge ingestion
- **Admin Panel** — Multi-client management for agencies with white-label mode
- **Subscription Billing** — Usage tracking with Starter, Growth, Scale, and Enterprise plans
- **Dark/Light Mode** — Premium SaaS aesthetic with Framer Motion animations

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, TypeScript, TailwindCSS, Framer Motion |
| State | Zustand |
| Database | Supabase (PostgreSQL) with Row Level Security |
| Auth | Supabase Auth |
| API | Next.js API Routes (serverless) |
| Icons | Lucide React |

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

## Project Structure

```
src/
  app/                    # Next.js App Router pages
    api/                  # API routes (agents, leads, campaigns, workflows, webhooks)
    auth/                 # Login & signup pages
    dashboard/            # Main dashboard and sub-pages
      agents/             # AI agent management
      leads/              # Lead pipeline (table + kanban)
      campaigns/          # Campaign management
      workflows/          # Visual workflow builder
      settings/           # Profile, billing, integrations, API keys
      admin/              # Multi-client admin panel
    onboarding/           # 4-step onboarding wizard
  components/
    ui/                   # Reusable UI components (Button, Card, Badge, Modal, etc.)
    layout/               # Dashboard layout, sidebar, header, theme provider
    landing/              # Landing page sections (hero, features, pricing, etc.)
  lib/                    # Utilities, store, Supabase client, mock data
  types/                  # TypeScript type definitions
supabase/
  schema.sql              # Complete database schema with RLS policies
```

## Database

The full PostgreSQL schema is in `supabase/schema.sql`. It includes:

- 13 tables with proper relationships and indexes
- Row Level Security policies for multi-tenant data isolation
- Auto-updating timestamps via triggers
- Full-text search on leads
- Prompt versioning for AI agents

## Routes

| Route | Description |
|-------|------------|
| `/` | Landing page with hero, features, pricing, CTA |
| `/auth/login` | Login page |
| `/auth/signup` | Signup page |
| `/onboarding` | 4-step onboarding wizard |
| `/dashboard` | Main dashboard with metrics and charts |
| `/dashboard/agents` | AI agent orchestration and management |
| `/dashboard/leads` | Lead pipeline (table + kanban views) |
| `/dashboard/campaigns` | Campaign management with sequence builder |
| `/dashboard/workflows` | Visual workflow automation builder |
| `/dashboard/settings` | Profile, company, billing, integrations, notifications, API keys |
| `/dashboard/admin` | Multi-client admin panel |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|------------|
| GET | `/api/leads` | List leads with filtering and search |
| POST | `/api/leads` | Create a new lead |
| GET | `/api/agents` | List all AI agents |
| POST | `/api/agents` | Agent actions (start, stop, configure) |
| GET | `/api/campaigns` | List campaigns |
| POST | `/api/campaigns` | Create campaign |
| GET | `/api/workflows` | List workflows |
| POST | `/api/workflows` | Create workflow |
| POST | `/api/webhooks` | Incoming webhook handler |

## Deployment

Deploy on Vercel:

```bash
npm run build
```

Or deploy to any platform that supports Next.js.

## License

Proprietary - All rights reserved.
