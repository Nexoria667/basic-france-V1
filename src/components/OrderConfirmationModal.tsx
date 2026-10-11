import React, { useEffect } from 'react';
import { CheckCircle2, Copy, Download, Key, ArrowRight, ShieldCheck, Sparkles, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const OrderConfirmationModal: React.FC = () => {
  const { lastCompletedOrder, setLastCompletedOrder, setCurrentView, addToast } = useApp();

  useEffect(() => {
    if (!lastCompletedOrder) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLastCompletedOrder(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lastCompletedOrder, setLastCompletedOrder]);

  if (!lastCompletedOrder) return null;

  const order = lastCompletedOrder;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    addToast(`${label} copié dans le presse-papier !`, 'success');
  };

  const handleGoToPurchases = () => {
    setLastCompletedOrder(null);
    setCurrentView('dashboard');
  };

  const closeModal = () => setLastCompletedOrder(null);

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={closeModal}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-3 sm:p-6 cursor-pointer"
    >
      <div
        className="min-h-full flex items-start sm:items-center justify-center py-4 sm:py-8 cursor-pointer"
        onClick={closeModal}
      >
        <div
          className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-[#213054] bg-gradient-to-b from-[#0b1220] via-[#090d18] to-[#05070e] text-slate-100 shadow-2xl shadow-blue-950/30 cursor-default my-auto animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-[#1b253d] bg-[#0d162b]/95 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-2 text-slate-200">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-300">Votre commande est confirmée</span>
            </div>
            <button
              onClick={closeModal}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-[#12192a] hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <section className="relative overflow-hidden border-b border-emerald-500/15 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.16),transparent_65%),linear-gradient(110deg,#0d1625,#0a1220_55%,#0d1726)] px-5 py-9 text-center sm:px-8 sm:py-11">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
              <span className="absolute left-[18%] top-8 h-1.5 w-1.5 rounded-full bg-emerald-300/70 animate-pulse-glow" />
              <span className="absolute left-[29%] top-16 h-1 w-1 rounded-full bg-blue-300/70 animate-pulse-glow" />
              <span className="absolute right-[22%] top-10 h-1.5 w-1.5 rounded-full bg-blue-300/60 animate-pulse-glow" />
              <span className="absolute right-[34%] bottom-8 h-1 w-1 rounded-full bg-emerald-300/70 animate-pulse-glow" />
            </div>
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[36px] h-[74px] w-[74px] -translate-x-1/2 sm:top-[44px]">
              <span className="absolute inset-0 rounded-[24px] border border-emerald-300/60 animate-success-ring" />
              <span className="absolute inset-0 rounded-[24px] border border-blue-300/40 animate-success-ring" style={{ animationDelay: '420ms' }} />
              {Array.from({ length: 8 }, (_, index) => (
                <span key={index} className={`success-confetti success-confetti-${index + 1}`} />
              ))}
            </div>
            <div className="relative mx-auto flex h-[74px] w-[74px] items-center justify-center rounded-[24px] border border-emerald-300/30 bg-emerald-400/10 text-emerald-300 shadow-[0_0_55px_rgba(16,185,129,0.16)] animate-success-pop">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[24px]">
                <span className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-success-shine" />
              </div>
              <CheckCircle2 className="h-10 w-10" strokeWidth={1.8} />
            </div>
            <div className="success-message-enter">
            <p className="relative mt-5 text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-300/80">
              Merci pour votre confiance
            </p>
            <h1 className="relative mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
              C’est validé. Profitez-en !
            </h1>
            <p className="relative mx-auto mt-2 max-w-lg text-xs leading-relaxed text-slate-400 sm:text-sm">
              Votre commande est prête. Retrouvez ci-dessous vos accès et les informations de paiement.
            </p>
            <div className="relative mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-[#34466a] bg-[#0a1020]/80 px-4 py-2">
              <span className="text-[10px] uppercase tracking-wider text-slate-500">Référence</span>
              <span className="font-mono text-xs font-bold tracking-wide text-blue-200">{order.reference}</span>
            </div>
            </div>
          </section>

          <div className="grid gap-0 lg:grid-cols-[360px_minmax(0,1fr)]">
            <aside className="border-b border-[#1b253d] bg-[#0a101d] p-5 lg:border-b-0 lg:border-r">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">Récapitulatif</p>
              <div className="mt-4 rounded-xl border border-[#1b2a46] bg-[#0d1322] p-4">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Montant payé</span>
                  <span className="font-mono text-sm font-bold text-white">{order.total.toFixed(2)}€</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Mode de paiement</span>
                  <span className="text-slate-200">{order.paymentMethod === 'wallet' ? 'Portefeuille' : 'Carte bancaire'}</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Livraison</span>
                  <span className="text-emerald-300">Accès immédiat</span>
                </div>
              </div>

              <div className="mt-4 space-y-2 rounded-xl border border-[#1c2742] bg-[#0d1220] p-4 text-[11px] text-slate-300">
                <div className="flex items-center gap-2 text-emerald-300">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Vos achats restent accessibles</span>
                </div>
                <p className="text-slate-400">Tous vos accès numériques sont stockés de manière sécurisée et accessibles depuis votre dashboard.</p>
              </div>
            </aside>

            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
                <Key className="h-4 w-4 text-blue-400" />
                <span>Vos accès numériques</span>
                </div>
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
                  Disponibles maintenant
                </span>
              </div>

              <div className="success-stagger mt-4 space-y-3">
                {order.deliveries.map((del) => (
                  <div
                    key={del.id}
                    className="rounded-xl border border-[#233152] bg-[#090d17] p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold text-white">{del.productName}</p>
                        <p className="mt-0.5 text-[11px] text-slate-400">{del.instructions}</p>
                      </div>
                      <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                        Actif
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-[#1e2a47] bg-[#0d1322] px-3.5 py-2.5">
                      <code className="break-all font-mono text-[11px] font-semibold text-blue-300">
                        {del.secretContent}
                      </code>
                      <button
                        onClick={() => handleCopy(del.secretContent, 'Code')}
                        className="ml-3 flex shrink-0 items-center gap-1.5 rounded-md border border-[#2b3a62] bg-[#141d36] px-2.5 py-1 text-[10px] font-semibold text-slate-200 transition-colors hover:bg-blue-600 hover:text-white"
                      >
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copier</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 border-t border-[#182136] pt-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  onClick={handleGoToPurchases}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#1d4ed8]"
                >
                  <span>Voir mes achats</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={closeModal}
                  className="w-full text-center text-xs font-semibold text-slate-400 hover:text-white sm:w-auto"
                >
                  Continuer
                </button>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <Download className="h-3.5 w-3.5 text-blue-400" />
                <span>Les accès sont disponibles dans votre espace client dès maintenant.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
