'use client';

import { Trash2, Tag, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TagType {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

interface Sample {
  id: number
  name: string
  audioUrl: string
  bpm: number | null
  createdAt: Date
  key: string | null
  time: number
  type: 'LOOP' | 'ONE_SHOT'
  updatedAt: Date
  tags: TagType[]
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

export default function TagsView() {
  const [tags, setTags] = useState<TagType[]>([]);
  const [samples, setSamples] = useState<Sample[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTagName, setNewTagName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [selectedSampleId, setSelectedSampleId] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [tagsRes, samplesRes] = await Promise.all([
        fetch('/api/tags').then(r => r.json()),
        fetch('/api/samples').then(r => r.json())
      ]);
      setTags(tagsRes || []);
      setSamples(samplesRes || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
      setTags([]);
      setSamples([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagName.trim()) return;

    try {
      setIsCreating(true);
      const response = await fetch('/api/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newTagName })
      });

      if (response.ok) {
        const newTag = await response.json();
        setTags([...tags, newTag]);
        setNewTagName('');
        setError(null);
      } else {
        setError('Failed to create tag');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create tag');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteTag = async (tagId: number) => {
    try {
      const response = await fetch('/api/tags', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: tagId })
      });

      if (response.ok) {
        setTags(tags.filter(t => t.id !== tagId));
        setError(null);
      } else {
        setError('Failed to delete tag');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete tag');
    }
  };

  const handleAddTagToSample = async (sampleId: number, tagId: number) => {
    try {
      const response = await fetch('/api/tags/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sampleId, tagId })
      });

      if (response.ok) {
        const updatedSample = await response.json();
        setSamples(samples.map(s => s.id === sampleId ? updatedSample : s));
        setError(null);
      } else {
        setError('Failed to add tag to sample');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add tag to sample');
    }
  };

  const handleRemoveTagFromSample = async (sampleId: number, tagId: number) => {
    try {
      const response = await fetch('/api/tags/assign', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sampleId, tagId })
      });

      if (response.ok) {
        const updatedSample = await response.json();
        setSamples(samples.map(s => s.id === sampleId ? updatedSample : s));
        setError(null);
      } else {
        setError('Failed to remove tag from sample');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove tag from sample');
    }
  };

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-linear-to-b from-secondary via-secondary/98 to-secondary/95">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
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
        <motion.h1 variants={rowVariants} className="text-2xl font-bold text-primary-foreground mb-4">
          Manage Tags
        </motion.h1>

        {/* Create Tag Form */}
        <motion.form
          variants={rowVariants}
          onSubmit={handleCreateTag}
          className="flex gap-2 mb-4"
        >
          <input
            type="text"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            placeholder="Enter tag name..."
            disabled={isCreating}
            className="flex-1 px-3 py-2 rounded-lg bg-accent/10 border border-accent/30 text-primary-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-accent/60 transition-colors disabled:opacity-50"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isCreating || !newTagName.trim()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/20 border border-accent/30 text-accent hover:bg-accent/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            <Plus className="w-4 h-4" />
            Create
          </motion.button>
        </motion.form>

        {/* Error Message */}
        {error && (
          <motion.div
            variants={rowVariants}
            className="px-3 py-2 rounded-lg bg-destructive/15 border border-destructive/30 text-destructive text-sm"
          >
            {error}
          </motion.div>
        )}
      </div>

      {/* Content Container */}
      <div className="flex-1 overflow-hidden flex gap-4 px-6 py-4">
        {/* Tags List */}
        <div className="w-1/3 flex flex-col border border-border/30 rounded-lg overflow-hidden bg-secondary/50">
          <div className="px-4 py-3 border-b border-border/30 bg-secondary/80">
            <h2 className="text-sm font-semibold text-muted-foreground/70 uppercase tracking-widest">
              Tags ({tags.length})
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto space-y-1 p-3">
            {tags.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground/50">
                No tags created yet
              </div>
            ) : (
              tags.map((tag) => (
                <motion.div
                  key={tag.id}
                  variants={rowVariants}
                  className="group flex items-center justify-between gap-2 px-3 py-2 rounded-lg hover:bg-accent/10 transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <Tag className="w-4 h-4 text-accent/70 shrink-0" />
                    <span className="text-sm text-primary-foreground truncate font-medium">
                      {tag.name}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDeleteTag(tag.id)}
                    className="w-6 h-6 flex items-center justify-center rounded opacity-0 group-hover:opacity-100 text-destructive/60 hover:text-destructive hover:bg-destructive/10 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Samples List */}
        <div className="w-2/3 flex flex-col border border-border/30 rounded-lg overflow-hidden bg-secondary/50">
          <div className="px-4 py-3 border-b border-border/30 bg-secondary/80">
            <h2 className="text-sm font-semibold text-muted-foreground/70 uppercase tracking-widest">
              Samples ({samples.length})
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="px-4 py-3 space-y-2">
              {samples.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground/50">
                  No samples found
                </div>
              ) : (
                samples.map((sample) => (
                  <motion.div
                    key={sample.id}
                    variants={rowVariants}
                    className="flex flex-col gap-2 px-3 py-2 rounded-lg hover:bg-accent/5 transition-colors border border-border/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-accent/20 flex items-center justify-center text-xs font-semibold text-accent/70">
                        {sample.id}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-primary-foreground font-medium truncate">
                          {sample.name}
                        </div>
                        <div className="text-xs text-muted-foreground/60 flex gap-2">
                          <span>{sample.type}</span>
                          {sample.bpm && <span>{sample.bpm} BPM</span>}
                          {sample.key && <span>{sample.key}</span>}
                        </div>
                      </div>
                    </div>
                    
                    {/* Tags section */}
                    <div className="flex flex-wrap gap-2 items-center">
                      {sample.tags.map((tag) => (
                        <motion.div
                          key={tag.id}
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-accent/20 border border-accent/40 text-accent/90"
                        >
                          <span>{tag.name}</span>
                          <button
                            onClick={() => handleRemoveTagFromSample(sample.id, tag.id)}
                            className="ml-0.5 hover:text-accent/70 transition-colors"
                          >
                            ×
                          </button>
                        </motion.div>
                      ))}
                      
                      {/* Add tag button - dropdown */}
                      {selectedSampleId === sample.id ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex flex-wrap gap-1"
                        >
                          {tags
                            .filter(tag => !sample.tags.some(st => st.id === tag.id))
                            .map((tag) => (
                              <motion.button
                                key={tag.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                  handleAddTagToSample(sample.id, tag.id);
                                  setSelectedSampleId(null);
                                }}
                                className="px-2 py-1 rounded text-xs bg-success/20 border border-success/40 text-success/90 hover:bg-success/30 transition-colors"
                              >
                                + {tag.name}
                              </motion.button>
                            ))}
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedSampleId(null)}
                            className="px-2 py-1 rounded text-xs bg-muted-foreground/20 border border-muted-foreground/40 text-muted-foreground/90 hover:bg-muted-foreground/30 transition-colors"
                          >
                            ✕
                          </motion.button>
                        </motion.div>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedSampleId(sample.id)}
                          className="w-6 h-6 rounded flex items-center justify-center text-accent/60 hover:text-accent hover:bg-accent/10 transition-colors text-lg"
                        >
                          +
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <motion.div
        variants={rowVariants}
        className="shrink-0 px-6 py-4 border-t border-border/30 bg-secondary/50 text-xs text-muted-foreground/60"
      >
        Total: {tags.length} tags and {samples.length} samples
      </motion.div>
    </motion.div>
  );
}
