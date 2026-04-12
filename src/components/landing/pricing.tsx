"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: 97,
    description: "Perfect for solopreneurs and small teams getting started with AI outreach.",
    features: [
      "Up to 500 leads/month",
      "2,000 messages/month",
      "3 AI agents active",
      "Email channel",
      "Basic analytics",
      "Email support",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Growth",
    price: 297,
    description: "For growing teams that need multi-channel outreach and advanced automation.",
    features: [
      "Up to 2,500 leads/month",
      "10,000 messages/month",
      "All 7 AI agents",
      "Email + LinkedIn channels",
      "Visual workflow builder",
      "Advanced analytics",
      "CRM integrations",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Scale",
    price: 697,
    description: "For agencies and sales teams running multiple campaigns at scale.",
    features: [
      "Up to 10,000 leads/month",
      "50,000 messages/month",
      "All 7 AI agents",
      "All channels (Email, LinkedIn, WhatsApp)",
      "Multi-client management",
      "White-label mode",
      "Custom workflows",
      "API access",
      "Dedicated account manager",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Enterprise",
    price: null,
    description: "Custom solutions for large organizations with specific compliance and integration needs.",
    features: [
      "Unlimited leads",
      "Unlimited messages",
      "Custom AI agent training",
      "All channels + custom",
      "SSO & SAML",
      "Custom integrations",
      "SLA guarantee",
      "Dedicated infrastructure",
      "White-glove onboarding",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white dark:bg-surface-950">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-body-sm font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider"
          >
            Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-3 text-display font-bold text-surface-900 dark:text-white"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-body-lg text-surface-500"
          >
            Start free for 14 days. No credit card required.
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className={cn(
                "relative rounded-2xl border p-6 flex flex-col",
                plan.popular
                  ? "border-brand-500 bg-brand-50/50 shadow-glow dark:border-brand-500 dark:bg-brand-900/10"
                  : "border-surface-200 bg-white dark:border-surface-800 dark:bg-surface-900"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-600 px-3 py-1 text-caption font-semibold text-white">
                    <Zap className="w-3 h-3" /> Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-heading font-bold text-surface-900 dark:text-white">{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  {plan.price !== null ? (
                    <>
                      <span className="text-display font-bold text-surface-900 dark:text-white">${plan.price}</span>
                      <span className="text-body-sm text-surface-500">/month</span>
                    </>
                  ) : (
                    <span className="text-heading-lg font-bold text-surface-900 dark:text-white">Custom</span>
                  )}
                </div>
                <p className="mt-3 text-body-sm text-surface-500 leading-relaxed">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                    <span className="text-body-sm text-surface-600 dark:text-surface-400">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/auth/signup">
                <Button
                  variant={plan.popular ? "primary" : "outline"}
                  size="lg"
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
