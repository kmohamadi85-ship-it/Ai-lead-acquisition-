import { create } from "zustand";
import type { User, Lead, Agent, Campaign, Workflow, DashboardMetrics, Notification, Integration, Company, ICP } from "@/types";
import { mockDashboardMetrics, mockLeads, mockAgents, mockCampaigns, mockWorkflows, mockNotifications, mockIntegrations } from "@/lib/mock-data";

interface AppState {
  // Theme
  theme: "light" | "dark";
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;

  // Sidebar
  sidebarOpen: boolean;
  toggleSidebar: () => void;

  // User
  user: User | null;
  setUser: (user: User | null) => void;

  // Company
  company: Company | null;
  setCompany: (company: Company | null) => void;

  // ICP
  icps: ICP[];
  setICPs: (icps: ICP[]) => void;

  // Dashboard
  metrics: DashboardMetrics;
  loadMetrics: () => void;

  // Leads
  leads: Lead[];
  loadLeads: () => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;

  // Agents
  agents: Agent[];
  loadAgents: () => void;
  updateAgent: (id: string, updates: Partial<Agent>) => void;

  // Campaigns
  campaigns: Campaign[];
  loadCampaigns: () => void;

  // Workflows
  workflows: Workflow[];
  loadWorkflows: () => void;

  // Notifications
  notifications: Notification[];
  loadNotifications: () => void;
  markRead: (id: string) => void;

  // Integrations
  integrations: Integration[];
  loadIntegrations: () => void;
}

export const useStore = create<AppState>((set) => ({
  // Theme
  theme: "dark",
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
  setTheme: (theme) => set({ theme }),

  // Sidebar
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  // User
  user: null,
  setUser: (user) => set({ user }),

  // Company
  company: null,
  setCompany: (company) => set({ company }),

  // ICP
  icps: [],
  setICPs: (icps) => set({ icps }),

  // Dashboard
  metrics: mockDashboardMetrics,
  loadMetrics: () => set({ metrics: mockDashboardMetrics }),

  // Leads
  leads: [],
  loadLeads: () => set({ leads: mockLeads }),
  updateLead: (id, updates) =>
    set((state) => ({
      leads: state.leads.map((l) => (l.id === id ? { ...l, ...updates } : l)),
    })),

  // Agents
  agents: [],
  loadAgents: () => set({ agents: mockAgents }),
  updateAgent: (id, updates) =>
    set((state) => ({
      agents: state.agents.map((a) => (a.id === id ? { ...a, ...updates } : a)),
    })),

  // Campaigns
  campaigns: [],
  loadCampaigns: () => set({ campaigns: mockCampaigns }),

  // Workflows
  workflows: [],
  loadWorkflows: () => set({ workflows: mockWorkflows }),

  // Notifications
  notifications: [],
  loadNotifications: () => set({ notifications: mockNotifications }),
  markRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  // Integrations
  integrations: [],
  loadIntegrations: () => set({ integrations: mockIntegrations }),
}));
