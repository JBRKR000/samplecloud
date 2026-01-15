import { useEffect, useRef } from "react";

interface UseAudioPlayerProps {
    currentTrack: any;
    isPlaying: boolean;
    progress: number;
    volume: number;
    isRepeat: boolean;
    setProgress: (progress: number) => void;
    setIsPlaying: (isPlaying: boolean) => void;
    setActualDuration: (duration: number | null) => void;
}


export function usePlayer({
    currentTrack,
    isPlaying,
    progress,
    volume,
    isRepeat,
    setProgress,
    setActualDuration,
    setIsPlaying
}: UseAudioPlayerProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const isSeeking = useRef<boolean>(false);
    const lastProgress = useRef<number>(0);

    // Sync audio element with currentTrack
    useEffect(() => {
        if (!audioRef.current || !currentTrack) return;
        audioRef.current.src = currentTrack.audioUrl;
    }, [currentTrack]);

    // Handle play/pause state
    useEffect(() => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.play().catch((error) => {
                console.error("Error playing audio:", error);
            });
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    // Update volume when it changes
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume]);

    // Progress updater
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const handleTimeUpdate = () => {
            if (audio.duration && !isNaN(audio.duration) && !isSeeking.current) {
                const newProgress = (audio.currentTime / audio.duration) * 100;
                lastProgress.current = newProgress;
                setProgress(newProgress);
            }
        };
        audio.addEventListener('timeupdate', handleTimeUpdate);
        return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
    }, [setProgress]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !audio.duration || isNaN(audio.duration)) return;
        const progressDiff = Math.abs(progress - lastProgress.current);
        if (progressDiff > 0.5) {
            isSeeking.current = true;
            const newTime = (progress / 100) * audio.duration;
            audio.currentTime = newTime;
            lastProgress.current = progress;
            setTimeout(() => {
                isSeeking.current = false;
            }, 100);
        }
    }, [progress]);

    // Load actual duration of the track
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !currentTrack) return;
        const handleLoadedMetadata = () => {
            if (audio.duration && !isNaN(audio.duration)) {
                setActualDuration(Math.round(audio.duration));
            }
        };
        const handleError = () => {
            console.error('Error loading audio metadata');
        };
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('error', handleError);
        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('error', handleError);
        };
    }, [currentTrack?.audioUrl, setActualDuration]);

    useEffect(() => {
        setActualDuration(null);
    }, [currentTrack?.id, setActualDuration]);

    // Handle track end
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleEnded = () => {
            if (isRepeat) {
                audio.currentTime = 0;
                audio.play().catch((error) => {
                    console.error('Error playing audio:', error);
                });
            } else {
                setProgress(0);
                setIsPlaying(false);
            }
        };

        audio.addEventListener('ended', handleEnded);
        return () => audio.removeEventListener('ended', handleEnded);
    }, [setProgress, setIsPlaying, isRepeat]);

    return audioRef;
}