import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface AuthResponse {
  message: string;
  success: boolean;
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Login Mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: any) => {
      const response = await api.post<AuthResponse>("/auth/login", credentials);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(data.message || "Welcome back!");
        router.push("/dashboard");
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Login failed. Please check your credentials.";
      toast.error(message);
    },
  });

  // Signup Mutation
  const signupMutation = useMutation({
    mutationFn: async (userData: any) => {
      const response = await api.post<AuthResponse>("/auth/signup", userData);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(data.message || "Account created successfully!");
        router.push("/dashboard");
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Registration failed. Email might already be taken.";
      toast.error(message);
    },
  });

  // Logout Function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.info("Logged out successfully.");
    router.push("/login");
    queryClient.clear();
  };

  return {
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    signup: signupMutation.mutate,
    isSigningUp: signupMutation.isPending,
    logout,
  };
};
