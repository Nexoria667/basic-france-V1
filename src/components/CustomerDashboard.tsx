import React, { useState, useEffect } from 'react';
import {
  User,
  Key,
  ShoppingBag,
  Wallet,
  Share2,
  LifeBuoy,
  Copy,
  ExternalLink,
  Plus,
  Send,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Tag,
  ArrowLeft,
  Download,
  FileText,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Printer,
  X,
  Sparkles,
  RefreshCw,
  Bell,
  Hash,
  Users,
  Bot,
  Check,
  Edit2,
  Save,
  MessageSquare,
  Award,
  Shield
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BFSLogo } from './BFSBrandLogo';
import { Order } from '../types';

export const DiscordIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

export const CustomerDashboard: React.FC = () => {
  const {
    user,
    setUser,
    setCurrentView,
    orders,
    userDeliveries,
    addFundsToWallet,
    toggleDiscordConnection,
    claimReferralRewards,
    tickets,
    createTicket,
    replyToTicket,
    setTicketStatus,
    addToast,
    storeSettings,
    activeDashboardTab,
    setActiveDashboardTab
  } = useApp();

  const activeTab = activeDashboardTab;
  const setActiveTab = setActiveDashboardTab;
  
  // Wallet recharge amount selector & custom input
  const [rechargeAmount, setRechargeAmount] = useState<number>(25);
  const [customRechargeInput, setCustomRechargeInput] = useState<string>('');

  // Invoice / receipt modal state
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<Order | null>(null);

  // Expanded activation guide delivery id
  const [expandedGuideDeliveryId, setExpandedGuideDeliveryId] = useState<string | null>(null);

  // Discord profile & community state
  const [isSyncingRoles, setIsSyncingRoles] = useState(false);
  const [lastRoleSyncTime, setLastRoleSyncTime] = useState<string>('À l’instant');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editUsername, setEditUsername] = useState(user.username);
  const [editDiscordUsername, setEditDiscordUsername] = useState(user.discordUsername || '');
  const [discordNotificationPrefs, setDiscordNotificationPrefs] = useState(() => {
    try {
      const saved = localStorage.getItem('bf_discord_notifs');
      return saved ? JSON.parse(saved) : { dmOrder: true, dmTicket: true, dmReferral: true, dmPromos: false };
    } catch {
      return { dmOrder: true, dmTicket: true, dmReferral: true, dmPromos: false };
    }
  });

  const toggleNotificationPref = (key: 'dmOrder' | 'dmTicket' | 'dmReferral' | 'dmPromos') => {
    setDiscordNotificationPrefs((prev: any) => {
      const next = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem('bf_discord_notifs', JSON.stringify(next));
      } catch {
        // Ignore
      }
      const label =
        key === 'dmOrder'
          ? 'Notifications de commandes en MP'
          : key === 'dmTicket'
          ? 'Alertes réponses tickets'
          : key === 'dmReferral'
          ? 'Alertes gains parrainage'
          : 'Alertes promotions flash';
      addToast(`${next[key] ? 'Activé' : 'Désactivé'} : ${label}`, 'info');
      return next;
    });
  };

  const handleSyncRoles = () => {
    setIsSyncingRoles(true);
    setTimeout(() => {
      setIsSyncingRoles(false);
      setLastRoleSyncTime('À l’instant');
      setUser((prev) => ({
        ...prev,
        discordConnected: true,
        discordRoles: Array.from(new Set([...prev.discordRoles, 'Client', 'Membre Vérifié', 'Team Basic France']))
      }));
      addToast('Rôles Discord resynchronisés avec succès avec le bot Basic France !', 'success');
    }, 850);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUsername.trim()) return;
    setUser((prev) => ({
      ...prev,
      username: editUsername.trim(),
      discordUsername: editDiscordUsername.trim() || prev.discordUsername
    }));
    setIsEditingProfile(false);
    addToast('Profil client mis à jour avec succès !', 'success');
  };

  // New ticket state
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState<'commande' | 'technique' | 'compte' | 'autre'>('commande');
  const [ticketMessage, setTicketMessage] = useState('');
  const [activeTicketId, setActiveTicketId] = useState<string | null>(tickets[0]?.id || null);
  const [replyContent, setReplyContent] = useState('');

  // Close invoice modal on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedOrderForInvoice) {
        setSelectedOrderForInvoice(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedOrderForInvoice]);

  const activeTicket = tickets.find((t) => t.id === activeTicketId);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    addToast(`${label} copié !`, 'success');
  };

  const handleDownloadLicense = (del: any) => {
    const content = `========================================================
BASIC FRANCE - REÇU NUMÉRIQUE & ACCÈS OFFICIEL
========================================================

PRODUIT         : ${del.productName}
TYPE            : ${del.type.toUpperCase().replace('_', ' ')}
STATUT          : ACTIF & VALIDE 12 MOIS
DATE DÉLIVRANCE : ${del.deliveredAt}
RÉFÉRENCE       : ${del.orderId}

--------------------------------------------------------
VOTRE CLÉ D'ACTIVATION / IDENTIFIANT :
${del.secretContent}
--------------------------------------------------------

INSTRUCTIONS D'ACTIVATION AUTONOME :
${del.instructions}

1. Ouvrez l'application officielle Basic-Fit ou Fitness Park, ou rendez-vous à la borne club.
2. Renseignez la clé d'activation ci-dessus.
3. L'accès est activé immédiatement pour 12 mois complets.
4. Votre rôle Discord "Client" est synchronisé sur notre serveur.

SUPPORT TECHNIQUE 24/7 :
- Serveur Discord : ${storeSettings.discordInviteUrl}
- Plateforme Web  : https://basicfrance.io
========================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BasicFrance_${del.productName.replace(/[^a-zA-Z0-9]/g, '_')}_Cle.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addToast('Reçu et clé d’accès exportés avec succès !', 'success');
  };

  const handleQuickSupportForOrder = (orderRef: string) => {
    setTicketSubject(`Assistance commande ${orderRef}`);
    setTicketCategory('commande');
    setTicketMessage(`Bonjour, je sollicite une assistance au sujet de ma commande ${orderRef} : `);
    setIsCreatingTicket(true);
    setActiveTab('support');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleQuickSupportForDelivery = (productName: string, secretContent: string) => {
    setTicketSubject(`Question activation : ${productName}`);
    setTicketCategory('technique');
    setTicketMessage(`Bonjour, j'ai une question concernant l'activation de ma clé pour "${productName}" (clé : ${secretContent}) : `);
    setIsCreatingTicket(true);
    setActiveTab('support');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleCreateTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) return;
    createTicket(ticketSubject, ticketCategory, ticketMessage);
    setTicketSubject('');
    setTicketMessage('');
    setIsCreatingTicket(false);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim() || !activeTicketId) return;
    replyToTicket(activeTicketId, replyContent, 'user');
    setReplyContent('');
  };

  return (
    <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
      
      {/* Dashboard Top Header with DA styling */}
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-[#212b48] bg-gradient-to-r from-[#0c1122] via-[#080b15] to-[#0c1224] p-4 sm:p-6 md:p-8 shadow-2xl mb-5 sm:mb-8">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 h-48 w-48 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <BFSLogo size="sm" className="sm:hidden" />
            <BFSLogo size="md" className="hidden sm:inline-flex" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-luxury font-black text-base sm:text-xl md:text-2xl text-white tracking-wide">
                  {user.username}
                </h1>
                {user.discordConnected && (
                  <span className="rounded-full bg-[#5865f2]/20 px-2 py-0.5 text-[9.5px] sm:text-[10px] font-mono font-bold text-[#5865f2] border border-[#5865f2]/40 backdrop-blur-sm">
                    DISCORD LIÉ
                  </span>
                )}
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 sm:mt-1 font-mono">
                {user.email} · Membre Officiel
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={() => setCurrentView('shop')}
              className="inline-flex items-center gap-1.5 rounded-lg sm:rounded-xl border border-[#233152] bg-[#0c1326] px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs font-semibold text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-[#121c38] transition-all shadow-sm"
              title="Retourner à la boutique"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-blue-400" />
              <span>Boutique</span>
            </button>
            <div
              onClick={() => setActiveTab('wallet')}
              className="rounded-lg sm:rounded-xl border border-blue-500/30 bg-[#0c1326] px-3.5 py-2 sm:px-5 sm:py-3 text-right shadow-lg shadow-blue-950/40 cursor-pointer hover:border-emerald-500/50 hover:bg-[#0f1730] transition-all group"
              title="Gérer et recharger directement votre portefeuille"
            >
              <p className="text-[9.5px] sm:text-[10px] uppercase font-mono font-bold tracking-wider text-blue-300 group-hover:text-emerald-300 transition-colors">
                Portefeuille ↗
              </p>
              <p className="font-mono text-base sm:text-xl font-black text-white tabular-nums">
                {user.walletBalance.toFixed(2)}€
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation with DA Cyber Buttons */}
      <div className="flex overflow-x-auto no-scrollbar gap-1.5 sm:gap-2 border-b border-[#1b253e] pb-3 sm:pb-4 mb-5 sm:mb-8 text-[11px] sm:text-xs font-semibold">
        <button
          onClick={() => setActiveTab('purchases')}
          className={`flex items-center gap-1.5 sm:gap-2 whitespace-nowrap rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 transition-all ${
            activeTab === 'purchases'
              ? 'bg-[#182545] text-white border border-blue-400/50 shadow-lg shadow-blue-950/40 font-bold'
              : 'text-slate-400 hover:text-white hover:bg-[#0e1424] border border-transparent'
          }`}
        >
          <Key className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-400" />
          <span>Mes Achats ({userDeliveries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-1.5 sm:gap-2 whitespace-nowrap rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 transition-all ${
            activeTab === 'orders'
              ? 'bg-[#182545] text-white border border-blue-400/50 shadow-lg shadow-blue-950/40 font-bold'
              : 'text-slate-400 hover:text-white hover:bg-[#0e1424] border border-transparent'
          }`}
        >
          <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-400" />
          <span>Commandes ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wallet')}
          className={`flex items-center gap-1.5 sm:gap-2 whitespace-nowrap rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 transition-all ${
            activeTab === 'wallet'
              ? 'bg-[#182545] text-white border border-blue-400/50 shadow-lg shadow-blue-950/40 font-bold'
              : 'text-slate-400 hover:text-white hover:bg-[#0e1424] border border-transparent'
          }`}
        >
          <Wallet className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400" />
          <span>Portefeuille ({user.walletBalance.toFixed(2)}€)</span>
        </button>

        <button
          onClick={() => setActiveTab('referral')}
          className={`flex items-center gap-1.5 sm:gap-2 whitespace-nowrap rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 transition-all ${
            activeTab === 'referral'
              ? 'bg-[#182545] text-white border border-purple-400/50 shadow-lg shadow-purple-950/40 font-bold'
              : 'text-slate-400 hover:text-white hover:bg-[#0e1424] border border-transparent'
          }`}
        >
          <Share2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-400" />
          <span>Parrainage ({user.referralCount})</span>
        </button>

        <button
          onClick={() => setActiveTab('support')}
          className={`flex items-center gap-1.5 sm:gap-2 whitespace-nowrap rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 transition-all ${
            activeTab === 'support'
              ? 'bg-[#182545] text-white border border-blue-400/50 shadow-lg shadow-blue-950/40 font-bold'
              : 'text-slate-400 hover:text-white hover:bg-[#0e1424] border border-transparent'
          }`}
        >
          <LifeBuoy className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-400" />
          <span>Support ({tickets.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-1.5 sm:gap-2 whitespace-nowrap rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 transition-all ${
            activeTab === 'profile'
              ? 'bg-[#182545] text-white border border-blue-400/50 shadow-lg shadow-blue-950/40 font-bold'
              : 'text-slate-400 hover:text-white hover:bg-[#0e1424] border border-transparent'
          }`}
        >
          <DiscordIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#5865f2]" />
          <span>Profil & Discord</span>
        </button>
      </div>

      {/* Tab Content Panels */}
      <div className="py-6">
        
        {/* TAB 1: MES ACHATS & LICENCES */}
        {activeTab === 'purchases' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Tous mes contenus numériques acquis</span>
                  <span className="rounded-full bg-blue-500/20 px-2.5 py-0.5 text-[11px] font-mono font-bold text-blue-300 border border-blue-500/30">
                    {userDeliveries.length} actif{userDeliveries.length > 1 ? 's' : ''}
                  </span>
                </h3>
                <p className="text-xs text-slate-400">Vos clés d’activation et statut de rôle Discord « Client » restent accessibles ici 24/7 en toute autonomie.</p>
              </div>
              <button
                onClick={() => setCurrentView('shop')}
                className="self-start sm:self-auto text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Commander un nouvel accès</span>
                <span>→</span>
              </button>
            </div>

            {userDeliveries.length === 0 ? (
              <div className="rounded-xl border border-[#1b2438] bg-[#0c101c] p-12 text-center text-slate-400">
                <Key className="mx-auto h-8 w-8 text-slate-600 mb-2" />
                <p className="text-sm font-semibold text-white">Aucun contenu numérique pour le moment</p>
                <p className="text-xs mt-1">Vos clés générées après paiement apparaîtront automatiquement ici.</p>
                <button
                  onClick={() => setCurrentView('shop')}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 cursor-pointer"
                >
                  Découvrir la boutique
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userDeliveries.map((del) => {
                  const isGuideOpen = expandedGuideDeliveryId === del.id;
                  return (
                    <div
                      key={del.id}
                      className="flex flex-col justify-between rounded-xl border border-[#1c2740] bg-[#0c1220] p-5 transition-all hover:border-[#2b3a60]"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] text-blue-400 font-bold uppercase tracking-wider">
                            {del.type.replace('_', ' ')}
                          </span>
                          <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                            Actif · 12 Mois
                          </span>
                        </div>
                        <h4 className="mt-2 text-sm font-bold text-white">{del.productName}</h4>
                        <p className="text-xs text-slate-400 mt-1">{del.instructions}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#182136] space-y-3">
                        <div className="flex items-center justify-between rounded-lg border border-[#1f2b47] bg-[#080d17] p-2.5">
                          <code className="font-mono text-xs font-bold text-blue-300 break-all select-all">
                            {del.secretContent}
                          </code>
                          <button
                            type="button"
                            onClick={() => handleCopy(del.secretContent, 'Clé d’accès')}
                            className="ml-2 flex shrink-0 items-center gap-1 rounded bg-[#16213a] px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-blue-600 transition-colors cursor-pointer"
                            title="Copier la clé"
                          >
                            <Copy className="h-3 w-3" />
                            <span>Copier</span>
                          </button>
                        </div>

                        {/* Autonomous Client Actions Bar */}
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => setExpandedGuideDeliveryId(isGuideOpen ? null : del.id)}
                            className="flex items-center gap-1 rounded-md border border-[#202c46] bg-[#0e1424] px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:text-white hover:border-blue-500/40 transition-colors cursor-pointer"
                          >
                            <HelpCircle className="h-3 w-3 text-blue-400" />
                            <span>{isGuideOpen ? 'Fermer guide' : 'Guide activation'}</span>
                            {isGuideOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDownloadLicense(del)}
                            className="flex items-center gap-1 rounded-md border border-[#202c46] bg-[#0e1424] px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:text-white hover:border-emerald-500/40 transition-colors cursor-pointer"
                            title="Sauvegarder ce reçu et cette clé sur mon ordinateur / téléphone"
                          >
                            <Download className="h-3 w-3 text-emerald-400" />
                            <span>Sauvegarder (.txt)</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleQuickSupportForDelivery(del.productName, del.secretContent)}
                            className="flex items-center gap-1 rounded-md border border-[#202c46] bg-[#0e1424] px-2.5 py-1 text-[11px] font-medium text-slate-400 hover:text-slate-200 transition-colors ml-auto cursor-pointer"
                            title="Besoin d'aide sur cette clé ?"
                          >
                            <span>Assistance ↗</span>
                          </button>
                        </div>

                        {/* Collapsible Step-by-Step Activation Guide for client autonomy */}
                        {isGuideOpen && (
                          <div className="rounded-lg border border-[#253557] bg-[#090f1e] p-3 text-xs text-slate-300 space-y-2">
                            <p className="font-bold text-white text-[11px] uppercase tracking-wide flex items-center gap-1.5">
                              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
                              <span>Guide d’activation autonome en 3 étapes :</span>
                            </p>
                            <ol className="list-decimal list-inside space-y-1.5 text-slate-300 text-[11px]">
                              <li>Ouvrez l’application officielle ou présentez-vous à la borne d'accueil du club.</li>
                              <li>Saisissez ou scannez votre code : <span className="font-mono text-blue-300 font-bold">{del.secretContent}</span>.</li>
                              <li>Votre accès 12 mois est activé immédiatement sans aucune attente.</li>
                            </ol>
                            <p className="text-[10px] text-slate-400 pt-1 border-t border-[#18233c]">
                              Astuce : Téléchargez le fichier .txt pour garder vos identifiants à portée de main en hors-ligne.
                            </p>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                          <span>Délivré le {del.deliveredAt}</span>
                          <span className="font-mono">Réf: {del.orderId}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: COMMANDES */}
        {activeTab === 'orders' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-white">Historique de mes commandes & factures</h3>
                <p className="text-xs text-slate-400">Consultez vos commandes, téléchargez vos reçus officiels et demandez de l'aide en 1 clic.</p>
              </div>
              <button
                onClick={() => setCurrentView('shop')}
                className="self-start sm:self-auto text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Nouvel achat</span>
                <span>→</span>
              </button>
            </div>

            {orders.length === 0 ? (
              <div className="rounded-xl border border-[#1b2438] bg-[#0c101c] p-12 text-center text-slate-400">
                <ShoppingBag className="mx-auto h-8 w-8 text-slate-600 mb-2" />
                <p className="text-sm font-semibold text-white">Aucune commande enregistrée</p>
                <button
                  onClick={() => setCurrentView('shop')}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 cursor-pointer"
                >
                  Découvrir la boutique
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-[#1c2740] bg-[#0c1220]">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-[#182136] bg-[#080d16] text-slate-400 uppercase font-semibold">
                    <tr>
                      <th className="px-4 py-3">Réf Commande</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Articles</th>
                      <th className="px-4 py-3">Paiement</th>
                      <th className="px-4 py-3 text-right">Total</th>
                      <th className="px-4 py-3 text-center">Statut</th>
                      <th className="px-4 py-3 text-right">Actions Autonomes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#161f33] text-slate-300">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-[#101728] transition-colors">
                        <td className="px-4 py-3 font-mono font-bold text-white">
                          {ord.reference}
                        </td>
                        <td className="px-4 py-3 text-slate-400">{ord.createdAt}</td>
                        <td className="px-4 py-3 font-medium text-slate-200">
                          {ord.items.map((i) => `${i.productName} (x${i.quantity})`).join(', ')}
                        </td>
                        <td className="px-4 py-3 capitalize">
                          {ord.paymentMethod === 'credit_card' ? 'Carte Bancaire' : 'Portefeuille BASIC'}
                        </td>
                        <td className="px-4 py-3 text-right font-mono font-bold text-white tabular-nums">
                          {ord.total.toFixed(2)}€
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold ${
                            ord.status === 'completed'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}>
                            {ord.status === 'completed' ? 'Validée & Livrée' : ord.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setSelectedOrderForInvoice(ord)}
                              className="inline-flex items-center gap-1 rounded bg-[#16213a] px-2.5 py-1 text-[11px] font-semibold text-blue-300 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
                              title="Voir et imprimer la facture officielle"
                            >
                              <FileText className="h-3 w-3" />
                              <span>Reçu</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleQuickSupportForOrder(ord.reference)}
                              className="inline-flex items-center gap-1 rounded border border-[#202c46] bg-[#0c1220] px-2 py-1 text-[11px] font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
                              title="Besoin d'aide sur cette commande ?"
                            >
                              <span>Aide</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PORTEFEUILLE */}
        {activeTab === 'wallet' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Solde & Rechargement */}
              <div className="lg:col-span-5 rounded-xl border border-[#1f2c48] bg-[#0c1220] p-6 space-y-5">
                <div>
                  <p className="text-xs uppercase font-bold text-slate-400">Solde disponible</p>
                  <p className="mt-1 font-mono text-3xl font-extrabold text-white tabular-nums">
                    {user.walletBalance.toFixed(2)}€
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Utilisable instantanément lors de tout achat sur la boutique sans aucun frais.
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-[#182136]">
                  <p className="text-xs font-bold text-white flex items-center justify-between">
                    <span>Recharger mon portefeuille</span>
                    <span className="text-[10px] text-blue-400 font-normal">Crédit immédiat</span>
                  </p>

                  {/* Preset amounts including exact pass amounts */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { amt: 10, label: '+10€' },
                      { amt: 25, label: '+25€' },
                      { amt: 40, label: '+40€ (Basic-Fit)' },
                      { amt: 50, label: '+50€' },
                      { amt: 60, label: '+60€ (Fit. Park)' },
                      { amt: 100, label: '+100€' }
                    ].map(({ amt, label }) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setRechargeAmount(amt);
                          setCustomRechargeInput('');
                        }}
                        className={`rounded-lg border py-2 px-1 font-mono text-xs font-bold transition-all text-center cursor-pointer ${
                          rechargeAmount === amt && !customRechargeInput
                            ? 'border-blue-500 bg-blue-600 text-white'
                            : 'border-[#1e2a44] bg-[#090d16] text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount input for maximum customer autonomy */}
                  <div className="pt-1">
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Ou saisir un montant personnalisé :
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="number"
                          min="5"
                          max="1000"
                          value={customRechargeInput}
                          onChange={(e) => {
                            setCustomRechargeInput(e.target.value);
                            const val = parseFloat(e.target.value);
                            if (val > 0) setRechargeAmount(val);
                          }}
                          placeholder="Ex: 35, 75..."
                          className="w-full rounded-lg border border-[#1e273e] bg-[#080d16] px-3 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                        />
                        <span className="absolute right-3 top-2 text-xs font-mono text-slate-400 font-bold">€</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const val = parseFloat(customRechargeInput);
                          if (val && val > 0) {
                            addFundsToWallet(val);
                            setCustomRechargeInput('');
                          } else {
                            addToast('Veuillez renseigner un montant valide.', 'error');
                          }
                        }}
                        className="rounded-lg bg-[#16223e] border border-[#2b3c66] px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-600 transition-colors cursor-pointer"
                      >
                        Valider
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => addFundsToWallet(rechargeAmount)}
                    className="w-full rounded-xl bg-[#2563eb] py-3 text-xs font-bold text-white hover:bg-blue-600 transition-colors shadow-lg shadow-blue-900/30 cursor-pointer"
                  >
                    Créditer {rechargeAmount}€ immédiatement
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentView('shop')}
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#233152] bg-[#0c1428] py-2.5 text-xs font-semibold text-slate-200 hover:text-white hover:border-blue-500/50 hover:bg-[#121c36] transition-all cursor-pointer"
                  >
                    <span>Commander sur la boutique avec mon solde</span>
                    <span>→</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Avantages & Historique de Mouvements */}
              <div className="lg:col-span-7 space-y-4">
                <div className="rounded-xl border border-[#1f2c48] bg-[#0c1220] p-6 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Avantages du portefeuille BASIC FRANCE
                  </h4>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Paiement en 1 clic sans avoir à ressaisir votre carte bancaire.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Crédits de parrainage et cashbacks directement versés sur ce solde.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Transactions conservées sans aucune date limite de validité.</span>
                    </li>
                  </ul>
                </div>

                {/* Autonomous Transparency Ledger */}
                <div className="rounded-xl border border-[#1f2c48] bg-[#0c1220] p-6 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                    <span>Mouvements récents de votre solde</span>
                    <span className="text-[10px] text-slate-500 font-mono">Dernières opérations</span>
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between rounded-lg border border-[#192236] bg-[#080d16] p-3">
                      <div>
                        <p className="font-semibold text-white">Solde initial membre vérifié</p>
                        <p className="text-[10px] text-slate-500">Crédit de bienvenue & fidélité</p>
                      </div>
                      <span className="font-mono font-bold text-emerald-400">+45.00€</span>
                    </div>
                    {orders.slice(0, 2).map((o) => (
                      <div key={o.id} className="flex items-center justify-between rounded-lg border border-[#192236] bg-[#080d16] p-3">
                        <div>
                          <p className="font-semibold text-white">Règlement commande {o.reference}</p>
                          <p className="text-[10px] text-slate-500">{o.createdAt}</p>
                        </div>
                        <span className="font-mono font-bold text-slate-300">-{o.total.toFixed(2)}€</span>
                      </div>
                    ))}
                    {user.referralEarnings > 0 && (
                      <div className="flex items-center justify-between rounded-lg border border-[#192236] bg-[#080d16] p-3">
                        <div>
                          <p className="font-semibold text-purple-300">Commissions parrainage en attente</p>
                          <p className="text-[10px] text-slate-500">{user.referralCount} filleul{user.referralCount > 1 ? 's' : ''}</p>
                        </div>
                        <span className="font-mono font-bold text-purple-400">+{user.referralEarnings.toFixed(2)}€</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* TAB 4: PARRAINAGE & AFFILIATION */}
        {activeTab === 'referral' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="rounded-xl border border-[#233152] bg-gradient-to-r from-[#0d1527] to-[#0c1220] p-6 sm:p-8">
              <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase text-purple-400">Programme Partenaire</span>
                <h3 className="mt-1 text-2xl font-black text-white">Gagnez {storeSettings.referralRewardPercent}% sur chaque commande</h3>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  Partagez votre code ou votre lien unique à vos amis et collègues de salle. Dès qu’ils commandent un pass ou un programme, vous touchez {storeSettings.referralRewardPercent}% de commission immédiatement réutilisables sur la boutique.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl border border-[#1f2a44] bg-[#090d16] p-4">
                  <p className="text-[11px] font-bold text-slate-400 uppercase">Filleuls actifs</p>
                  <p className="font-mono text-2xl font-extrabold text-white mt-1 tabular-nums">
                    {user.referralCount}
                  </p>
                </div>

                <div className="rounded-xl border border-[#1f2a44] bg-[#090d16] p-4">
                  <p className="text-[11px] font-bold text-slate-400 uppercase">Commissions en attente</p>
                  <p className="font-mono text-2xl font-extrabold text-purple-400 mt-1 tabular-nums">
                    {user.referralEarnings.toFixed(2)}€
                  </p>
                </div>

                <div className="rounded-xl border border-[#1f2a44] bg-[#090d16] p-4 flex flex-col justify-between">
                  <p className="text-[11px] font-bold text-slate-400 uppercase">Action</p>
                  <button
                    onClick={claimReferralRewards}
                    disabled={user.referralEarnings <= 0}
                    className="mt-2 rounded-lg bg-purple-600 px-3 py-2 text-xs font-bold text-white hover:bg-purple-500 disabled:opacity-40"
                  >
                    Transférer au portefeuille
                  </button>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                <div className="flex-1 w-full rounded-xl border border-[#1f2b47] bg-[#080d16] px-4 py-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Votre code personnel</span>
                    <p className="font-mono text-sm font-extrabold text-white">{user.referralCode}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(user.referralCode, 'Code parrainage')}
                    className="flex items-center gap-1.5 rounded-lg border border-[#2b3a60] bg-[#12192d] px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-blue-600"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copier code</span>
                  </button>
                </div>

                <button
                  onClick={() => handleCopy(`https://basicfrance.io/?ref=${user.referralCode}`, 'Lien de parrainage')}
                  className="w-full sm:w-auto rounded-xl border border-[#2b3a60] bg-[#12192d] px-5 py-3.5 text-xs font-bold text-white hover:bg-[#1a2542]"
                >
                  Copier le lien complet
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SUPPORT TICKETS */}
        {activeTab === 'support' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Assistance & Tickets Clients</h3>
                <p className="text-xs text-slate-400">Échangez en direct avec nos modérateurs et l’équipe technique.</p>
              </div>
              <button
                onClick={() => setIsCreatingTicket(!isCreatingTicket)}
                className="flex items-center gap-1.5 rounded-lg bg-[#2563eb] px-4 py-2 text-xs font-bold text-white hover:bg-blue-600"
              >
                <Plus className="h-4 w-4" />
                <span>Nouveau Ticket</span>
              </button>
            </div>

            {/* Autonomous Self-Service Troubleshooting FAQ */}
            <div className="rounded-xl border border-[#202c46] bg-[#0c1220] p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Résolution Immédiate & Questions Fréquentes (24/7)
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="rounded-lg border border-[#192338] bg-[#080d16] p-3 space-y-1">
                  <p className="font-bold text-white text-[11px]">⚡ Où trouver ma clé d'accès et mon reçu ?</p>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Vos clés sont immédiatement stockées dans l'onglet « Mes Achats & Licences » et vos reçus dans l'onglet « Commandes ».
                  </p>
                </div>
                <div className="rounded-lg border border-[#192338] bg-[#080d16] p-3 space-y-1">
                  <p className="font-bold text-white text-[11px]">⚡ Comment activer mon pass dans mon club ?</p>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Cliquez sur « Guide activation » sous votre clé pour suivre les 3 étapes simples d'activation sur l'application ou en borne.
                  </p>
                </div>
                <div className="rounded-lg border border-[#192338] bg-[#080d16] p-3 space-y-1">
                  <p className="font-bold text-white text-[11px]">⚡ Mon solde portefeuille a-t-il une limite de validité ?</p>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Non, vos crédits sont conservés à vie et peuvent être utilisés lors de vos futurs achats sur la boutique sans aucun frais.
                  </p>
                </div>
                <div className="rounded-lg border border-[#192338] bg-[#080d16] p-3 space-y-1">
                  <p className="font-bold text-white text-[11px]">⚡ Comment toucher mes commissions de parrainage ?</p>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Rendez-vous dans l'onglet « Parrainage 10% » et cliquez sur « Transférer au portefeuille » dès que vous avez des gains.
                  </p>
                </div>
              </div>
            </div>

            {/* Create ticket form */}
            {isCreatingTicket && (
              <form
                onSubmit={handleCreateTicketSubmit}
                className="rounded-xl border border-[#223050] bg-[#0c1220] p-5 space-y-4"
              >
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Ouvrir une nouvelle demande d’assistance
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Sujet du ticket *
                    </label>
                    <input
                      type="text"
                      required
                      value={ticketSubject}
                      onChange={(e) => setTicketSubject(e.target.value)}
                      placeholder="Ex: Problème d’accès ou question sur mon pass"
                      className="w-full rounded-lg border border-[#1e273e] bg-[#080d16] px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Catégorie *
                    </label>
                    <select
                      value={ticketCategory}
                      onChange={(e: any) => setTicketCategory(e.target.value)}
                      className="w-full rounded-lg border border-[#1e273e] bg-[#080d16] px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="commande">Question Commande / Clé</option>
                      <option value="technique">Support Technique</option>
                      <option value="compte">Compte & Portefeuille</option>
                      <option value="autre">Autre demande</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Votre message détaillé *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                    placeholder="Expliquez-nous votre problème pour une prise en charge rapide..."
                    className="w-full rounded-lg border border-[#1e273e] bg-[#080d16] px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCreatingTicket(false)}
                    className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500"
                  >
                    Envoyer le ticket
                  </button>
                </div>
              </form>
            )}

            {/* Tickets master-detail layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Left: Ticket list */}
              <div className="md:col-span-5 space-y-2">
                {tickets.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => setActiveTicketId(t.id)}
                    className={`cursor-pointer rounded-xl border p-3.5 transition-all ${
                      activeTicketId === t.id
                        ? 'border-blue-500/50 bg-[#121a2f]'
                        : 'border-[#1a2338] bg-[#0c1220] hover:border-[#283758]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-blue-400">{t.reference}</span>
                      <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                        t.status === 'resolved'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : t.status === 'open'
                          ? 'bg-blue-500/10 text-blue-400'
                          : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {t.status === 'resolved' ? 'Résolu' : t.status === 'open' ? 'Ouvert' : 'En cours'}
                      </span>
                    </div>
                    <h5 className="mt-1 text-xs font-bold text-white line-clamp-1">{t.subject}</h5>
                    <p className="mt-1 text-[11px] text-slate-400 flex items-center justify-between">
                      <span>{t.createdAt}</span>
                      <span>{t.messages.length} msg</span>
                    </p>
                  </div>
                ))}
              </div>

              {/* Right: Active Ticket Thread */}
              <div className="md:col-span-7 rounded-xl border border-[#1c2740] bg-[#0b101c] flex flex-col h-[420px]">
                {activeTicket ? (
                  <>
                    <div className="border-b border-[#182136] p-4 flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-white">{activeTicket.subject}</h4>
                        <p className="text-[10px] text-slate-400">Réf: {activeTicket.reference} · Créé le {activeTicket.createdAt}</p>
                      </div>
                      <button
                        onClick={() => setTicketStatus(activeTicket.id, activeTicket.status === 'resolved' ? 'open' : 'resolved')}
                        className="rounded border border-[#1f2a44] bg-[#12192a] px-2 py-1 text-[10px] text-slate-300 hover:text-white"
                      >
                        {activeTicket.status === 'resolved' ? 'Rouvrir' : 'Marquer résolu'}
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                      {activeTicket.messages.map((m) => (
                        <div
                          key={m.id}
                          className={`flex flex-col max-w-[85%] rounded-xl p-3 text-xs ${
                            m.sender === 'user'
                              ? 'ml-auto bg-[#1a2542] text-slate-100 border border-blue-500/20'
                              : 'mr-auto bg-[#101524] text-slate-200 border border-[#1e273e]'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-4 mb-1 text-[10px]">
                            <span className="font-bold text-blue-300">{m.authorName}</span>
                            <span className="text-slate-400 font-mono">{m.timestamp}</span>
                          </div>
                          <p className="leading-relaxed">{m.content}</p>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleSendReply} className="border-t border-[#182136] p-3 flex gap-2">
                      <input
                        type="text"
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Répondre au ticket..."
                        className="flex-1 rounded-lg border border-[#1e283e] bg-[#080d16] px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                      <button
                        type="submit"
                        className="rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-500"
                      >
                        <Send className="h-3.5 w-3.5" />
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-xs text-slate-500">
                    Sélectionnez un ticket pour afficher les échanges.
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

        {/* TAB 6: PROFIL & DISCORD INTEGRATION */}
        {activeTab === 'profile' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Main Discord Profile Header Banner */}
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-[#2b3964] bg-gradient-to-r from-[#0d1326] via-[#0b1020] to-[#121933] p-4 sm:p-6 md:p-8 shadow-2xl">
              <div className="absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-[#5865f2]/15 blur-3xl pointer-events-none" />
              
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
                
                {/* User & Discord Identity */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 sm:gap-5">
                  <div className="relative">
                    <div className="flex h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#5865f2] to-[#3b47c4] text-white shadow-xl shadow-[#5865f2]/20 border border-[#7289da]/30">
                      <DiscordIcon className="h-7 w-7 sm:h-9 sm:w-9 md:h-11 md:w-11" />
                    </div>
                    {user.discordConnected && (
                      <span
                        title="En ligne & synchronisé"
                        className="absolute -bottom-1 -right-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-[#0b1020] ring-2 ring-[#0b1020]"
                      >
                        <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-500 animate-pulse" />
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-wide">
                        {user.discordConnected ? (user.discordUsername || user.username) : user.username}
                      </h2>
                      {user.discordConnected ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-2 py-0.5 text-[9.5px] sm:text-[10px] font-mono font-bold text-emerald-400">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>SYNCHRONISÉ</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/15 px-2 py-0.5 text-[9.5px] sm:text-[10px] font-mono font-bold text-amber-400">
                          <span>NON ASSOCIÉ</span>
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] sm:text-xs text-slate-300">
                      <span className="font-mono text-slate-400">
                        {user.email}
                      </span>
                      {user.discordConnected && user.discordId && (
                        <span className="inline-flex items-center gap-1 font-mono text-slate-400">
                          <span>ID :</span>
                          <span className="text-slate-200">{user.discordId}</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(user.discordId || '', 'ID Discord')}
                            className="text-slate-400 hover:text-white transition-colors"
                            title="Copier l'identifiant Discord"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        </span>
                      )}
                      <span className="text-slate-400">
                        Membre depuis {user.joinedAt}
                      </span>
                    </div>

                    {user.discordConnected && (
                      <p className="text-[10.5px] sm:text-[11px] text-[#8ea1e1] flex items-center gap-1.5 pt-0.5 sm:pt-1">
                        <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
                        <span>Rôles synchronisés en direct avec le bot officiel BASIC FRANCE.</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 lg:justify-end">
                  {user.discordConnected ? (
                    <>
                      <button
                        type="button"
                        onClick={handleSyncRoles}
                        disabled={isSyncingRoles}
                        className="inline-flex items-center gap-1.5 sm:gap-2 rounded-xl border border-blue-500/40 bg-[#141f3d] px-3 py-2 sm:px-4 sm:py-2.5 text-xs font-bold text-blue-200 hover:bg-blue-600 hover:text-white hover:border-blue-400 transition-all shadow-md shadow-blue-950/40 disabled:opacity-60 cursor-pointer"
                        title="Interroger le bot pour rafraîchir vos permissions"
                      >
                        <RefreshCw className={`h-3.5 w-3.5 ${isSyncingRoles ? 'animate-spin text-white' : 'text-blue-400'}`} />
                        <span>{isSyncingRoles ? 'Synchronisation...' : 'Resynchroniser'}</span>
                      </button>

                      <a
                        href={storeSettings.discordInviteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 sm:gap-2 rounded-xl bg-[#5865f2] px-3 py-2 sm:px-4 sm:py-2.5 text-xs font-bold text-white hover:bg-[#4752c4] transition-all shadow-lg shadow-[#5865f2]/25 cursor-pointer"
                      >
                        <DiscordIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        <span>Rejoindre le Serveur</span>
                        <ExternalLink className="h-3 w-3 opacity-80" />
                      </a>

                      <button
                        type="button"
                        onClick={toggleDiscordConnection}
                        className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 transition-all cursor-pointer"
                        title="Dissocier temporairement votre compte"
                      >
                        Dissocier
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={toggleDiscordConnection}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#5865f2] px-5 py-3 text-xs font-bold text-white hover:bg-[#4752c4] transition-all shadow-lg shadow-[#5865f2]/30 cursor-pointer"
                      >
                        <DiscordIcon className="h-4 w-4" />
                        <span>Connecter avec Discord</span>
                      </button>
                      <a
                        href={storeSettings.discordInviteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-[#233152] bg-[#0c1426] px-4 py-3 text-xs font-semibold text-slate-300 hover:text-white hover:border-blue-500/50 transition-all"
                      >
                        <span>Visiter le Serveur</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </>
                  )}
                </div>

              </div>

              {/* Real-time Bot status footer pill */}
              <div className="mt-6 pt-4 border-t border-[#1b253e] flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="font-medium text-slate-300">
                    Bot BASIC FRANCE #0001 :
                  </span>
                  <span className="text-emerald-400 font-mono font-semibold">Opérationnel & Connecté</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>Dernière vérification : <strong className="text-slate-300 font-mono">{lastRoleSyncTime}</strong></span>
                  <span className="text-slate-600">|</span>
                  <span>Membres du serveur : <strong className="text-white font-mono">{storeSettings.discordServerMembers.toLocaleString()}</strong></span>
                </div>
              </div>

            </div>

            {/* Two-Column Grid: Left Content (Roles, Server Hub, Notifs) / Right Content (Profile Edit, Summary, Guarantees) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* LEFT COLUMN (8 COLS) */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Section 1: Synchronized Roles & Benefits */}
                <div className="rounded-xl border border-[#1f2c48] bg-[#0c1220] p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#18233a] pb-3">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                        <Award className="h-4 w-4 text-[#5865f2]" />
                        <span>Mes Rôles Discord Officiels & Privilèges</span>
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Attribués automatiquement dès la finalisation de vos commandes sur la boutique.
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20 w-fit">
                      {user.discordConnected ? `${user.discordRoles.length} Rôles Actifs` : '0 Rôle synchronisé'}
                    </span>
                  </div>

                  {/* Active Roles Showcase */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    
                    {/* Role 1: Client */}
                    <div className="rounded-xl border border-[#2b3a62] bg-[#090f1d] p-3.5 space-y-2 relative overflow-hidden">
                      <div className="flex items-center justify-between">
                        <span className="rounded-md border border-blue-500/40 bg-blue-500/15 px-2.5 py-1 text-xs font-bold text-blue-300">
                          @Client
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 font-mono">
                          <Check className="h-3 w-3" /> ACTIF
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        Accès au salon VIP privé <strong className="text-white">#clients-lounge</strong>, priorité absolue sur les tickets de support et accès prioritaire aux arrivages de pass.
                      </p>
                    </div>

                    {/* Role 2: Membre Vérifié */}
                    <div className="rounded-xl border border-[#23354b] bg-[#090f1d] p-3.5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="rounded-md border border-emerald-500/40 bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-300">
                          @Membre Vérifié
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 font-mono">
                          <Check className="h-3 w-3" /> ACTIF
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        Accès illimité aux discussions générales, canaux vocaux de musculation et partage de programmes entre passionnés.
                      </p>
                    </div>

                    {/* Role 3: Team Basic France */}
                    <div className="rounded-xl border border-[#3b2b62] bg-[#090f1d] p-3.5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="rounded-md border border-purple-500/40 bg-purple-500/15 px-2.5 py-1 text-xs font-bold text-purple-300">
                          @Team Basic France
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-purple-400 font-mono">
                          <Check className="h-3 w-3" /> ACTIF
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        Statut contributeur : avant-première sur les bêtas de programmes de musculation et invitations aux tournois fitness.
                      </p>
                    </div>

                    {/* Role 4: VIP Partner */}
                    <div className="rounded-xl border border-dashed border-[#2b354e] bg-[#080d17]/60 p-3.5 space-y-2 opacity-85">
                      <div className="flex items-center justify-between">
                        <span className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-300">
                          @VIP Fitness Partner
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {user.referralCount >= 5 ? 'DÉBLOCABLE' : `${user.referralCount}/5 parrainages`}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Déblocable dès 5 filleuls parrainés ou 100€ d’achats cumulés. Cashback parrainage majoré à 15% et badge doré sur Discord.
                      </p>
                    </div>

                  </div>

                  {/* 4 Unlocked Privileges Pillars */}
                  <div className="pt-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                      Privilèges garantis pour votre compte :
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-2.5 rounded-lg border border-[#1b253c] bg-[#080d17] p-2.5">
                        <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span className="text-slate-300">Salon privé VIP 100% réservé aux clients</span>
                      </div>
                      <div className="flex items-center gap-2.5 rounded-lg border border-[#1b253c] bg-[#080d17] p-2.5">
                        <Bot className="h-4 w-4 text-blue-400 shrink-0" />
                        <span className="text-slate-300">Support prioritaire géré par ticket Discord</span>
                      </div>
                      <div className="flex items-center gap-2.5 rounded-lg border border-[#1b253c] bg-[#080d17] p-2.5">
                        <Sparkles className="h-4 w-4 text-purple-400 shrink-0" />
                        <span className="text-slate-300">Notification en avant-première des réassorts</span>
                      </div>
                      <div className="flex items-center gap-2.5 rounded-lg border border-[#1b253c] bg-[#080d17] p-2.5">
                        <Key className="h-4 w-4 text-amber-400 shrink-0" />
                        <span className="text-slate-300">Tirages au sort mensuels de cartes cadeaux</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Server Channels Hub */}
                <div className="rounded-xl border border-[#1f2c48] bg-[#0c1220] p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#18233a] pb-3">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                        <Hash className="h-4 w-4 text-[#5865f2]" />
                        <span>Salons Clés du Serveur Communautaire</span>
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Plus de 14 850 sportifs et membres actifs partagent quotidiennement sur notre Discord.
                      </p>
                    </div>
                    <a
                      href={storeSettings.discordInviteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      <span>Ouvrir Discord</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    
                    <a
                      href={storeSettings.discordInviteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group rounded-xl border border-[#1c263e] bg-[#090f1d] p-3.5 hover:border-blue-500/40 hover:bg-[#0f1730] transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-white group-hover:text-blue-300 transition-colors flex items-center gap-1.5">
                          <span className="text-slate-400">#</span>
                          <span>📢・annonces-officielles</span>
                        </span>
                        <ExternalLink className="h-3 w-3 text-slate-500 group-hover:text-white transition-colors" />
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                        Arrivage des pass Basic-Fit & Fitness Park, baisses de prix et maintenances de la plateforme.
                      </p>
                    </a>

                    <a
                      href={storeSettings.discordInviteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group rounded-xl border border-[#1c263e] bg-[#090f1d] p-3.5 hover:border-blue-500/40 hover:bg-[#0f1730] transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-white group-hover:text-blue-300 transition-colors flex items-center gap-1.5">
                          <span className="text-slate-400">#</span>
                          <span>💬・entraide-musculation</span>
                        </span>
                        <ExternalLink className="h-3 w-3 text-slate-500 group-hover:text-white transition-colors" />
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                        Conseils d’entraînement, questions sur les machines, nutrition, morphologie et prise de masse.
                      </p>
                    </a>

                    <a
                      href={storeSettings.discordInviteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group rounded-xl border border-[#1c263e] bg-[#090f1d] p-3.5 hover:border-blue-500/40 hover:bg-[#0f1730] transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-white group-hover:text-blue-300 transition-colors flex items-center gap-1.5">
                          <span className="text-slate-400">#</span>
                          <span>🎫・tickets-assistance</span>
                        </span>
                        <ExternalLink className="h-3 w-3 text-slate-500 group-hover:text-white transition-colors" />
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                        Ouvrez un ticket privé en 1 clic avec le bot, traité sous quelques minutes par notre équipe.
                      </p>
                    </a>

                    <a
                      href={storeSettings.discordInviteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group rounded-xl border border-[#1c263e] bg-[#090f1d] p-3.5 hover:border-blue-500/40 hover:bg-[#0f1730] transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-white group-hover:text-blue-300 transition-colors flex items-center gap-1.5">
                          <span className="text-slate-400">#</span>
                          <span>🎁・giveaways-concours</span>
                        </span>
                        <ExternalLink className="h-3 w-3 text-slate-500 group-hover:text-white transition-colors" />
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                        Tirages au sort réguliers réservés aux membres : pass offerts et bons d’achat à gagner.
                      </p>
                    </a>

                  </div>
                </div>

                {/* Section 3: Discord Bot DM Notification Preferences */}
                <div className="rounded-xl border border-[#1f2c48] bg-[#0c1220] p-6 space-y-4">
                  <div className="border-b border-[#18233a] pb-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                      <Bell className="h-4 w-4 text-[#5865f2]" />
                      <span>Préférences des Notifications en Message Privé (MP)</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Configurez ce que le robot BASIC FRANCE vous transmet par message privé Discord.
                    </p>
                  </div>

                  <div className="space-y-3">
                    
                    {/* Toggle 1: DM Order & Key */}
                    <div className="flex items-center justify-between rounded-xl border border-[#1b253c] bg-[#080d17] p-3.5">
                      <div className="space-y-0.5 pr-4">
                        <p className="text-xs font-bold text-white">
                          Confirmation de commande & Clé d'accès
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Recevez instantanément votre récapitulatif de paiement et votre clé numérique en MP dès la validation du panier.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleNotificationPref('dmOrder')}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          discordNotificationPrefs.dmOrder ? 'bg-[#5865f2]' : 'bg-[#1e273e]'
                        }`}
                        role="switch"
                        aria-checked={discordNotificationPrefs.dmOrder}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                            discordNotificationPrefs.dmOrder ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Toggle 2: Support Ticket Replies */}
                    <div className="flex items-center justify-between rounded-xl border border-[#1b253c] bg-[#080d17] p-3.5">
                      <div className="space-y-0.5 pr-4">
                        <p className="text-xs font-bold text-white">
                          Alertes réponses aux Tickets de Support
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Soyez notifié sur Discord dès qu'un agent ou modérateur répond à l'une de vos demandes web.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleNotificationPref('dmTicket')}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          discordNotificationPrefs.dmTicket ? 'bg-[#5865f2]' : 'bg-[#1e273e]'
                        }`}
                        role="switch"
                        aria-checked={discordNotificationPrefs.dmTicket}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                            discordNotificationPrefs.dmTicket ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Toggle 3: Referral commissions */}
                    <div className="flex items-center justify-between rounded-xl border border-[#1b253c] bg-[#080d17] p-3.5">
                      <div className="space-y-0.5 pr-4">
                        <p className="text-xs font-bold text-white">
                          Gains de Parrainage & Commissions crédités
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Alerte immédiate quand un de vos amis commande et que votre solde de portefeuille augmente.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleNotificationPref('dmReferral')}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          discordNotificationPrefs.dmReferral ? 'bg-[#5865f2]' : 'bg-[#1e273e]'
                        }`}
                        role="switch"
                        aria-checked={discordNotificationPrefs.dmReferral}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                            discordNotificationPrefs.dmReferral ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Toggle 4: Flash Promos */}
                    <div className="flex items-center justify-between rounded-xl border border-[#1b253c] bg-[#080d17] p-3.5">
                      <div className="space-y-0.5 pr-4">
                        <p className="text-xs font-bold text-white">
                          Codes promos flash & Réductions exclusives
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Recevez les remises temporaires de -20% à -30% réservées aux membres avant publication publique.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleNotificationPref('dmPromos')}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          discordNotificationPrefs.dmPromos ? 'bg-[#5865f2]' : 'bg-[#1e273e]'
                        }`}
                        role="switch"
                        aria-checked={discordNotificationPrefs.dmPromos}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                            discordNotificationPrefs.dmPromos ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN (4 COLS): Account Management, Metrics & Guarantees */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Account Details & Edit Card */}
                <div className="rounded-xl border border-[#1f2c48] bg-[#0c1220] p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#18233a] pb-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                      <User className="h-4 w-4 text-blue-400" />
                      <span>Coordonnées Client</span>
                    </h3>
                    {!isEditingProfile && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditUsername(user.username);
                          setEditDiscordUsername(user.discordUsername || '');
                          setIsEditingProfile(true);
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-400 hover:text-blue-300"
                      >
                        <Edit2 className="h-3 w-3" />
                        <span>Modifier</span>
                      </button>
                    )}
                  </div>

                  {isEditingProfile ? (
                    <form onSubmit={handleSaveProfile} className="space-y-3.5">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                          Nom d'utilisateur Boutique :
                        </label>
                        <input
                          type="text"
                          value={editUsername}
                          onChange={(e) => setEditUsername(e.target.value)}
                          className="w-full rounded-lg border border-[#233152] bg-[#080d16] px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                          Pseudo Discord (#tag) :
                        </label>
                        <input
                          type="text"
                          value={editDiscordUsername}
                          onChange={(e) => setEditDiscordUsername(e.target.value)}
                          placeholder="Ex: AlexFit#7712"
                          className="w-full rounded-lg border border-[#233152] bg-[#080d16] px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="submit"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 py-2 text-xs font-bold text-white hover:bg-blue-500 transition-colors"
                        >
                          <Save className="h-3.5 w-3.5" />
                          <span>Enregistrer</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditingProfile(false)}
                          className="rounded-lg border border-[#222e4c] px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-[#12192d] transition-colors"
                        >
                          Annuler
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-3 text-xs">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500">Nom du compte</span>
                        <p className="font-semibold text-white mt-0.5">{user.username}</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500">Adresse e-mail</span>
                        <p className="font-mono text-slate-300 mt-0.5">{user.email}</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500">Identifiant Discord lié</span>
                        <p className="font-mono text-[#7289da] font-semibold mt-0.5">
                          {user.discordConnected ? (user.discordUsername || 'Connecté') : 'Non relié'}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500">Référence client</span>
                        <p className="font-mono text-slate-400 text-[11px] mt-0.5">{user.id}</p>
                      </div>
                    </div>
                  )}

                  {/* Summary Badges Grid */}
                  <div className="pt-3 border-t border-[#18233a] grid grid-cols-2 gap-2 text-center">
                    <div className="rounded-lg border border-[#1b253c] bg-[#080d17] p-2.5">
                      <span className="text-[10px] text-slate-500 font-bold block uppercase">Commandes</span>
                      <span className="font-mono text-base font-extrabold text-white">{orders.length}</span>
                    </div>
                    <div className="rounded-lg border border-[#1b253c] bg-[#080d17] p-2.5">
                      <span className="text-[10px] text-slate-500 font-bold block uppercase">Licences</span>
                      <span className="font-mono text-base font-extrabold text-blue-400">{userDeliveries.length}</span>
                    </div>
                    <div className="rounded-lg border border-[#1b253c] bg-[#080d17] p-2.5">
                      <span className="text-[10px] text-slate-500 font-bold block uppercase">Solde</span>
                      <span className="font-mono text-base font-extrabold text-emerald-400">{user.walletBalance.toFixed(2)}€</span>
                    </div>
                    <div className="rounded-lg border border-[#1b253c] bg-[#080d17] p-2.5">
                      <span className="text-[10px] text-slate-500 font-bold block uppercase">Filleuls</span>
                      <span className="font-mono text-base font-extrabold text-purple-400">{user.referralCount}</span>
                    </div>
                  </div>
                </div>

                {/* FAQ & Security Guarantees */}
                <div className="rounded-xl border border-[#1f2c48] bg-[#0c1220] p-6 space-y-3.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    <span>Sécurité & FAQ Discord</span>
                  </h4>
                  
                  <div className="space-y-3 text-[11px] text-slate-400 leading-relaxed">
                    <div className="rounded-lg border border-[#1b253c] bg-[#080d17] p-3 space-y-1">
                      <p className="font-semibold text-slate-200">
                        Mes accès Discord sont-ils sécurisés ?
                      </p>
                      <p>
                        Oui, à 100%. Nous n’avons jamais accès à votre mot de passe Discord. Seul votre identifiant public est utilisé pour vous attribuer vos rôles via notre bot certifié.
                      </p>
                    </div>

                    <div className="rounded-lg border border-[#1b253c] bg-[#080d17] p-3 space-y-1">
                      <p className="font-semibold text-slate-200">
                        Combien de temps prend la synchronisation ?
                      </p>
                      <p>
                        Elle est immédiate ! Dès la validation de commande, notre robot attribue votre rôle « Client » en moins de 30 secondes. Si besoin, cliquez sur « Resynchroniser mes rôles ».
                      </p>
                    </div>

                    <div className="rounded-lg border border-[#1b253c] bg-[#080d17] p-3 space-y-1">
                      <p className="font-semibold text-slate-200">
                        Besoin d'aide supplémentaire ?
                      </p>
                      <p>
                        Ouvrez un ticket dans l'onglet <strong className="text-blue-300 cursor-pointer" onClick={() => setActiveTab('support')}>Support</strong> ou contactez un modérateur en direct sur notre serveur.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>

      {/* Digital Receipt / Invoice Modal for complete customer autonomy */}
      {selectedOrderForInvoice && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="invoice-modal-title"
          onClick={() => setSelectedOrderForInvoice(null)}
          className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-3 sm:p-6 cursor-pointer flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl rounded-2xl border border-[#223154] bg-[#0c1222] text-slate-200 shadow-2xl overflow-hidden cursor-default my-4"
          >
            {/* Invoice Top Header */}
            <div className="flex items-center justify-between border-b border-[#1b253e] bg-[#090d16] px-6 py-4">
              <div className="flex items-center gap-3">
                <BFSLogo size="sm" />
                <div>
                  <h3 id="invoice-modal-title" className="font-luxury text-sm font-black uppercase text-white tracking-wider">
                    {storeSettings.storeName} · Reçu Numérique Officiel
                  </h3>
                  <p className="text-[10px] font-mono text-slate-400">
                    Réf : {selectedOrderForInvoice.reference}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrderForInvoice(null)}
                className="rounded-lg border border-[#202b44] p-1.5 text-slate-400 hover:text-white hover:bg-[#141b2e] transition-colors cursor-pointer"
                aria-label="Fermer le reçu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Invoice Content */}
            <div className="p-6 space-y-6 text-xs">
              
              {/* Order Meta Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl border border-[#1b2438] bg-[#090e1a] p-4">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Informations Client</p>
                  <p className="font-semibold text-white">{user.username}</p>
                  <p className="text-slate-400 font-mono text-[11px]">{selectedOrderForInvoice.customerEmail}</p>
                  {selectedOrderForInvoice.discordUsername && (
                    <p className="text-[#5865f2] font-mono text-[11px]">Discord : {selectedOrderForInvoice.discordUsername}</p>
                  )}
                </div>
                <div className="space-y-1 sm:text-right">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Règlement & Délivrance</p>
                  <p className="text-slate-300">Émis le : {selectedOrderForInvoice.createdAt}</p>
                  <p className="text-slate-300 capitalize">
                    Paiement : {selectedOrderForInvoice.paymentMethod === 'credit_card' ? 'Carte Bancaire (Chiffrée SSL)' : 'Portefeuille BASIC FRANCE'}
                  </p>
                  <p className="text-emerald-400 font-bold">Statut : Validé & Clés délivrées</p>
                </div>
              </div>

              {/* Items Table */}
              <div>
                <p className="text-[11px] uppercase font-bold text-slate-400 mb-2">Prestations Numériques Achetées</p>
                <div className="overflow-x-auto rounded-xl border border-[#1b2438] bg-[#080d17]">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-[#182136] bg-[#060912] text-slate-400 uppercase font-semibold text-[10px]">
                      <tr>
                        <th className="px-4 py-2.5">Article</th>
                        <th className="px-4 py-2.5 text-center">Quantité</th>
                        <th className="px-4 py-2.5 text-right">Prix Unitaire</th>
                        <th className="px-4 py-2.5 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#141b2c] text-slate-300">
                      {selectedOrderForInvoice.items.map((it, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-3 font-semibold text-white">
                            {it.productName}
                          </td>
                          <td className="px-4 py-3 text-center font-mono">x{it.quantity}</td>
                          <td className="px-4 py-3 text-right font-mono">{it.unitPrice.toFixed(2)}€</td>
                          <td className="px-4 py-3 text-right font-mono font-bold text-white">
                            {(it.unitPrice * it.quantity).toFixed(2)}€
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Totals Breakdown */}
              <div className="rounded-xl border border-[#1b2438] bg-[#090e1a] p-4 space-y-2 max-w-xs ml-auto text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Sous-total :</span>
                  <span className="font-mono text-slate-200">{selectedOrderForInvoice.subtotal.toFixed(2)}€</span>
                </div>
                {selectedOrderForInvoice.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Remise ({selectedOrderForInvoice.promoCodeApplied || 'Code'}) :</span>
                    <span className="font-mono">-{selectedOrderForInvoice.discountAmount.toFixed(2)}€</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>TVA (Biens numériques) :</span>
                  <span className="font-mono text-slate-200">0.00€</span>
                </div>
                <div className="flex justify-between border-t border-[#1a2338] pt-2 font-bold text-white text-sm">
                  <span>Total Réglé :</span>
                  <span className="font-mono text-emerald-400 text-base">{selectedOrderForInvoice.total.toFixed(2)}€</span>
                </div>
              </div>

              {/* Associated Digital Keys */}
              {selectedOrderForInvoice.deliveries && selectedOrderForInvoice.deliveries.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[11px] uppercase font-bold text-slate-400">Clés et identifiants rattachés</p>
                  <div className="space-y-2">
                    {selectedOrderForInvoice.deliveries.map((del) => (
                      <div key={del.id} className="flex items-center justify-between rounded-lg border border-[#1e2a44] bg-[#080d16] p-3 text-xs">
                        <div>
                          <p className="font-bold text-white">{del.productName}</p>
                          <code className="font-mono text-blue-300 text-xs font-semibold">{del.secretContent}</code>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(del.secretContent, 'Clé')}
                          className="flex items-center gap-1 rounded bg-[#16213a] px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-blue-600 transition-colors cursor-pointer"
                        >
                          <Copy className="h-3 w-3" />
                          <span>Copier</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Legal guarantee note */}
              <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-2 border-t border-[#182136]">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Ce document officiel certifie l'acquisition légale des droits d'accès 12 mois et l'enregistrement de votre transaction.</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#1b253e] bg-[#090d16] px-6 py-4">
              <button
                type="button"
                onClick={() => {
                  handleQuickSupportForOrder(selectedOrderForInvoice.reference);
                  setSelectedOrderForInvoice(null);
                }}
                className="text-xs text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
              >
                Une question sur cette facture ? Ouvrir un ticket d'aide ↗
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#202b44] bg-[#12192c] px-4 py-2 text-xs font-bold text-slate-200 hover:text-white hover:bg-[#1a243e] transition-colors cursor-pointer"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>Imprimer / PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedOrderForInvoice(null)}
                  className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 transition-colors cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
