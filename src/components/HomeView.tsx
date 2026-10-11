import React from 'react';
import { Flame } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Hero } from './Hero';
import { ProductCard } from './ProductCard';
import { ReferralSection } from './ReferralSection';
import { HowItWorksSection } from './HowItWorksSection';
import { DiscordSection } from './DiscordSection';

export const HomeView: React.FC = () => {
  const { products } = useApp();

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Featured Products Section */}
      <section id="boutique" className="mx-auto max-w-7xl px-3.5 py-8 sm:py-12 sm:px-6 lg:px-8 space-y-6 scroll-mt-12">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#182136] pb-4 sm:pb-6">
          <div>
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase text-blue-400">
              <Flame className="h-3.5 w-3.5" />
              <span>Nos 2 Abonnements 12 Mois</span>
              <span aria-hidden="true">·</span>
              <span>Livraison sous 12h</span>
            </div>
            <h2 className="mt-1 text-xl sm:text-2xl md:text-3xl font-black text-white">
              Les Abonnements Officiels BASIC FRANCE
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-300">
              Choisissez votre formule annuelle : Basic-Fit Premium ou Fitness Park 12 Mois à 60€.
            </p>
          </div>
        </div>

        {/* 2-Column Grid with tighter mobile gap */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-4 sm:gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </section>

      {/* 3. Section Parrainage & Affiliation */}
      <ReferralSection />

      {/* 4. Section Fonctionnement */}
      <HowItWorksSection />

      {/* 5. Section Discord */}
      <DiscordSection />
    </div>
  );
};
