
import { create } from "zustand"

interface Track{
    id:number
    title:string
    audioUrl:string
    duration:number
    bpm?: number
    key?:number
    sampleRate?:string
    channels?:string
    format?:string
    fileSize?:string
    tags?:string[]
    dateAdded?:string
}

interface PlayerStore{
    currentTrack: Track | null
    isPlaying: boolean
    progress: number
    volume: number
    isFavorite: boolean


    setCurrentTrack: (track: Track | null) => void
    setIsPlaying: (playing: boolean) => void
    setProgress: (progress: number) => void
    setVolume: (volume: number) => void
    setIsFavorite: (favorite: boolean) => void
    togglePlay: () => void
}

export const usePlayerStore = create<PlayerStore>((set,get)=> ({

    currentTrack: null,
    isPlaying: false,
    progress: 0,
    volume: 80,
    isFavorite: false,

    setCurrentTrack: (track) =>set({currentTrack: track}),
    setIsPlaying: (playing) => set({isPlaying: playing}),
    setProgress: (progress) => set({progress}),
    setVolume: (volume) => set({volume}),
    setIsFavorite: (favorite) => set({isFavorite:favorite}),
    togglePlay: () => set((state)=>({isPlaying: !state.isPlaying}))

}))