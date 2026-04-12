"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/50 via-white to-white dark:from-brand-950/20 dark:via-surface-950 dark:to-surface-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-400/10 rounded-full blur-3xl dark:bg-brand-600/5" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-body-sm font-medium text-brand-700 ring-1 ring-brand-200 dark:bg-brand-900/20 dark:text-brand-400 dark:ring-brand-800">
              <Sparkles className="w-4 h-4" />
              AI-Powered Lead Acquisition
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-8 text-display-lg font-bold tracking-tight text-surface-900 dark:text-white sm:text-display-xl"
          >
            Your AI Sales Team
            <br />
            <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
              That Never Sleeps
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-body-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto leading-relaxed"
          >
            LeadForge AI autonomously finds your ideal prospects, crafts personalized outreach,
            and books qualified meetings on your calendar. Zero manual effort required.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex items-center justify-center gap-4 flex-wrap"
          >
            <Link href="/auth/signup">
              <Button size="xl" icon={<ArrowRight className="w-5 h-5" />}>
                Start Free Trial
              </Button>
            </Link>
            <Button variant="outline" size="xl" icon={<Play className="w-5 h-5" />}>
              Watch Demo
            </Button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 flex items-center justify-center gap-8 text-surface-400"
          >
            <div className="text-center">
              <p className="text-heading-lg font-bold text-surface-900 dark:text-white">2,400+</p>
              <p className="text-caption">Meetings Booked</p>
            </div>
            <div className="w-px h-10 bg-surface-200 dark:bg-surface-700" />
            <div className="text-center">
              <p className="text-heading-lg font-bold text-surface-900 dark:text-white">500+</p>
              <p className="text-caption">Companies</p>
            </div>
            <div className="w-px h-10 bg-surface-200 dark:bg-surface-700" />
            <div className="text-center">
              <p className="text-heading-lg font-bold text-surface-900 dark:text-white">12.2%</p>
              <p className="text-caption">Avg Conversion</p>
            </div>
          </motion.div>
        </div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 mx-auto max-w-5xl"
        >
          <div className="rounded-2xl border border-surface-200 bg-white shadow-2xl overflow-hidden dark:border-surface-700 dark:bg-surface-900">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-surface-200 dark:border-surface-700">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-3 text-caption text-surface-400">LeadForge AI Dashboard</span>
            </div>
            <div className="p-6 bg-gradient-to-br from-surface-50 to-white dark:from-surface-900 dark:to-surface-800">
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Leads Found", value: "2,847", trend: "+18%" },
                  { label: "Messages Sent", value: "5,621", trend: "+24%" },
                  { label: "Replies", value: "847", trend: "+12%" },
                  { label: "Meetings", value: "234", trend: "+31%" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-white border border-surface-200 p-4 dark:bg-surface-800 dark:border-surface-700">
                    <p className="text-caption text-surface-500">{stat.label}</p>
                    <p className="text-heading-lg font-bold text-surface-900 dark:text-white mt-1">{stat.value}</p>
                    <span className="text-caption text-green-600 font-medium">{stat.trend}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 rounded-xl bg-white border border-surface-200 p-4 h-48 dark:bg-surface-800 dark:border-surface-700">
                  <p className="text-body-sm font-medium text-surface-900 dark:text-white mb-3">Pipeline Activity</p>
                  <div className="flex items-end justify-between h-28 px-2">
                    {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 0.5, delay: 0.8 + i * 0.05 }}
                        className="w-4 rounded-t bg-brand-500/80 dark:bg-brand-400/60"
                      />
                    ))}
                  </div>
                </div>
                <div className="rounded-xl bg-white border border-surface-200 p-4 h-48 dark:bg-surface-800 dark:border-surface-700">
                  <p className="text-body-sm font-medium text-surface-900 dark:text-white mb-3">Active Agents</p>
                  <div className="space-y-3 mt-4">
                    {["Prospect Finder", "Research", "Outreach", "Follow-up"].map((agent) => (
                      <div key={agent} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-caption text-surface-600 dark:text-surface-400">{agent}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
