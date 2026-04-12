"use client";

import { motion } from "framer-motion";
import {
  Search,
  Brain,
  MessageSquare,
  Send,
  Clock,
  Calendar,
  Database,
  GitBranch,
} from "lucide-react";

const features = [
  {
    icon: Search,
    name: "Prospect Finder Agent",
    description: "Autonomously searches the internet and databases to find companies matching your ideal customer profile.",
    color: "bg-blue-500",
  },
  {
    icon: Brain,
    name: "Research Agent",
    description: "Deep-dives into prospect websites, extracting pain points, tech stack, and key decision-makers.",
    color: "bg-purple-500",
  },
  {
    icon: MessageSquare,
    name: "Personalization Agent",
    description: "Crafts hyper-personalized outreach messages based on research insights that feel human-written.",
    color: "bg-pink-500",
  },
  {
    icon: Send,
    name: "Outreach Agent",
    description: "Sends emails and LinkedIn messages with A/B testing and smart rotation across channels.",
    color: "bg-green-500",
  },
  {
    icon: Clock,
    name: "Follow-up Agent",
    description: "Never drops the ball. Automatically schedules and sends follow-up sequences at optimal times.",
    color: "bg-yellow-500",
  },
  {
    icon: Calendar,
    name: "Meeting Agent",
    description: "Detects buying signals and books qualified meetings directly into your calendar.",
    color: "bg-indigo-500",
  },
  {
    icon: Database,
    name: "CRM Agent",
    description: "Keeps your pipeline updated in real-time. Logs activities, updates stages, and syncs contacts.",
    color: "bg-teal-500",
  },
  {
    icon: GitBranch,
    name: "Workflow Engine",
    description: "Visual automation builder to create custom AI workflows for any sales process.",
    color: "bg-orange-500",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-white dark:bg-surface-950">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-body-sm font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider"
          >
            AI Agent Army
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-3 text-display font-bold text-surface-900 dark:text-white"
          >
            7 AI Agents Working
            <br />
            Around the Clock
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-body-lg text-surface-500"
          >
            Each agent is a specialist, working together as your autonomous sales department.
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="group relative rounded-2xl border border-surface-200 bg-white p-6 transition-all duration-300 hover:shadow-card-hover hover:border-surface-300 dark:border-surface-800 dark:bg-surface-900 dark:hover:border-surface-700"
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.color} text-white mb-4`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-body-lg font-semibold text-surface-900 dark:text-white mb-2">
                {feature.name}
              </h3>
              <p className="text-body-sm text-surface-500 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
