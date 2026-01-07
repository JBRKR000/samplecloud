'use client';

import { signOut } from "@/app/(lib)/services/auth/auth-client";
import { useRouter } from "next/navigation";
import { Play, MoreVertical } from 'lucide-react';

interface Sample {
  id: string;
  name: string;
  type: 'LOOP' | 'ONE-SHOT';
  bpm?: string;
  key?: string;
  duration: string;
}

const samples: Sample[] = [
  { id: '1', name: 'Synthesizer_Pluck_Cmin_124.wav', type: 'LOOP', bpm: '124', key: 'Cm', duration: '4.0s' },
  { id: '2', name: 'Kick_Drum_Punchy_Analog.wav', type: 'ONE-SHOT', duration: '0.4s' },
  { id: '3', name: 'Atmosphere_Texture_Dark_Ethereal.wav', type: 'LOOP', bpm: '90', key: 'Am', duration: '12.0s' },
  { id: '4', name: 'HiHat_Closed_Trap_Clean.wav', type: 'ONE-SHOT', duration: '0.1s' },
  { id: '5', name: 'Bass_Reese_Distorted_F.wav', type: 'LOOP', bpm: '140', key: 'Fm', duration: '8.0s' },
  { id: '6', name: 'Vocals_Chop_SoulfulHook.wav', type: 'LOOP', bpm: '88', key: 'Eb', duration: '6.2s' },
  { id: '7', name: 'Snare_Clap_Layer_Wet.wav', type: 'ONE-SHOT', duration: '0.3s' },
  { id: '8', name: 'FX_Riser_WhiteNoise_Long.wav', type: 'ONE-SHOT', duration: '4.0s' },
  { id: '9', name: 'Percussion_Bongo_Rhythm.wav', type: 'LOOP', bpm: '110', duration: '2.0s' },
  { id: '10', name: 'Pad_Warm_Analog_Chord.wav', type: 'LOOP', bpm: '95', key: 'Gm', duration: '8.0s' },
];

export default function DashboardPage() {
  const router = useRouter();

  const handlleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary-foreground mb-2">All Samples</h1>
        <p className="text-muted text-sm">Browse and manage all your audio samples</p>
      </div>

      {/* Samples Table */}
      <div className="bg-card rounded-lg overflow-hidden border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-muted font-medium">Name</th>
              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-muted font-medium">Type</th>
              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-muted font-medium">BPM</th>
              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-muted font-medium">Key</th>
              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-muted font-medium">Duration</th>
              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-muted font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {samples.map((sample, idx) => (
              <tr 
                key={sample.id} 
                className={`border-b border-border hover:bg-secondary/50 transition-colors ${
                  idx === 0 ? 'bg-primary/5' : ''
                }`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button className="p-2 rounded-lg hover:bg-primary/10 transition-colors">
                      <Play className="w-4 h-4 text-primary fill-primary" />
                    </button>
                    <span className="text-primary-foreground font-medium">{sample.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded text-xs font-medium ${
                    sample.type === 'LOOP' 
                      ? 'bg-accent/20 text-accent' 
                      : 'bg-success/20 text-success'
                  }`}>
                    {sample.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-primary-foreground">{sample.bpm || '-'}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={sample.key ? 'text-accent font-medium' : 'text-muted'}>
                    {sample.key || '-'}
                  </span>
                </td>
                <td className="px-6 py-4 text-muted">{sample.duration}</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted hover:text-primary-foreground">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sign Out Button */}
      <button 
        onClick={handlleSignOut}
        className="px-4 py-2 bg-destructive hover:bg-destructive/90 text-white rounded-lg transition-colors text-sm"
      >
        Sign Out
      </button>
    </div>
  );
}