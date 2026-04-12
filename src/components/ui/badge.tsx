"use client";

import { cn, getStatusColor } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "status";
  status?: string;
  className?: string;
  dot?: boolean;
}

export function Badge({ children, variant = "default", status, className, dot }: BadgeProps) {
  const baseClass = "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-caption font-medium";

  if (variant === "status" && status) {
    return (
      <span className={cn(baseClass, getStatusColor(status), className)}>
        {dot && (
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
        )}
        {children}
      </span>
    );
  }

  return (
    <span
      className={cn(
        baseClass,
        "bg-surface-100 text-surface-600 dark:bg-surface-800 dark:text-surface-400",
        className
      )}
    >
      {children}
    </span>
  );
}
