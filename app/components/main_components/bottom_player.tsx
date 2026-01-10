'use client';

import {Pause, Play, Volume2, Heart, VolumeX, Volume1, ChevronFirst, ChevronLast, Repeat, Shuffle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function BottomPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [volume, setVolume] = useState(80);
  const [prevVolume, setPrevVolume] = useState(80);
  const [hoveredControl, setHoveredControl] = useState<string | null>(null);
  const [isDraggingProgress, setIsDraggingProgress] = useState(false);
  const [isDraggingVolume, setIsDraggingVolume] = useState(false);
  const [isHoveredTimeline, setIsHoveredTimeline] = useState(false);
  const [isHoveredVolume, setIsHoveredVolume] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  const totalDuration = 240;
  const currentTime = Math.floor((progress / 100) * totalDuration);
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const controlButtonVariants = {
    rest: { opacity: 1 },
    hover: {
      opacity: 0.7,
      transition: { duration: 0.2 }
    },
    tap: { opacity: 0.5 }
  };

  const playButtonVariants = {
    rest: { opacity: 1 },
    hover: {
      opacity: 0.8,
      transition: { duration: 0.2 }
    },
    tap: { opacity: 0.6 }
  };

  const trackInfoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { delay: 0.1, duration: 0.4 } }
  };


  const handleProgressChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;
    setProgress(Math.max(0, Math.min(100, percent)));
  };

  const handleProgressMouseDown = () => {
    setIsDraggingProgress(true);
  };

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;
    setVolume(Number(Math.max(0, Math.min(100, percent)).toFixed(0)));
  };



  const handleMouseMove = (e: MouseEvent) => {
    if (isDraggingProgress) {
      const progressBar = document.querySelector('[data-progress-bar]') as HTMLDivElement;
      if (progressBar) {
        const rect = progressBar.getBoundingClientRect();
        const percent = ((e.clientX - rect.left) / rect.width) * 100;
        setProgress(Math.max(0, Math.min(100, percent)));
      }
    }
    if (isDraggingVolume) {
      const volumeBar = document.querySelector('[data-volume-bar]') as HTMLDivElement;
      if (volumeBar) {
        const rect = volumeBar.getBoundingClientRect();
        const percent = ((e.clientX - rect.left) / rect.width) * 100;
        setVolume(Number(Math.max(0, Math.min(100, percent)).toFixed(0)));
      }
    }
  };

  const handleMouseUp = () => {
    setIsDraggingProgress(false);
    setIsDraggingVolume(false);
    setIsHoveredTimeline(false);
    setIsHoveredVolume(false);
  };

  const handleVolumeMouseDown = () => {
    setIsDraggingVolume(true);
    setIsHoveredVolume(true)
  };

  useEffect(() => {
    if (isDraggingProgress || isDraggingVolume) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDraggingProgress, isDraggingVolume]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="h-16 sm:h-20 md:h-24 bg-linear-to-r from-secondary via-secondary/95 to-secondary/90 border-t border-border/30 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between px-2 sm:px-4 md:px-8 z-50 shrink-0 gap-2 sm:gap-0"
    >
      {/* Track Info */}
      <motion.div
        variants={trackInfoVariants}
        className="hidden sm:flex items-center gap-2 sm:gap-4 sm:w-56 shrink-0 min-w-0"
      >
        {/* Track Details */}
        <div className="min-w-0 flex-1">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm font-semibold text-white truncate"
          >
            Synthesizer_Pluck_Cmin_124
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 }}
            className="text-xs text-muted-foreground/70"
          >
            4:00 Duration
          </motion.p>
        </div>

        {/* Favorite Button */}
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsFavorite(!isFavorite)}
          className="shrink-0"
        >
          <Heart
            className={`w-5 h-5 transition-all duration-300 ${isFavorite ? 'fill-accent text-accent drop-shadow-lg' : 'text-accent/70 hover:text-accent'
              }`}
          />
        </motion.button>
      </motion.div>

      {/* Controls & Timeline */}
        <div className="flex-1 flex flex-col items-center gap-1 sm:gap-3 sm:mx-8 min-w-0 w-full sm:w-auto">
        {/* Playback Controls */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
          <motion.button
            variants={controlButtonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            onClick={()=>{setIsRepeat(!isRepeat)}}
          >

            <Repeat className={`${isRepeat ? 'text-accent' : 'text-primary-foreground'} w-3 h-3 sm:w-4 sm:h-4`} />
            
          </motion.button>

          <motion.button
            variants={controlButtonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            onHoverStart={() => setHoveredControl('prev')}
            onHoverEnd={() => setHoveredControl(null)}
            className="p-2 text-primary-foreground"
          >
            <ChevronFirst className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </motion.button>

          <motion.button
            variants={playButtonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 text-primary-foreground"
          >
            <motion.div>
              {isPlaying ? (
                <Pause className="w-5 h-5 sm:w-6 sm:h-6 ml-1" />
              ) : (
                <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-1" />
              )}
            </motion.div>
          </motion.button>

          <motion.button
            variants={controlButtonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            onHoverStart={() => setHoveredControl('next')}
            onHoverEnd={() => setHoveredControl(null)}
            className="p-2 text-primary-foreground"
          >
            <ChevronLast className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </motion.button>

          <motion.button
            variants={controlButtonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            onClick={() => setIsShuffle(!isShuffle)}
            className="p-2 text-primary-foreground"
          >

            <Shuffle className={`${isShuffle ? 'text-accent' : 'text-primary-foreground'} w-3 h-3 sm:w-4 sm:h-4`} />
          </motion.button>

        </div>

        {/* Timeline */}
        <div className="w-full flex items-center gap-1 sm:gap-2 md:gap-3">
          <span className="text-xs text-muted-foreground font-medium w-10">{formattedTime}</span>

          <motion.div
            className="flex-1 relative h-1 bg-accent/40 rounded-full cursor-pointer group"
            whileHover="active"
            data-progress-bar
            onClick={handleProgressChange}
            onMouseDown={handleProgressMouseDown}
            onHoverStart={() => setIsHoveredTimeline(true)}
            onHoverEnd={() => setIsHoveredTimeline(false)}
          >
            {/* Background */}
            <div className="absolute inset-0 bg-input/30 rounded-full" />

            {/* Filled portion */}
            <motion.div
              className="absolute inset-y-0 left-0 bg-linear-to-r from-accent via-accent to-accent rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            />

            {/* Thumb indicator */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-lg pointer-events-none"
              style={{ left: `${progress - 0.5}%` }}
              transition={{ type: 'decay', stiffness: 1000 }}
              animate={isHoveredTimeline || isDraggingProgress ? { opacity: 1 } : { opacity: 0 }}
            />
          </motion.div>

          <span className="text-xs text-muted-foreground font-medium w-10 text-right">4:00</span>
        </div>
      </div>

      {/* Volume Control */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="hidden md:flex items-center gap-2 md:gap-4 px-2 md:px-5 py-2 md:py-3 rounded-lg md:w-56 shrink-0"
      >
        <motion.div
          className="shrink-0"
          onClick={() => {
            if (volume === 0) {
              setVolume(prevVolume)
            } else {
              setPrevVolume(volume)
              setVolume(0)
            }


          }}
        >
          {volume === 0 ? (<VolumeX className="w-5 h-5 text-primary-foreground"
          />) : volume < 50 ? (
            <Volume1 className="w-5 h-5 text-primary-foreground" />
          ) : (
            <Volume2 className="w-5 h-5 text-primary-foreground" />
          )}
        </motion.div>

        <motion.div
          className="flex-1 relative h-1.5 bg-accent/40 rounded-full cursor-pointer group"
          whileHover="active"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          data-volume-bar
          onClick={handleVolumeChange}
          onMouseDown={handleVolumeMouseDown}
          onHoverStart={() => setIsHoveredVolume(true)}
          onHoverEnd={() => setIsHoveredVolume(false)}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-input/30 rounded-full" />

          {/* Filled portion */}
          <motion.div
            className="absolute inset-y-0 left-0 bg-linear-to-r from-accent via-accent to-accent rounded-full"
            style={{ width: `${volume}%` }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          />

          {/* Thumb indicator */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-lg pointer-events-none"
            style={{ left: `${volume - 2.5}%` }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            animate={isHoveredVolume || isDraggingVolume ? { opacity: 1 } : { opacity: 0 }}
          />
        </motion.div>

        <span className="text-xs text-muted-foreground font-medium w-6 text-right">{volume}%</span>
      </motion.div>
    </motion.div>
  );
}
