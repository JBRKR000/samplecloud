'use client';

import { signOut } from "@/app/(lib)/services/auth/auth-client";
import { useRouter } from "next/router";

export default function collectionPage() {

    const router = useRouter();

    const handlleSignOut = async () => {
        await signOut();
        router.push("/");
    }

    return (
        <>
         <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Protected Collection Page</h1>
            <p>This page is only accessible to authenticated users.</p>
            <button className="" onClick={handlleSignOut}>SignOut</button>
        </div>
        </>
    );
}