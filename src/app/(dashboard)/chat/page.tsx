"use client";

import { ChatHistoryList } from '@/shared/components/ChatHistoryList';
import { Search, MessageSquare } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';

export default function ChatHistoryPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2 flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-indigo-500" />
            Chat History
          </h1>
          <p className="text-gray-400 font-medium text-sm">
            Review your past conversations and insights from your documents.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-[#0d1525]/10 p-4 sm:p-8 rounded-4xl border border-white/5 backdrop-blur-3xl h-[72vh] overflow-y-auto custom-scrollbar">
        <ChatHistoryList />
      </div>
    </div>
  );
}
