"use client";

import { motion } from "framer-motion";
import { UserPlus, Target, Zap, CalendarCheck } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Define Your ICP",
    description: "Tell us about your ideal customer — job titles, industries, company size, geography. Our wizard makes it effortless.",
  },
  {
    icon: Target,
    step: "02",
    title: "AI Finds Prospects",
    description: "Our Prospect Finder agent scans the internet, databases, and social networks to build a list of perfect-fit leads.",
  },
  {
    icon: Zap,
    step: "03",
    title: "Personalized Outreach",
    description: "Each prospect gets a research-backed, personalized message across email, LinkedIn, or WhatsApp. No templates.",
  },
  {
    icon: CalendarCheck,
    step: "04",
    title: "Meetings on Autopilot",
    description: "Interested prospects are automatically guided to book a meeting. Your calendar fills up with qualified opportunities.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-surface-50 dark:bg-surface-900/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-body-sm font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider"
          >
            How It Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-3 text-display font-bold text-surface-900 dark:text-white"
          >
            From Zero to Booked Meetings
            <br />
            in 4 Simple Steps
          </motion.h2>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="relative text-center"
            >
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px bg-surface-200 dark:bg-surface-700" />
              )}
              <div className="relative inline-flex">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400 mx-auto">
                  <step.icon className="w-8 h-8" />
                </div>
                <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-white text-caption font-bold">
                  {step.step}
                </span>
              </div>
              <h3 className="mt-6 text-body-lg font-semibold text-surface-900 dark:text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-body-sm text-surface-500 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
