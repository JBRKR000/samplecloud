'use client';
import { signOut } from "@/app/(lib)/services/auth/auth-client";

export default function RecentPage() {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Recent</h1>
            <p>This is your recent page where you can view and manage your items.</p>
            <button className=""
            onClick={()=>{signOut()}}>Logout</button>
        </div>
    );
}