import React, { useState, useEffect } from 'react';
import { ShoppingBag, User, Shield, MessageSquare, Menu, X, ExternalLink, Wallet } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BFSLogo, BFSBrandLockup } from './BFSBrandLogo';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartCount,
    setIsCartOpen,
    isAdminMode,
    setIsAdminMode,
    user,
    storeSettings,
    setSelectedCategoryFilter,
    activeDashboardTab,
    setActiveDashboardTab
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on Escape
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navigateTo = (view: 'home' | 'shop' | 'dashboard' | 'admin' | 'support', category = 'all') => {
    setSelectedCategoryFilter(category);
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1b2234] bg-[#080a0f]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 sm:h-16 md:h-18 max-w-7xl items-center justify-between px-3.5 sm:px-6 lg:px-8">
        
        {/* Zone 1: BFS Logo + Luxury Brand Wordmark */}
        <BFSBrandLockup
          size="md"
          onClick={() => navigateTo('home')}
        />

        {/* Zone 2: Simplified navigation to prioritize core conversion path */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => navigateTo('home')}
            className={`relative py-1.5 whitespace-nowrap transition-all duration-200 hover:text-white cursor-pointer ${
              currentView === 'home'
                ? 'text-white font-bold after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-5 after:bg-blue-500 after:rounded-full'
                : 'text-slate-400'
            }`}
          >
            Accueil
          </button>
          <button
            onClick={() => navigateTo('shop', 'all')}
            className={`relative py-1.5 whitespace-nowrap transition-all duration-200 hover:text-white cursor-pointer ${
              currentView === 'shop'
                ? 'text-white font-bold after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-5 after:bg-blue-500 after:rounded-full'
                : 'text-slate-400'
            }`}
          >
            Boutique
          </button>
          <button
            onClick={() => {
              setActiveDashboardTab('referral');
              setCurrentView('dashboard');
              setMobileMenuOpen(false);
            }}
            className={`relative py-1.5 inline-flex items-center gap-2 whitespace-nowrap transition-all duration-200 hover:text-white cursor-pointer ${
              currentView === 'dashboard' && activeDashboardTab === 'referral'
                ? 'text-white font-bold after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-5 after:bg-purple-500 after:rounded-full'
                : 'text-slate-400'
            }`}
          >
            <span>Parrainage</span>
            <span className="rounded-full border border-purple-500/30 bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-2 py-0.5 text-[10px] font-bold text-purple-300">
              10% Cash
            </span>
          </button>
          <button
            onClick={() => navigateTo('support')}
            className={`relative py-1.5 whitespace-nowrap transition-all duration-200 hover:text-white cursor-pointer ${
              currentView === 'support'
                ? 'text-white font-bold after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-5 after:bg-blue-500 after:rounded-full'
                : 'text-slate-400'
            }`}
          >
            Support
          </button>
        </nav>

        {/* Zone 3: Actions (Discord, Compte, Panier, Admin switch) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Admin toggle badge */}
          <button
            onClick={() => {
              const next = !isAdminMode;
              setIsAdminMode(next);
              if (next) setCurrentView('admin');
              else if (currentView === 'admin') setCurrentView('home');
            }}
            title="Basculer entre vue Client et vue Administrateur"
            className={`hidden sm:flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-semibold transition-all ${
              isAdminMode
                ? 'border-amber-500/50 bg-amber-500/10 text-amber-300'
                : 'border-[#1e2a47] bg-[#0e1322] text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <Shield className="h-3.5 w-3.5" />
            <span>{isAdminMode ? 'Mode Admin' : 'Admin'}</span>
          </button>

          {/* Discord CTA */}
          <a
            href={storeSettings.discordInviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 rounded-md border border-[#2b3a67] bg-[#121a30] px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-[#3b82f6] hover:text-white"
          >
            <span className="text-[#5865f2] font-bold">Discord</span>
            <ExternalLink className="h-3 w-3 text-slate-400" />
          </a>

          {/* User Account & Direct Wallet Access */}
          <div className="flex items-center rounded-md border border-[#1b2234] bg-[#0c101b] divide-x divide-[#1b2234] overflow-hidden">
            <button
              onClick={() => {
                setActiveDashboardTab('wallet');
                setCurrentView('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              title="Accéder directement à votre portefeuille"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                currentView === 'dashboard' && activeDashboardTab === 'wallet'
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'text-emerald-400 hover:bg-[#121c32] hover:text-emerald-300'
              }`}
            >
              <Wallet className="h-3.5 w-3.5" />
              <span className="font-mono text-[11px] tabular-nums">
                {user.walletBalance.toFixed(2)}€
              </span>
            </button>
            <button
              onClick={() => {
                setActiveDashboardTab('purchases');
                setCurrentView('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              title="Mon Espace Client & Licences"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                currentView === 'dashboard' && activeDashboardTab !== 'wallet'
                  ? 'bg-[#101b33] text-white'
                  : 'text-slate-300 hover:bg-[#121c32] hover:text-white'
              }`}
            >
              <User className="h-3.5 w-3.5 text-blue-400" />
              <span className="hidden md:inline">Mon Espace</span>
            </button>
          </div>

          {/* Cart Trigger Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center justify-center rounded-md border border-[#1b2234] bg-[#0c101b] p-2 text-slate-200 transition-all duration-200 hover:border-[#3b82f6] hover:text-white hover:shadow-lg hover:shadow-blue-950/40 active:scale-95 cursor-pointer"
            aria-label="Voir le panier"
          >
            <ShoppingBag className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-[#2563eb] px-1 text-[10px] font-bold text-white shadow-md shadow-blue-900/40 animate-scale-in">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden rounded-md border border-[#1b2234] bg-[#0c101b] p-2 text-slate-300 hover:text-white"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-18 z-[-1] bg-black/60 backdrop-blur-sm md:hidden cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-10 md:hidden border-t border-[#1b2234] bg-[#090c13] px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <button
              onClick={() => navigateTo('home')}
              className="rounded-md border border-[#1e2436] bg-[#0e1320] p-2.5 text-left font-medium text-slate-200 hover:text-white"
            >
              Accueil
            </button>
            <button
              onClick={() => navigateTo('shop', 'all')}
              className="rounded-md border border-[#1e2436] bg-[#0e1320] p-2.5 text-left font-medium text-slate-200 hover:text-white"
            >
              Tous les Produits
            </button>
            <button
              onClick={() => {
                setActiveDashboardTab('referral');
                setCurrentView('dashboard');
                setMobileMenuOpen(false);
              }}
              className="rounded-md border border-[#1e2436] bg-[#0e1320] p-2.5 text-left font-medium text-purple-300 hover:text-white"
            >
              Parrainage (10%)
            </button>
            <button
              onClick={() => {
                setActiveDashboardTab('wallet');
                setCurrentView('dashboard');
                setMobileMenuOpen(false);
              }}
              className="rounded-md border border-[#1e2436] bg-[#0e1320] p-2.5 text-left font-medium text-emerald-300 hover:text-white flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <Wallet className="h-3.5 w-3.5" />
                <span>Portefeuille</span>
              </span>
              <span className="font-mono text-xs">{user.walletBalance.toFixed(2)}€</span>
            </button>
            <button
              onClick={() => {
                setActiveDashboardTab('purchases');
                setCurrentView('dashboard');
                setMobileMenuOpen(false);
              }}
              className="rounded-md border border-[#1e2436] bg-[#0e1320] p-2.5 text-left font-medium text-slate-200 hover:text-white"
            >
              Mes Licences & Clés
            </button>
            <button
              onClick={() => navigateTo('support')}
              className="col-span-2 rounded-md border border-[#1e2436] bg-[#0e1320] p-2.5 text-left font-medium text-slate-200 hover:text-white"
            >
              Support Tickets
            </button>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-[#1b2234]">
            <button
              onClick={() => {
                setIsAdminMode(!isAdminMode);
                setMobileMenuOpen(false);
                if (!isAdminMode) setCurrentView('admin');
              }}
              className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              <Shield className="h-3.5 w-3.5 text-amber-400" />
              <span>{isAdminMode ? 'Quitter Mode Admin' : 'Activer Mode Admin'}</span>
            </button>
            <a
              href={storeSettings.discordInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-semibold text-[#5865f2]"
            >
              Rejoindre Discord
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </>
      )}
    </header>
  );
};
