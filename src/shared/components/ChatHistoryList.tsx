"use client";

import React from 'react';
import { 
  MessageSquare, 
  Clock,
  Loader2,
  Inbox,
  ChevronRight,
  FileText
} from "lucide-react";
import { useChatHistory } from '@/shared/hooks/useChatHistory';
import { PopulatedChatMetadata } from "@/types";
import Link from 'next/link';

export const ChatHistoryList: React.FC = () => {
  const { chats, isLoading } = useChatHistory();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-pulse">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Fetching your chat history...</p>
      </div>
    );
  }

  if (chats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-700">
        <div className="w-20 h-20 rounded-3xl bg-white/3 flex items-center justify-center mb-6 border border-white/5">
          <MessageSquare className="w-10 h-10 text-gray-600" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No conversations yet</h3>
        <p className="text-gray-400 max-w-sm mx-auto leading-relaxed">
          Start a new conversation by opening any of your documents and clicking the "Chat" button.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both pb-20">
      <div className="grid grid-cols-1 gap-4">
        {chats.map((chat: PopulatedChatMetadata) => {
          const isMultiDoc = chat.documentIds && chat.documentIds.length > 0;
          const href = isMultiDoc 
            ? `/doc-view/${chat.documentIds?.join(',')}` 
            : `/doc-view/${chat?.documentId?._id}`;

          return (
            <Link
              href={href}
              key={chat._id}
              className="group relative flex items-center p-5 rounded-3xl bg-[#111927]/40 border border-white/5 hover:border-indigo-500/40 hover:bg-[#1a2333]/80 transition-all duration-300 hover:shadow-indigo-500/10 cursor-pointer overflow-hidden"
            >
              {/* Left Icon Accent */}
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 flex items-center justify-center mr-5 transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:shadow-indigo-500/30">
                <MessageSquare className="w-6 h-6 text-indigo-500 group-hover:text-white transition-colors" />
              </div>

              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase font-black text-indigo-400 tracking-widest px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20">
                    {isMultiDoc ? "MULTI-SESSION" : "AI SESSION"}
                  </span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    {new Date(chat.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <h3 className="text-sm font-bold text-white group-hover:text-indigo-400 truncate transition-colors tracking-tight">
                  {isMultiDoc ? (
                    "Conversation on: Multiple docs"
                  ) : (
                    <>Conversation on: <span className="text-gray-300 font-medium">{chat?.documentId?.name || "Deleted Document"}</span></>
                  )}
                </h3>
                
                <p className="text-xs text-gray-500 truncate mt-1 italic">
                  {chat.messages.length > 0 ? `"${chat.messages[chat.messages.length - 1].content.substring(0, 100)}..."` : "No messages yet"}
                </p>
              </div>

              <div className="flex items-center gap-4">
                 <div className="hidden sm:flex flex-col items-end text-right">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {isMultiDoc ? "Collective Context" : "Source Asset"}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium truncate max-w-30">
                      {isMultiDoc ? `${chat.documentIds?.length} Assets` : (chat?.documentId?.name || "Unknown")}
                    </span>
                 </div>
                 <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-indigo-400 transition-all transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
