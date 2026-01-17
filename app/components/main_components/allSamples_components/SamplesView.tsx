'use client';

import { Play, Music, Pause } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePlayerStore } from '@/app/(lib)/store/PlayerStore';
import { useEffect, useState } from 'react';
import { getSamples } from '@/app/(lib)/api';



interface Sample {
  id: number
  audioUrl: string
  bpm: number | null
  createdAt: Date
  key: string | null
  name: string
  time: number
  type: 'LOOP' | 'ONE_SHOT'
  updatedAt: Date
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

export default function SamplesView() {
  const [samples, setSamples] = useState<Sample[]>([]);
  const { setCurrentTrack, currentTrack, setIsPlaying, isPlaying } = usePlayerStore();


  useEffect(() => {
    let fetchSamples = async () => {
      let response = await getSamples();
      setSamples(response)
    }
    fetchSamples()
  }, []);

  const getTypeColor = (type: 'LOOP' | 'ONE_SHOT') => {
    return type === 'LOOP'
      ? 'bg-success/15 text-success border-success/30'
      : 'bg-accent/15 text-accent border-accent/30';
  };

  const playAudio = (sample: Sample) => {
    if (sample.audioUrl) {
      if (currentTrack?.id === sample.id) {
        setIsPlaying(!isPlaying);
      }
      else {
        setCurrentTrack({
          id: sample.id,
          title: sample.name,
          audioUrl: sample.audioUrl,
          duration: currentTrack?.duration || 240
        })
        setIsPlaying(true);
      }
    }
  }

  return (


    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="h-full w-full flex flex-col bg-linear-to-b from-secondary via-secondary/98 to-secondary/95"
    >
      {/* Header */}
      <div className="shrink-0 px-6 py-4 border-b border-border/30 sticky top-0 bg-secondary/80 backdrop-blur-sm">
        <motion.div
          variants={rowVariants}
          className="flex items-center gap-4 text-xs uppercase tracking-widest text-muted-foreground/70 font-semibold"
        >
          <div className="w-6"></div>
          <div className="flex-1">Name</div>
          <div className="w-24">Type</div>
          <div className="w-16 text-center">BPM</div>
          <div className="w-16 text-center">Key</div>
          <div className="w-16 text-center">Time</div>
        </motion.div>
      </div>

      {/* Samples List */}
      <motion.div
        className="flex-1 overflow-y-auto px-6 space-y-1"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {samples.map((sample, index) => (
          <motion.div
            key={sample.id}
            variants={rowVariants}
            custom={index}
            whileHover={{ backgroundColor: 'rgba(126, 166, 255, 0.08)' }}
            className="group flex items-center gap-4 px-4 py-3 rounded-lg transition-colors cursor-pointer hover:bg-accent/5"
          >
            {/* Play Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-6 h-6 flex items-center justify-center rounded text-muted-foreground/50 group-hover:text-accent/70 hover:bg-accent/10 transition-colors shrink-0"
              onClick={() => playAudio(sample)}
            >
              {currentTrack?.id === sample.id && isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current" />
              )}
            </motion.button>

            {/* Name */}
            <div className="flex-1 flex items-center gap-2 min-w-0">
              <Music className="w-4 h-4 text-muted-foreground/50 shrink-0" />
              <span className="text-sm text-primary-foreground truncate font-medium">
                {sample.name}
              </span>
            </div>

            {/* Type */}
            <motion.div
              className={`w-24 px-2.5 py-1.5 rounded-md border text-xs font-semibold text-center whitespace-nowrap ${getTypeColor(
                sample.type
              )}`}
              whileHover={{ scale: 1.05 }}
            >
              {sample.type}
            </motion.div>

            {/* BPM */}
            <div className="w-16 text-center text-sm text-primary-foreground/80">
              {sample.bpm}
            </div>

            {/* Key */}
            <motion.div
              className="w-16 text-center text-sm font-semibold text-accent/80"
              whileHover={{ scale: 1.1 }}
            >
              {sample.key}
            </motion.div>

            {/* Time */}
            <div className="w-16 text-center text-sm text-muted-foreground/70">
              {sample.time}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer Info */}
      <motion.div
        variants={rowVariants}
        className="shrink-0 px-6 py-4 border-t border-border/30 bg-secondary/50 text-xs text-muted-foreground/60"
      >
        Showing {samples.length} samples
      </motion.div>
    </motion.div>
  );
}

