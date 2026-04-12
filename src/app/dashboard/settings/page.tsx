"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  User,
  Building2,
  CreditCard,
  Link2,
  Bell,
  Shield,
  Mail,
  Share2,
  Calendar as CalendarIcon,
  MessageSquare,
  Database,
  Hash,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Key,
  Globe,
} from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "company", label: "Company", icon: Building2 },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "integrations", label: "Integrations", icon: Link2 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "api", label: "API Keys", icon: Key },
];

const integrationMeta: Record<string, { icon: React.ElementType; name: string; description: string }> = {
  gmail: { icon: Mail, name: "Gmail", description: "Send outreach emails via Gmail" },
  outlook: { icon: Mail, name: "Outlook", description: "Send emails via Microsoft Outlook" },
  linkedin: { icon: Share2, name: "LinkedIn", description: "Automate LinkedIn outreach" },
  calendly: { icon: CalendarIcon, name: "Calendly", description: "Book meetings automatically" },
  whatsapp: { icon: MessageSquare, name: "WhatsApp", description: "Send messages via WhatsApp Business" },
  hubspot: { icon: Database, name: "HubSpot", description: "Sync leads and pipeline data" },
  salesforce: { icon: Database, name: "Salesforce", description: "Sync with Salesforce CRM" },
  slack: { icon: Hash, name: "Slack", description: "Get real-time notifications" },
};

export default function SettingsPage() {
  const { integrations, loadIntegrations } = useStore();
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    loadIntegrations();
  }, [loadIntegrations]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-heading-xl font-bold text-surface-900 dark:text-white">Settings</h1>
        <p className="text-body text-surface-500 mt-1">Manage your account, integrations, and billing.</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Tabs */}
        <div className="w-56 shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-body-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400"
                    : "text-surface-600 hover:bg-surface-50 dark:text-surface-400 dark:hover:bg-surface-800"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {activeTab === "profile" && (
            <Card padding="lg">
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
              </CardHeader>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400 text-heading font-bold">
                    AM
                  </div>
                  <div>
                    <Button variant="outline" size="sm">Change Avatar</Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Full Name" defaultValue="Alex Morgan" />
                  <Input label="Email" type="email" defaultValue="alex@company.com" />
                </div>
                <Input label="Role" defaultValue="Owner" disabled />
                <Button>Save Changes</Button>
              </div>
            </Card>
          )}

          {activeTab === "company" && (
            <Card padding="lg">
              <CardHeader>
                <CardTitle>Company Settings</CardTitle>
              </CardHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Company Name" defaultValue="Acme Inc." icon={<Building2 className="w-4 h-4" />} />
                  <Input label="Website" defaultValue="https://acme.com" icon={<Globe className="w-4 h-4" />} />
                </div>
                <Input label="Industry" defaultValue="SaaS / Software" />
                <div>
                  <label className="block text-body-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">White Label Mode</label>
                  <div className="p-4 rounded-xl border border-surface-200 dark:border-surface-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-body-sm font-medium text-surface-900 dark:text-white">Enable White Label</p>
                        <p className="text-caption text-surface-500">Remove LeadForge branding for your clients</p>
                      </div>
                      <div className="w-11 h-6 bg-surface-200 dark:bg-surface-700 rounded-full relative cursor-pointer">
                        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
                <Button>Save Changes</Button>
              </div>
            </Card>
          )}

          {activeTab === "billing" && (
            <div className="space-y-6">
              <Card padding="lg">
                <CardHeader>
                  <CardTitle>Current Plan</CardTitle>
                  <Badge variant="status" status="active" dot>Active</Badge>
                </CardHeader>
                <div className="flex items-center gap-6 mb-6">
                  <div>
                    <p className="text-display font-bold text-surface-900 dark:text-white">Growth</p>
                    <p className="text-body text-surface-500">$297/month</p>
                  </div>
                  <Button variant="outline">Upgrade Plan</Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-body-sm text-surface-600 dark:text-surface-400">Leads Used</span>
                      <span className="text-body-sm font-medium text-surface-900 dark:text-white">1,847 / 2,500</span>
                    </div>
                    <Progress value={1847} max={2500} color="brand" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-body-sm text-surface-600 dark:text-surface-400">Messages Used</span>
                      <span className="text-body-sm font-medium text-surface-900 dark:text-white">5,621 / 10,000</span>
                    </div>
                    <Progress value={5621} max={10000} color="brand" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-body-sm text-surface-600 dark:text-surface-400">AI Agents</span>
                      <span className="text-body-sm font-medium text-surface-900 dark:text-white">7 / 7</span>
                    </div>
                    <Progress value={7} max={7} color="green" />
                  </div>
                </div>
              </Card>

              <Card padding="lg">
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                </CardHeader>
                <div className="space-y-2">
                  {[
                    { date: "Apr 1, 2026", amount: "$297.00", status: "Paid" },
                    { date: "Mar 1, 2026", amount: "$297.00", status: "Paid" },
                    { date: "Feb 1, 2026", amount: "$297.00", status: "Paid" },
                  ].map((inv) => (
                    <div key={inv.date} className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-800/50">
                      <div>
                        <p className="text-body-sm font-medium text-surface-900 dark:text-white">{inv.date}</p>
                        <p className="text-caption text-surface-500">Growth Plan</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-body-sm font-medium text-surface-900 dark:text-white">{inv.amount}</span>
                        <Badge variant="status" status="active">{inv.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {activeTab === "integrations" && (
            <div className="space-y-4">
              {integrations.map((integration, i) => {
                const meta = integrationMeta[integration.type];
                if (!meta) return null;
                return (
                  <motion.div
                    key={integration.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <Card padding="md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-100 text-surface-600 dark:bg-surface-800 dark:text-surface-400">
                            <meta.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-body font-semibold text-surface-900 dark:text-white">{meta.name}</h4>
                              {integration.status === "connected" ? (
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                              ) : (
                                <XCircle className="w-4 h-4 text-surface-400" />
                              )}
                            </div>
                            <p className="text-body-sm text-surface-500">{meta.description}</p>
                          </div>
                        </div>
                        <Button
                          variant={integration.status === "connected" ? "outline" : "primary"}
                          size="sm"
                        >
                          {integration.status === "connected" ? "Configure" : "Connect"}
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}

          {activeTab === "notifications" && (
            <Card padding="lg">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <div className="space-y-4">
                {[
                  { label: "New lead discovered", description: "When AI finds a new matching prospect", enabled: true },
                  { label: "Reply received", description: "When a prospect replies to outreach", enabled: true },
                  { label: "Meeting booked", description: "When a meeting is scheduled", enabled: true },
                  { label: "Agent errors", description: "When an AI agent encounters an error", enabled: true },
                  { label: "Weekly digest", description: "Summary of weekly performance", enabled: false },
                  { label: "Campaign milestones", description: "When campaigns hit key metrics", enabled: true },
                ].map((pref) => (
                  <div key={pref.label} className="flex items-center justify-between p-3 rounded-xl border border-surface-200 dark:border-surface-700">
                    <div>
                      <p className="text-body-sm font-medium text-surface-900 dark:text-white">{pref.label}</p>
                      <p className="text-caption text-surface-500">{pref.description}</p>
                    </div>
                    <div className={cn(
                      "w-11 h-6 rounded-full relative cursor-pointer transition-colors",
                      pref.enabled ? "bg-brand-600" : "bg-surface-200 dark:bg-surface-700"
                    )}>
                      <div className={cn(
                        "absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform",
                        pref.enabled ? "left-[22px]" : "left-0.5"
                      )} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === "api" && (
            <Card padding="lg">
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
              </CardHeader>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-body-sm font-medium text-surface-900 dark:text-white">Production API Key</p>
                      <p className="text-caption text-surface-500 font-mono mt-1">lf_live_****************************k9m2</p>
                    </div>
                    <Button variant="outline" size="sm">Reveal</Button>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-body-sm font-medium text-surface-900 dark:text-white">Test API Key</p>
                      <p className="text-caption text-surface-500 font-mono mt-1">lf_test_****************************x7p4</p>
                    </div>
                    <Button variant="outline" size="sm">Reveal</Button>
                  </div>
                </div>
                <Button variant="outline" icon={<Key className="w-4 h-4" />}>Generate New Key</Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
