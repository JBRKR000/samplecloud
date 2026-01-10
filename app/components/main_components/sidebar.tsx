'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Music, Clock, Heart, Tag, FolderOpen, Cloud } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const menuItems = [
  { icon: Music, label: 'All Samples', href: '/dashboard', count: '4.2k' },
  { icon: Clock, label: 'Recent', href: '/recent' },
  { icon: Heart, label: 'Favorites', href: '/favorites', count: '128' },
  { icon: FolderOpen, label: 'Collections', href: '/collection' },
  { icon: Tag, label: 'Tags', href: '/tags' },
  { icon: Cloud, label: 'Cloud Storage', href: '/cloud' },
];

export default function Sidebar() {
  const pathname = usePathname();

  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.3 }
    })
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="h-screen w-56 bg-linear-to-b from-secondary via-secondary/98 to-secondary/95 border-r border-border/30 backdrop-blur-xl flex flex-col overflow-hidden"
    >
      {/* Logo */}
      <motion.div
        variants={itemVariants}
        custom={0}
        className="px-6 border-b border-border/30 h-16 flex items-center gap-2"
      >
        <Image src="/logo.ico" alt="SampleCloud Logo" width={32} height={32} className="shrink-0" />
        <motion.h1
          whileHover={{ letterSpacing: 0.05 }}
          className="text-accent font-display font-bold text-lg drop-shadow-sm"
        >
          SAMPLECLOUD
        </motion.h1>
      </motion.div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <motion.div
          variants={itemVariants}
          custom={1}
          className="text-xs uppercase tracking-wider text-accent font-medium mb-4"
        >
          Library
        </motion.div>
        
        <div className="space-y-1">
          {menuItems.slice(0, 3).map((item, i) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href);
            
            return (
              <motion.div
                key={item.href}
                variants={itemVariants}
                custom={i + 2}
              >
                <Link
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all group ${
                    isActive
                      ? 'bg-linear-to-r from-accent/20 via-accent/15 to-accent/10 text-accent shadow-lg shadow-accent/10'
                      : 'text-primary-foreground/80 hover:text-primary-foreground'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                    >
                      <Icon className={`w-5 h-5 transition-all ${
                        isActive ? 'text-accent drop-shadow-sm' : 'text-primary-foreground/70 group-hover:text-accent/80'
                      }`} />
                    </motion.div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  {item.count && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`text-xs font-semibold px-2 py-1 rounded-md transition-colors ${
                        isActive
                          ? 'bg-accent/30 text-accent'
                          : 'bg-secondary/50 text-muted-foreground/70 group-hover:text-accent/70'
                      }`}
                    >
                      {item.count}
                    </motion.span>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Organization Section */}
        <motion.div
          variants={itemVariants}
          custom={8}
          className="mt-8"
        >
          <div className="text-xs uppercase tracking-wider text-accent font-medium mb-4">Organization</div>
          
          <div className="space-y-1">
            {menuItems.slice(3, 6)
            .map((item, i) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <motion.div
                  key={item.href}
                  variants={itemVariants}
                  custom={9 + i}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-linear-to-r from-accent/20 via-accent/15 to-accent/10 text-accent shadow-lg shadow-accent/10'
                        : 'text-primary-foreground/80 hover:text-primary-foreground'
                    }`}
                  >
                    <motion.div
                      animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                    >
                      <Icon className={`w-5 h-5 transition-all ${
                        isActive ? 'text-accent drop-shadow-sm' : 'text-primary-foreground/70 hover:text-accent/80'
                      }`} />
                    </motion.div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </nav>

      {/* Storage Info */}
      <motion.div
        variants={itemVariants}
        custom={12}
        className="p-6 border-t border-border/30 bg-linear-to-r from-accent/10 via-accent/5 to-transparent h-20 md:h-24 flex flex-col justify-center"
      >
        <div className="text-xs text-muted-foreground/70 mb-2 font-medium">
          Local Storage
        </div>
        <div className="w-full bg-input/30 rounded-full h-2.5 mb-2 overflow-hidden backdrop-blur-sm">
          <motion.div
            className="bg-linear-to-r from-accent via-accent to-accent/80 h-2.5 rounded-full shadow-lg shadow-accent/40"
            initial={{ width: 0 }}
            animate={{ width: '75%' }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
        <div className="text-xs text-accent font-semibold">
          75%
        </div>
      </motion.div>
    </motion.div>
  );
}
