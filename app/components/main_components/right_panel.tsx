'use client';

import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePlayerStore } from '@/app/(lib)/store/PlayerStore';
import WaveSurfer from 'wavesurfer.js';

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
  const [isExpanded, setIsExpanded] = useState(true);
  
  const { currentTrack, isPlaying, progress, setProgress } = usePlayerStore();
  
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (!waveformRef.current) return;

    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#7EA6FF',
      progressColor: '#7EA6FF',
      cursorColor: '#FFFFFF',
      barWidth: 2,
      barGap: 1,
      barRadius: 2,
      height: 96,
      normalize: true,
      backend: 'WebAudio',
      interact: true,
      hideScrollbar: true,
    });

    return () => {
      wavesurferRef.current?.destroy();
    };
  }, []);
  useEffect(() => {
    if (!wavesurferRef.current || !currentTrack?.audioUrl) return;

    const ws = wavesurferRef.current;
    
    // Event listener dla kliknięć na waveform
    const handleInteraction = (newTime: number) => {
      const duration = ws.getDuration();
      if (duration > 0) {
        const newProgress = (newTime / duration) * 100;
        setProgress(newProgress);
      }
    };
    
    ws.on('interaction', handleInteraction);
    ws.load(currentTrack.audioUrl);
    
    return () => {
      ws.un('interaction', handleInteraction);
    };
  }, [currentTrack?.audioUrl, setProgress]);

  useEffect(() => {
    if (!wavesurferRef.current || !wavesurferRef.current.getDuration()) return;

    const seekTo = progress / 100;
    wavesurferRef.current.seekTo(seekTo);
  }, [progress]);

  const containerVariants = {
    expanded: { scaleX: 1, opacity: 1 },
    collapsed: { scaleX: 0, opacity: 0 },
  };

  const contentVariants = {
    expanded: { opacity: 1, transition: { delay: 0.15 } },
    collapsed: { opacity: 0 },
  };

  const buttonVariants = {
    expanded: { 
      borderRadius: '0.5rem',
      width: 'auto',
      padding: '0.5rem 1rem',
      position: 'relative' as const,
    },
    collapsed: { 
      borderRadius: '9999px',
      width: '3rem',
      height: '3rem',
      padding: '0',
      position: 'absolute' as const,
      right: '-1.5rem',
      top: '1rem',
    },
  };

  return (
    <div className="relative h-full flex-1">
      {/* Toggle Button - Positioned for collapsed state */}
      {!isExpanded && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute right-0 top-4 w-14 h-14 rounded-full flex items-center justify-center bg-accent text-secondary opacity-80 transition-all z-50 border-2 border-accent/30"
          style={{ right: '-1.75rem' }}
          title="Expand panel"
        >
          <ArrowLeftFromLine className="w-6 h-6" />
        </motion.button>
      )}

      {/* Panel Content */}
      <motion.div
        initial="expanded"
        animate={isExpanded ? 'expanded' : 'collapsed'}
        variants={containerVariants}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ originX: 1 }}
        className="h-full bg-linear-to-b from-secondary via-secondary/98 to-secondary/95 border-l border-border/30 backdrop-blur-xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="shrink-0 bg-secondary/50 border-b border-border/30 px-6 py-4 flex items-center justify-between">
          <motion.h3 
            animate={isExpanded ? 'expanded' : 'collapsed'}
            variants={contentVariants}
            className="font-semibold text-primary-foreground text-sm tracking-wide"
          >
            Sample Info
          </motion.h3>
          {isExpanded && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-accent/10 rounded-lg transition-colors text-muted-foreground hover:text-primary-foreground"
              title="Collapse panel"
            >
              <ArrowRightFromLine className="w-4 h-4" />
            </motion.button>
          )}
        </div>

      {/* Content */}
      <div className="overflow-y-auto flex-1 space-y-0">
        {/* Waveform Display */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="px-6 py-6 space-y-2"
        >
          <div className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">Waveform</div>
          <div 
            ref={waveformRef}
            className="bg-card/50 border border-border/30 rounded-lg overflow-hidden backdrop-blur-sm cursor-pointer hover:border-accent/10 transition-colors"
            title="Click to seek"
          >
            {!currentTrack && (
              <div className="h-24 flex items-center justify-center text-muted-foreground/50 text-xs">
                No track loaded
              </div>
            )}
          </div>
          {currentTrack && (
            <div className="text-xs text-muted-foreground/70 mt-2">
              {currentTrack.title}
            </div>
          )}
        </motion.div>

        {/* Details Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="px-6 py-6 border-t border-border/20 space-y-4"
        >
          <div className="text-xs uppercase tracking-widest text-accent/70 font-semibold">Details</div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2">
              <span className="text-xs text-muted-foreground/80">Duration</span>
              <span className="text-sm font-medium text-primary-foreground">
                {currentTrack?.duration ? `${currentTrack.duration}s` : sample.duration}
              </span>
            </div>
            <div className="border-b border-border/10"></div>

            <div className="flex justify-between items-center py-2">
              <span className="text-xs text-muted-foreground/80">BPM</span>
              <span className="text-sm font-medium text-primary-foreground">
                {currentTrack?.bpm || sample.bpm}
              </span>
            </div>
            <div className="border-b border-border/10"></div>

            <div className="flex justify-between items-center py-2">
              <span className="text-xs text-muted-foreground/80">Key</span>
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="text-sm font-bold text-accent px-2 py-1 rounded bg-accent/10"
              >
                {currentTrack?.key || sample.key}
              </motion.span>
            </div>
          </div>
        </motion.div>

        {/* Format Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="px-6 py-6 border-t border-border/20 space-y-4"
        >
          <div className="text-xs uppercase tracking-widest text-accent/70 font-semibold">Format</div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2">
              <span className="text-xs text-muted-foreground/80">Sample Rate</span>
              <span className="text-sm font-medium text-primary-foreground">
                {currentTrack?.sampleRate || sample.sampleRate}
              </span>
            </div>
            <div className="border-b border-border/10"></div>

            <div className="flex justify-between items-center py-2">
              <span className="text-xs text-muted-foreground/80">Channels</span>
              <span className="text-sm font-medium text-primary-foreground">
                {currentTrack?.channels || sample.channels}
              </span>
            </div>
            <div className="border-b border-border/10"></div>

            <div className="flex justify-between items-center py-2">
              <span className="text-xs text-muted-foreground/80">Format</span>
              <span className="text-sm font-medium text-primary-foreground">
                {currentTrack?.format || sample.format}
              </span>
            </div>
          </div>

          <div className="border-t border-border/20 pt-4 mt-4 space-y-1 text-xs text-muted-foreground/70">
            <div>{currentTrack?.dateAdded || sample.dateAdded}</div>
            <div>{currentTrack?.fileSize || sample.fileSize}</div>
          </div>
        </motion.div>

        {/* Tags Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="px-6 py-6 border-t border-border/20 space-y-4"
        >
          <div className="text-xs uppercase tracking-widest text-accent/70 font-semibold">Tags</div>
          <div className="flex flex-wrap gap-2">
            {(currentTrack?.tags || sample.tags).map((tag, i) => (
              <motion.button
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 + i * 0.05 }}
                whileHover={{ scale: 1.05, backgroundColor: 'var(--color-accent)' }}
                className="px-3 py-1.5 bg-card/70 hover:bg-accent/20 rounded-lg text-xs text-primary-foreground/90 transition-all border border-border/20 hover:border-accent/30"
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="px-6 py-6 border-t border-border/20 space-y-3 mt-auto"
        >
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2.5 bg-accent hover:bg-accent/90 text-secondary rounded-lg text-sm font-semibold transition-all shadow-lg shadow-accent/20"
          >
            Download
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2.5 bg-card/70 hover:bg-secondary border border-border/30 text-primary-foreground rounded-lg text-sm font-semibold transition-all hover:border-border/50"
          >
            Edit Info
          </motion.button>
        </motion.div>
      </div>
      </motion.div>
    </div>
  );
}
