"use client";

import { Zap } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-surface-200 bg-white py-12 dark:border-surface-800 dark:bg-surface-950">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-body-lg font-bold text-surface-900 dark:text-white">LeadForge AI</span>
            </Link>
            <p className="mt-4 text-body-sm text-surface-500 leading-relaxed">
              AI-powered lead acquisition that books qualified meetings on autopilot.
            </p>
          </div>

          <div>
            <h4 className="text-body-sm font-semibold text-surface-900 dark:text-white mb-4">Product</h4>
            <ul className="space-y-2.5">
              {["Features", "Pricing", "Integrations", "API Docs", "Changelog"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-body-sm text-surface-500 hover:text-surface-700 dark:hover:text-surface-300 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-body-sm font-semibold text-surface-900 dark:text-white mb-4">Company</h4>
            <ul className="space-y-2.5">
              {["About", "Blog", "Careers", "Contact", "Partners"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-body-sm text-surface-500 hover:text-surface-700 dark:hover:text-surface-300 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-body-sm font-semibold text-surface-900 dark:text-white mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR", "Security"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-body-sm text-surface-500 hover:text-surface-700 dark:hover:text-surface-300 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-surface-200 dark:border-surface-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-caption text-surface-400">
            &copy; 2026 LeadForge AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Twitter", "LinkedIn", "GitHub"].map((social) => (
              <a key={social} href="#" className="text-caption text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
