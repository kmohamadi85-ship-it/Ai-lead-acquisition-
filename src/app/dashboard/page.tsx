"use client";

import { useEffect } from "react";
import { useStore } from "@/lib/store";
import { MetricCard } from "@/components/ui/metric-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatNumber, formatPercent, formatCurrency, getRelativeTime } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Users,
  Send,
  MessageSquare,
  Calendar,
  TrendingUp,
  Bot,
  DollarSign,
  Target,
} from "lucide-react";

export default function DashboardPage() {
  const { metrics, loadMetrics, agents, loadAgents, notifications, loadNotifications } = useStore();

  useEffect(() => {
    loadMetrics();
    loadAgents();
    loadNotifications();
  }, [loadMetrics, loadAgents, loadNotifications]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-heading-xl font-bold text-surface-900 dark:text-white">Dashboard</h1>
        <p className="text-body text-surface-500 mt-1">Overview of your AI sales pipeline.</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Leads Discovered"
          value={formatNumber(metrics.leads_discovered)}
          change={18.2}
          description="vs last month"
          icon={<Users className="w-6 h-6" />}
        />
        <MetricCard
          title="Messages Sent"
          value={formatNumber(metrics.messages_sent)}
          change={24.5}
          description="vs last month"
          icon={<Send className="w-6 h-6" />}
        />
        <MetricCard
          title="Replies Received"
          value={formatNumber(metrics.replies_received)}
          change={12.8}
          description="vs last month"
          icon={<MessageSquare className="w-6 h-6" />}
        />
        <MetricCard
          title="Meetings Booked"
          value={metrics.meetings_booked}
          change={31.4}
          description="vs last month"
          icon={<Calendar className="w-6 h-6" />}
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Conversion Rate"
          value={formatPercent(metrics.conversion_rate)}
          change={2.1}
          icon={<TrendingUp className="w-6 h-6" />}
        />
        <MetricCard
          title="Response Rate"
          value={formatPercent(metrics.response_rate)}
          change={5.3}
          icon={<Target className="w-6 h-6" />}
        />
        <MetricCard
          title="Pipeline Value"
          value={formatCurrency(metrics.pipeline_value)}
          change={15.7}
          icon={<DollarSign className="w-6 h-6" />}
        />
        <MetricCard
          title="Agents Running"
          value={`${metrics.agents_running} / 7`}
          icon={<Bot className="w-6 h-6" />}
        />
      </div>

      {/* Charts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leads Trend Chart */}
        <Card className="lg:col-span-2" padding="lg">
          <CardHeader>
            <CardTitle>Pipeline Activity</CardTitle>
            <span className="text-caption text-surface-500">Last 14 days</span>
          </CardHeader>
          <div className="flex items-end justify-between h-52 px-2 gap-2">
            {metrics.leads_trend.map((d, i) => {
              const maxVal = Math.max(...metrics.leads_trend.map((t) => t.value));
              const height = (d.value / maxVal) * 100;
              return (
                <motion.div
                  key={d.date}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.5, delay: i * 0.03 }}
                  className="flex-1 bg-brand-500/80 dark:bg-brand-400/60 rounded-t-md hover:bg-brand-600 dark:hover:bg-brand-400 transition-colors cursor-pointer group relative"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-surface-900 dark:bg-surface-100 text-white dark:text-surface-900 text-caption px-2 py-0.5 rounded whitespace-nowrap">
                    {d.value}
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="flex justify-between mt-2 px-2">
            <span className="text-caption text-surface-400">Mar 13</span>
            <span className="text-caption text-surface-400">Mar 26</span>
          </div>
        </Card>

        {/* Agent Status */}
        <Card padding="lg">
          <CardHeader>
            <CardTitle>Agent Status</CardTitle>
            <Badge variant="status" status="running" dot>Live</Badge>
          </CardHeader>
          <div className="space-y-3">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="flex items-center justify-between p-3 rounded-xl bg-surface-50 dark:bg-surface-800/50"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${agent.status === "running" ? "bg-green-500 animate-pulse" : agent.status === "idle" ? "bg-surface-400" : "bg-red-500"}`} />
                  <div>
                    <p className="text-body-sm font-medium text-surface-900 dark:text-white">{agent.name}</p>
                    <p className="text-caption text-surface-500">{agent.tasks_completed} tasks</p>
                  </div>
                </div>
                <Badge variant="status" status={agent.status}>
                  {agent.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Channel Performance & Top Campaigns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Channel Performance */}
        <Card padding="lg">
          <CardHeader>
            <CardTitle>Channel Performance</CardTitle>
          </CardHeader>
          <div className="space-y-4">
            {metrics.channel_performance.map((ch) => (
              <div key={ch.channel} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-body-sm font-medium text-surface-900 dark:text-white">{ch.channel}</span>
                  <span className="text-caption text-surface-500">{ch.meetings} meetings</span>
                </div>
                <div className="flex gap-1 h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(ch.sent / ch.sent) * 100}%` }}
                    transition={{ duration: 0.6 }}
                    className="bg-surface-200 dark:bg-surface-700 rounded-l"
                    title={`Sent: ${ch.sent}`}
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(ch.opened / ch.sent) * 100}%` }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-brand-300 dark:bg-brand-700"
                    title={`Opened: ${ch.opened}`}
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(ch.replied / ch.sent) * 100}%` }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-brand-500"
                    title={`Replied: ${ch.replied}`}
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(ch.meetings / ch.sent) * 100}%` }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-green-500 rounded-r"
                    title={`Meetings: ${ch.meetings}`}
                  />
                </div>
                <div className="flex gap-4 text-caption text-surface-500">
                  <span>Sent: {formatNumber(ch.sent)}</span>
                  <span>Opened: {formatNumber(ch.opened)}</span>
                  <span>Replied: {formatNumber(ch.replied)}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Campaigns */}
        <Card padding="lg">
          <CardHeader>
            <CardTitle>Top Campaigns</CardTitle>
          </CardHeader>
          <div className="space-y-3">
            {metrics.top_performing_campaigns.map((camp, i) => (
              <div key={camp.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-50 dark:bg-surface-800/50">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-brand-700 text-body-sm font-bold dark:bg-brand-900/30 dark:text-brand-400">
                    #{i + 1}
                  </span>
                  <div>
                    <p className="text-body-sm font-medium text-surface-900 dark:text-white">{camp.name}</p>
                    <p className="text-caption text-surface-500">{camp.sent} sent &middot; {camp.replies} replies</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-body-sm font-bold text-green-600 dark:text-green-400">{camp.meetings} meetings</p>
                  <p className="text-caption text-surface-500">{camp.conversion_rate}% CVR</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card padding="lg">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <div className="space-y-3">
          {notifications.slice(0, 5).map((notif) => (
            <div key={notif.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors">
              <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${
                notif.type === "meeting_booked" ? "bg-green-500" :
                notif.type === "reply_received" ? "bg-blue-500" :
                notif.type === "lead_found" ? "bg-purple-500" :
                notif.type === "agent_error" ? "bg-red-500" : "bg-surface-400"
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-body-sm text-surface-900 dark:text-white">{notif.message}</p>
                <p className="text-caption text-surface-400 mt-0.5">{getRelativeTime(notif.created_at)}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
