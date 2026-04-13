"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { Logo } from "@/components/ui/logo";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 800);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex">
        {/* Left - Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <Link href="/" className="mb-10 inline-block">
              <Logo size="md" />
            </Link>

            <h1 className="text-heading-xl font-bold text-surface-900 dark:text-white">Welcome back</h1>
            <p className="mt-2 text-body text-surface-500">
              Log in to manage your AI sales agents.
            </p>

            <form onSubmit={handleLogin} className="mt-8 space-y-4">
              <Input
                label="Email"
                type="email"
                placeholder="you@company.com"
                icon={<Mail className="w-4 h-4" />}
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                icon={<Lock className="w-4 h-4" />}
                required
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-surface-300 text-brand-600 focus:ring-brand-500" />
                  <span className="text-body-sm text-surface-600 dark:text-surface-400">Remember me</span>
                </label>
                <a href="#" className="text-body-sm text-brand-600 hover:text-brand-700 dark:text-brand-400">
                  Forgot password?
                </a>
              </div>

              <Button type="submit" size="lg" className="w-full" loading={loading} icon={<ArrowRight className="w-4 h-4" />}>
                Log In
              </Button>
            </form>

            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-surface-200 dark:border-surface-700" />
              </div>
              <div className="relative flex justify-center text-caption">
                <span className="bg-white dark:bg-surface-950 px-2 text-surface-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="outline" size="lg">Google</Button>
              <Button variant="outline" size="lg">Microsoft</Button>
            </div>

            <p className="mt-8 text-center text-body-sm text-surface-500">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="text-brand-600 font-medium hover:text-brand-700 dark:text-brand-400">
                Start free trial
              </Link>
            </p>
          </motion.div>
        </div>

        {/* Right - Visual */}
        <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-brand-600 to-brand-800 p-12">
          <div className="max-w-md text-white">
            <h2 className="text-display font-bold">Your AI sales team is waiting.</h2>
            <p className="mt-4 text-body-lg text-white/80 leading-relaxed">
              234 meetings booked this month across all clients. Your agents are ready to find, engage, and convert your next customers.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <p className="text-display font-bold">2,847</p>
                <p className="text-body-sm text-white/60">Leads found today</p>
              </div>
              <div>
                <p className="text-display font-bold">44%</p>
                <p className="text-body-sm text-white/60">Response rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
