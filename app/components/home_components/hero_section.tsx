'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function HeroSection() {
  const router = useRouter();

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-1/3 -left-32 w-96 h-96 bg-accent/15 rounded-full blur-3xl"
          animate={{
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            y: [0, -30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <svg className="absolute inset-0 w-full h-full opacity-5">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">
            Welcome to SampleCloud
          </span>
        </motion.div>

        <motion.h1
          className="text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Your entire sample library.{' '}
          <span className="text-accent">Instantly creative.</span>
        </motion.h1>

        <motion.p
          className="text-lg lg:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          The fastest way to organize, find, and audition your audio samples. Built for professional producers who value workflow.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button
            onClick={() => router.push('/auth')}
            className="px-8 py-4 bg-accent text-background font-bold rounded-lg hover:bg-accent/90 transition-all duration-300 hover:shadow-lg active:scale-95"
          >
            Get Started Now
          </button>
          <button
            onClick={() => {}}
            className="px-8 py-4 bg-transparent text-white border border-white/30 font-semibold rounded-lg hover:border-white hover:bg-white/5 transition-all duration-300"
          >
            Download App
          </button>
        </motion.div>
      </div>
    </div>
  );
}
