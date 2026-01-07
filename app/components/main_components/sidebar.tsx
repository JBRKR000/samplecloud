'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Music, Clock, Heart, Tag, FolderOpen, Cloud } from 'lucide-react';

const menuItems = [
  { icon: Music, label: 'All Samples', href: '/dashboard', count: '4.2k' },
  { icon: Clock, label: 'Recent', href: '/dashboard?filter=recent' },
  { icon: Heart, label: 'Favorites', href: '/dashboard?filter=favorites', count: '128' },
  { icon: FolderOpen, label: 'Collections', href: '/collection' },
  { icon: Tag, label: 'Tags', href: '/dashboard?filter=tags' },
  { icon: Cloud, label: 'Cloud Storage', href: '/dashboard?filter=cloud' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 h-screen w-48 bg-sidebar border-r border-border flex flex-col overflow-hidden">
      {/* Logo */}
      <div className="px-6 py-8 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
            <span className="text-sidebar text-sm font-bold">♪</span>
          </div>
          <h1 className="text-primary font-display font-bold text-lg">AUDIOLAB</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <div className="text-xs uppercase tracking-wider text-muted mb-4">Library</div>
        
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors group ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-primary-foreground hover:bg-secondary'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </div>
                {item.count && (
                  <span className={`text-xs font-medium ${isActive ? 'text-primary' : 'text-muted'}`}>
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Organization Section */}
        <div className="mt-8">
          <div className="text-xs uppercase tracking-wider text-muted mb-4">Organization</div>
          
          <div className="space-y-2">
            {[
              { label: 'Collections', href: '/collection', icon: FolderOpen },
              { label: 'Tags', href: '/dashboard?filter=tags', icon: Tag },
              { label: 'Cloud Storage', href: '/dashboard?filter=cloud', icon: Cloud },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-primary-foreground hover:bg-secondary'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Storage Info */}
      <div className="p-6 border-t border-border">
        <div className="text-xs text-muted mb-2">Local Storage</div>
        <div className="w-full bg-secondary rounded-full h-2 mb-2">
          <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
        </div>
        <div className="text-xs text-muted">75%</div>
      </div>
    </div>
  );
}
