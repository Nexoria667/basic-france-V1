import React, { useState } from 'react';
import { ShoppingBag, Eye, Star, Check, Zap, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { BasicFitLogo, FitnessParkLogo } from './BrandLogos';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { openProductModal, addToCart } = useApp();
  const [isAdded, setIsAdded] = useState(false);
  const isBasicFit = product.categoryId === 'basic-fit' || product.id.includes('bf');

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAdded) return;
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1300);
  };

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#1f2945] bg-gradient-to-b from-[#0c101f] via-[#090c17] to-[#060810] shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#3b5493] hover:shadow-2xl hover:shadow-blue-950/50">
      
      {/* Subtle Specular Glare Sweep across the card on hover */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-1000 ease-out group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent z-30" />

      {/* Subtle Brand Ambient Backlight Glow on hover */}
      <div
        className={`pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full blur-3xl transition-opacity duration-500 opacity-20 group-hover:opacity-45 ${
          isBasicFit ? 'bg-orange-600' : 'bg-yellow-500'
        }`}
      />

      {/* Cyber Technical Corner Mark */}
      <div className="absolute top-2.5 right-3 text-blue-400/40 font-mono text-[9px] tracking-widest pointer-events-none z-20">
        BFS // 12H
      </div>

      {/* Visual Slot with Official Brand Logos in Site DA */}
      <div
        className={`relative aspect-[16/9] sm:aspect-[16/10] w-full cursor-pointer overflow-hidden flex items-center justify-center p-4 sm:p-6 transition-all duration-500 ${
          isBasicFit
            ? 'bg-gradient-to-br from-[#131726] via-[#0a0d16] to-[#05060b]'
            : 'bg-gradient-to-br from-[#131726] via-[#0b0e17] to-[#05060a]'
        }`}
        onClick={() => openProductModal(product)}
      >
        {/* Ambient Brand Backlight Glow */}
        <div
          className={`absolute inset-0 opacity-25 blur-2xl pointer-events-none transition-opacity duration-500 group-hover:opacity-50 ${
            isBasicFit ? 'bg-orange-600' : 'bg-yellow-500'
          }`}
        />

        {/* Brand Precision Grid Lines */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, ${isBasicFit ? '#f97316' : '#eab308'} 1px, transparent 1px), linear-gradient(to bottom, ${isBasicFit ? '#f97316' : '#eab308'} 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Authentic Brand Logo with Smooth Hover Scale */}
        <div className="relative z-10 flex items-center justify-center max-w-[80%] transform transition-transform duration-300 ease-out group-hover:scale-105">
          {isBasicFit ? (
            <BasicFitLogo size="lg" />
          ) : (
            <FitnessParkLogo size="lg" />
          )}
        </div>

        {/* Top left badge if present */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10">
            <span
              className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-bold backdrop-blur-md border shadow-md ${
                isBasicFit
                  ? 'bg-[#1f1008]/90 text-orange-400 border-orange-500/40 shadow-orange-950/40'
                  : 'bg-[#181809]/90 text-yellow-400 border-yellow-500/40 shadow-yellow-950/40'
              }`}
            >
              <Sparkles className="h-3 w-3" />
              <span>{product.badge}</span>
            </span>
          </div>
        )}

        {/* Quick View Button overlay on hover */}
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openProductModal(product);
            }}
            className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-slate-900/90 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold text-white shadow-xl transition-transform hover:scale-105 hover:border-blue-400"
          >
            <Eye className="h-3.5 w-3.5 text-blue-400" />
            <span>Fiche Produit</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="flex flex-1 flex-col p-3.5 sm:p-5">
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-400">
          <span className="font-semibold uppercase tracking-wider text-blue-400 font-mono text-[10px] sm:text-[11px]">
            {product.categoryName}
          </span>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <div className="flex items-center text-amber-400">
              <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-amber-400 text-amber-400" />
            </div>
            <span className="font-mono font-bold tabular-nums text-slate-200 text-xs">{product.rating.toFixed(1)}</span>
            <span className="text-[10px] text-slate-500">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Title */}
        <h3
          onClick={() => openProductModal(product)}
          className="mt-1.5 sm:mt-2 line-clamp-1 cursor-pointer font-bold text-white transition-colors hover:text-blue-300 text-sm sm:text-base"
        >
          {product.name}
        </h3>

        {/* Short description */}
        <p className="mt-1 sm:mt-1.5 line-clamp-2 text-[11px] sm:text-xs text-slate-400 leading-relaxed">
          {product.shortDescription}
        </p>

        {/* Delivery speed metadata */}
        <div className="mt-2.5 sm:mt-3 flex items-center gap-2 text-[10.5px] sm:text-[11px] text-slate-400">
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <Zap className="h-3 w-3 text-emerald-400" />
            <span>{product.activationDelay}</span>
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-300">{product.validityDuration}</span>
        </div>

        {/* Price & Action Row */}
        <div className="mt-3 sm:mt-4 flex items-center justify-between border-t border-[#1a233a] pt-3 sm:pt-3.5">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-mono text-xl sm:text-2xl font-black text-white tabular-nums drop-shadow-sm">
                {product.price.toFixed(2)}€
              </span>
              {product.originalPrice && (
                <span className="font-mono text-[11px] sm:text-xs text-slate-500 line-through tabular-nums">
                  {product.originalPrice.toFixed(2)}€
                </span>
              )}
              {discountPercentage && (
                <span className="rounded border border-emerald-500/30 bg-emerald-500/15 px-1 py-0.5 sm:px-1.5 sm:py-0.5 font-mono text-[9px] sm:text-[10px] font-bold text-emerald-400">
                  -{discountPercentage}%
                </span>
              )}
            </div>
            <span className="text-[9.5px] sm:text-[10px] text-slate-400 font-mono mt-0.5">Sous 12h · Rôle & Clé</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleBuy}
              disabled={isAdded}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 sm:px-4 sm:py-2.5 text-xs font-bold transition-all duration-200 active:scale-95 cursor-pointer shadow-lg ${
                isAdded
                  ? 'border-emerald-500/60 bg-emerald-600 text-white shadow-emerald-950/50'
                  : 'border-blue-500/40 bg-gradient-to-r from-blue-700 to-blue-600 text-white shadow-blue-950/40 hover:from-blue-600 hover:to-blue-500 hover:border-blue-400 hover:shadow-blue-600/30'
              }`}
              aria-label={`Ajouter ${product.name} au panier`}
            >
              {isAdded ? (
                <>
                  <Check className="h-3.5 w-3.5 text-white animate-scale-in" />
                  <span>Ajouté !</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="h-3.5 w-3.5 text-white/90" />
                  <span>Commander</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
