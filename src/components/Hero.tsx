import React from 'react';
import { ShieldCheck, Zap, Users, Headphones } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BasicFranceBanner } from './BFSBrandLogo';

export const Hero: React.FC = () => {
  const { setCurrentView, setActiveDashboardTab } = useApp();

  return (
    <section className="relative overflow-hidden border-b border-[#182032] bg-gradient-to-b from-[#0a0d15] to-[#080a0f] py-4 sm:py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8">
        
        {/* Main DA Brand Showcase Banner with conversion-focused action row */}
        <BasicFranceBanner
          onShopClick={() => setCurrentView('shop')}
          onReferralClick={() => {
            setActiveDashboardTab('referral');
            setCurrentView('dashboard');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          primaryActionLabel="Voir les offres"
          secondaryActionLabel="Gagner 10% de commission"
        />

        {/* 4-Item Trust & Proof Strip */}
        <div className="mt-6 sm:mt-10 grid grid-cols-2 gap-2 sm:gap-3.5 border-t border-[#161e30] pt-6 md:grid-cols-4">
          <div className="group flex items-start gap-2.5 sm:gap-3 rounded-xl border border-[#162036]/60 bg-[#080d19]/40 p-2.5 sm:p-3 transition-all duration-300 hover:border-blue-500/30 hover:bg-[#0c1326] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-950/30">
            <div className="flex h-7.5 w-7.5 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg border border-[#1e273e] bg-[#0d1322] text-blue-400 group-hover:border-blue-500/50 group-hover:text-blue-300 group-hover:bg-[#142042] transition-all">
              <Zap className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-white group-hover:text-blue-200 transition-colors">Livraison sous 12h</p>
              <p className="text-[10.5px] sm:text-xs text-slate-400 mt-0.5 leading-snug line-clamp-2 sm:line-clamp-none">Clé et rôle Discord « Client » remis sous 12h.</p>
            </div>
          </div>

          <div className="group flex items-start gap-2.5 sm:gap-3 rounded-xl border border-[#162036]/60 bg-[#080d19]/40 p-2.5 sm:p-3 transition-all duration-300 hover:border-blue-500/30 hover:bg-[#0c1326] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-950/30">
            <div className="flex h-7.5 w-7.5 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg border border-[#1e273e] bg-[#0d1322] text-blue-400 group-hover:border-blue-500/50 group-hover:text-blue-300 group-hover:bg-[#142042] transition-all">
              <ShieldCheck className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-white group-hover:text-blue-200 transition-colors">Garantie 12 Mois</p>
              <p className="text-[10.5px] sm:text-xs text-slate-400 mt-0.5 leading-snug line-clamp-2 sm:line-clamp-none">Remplacement garanti durant toute l'adhésion.</p>
            </div>
          </div>

          <div className="group flex items-start gap-2.5 sm:gap-3 rounded-xl border border-[#162036]/60 bg-[#080d19]/40 p-2.5 sm:p-3 transition-all duration-300 hover:border-blue-500/30 hover:bg-[#0c1326] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-950/30">
            <div className="flex h-7.5 w-7.5 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg border border-[#1e273e] bg-[#0d1322] text-blue-400 group-hover:border-blue-500/50 group-hover:text-blue-300 group-hover:bg-[#142042] transition-all">
              <Users className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-white group-hover:text-blue-200 transition-colors">Communauté Discord</p>
              <p className="text-[10.5px] sm:text-xs text-slate-400 mt-0.5 leading-snug line-clamp-2 sm:line-clamp-none">Échangez avec 14 850+ membres & athlètes.</p>
            </div>
          </div>

          <div className="group flex items-start gap-2.5 sm:gap-3 rounded-xl border border-[#162036]/60 bg-[#080d19]/40 p-2.5 sm:p-3 transition-all duration-300 hover:border-blue-500/30 hover:bg-[#0c1326] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-950/30">
            <div className="flex h-7.5 w-7.5 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg border border-[#1e273e] bg-[#0d1322] text-blue-400 group-hover:border-blue-500/50 group-hover:text-blue-300 group-hover:bg-[#142042] transition-all">
              <Headphones className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-white group-hover:text-blue-200 transition-colors">Support Dédié 7j/7</p>
              <p className="text-[10.5px] sm:text-xs text-slate-400 mt-0.5 leading-snug line-clamp-2 sm:line-clamp-none">Assistance sur site et synchronisée Discord.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
