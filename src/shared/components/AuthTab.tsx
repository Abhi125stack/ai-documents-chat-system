"use client";

import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function AuthTabs() {
    const router = useRouter();
    const pathname = usePathname();

    const current = pathname.includes("signup") ? "signup" : "login";

    return (
        <Tabs value={current} className="mb-10 w-fit rounded-3xl bg-black/50">
            <TabsList>
                <TabsTrigger 
                    value="signup" 
                    onClick={() => router.push("/signup")}
                    className={cn(
                        "rounded-full px-8 py-2 text-[15px] font-medium transition-all duration-200 cursor-pointer",
                        current === "signup" 
                            ? "bg-[#131B2C] text-white shadow-lg ring-1 ring-white/10" 
                            : "text-neutral-500 hover:text-neutral-400"
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
                            ? "bg-[#131B2C] text-white shadow-lg ring-1 ring-white/10" 
                            : "text-neutral-500 hover:text-neutral-400"
                    )}
                >
                    Sign in
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
}