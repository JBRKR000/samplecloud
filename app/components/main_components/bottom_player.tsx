'use client';

import { Speaker, ChevronLeft, ChevronRight, Pause, Play, Volume2 } from 'lucide-react';
import { useState } from 'react';

export default function BottomPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <div className="fixed bottom-0 left-48 right-0 h-24 bg-secondary border-t border-border flex items-center justify-between px-6">
      {/* Track Info */}
      <div className="flex items-center gap-4 w-48">
        <div className="w-12 h-12 bg-card rounded-lg flex items-center justify-center">
          <Speaker className="w-6 h-6 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-primary-foreground truncate">Synthesizer_Pluck_Cmin_124.wav</p>
          <p className="text-xs text-muted">4.0s</p>
        </div>
      </div>

      {/* Controls & Timeline */}
      <div className="flex-1 flex flex-col items-center gap-3 mx-6">
        {/* Playback Controls */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-card rounded-lg transition-colors text-primary-foreground">
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-sidebar" />
            ) : (
              <Play className="w-5 h-5 text-sidebar ml-0.5" />
            )}
          </button>

          <button className="p-2 hover:bg-card rounded-lg transition-colors text-primary-foreground">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Timeline */}
        <div className="w-full flex items-center gap-2">
          <span className="text-xs text-muted w-8">0:00</span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="flex-1 h-1 bg-card rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #F5A623 0%, #F5A623 ${progress}%, #141823 ${progress}%, #141823 100%)`
            }}
          />
          <span className="text-xs text-muted w-8 text-right">4:00</span>
        </div>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-2 w-40">
        <Volume2 className="w-4 h-4 text-primary-foreground shrink-0" />
        <input
          type="range"
          min="0"
          max="100"
          defaultValue="80"
          className="flex-1 h-1 bg-card rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #F5A623 0%, #F5A623 80%, #141823 80%, #141823 100%)`
          }}
        />
      </div>
    </div>
  );
}
