'use client';
import { signOut } from "@/app/(lib)/services/auth/auth-client";

export default function TagsPage() {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Tags</h1>
            <p>This is your tags page where you can view and manage your items.</p>
            <button className=""
            onClick={()=>{signOut()}}>Logout</button>
        </div>
    );
}