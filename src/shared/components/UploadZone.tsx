import React, { useState } from 'react';
import { Upload, FilePlus, ShieldCheck, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/shared/components/ui/button';
import { useDocuments } from '@/shared/hooks/useDocuments';
import { PostUploadModal } from './PostUploadModal';
import { UploadingModal } from './UploadingModal';
import { toast } from 'sonner';
import { DocumentMetadata } from '@/types';

export const UploadZone: React.FC = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [uploadedDocs, setUploadedDocs] = useState<DocumentMetadata[]>([]);
    const [showPostModal, setShowPostModal] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const { uploadFiles, isUploading } = useDocuments();

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

    const validateFiles = async (inputFiles: File[]) => {
        const validFiles: File[] = [];

        for (const file of inputFiles) {
            // 1. Type check
            if (file.type !== 'application/pdf') {
                toast.error(`${file.name} is not a PDF.`);
                continue;
            }

            // 2. Size check
            if (file.size > MAX_FILE_SIZE) {
                toast.error(`${file.name} exceeds 100MB limit and was removed.`);
                continue;
            }

            // 3. Corruption/Integrity check (Check PDF signature)
            try {
                const buffer = await file.slice(0, 5).arrayBuffer();
                const signature = new TextDecoder().decode(buffer);
                if (signature !== '%PDF-') {
                    toast.error(`${file.name} appears to be corrupted and was removed.`);
                    continue;
                }
                validFiles.push(file);
            } catch (err) {
                toast.error(`Error reading ${file.name}. Removing for safety.`);
                console.error("Integrity check failed:", err);
            }
        }
        return validFiles;
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        const valid = await validateFiles(droppedFiles);

        if (valid.length > 0) {
            setFiles(prev => [...prev, ...valid]);
        }
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            toast.error("Please select files to upload.");
            return;
        }

        // We use a promise-based approach to get the response data
        try {
            setUploadProgress(0);
            uploadFiles({
                files,
                onProgress: (pct) => setUploadProgress(pct)
            }, {
                onSuccess: (data) => {
                    setFiles([]);
                    setUploadProgress(100);
                    if (data.documents && data.documents.length > 0) {
                        setUploadedDocs(data.documents);
                        setShowPostModal(true);
                    }
                },
                onError: () => {
                    setUploadProgress(0);
                }
            });
        } catch (err) {
            console.error("Upload error:", err);
            setUploadProgress(0);
        }
    };

    return (
        <section className="mb-6">
            <div className="flex flex-col lg:flex-row gap-6 h-80">
                {/* Left: Drop Zone (50%) */}
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={cn(
                        "relative group flex-1 flex flex-col items-center justify-center p-8 rounded-4xl border-2 border-dashed transition-all duration-500",
                        isDragging 
                            ? "border-blue-500 bg-blue-500/10 scale-[1.01] shadow-blue-500/20"
                            : "border-white/10 bg-white/2 hover:bg-white/4 hover:border-white/20"
                    )}
                >
                    {/* Visual Accent */}
                    <div className="absolute inset-0 bg-linear-to-tr from-blue-600/5 to-transparent rounded-4xl opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className={cn(
                        "w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 group-hover:bg-blue-600 group-hover:shadow-blue-500/40",
                        isDragging && "scale-110 bg-blue-600 animate-pulse"
                    )}>
                        {isUploading ? (
                            <Loader2 className="w-7 h-7 text-white animate-spin" />
                        ) : (
                                <Upload className={cn(
                                    "w-6 h-6 transition-colors duration-500",
                                    isDragging ? "text-white" : "text-blue-500 group-hover:text-white"
                                )} />
                        )}
                    </div>

                    <div className="text-center space-y-1 z-10">
                        <p className="text-lg font-bold text-white tracking-tight">
                            {isDragging ? "Drop them now!" : "Upload Documents"}
                        </p>
                        <p className="text-xs text-neutral-500 max-w-50 mx-auto leading-relaxed">
                            Drag and drop your PDFs here or browse your system.
                        </p>
                    </div>

                    <div className="mt-6 flex gap-3 z-10">
                        <label className="cursor-pointer">
                            <input
                                type="file"
                                multiple
                                accept=".pdf"
                                className="hidden"
                                onChange={async (e) => {
                                    const selected = Array.from(e.target.files || []);
                                    const valid = await validateFiles(selected);
                                    if (valid.length > 0) {
                                        setFiles(prev => [...prev, ...valid]);
                                    }
                                    e.target.value = ''; // Reset input to allow re-selecting same file
                                }}
                            />
                            <div className="h-10 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-bold flex items-center transition-all">
                                Browse
                            </div>
                        </label>
                        <Button
                            onClick={handleUpload}
                            disabled={isUploading || files.length === 0}
                            className="h-10 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xl shadow-blue-500/30 disabled:opacity-50 gap-2 transition-all active:scale-95 border-none"
                        >
                            {isUploading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <span>Upload {files.length > 0 ? `(${files.length})` : ""}</span>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Right: Upload Queue (50%) */}
                <div className={cn(
                    "flex-1 flex flex-col rounded-4xl border border-white/5 bg-white/2 backdrop-blur-xl overflow-hidden transition-all duration-500",
                    files.length === 0 ? "opacity-40 grayscale" : "opacity-100"
                )}>
                    {/* Queue Header */}
                    <div className="p-5 border-b border-white/5 flex items-center justify-between bg-white/2">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                Upload Queue {files.length > 0 && `(${files.length})`}
                            </h3>
                        </div>
                        {files.length > 0 && (
                            <button
                                onClick={() => setFiles([])}
                                className="text-[10px] font-bold text-gray-500 hover:text-red-400 transition-colors uppercase tracking-widest"
                            >
                                Clear All
                            </button>
                        )}
                    </div>

                    {/* Scrollable List */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                        {files.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center opacity-30 select-none">
                                <FilePlus className="w-8 h-8 text-gray-400 mb-2" />
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Queue is empty</p>
                            </div>
                        ) : (
                            files.map((file, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-white/3 border border-white/5 group hover:border-blue-500/30 transition-all duration-300 animate-in slide-in-from-right-4">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-9 h-9 rounded-xl bg-blue-600/10 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all">
                                            <FilePlus className="w-4 h-4 text-blue-500 group-hover:text-white" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[11px] font-bold text-white truncate max-w-35">{file.name}</p>
                                            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-tight">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFile(i)}
                                        className="p-2 rounded-lg text-gray-500 hover:bg-red-500/10 hover:text-red-500 transition-all"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer Info */}
                    {files.length > 0 && (
                        <div className="p-3 bg-blue-600/5 border-t border-white/5 text-center">
                            <p className="text-[9px] text-blue-400 font-bold uppercase tracking-widest">
                                Ready to process {files.length} document{files.length > 1 ? 's' : ''}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <PostUploadModal
                isOpen={showPostModal}
                onClose={() => setShowPostModal(false)}
                documents={uploadedDocs}
            />

            <UploadingModal
                isOpen={isUploading}
                progress={uploadProgress}
                fileCount={files.length}
            />
        </section>
    );
};
