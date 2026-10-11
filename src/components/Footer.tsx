import React from 'react';
import { ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BFSLogo } from './BFSBrandLogo';

export const Footer: React.FC = () => {
  const {
    setCurrentView,
    setSelectedCategoryFilter,
    storeSettings,
    openLegalModal,
    setActiveDashboardTab,
    user,
    userDeliveries,
    products,
    openProductModal,
    cartCount,
    setIsCartOpen,
    addToast
  } = useApp();

  const handleNav = (view: any, cat = 'all') => {
    setSelectedCategoryFilter(cat);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDashboardNav = (tab: 'profile' | 'purchases' | 'orders' | 'wallet' | 'referral' | 'support') => {
    setActiveDashboardTab(tab);
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const basicFitProduct = products.find(
    (p) => p.categoryId === 'basic-fit' || p.id.includes('bf') || p.name.includes('Basic-Fit')
  );
  const fitnessParkProduct = products.find(
    (p) => p.categoryId === 'fitness-park' || p.id.includes('fp') || p.name.includes('Fitness Park')
  );

  const handleOpenProduct = (product: any) => {
    if (product) {
      setCurrentView('shop');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      openProductModal(product);
    } else {
      handleNav('shop', 'all');
    }
  };

  return (
    <footer className="border-t border-[#182136] bg-[#07090f] text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <BFSLogo size="sm" />
              <span className="font-luxury text-sm font-black italic tracking-[0.20em] uppercase text-white">
                {storeSettings.storeName}
              </span>
            </div>

            <p className="max-w-sm text-xs leading-relaxed text-slate-400">
              Plateforme e-commerce digitale et communauté Discord dédiée aux passionnés de fitness en France. Délivrance numérique automatisée, clés d’accès sécurisées et support réactif.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Paiements chiffrés · Zéro conservation de données bancaires</span>
            </div>
          </div>

          {/* Boutique Navigation */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-white text-[11px] flex items-center justify-between max-w-[210px]">
              <span>Boutique</span>
              <span className="text-[10px] text-blue-400 font-mono font-normal">Sous 12h</span>
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('shop', 'all')}
                  className="hover:text-white transition-colors text-left flex items-center justify-between w-full max-w-[210px] cursor-pointer group"
                >
                  <span className="group-hover:text-white transition-colors">Tous les abonnements</span>
                  <span className="font-mono text-[10px] text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20 group-hover:border-blue-400/40">
                    {products.length} offres
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleOpenProduct(basicFitProduct)}
                  className="hover:text-white transition-colors text-left flex items-center justify-between w-full max-w-[210px] cursor-pointer group"
                  title="Ouvrir directement la fiche Basic-Fit Premium 12 Mois"
                >
                  <span className="group-hover:text-white transition-colors truncate pr-1">Basic-Fit 12 Mois</span>
                  <span className="font-mono text-[10px] text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded border border-orange-500/20 group-hover:border-orange-400/40 shrink-0">
                    {basicFitProduct ? `${basicFitProduct.price.toFixed(0)}€` : '40€'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleOpenProduct(fitnessParkProduct)}
                  className="hover:text-white transition-colors text-left flex items-center justify-between w-full max-w-[210px] cursor-pointer group"
                  title="Ouvrir directement la fiche Fitness Park 12 Mois"
                >
                  <span className="group-hover:text-white transition-colors truncate pr-1">Fitness Park 12 Mois</span>
                  <span className="font-mono text-[10px] text-yellow-400 bg-yellow-500/10 px-1.5 py-0.5 rounded border border-yellow-500/20 group-hover:border-yellow-400/40 shrink-0">
                    {fitnessParkProduct ? `${fitnessParkProduct.price.toFixed(0)}€` : '60€'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  className="hover:text-white transition-colors text-left flex items-center justify-between w-full max-w-[210px] cursor-pointer group"
                  title="Consulter et gérer le panier d'achat"
                >
                  <span className="group-hover:text-white transition-colors">Mon Panier en direct</span>
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.5 rounded border transition-colors shrink-0 ${
                      cartCount > 0
                        ? 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30 font-bold group-hover:border-emerald-400'
                        : 'text-slate-400 bg-slate-800/40 border-slate-700/40'
                    }`}
                  >
                    {cartCount} {cartCount > 1 ? 'articles' : 'article'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText('BASIC10');
                    addToast('Code promo BASIC10 copié (-10% sur votre commande) !', 'success');
                  }}
                  className="hover:text-white transition-colors text-left flex items-center justify-between w-full max-w-[210px] cursor-pointer group"
                  title="Copier le code promo de réduction"
                >
                  <span className="group-hover:text-white transition-colors">Code Promo : BASIC10</span>
                  <span className="text-[10px] text-purple-400 font-bold bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20 group-hover:border-purple-400/40 shrink-0">
                    -10%
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentView('home');
                    setTimeout(() => {
                      const el = document.getElementById('fonctionnement');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        window.scrollTo({ top: 1200, behavior: 'smooth' });
                      }
                    }, 80);
                  }}
                  className="hover:text-white transition-colors text-left flex items-center justify-between w-full max-w-[210px] cursor-pointer group"
                  title="Processus de délivrance numérique automatisé sous 12h"
                >
                  <span className="group-hover:text-white transition-colors">Livraison sous 12h</span>
                  <span className="text-[10px] text-emerald-400 font-mono font-medium">
                    Garantie
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Communauté & Compte */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-white text-[11px] flex items-center justify-between max-w-[210px]">
              <span>Communauté</span>
              <span className="text-[10px] text-[#5865f2] font-mono font-normal">Discord</span>
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={storeSettings.discordInviteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5 text-[#5865f2] font-medium"
                >
                  Serveur Discord ({storeSettings.discordServerMembers.toLocaleString('fr-FR')} membres)
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleDashboardNav('wallet')}
                  className="hover:text-white transition-colors text-left flex items-center justify-between w-full max-w-[210px] cursor-pointer group"
                >
                  <span className="group-hover:text-white transition-colors">Portefeuille & Crédits</span>
                  <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 group-hover:border-emerald-400/40">
                    {user.walletBalance.toFixed(2)}€
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleDashboardNav('purchases')}
                  className="hover:text-white transition-colors text-left flex items-center justify-between w-full max-w-[210px] cursor-pointer group"
                >
                  <span className="group-hover:text-white transition-colors">Mes Achats & Licences</span>
                  <span className="font-mono text-[10px] text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20 group-hover:border-blue-400/40">
                    {userDeliveries.length}
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleDashboardNav('orders')}
                  className="hover:text-white transition-colors text-left flex items-center justify-between w-full max-w-[210px] cursor-pointer group"
                >
                  <span className="group-hover:text-white transition-colors">Historique Commandes</span>
                  <span className="font-mono text-[10px] text-slate-400 bg-slate-800/40 px-1.5 py-0.5 rounded border border-slate-700/40 group-hover:text-slate-200">
                    Suivi
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleDashboardNav('referral')}
                  className="hover:text-white transition-colors text-left flex items-center justify-between w-full max-w-[210px] cursor-pointer group"
                >
                  <span className="group-hover:text-white transition-colors">Programme Parrainage</span>
                  <span className="text-[10px] text-purple-400 font-bold bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20 group-hover:border-purple-400/40">
                    10%
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('support')}
                  className="hover:text-white transition-colors text-left flex items-center justify-between w-full max-w-[210px] cursor-pointer group"
                >
                  <span className="group-hover:text-white transition-colors">Centre d’Aide & Support</span>
                  <span className="text-[10px] text-blue-400 font-mono">
                    24/7
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Légal & Conformité */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-white text-[11px]">Légal & Conformité</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => openLegalModal('cgv')}
                  className="hover:text-white transition-colors text-left"
                >
                  Conditions Générales de Vente
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openLegalModal('refund')}
                  className="hover:text-white transition-colors text-left"
                >
                  Politique de Remboursement
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openLegalModal('privacy')}
                  className="hover:text-white transition-colors text-left"
                >
                  Protection des Données (RGPD)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openLegalModal('mentions')}
                  className="hover:text-white transition-colors text-left"
                >
                  Mentions Légales
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-[#151c2d] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© 2026 {storeSettings.storeName}. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <span>Délivrance Numérique Sécurisée</span>
            <span aria-hidden="true">·</span>
            <span>Made for BASIC FRANCE Community</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
