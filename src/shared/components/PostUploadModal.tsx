"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, FileText, ArrowRight, Layers, MousePointer2 } from "lucide-react";
import { DocumentMetadata } from "@/types";
import { useRouter } from "next/navigation";

interface PostUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    documents: DocumentMetadata[];
}

export const PostUploadModal: React.FC<PostUploadModalProps> = ({ isOpen, onClose, documents }) => {
    const router = useRouter();
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const toggleSelect = (id: string) => {
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleView = () => {
        if (documents.length === 1) {
            router.push(`/doc-view/${documents[0]._id}`);
            onClose();
            return;
        }

        if (selectedIds.length === 0) return;
        
        const combinedIds = selectedIds.join(",");
        router.push(`/doc-view/${combinedIds}`);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />

                {/* Modal */}
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-lg bg-[#111] border border-white/10 rounded-[2.5rem] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.8)] overflow-hidden"
                >
                    {/* Header */}
                    <div className="px-8 py-6 border-b border-white/5 bg-white/2 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
                                <Check className="w-6 h-6 text-green-500" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white tracking-tight">Upload Successful</h3>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">
                                    {documents.length} Document{documents.length > 1 ? 's' : ''} Ready
                                </p>
                            </div>
                        </div>
                        <button 
                            onClick={onClose}
                            className="p-2 hover:bg-white/5 rounded-xl text-gray-500 hover:text-white transition-all"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-8 max-h-[50vh] overflow-y-auto custom-scrollbar space-y-3">
                        {documents.length > 1 && (
                            <div className="flex items-center gap-2 mb-4 px-2">
                                <MousePointer2 className="w-3.5 h-3.5 text-blue-400" />
                                <span className="text-[10px] font-black text-blue-400/80 uppercase tracking-[0.2em]">Select documents to view together</span>
                            </div>
                        )}
                        
                        {documents.map((doc) => (
                            <div 
                                key={doc._id}
                                onClick={() => documents.length > 1 && toggleSelect(doc._id)}
                                className={`flex items-center justify-between p-4 rounded-3xl border transition-all duration-300 group ${
                                    documents.length === 1 
                                        ? "bg-white/5 border-white/10" 
                                        : selectedIds.includes(doc._id)
                                            ? "bg-blue-600/10 border-blue-500/50 shadow-lg shadow-blue-500/10"
                                            : "bg-white/2 border-white/5 hover:border-white/20 cursor-pointer"
                                }`}
                            >
                                <div className="flex items-center gap-4 min-w-0">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                                        selectedIds.includes(doc._id) ? "bg-blue-600" : "bg-white/5"
                                    }`}>
                                        <FileText className={`w-5 h-5 ${
                                            selectedIds.includes(doc._id) ? "text-white" : "text-gray-400"
                                        }`} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-bold text-white truncate">{doc.name}</p>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">
                                            {(doc.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                </div>
                                
                                {documents.length > 1 && (
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                        selectedIds.includes(doc._id) 
                                            ? "bg-blue-600 border-blue-600 scale-110 shadow-lg shadow-blue-500/30" 
                                            : "border-white/10 group-hover:border-white/30"
                                    }`}>
                                        {selectedIds.includes(doc._id) && <Check className="w-3.5 h-3.5 text-white" />}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="p-8 bg-white/2 border-t border-white/5">
                        <div className="flex items-center justify-between gap-6">
                            <button 
                                onClick={onClose}
                                className="text-xs font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-colors"
                            >
                                Skip for now
                            </button>
                            <button 
                                onClick={handleView}
                                disabled={documents.length > 1 && selectedIds.length === 0}
                                className="flex-1 h-14 bg-blue-600 hover:bg-blue-500 disabled:opacity-30 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-3 group"
                            >
                                {documents.length === 1 ? (
                                    <>
                                        VIEW DOCUMENT <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                ) : (
                                    <>
                                        VIEW SELECTED ({selectedIds.length}) <Layers className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </motion.div>
                
                <style jsx>{`
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 4px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: transparent;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: rgba(255, 255, 255, 0.05);
                        border-radius: 10px;
                    }
                `}</style>
            </div>
        </AnimatePresence>
    );
};
