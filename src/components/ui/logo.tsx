"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

export function Logo({ size = "md", showText = true, className }: LogoProps) {
  const sizes = {
    sm: "w-9 h-9",
    md: "w-11 h-11",
    lg: "w-14 h-14",
    xl: "w-18 h-18",
  };

  const textSizes = {
    sm: "text-body",
    md: "text-heading",
    lg: "text-heading-lg",
    xl: "text-heading-xl",
  };

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className={cn("relative shrink-0", sizes[size])}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Background shape - rounded hexagon */}
          <rect width="40" height="40" rx="12" fill="url(#logoGradient)" />

          {/* Abstract "L" + "F" mark with circuit/AI motif */}
          {/* Main bolt shape */}
          <path
            d="M22 8L12 22h7l-3 10 12-14h-7.5L22 8z"
            fill="white"
            fillOpacity="0.95"
          />

          {/* Orbiting dots - AI/network feel */}
          <circle cx="30" cy="12" r="2" fill="white" fillOpacity="0.6" />
          <circle cx="10" cy="30" r="1.5" fill="white" fillOpacity="0.4" />
          <circle cx="33" cy="26" r="1.5" fill="white" fillOpacity="0.5" />

          {/* Connecting lines */}
          <line
            x1="28"
            y1="13"
            x2="24"
            y2="16"
            stroke="white"
            strokeOpacity="0.3"
            strokeWidth="0.8"
          />
          <line
            x1="31"
            y1="25"
            x2="27"
            y2="22"
            stroke="white"
            strokeOpacity="0.3"
            strokeWidth="0.8"
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient
              id="logoGradient"
              x1="0"
              y1="0"
              x2="40"
              y2="40"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#6366F1" />
              <stop offset="0.5" stopColor="#4F46E5" />
              <stop offset="1" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
        </svg>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 opacity-20 blur-md -z-10" />
      </div>

      {showText && (
        <span className={cn("font-bold text-surface-900 dark:text-white tracking-tight", textSizes[size])}>
          Lead<span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Forge</span>
        </span>
      )}
    </div>
  );
}

export function LogoIcon({ size = "md", className }: { size?: "sm" | "md" | "lg" | "xl"; className?: string }) {
  return <Logo size={size} showText={false} className={className} />;
}
