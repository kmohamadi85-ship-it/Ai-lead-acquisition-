// ============================================
// LeadForge AI - Core Type Definitions
// ============================================

// --- User & Auth ---
export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  company_name?: string;
  role: "owner" | "admin" | "member";
  plan: "starter" | "growth" | "scale" | "enterprise";
  onboarding_completed: boolean;
  created_at: string;
}

// --- Company & ICP ---
export interface Company {
  id: string;
  user_id: string;
  name: string;
  website?: string;
  industry: string;
  description: string;
  logo_url?: string;
  target_geography: string[];
  offer_description: string;
  knowledge_base?: string;
  created_at: string;
}

export interface ICP {
  id: string;
  company_id: string;
  name: string;
  job_titles: string[];
  industries: string[];
  company_sizes: string[];
  pain_points: string[];
  geography: string[];
  annual_revenue_min?: number;
  annual_revenue_max?: number;
  technologies?: string[];
  keywords: string[];
  created_at: string;
}

// --- Leads ---
export type LeadStatus =
  | "new"
  | "researched"
  | "contacted"
  | "replied"
  | "interested"
  | "meeting_booked"
  | "qualified"
  | "closed_won"
  | "closed_lost"
  | "unresponsive";

export interface Lead {
  id: string;
  company_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  job_title: string;
  company_name: string;
  company_website?: string;
  company_size?: string;
  industry?: string;
  linkedin_url?: string;
  location?: string;
  status: LeadStatus;
  score: number;
  pain_points?: string[];
  research_notes?: string;
  personalized_message?: string;
  source: string;
  tags: string[];
  last_contacted_at?: string;
  next_follow_up_at?: string;
  meeting_scheduled_at?: string;
  created_at: string;
  updated_at: string;
}

// --- Agents ---
export type AgentType =
  | "prospect_finder"
  | "research"
  | "personalization"
  | "outreach"
  | "follow_up"
  | "meeting"
  | "crm";

export type AgentStatus = "idle" | "running" | "paused" | "error" | "completed";

export interface Agent {
  id: string;
  company_id: string;
  type: AgentType;
  name: string;
  description: string;
  status: AgentStatus;
  config: Record<string, unknown>;
  last_run_at?: string;
  tasks_completed: number;
  tasks_failed: number;
  success_rate: number;
  created_at: string;
}

export interface AgentTask {
  id: string;
  agent_id: string;
  type: string;
  input: Record<string, unknown>;
  output?: Record<string, unknown>;
  status: "pending" | "running" | "completed" | "failed";
  error?: string;
  started_at?: string;
  completed_at?: string;
  created_at: string;
}

// --- Campaigns ---
export type CampaignStatus = "draft" | "active" | "paused" | "completed" | "archived";
export type CampaignChannel = "email" | "linkedin" | "whatsapp" | "multi";

export interface Campaign {
  id: string;
  company_id: string;
  name: string;
  description?: string;
  status: CampaignStatus;
  channel: CampaignChannel;
  icp_id?: string;
  sequence_steps: SequenceStep[];
  leads_count: number;
  sent_count: number;
  opened_count: number;
  replied_count: number;
  meetings_booked: number;
  start_date?: string;
  end_date?: string;
  created_at: string;
}

export interface SequenceStep {
  id: string;
  order: number;
  type: "email" | "linkedin_connect" | "linkedin_message" | "whatsapp" | "wait" | "condition";
  subject?: string;
  body?: string;
  wait_days?: number;
  condition?: string;
  variations?: MessageVariation[];
}

export interface MessageVariation {
  id: string;
  label: string;
  subject?: string;
  body: string;
  usage_percentage: number;
}

// --- Workflows ---
export interface Workflow {
  id: string;
  company_id: string;
  name: string;
  description?: string;
  status: "active" | "inactive" | "draft";
  trigger: WorkflowTrigger;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  created_at: string;
}

export interface WorkflowTrigger {
  type: "new_lead" | "status_change" | "reply_received" | "meeting_booked" | "schedule" | "manual";
  config: Record<string, unknown>;
}

export interface WorkflowNode {
  id: string;
  type: "trigger" | "action" | "condition" | "delay" | "ai_agent";
  position: { x: number; y: number };
  data: {
    label: string;
    description?: string;
    config: Record<string, unknown>;
  };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  condition?: string;
}

// --- Analytics ---
export interface DashboardMetrics {
  leads_discovered: number;
  leads_contacted: number;
  messages_sent: number;
  replies_received: number;
  meetings_booked: number;
  conversion_rate: number;
  response_rate: number;
  active_campaigns: number;
  agents_running: number;
  pipeline_value: number;
  leads_trend: TrendData[];
  meetings_trend: TrendData[];
  channel_performance: ChannelMetric[];
  top_performing_campaigns: CampaignMetric[];
}

export interface TrendData {
  date: string;
  value: number;
}

export interface ChannelMetric {
  channel: string;
  sent: number;
  opened: number;
  replied: number;
  meetings: number;
}

export interface CampaignMetric {
  id: string;
  name: string;
  sent: number;
  replies: number;
  meetings: number;
  conversion_rate: number;
}

// --- Integrations ---
export interface Integration {
  id: string;
  company_id: string;
  type: "gmail" | "outlook" | "linkedin" | "calendly" | "whatsapp" | "salesforce" | "hubspot" | "slack";
  status: "connected" | "disconnected" | "error";
  config: Record<string, unknown>;
  last_synced_at?: string;
  created_at: string;
}

// --- Subscriptions ---
export interface Subscription {
  id: string;
  user_id: string;
  plan: "starter" | "growth" | "scale" | "enterprise";
  status: "active" | "canceled" | "past_due" | "trialing";
  current_period_start: string;
  current_period_end: string;
  leads_used: number;
  leads_limit: number;
  messages_used: number;
  messages_limit: number;
  agents_used: number;
  agents_limit: number;
}

// --- Notifications ---
export interface Notification {
  id: string;
  user_id: string;
  type: "lead_found" | "reply_received" | "meeting_booked" | "agent_error" | "system";
  title: string;
  message: string;
  read: boolean;
  action_url?: string;
  created_at: string;
}
