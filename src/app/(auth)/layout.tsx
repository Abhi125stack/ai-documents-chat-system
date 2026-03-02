"use client";

import { useAuthGuard } from "@/shared/hooks/useAuthGuard";
import LottieBackground from "@/shared/components/LottieBackground";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isLoading } = useAuthGuard(false);

    if (isLoading) {
        return (
            <div className="min-h-screen dark bg-background flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="relative min-h-screen dark flex items-center justify-center overflow-hidden bg-[#0a1120] text-white">
            {/* Lottie Background */}
            <LottieBackground />

            {/* Glass Card Container */}
            <div className="relative z-10 w-full max-w-md px-6">
              {children}
            </div>
        </div>
    );
}