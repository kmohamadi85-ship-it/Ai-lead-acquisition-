"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Plus,
  GitBranch,
  Play,
  Zap,
  Bot,
  GitMerge,
  Clock,
  ArrowDown,
  Settings,
  MousePointer,
} from "lucide-react";
import type { Workflow, WorkflowNode } from "@/types";

const nodeIcons: Record<string, React.ElementType> = {
  trigger: Zap,
  action: Play,
  condition: GitMerge,
  delay: Clock,
  ai_agent: Bot,
};

const nodeColors: Record<string, string> = {
  trigger: "bg-purple-500 text-white",
  action: "bg-blue-500 text-white",
  condition: "bg-yellow-500 text-white",
  delay: "bg-gray-500 text-white",
  ai_agent: "bg-brand-500 text-white",
};

export default function WorkflowsPage() {
  const { workflows, loadWorkflows } = useStore();
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);

  useEffect(() => {
    loadWorkflows();
  }, [loadWorkflows]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-heading-xl font-bold text-surface-900 dark:text-white">Workflows</h1>
          <p className="text-body text-surface-500 mt-1">Visual automation builder for your sales process.</p>
        </div>
        <Button icon={<Plus className="w-4 h-4" />}>New Workflow</Button>
      </div>

      {/* Workflow Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {workflows.map((workflow, i) => (
          <motion.div
            key={workflow.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card padding="lg" hover onClick={() => setSelectedWorkflow(workflow)}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400">
                    <GitBranch className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-body-lg font-semibold text-surface-900 dark:text-white">{workflow.name}</h3>
                    <Badge variant="status" status={workflow.status} dot>{workflow.status}</Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm" icon={<Settings className="w-4 h-4" />} />
              </div>

              {workflow.description && (
                <p className="text-body-sm text-surface-500 mb-4">{workflow.description}</p>
              )}

              {/* Mini Workflow Preview */}
              <div className="flex flex-col items-center gap-1 py-4">
                {workflow.nodes.slice(0, 5).map((node, ni) => {
                  const Icon = nodeIcons[node.type] || Zap;
                  return (
                    <div key={node.id} className="flex flex-col items-center">
                      <div className={cn(
                        "flex items-center gap-2 rounded-lg px-3 py-1.5 text-caption font-medium",
                        nodeColors[node.type]
                      )}>
                        <Icon className="w-3.5 h-3.5" />
                        {node.data.label}
                      </div>
                      {ni < Math.min(workflow.nodes.length, 5) - 1 && (
                        <ArrowDown className="w-4 h-4 text-surface-300 dark:text-surface-600 my-0.5" />
                      )}
                    </div>
                  );
                })}
                {workflow.nodes.length > 5 && (
                  <span className="text-caption text-surface-400 mt-1">+{workflow.nodes.length - 5} more steps</span>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-surface-200 dark:border-surface-800">
                <span className="text-caption text-surface-500">
                  {workflow.nodes.length} nodes &middot; {workflow.edges.length} connections
                </span>
                <span className="text-caption text-surface-500">
                  Trigger: {workflow.trigger.type.replace("_", " ")}
                </span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Workflow Canvas (Selected Workflow) */}
      {selectedWorkflow && (
        <Card padding="lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-heading font-bold text-surface-900 dark:text-white">{selectedWorkflow.name}</h3>
              <p className="text-body-sm text-surface-500">{selectedWorkflow.description}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" icon={<MousePointer className="w-4 h-4" />}>Edit</Button>
              <Button size="sm" icon={<Play className="w-4 h-4" />}>Run</Button>
            </div>
          </div>

          {/* Visual Canvas */}
          <div className="relative bg-surface-50 dark:bg-surface-800/30 rounded-xl border border-surface-200 dark:border-surface-800 p-8 min-h-[500px]">
            <div className="flex flex-col items-center gap-4">
              {selectedWorkflow.nodes.map((node, i) => {
                const Icon = nodeIcons[node.type] || Zap;
                const edge = selectedWorkflow.edges.find((e) => e.source === node.id);

                return (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex flex-col items-center"
                  >
                    <div className={cn(
                      "relative flex items-center gap-3 rounded-2xl border-2 px-5 py-3 bg-white dark:bg-surface-900 shadow-card",
                      node.type === "trigger" ? "border-purple-300 dark:border-purple-700" :
                      node.type === "condition" ? "border-yellow-300 dark:border-yellow-700" :
                      node.type === "ai_agent" ? "border-brand-300 dark:border-brand-700" :
                      node.type === "delay" ? "border-gray-300 dark:border-gray-600" :
                      "border-blue-300 dark:border-blue-700"
                    )}>
                      <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl", nodeColors[node.type])}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-body-sm font-semibold text-surface-900 dark:text-white">{node.data.label}</p>
                        {node.data.description && (
                          <p className="text-caption text-surface-500">{node.data.description}</p>
                        )}
                      </div>
                    </div>

                    {i < selectedWorkflow.nodes.length - 1 && (
                      <div className="flex flex-col items-center my-1">
                        <div className="w-px h-4 bg-surface-300 dark:bg-surface-600" />
                        {edge?.label && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-surface-200 dark:bg-surface-700 text-surface-600 dark:text-surface-400 font-medium">
                            {edge.label}
                          </span>
                        )}
                        <ArrowDown className="w-4 h-4 text-surface-400 dark:text-surface-500" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
