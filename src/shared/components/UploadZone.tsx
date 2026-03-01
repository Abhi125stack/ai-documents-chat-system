"use client";

import React, { useState } from 'react';
import { Upload, FilePlus, ShieldCheck, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/shared/components/ui/button';

export const UploadZone: React.FC = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState<File[]>([]);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFiles = Array.from(e.dataTransfer.files).filter(f => f.type === 'application/pdf');
        setFiles(prev => [...prev, ...droppedFiles]);
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 tracking-tight flex items-center gap-2">
                <FilePlus className="text-blue-500 w-6 h-6" />
                Upload New Documents
            </h2>

            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                    "relative group h-64 flex flex-col items-center justify-center p-8 rounded-4xl border-2 border-dashed transition-all duration-500",
                    isDragging 
                        ? "border-blue-500 bg-blue-500/10 scale-[1.01] shadow-[0_0_40px_rgba(59,130,246,0.2)]" 
                        : "border-white/10 bg-white/2 hover:bg-white/4 hover:border-white/20"
                )}
            >
                {/* Visual Accent */}
                <div className="absolute inset-0 bg-linear-to-tr from-blue-600/5 to-transparent rounded-4xl opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Animated Upload Icon */}
                <div className={cn(
                    "w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 group-hover:bg-blue-600 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]",
                    isDragging && "scale-110 bg-blue-600 animate-pulse"
                )}>
                    <Upload className={cn(
                        "w-7 h-7 transition-colors duration-500",
                        isDragging ? "text-white" : "text-blue-500 group-hover:text-white"
                    )} />
                </div>

                <div className="text-center space-y-2 z-10">
                    <p className="text-lg font-semibold text-white">
                        {isDragging ? "Release to upload" : "Drag and drop your PDFs here"}
                    </p>
                    <p className="text-sm text-gray-500">
                        Max file size: 50MB. Support for scanned & digital PDFs.
                    </p>
                </div>

                <div className="mt-6 flex gap-3 z-10">
                    <Button variant="outline" className="border-white/10 px-6 font-medium bg-transparent hover:bg-white/5">
                        Browse Files
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-500 px-6 font-semibold shadow-lg shadow-blue-500/30">
                        Process Batch
                    </Button>
                </div>
            </div>

            {/* List of pending uploads (if any) */}
            {files.length > 0 && (
                <div className="mt-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-300">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest pl-1">
                        Selected Files ({files.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {files.map((file, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/3 border border-white/5 group hover:border-blue-500/30 transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center">
                                        <ShieldCheck className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white truncate max-w-50">{file.name}</p>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-wide">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFile(i)}
                                    className="p-1.5 rounded-lg text-gray-500 hover:bg-red-500/10 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};
