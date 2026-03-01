"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useAuth } from "@/shared/hooks/useAuth";
import { Loader2, Mail, Lock, User } from "lucide-react";

export default function SignupForm() {
    const { signup, isSigningUp } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        signup(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <h2 className="text-3xl font-semibold text-white tracking-tight mb-8 text-center animate-in fade-in slide-in-from-top-4 duration-500">
                Create an account
            </h2>

            <div className="relative group overflow-hidden rounded-2xl transition-all duration-300">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-blue-500 transition-colors z-10">
                    <User className="w-4.5 h-4.5" />
                </div>
                <Input 
                    placeholder="Full name" 
                    className="h-14 pl-12 rounded-2xl bg-white/5 border-white/10 focus:bg-white/10 transition-all duration-300" 
                    {...register("name", { required: "Name is required" })}
                />
                {errors.name && <span className="text-xs text-red-500 mt-1 pl-2">{(errors.name as any).message}</span>}
            </div>

            <div className="relative group overflow-hidden rounded-2xl transition-all duration-300">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-blue-500 transition-colors z-10">
                    <Mail className="w-4.5 h-4.5" />
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
                    <Lock className="w-4.5 h-4.5" />
                </div>
                <Input 
                    type="password"
                    placeholder="Create a password" 
                    className="h-14 pl-12 rounded-2xl bg-white/5 border-white/10 focus:bg-white/10 transition-all duration-300"
                    {...register("password", { 
                        required: "Password is required",
                        minLength: { value: 6, message: "Minimum 6 characters" }
                    })}
                />
                {errors.password && <span className="text-xs text-red-500 mt-1 pl-2">{(errors.password as any).message}</span>}
            </div>

            <Button 
                type="submit"
                disabled={isSigningUp}
                className="w-full h-14 mt-4 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl font-bold text-base shadow-xl shadow-blue-500/20 active:scale-95 transition-all disabled:opacity-50 gap-2 border-none"
            >
                {isSigningUp ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Creating...
                    </>
                ) : (
                    "Create account"
                )}
            </Button>
           
        </form>
    );
}
