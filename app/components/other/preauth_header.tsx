'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PreauthHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { label: "Features", href: "/features" },
        { label: "Downloads", href: "/downloads" },
        { label: "Pricing", href: "/pricing" },
        { label: "Help", href: "/help" },
    ]

    return (
        <header className="sticky top-0 z-50 bg-linear-to-b from-background via-background/95 to-background/90 border-b border-border/20 backdrop-blur-md overflow-hidden">
            <div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="flex items-center h-20 gap-8">

                    <div className="shrink-0">
                        <Link href="/" className="flex items-center gap-3 group hover:opacity-90 transition-opacity">
                            <div className="relative">
                                <Image
                                    src="/logo.ico"
                                    alt="AudioLab Logo"
                                    width={128}
                                    height={128}
                                    className=""
                                />
                            </div>
                        </Link>
                    </div>



                    <div className="flex-1"></div>


                    <div className="shrink-0">
                        <nav className="hidden md:flex gap-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="text-sm font-medium text-white hover:text-accent transition-colors duration-200 relative group"
                                >
                                    {item.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Mobile Hamburger Menu */}
                    <motion.button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden shrink-0 p-2 text-white hover:text-accent transition-colors"
                        aria-label="Toggle menu"
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.svg 
                            className="w-6 h-6" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M4 6h16M4 12h16M4 18h16"
                                animate={mobileMenuOpen ? { d: "M6 18L18 6M6 6l12 12" } : { d: "M4 6h16M4 12h16M4 18h16" }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.svg>
                    </motion.button>
                </div>

                {/* Mobile Navigation Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.nav 
                            className="md:hidden pb-4 pt-2"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    <Link
                                        href={item.href}
                                        className="block px-4 py-2 text-sm font-medium text-white hover:text-primary hover:bg-white/5 rounded transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.nav>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}