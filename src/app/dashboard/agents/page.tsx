"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Modal } from "@/components/ui/modal";
import { formatNumber, getRelativeTime } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Search,
  Brain,
  MessageSquare,
  Send,
  Clock,
  Calendar,
  Database,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Activity,
  CheckCircle2,
  XCircle,
  Zap,
} from "lucide-react";
import type { Agent } from "@/types";

const agentIcons: Record<string, React.ElementType> = {
  prospect_finder: Search,
  research: Brain,
  personalization: MessageSquare,
  outreach: Send,
  follow_up: Clock,
  meeting: Calendar,
  crm: Database,
};

const agentColors: Record<string, string> = {
  prospect_finder: "bg-blue-500",
  research: "bg-purple-500",
  personalization: "bg-pink-500",
  outreach: "bg-green-500",
  follow_up: "bg-yellow-500",
  meeting: "bg-indigo-500",
  crm: "bg-teal-500",
};

export default function AgentsPage() {
  const { agents, loadAgents, updateAgent } = useStore();
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  useEffect(() => {
    loadAgents();
  }, [loadAgents]);

  const toggleAgent = (agent: Agent) => {
    const newStatus = agent.status === "running" ? "paused" : "running";
    updateAgent(agent.id, { status: newStatus });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-heading-xl font-bold text-surface-900 dark:text-white">AI Agents</h1>
          <p className="text-body text-surface-500 mt-1">Your autonomous sales workforce.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="status" status="running" dot>
            {agents.filter((a) => a.status === "running").length} Running
          </Badge>
        </div>
      </div>

      {/* Orchestration Overview */}
      <Card padding="lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-heading font-semibold text-surface-900 dark:text-white">Agent Orchestration Engine</h3>
              <p className="text-body-sm text-surface-500">All agents work together in a coordinated pipeline</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-heading-lg font-bold text-surface-900 dark:text-white">
                {formatNumber(agents.reduce((a, b) => a + b.tasks_completed, 0))}
              </p>
              <p className="text-caption text-surface-500">Total Tasks</p>
            </div>
            <div className="text-center">
              <p className="text-heading-lg font-bold text-green-600 dark:text-green-400">
                {(agents.reduce((a, b) => a + b.success_rate, 0) / agents.length).toFixed(1)}%
              </p>
              <p className="text-caption text-surface-500">Avg Success</p>
            </div>
          </div>
        </div>

        {/* Pipeline Visualization */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2">
          {agents.map((agent, i) => {
            const Icon = agentIcons[agent.type] || Zap;
            return (
              <div key={agent.id} className="flex items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2 border ${
                    agent.status === "running"
                      ? "border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
                      : "border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-800"
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${agent.status === "running" ? "bg-green-500 animate-pulse" : "bg-surface-400"}`} />
                  <Icon className="w-4 h-4 text-surface-600 dark:text-surface-400" />
                  <span className="text-caption font-medium text-surface-700 dark:text-surface-300 whitespace-nowrap">{agent.name}</span>
                </motion.div>
                {i < agents.length - 1 && (
                  <div className="w-6 h-px bg-surface-300 dark:bg-surface-600 mx-1" />
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {agents.map((agent, i) => {
          const Icon = agentIcons[agent.type] || Zap;
          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card padding="lg" hover onClick={() => setSelectedAgent(agent)}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${agentColors[agent.type]} text-white`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-body-lg font-semibold text-surface-900 dark:text-white">{agent.name}</h3>
                      <Badge variant="status" status={agent.status} dot>
                        {agent.status}
                      </Badge>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleAgent(agent);
                    }}
                    className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                  >
                    {agent.status === "running" ? (
                      <Pause className="w-4 h-4 text-surface-500" />
                    ) : (
                      <Play className="w-4 h-4 text-green-600" />
                    )}
                  </button>
                </div>

                <p className="mt-3 text-body-sm text-surface-500 leading-relaxed line-clamp-2">
                  {agent.description}
                </p>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="text-center p-2 rounded-lg bg-surface-50 dark:bg-surface-800/50">
                    <p className="text-body-sm font-bold text-surface-900 dark:text-white">
                      {formatNumber(agent.tasks_completed)}
                    </p>
                    <p className="text-caption text-surface-500">Completed</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-surface-50 dark:bg-surface-800/50">
                    <p className="text-body-sm font-bold text-red-600 dark:text-red-400">
                      {agent.tasks_failed}
                    </p>
                    <p className="text-caption text-surface-500">Failed</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-surface-50 dark:bg-surface-800/50">
                    <p className="text-body-sm font-bold text-green-600 dark:text-green-400">
                      {agent.success_rate}%
                    </p>
                    <p className="text-caption text-surface-500">Success</p>
                  </div>
                </div>

                <div className="mt-4">
                  <Progress value={agent.success_rate} color="green" size="sm" />
                </div>

                {agent.last_run_at && (
                  <p className="mt-3 text-caption text-surface-400">
                    Last run: {getRelativeTime(agent.last_run_at)}
                  </p>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Agent Detail Modal */}
      <Modal
        open={!!selectedAgent}
        onClose={() => setSelectedAgent(null)}
        title={selectedAgent?.name}
        size="lg"
      >
        {selectedAgent && (
          <div className="space-y-6">
            <p className="text-body text-surface-500">{selectedAgent.description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-body-sm font-medium text-surface-700 dark:text-surface-300">Tasks Completed</span>
                </div>
                <p className="text-heading-xl font-bold text-surface-900 dark:text-white">
                  {formatNumber(selectedAgent.tasks_completed)}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span className="text-body-sm font-medium text-surface-700 dark:text-surface-300">Tasks Failed</span>
                </div>
                <p className="text-heading-xl font-bold text-surface-900 dark:text-white">
                  {selectedAgent.tasks_failed}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-body font-semibold text-surface-900 dark:text-white mb-2">Success Rate</h4>
              <Progress value={selectedAgent.success_rate} color="green" showLabel />
            </div>

            <div>
              <h4 className="text-body font-semibold text-surface-900 dark:text-white mb-2">Configuration</h4>
              <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800 font-mono text-body-sm text-surface-600 dark:text-surface-400">
                <pre>{JSON.stringify(selectedAgent.config, null, 2)}</pre>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant={selectedAgent.status === "running" ? "danger" : "primary"}
                onClick={() => {
                  toggleAgent(selectedAgent);
                  setSelectedAgent({ ...selectedAgent, status: selectedAgent.status === "running" ? "paused" : "running" });
                }}
                icon={selectedAgent.status === "running" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              >
                {selectedAgent.status === "running" ? "Pause Agent" : "Start Agent"}
              </Button>
              <Button variant="outline" icon={<RotateCcw className="w-4 h-4" />}>Restart</Button>
              <Button variant="ghost" icon={<Settings className="w-4 h-4" />}>Configure</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
