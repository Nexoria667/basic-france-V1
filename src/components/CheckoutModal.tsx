import React, { useState, useEffect } from 'react';
import { X, CreditCard, Wallet, Lock, ShieldCheck, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PaymentMethod } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    appliedPromo,
    user,
    processCheckout,
    openLegalModal
  } = useApp();

  const [email, setEmail] = useState(user.email || '');
  const [discordUsername, setDiscordUsername] = useState(user.discordUsername || '');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [error, setError] = useState('');

  // Close on Escape if not processing
  useEffect(() => {
    if (!isCheckoutOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isProcessing) {
        setIsCheckoutOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCheckoutOpen, isProcessing, setIsCheckoutOpen]);

  // Dummy card fields (simulated)
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('789');

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Veuillez renseigner une adresse email valide pour la livraison.');
      return;
    }

    if (paymentMethod === 'wallet' && user.walletBalance < cartTotal) {
      setError(`Solde insuffisant dans votre portefeuille (${user.walletBalance.toFixed(2)}€ disponible).`);
      return;
    }

    setIsProcessing(true);
    setProcessingStep('Chiffrement sécurisé du paiement...');

    setTimeout(() => {
      setProcessingStep('Validation auprès du serveur BASIC FRANCE...');
      
      setTimeout(async () => {
        setProcessingStep('Génération automatique des clés et accès...');
        
        setTimeout(async () => {
          const res = await processCheckout(email, discordUsername, paymentMethod);
          setIsProcessing(false);
          if (!res.success) {
            setError(res.error || 'Une erreur est survenue lors du paiement.');
          }
        }, 800);
      }, 700);
    }, 800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={() => {
        if (!isProcessing) setIsCheckoutOpen(false);
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-3 sm:p-6 cursor-pointer"
    >
      <div
        className="min-h-full flex items-start sm:items-center justify-center py-4 sm:py-8 cursor-pointer"
        onClick={() => {
          if (!isProcessing) setIsCheckoutOpen(false);
        }}
      >
        <div
          className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-[#243152] bg-gradient-to-b from-[#0c1122] via-[#080b15] to-[#05070e] text-slate-100 shadow-2xl shadow-blue-950/50 cursor-default my-auto animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#1b2642] px-6 py-4 bg-[#0a0f1d]/95 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-blue-400" />
              <h2 className="font-luxury font-black text-xs sm:text-sm uppercase tracking-wider text-white">Paiement Sécurisé & Livraison 12h</h2>
            </div>
            {!isProcessing && (
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-[#12192a] hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {isProcessing ? (
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center space-y-5">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 text-blue-400">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Traitement de votre commande</h3>
                <p className="mt-2 text-sm text-slate-300 font-medium">{processingStep}</p>
                <p className="mt-1 text-xs text-slate-500">Ne fermez pas cette fenêtre, vos clés numériques sont en cours de création.</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-0 lg:grid-cols-[360px_minmax(0,1fr)]">
              <aside className="border-b border-[#1b2642] bg-[#0a0f1d] p-5 lg:border-b-0 lg:border-r">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">Résumé</p>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-300">
                    {cart.reduce((a, item) => a + item.quantity, 0)} article{cart.reduce((a, item) => a + item.quantity, 0) > 1 ? 's' : ''}
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3 rounded-xl border border-[#172237] bg-[#0d1322] p-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/25 to-indigo-500/10 text-sm font-bold text-blue-200">
                        {item.product.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold text-white">{item.product.name}</p>
                        <p className="text-[10px] text-slate-400">Qté: {item.quantity}</p>
                      </div>
                      <span className="font-mono text-[11px] text-blue-300">{(item.product.price * item.quantity).toFixed(2)}€</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-xl border border-[#1a2339] bg-[#0b101c] p-4">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Livraison digitale</span>
                    <span className="font-semibold text-emerald-300">Sous 12h</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Protection achats</span>
                    <span className="font-semibold text-blue-300">Garantie 7 jours</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Accès communautaire</span>
                    <span className="font-semibold text-violet-300">Discord + ressources</span>
                  </div>
                </div>

                <div className="mt-5 border-t border-[#1a2339] pt-4">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Sous-total</span>
                    <span className="font-mono tabular-nums">{cartSubtotal.toFixed(2)}€</span>
                  </div>
                  {cartDiscount > 0 && (
                    <div className="mt-2 flex justify-between text-xs text-emerald-400">
                      <span>Réduction {appliedPromo?.code}</span>
                      <span className="font-mono tabular-nums">-{cartDiscount.toFixed(2)}€</span>
                    </div>
                  )}
                  <div className="mt-3 flex justify-between text-base font-bold text-white">
                    <span>Total</span>
                    <span className="font-mono text-lg tabular-nums text-blue-300">{cartTotal.toFixed(2)}€</span>
                  </div>
                </div>
              </aside>

              <form onSubmit={handleSubmitOrder} className="p-5 sm:p-6 lg:p-7 space-y-6">
                <div className="grid grid-cols-3 gap-2 rounded-xl border border-[#1a2339] bg-[#0b101c] p-2 text-[10px] font-bold uppercase tracking-wider text-slate-300">
                  <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-2 py-2 text-center text-blue-200">1. Panier</div>
                  <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-2 py-2 text-center text-blue-200">2. Paiement</div>
                  <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2 py-2 text-center text-emerald-200">3. Accès</div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      1. Informations de livraison numérique
                    </h3>
                    <span className="text-[11px] text-blue-400">Livraison sous 12h</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Adresse Email (Recommandée) *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="votre.email@exemple.com"
                        className="w-full rounded-lg border border-[#1e273e] bg-[#080c14] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                      />
                      <span className="text-[10px] text-slate-500">Pour le reçu et l’historique d’achat.</span>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Pseudo Discord (Optionnel)
                      </label>
                      <input
                        type="text"
                        value={discordUsername}
                        onChange={(e) => setDiscordUsername(e.target.value)}
                        placeholder="Ex: AlexFit#7712"
                        className="w-full rounded-lg border border-[#1e273e] bg-[#080c14] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                      />
                      <span className="text-[10px] text-slate-500">Attribution automatique de votre rôle Discord « Client ».</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-2 border-t border-[#182136]">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    2. Choix du mode de paiement
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      onClick={() => setPaymentMethod('credit_card')}
                      className={`cursor-pointer rounded-xl border p-4 transition-all ${
                        paymentMethod === 'credit_card'
                          ? 'border-[#3b82f6] bg-[#101b33]'
                          : 'border-[#1a2338] bg-[#090d16] hover:border-[#253250]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <CreditCard className="h-4 w-4 text-blue-400" />
                          <span className="text-xs font-bold text-white">Carte Bancaire</span>
                        </div>
                        {paymentMethod === 'credit_card' && (
                          <CheckCircle2 className="h-4 w-4 text-blue-400" />
                        )}
                      </div>
                      <p className="mt-1 text-[11px] text-slate-400">
                        Visa, Mastercard, CB · Chiffrement TLS
                      </p>
                    </div>

                    <div
                      onClick={() => setPaymentMethod('wallet')}
                      className={`cursor-pointer rounded-xl border p-4 transition-all ${
                        paymentMethod === 'wallet'
                          ? 'border-[#3b82f6] bg-[#101b33]'
                          : 'border-[#1a2338] bg-[#090d16] hover:border-[#253250]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <Wallet className="h-4 w-4 text-emerald-400" />
                          <span className="text-xs font-bold text-white">Solde Portefeuille</span>
                        </div>
                        {paymentMethod === 'wallet' && (
                          <CheckCircle2 className="h-4 w-4 text-blue-400" />
                        )}
                      </div>
                      <p className="mt-1 text-[11px] text-slate-400">
                        Solde dispo : <strong className="font-mono text-white">{user.walletBalance.toFixed(2)}€</strong>
                      </p>
                    </div>
                  </div>

                  {paymentMethod === 'credit_card' && (
                    <div className="rounded-xl border border-[#1b253d] bg-[#090d17] p-4 space-y-3 mt-3">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Simulateur de passerelle bancaire sécurisée</span>
                        <span className="text-emerald-400">3D Secure Activé</span>
                      </div>
                      <div>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full rounded-lg border border-[#1e273e] bg-[#0c1220] px-3 py-2 font-mono text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/AA"
                          className="w-full rounded-lg border border-[#1e273e] bg-[#0c1220] px-3 py-2 font-mono text-xs text-white focus:outline-none"
                        />
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          placeholder="CVC"
                          className="w-full rounded-lg border border-[#1e273e] bg-[#0c1220] px-3 py-2 font-mono text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {error && (
                  <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
                    {error}
                  </div>
                )}

                <div className="border-t border-[#182136] pt-4 space-y-3">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Total des articles ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
                    <span className="font-mono tabular-nums">{cartSubtotal.toFixed(2)}€</span>
                  </div>
                  {cartDiscount > 0 && (
                    <div className="flex justify-between text-xs text-emerald-400">
                      <span>Remise ({appliedPromo?.code})</span>
                      <span className="font-mono tabular-nums">-{cartDiscount.toFixed(2)}€</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold text-white">
                    <span>Montant total débité</span>
                    <span className="font-mono text-lg tabular-nums text-blue-400">
                      {cartTotal.toFixed(2)}€
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563eb] py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-900/30 transition-all duration-200 hover:bg-blue-600 hover:shadow-blue-600/35 active:scale-95 cursor-pointer"
                  >
                    <Lock className="h-4 w-4" />
                    <span>Payer {cartTotal.toFixed(2)}€ et recevoir mes clés</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <p className="text-center text-[10px] text-slate-500">
                    En confirmant votre achat, vous acceptez nos{' '}
                    <button
                      type="button"
                      onClick={() => openLegalModal('cgv')}
                      className="text-blue-400 underline hover:text-blue-300"
                    >
                      CGV
                    </button>{' '}
                    et notre{' '}
                    <button
                      type="button"
                      onClick={() => openLegalModal('refund')}
                      className="text-blue-400 underline hover:text-blue-300"
                    >
                      politique de remboursement
                    </button>
                    .
                  </p>

                  <div className="flex items-center justify-center gap-3 text-[11px] text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                      Chiffrement bout-en-bout
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Zéro stockage de données bancaires</span>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
