'use client';

import HeroSection from '@/app/components/home_components/hero_section';
import FeaturesSection from '@/app/components/home_components/features_section';
import PreauthHeader from '../components/other/preauth_header';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-primary-foreground overflow-hidden">
      <PreauthHeader />
      <HeroSection />
      <FeaturesSection />
    </div>
  );
}
