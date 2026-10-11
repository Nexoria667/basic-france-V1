import React, { useState } from 'react';
import { X, ShieldCheck, FileText, RefreshCw, Lock, HelpCircle, CheckCircle2 } from 'lucide-react';

export type LegalDocType = 'cgv' | 'refund' | 'privacy' | 'mentions';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDoc?: LegalDocType;
}

interface LegalTab {
  id: LegalDocType;
  title: string;
  icon: React.ElementType;
}

const TABS: LegalTab[] = [
  { id: 'cgv', title: 'Conditions Générales de Vente', icon: FileText },
  { id: 'refund', title: 'Politique de Remboursement', icon: RefreshCw },
  { id: 'privacy', title: 'Protection des Données (RGPD)', icon: Lock },
  { id: 'mentions', title: 'Mentions Légales', icon: ShieldCheck }
];

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialDoc = 'cgv'
}) => {
  const [activeTab, setActiveTab] = useState<LegalDocType>(initialDoc);

  // Sync if initialDoc changes when opened
  React.useEffect(() => {
    if (isOpen && initialDoc) {
      setActiveTab(initialDoc);
    }
  }, [isOpen, initialDoc]);

  // Close on Escape key
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer"
    >
      <div 
        className="relative flex flex-col w-full max-w-3xl max-h-[90vh] rounded-2xl border border-[#1e293b] bg-[#0c101d] text-slate-200 shadow-2xl overflow-hidden cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#182136] px-5 py-4 bg-[#080b14]">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 id="legal-modal-title" className="text-base font-bold text-white tracking-wide">
                Informations Légales & Conformité
              </h2>
              <p className="text-[11px] text-slate-400">
                BASIC FRANCE STORE · Vente de produits numériques et clés d’accès
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer la fenêtre légale"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-[#182136] bg-[#090d18] px-3 sm:px-5 overflow-x-auto no-scrollbar gap-1 pt-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold whitespace-nowrap rounded-t-lg border-b-2 transition-all ${
                  isActive
                    ? 'border-blue-500 bg-[#0f1527] text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                <span>{tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {activeTab === 'cgv' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 text-xs text-blue-300">
                <span className="font-bold text-white block mb-1">Résumé en clair :</span>
                Toutes nos offres sont des produits digitaux avec délivrance immédiate. À validation de la commande, vous obtenez votre clé d’activation unique et votre accès client.
              </div>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 text-[10px] text-blue-400 font-mono">1</span>
                  Objet & Champ d'application
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Les présentes Conditions Générales de Vente (CGV) régissent l'ensemble des ventes de produits et services numériques effectuées sur la plateforme <strong>BASIC FRANCE STORE</strong>. En confirmant sa commande, le client reconnaît avoir pris connaissance et accepté sans réserve l'intégralité de ces conditions.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 text-[10px] text-blue-400 font-mono">2</span>
                  Nature des produits & Délivrance
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Tous les articles commercialisés sont des <strong>biens immatériels et numériques</strong> (clés d'activation, abonnements prépayés 12 mois, accès digitaux). 
                  La délivrance s'effectue automatiquement et instantanément après validation du paiement :
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-400 text-xs sm:text-sm">
                  <li>Affichage immédiat de la clé d’activation à l'écran de confirmation.</li>
                  <li>Archivage permanent et consultable dans la rubrique <em>« Mes Achats »</em> de l'espace client.</li>
                  <li>Attribution du rôle Discord <em>« Client »</em> sur le serveur communautaire si l'identifiant Discord a été renseigné.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 text-[10px] text-blue-400 font-mono">3</span>
                  Prix et Modalités de Paiement
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Les prix sont indiqués en Euros (€) toutes taxes comprises. Le paiement s'effectue via les prestataires sécurisés supportés (Carte bancaire, Apple Pay, Google Pay, Portefeuille de crédits interne). Aucune coordonnée bancaire n'est stockée ni traitée sur nos serveurs.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 text-[10px] text-blue-400 font-mono">4</span>
                  Garantie & Support
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Chaque clé bénéficie d'une <strong>garantie de fonctionnement</strong>. En cas d'anomalie technique lors de l'activation, notre équipe d'assistance intervient sous 24h via le système de tickets du support ou sur Discord.
                </p>
              </section>
            </div>
          )}

          {activeTab === 'refund' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs text-amber-300">
                <span className="font-bold text-white block mb-1">Règle de rétractation (Art. L221-28 du Code de la Consommation) :</span>
                En validant votre commande de contenu numérique délivré immédiatement, vous renoncez expressément au délai de rétractation de 14 jours une fois la clé dévoilée. Néanmoins, notre garantie de remplacement s'applique si la clé s'avère défaillante !
              </div>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-[10px] text-amber-400 font-mono">1</span>
                  Conditions d'éligibilité au remboursement ou remplacement
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Un remboursement ou un remplacement immédiat est accordé dans les cas suivants :
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-400 text-xs sm:text-sm">
                  <li><strong>Clé non fonctionnelle ou invalide à la délivrance :</strong> signalée dans un délai de 48 heures suivant l'achat avec justificatif.</li>
                  <li><strong>Rupture de stock imprévue :</strong> si une commande validée ne peut être délivrée par nos systèmes sous 12h.</li>
                  <li><strong>Double débit avéré :</strong> en cas d'erreur de transaction bancaire signalée.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-[10px] text-amber-400 font-mono">2</span>
                  Exclusions de remboursement
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-slate-400 text-xs sm:text-sm">
                  <li>Erreur de commande de l'acheteur une fois la clé révélée et fonctionnelle.</li>
                  <li>Tentative d'activation sur un compte non éligible aux conditions spécifiques du prestataire externe (ex: compte déjà souscrit à une offre incompatible).</li>
                  <li>Abus avéré ou signalement frauduleux.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-[10px] text-amber-400 font-mono">3</span>
                  Procédure de réclamation
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Pour ouvrir une demande, rendez-vous dans l'onglet <strong>Support / Tickets</strong> depuis votre compte ou ouvrez un ticket d'assistance sur notre serveur Discord officiel. Veuillez joindre la référence de commande (ex: <code>ORD-XXXXX</code>) et une capture d'écran du message d'erreur.
                </p>
              </section>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-xs text-emerald-300">
                <span className="font-bold text-white block mb-1">Notre engagement confidentialité :</span>
                Nous ne vendons, ne louons et ne partageons aucune de vos données personnelles à des tiers à des fins publicitaires. Seules les informations strictement nécessaires à la délivrance numérique de vos clés sont conservées.
              </div>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white">Données collectées</h3>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Dans le cadre strict de l'exécution de vos commandes, nous traitons :
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-400 text-xs sm:text-sm">
                  <li><strong>Adresse e-mail :</strong> pour l'envoi de la facture et des identifiants de suivi.</li>
                  <li><strong>Pseudo et ID Discord :</strong> uniquement pour l'attribution facultative du rôle « Client » et la synchronisation communautaire.</li>
                  <li><strong>Historique d'achat et clés délivrées :</strong> pour vous permettre de retrouver vos accès à tout moment.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white">Sécurité des données de paiement</h3>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Toutes les transactions bancaires sont traitées via des passerelles de paiement sécurisées et certifiées PCI-DSS. Nous n'avons à aucun moment accès à vos numéros de carte bancaire, codes secrets ou cryptogrammes.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white">Vos droits (RGPD)</h3>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Vous pouvez exercer ce droit à tout moment via un ticket support.
                </p>
              </section>
            </div>
          )}

          {activeTab === 'mentions' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white">Éditeur de la plateforme</h3>
                <p className="text-slate-400 text-xs sm:text-sm">
                  La boutique en ligne <strong>BASIC FRANCE STORE</strong> est éditée pour la communauté Discord Basic France.<br />
                  Contact administratif et commercial : <code>contact@basicfrance.store</code><br />
                  Support technique : Ouvert 7j/7 via le portail de tickets et le serveur Discord.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white">Hébergement</h3>
                <p className="text-slate-400 text-xs sm:text-sm">
                  L'application web et les infrastructures cloud sont hébergées dans l'Union Européenne sur des infrastructures certifiées haute disponibilité avec chiffrement de niveau bancaire.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white">Propriété intellectuelle</h3>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Les marques et logos tiers cités (Basic-Fit®, Fitness Park®) restent la propriété exclusive de leurs détenteurs respectifs et sont utilisés uniquement à titre informatif et d'identification des compatibilités de services.
                </p>
              </section>

              <div className="rounded-xl border border-slate-800 bg-[#0d1322] p-4 flex items-center gap-3 text-xs text-slate-400">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <span>Plateforme déclarée et conforme aux standards de commerce électronique européens.</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#182136] px-5 py-3.5 bg-[#080b14] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
            <span>Dernière mise à jour : 11 Octobre 2026</span>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold text-white transition-all shadow-md active:scale-95"
          >
            J'ai compris / Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
