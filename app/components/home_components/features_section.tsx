'use client';

import { motion } from 'framer-motion';
import { Zap, Headphones, Layers, Palette, Lock, Radio } from 'lucide-react';

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: Zap,
    title: 'Local Speed, Cloud Power',
    description: 'All your samples at lightning fast speeds backed by cloud backup.',
  },
  {
    icon: Headphones,
    title: 'Auto-Tagging Intelligence',
    description: 'AI-powered tagging automatically organizes your samples perfectly.',
  },
  {
    icon: Layers,
    title: 'Universal Drag & Drop',
    description: 'Drag samples directly into any DAW or music production software.',
  },
  {
    icon: Palette,
    title: 'Cross-Platform Sync',
    description: 'Keep your library in sync across all your devices seamlessly.',
  },
  {
    icon: Lock,
    title: 'Deep Search',
    description: 'Find any sample by tags, name, or custom metadata instantly.',
  },
  {
    icon: Radio,
    title: 'Privacy & Security',
    description: 'Your library stays encrypted and under your complete control.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  hover: { y: -8, transition: { duration: 0.3 } },
};

export default function FeaturesSection() {
  return (
    <div className="relative py-20 px-4 bg-background/50">
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Production-Ready Features
          </h2>
          <p className="text-lg text-gray-400">
            Everything you need to keep your flow uninterrupted.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '100px' }}
        >
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="group bg-card border border-border/40 rounded-xl p-8 hover:border-accent/50 transition-all duration-300"
              >
                <motion.div
                  className="w-12 h-12 bg-accent/15 border border-accent/30 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent/25 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <Icon className="w-6 h-6 text-accent" />
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
