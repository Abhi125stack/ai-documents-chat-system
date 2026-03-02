"use client";

import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function AuthTabs() {
    const router = useRouter();
    const pathname = usePathname();

    const current = pathname.includes("signup") ? "signup" : "login";

    return (
        <Tabs value={current} className="mb-10 w-fit rounded-3xl bg-[#111927]/50 backdrop-blur-md border border-slate-800/50">
            <TabsList>
                <TabsTrigger 
                    value="signup" 
                    onClick={() => router.push("/signup")}
                    className={cn(
                        "rounded-full px-8 py-2 text-[15px] font-medium transition-all duration-200 cursor-pointer",
                        current === "signup" 
                            ? "bg-[#0a1120] text-white shadow-lg ring-1 ring-slate-700"
                            : "text-slate-400 hover:text-slate-200"
                    )}
                >
                    Sign up
                </TabsTrigger>
                <TabsTrigger 
                    value="login" 
                    onClick={() => router.push("/login")}
                    className={cn(
                        "rounded-full px-8 py-2 text-[15px] font-medium transition-all duration-200 cursor-pointer",
                        current === "login" 
                            ? "bg-[#0a1120] text-white shadow-lg ring-1 ring-slate-700"
                            : "text-slate-400 hover:text-slate-200"
                    )}
                >
                    Sign in
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
}