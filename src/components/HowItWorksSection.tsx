import React from 'react';
import { MousePointerClick, ShoppingBag, ShieldCheck, Key, Dumbbell } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Choisir le produit',
      desc: 'Parcourez nos pass Basic-Fit, Fitness Park ou guides d’entraînement certifiés.',
      icon: MousePointerClick
    },
    {
      num: '02',
      title: 'Ajouter au panier',
      desc: 'Sélectionnez vos options et appliquez un code promotionnel si vous en possédez un.',
      icon: ShoppingBag
    },
    {
      num: '03',
      title: 'Payer en toute sécurité',
      desc: 'Réglez par Carte Bancaire ou directement avec votre solde portefeuille BASIC.',
      icon: ShieldCheck
    },
    {
      num: '04',
      title: 'Réception automatique',
      desc: 'Le système génère votre clé d’activation et votre rôle Discord « Client » sous 12h maximum.',
      icon: Key
    },
    {
      num: '05',
      title: 'Profiter de votre accès',
      desc: 'Entrez en salle avec votre badge ou échangez avec les coachs sur notre Discord.',
      icon: Dumbbell
    }
  ];

  return (
    <section id="fonctionnement" className="border-b border-[#182032] bg-[#090c14] py-8 sm:py-14 md:py-16 scroll-mt-12">
      <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
        
        <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-blue-400">
            Processus 100% Automatisé
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white text-balance">
            Comment fonctionne la boutique BASIC FRANCE ?
          </h2>
          <p className="text-[11px] sm:text-xs md:text-sm text-slate-300">
            De la commande à votre première séance en salle, tout a été pensé pour être instantané, transparent et fiable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.num}
                className="relative rounded-xl border border-[#1b253d] bg-[#0c1220] p-3.5 sm:p-5 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg border border-[#202d4b] bg-[#10172a] text-blue-400">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <span className="font-mono text-[11px] sm:text-xs font-bold text-slate-400">
                      {st.num}
                    </span>
                  </div>

                  <h3 className="mt-2.5 sm:mt-4 text-xs sm:text-sm font-bold text-white">
                    {st.title}
                  </h3>
                  <p className="mt-1 sm:mt-2 text-[10.5px] sm:text-xs text-slate-400 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
