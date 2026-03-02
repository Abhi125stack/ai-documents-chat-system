"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] bg-black p-10 text-center relative overflow-hidden">
        {/* Abstract Background Effects */}
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[160px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-80 h-80 bg-red-800/5 rounded-full blur-[140px]" />

        <div className="relative z-10 p-12 bg-white/2 border border-white/5 rounded-[4rem] backdrop-blur-3xl shadow-[0_64px_256px_-32px_rgba(239,68,68,0.2)] max-w-2xl transform hover:scale-[1.01] transition-transform duration-700">
            <div className="inline-flex items-center justify-center w-24 h-24 mb-10 bg-red-500/10 border border-red-500/20 rounded-[2.5rem] relative group">
                <div className="absolute inset-0 bg-red-500/20 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity rounded-[2.5rem]" />
                <AlertCircle className="w-12 h-12 text-red-500 relative z-10" />
            </div>

            <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-6 leading-none [text-shadow:0_10px_30px_rgba(0,0,0,0.5)]">
                Neural Link Failure
            </h1>
            
            <p className="text-gray-400 text-lg font-medium leading-[1.6] mb-12 max-w-md mx-auto">
                The application encountered an unrecoverable exception. The system has been paused for safety.
                <span className="block mt-6 px-5 py-3 bg-red-500/5 border border-red-500/10 rounded-2xl font-mono text-xs text-red-400 whitespace-pre-wrap overflow-x-auto select-all shadow-inner">
                    LOG_ID: {error.digest || 'UNRESOLVED_ID'} <br/>
                    EVENT: {error.message || 'RUNTIME_FAULT'}
                </span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button
                    onClick={() => reset()}
                    className="w-full sm:w-auto h-16 px-10 bg-linear-to-r from-red-600 to-red-700 hover:from-white hover:to-white hover:text-red-600 text-white font-black text-xs uppercase tracking-widest rounded-3xl transition-all duration-500 shadow-2xl shadow-red-600/30 flex items-center justify-center gap-3 active:scale-95 group"
                >
                    <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
                    Attempt Re-Sync
                </button>
                
                <Link
                    href="/dashboard"
                    className="w-full sm:w-auto h-16 px-10 bg-[#111] hover:bg-white/5 border border-white/10 text-gray-500 hover:text-white font-black text-xs uppercase tracking-widest rounded-3xl transition-all duration-500 flex items-center justify-center gap-3 active:scale-95 shadow-xl"
                >
                    <Home className="w-4 h-4" />
                    Emergency Exit
                </Link>
            </div>
        </div>

        {/* Neural Grid Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[40px_40px]" />
    </div>
  );
}
