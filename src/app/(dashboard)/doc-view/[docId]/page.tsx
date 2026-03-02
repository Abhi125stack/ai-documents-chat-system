"use client";

import React, { use, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Loader2, Info, Activity, Cpu } from "lucide-react";
import Link from "next/link";
import { DocumentMetadata } from "@/types";
import { ErrorBoundary } from "@/shared/components/ui/ErrorBoundary";

// Lazy-loaded components with custom skeletal fallbacks
const PDFViewer = dynamic(() => import("@/shared/components/PDFViewer").then(mod => mod.PDFViewer), {
    loading: () => (
        <div className="h-full w-full bg-[#111] animate-pulse rounded-[2.5rem] border border-white/5 flex flex-col items-center justify-center gap-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_100%)] animate-pulse" />
            <div className="w-24 h-24 bg-blue-500/10 rounded-full border border-blue-500/20 flex items-center justify-center relative shadow-[0_0_64px_rgba(59,130,246,0.3)]">
                <div className="absolute inset-0 bg-blue-500/30 blur-3xl animate-pulse rounded-full" />
                <Activity className="w-10 h-10 text-blue-500 animate-spin-slow" />
            </div>
            <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">Module Activation</span>
                <span className="text-white/40 text-xs font-mono">Initializing PDF Engine...</span>
            </div>
        </div>
    ),
    ssr: false
});

const ChatInterface = dynamic(() => import("@/shared/components/ChatInterface").then(mod => mod.ChatInterface), {
    loading: () => (
        <div className="h-full w-full bg-[#111] animate-pulse rounded-[2.5rem] border border-white/5 flex flex-col p-8 gap-10">
            <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5" />
                <div className="flex-1 space-y-2">
                    <div className="w-24 h-3 bg-white/5 rounded-full" />
                    <div className="w-16 h-2 bg-white/5 rounded-full" />
                </div>
            </div>
            <div className="flex-1 flex flex-col gap-6">
                <div className="self-start w-48 h-12 bg-white/5 rounded-2xl rounded-tl-none" />
                <div className="self-end w-32 h-10 bg-blue-500/10 rounded-2xl rounded-tr-none" />
                <div className="self-start w-56 h-16 bg-white/5 rounded-2xl rounded-tl-none" />
            </div>
            <div className="w-full h-16 bg-white/5 rounded-3xl" />
        </div>
    ),
    ssr: false
});

interface DocumentResponse {
    success: boolean;
    message: string;
    document?: DocumentMetadata;
    documents?: DocumentMetadata[];
}

export default function DocumentViewPage({ params }: { params: Promise<{ docId: string }> }) {
    const { docId: rawDocId } = use(params);
    const decodedDocId = decodeURIComponent(rawDocId);
    const idArray = decodedDocId.split(/,|%2C/).filter(id => id.trim() !== "");
    const [activeDocIndex, setActiveDocIndex] = React.useState(0);
    const analyzeRef = React.useRef<{ analyze: (doc: any) => void }>(null);

    const { data, isLoading, error } = useQuery<DocumentResponse>({
        queryKey: ["documents", decodedDocId],
        queryFn: async () => {
            const res = await api.get(`/documents/${decodedDocId}`);
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] gap-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_100%)]" />
                <div className="relative group">
                    <div className="absolute inset-0 bg-blue-500/20 blur-[100px] animate-pulse rounded-full" />
                    <div className="w-32 h-32 rounded-[2.5rem] bg-[#111] border border-white/10 flex items-center justify-center relative overflow-hidden shadow-2xl">
                         <div className="absolute inset-0 bg-linear-to-tr from-blue-600/10 to-transparent" />
                         <Cpu className="w-12 h-12 text-blue-500 animate-bounce" />
                    </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                    <h3 className="text-xl font-black text-white uppercase tracking-[0.2em] animate-pulse">Neural Linkage</h3>
                    <p className="text-gray-500 text-xs font-mono animate-pulse">Retrieving Asset Cluster: {decodedDocId.substring(0, 12)}...</p>
                </div>
            </div>
        );
    }

    if (error || !data?.success) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6 text-center max-w-md mx-auto p-4">
                <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mb-2">
                    <Info className="w-8 h-8 text-red-500" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
                    <p className="text-gray-400">We couldn't retrieve the document. It might have been deleted or the link is invalid.</p>
                </div>
                <Link
                    href="/dashboard"
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white font-medium transition-all"
                >
                    Back to Dashboard
                </Link>
            </div>
        );
    }

    const docs = data.documents || (data.document ? [data.document] : []);
    if (docs.length === 0) {
        return (
             <div className="flex flex-col items-center justify-center min-h-screen text-white bg-[#050505]">
                <p className="text-xs font-black uppercase tracking-widest text-gray-500">Asset Cluster Empty</p>
             </div>
        );
    }

    const currentDoc = docs[activeDocIndex] || docs[0];
    const fileUrl = `/api/documents/${currentDoc._id}/file`;

    return (
        <div className="w-[95%] mx-auto h-screen flex flex-col p-4 gap-4 overflow-hidden relative">
            {/* Header for multi-doc navigation */}
            {docs.length > 1 && (
                <div className="flex items-center gap-4 bg-[#111]/80 backdrop-blur-xl p-3 rounded-2xl border border-white/5 overflow-x-auto no-scrollbar shadow-2xl relative z-20">
                    {docs.map((doc, idx) => (
                        <button
                            key={doc._id}
                            onClick={() => setActiveDocIndex(idx)}
                            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap uppercase tracking-widest border ${
                                activeDocIndex === idx
                                ? "bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/20 scale-105"
                                : "bg-white/2 border-white/5 text-gray-500 hover:text-white hover:bg-white/5"
                            }`}
                        >
                            {doc.name}
                        </button>
                    ))}
                </div>
            )}

            {/* Main Layout Grid */}
            <div className="flex-1 flex gap-4 min-h-0">
                {/* Document Viewer (70%) */}
                <div className="w-[70%] flex flex-col h-full overflow-hidden">
                    <ErrorBoundary>
                        {currentDoc.status === 'processed' || currentDoc.status === 'error' ? (
                            <PDFViewer 
                                fileUrl={fileUrl} 
                                docName={currentDoc.name} 
                                docDetails={currentDoc}
                                onAnalyze={(info) => analyzeRef.current?.analyze(info)} 
                            />
                        ) : (
                            <div className="h-full bg-white/2 border border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center gap-6 text-center p-8 backdrop-blur-3xl relative overflow-hidden">
                                <div className="absolute inset-0 bg-linear-to-br from-blue-600/5 to-transparent" />
                                <div className="relative">
                                    <div className="absolute inset-0 bg-blue-500/20 blur-3xl animate-pulse rounded-full" />
                                    <Loader2 className="w-16 h-16 text-blue-500 animate-spin relative z-10" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Neural Synthesis...</h3>
                                    <p className="text-gray-500 font-medium text-sm tracking-tight">Indexing "{currentDoc.name}" into Collective Memory.</p>
                                </div>
                            </div>
                        )}
                    </ErrorBoundary>
                </div>

                <div className="w-[30%] flex flex-col h-full overflow-hidden">
                    <ErrorBoundary>
                        <ChatInterface 
                            docIds={idArray} 
                            onAnalyzeTrigger={(ref) => { (analyzeRef as any).current = ref; }} 
                        />
                    </ErrorBoundary>
                </div>
            </div>

            <style jsx global>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
