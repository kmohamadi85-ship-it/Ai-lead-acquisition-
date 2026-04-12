"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Modal } from "@/components/ui/modal";
import { cn, getRelativeTime, getScoreColor } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Download,
  Plus,
  Mail,
  Share2,
  ExternalLink,
  MapPin,
  Building2,
  Calendar,
  Star,
  MoreVertical,
  ChevronDown,
} from "lucide-react";
import type { Lead, LeadStatus } from "@/types";

const statusFilters: { label: string; value: LeadStatus | "all" }[] = [
  { label: "All Leads", value: "all" },
  { label: "New", value: "new" },
  { label: "Researched", value: "researched" },
  { label: "Contacted", value: "contacted" },
  { label: "Replied", value: "replied" },
  { label: "Interested", value: "interested" },
  { label: "Meeting Booked", value: "meeting_booked" },
  { label: "Qualified", value: "qualified" },
];

export default function LeadsPage() {
  const { leads, loadLeads } = useStore();
  const [filter, setFilter] = useState<LeadStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [viewMode, setViewMode] = useState<"table" | "kanban">("table");

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  const filteredLeads = leads
    .filter((l) => filter === "all" || l.status === filter)
    .filter(
      (l) =>
        searchQuery === "" ||
        `${l.first_name} ${l.last_name} ${l.company_name} ${l.email}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );

  const kanbanStatuses: LeadStatus[] = ["new", "researched", "contacted", "replied", "interested", "meeting_booked", "qualified"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-heading-xl font-bold text-surface-900 dark:text-white">Leads</h1>
          <p className="text-body text-surface-500 mt-1">{leads.length} total leads in pipeline</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" icon={<Download className="w-4 h-4" />}>Export</Button>
          <Button size="sm" icon={<Plus className="w-4 h-4" />}>Add Lead</Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex-1 min-w-[240px] max-w-md">
          <Input
            placeholder="Search leads..."
            icon={<Search className="w-4 h-4" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {statusFilters.map((sf) => (
            <button
              key={sf.value}
              onClick={() => setFilter(sf.value)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-body-sm font-medium whitespace-nowrap transition-colors",
                filter === sf.value
                  ? "bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400"
                  : "text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800"
              )}
            >
              {sf.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 border border-surface-200 dark:border-surface-700 rounded-lg p-0.5">
          <button
            onClick={() => setViewMode("table")}
            className={cn("px-3 py-1 rounded text-caption font-medium", viewMode === "table" ? "bg-surface-100 dark:bg-surface-800 text-surface-900 dark:text-white" : "text-surface-500")}
          >
            Table
          </button>
          <button
            onClick={() => setViewMode("kanban")}
            className={cn("px-3 py-1 rounded text-caption font-medium", viewMode === "kanban" ? "bg-surface-100 dark:bg-surface-800 text-surface-900 dark:text-white" : "text-surface-500")}
          >
            Kanban
          </button>
        </div>
      </div>

      {/* Table View */}
      {viewMode === "table" && (
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-200 dark:border-surface-800">
                  <th className="text-left px-6 py-3 text-caption font-semibold text-surface-500 uppercase tracking-wider">Lead</th>
                  <th className="text-left px-6 py-3 text-caption font-semibold text-surface-500 uppercase tracking-wider">Company</th>
                  <th className="text-left px-6 py-3 text-caption font-semibold text-surface-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-3 text-caption font-semibold text-surface-500 uppercase tracking-wider">Score</th>
                  <th className="text-left px-6 py-3 text-caption font-semibold text-surface-500 uppercase tracking-wider">Source</th>
                  <th className="text-left px-6 py-3 text-caption font-semibold text-surface-500 uppercase tracking-wider">Last Contact</th>
                  <th className="text-right px-6 py-3 text-caption font-semibold text-surface-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead, i) => (
                  <motion.tr
                    key={lead.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => setSelectedLead(lead)}
                    className="border-b border-surface-100 dark:border-surface-800/50 hover:bg-surface-50 dark:hover:bg-surface-800/30 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={`${lead.first_name} ${lead.last_name}`} size="sm" />
                        <div>
                          <p className="text-body-sm font-medium text-surface-900 dark:text-white">
                            {lead.first_name} {lead.last_name}
                          </p>
                          <p className="text-caption text-surface-500">{lead.job_title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-body-sm text-surface-900 dark:text-white">{lead.company_name}</p>
                      <p className="text-caption text-surface-500">{lead.industry}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="status" status={lead.status} dot>
                        {lead.status.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn("text-body-sm font-bold", getScoreColor(lead.score))}>
                        {lead.score}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-body-sm text-surface-500">{lead.source}</td>
                    <td className="px-6 py-4 text-body-sm text-surface-500">
                      {lead.last_contacted_at ? getRelativeTime(lead.last_contacted_at) : "—"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                        <MoreVertical className="w-4 h-4 text-surface-400" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredLeads.length === 0 && (
            <div className="py-16 text-center text-surface-400">
              No leads match your filters.
            </div>
          )}
        </Card>
      )}

      {/* Kanban View */}
      {viewMode === "kanban" && (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {kanbanStatuses.map((status) => {
            const statusLeads = leads.filter((l) => l.status === status);
            return (
              <div key={status} className="flex-shrink-0 w-72">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="status" status={status} dot>
                      {status.replace("_", " ")}
                    </Badge>
                    <span className="text-caption text-surface-400">{statusLeads.length}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {statusLeads.map((lead) => (
                    <motion.div
                      key={lead.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="rounded-xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-3 cursor-pointer hover:shadow-card-hover transition-shadow"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar name={`${lead.first_name} ${lead.last_name}`} size="sm" />
                        <div className="min-w-0">
                          <p className="text-body-sm font-medium text-surface-900 dark:text-white truncate">
                            {lead.first_name} {lead.last_name}
                          </p>
                          <p className="text-caption text-surface-500 truncate">{lead.job_title}</p>
                        </div>
                        <span className={cn("text-caption font-bold ml-auto", getScoreColor(lead.score))}>
                          {lead.score}
                        </span>
                      </div>
                      <p className="text-caption text-surface-500">{lead.company_name}</p>
                      {lead.tags.length > 0 && (
                        <div className="flex gap-1 mt-2 flex-wrap">
                          {lead.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-surface-100 dark:bg-surface-800 text-surface-500">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lead Detail Modal */}
      <Modal
        open={!!selectedLead}
        onClose={() => setSelectedLead(null)}
        title={selectedLead ? `${selectedLead.first_name} ${selectedLead.last_name}` : ""}
        size="lg"
      >
        {selectedLead && (
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Avatar name={`${selectedLead.first_name} ${selectedLead.last_name}`} size="lg" />
              <div className="flex-1">
                <p className="text-body-lg font-semibold text-surface-900 dark:text-white">{selectedLead.job_title}</p>
                <p className="text-body text-surface-500">{selectedLead.company_name}</p>
                <div className="flex items-center gap-3 mt-2">
                  <Badge variant="status" status={selectedLead.status} dot>
                    {selectedLead.status.replace("_", " ")}
                  </Badge>
                  <span className={cn("text-body-sm font-bold", getScoreColor(selectedLead.score))}>
                    Score: {selectedLead.score}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-body-sm text-surface-600 dark:text-surface-400">
                <Mail className="w-4 h-4" /> {selectedLead.email}
              </div>
              {selectedLead.location && (
                <div className="flex items-center gap-2 text-body-sm text-surface-600 dark:text-surface-400">
                  <MapPin className="w-4 h-4" /> {selectedLead.location}
                </div>
              )}
              {selectedLead.company_size && (
                <div className="flex items-center gap-2 text-body-sm text-surface-600 dark:text-surface-400">
                  <Building2 className="w-4 h-4" /> {selectedLead.company_size} employees
                </div>
              )}
              {selectedLead.meeting_scheduled_at && (
                <div className="flex items-center gap-2 text-body-sm text-green-600 dark:text-green-400">
                  <Calendar className="w-4 h-4" /> Meeting: {new Date(selectedLead.meeting_scheduled_at).toLocaleDateString()}
                </div>
              )}
            </div>

            {selectedLead.pain_points && selectedLead.pain_points.length > 0 && (
              <div>
                <h4 className="text-body font-semibold text-surface-900 dark:text-white mb-2">Pain Points</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedLead.pain_points.map((pp) => (
                    <Badge key={pp}>{pp}</Badge>
                  ))}
                </div>
              </div>
            )}

            {selectedLead.research_notes && (
              <div>
                <h4 className="text-body font-semibold text-surface-900 dark:text-white mb-2">Research Notes</h4>
                <p className="text-body-sm text-surface-600 dark:text-surface-400 leading-relaxed">
                  {selectedLead.research_notes}
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <Button size="sm" icon={<Mail className="w-4 h-4" />}>Send Email</Button>
              <Button variant="outline" size="sm" icon={<Share2 className="w-4 h-4" />}>LinkedIn</Button>
              <Button variant="outline" size="sm" icon={<Calendar className="w-4 h-4" />}>Book Meeting</Button>
              {selectedLead.company_website && (
                <Button variant="ghost" size="sm" icon={<ExternalLink className="w-4 h-4" />}>Website</Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
