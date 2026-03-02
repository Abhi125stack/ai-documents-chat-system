"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-100 p-8 text-center bg-[#0a0a0a] rounded-[2.5rem] border border-white/5 shadow-2xl">
          <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-3xl flex items-center justify-center mb-6 relative">
            <div className="absolute inset-0 bg-red-500/5 animate-pulse rounded-3xl" />
            <AlertTriangle className="w-10 h-10 text-red-500 relative z-10" />
          </div>
          
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-3">
            Interface Crash Detected
          </h2>
          
          <p className="text-gray-400 max-w-sm mx-auto mb-8 text-sm leading-relaxed">
            The neural link encountered an unexpected exception while rendering this component. {this.state.error?.message && (
              <span className="block mt-2 font-mono text-[10px] text-red-400 capitalize bg-red-400/5 py-1 px-3 rounded-lg border border-red-400/10">
                {this.state.error.message}
              </span>
            )}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black rounded-2xl transition-all shadow-xl shadow-blue-600/20 flex items-center gap-2 uppercase tracking-widest active:scale-95"
            >
              <RefreshCcw className="w-4 h-4" /> Reset Module
            </button>
            
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white text-xs font-black rounded-2xl transition-all uppercase tracking-widest active:scale-95 flex items-center gap-2"
            >
              <Home className="w-4 h-4" /> Return Safe
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
