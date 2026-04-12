import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LeadForge AI - AI-Powered Lead Acquisition Platform",
  description: "Your AI sales team that autonomously finds prospects, crafts personalized outreach, and books qualified meetings on your calendar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-white dark:bg-surface-950 text-surface-900 dark:text-surface-100 font-sans">
        {children}
      </body>
    </html>
  );
}
