"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { MetricCard } from "@/components/ui/metric-card";
import { motion } from "framer-motion";
import {
  Users,
  DollarSign,
  Activity,
  TrendingUp,
  Search,
  Plus,
  Settings,
  BarChart3,
  Building2,
  Mail,
  MoreVertical,
} from "lucide-react";

const mockClients = [
  { id: "1", name: "TechVentures Inc", owner: "Sarah Chen", plan: "scale", leads: 1420, meetings: 89, mrr: 697, status: "active" },
  { id: "2", name: "SalesPro Agency", owner: "Marcus Rivera", plan: "growth", leads: 850, meetings: 42, mrr: 297, status: "active" },
  { id: "3", name: "Digital First Co", owner: "Emily Nakamura", plan: "growth", leads: 620, meetings: 31, mrr: 297, status: "active" },
  { id: "4", name: "StartupLaunch", owner: "David Okonkwo", plan: "starter", leads: 210, meetings: 12, mrr: 97, status: "active" },
  { id: "5", name: "Enterprise Solutions", owner: "Priya Sharma", plan: "enterprise", leads: 3200, meetings: 156, mrr: 1500, status: "active" },
  { id: "6", name: "CloudNine Labs", owner: "James Mitchell", plan: "growth", leads: 445, meetings: 18, mrr: 297, status: "trialing" },
];

export default function AdminPage() {
  const totalMRR = mockClients.reduce((a, b) => a + b.mrr, 0);
  const totalLeads = mockClients.reduce((a, b) => a + b.leads, 0);
  const totalMeetings = mockClients.reduce((a, b) => a + b.meetings, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-heading-xl font-bold text-surface-900 dark:text-white">Admin Panel</h1>
          <p className="text-body text-surface-500 mt-1">Multi-client management and platform overview.</p>
        </div>
        <Button icon={<Plus className="w-4 h-4" />}>Add Client</Button>
      </div>

      {/* Platform Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Clients"
          value={mockClients.length}
          change={16.7}
          description="vs last month"
          icon={<Users className="w-6 h-6" />}
        />
        <MetricCard
          title="Monthly Revenue"
          value={`$${totalMRR.toLocaleString()}`}
          change={12.3}
          description="MRR"
          icon={<DollarSign className="w-6 h-6" />}
        />
        <MetricCard
          title="Total Leads Generated"
          value={totalLeads.toLocaleString()}
          change={22.1}
          description="across all clients"
          icon={<Activity className="w-6 h-6" />}
        />
        <MetricCard
          title="Total Meetings"
          value={totalMeetings}
          change={18.9}
          description="across all clients"
          icon={<TrendingUp className="w-6 h-6" />}
        />
      </div>

      {/* Client List */}
      <Card padding="none">
        <div className="p-4 border-b border-surface-200 dark:border-surface-800 flex items-center justify-between">
          <h3 className="text-heading font-semibold text-surface-900 dark:text-white">Clients</h3>
          <div className="w-64">
            <Input placeholder="Search clients..." icon={<Search className="w-4 h-4" />} />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-200 dark:border-surface-800">
                <th className="text-left px-6 py-3 text-caption font-semibold text-surface-500 uppercase tracking-wider">Client</th>
                <th className="text-left px-6 py-3 text-caption font-semibold text-surface-500 uppercase tracking-wider">Plan</th>
                <th className="text-left px-6 py-3 text-caption font-semibold text-surface-500 uppercase tracking-wider">Leads</th>
                <th className="text-left px-6 py-3 text-caption font-semibold text-surface-500 uppercase tracking-wider">Meetings</th>
                <th className="text-left px-6 py-3 text-caption font-semibold text-surface-500 uppercase tracking-wider">MRR</th>
                <th className="text-left px-6 py-3 text-caption font-semibold text-surface-500 uppercase tracking-wider">Status</th>
                <th className="text-right px-6 py-3 text-caption font-semibold text-surface-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockClients.map((client, i) => (
                <motion.tr
                  key={client.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-surface-100 dark:border-surface-800/50 hover:bg-surface-50 dark:hover:bg-surface-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={client.name} size="sm" />
                      <div>
                        <p className="text-body-sm font-medium text-surface-900 dark:text-white">{client.name}</p>
                        <p className="text-caption text-surface-500">{client.owner}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge>{client.plan}</Badge>
                  </td>
                  <td className="px-6 py-4 text-body-sm font-medium text-surface-900 dark:text-white">
                    {client.leads.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-body-sm font-medium text-green-600 dark:text-green-400">
                    {client.meetings}
                  </td>
                  <td className="px-6 py-4 text-body-sm font-medium text-surface-900 dark:text-white">
                    ${client.mrr}/mo
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="status" status={client.status} dot>{client.status}</Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                        <BarChart3 className="w-4 h-4 text-surface-400" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                        <Settings className="w-4 h-4 text-surface-400" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                        <MoreVertical className="w-4 h-4 text-surface-400" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Plan Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card padding="lg">
          <CardHeader>
            <CardTitle>Plan Distribution</CardTitle>
          </CardHeader>
          <div className="space-y-4">
            {[
              { plan: "Starter", count: 1, color: "bg-gray-500", max: 6 },
              { plan: "Growth", count: 3, color: "bg-brand-500", max: 6 },
              { plan: "Scale", count: 1, color: "bg-green-500", max: 6 },
              { plan: "Enterprise", count: 1, color: "bg-purple-500", max: 6 },
            ].map((p) => (
              <div key={p.plan}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-body-sm font-medium text-surface-900 dark:text-white">{p.plan}</span>
                  <span className="text-caption text-surface-500">{p.count} clients</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-surface-100 dark:bg-surface-800">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(p.count / p.max) * 100}%` }}
                    transition={{ duration: 0.6 }}
                    className={`h-full rounded-full ${p.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card padding="lg">
          <CardHeader>
            <CardTitle>Platform Health</CardTitle>
          </CardHeader>
          <div className="space-y-4">
            {[
              { metric: "API Uptime", value: "99.97%", status: "healthy" },
              { metric: "Avg Response Time", value: "142ms", status: "healthy" },
              { metric: "Active Agents", value: "35 / 42", status: "healthy" },
              { metric: "Email Deliverability", value: "98.2%", status: "healthy" },
              { metric: "Queue Depth", value: "23 tasks", status: "healthy" },
            ].map((item) => (
              <div key={item.metric} className="flex items-center justify-between p-3 rounded-lg bg-surface-50 dark:bg-surface-800/50">
                <span className="text-body-sm text-surface-600 dark:text-surface-400">{item.metric}</span>
                <div className="flex items-center gap-2">
                  <span className="text-body-sm font-medium text-surface-900 dark:text-white">{item.value}</span>
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
