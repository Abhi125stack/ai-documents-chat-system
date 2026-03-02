"use client";

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ErrorBoundary } from '@/shared/components/ui/ErrorBoundary';
import { WelcomeHero } from '@/shared/components/WelcomeHero';

const UploadZone = dynamic(() => import('@/shared/components/UploadZone').then(mod => mod.UploadZone), {
  loading: () => <div className="h-80 w-full animate-pulse bg-white/5 rounded-4xl border border-white/5 shadow-2xl" />,
  ssr: false
});

const DocumentList = dynamic(() => import('@/shared/components/DocumentList').then(mod => mod.DocumentList), {
  loading: () => (
    <div className="flex flex-col items-center justify-center py-20 animate-pulse">
      <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
      <p className="text-gray-500 font-medium">Initializing Document Repository...</p>
    </div>
  ),
  ssr: false
});

export default function DashboardPage() {
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Primary Actions */}
      <ErrorBoundary>
        <UploadZone />
      </ErrorBoundary>

      {/* Welcome Hero (Server Component) */}
      <WelcomeHero />

    </div>
  );
}

