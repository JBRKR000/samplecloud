'use client';

import { Filter, List, MoreVertical, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PostAuthHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <div className="h-16 bg-background border-b border-border flex items-center justify-between px-4 md:px-6 z-40 shrink-0">
      {/* Mobile Menu Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors text-primary-foreground"
        onClick={onMenuClick}
        title="Menu"
      >
        <Menu className="w-5 h-5" />
      </motion.button>

      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-4 md:mx-0">
        <input
          type="text"
          placeholder="Search samples, tags, keys..."
          className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-primary-foreground text-sm placeholder-accent/40 focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1 md:gap-3 ml-4 md:ml-6">
        <button
          className="p-2 hover:bg-secondary rounded-lg transition-colors text-primary-foreground"
          title="Filter"
        >
          <Filter className="w-5 h-5" />
        </button>
        
        <button
          className="p-2 hover:bg-secondary rounded-lg transition-colors text-primary-foreground"
          title="List view"
        >
          <List className="w-5 h-5" />
        </button>

        <button
          className="p-2 hover:bg-secondary rounded-lg transition-colors text-primary-foreground"
          title="More options"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
