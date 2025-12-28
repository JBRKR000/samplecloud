import AuthForm from "@/app/components/auth_components/auth_form";
import HeroLanding from "@/app/components/auth_components/auth_hero_landing"
import PreauthHeader from "@/app/components/other/preauth_header";

export default function AuthPage() {
    return (
        <>
        <PreauthHeader/>
        <HeroLanding />
        <AuthForm />
        
        <div>
            <h1 className="text-primary">Here will be the Auth Page with dynamic login and registration forms</h1>
        </div>
        
        
        </>
    );
    }