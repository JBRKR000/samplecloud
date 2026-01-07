'use client';

import { Filter, List, MoreVertical } from 'lucide-react';

export default function PostAuthHeader() {
  return (
    <div className="fixed top-0 left-48 right-64 h-16 bg-background border-b border-border flex items-center justify-between px-6 z-40">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <input
          type="text"
          placeholder="Search samples, tags, keys..."
          className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-primary-foreground text-sm placeholder-muted focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 ml-6">
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
