"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Check } from "lucide-react";
import { Logo } from "@/components/ui/logo";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/onboarding");
    }, 800);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex">
        {/* Left - Visual */}
        <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-brand-600 to-brand-800 p-12">
          <div className="max-w-md text-white">
            <h2 className="text-display font-bold">Start getting qualified meetings in days.</h2>
            <p className="mt-4 text-body-lg text-white/80 leading-relaxed">
              Join 500+ companies that have automated their lead acquisition with AI.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "14-day free trial, no credit card",
                "7 autonomous AI agents included",
                "Setup takes under 10 minutes",
                "Cancel anytime, keep your data",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-body text-white/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right - Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <Link href="/" className="mb-10 inline-block">
              <Logo size="md" />
            </Link>

            <h1 className="text-heading-xl font-bold text-surface-900 dark:text-white">Create your account</h1>
            <p className="mt-2 text-body text-surface-500">
              Start your 14-day free trial. No credit card required.
            </p>

            <form onSubmit={handleSignup} className="mt-8 space-y-4">
              <Input
                label="Full Name"
                type="text"
                placeholder="Alex Morgan"
                icon={<User className="w-4 h-4" />}
                required
              />
              <Input
                label="Work Email"
                type="email"
                placeholder="you@company.com"
                icon={<Mail className="w-4 h-4" />}
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="8+ characters"
                icon={<Lock className="w-4 h-4" />}
                required
              />

              <Button type="submit" size="lg" className="w-full" loading={loading} icon={<ArrowRight className="w-4 h-4" />}>
                Create Account
              </Button>
            </form>

            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-surface-200 dark:border-surface-700" />
              </div>
              <div className="relative flex justify-center text-caption">
                <span className="bg-white dark:bg-surface-950 px-2 text-surface-400">Or sign up with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="outline" size="lg">Google</Button>
              <Button variant="outline" size="lg">Microsoft</Button>
            </div>

            <p className="mt-8 text-center text-body-sm text-surface-500">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-brand-600 font-medium hover:text-brand-700 dark:text-brand-400">
                Log in
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </ThemeProvider>
  );
}
