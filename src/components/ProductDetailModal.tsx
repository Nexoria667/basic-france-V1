import React, { useState, useEffect } from 'react';
import { X, Check, ShoppingBag, Zap, Shield, Key, ChevronDown, ChevronUp, Star, Share2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BasicFitLogo, FitnessParkLogo, BrandThumbnail } from './BrandLogos';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    closeProductModal,
    addToCart,
    setIsCartOpen,
    setIsCheckoutOpen,
    products,
    openProductModal,
    addToast
  } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isAdded, setIsAdded] = useState(false);

  // Close modal with Escape key
  useEffect(() => {
    if (!selectedProduct) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeProductModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProduct, closeProductModal]);

  if (!selectedProduct) return null;

  const product = selectedProduct;
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.categoryId === product.categoryId || p.isPopular))
    .slice(0, 3);

  const handleInstantBuy = () => {
    addToCart(product, quantity);
    closeProductModal();
    setIsCartOpen(true);
    setTimeout(() => setIsCheckoutOpen(true), 180);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast('Lien du produit copié dans le presse-papier !', 'info');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      onClick={closeProductModal}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-2 sm:p-6 cursor-pointer"
    >
      <div 
        className="min-h-full flex items-start sm:items-center justify-center py-2 sm:py-8 cursor-pointer"
        onClick={closeProductModal}
      >
        <div
          className="relative w-full max-w-4xl overflow-hidden rounded-xl sm:rounded-2xl border border-[#243152] bg-gradient-to-b from-[#0c1122] via-[#080b15] to-[#05070e] text-slate-100 shadow-2xl shadow-blue-950/50 cursor-default my-auto animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Sticky top bar with close button and DA brand tag */}
          <div className="sticky top-0 z-30 flex items-center justify-between border-b border-[#1b2642] px-4 py-3 sm:px-6 sm:py-3.5 bg-[#0a0f1d]/95 backdrop-blur-md">
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
              <span>{product.categoryName}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">Livraison sous 12h</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                title="Partager"
                className="rounded-lg border border-[#223052] bg-[#0f162c] p-1.5 sm:p-2 text-slate-300 hover:text-white hover:border-blue-500/40 transition-colors"
              >
                <Share2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </button>
              <button
                type="button"
                onClick={closeProductModal}
                title="Fermer la fiche produit"
                className="flex items-center gap-1 sm:gap-1.5 rounded-lg border border-[#223052] bg-[#0f162c] px-2.5 py-1.5 sm:px-3 sm:py-1.5 text-slate-300 hover:text-white hover:bg-red-500/10 hover:border-red-500/30 transition-colors"
              >
                <span className="text-[11px] sm:text-xs font-semibold text-slate-300">Fermer</span>
                <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </button>
            </div>
          </div>

          {/* Main PDP Grid */}
          <div className="grid grid-cols-1 gap-4 p-4 sm:p-6 lg:grid-cols-12 lg:gap-6 lg:p-8">
            
            {/* Left Column: Image & Deliverables breakdown */}
            <div className="lg:col-span-5 space-y-3.5 sm:space-y-5">
              <div
                className={`relative h-32 sm:h-44 md:h-48 overflow-hidden rounded-xl border flex items-center justify-center px-4 py-3 sm:px-8 sm:py-6 transition-all ${
                product.categoryId === 'basic-fit' || product.id.includes('bf')
                  ? 'border-orange-500/30 bg-gradient-to-br from-[#131726] via-[#0a0d16] to-[#05060b]'
                  : 'border-yellow-500/30 bg-gradient-to-br from-[#131726] via-[#0b0e17] to-[#05060a]'
              }`}
            >
              {/* Brand Ambient Glow */}
              <div
                className={`absolute inset-0 opacity-25 blur-3xl pointer-events-none ${
                  product.categoryId === 'basic-fit' || product.id.includes('bf')
                    ? 'bg-orange-600'
                    : 'bg-yellow-500'
                }`}
              />

              {/* Grid backdrop */}
              <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(to right, ${
                    product.categoryId === 'basic-fit' || product.id.includes('bf') ? '#f97316' : '#eab308'
                  } 1px, transparent 1px), linear-gradient(to bottom, ${
                    product.categoryId === 'basic-fit' || product.id.includes('bf') ? '#f97316' : '#eab308'
                  } 1px, transparent 1px)`,
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Cleanly sized, well-proportioned logo container */}
              <div className="relative z-10 flex items-center justify-center max-w-[70%] max-h-full">
                {product.categoryId === 'basic-fit' || product.id.includes('bf') ? (
                  <BasicFitLogo size="hero" />
                ) : (
                  <FitnessParkLogo size="hero" />
                )}
              </div>

              {product.badge && (
                <div className="absolute top-3 left-3 z-10">
                  <span
                    className={`rounded-md px-2.5 py-1 text-xs font-bold backdrop-blur-md border shadow-md ${
                      product.categoryId === 'basic-fit' || product.id.includes('bf')
                        ? 'bg-[#1f1008]/90 text-orange-400 border-orange-500/30'
                        : 'bg-[#181809]/90 text-yellow-400 border-yellow-500/30'
                    }`}
                  >
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Contenu fourni & mode de livraison */}
            <div className="rounded-xl border border-[#1a2338] bg-[#090d16] p-4 space-y-3">
              <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
                <Key className="h-4 w-4 text-blue-400" />
                <span>Contenu numérique délivré à l’achat</span>
              </h4>
              <div className="space-y-2 text-xs">
                {product.deliverables.map((del, idx) => (
                  <div key={idx} className="rounded-lg border border-[#162033] bg-[#0e1424] p-2.5">
                    <p className="font-semibold text-white">{del.label}</p>
                    <p className="text-slate-400 mt-0.5 text-[11px]">{del.instructions}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sécurité & Garantie */}
            <div className="flex items-center justify-between text-xs text-slate-400 border-t border-[#172033] pt-4">
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-blue-400" />
                <span>Activation {product.activationDelay}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-emerald-400" />
                <span>Garantie BASIC FRANCE</span>
              </span>
            </div>
          </div>

          {/* Right Column: Pricing, Buy Actions, Features & FAQs */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-amber-400">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-semibold text-slate-200">{product.rating.toFixed(1)}/5</span>
                  <span className="text-slate-400">({product.reviewsCount} avis vérifiés)</span>
                </div>
                <h2 id="product-modal-title" className="mt-1.5 sm:mt-2 text-xl sm:text-2xl md:text-3xl font-black text-white">
                  {product.name}
                </h2>
              </div>

              {/* Price Banner */}
              <div className="rounded-xl border border-[#202c48] bg-[#101729] p-3 sm:p-4 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
                      {(product.price * quantity).toFixed(2)}€
                    </span>
                    {product.originalPrice && (
                      <span className="font-mono text-xs sm:text-sm text-slate-400 line-through tabular-nums">
                        {(product.originalPrice * quantity).toFixed(2)}€
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-slate-400">
                    {quantity > 1 ? `${quantity}x ${product.price.toFixed(2)}€ · ` : ''}TVA incluse
                  </p>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10.5px] sm:text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                    En stock ({product.stockCount})
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {product.description}
              </p>

              {/* Key Features List */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Points forts du produit
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 shrink-0 text-blue-400" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity selector & Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-[#182136]">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-medium text-slate-400">Quantité :</span>
                  <div className="flex items-center rounded-lg border border-[#1e2942] bg-[#0c1220] overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-slate-400 hover:text-white hover:bg-[#131b2e] active:scale-90 transition-all cursor-pointer font-bold"
                      aria-label="Diminuer la quantité"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-mono text-xs font-semibold tabular-nums text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 text-slate-400 hover:text-white hover:bg-[#131b2e] active:scale-90 transition-all cursor-pointer font-bold"
                      aria-label="Augmenter la quantité"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => {
                      if (isAdded) return;
                      addToCart(product, quantity);
                      setIsAdded(true);
                      setTimeout(() => {
                        setIsAdded(false);
                        setIsCartOpen(true);
                        closeProductModal();
                      }, 500);
                    }}
                    className={`flex items-center justify-center gap-2 rounded-lg border py-3 text-sm font-semibold transition-all duration-200 active:scale-95 cursor-pointer ${
                      isAdded
                        ? 'border-emerald-500/50 bg-emerald-600 text-white shadow-lg shadow-emerald-950/40'
                        : 'border-[#2b3a62] bg-[#121a30] text-white hover:bg-[#1a2646] hover:border-blue-400'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="h-4 w-4 text-white animate-scale-in" />
                        <span>Ajouté au panier !</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-4 w-4 text-blue-400" />
                        <span>Ajouter au panier</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleInstantBuy}
                    className="flex items-center justify-center gap-2 rounded-lg bg-[#2563eb] py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition-all hover:bg-[#1d4ed8] hover:shadow-blue-600/30 active:scale-95 cursor-pointer"
                  >
                    <Zap className="h-4 w-4" />
                    <span>Acheter maintenant</span>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-[10.5px] sm:text-[11px] text-emerald-200">
                  <Shield className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Paiement sécurisé · Accès sous 12h · Remboursement garanti</span>
                </div>
              </div>
            </div>

            {/* Product Specific FAQ */}
            {product.faqs && product.faqs.length > 0 && (
              <div className="pt-4 border-t border-[#182136] space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Questions fréquentes
                </h4>
                <div className="space-y-1.5">
                  {product.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-[#172033] bg-[#0a0e18] overflow-hidden text-xs"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                        className="flex w-full items-center justify-between p-2.5 text-left font-medium text-slate-200 hover:text-white"
                      >
                        <span>{faq.question}</span>
                        {openFaqIndex === idx ? (
                          <ChevronUp className="h-3.5 w-3.5 text-blue-400" />
                        ) : (
                          <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                        )}
                      </button>
                      {openFaqIndex === idx && (
                        <div className="p-2.5 pt-0 text-slate-400 border-t border-[#172033]/50">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Similar / Recommended Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-[#182136] bg-[#090d16] p-6 lg:p-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Produits également consultés
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 max-w-xl gap-4">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => openProductModal(rel)}
                  className="group flex cursor-pointer items-center gap-3 rounded-lg border border-[#192236] bg-[#0c1220] p-2.5 transition-colors hover:border-[#2b3a62]"
                >
                  <BrandThumbnail
                    categoryId={rel.categoryId}
                    productId={rel.id}
                    className="h-12 w-12"
                    fallbackImage={rel.image}
                  />
                  <div className="overflow-hidden">
                    <p className="truncate text-xs font-bold text-white group-hover:text-blue-400">
                      {rel.name}
                    </p>
                    <p className="font-mono text-xs font-semibold text-slate-300 tabular-nums">
                      {rel.price.toFixed(2)}€
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom bar with close reminder & button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#182136] bg-[#080b15] px-6 py-4">
          <p className="text-xs text-slate-400 text-center sm:text-left">
            Cliquez à côté de la fiche pour la fermer (ou touche <kbd className="px-1.5 py-0.5 rounded bg-[#131b2e] border border-[#233152] font-mono text-[10px] text-slate-300">Échap</kbd>)
          </p>
          <button
            type="button"
            onClick={closeProductModal}
            className="flex items-center gap-1.5 rounded-lg border border-[#243354] bg-[#10172b] px-4 py-2 text-xs font-semibold text-slate-200 transition-colors hover:bg-slate-800 hover:text-white"
          >
            <X className="h-4 w-4" />
            <span>Fermer la fiche produit</span>
          </button>
        </div>

      </div>
    </div>
  </div>
  );
};
