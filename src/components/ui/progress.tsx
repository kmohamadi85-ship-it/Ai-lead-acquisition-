"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  color?: "brand" | "green" | "yellow" | "red";
  size?: "sm" | "md";
  showLabel?: boolean;
}

export function Progress({ value, max = 100, className, color = "brand", size = "md", showLabel }: ProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const colors = {
    brand: "bg-brand-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
  };

  const heights = {
    sm: "h-1.5",
    md: "h-2.5",
  };

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-caption text-surface-500">{value} / {max}</span>
          <span className="text-caption font-medium text-surface-600 dark:text-surface-400">
            {percentage.toFixed(0)}%
          </span>
        </div>
      )}
      <div className={cn("w-full rounded-full bg-surface-100 dark:bg-surface-800", heights[size])}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn("rounded-full", heights[size], colors[color])}
        />
      </div>
    </div>
  );
}
