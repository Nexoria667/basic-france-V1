import React from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { Zap, ShieldCheck, Sparkles, Filter, Star, MessageSquareQuote, TrendingUp, CheckCircle2 } from 'lucide-react';

export const ShopCatalog: React.FC = () => {
  const { products, selectedCategoryFilter, setSelectedCategoryFilter } = useApp();

  const filteredProducts = products.filter((p) => {
    if (!selectedCategoryFilter || selectedCategoryFilter === 'all') return true;
    return p.categoryId === selectedCategoryFilter || p.id.includes(selectedCategoryFilter === 'basic-fit' ? 'bf' : 'fp');
  });

  const trustStats = [
    { label: 'Membres actifs', value: '14 850+' },
    { label: 'Commandes validées', value: '2 300+' },
    { label: 'Note moyenne', value: '4.9/5' },
    { label: 'Livraison', value: '12h max' }
  ];

  const proofPoints = [
    { icon: CheckCircle2, title: 'Paiement sécurisé', text: 'Validation rapide, chiffrement et contrôle humain sur chaque commande.' },
    { icon: TrendingUp, title: 'Offres premium', text: 'Sélection des meilleurs pass nationaux avec accès complet et garantie.' },
    { icon: MessageSquareQuote, title: 'Support réactif', text: 'Assistance Discord et site pour résoudre tout souci sous 24h.' },
    { icon: ShieldCheck, title: 'Garantie claire', text: 'Remboursement et suivi par l’équipe BASIC FRANCE après achat.' }
  ];

  const testimonials = [
    { name: 'Nicolas M.', text: 'Très rapide. J’ai reçu la clé en moins de 6h et le rôle Discord a été ajouté instantanément.', rating: 5 },
    { name: 'Sofia L.', text: 'Le choix est clair, la boutique est propre, et le support est bien plus sérieux que sur les marchés classiques.', rating: 5 },
    { name: 'Kevin D.', text: 'J’ai pris le pass Fitness Park 12 mois. Le tout était bien détaillé et parfaitement fluide.', rating: 5 }
  ];

  return (
    <div className="mx-auto max-w-7xl px-3.5 py-6 sm:py-10 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
      
      {/* Title & Introduction with DA Glow Header */}
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-[#212c49] bg-gradient-to-r from-[#0d1326] via-[#080b16] to-[#0d152a] p-5 sm:p-8 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />
        
        {/* Subtle grid backdrop */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative z-10 max-w-2xl space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-0.5 sm:px-3.5 sm:py-1 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>Catalogue Officiel BASIC FRANCE</span>
            <span aria-hidden="true">·</span>
            <span>Sous 12h</span>
          </div>
          
          <h1 className="font-luxury font-black italic tracking-wider text-xl sm:text-3xl md:text-4xl text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Boutique Officielle
          </h1>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 sm:pt-2 text-[11px] sm:text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Zap className="h-3.5 w-3.5 text-blue-400" />
              Livraison sous 12h garantie
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              Accès 100% Officiels & Nationaux
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {trustStats.map((item) => (
            <div key={item.label} className="rounded-xl border border-[#1d273f] bg-[#0b101d] px-4 py-3">
              <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400">{item.label}</div>
              <div className="mt-2 text-xl font-black text-white">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Purchase journey steps */}
      <div className="grid gap-3 md:grid-cols-3">
        {[
          { step: '1', title: 'Choisissez votre offre', text: 'Sélectionnez Basic-Fit ou Fitness Park selon votre besoin.' },
          { step: '2', title: 'Payez en toute sécurité', text: 'Carte bancaire ou portefeuille BASIC. Paiement chiffré et rapide.' },
          { step: '3', title: 'Recevez l’accès', text: 'Clé, rôle Discord et accès activés sous 12h maximum.' }
        ].map((item) => (
          <div key={item.step} className="rounded-2xl border border-[#1b253e] bg-[#0b101d] p-4 sm:p-5">
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 text-sm font-black text-blue-300">
              {item.step}
            </div>
            <h3 className="text-sm font-bold text-white">{item.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        {proofPoints.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-2xl border border-[#1d273f] bg-[#0b101d] p-4 sm:p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-[#243356] bg-[#121a2d] text-blue-300">
              <Icon className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-bold text-white">{title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">{text}</p>
          </div>
        ))}
      </div>

      {/* Filter Tabs & Counter */}
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1b253e] pb-3 sm:pb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-400" />
            <span className="font-luxury text-[11px] sm:text-xs font-black uppercase tracking-widest text-slate-300">
              Filtrer par Enseigne
            </span>
          </div>

          {/* Smooth Filter Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedCategoryFilter('all')}
              className={`rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-bold transition-all duration-200 cursor-pointer ${
                !selectedCategoryFilter || selectedCategoryFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40 border border-blue-400'
                  : 'bg-[#0f1526] text-slate-400 hover:text-white border border-[#1e2a47]'
              }`}
            >
              Tous ({products.length})
            </button>

            <button
              onClick={() => setSelectedCategoryFilter('basic-fit')}
              className={`flex items-center gap-1.5 sm:gap-2 rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-bold transition-all duration-200 cursor-pointer ${
                selectedCategoryFilter === 'basic-fit'
                  ? 'bg-[#1f120c] text-orange-400 border border-orange-500 shadow-lg shadow-orange-950/40'
                  : 'bg-[#0f1526] text-slate-400 hover:text-white border border-[#1e2a47]'
              }`}
            >
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-orange-500"></span>
              <span>Basic-Fit (40€)</span>
            </button>

            <button
              onClick={() => setSelectedCategoryFilter('fitness-park')}
              className={`flex items-center gap-1.5 sm:gap-2 rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-bold transition-all duration-200 cursor-pointer ${
                selectedCategoryFilter === 'fitness-park'
                  ? 'bg-[#18180a] text-yellow-400 border border-yellow-500 shadow-lg shadow-yellow-950/40'
                  : 'bg-[#0f1526] text-slate-400 hover:text-white border border-[#1e2a47]'
              }`}
            >
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-yellow-400"></span>
              <span>Fitness Park (60€)</span>
            </button>
          </div>
        </div>

        {/* Product Cards Grid with tighter mobile gap */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-4 sm:gap-6 md:gap-8 pt-1 sm:pt-2">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-[#1d273f] bg-[#0b101d] p-5 sm:p-7">
        <div className="mb-5 flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-slate-300">
          <Star className="h-3.5 w-3.5 text-amber-400" />
          Avis clients
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {testimonials.map(({ name, text, rating }) => (
            <div key={name} className="rounded-2xl border border-[#1d273f] bg-[#0d1423] p-4">
              <div className="mb-3 flex items-center gap-1 text-amber-400">
                {Array.from({ length: rating }).map((_, index) => (
                  <Star key={`${name}-${index}`} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-slate-300">“{text}”</p>
              <div className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{name}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
