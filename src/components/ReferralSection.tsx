import React from 'react';
import { Share2, Copy, ArrowRight, Gift, Coins, Users, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ReferralSection: React.FC = () => {
  const { user, storeSettings, setActiveDashboardTab, setCurrentView, addToast } = useApp();

  const referralLink = `https://basicfrance.io/?ref=${user.referralCode}`;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    addToast(`${label} copié dans le presse-papier !`, 'success');
  };

  const handleGoToDashboard = () => {
    setActiveDashboardTab('referral');
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="border-b border-[#182032] bg-gradient-to-b from-[#080a0f] via-[#0d101e] to-[#080a0f] py-8 sm:py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-[#232b45] bg-[#0c101e] p-4 sm:p-7 md:p-10 shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-10">
            
            {/* Left Column: Headline and Pitch */}
            <div className="lg:col-span-7 space-y-3.5 sm:space-y-5">
              <div className="inline-flex items-center gap-2 rounded-md border border-purple-500/20 bg-purple-500/10 px-2.5 py-0.5 sm:py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-purple-400">
                <Gift className="h-3.5 w-3.5" />
                <span>Programme Parrainage & Affiliation</span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white text-balance leading-tight">
                Gagnez {storeSettings.referralRewardPercent}% sur chaque abonnement recommandé.
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                Partagez votre lien et touchez immédiatement {storeSettings.referralRewardPercent}% de cashback sur chaque commande validée. Les gains sont directement crédités sur votre portefeuille ou utilisables sur la boutique BASIC FRANCE.
              </p>

              {/* 3 Key Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-1 sm:pt-2 text-xs">
                <div className="rounded-xl border border-[#1d263d] bg-[#090d18] p-2.5 sm:p-3 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-white text-[11px] sm:text-xs">
                    <Coins className="h-3.5 w-3.5 text-purple-400" />
                    <span>Cashback immédiat</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-slate-400">Chaque vente validée vous rapporte {storeSettings.referralRewardPercent}% instantanément.</p>
                </div>

                <div className="rounded-xl border border-[#1d263d] bg-[#090d18] p-2.5 sm:p-3 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-white text-[11px] sm:text-xs">
                    <Users className="h-3.5 w-3.5 text-blue-400" />
                    <span>Accompagnement illimité</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-slate-400">Invitez sans limite, partagez sur Discord, réseaux sociaux ou contacts directs.</p>
                </div>

                <div className="rounded-xl border border-[#1d263d] bg-[#090d18] p-3 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-white">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Paiement facile</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Versement rapide en 1 clic vers votre solde BASIC FRANCE.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Code Box & Action */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-xl border border-[#263255] bg-[#090d17] p-5 space-y-4 shadow-xl">
                
                <div className="flex items-center justify-between border-b border-[#19223a] pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Votre Code Partenaire</span>
                    <p className="font-mono text-xl font-black text-white">{user.referralCode}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(user.referralCode, 'Code parrainage')}
                    className="flex items-center gap-1.5 rounded-lg border border-[#2b3a62] bg-[#12192e] px-3 py-2 text-xs font-semibold text-white hover:bg-purple-600 hover:border-purple-500 transition-colors"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copier code</span>
                  </button>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Votre Lien de Parrainage Direct</span>
                  <div className="flex items-center gap-2 rounded-lg border border-[#1b253e] bg-[#0d1322] px-3 py-2">
                    <code className="flex-1 truncate font-mono text-xs text-purple-300">
                      {referralLink}
                    </code>
                    <button
                      onClick={() => handleCopy(referralLink, 'Lien de parrainage')}
                      className="shrink-0 p-1 text-slate-400 hover:text-white"
                      title="Copier le lien"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1 text-center">
                  <div className="rounded-lg border border-[#182136] bg-[#0b101c] p-2.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Filleuls</p>
                    <p className="font-mono text-lg font-black text-white mt-0.5 tabular-nums">
                      {user.referralCount}
                    </p>
                  </div>
                  <div className="rounded-lg border border-[#182136] bg-[#0b101c] p-2.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Commissions</p>
                    <p className="font-mono text-lg font-black text-purple-400 mt-0.5 tabular-nums">
                      {user.referralEarnings.toFixed(2)}€
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleGoToDashboard}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-3 text-xs font-bold text-white shadow-lg shadow-purple-950/40 hover:bg-purple-500 transition-colors"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Accéder à mon espace Parrainage</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
