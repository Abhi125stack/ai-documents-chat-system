"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useAuth } from "@/shared/hooks/useAuth";
import { Loader2 } from "lucide-react";

export default function LoginForm() {
    const { login, isLoggingIn } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        login(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-3xl font-semibold text-white tracking-tight mb-8 text-center animate-in fade-in slide-in-from-top-4 duration-500">
                Welcome back
            </h2>

            <div className="relative group overflow-hidden rounded-2xl transition-all duration-300">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-blue-500 transition-colors z-10">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <Input 
                    type="email"
                    placeholder="Enter your email" 
                    className="h-14 pl-12 rounded-2xl bg-white/5 border-white/10 focus:bg-white/10 transition-all duration-300"
                    {...register("email", { required: "Email is required" })}
                />
                {errors.email && <span className="text-xs text-red-500 mt-1 pl-2">{(errors.email as any).message}</span>}
            </div>

            <div className="relative group overflow-hidden rounded-2xl transition-all duration-300">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-blue-500 transition-colors z-10">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <Input 
                    type="password" 
                    placeholder="Enter your password" 
                    className="h-14 pl-12 rounded-2xl bg-white/5 border-white/10 focus:bg-white/10 transition-all duration-300"
                    {...register("password", { required: "Password is required" })}
                />
                {errors.password && <span className="text-xs text-red-500 mt-1 pl-2">{(errors.password as any).message}</span>}
            </div>

            <Button 
                type="submit"
                disabled={isLoggingIn}
                className="w-full h-14 mt-4 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl font-bold text-base shadow-xl shadow-blue-500/20 active:scale-95 transition-all disabled:opacity-50 gap-2 border-none"
            >
                {isLoggingIn ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Logging in...
                    </>
                ) : (
                    "Sign in"
                )}
            </Button>
        </form>
    );
}
