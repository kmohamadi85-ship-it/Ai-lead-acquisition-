"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/logo";
import {
  Building2,
  Target,
  MessageSquare,
  Globe,
  ArrowRight,
  ArrowLeft,
  Check,
  Briefcase,
  Users,
  MapPin,
} from "lucide-react";

const steps = [
  { icon: Building2, title: "Company Profile", description: "Tell us about your business" },
  { icon: Target, title: "Ideal Customer", description: "Define who you want to reach" },
  { icon: MessageSquare, title: "Your Offer", description: "Describe what you sell" },
  { icon: Globe, title: "Geography & Launch", description: "Set targets and launch" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setLoading(true);
      setTimeout(() => router.push("/dashboard"), 1200);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-surface-50 dark:bg-surface-950">
        {/* Header */}
        <div className="border-b border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-950">
          <div className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
            <Logo size="md" />
            <span className="text-body-sm text-surface-500">Step {step + 1} of {steps.length}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="mx-auto max-w-4xl px-6 py-8">
          <div className="flex items-center justify-between mb-12">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                      i < step
                        ? "bg-brand-600 border-brand-600 text-white"
                        : i === step
                        ? "border-brand-600 text-brand-600 dark:text-brand-400 dark:border-brand-400"
                        : "border-surface-300 text-surface-400 dark:border-surface-600"
                    }`}
                  >
                    {i < step ? <Check className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                  </div>
                  <span className={`mt-2 text-caption font-medium ${i <= step ? "text-surface-900 dark:text-white" : "text-surface-400"}`}>
                    {s.title}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 mt-[-20px] ${i < step ? "bg-brand-600" : "bg-surface-200 dark:bg-surface-700"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Form Steps */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 p-8 max-w-2xl mx-auto"
            >
              {step === 0 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-heading-lg font-bold text-surface-900 dark:text-white">Company Profile</h2>
                    <p className="text-body text-surface-500 mt-1">Help our AI understand your business.</p>
                  </div>
                  <Input label="Company Name" placeholder="Acme Inc." icon={<Building2 className="w-4 h-4" />} />
                  <Input label="Website" placeholder="https://acme.com" icon={<Globe className="w-4 h-4" />} />
                  <div>
                    <label className="block text-body-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Industry</label>
                    <select className="w-full rounded-xl border border-surface-200 bg-white px-4 py-2.5 text-body-sm dark:border-surface-700 dark:bg-surface-800 dark:text-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20">
                      <option value="">Select your industry</option>
                      <option>SaaS / Software</option>
                      <option>E-commerce</option>
                      <option>FinTech</option>
                      <option>Healthcare</option>
                      <option>Marketing / Agency</option>
                      <option>Consulting</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <Textarea label="Company Description" placeholder="What does your company do?" rows={3} />
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-heading-lg font-bold text-surface-900 dark:text-white">Ideal Customer Profile</h2>
                    <p className="text-body text-surface-500 mt-1">Define who you want our AI agents to find.</p>
                  </div>
                  <Input label="Target Job Titles" placeholder="e.g., CTO, VP Engineering, Head of Product" icon={<Briefcase className="w-4 h-4" />} />
                  <Input label="Target Industries" placeholder="e.g., SaaS, FinTech, Healthcare" icon={<Building2 className="w-4 h-4" />} />
                  <div>
                    <label className="block text-body-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Company Size</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["1-50", "50-200", "200-500", "500-1000", "1000-5000", "5000+"].map((size) => (
                        <button
                          key={size}
                          className="rounded-lg border border-surface-200 dark:border-surface-700 px-3 py-2 text-body-sm text-surface-600 dark:text-surface-400 hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                        >
                          <Users className="w-3.5 h-3.5 inline mr-1.5" />
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Textarea label="Key Pain Points" placeholder="What problems do your ideal customers face?" rows={3} />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-heading-lg font-bold text-surface-900 dark:text-white">Your Offer</h2>
                    <p className="text-body text-surface-500 mt-1">What value do you provide to customers?</p>
                  </div>
                  <Input label="Product / Service Name" placeholder="e.g., CloudScale Platform" />
                  <Textarea label="Offer Description" placeholder="Describe your product or service and its key benefits..." rows={4} />
                  <Textarea label="Key Differentiators" placeholder="What makes you different from competitors?" rows={3} />
                  <Input label="Typical Deal Size" placeholder="e.g., $5,000 - $50,000 / year" />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-heading-lg font-bold text-surface-900 dark:text-white">Geography & Launch</h2>
                    <p className="text-body text-surface-500 mt-1">Set your target regions and get started.</p>
                  </div>
                  <Input label="Target Geography" placeholder="e.g., United States, Canada, UK" icon={<MapPin className="w-4 h-4" />} />
                  <div>
                    <label className="block text-body-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Preferred Outreach Channels</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { name: "Email", selected: true },
                        { name: "LinkedIn", selected: true },
                        { name: "WhatsApp", selected: false },
                      ].map((ch) => (
                        <button
                          key={ch.name}
                          className={`rounded-lg border px-3 py-2 text-body-sm transition-colors ${
                            ch.selected
                              ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400 dark:border-brand-500"
                              : "border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:border-brand-500"
                          }`}
                        >
                          {ch.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-brand-50 dark:bg-brand-900/10 border border-brand-200 dark:border-brand-800">
                    <h4 className="text-body-sm font-semibold text-brand-800 dark:text-brand-300">Ready to Launch</h4>
                    <p className="text-caption text-brand-600 dark:text-brand-400 mt-1">
                      Our AI agents will begin finding and engaging prospects matching your ICP within minutes of activation.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-surface-200 dark:border-surface-800">
                <Button variant="ghost" onClick={handleBack} disabled={step === 0} icon={<ArrowLeft className="w-4 h-4" />}>
                  Back
                </Button>
                <Button onClick={handleNext} loading={loading} icon={<ArrowRight className="w-4 h-4" />}>
                  {step === steps.length - 1 ? "Launch AI Agents" : "Continue"}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </ThemeProvider>
  );
}
