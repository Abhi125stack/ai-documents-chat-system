"use client";

import { DashboardHeader } from '@/shared/components/DashboardHeader';
import { useAuthGuard } from '@/shared/hooks/useAuthGuard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useAuthGuard(true);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a1120] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0a1120] text-slate-100 overflow-x-hidden font-sans">
      {/* Background Glows (consistent with Auth) */}
      <div className="fixed top-0 left-1/4 w-125 h-125 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none transition-all duration-1000 z-0" />
      <div className="fixed bottom-0 right-1/4 w-100 h-100 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none transition-all duration-1000 z-0" />

      {/* Main Header (Now includes navigation) */}
      <DashboardHeader />

      {/* Dynamic Page Content */}
      <main className="relative flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
          {children}
        </div>
      </main>

      {/* Footer Accent */}
      <footer className="h-1 bg-linear-to-r from-transparent via-blue-500/20 to-transparent blur-sm" />
    </div>
  );
}
