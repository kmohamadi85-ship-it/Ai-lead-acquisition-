"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  description?: string;
  className?: string;
}

export function MetricCard({ title, value, change, icon, description, className }: MetricCardProps) {
  const isPositive = change && change > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "rounded-2xl border border-surface-200 bg-white p-6 dark:border-surface-800 dark:bg-surface-900",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-body-sm text-surface-500 dark:text-surface-400">{title}</p>
          <p className="mt-2 text-heading-xl font-bold text-surface-900 dark:text-white tracking-tight">
            {value}
          </p>
          <div className="mt-2 flex items-center gap-2">
            {change !== undefined && (
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 text-caption font-medium",
                  isPositive ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"
                )}
              >
                {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {Math.abs(change)}%
              </span>
            )}
            {description && (
              <span className="text-caption text-surface-400">{description}</span>
            )}
          </div>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
