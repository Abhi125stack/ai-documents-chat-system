import { AuthCard } from "@/shared/components/AuthCard";
import { AuthTabs } from "@/shared/components/AuthTab";
import SignupForm from "@/shared/components/SignupForm";

export default function SignupPage() {
    return (
        <AuthCard>
            <AuthTabs />
            <SignupForm />
        </AuthCard>
    );
}