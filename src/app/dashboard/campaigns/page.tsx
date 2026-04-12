"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Modal } from "@/components/ui/modal";
import { formatNumber } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Plus,
  Play,
  Pause,
  BarChart3,
  Send,
  MessageSquare,
  Calendar,
  Users,
  Mail,
  Share2,
  ChevronRight,
  ArrowRight,
  Clock,
  GitBranch,
} from "lucide-react";
import type { Campaign } from "@/types";

const channelIcons: Record<string, React.ElementType> = {
  email: Mail,
  linkedin: Share2,
  whatsapp: MessageSquare,
  multi: GitBranch,
};

const stepIcons: Record<string, React.ElementType> = {
  email: Mail,
  linkedin_connect: Share2,
  linkedin_message: Share2,
  whatsapp: MessageSquare,
  wait: Clock,
  condition: GitBranch,
};

export default function CampaignsPage() {
  const { campaigns, loadCampaigns } = useStore();
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    loadCampaigns();
  }, [loadCampaigns]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-heading-xl font-bold text-surface-900 dark:text-white">Campaigns</h1>
          <p className="text-body text-surface-500 mt-1">Manage your outreach sequences.</p>
        </div>
        <Button icon={<Plus className="w-4 h-4" />}>New Campaign</Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Active", value: campaigns.filter((c) => c.status === "active").length, color: "text-green-600 dark:text-green-400" },
          { label: "Total Sent", value: formatNumber(campaigns.reduce((a, b) => a + b.sent_count, 0)), color: "text-surface-900 dark:text-white" },
          { label: "Total Replies", value: formatNumber(campaigns.reduce((a, b) => a + b.replied_count, 0)), color: "text-blue-600 dark:text-blue-400" },
          { label: "Meetings Booked", value: campaigns.reduce((a, b) => a + b.meetings_booked, 0), color: "text-brand-600 dark:text-brand-400" },
        ].map((stat) => (
          <Card key={stat.label} padding="md">
            <p className="text-caption text-surface-500">{stat.label}</p>
            <p className={`text-heading-lg font-bold ${stat.color} mt-1`}>{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Campaign List */}
      <div className="space-y-4">
        {campaigns.map((campaign, i) => {
          const ChannelIcon = channelIcons[campaign.channel] || Mail;
          const replyRate = campaign.sent_count > 0 ? ((campaign.replied_count / campaign.sent_count) * 100) : 0;

          return (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card padding="lg" hover onClick={() => setSelectedCampaign(campaign)}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400">
                      <ChannelIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-body-lg font-semibold text-surface-900 dark:text-white">{campaign.name}</h3>
                        <Badge variant="status" status={campaign.status} dot>
                          {campaign.status}
                        </Badge>
                      </div>
                      {campaign.description && (
                        <p className="text-body-sm text-surface-500 mt-0.5">{campaign.description}</p>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-surface-400" />
                </div>

                <div className="mt-4 grid grid-cols-5 gap-6">
                  <div>
                    <p className="text-caption text-surface-500">Leads</p>
                    <p className="text-body font-bold text-surface-900 dark:text-white">{formatNumber(campaign.leads_count)}</p>
                  </div>
                  <div>
                    <p className="text-caption text-surface-500">Sent</p>
                    <p className="text-body font-bold text-surface-900 dark:text-white">{formatNumber(campaign.sent_count)}</p>
                  </div>
                  <div>
                    <p className="text-caption text-surface-500">Opened</p>
                    <p className="text-body font-bold text-surface-900 dark:text-white">{formatNumber(campaign.opened_count)}</p>
                  </div>
                  <div>
                    <p className="text-caption text-surface-500">Replies</p>
                    <p className="text-body font-bold text-blue-600 dark:text-blue-400">{formatNumber(campaign.replied_count)}</p>
                  </div>
                  <div>
                    <p className="text-caption text-surface-500">Meetings</p>
                    <p className="text-body font-bold text-green-600 dark:text-green-400">{campaign.meetings_booked}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-caption text-surface-500">Reply rate</span>
                    <span className="text-caption font-medium text-surface-600 dark:text-surface-400">{replyRate.toFixed(1)}%</span>
                  </div>
                  <Progress value={replyRate} size="sm" />
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Campaign Detail Modal */}
      <Modal
        open={!!selectedCampaign}
        onClose={() => setSelectedCampaign(null)}
        title={selectedCampaign?.name}
        size="xl"
      >
        {selectedCampaign && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Badge variant="status" status={selectedCampaign.status} dot>
                {selectedCampaign.status}
              </Badge>
              <Badge>{selectedCampaign.channel}</Badge>
              {selectedCampaign.start_date && (
                <span className="text-body-sm text-surface-500">Started {selectedCampaign.start_date}</span>
              )}
            </div>

            {/* Funnel */}
            <div className="grid grid-cols-5 gap-4">
              {[
                { label: "Leads", value: selectedCampaign.leads_count, icon: Users },
                { label: "Sent", value: selectedCampaign.sent_count, icon: Send },
                { label: "Opened", value: selectedCampaign.opened_count, icon: Mail },
                { label: "Replied", value: selectedCampaign.replied_count, icon: MessageSquare },
                { label: "Meetings", value: selectedCampaign.meetings_booked, icon: Calendar },
              ].map((step, i) => (
                <div key={step.label} className="flex items-center">
                  <div className="flex-1 text-center p-3 rounded-xl bg-surface-50 dark:bg-surface-800">
                    <step.icon className="w-5 h-5 text-brand-600 dark:text-brand-400 mx-auto mb-1" />
                    <p className="text-heading font-bold text-surface-900 dark:text-white">{formatNumber(step.value)}</p>
                    <p className="text-caption text-surface-500">{step.label}</p>
                  </div>
                  {i < 4 && <ArrowRight className="w-4 h-4 text-surface-300 dark:text-surface-600 mx-1 shrink-0" />}
                </div>
              ))}
            </div>

            {/* Sequence Steps */}
            {selectedCampaign.sequence_steps.length > 0 && (
              <div>
                <h4 className="text-body font-semibold text-surface-900 dark:text-white mb-3">Sequence Steps</h4>
                <div className="space-y-2">
                  {selectedCampaign.sequence_steps.map((step, i) => {
                    const StepIcon = stepIcons[step.type] || Mail;
                    return (
                      <div key={step.id} className="flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-100 dark:bg-surface-800 text-caption font-bold text-surface-600 dark:text-surface-400 shrink-0">
                          {i + 1}
                        </span>
                        <div className="flex items-center gap-2 flex-1 p-3 rounded-lg border border-surface-200 dark:border-surface-700">
                          <StepIcon className="w-4 h-4 text-surface-500 shrink-0" />
                          <div className="flex-1">
                            <p className="text-body-sm font-medium text-surface-900 dark:text-white capitalize">
                              {step.type.replace("_", " ")}
                            </p>
                            {step.subject && <p className="text-caption text-surface-500">{step.subject}</p>}
                            {step.wait_days && <p className="text-caption text-surface-500">Wait {step.wait_days} days</p>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              {selectedCampaign.status === "active" ? (
                <Button variant="secondary" icon={<Pause className="w-4 h-4" />}>Pause Campaign</Button>
              ) : (
                <Button icon={<Play className="w-4 h-4" />}>Start Campaign</Button>
              )}
              <Button variant="outline" icon={<BarChart3 className="w-4 h-4" />}>View Analytics</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
