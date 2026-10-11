import React, { useState, useEffect } from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Tag, Gift, Sparkles, Plus, Minus, Wallet, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BrandThumbnail } from './BrandLogos';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    setIsCheckoutOpen,
    setCurrentView,
    user
  } = useApp();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [isReadyToCheckout, setIsReadyToCheckout] = useState(false);

  useEffect(() => {
    if (!isCartOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  useEffect(() => {
    setIsReadyToCheckout(cart.length > 0 && cartSubtotal > 0);
  }, [cart.length, cartSubtotal]);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoError('');
      setPromoInput('');
    }
  };

  const handleGoToCheckout = () => {
    if (!isReadyToCheckout) return;
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={() => setIsCartOpen(false)}
      className="fixed inset-0 z-50 overflow-hidden bg-black/85 backdrop-blur-md cursor-pointer animate-in fade-in duration-200"
    >
      <div
        className="absolute inset-y-0 right-0 flex max-w-full pl-10 cursor-pointer"
        onClick={() => setIsCartOpen(false)}
      >
        <div
          className="w-screen max-w-md border-l border-[#202c4b] bg-gradient-to-b from-[#0c1122] to-[#060810] text-slate-100 shadow-2xl flex flex-col cursor-default animate-in slide-in-from-right duration-250 ease-out"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-[#1b2642] px-6 py-5 bg-[#0a0f1d]/80">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-blue-400" />
              <h2 className="font-luxury font-black text-sm uppercase tracking-wider text-white">Mon Panier</h2>
              <span className="rounded-full border border-blue-500/30 bg-[#121c38] px-2.5 py-0.5 font-mono text-xs text-blue-300 tabular-nums">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-[#12192a] hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#1b2336] bg-[#0e1424] text-slate-600">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-base font-semibold text-white">Votre panier est vide</p>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs">
                    Consultez nos pass Basic-Fit, Fitness Park et programmes exclusifs.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCurrentView('shop');
                  }}
                  className="rounded-lg bg-[#2563eb] px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-600 transition-colors"
                >
                  Explorer la boutique
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="rounded-2xl border border-[#172033] bg-[#0c1220] p-3 transition-colors hover:border-[#232f4a]"
                  >
                    <div className="flex gap-3">
                      <BrandThumbnail
                        categoryId={item.product.categoryId}
                        productId={item.product.id}
                        className="h-14 w-14 sm:h-16 sm:w-16"
                        fallbackImage={item.product.image}
                      />

                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-[11px] font-semibold uppercase text-blue-400">
                              {item.product.categoryName}
                            </p>
                            <h4 className="line-clamp-1 text-xs font-bold text-white">
                              {item.product.name}
                            </h4>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-slate-400 hover:text-rose-400 transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center rounded-md border border-[#1a2338] bg-[#090d16] overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="flex h-7 w-7 items-center justify-center text-sm text-slate-400 hover:text-white hover:bg-[#131b2e] transition-all"
                              aria-label="Diminuer"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-7 text-center font-mono text-xs tabular-nums text-slate-200">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="flex h-7 w-7 items-center justify-center text-sm text-slate-400 hover:text-white hover:bg-[#131b2e] transition-all"
                              aria-label="Augmenter"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <span className="font-mono text-xs font-bold text-white tabular-nums">
                            {(item.product.price * item.quantity).toFixed(2)}€
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-between rounded-xl border border-[#1d273f] bg-[#0b101d] px-3 py-2.5 text-[11px] text-slate-300">
                  <div className="flex items-center gap-2">
                    <Gift className="h-3.5 w-3.5 text-purple-400" />
                    <span>Parrainez un ami et gagnez 10% sur chaque vente</span>
                  </div>
                  <span className="font-mono font-bold text-purple-300">{user.referralCode}</span>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    onClick={clearCart}
                    className="text-[11px] text-slate-400 hover:text-rose-400 transition-colors"
                  >
                    Vider le panier
                  </button>
                </div>
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t border-[#172033] bg-[#090d16] p-6 space-y-4">
              <div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2.5 text-xs text-emerald-300">
                    <div className="flex items-center gap-1.5">
                      <Tag className="h-3.5 w-3.5" />
                      <span>Code <strong>{appliedPromo.code}</strong> appliqué</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-xs text-emerald-300 underline hover:text-emerald-100"
                    >
                      Retirer
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="space-y-1.5">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Code promo"
                        className="flex-1 rounded-lg border border-[#1f283d] bg-[#0c1220] px-3 py-2 text-xs text-white placeholder-slate-400 uppercase focus:border-blue-500 focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="rounded-lg border border-[#2b3a62] bg-[#121a30] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#1a2646]"
                      >
                        Appliquer
                      </button>
                    </div>
                    {promoError && (
                      <p className="text-[11px] text-rose-400">{promoError}</p>
                    )}
                  </form>
                )}
              </div>

              <div className="rounded-xl border border-[#172033] bg-[#0d1321] p-3">
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Sous-total</span>
                    <span className="font-mono tabular-nums">{cartSubtotal.toFixed(2)}€</span>
                  </div>
                  {cartDiscount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-medium">
                      <span>Réduction</span>
                      <span className="font-mono tabular-nums">-{cartDiscount.toFixed(2)}€</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-[#172033] pt-2 text-sm font-bold text-white">
                    <span>Total</span>
                    <span className="font-mono text-base tabular-nums text-blue-400">
                      {cartTotal.toFixed(2)}€
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#1f2f4a] bg-[#0d1424] p-3 text-[11px] text-slate-300">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Portefeuille BASIC</span>
                  </div>
                  <span className="font-mono text-emerald-300">{user.walletBalance.toFixed(2)}€</span>
                </div>
              </div>

              <button
                onClick={handleGoToCheckout}
                disabled={!isReadyToCheckout}
                className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white shadow-lg transition-all ${
                  isReadyToCheckout
                    ? 'bg-[#2563eb] shadow-blue-900/30 hover:bg-[#1d4ed8] active:scale-[0.99]'
                    : 'cursor-not-allowed bg-slate-700 opacity-60'
                }`}
              >
                <span>Passer à la caisse</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Livraison numérique sous 12h garantie</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
