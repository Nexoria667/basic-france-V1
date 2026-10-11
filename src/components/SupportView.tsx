import React, { useState } from 'react';
import { LifeBuoy, MessageSquare, ChevronDown, ChevronUp, ExternalLink, ShieldCheck, Plus, Send, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SupportView: React.FC = () => {
  const { storeSettings, setCurrentView, tickets, createTicket } = useApp();

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isOpeningTicket, setIsOpeningTicket] = useState(false);
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<'commande' | 'technique' | 'compte' | 'autre'>('commande');
  const [message, setMessage] = useState('');

  const globalFaqs = [
    {
      q: 'Quel est le délai de livraison après ma commande ?',
      a: 'La livraison de vos accès officiels Basic-Fit Premium ou Fitness Park 12 Mois s’effectue sous 12h maximum. Vos clés de licence et identifiants apparaissent directement dans votre espace client et vous sont envoyés par email.'
    },
    {
      q: 'Comment associer mon compte Discord pour recevoir mon rôle « Client » ?',
      a: 'Renseignez simplement votre identifiant Discord (ex: Pseudo#1234) lors du paiement, ou rendez-vous dans l’onglet Mon Compte > Profil pour synchroniser votre compte en un clic.'
    },
    {
      q: 'Les pass Basic-Fit et Fitness Park sont-ils valables dans toute la France ?',
      a: 'Oui ! Tous nos pass 12 mois permettent l’accès sans restriction à l’intégralité des salles du réseau en France (Basic-Fit Premium à 40€ et Fitness Park 12 Mois à 60€).'
    },
    {
      q: 'Comment fonctionne le programme de parrainage à 10% ?',
      a: 'Partagez votre lien ou code de parrainage avec vos proches. À chaque commande d’un abonnement validé, vous touchez automatiquement 10% en cash crédité directement sur votre portefeuille BASIC FRANCE.'
    }
  ];

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    createTicket(subject, category, message);
    setSubject('');
    setMessage('');
    setIsOpeningTicket(false);
    setCurrentView('dashboard');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header with DA styling */}
      <div className="relative overflow-hidden rounded-2xl border border-[#212c49] bg-gradient-to-r from-[#0d1326] via-[#080b16] to-[#0d152a] p-8 sm:p-12 shadow-2xl text-center">
        <div className="absolute top-0 right-1/2 translate-x-1/2 -mt-16 h-56 w-56 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentView('shop')}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#233152] bg-[#0c1326] px-3.5 py-1 text-xs font-semibold text-slate-300 hover:text-white hover:border-blue-500/40 hover:bg-[#121c38] transition-all"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-blue-400" />
              <span>Retour Boutique</span>
            </button>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
              <span>Assistance Officielle BASIC FRANCE</span>
              <span aria-hidden="true">·</span>
              <span>7j/7</span>
            </div>
          </div>

          <h1 className="font-luxury font-black italic tracking-wider text-2xl sm:text-4xl text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Comment pouvons-nous vous aider ?
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Notre équipe technique et nos modérateurs Discord sont à votre écoute 7j/7 pour vous accompagner sur vos pass et activations.
          </p>
        </div>
      </div>

      {/* 3 Support Channels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="relative overflow-hidden rounded-2xl border border-[#202b48] bg-gradient-to-b from-[#0c1122] to-[#070914] p-6 flex flex-col justify-between shadow-xl hover:border-blue-500/40 transition-all">
          <div className="absolute top-2.5 right-3 text-blue-500/30 font-mono text-[9px]">01 // WEB</div>
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 shadow-md">
              <LifeBuoy className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-bold text-white">Tickets Support Web</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Ouvrez un ticket privé directement depuis le site pour toute question relative à un abonnement Basic-Fit ou Fitness Park.
            </p>
          </div>
          <button
            onClick={() => setIsOpeningTicket(true)}
            className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#2563eb] py-2.5 text-xs font-bold text-white hover:bg-blue-600 transition-colors shadow-lg shadow-blue-950/40"
          >
            <Plus className="h-4 w-4" />
            <span>Ouvrir un ticket</span>
          </button>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-[#202b48] bg-gradient-to-b from-[#0c1122] to-[#070914] p-6 flex flex-col justify-between shadow-xl hover:border-[#5865f2]/40 transition-all">
          <div className="absolute top-2.5 right-3 text-[#5865f2]/40 font-mono text-[9px]">02 // DISCORD</div>
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#5865f2]/15 border border-[#5865f2]/30 text-[#5865f2] shadow-md">
              <MessageSquare className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-bold text-white">Discord en Direct</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Discutez en temps réel avec notre équipe dans le salon #assistance de notre serveur Discord officiel (+14 850 membres).
            </p>
          </div>
          <a
            href={storeSettings.discordInviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-[#2b3a62] bg-[#12192e] py-2.5 text-xs font-bold text-white hover:bg-[#1a2542] hover:border-[#5865f2]/50 transition-colors shadow-lg shadow-indigo-950/30"
          >
            <span>Accéder au Discord</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-[#202b48] bg-gradient-to-b from-[#0c1122] to-[#070914] p-6 flex flex-col justify-between shadow-xl hover:border-emerald-500/40 transition-all">
          <div className="absolute top-2.5 right-3 text-emerald-500/40 font-mono text-[9px]">03 // GARANTIE</div>
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shadow-md">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-bold text-white">Garantie & Délais Sous 12h</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Temps moyen de prise en charge : moins de 15 minutes. Tous vos abonnements Basic-Fit et Fitness Park sont vérifiés.
            </p>
          </div>
          <button
            onClick={() => setCurrentView('dashboard')}
            className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-[#2b3a62] bg-[#12192e] py-2.5 text-xs font-bold text-white hover:bg-[#1a2542] hover:border-emerald-500/40 transition-colors shadow-lg shadow-emerald-950/20"
          >
            <span>Voir mes tickets ({tickets.length})</span>
          </button>
        </div>

      </div>

      {/* Ticket form modal / inline panel if opened */}
      {isOpeningTicket && (
        <form
          onSubmit={handleTicketSubmit}
          className="rounded-2xl border border-[#233152] bg-[#0c1220] p-6 sm:p-8 space-y-4 max-w-2xl mx-auto shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-[#1b253d] pb-4">
            <h3 className="text-sm font-bold text-white">Créer un ticket d’assistance</h3>
            <button
              type="button"
              onClick={() => setIsOpeningTicket(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Fermer
            </button>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Objet de votre demande *</label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Ex: Demande d’information sur mon pass ou ma facture"
              className="w-full rounded-lg border border-[#1e273e] bg-[#080d16] px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Catégorie *</label>
            <select
              value={category}
              onChange={(e: any) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-[#1e273e] bg-[#080d16] px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="commande">Problème ou question sur une commande</option>
              <option value="technique">Question technique / Activation</option>
              <option value="compte">Portefeuille ou compte</option>
              <option value="autre">Autre sujet</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Votre message complet *</label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Décrivez votre situation avec le plus de précisions possible..."
              className="w-full rounded-lg border border-[#1e273e] bg-[#080d16] px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsOpeningTicket(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-[#2563eb] px-6 py-2.5 text-xs font-bold text-white hover:bg-blue-600"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Transmettre ma demande</span>
            </button>
          </div>
        </form>
      )}

      {/* Global FAQ Accordion */}
      <div className="max-w-3xl mx-auto space-y-4 pt-6">
        <h3 className="text-xl font-bold text-white text-center">Foire Aux Questions Fréquentes</h3>
        <div className="space-y-2">
          {globalFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-[#1c2740] bg-[#0c1220] overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="flex w-full items-center justify-between p-4 text-left text-xs sm:text-sm font-semibold text-slate-200 hover:text-white"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="h-4 w-4 text-blue-400 shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <div className="p-4 pt-0 text-xs text-slate-400 leading-relaxed border-t border-[#182136]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
