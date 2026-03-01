"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Bell, 
  User, 
  FileText, 
  LayoutDashboard, 
  MessageSquare,
  Search,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { useAuth } from '@/shared/hooks/useAuth';

const navTabs = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Documents", href: "/documents", icon: FileText },
  { label: "Chat History", href: "/chat", icon: MessageSquare },
];

export const DashboardHeader: React.FC = () => {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-20 px-8 bg-[#0a1120]/60 backdrop-blur-xl border-b border-white/5 shadow-2xl">
      
      {/* Left: Brand Logo */}
      <Link href="/" className="flex items-center gap-2 group cursor-pointer">
        <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-600 flex items-center justify-center p-2 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
          <FileText className="text-white w-full h-full" />
        </div>
        <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400 hidden sm:block">
          DocsChat.ai
        </span>
      </Link>

      {/* Center: Navigation Tabs */}
      <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center p-1 rounded-2xl bg-white/5 border border-white/5">
        {navTabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "relative flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                isActive 
                  ? "text-white bg-white/10 shadow-lg" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <tab.icon className={cn("w-4 h-4", isActive ? "text-blue-400" : "text-gray-500")} />
              {tab.label}
              {isActive && (
                <div className="absolute inset-x-0 -bottom-1 h-px bg-linear-to-r from-transparent via-blue-500 to-transparent opacity-50" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-4">
        {/* Profile Dropdown Container */}
        <div className="relative group pl-4 border-l border-white/10 py-2">
          <div className="flex items-center gap-3 cursor-pointer group-hover:opacity-80 transition-opacity">
            <div className="text-right hidden sm:flex flex-col items-end">
              <span className="text-sm font-semibold text-white tracking-tight">
                {user?.name || "User"}
              </span>
              <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-blue-400 font-bold opacity-70">
                <span>Account</span>
                <ChevronDown className="w-2.5 h-2.5 group-hover:rotate-180 transition-transform duration-300" />
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-gray-700 to-gray-600 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/20 transition-all duration-300">
              <User className="text-white w-6 h-6" />
            </div>
          </div>

          {/* Hover Menu */}
          <div className="absolute top-full right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out z-50">
            <div className="p-1.5 rounded-2xl bg-[#111927]/90 backdrop-blur-2xl border border-white/5 shadow-2XL shadow-black/40">
              <div className="px-3 py-2 border-b border-white/5 mb-1">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Signed in as</p>
                <p className="text-xs text-white font-medium truncate">{user?.email || "user@example.com"}</p>
              </div>
              
              <button 
                onClick={logout}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 group/btn"
              >
                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center group-hover/btn:bg-red-500/20 transition-colors">
                  <LogOut className="w-4 h-4 text-red-400" />
                </div>
                <span>Log out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

