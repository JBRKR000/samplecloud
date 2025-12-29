import AuthForm from "@/app/components/auth_components/auth_form";
import HeroLanding from "@/app/components/auth_components/auth_hero_landing"
import PreauthHeader from "@/app/components/other/preauth_header";

export default function AuthPage() {
    return (
        <>
        <PreauthHeader/>
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)]">
            <div className="w-full md:w-2/3">
                <HeroLanding />
            </div>
            <div className="w-full md:w-1/3 bg-background/50 border-l-0 md:border-l border-border/20 border-t md:border-t-0">
                <AuthForm />
            </div>
        </div>
        </>
    );
    }