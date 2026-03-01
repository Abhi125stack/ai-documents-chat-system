"use client";

import React from 'react';
import { 
  FileText, 
  MoreVertical, 
  Calendar, 
  Layers, 
  MessageSquare, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Star,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/ui/button";

interface Document {
  id: string;
  name: string;
  size: string;
  date: string;
  pages: number;
  status: 'processed' | 'processing' | 'error';
  isStarred?: boolean;
}

const mockDocs: Document[] = [
  { id: '1', name: 'Product_Whitepaper_v2.pdf', size: '2.4 MB', date: '2024-03-01', pages: 18, status: 'processed', isStarred: true },
  { id: '2', name: 'Quarterly_Research_Report.pdf', size: '15.1 MB', date: '2024-02-28', pages: 124, status: 'processed' },
  { id: '3', name: 'Legal_Contract_Draft.pdf', size: '0.8 MB', date: '2024-02-15', pages: 5, status: 'processing' },
  { id: '4', name: 'Investment_Strategy_2024.pdf', size: '4.2 MB', date: '2024-02-10', pages: 42, status: 'processed' },
];

export const DocumentList: React.FC = () => {
    return (
        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Recent Documents</h2>
                    <p className="text-sm text-gray-500">You have 12 total documents stored.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="text-xs h-9 border-white/10 px-4 bg-transparent hover:bg-white/5">
                        View All
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mockDocs.map((doc) => (
                    <div 
                        key={doc.id}
                        className="group relative flex flex-col p-5 rounded-3xl bg-white/3 border border-white/5 hover:border-blue-500/40 hover:bg-white/5 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] overflow-hidden"
                    >
                        {/* Status Badge */}
                        <div className="absolute top-4 right-4 animate-in fade-in duration-500">
                          {doc.status === 'processing' ? (
                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-[10px] font-bold text-blue-400 border border-blue-500/20 uppercase tracking-widest animate-pulse">
                              Processing
                            </span>
                          ) : (
                            <ShieldCheck className="w-4 h-4 text-blue-500/60" />
                          )}
                        </div>

                        {/* File Icon Accent */}
                        <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                            <FileText className="w-6 h-6 text-blue-500 group-hover:text-white transition-colors" />
                        </div>

                        <div className="space-y-1 mb-6">
                            <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 truncate transition-colors pr-8">
                                {doc.name}
                            </h3>
                            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                                <span>{doc.size}</span>
                                <span className="w-1 h-1 rounded-full bg-gray-700" />
                                <span>{doc.pages} Pages</span>
                            </div>
                        </div>

                        <div className="mt-auto space-y-4 pt-4 border-t border-white/5">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] text-gray-500 font-medium tracking-wide flex items-center gap-1.5">
                                    <Clock className="w-3 h-3" />
                                    {doc.date}
                                </span>
                                <div className="flex gap-2">
                                  <button className="p-1.5 rounded-lg text-gray-500 hover:text-yellow-400 hover:bg-yellow-400/10 transition-all">
                                    <Star className={cn("w-3.5 h-3.5", doc.isStarred && "fill-yellow-400 text-yellow-400")} />
                                  </button>
                                  <button className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all">
                                    <MoreVertical className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                            </div>
                            
                            <Button className="w-full h-10 rounded-xl bg-white/5 group-hover:bg-blue-600 transition-all duration-300 border border-white/5 group-hover:border-blue-500 group-hover:shadow-lg group-hover:shadow-blue-500/20 gap-2">
                              <span>Open Chat</span>
                              <MessageSquare className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* Hover Overlay Gradient */}
                        <div className="absolute inset-0 bg-linear-to-tr from-blue-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                ))}
            </div>
        </section>
    );
};
