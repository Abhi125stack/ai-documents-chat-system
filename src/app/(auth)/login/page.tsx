import { AuthCard } from "@/shared/components/AuthCard";
import { AuthTabs } from "@/shared/components/AuthTab";
import LoginForm from "@/shared/components/LoginForm";

export default function LoginPage() {
    return (
        <AuthCard>
            <AuthTabs />
            <LoginForm />
        </AuthCard>
    );
}