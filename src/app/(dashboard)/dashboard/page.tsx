"use client";

import { UploadZone } from '@/shared/components/UploadZone';
import { DocumentList } from '@/shared/components/DocumentList';
import { Sparkles, Layers, Search, PlusCircle, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Primary Actions */}
      <UploadZone />

      {/* Welcome Hero */}
      <div className="relative overflow-hidden p-10 rounded-4xl bg-[#0d1525]/20 border border-white/5 backdrop-blur-3xl shadow-2xl">
        {/* Decorative Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/30 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-600/20 blur-[60px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-blue-500/10 text-[10px] font-bold text-blue-400 border border-blue-500/20 uppercase tracking-[0.2em]">
              <Sparkles className="w-3.5 h-3.5" />
              New Beta: AI Summary Engine
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
              Unlock the secrets <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-indigo-600 to-purple-400">
                hidden in your documents.
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-lg leading-relaxed font-medium">
              Simply upload your PDF, and our AI will analyze, summarize, and answer any questions you have in seconds.
              No more manual scrolling through hundreds of pages.
            </p>

          </div>

          {/* Quick Actions Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Activity, label: "System Status", value: "Online", color: "text-emerald-400", bg: "bg-emerald-500/10" },
              { icon: Search, label: "Search Index", value: "98.2%", color: "text-blue-400", bg: "bg-blue-500/10" },
              { icon: Layers, label: "OCR Accuracy", value: "99.9%", color: "text-indigo-400", bg: "bg-indigo-500/10" },
              { icon: PlusCircle, label: "Cloud Upload", value: "Enabled", color: "text-purple-400", bg: "bg-purple-500/10" },
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-4xl bg-white/3 border border-white/5 hover:border-white/10 transition-all group overflow-hidden relative">
                <div className={cn("inline-flex p-3 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-500", stat.bg)}>
                  <stat.icon className={cn("w-6 h-6", stat.color)} />
                </div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">{stat.label}</div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>

                {/* Subtle hover reveal pulse */}
                <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-blue-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Document Listing */}
      <DocumentList />
    </div>
  );
}

