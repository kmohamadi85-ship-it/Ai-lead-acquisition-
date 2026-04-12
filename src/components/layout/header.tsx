"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Sun,
  Moon,
  Search,
  X,
} from "lucide-react";
import { cn, getRelativeTime } from "@/lib/utils";

export function Header() {
  const { theme, toggleTheme, notifications, loadNotifications, markRead, sidebarOpen } = useStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleOpenNotifications = () => {
    if (notifications.length === 0) loadNotifications();
    setShowNotifications(!showNotifications);
  };

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 h-16 border-b border-surface-200 bg-white/80 backdrop-blur-xl dark:border-surface-800 dark:bg-surface-950/80 flex items-center justify-between px-6 transition-all duration-300",
        sidebarOpen ? "left-[260px]" : "left-[72px]"
      )}
    >
      {/* Search */}
      <div className="flex items-center gap-3">
        <AnimatePresence mode="wait">
          {showSearch ? (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                <input
                  autoFocus
                  placeholder="Search leads, campaigns, agents..."
                  className="w-full pl-10 pr-10 py-2 rounded-xl border border-surface-200 bg-white text-body-sm dark:border-surface-700 dark:bg-surface-800 dark:text-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                />
                <button
                  onClick={() => setShowSearch(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => setShowSearch(true)} icon={<Search className="w-4 h-4" />}>
              Search
            </Button>
          )}
        </AnimatePresence>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-surface-500 hover:bg-surface-100 hover:text-surface-700 dark:hover:bg-surface-800 dark:hover:text-surface-300 transition-colors"
        >
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={handleOpenNotifications}
            className="relative p-2 rounded-lg text-surface-500 hover:bg-surface-100 hover:text-surface-700 dark:hover:bg-surface-800 dark:hover:text-surface-300 transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute right-0 top-12 w-96 rounded-2xl border border-surface-200 bg-white shadow-xl dark:border-surface-800 dark:bg-surface-900 overflow-hidden"
              >
                <div className="p-4 border-b border-surface-200 dark:border-surface-800">
                  <h3 className="font-semibold text-surface-900 dark:text-white">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-surface-400">No notifications</div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => markRead(notif.id)}
                        className={cn(
                          "p-4 border-b border-surface-100 dark:border-surface-800 cursor-pointer hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors",
                          !notif.read && "bg-brand-50/50 dark:bg-brand-900/10"
                        )}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-body-sm font-medium text-surface-900 dark:text-white">
                              {notif.title}
                            </p>
                            <p className="text-caption text-surface-500 mt-0.5">{notif.message}</p>
                          </div>
                          {!notif.read && (
                            <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0 mt-1.5" />
                          )}
                        </div>
                        <p className="text-caption text-surface-400 mt-1">
                          {getRelativeTime(notif.created_at)}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="w-px h-6 bg-surface-200 dark:bg-surface-700 mx-1" />

        <div className="flex items-center gap-3 pl-2">
          <Avatar name="Alex Morgan" size="sm" />
          <div className="hidden sm:block">
            <p className="text-body-sm font-medium text-surface-900 dark:text-white leading-tight">Alex Morgan</p>
            <p className="text-caption text-surface-500">Growth Plan</p>
          </div>
        </div>
      </div>
    </header>
  );
}
