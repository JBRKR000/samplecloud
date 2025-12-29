'use client';

import { Zap, Cloud, Tag, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeroLanding() {
    const classNameStylingIcons = "h-6 w-6 text-accent";
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="relative flex flex-col justify-center h-full px-8 lg:px-16 py-12 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <motion.div
                    className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
                    animate={{
                        x: mousePosition.x * 0.02,
                        y: mousePosition.y * 0.02,
                    }}
                    transition={{ type: 'spring', stiffness: 50, damping: 30 }}
                />
                <motion.div
                    className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
                    animate={{
                        x: -mousePosition.x * 0.015,
                        y: -mousePosition.y * 0.015,
                    }}
                    transition={{ type: 'spring', stiffness: 50, damping: 30 }}
                />
                <svg className="absolute inset-0 w-full h-full opacity-10">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="relative z-10">
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                        Professional Audio Workflow
                    </span>
                </motion.div>
                <motion.h1
                    className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    The cloud-native<br />
                    sample manager.
                </motion.h1>
                <motion.p
                    className="text-lg text-gray-400 mb-12 max-w-md leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Organize, tag, and sync your entire sample library across devices. Designed for producers who need a DAW-like experience, anywhere.
                </motion.p>

                <motion.div
                    className="grid grid-cols-2 gap-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <motion.div
                        className="flex gap-4 group"
                        whileHover={{ x: 8 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                        <div className="shrink-0">
                            <motion.div
                                className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 border border-primary/20"
                                whileHover={{ scale: 1.1, borderColor: '#fbbf24' }}
                            >
                                <Zap className={classNameStylingIcons} />
                            </motion.div>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-1">Instant Search</h3>
                            <p className="text-sm text-gray-400">Find any sound in milliseconds with deep metadata.</p>
                        </div>
                    </motion.div>

                    
                    <motion.div
                        className="flex gap-4 group"
                        whileHover={{ x: 8 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                        <div className="shrink-0">
                            <motion.div
                                className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 border border-primary/20"
                                whileHover={{ scale: 1.1 }}
                            >
                                <Cloud className={classNameStylingIcons} />
                            </motion.div>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-1">Cloud Sync</h3>
                            <p className="text-sm text-gray-400">Your library, available on every studio machine.</p>
                        </div>
                    </motion.div>

                    
                    <motion.div
                        className="flex gap-4 group"
                        whileHover={{ x: 8 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                        <div className="shrink-0">
                            <motion.div
                                className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 border border-primary/20"
                                whileHover={{ scale: 1.1 }}
                            >
                                <Tag className={classNameStylingIcons} />
                            </motion.div>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-1">Smart Tags</h3>
                            <p className="text-sm text-gray-400">Auto-key and BPM detection for every sample.</p>
                        </div>
                    </motion.div>

                    
                    <motion.div
                        className="flex gap-4 group"
                        whileHover={{ x: 8 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                        <div className="shrink-0">
                            <motion.div
                                className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 border border-primary/20"
                                whileHover={{ scale: 1.1 }}
                            >
                                <Lock className={classNameStylingIcons} />
                            </motion.div>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-1">Secure Backup</h3>
                            <p className="text-sm text-gray-400">Never lose a sample with automated versioning.</p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}