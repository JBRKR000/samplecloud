'use client';

import { X } from 'lucide-react';
import { useState } from 'react';

interface SampleInfo {
  name: string;
  duration: string;
  bpm: string;
  key: string;
  sampleRate: string;
  channels: string;
  format: string;
  dateAdded: string;
  fileSize: string;
  tags: string[];
}

const defaultSample: SampleInfo = {
  name: 'Synthesizer_Pluck_Cmin_124.wav',
  duration: '4.0s',
  bpm: '124',
  key: 'Cm',
  sampleRate: '44.1 kHz',
  channels: 'Stereo',
  format: 'WAV 24-bit',
  dateAdded: 'Added 2 days ago',
  fileSize: '2.4 MB',
  tags: ['Synth', 'Pluck', 'Melodic', 'Electronic', 'Clean'],
};

export default function RightPanel() {
  const [sample] = useState<SampleInfo>(defaultSample);
  const [showPanel, setShowPanel] = useState(true);

  if (!showPanel) return null;

  return (
    <div className="fixed top-0 right-0 bottom-24 w-64 bg-secondary border-l border-border overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-secondary border-b border-border px-6 py-4 flex items-center justify-between">
        <h3 className="font-medium text-primary-foreground text-sm">Sample Info</h3>
        <button
          onClick={() => setShowPanel(false)}
          className="p-1 hover:bg-card rounded transition-colors"
        >
          <X className="w-5 h-5 text-primary-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Waveform Display */}
        <div className="bg-card rounded-lg p-4 h-20 flex items-center justify-center">
          <div className="flex items-center justify-center gap-1 h-full">
            {Array.from({ length: 40 }).map((_, i) => {
              // Seeded pseudo-random for consistent hydration
              const seed = i * 2.654435761;
              const random = Math.sin(seed) * 10000;
              const height = (random - Math.floor(random)) * 100;
              
              return (
                <div
                  key={i}
                  className="flex-1 bg-primary/30 rounded-sm"
                  style={{
                    height: `${height}%`,
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Metadata */}
        <div className="space-y-3">
          <div className="text-xs uppercase tracking-wider text-muted mb-3">Details</div>
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted">Duration</span>
            <span className="text-sm font-medium text-primary-foreground">{sample.duration}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs text-muted">BPM</span>
            <span className="text-sm font-medium text-primary-foreground">{sample.bpm}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs text-muted">Key</span>
            <span className="text-sm font-medium text-accent">{sample.key}</span>
          </div>

          <div className="border-t border-border pt-3"></div>

          <div className="text-xs uppercase tracking-wider text-muted mb-3">Format</div>

          <div className="flex justify-between items-center">
            <span className="text-xs text-muted">Sample Rate</span>
            <span className="text-sm font-medium text-primary-foreground">{sample.sampleRate}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs text-muted">Channels</span>
            <span className="text-sm font-medium text-primary-foreground">{sample.channels}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs text-muted">Format</span>
            <span className="text-sm font-medium text-primary-foreground">{sample.format}</span>
          </div>

          <div className="border-t border-border pt-3"></div>

          <div className="text-xs text-muted">{sample.dateAdded}</div>
          <div className="text-xs text-muted">{sample.fileSize}</div>
        </div>

        {/* Tags */}
        <div className="border-t border-border pt-6">
          <div className="text-xs uppercase tracking-wider text-muted mb-3">Tags</div>
          <div className="flex flex-wrap gap-2">
            {sample.tags.map((tag) => (
              <button
                key={tag}
                className="px-3 py-1 bg-card hover:bg-primary/10 rounded text-xs text-primary-foreground transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-border pt-6 space-y-2">
          <button className="w-full py-2 bg-primary hover:bg-primary/90 text-sidebar rounded-lg text-sm font-medium transition-colors">
            Download
          </button>
          <button className="w-full py-2 bg-card hover:bg-secondary border border-border text-primary-foreground rounded-lg text-sm font-medium transition-colors">
            Edit Info
          </button>
        </div>
      </div>
    </div>
  );
}
