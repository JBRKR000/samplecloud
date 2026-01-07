'use client';

import { signOut } from "@/app/(lib)/services/auth/auth-client";
import { useRouter } from "next/navigation";
import { FolderPlus, MoreVertical, Trash2 } from 'lucide-react';

interface Collection {
  id: string;
  name: string;
  count: number;
  lastModified: string;
}

const collections: Collection[] = [
  { id: '1', name: 'Hip-Hop Essentials', count: 45, lastModified: '2 days ago' },
  { id: '2', name: 'Synth Pack Vol.1', count: 28, lastModified: '1 week ago' },
  { id: '3', name: 'Ambient & Pads', count: 52, lastModified: '3 days ago' },
  { id: '4', name: 'Drum Kits', count: 89, lastModified: '5 days ago' },
  { id: '5', name: 'Vocal Chops', count: 34, lastModified: '1 week ago' },
  { id: '6', name: 'Sound Effects', count: 156, lastModified: '2 weeks ago' },
];

export default function CollectionPage() {
  const router = useRouter();

  const handlleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-foreground mb-2">Collections</h1>
          <p className="text-muted text-sm">Organize your samples into custom collections</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-sidebar rounded-lg font-medium transition-colors">
          <FolderPlus className="w-5 h-5" />
          New Collection
        </button>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {collections.map((collection) => (
          <div
            key={collection.id}
            className="bg-card hover:bg-secondary/50 border border-border rounded-lg p-6 transition-colors group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <FolderPlus className="w-6 h-6 text-primary" />
              </div>
              <button className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-background transition-all">
                <MoreVertical className="w-4 h-4 text-primary-foreground" />
              </button>
            </div>

            <h3 className="text-lg font-medium text-primary-foreground mb-2">{collection.name}</h3>
            <p className="text-sm text-muted mb-4">{collection.count} samples</p>
            <div className="text-xs text-muted">Modified {collection.lastModified}</div>
          </div>
        ))}
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