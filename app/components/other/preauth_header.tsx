'use client';

import Link from "next/link";

export default function PreauthHeader() {
    return (
        <header className="sticky top-0 z-50 bg-gradient-to-b from-background via-background/95 to-background/90 border-b border-border/20 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group hover:opacity-80 transition-opacity">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary rounded-lg blur-md opacity-30 group-hover:opacity-50 transition-opacity"></div>
                            <div className="relative w-10 h-10 bg-gradient-to-br from-primary to-warning rounded-lg flex items-center justify-center">
                                <span className="text-background font-display font-bold text-lg">♪</span>
                            </div>
                        </div>
                        <span className="text-2xl font-display font-bold tracking-widest text-primary">AUDIOLAB</span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex gap-8">
                        {[
                            { label: "Features", href: "#features" },
                            { label: "Downloads", href: "#downloads" },
                            { label: "Pricing", href: "#pricing" },
                            { label: "Help", href: "#help" },
                        ].map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="text-sm font-body text-white hover:text-primary transition-colors duration-200 relative group"
                            >
                                {item.label}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
}