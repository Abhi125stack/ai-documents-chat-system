"use client";

import { useAuthGuard } from "@/shared/hooks/useAuthGuard";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isLoading } = useAuthGuard(false);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0a1120] flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0f1f]">

            {/* Bottom Animated Blue Gradient Glow */}
            <div className="absolute bottom-0 left-0 w-full h-[60%] bg-linear-to-t from-blue-600/70 via-blue-500/40 to-transparent blur-3xl opacity-70" />
            {/* Soft Radial Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(59,130,246,0.15),transparent_60%)]" />

            {/* Glass Card Container */}
            <div className="relative z-10 w-full max-w-md px-6">
              {children}
            </div>
        </div>
    );
}