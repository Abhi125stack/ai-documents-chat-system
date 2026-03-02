"use client";

import React, { useState } from 'react';
import { DocumentList } from '@/shared/components/DocumentList';
import { Search, Filter, Plus } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { useDebounce } from '@/shared/hooks/useDebounce';

export default function DocumentsPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">
            My Documents
          </h1>
          <p className="text-gray-400 font-medium text-sm">
            Manage, search, and chat with all your uploaded PDF files.
          </p>
        </div>
        
        <div className="flex-1 max-w-md w-full">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
            <Input 
              placeholder="Search documents by name..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 pl-12 rounded-2xl bg-white/5 border-white/10 focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-[#0d1525]/10 p-4 sm:p-8 rounded-4xl border border-white/5 backdrop-blur-3xl h-[72vh] overflow-y-auto custom-scrollbar">
        <DocumentList search={debouncedSearch} />
      </div>
    </div>
  );
}
