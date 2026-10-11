import React from 'react';
import { ExternalLink, Users, Bell, Award, MessageSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BFSLogo } from './BFSBrandLogo';

export const DiscordSection: React.FC = () => {
  const { storeSettings } = useApp();

  return (
    <section className="relative overflow-hidden border-b border-[#182032] bg-gradient-to-b from-[#090d16] to-[#0c1220] py-8 sm:py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 items-center gap-6 sm:gap-10 lg:grid-cols-12">
          
          {/* Left Description & Value */}
          <div className="lg:col-span-7 space-y-3.5 sm:space-y-5">
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#5865f2]">
              <span>Communauté Officielle</span>
              <span aria-hidden="true">·</span>
              <span>Rejoignez l’Élite</span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white">
              Le serveur Discord BASIC FRANCE au cœur de l’expérience.
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              Alertes de réassort en direct, attribution automatique de votre rôle « Client » après commande et salons d’entraide 24/7 entre athlètes et passionnés.
            </p>

            {/* Server key perks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1 sm:pt-2 text-[11px] sm:text-xs text-slate-300">
              <div className="flex items-center gap-2.5 rounded-lg border border-[#1b253d] bg-[#0d1424] p-2.5 sm:p-3">
                <Bell className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-400 shrink-0" />
                <span>Alertes de réassort pass instantanées</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-lg border border-[#1b253d] bg-[#0d1424] p-2.5 sm:p-3">
                <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-400 shrink-0" />
                <span>Rôle « Client » synchronisé avec vos achats</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-lg border border-[#1b253d] bg-[#0d1424] p-2.5 sm:p-3">
                <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400 shrink-0" />
                <span>Salons d’entraide nutrition & programmes</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-lg border border-[#1b253d] bg-[#0d1424] p-2.5 sm:p-3">
                <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#5865f2] shrink-0" />
                <span>Partenaires d’entraînement par ville</span>
              </div>
            </div>

            <div className="pt-1 sm:pt-2">
              <a
                href={storeSettings.discordInviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#5865f2] px-4 py-2.5 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-bold text-white shadow-xl shadow-indigo-950/40 transition-all hover:bg-[#4752c4] active:scale-[0.99]"
              >
                <span>Rejoindre le serveur ({storeSettings.discordServerMembers.toLocaleString('fr-FR')} membres)</span>
                <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </a>
            </div>
          </div>

          {/* Right Simulated Discord Server Widget */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-[#232d4b] bg-[#121626] p-6 shadow-2xl space-y-4">
              
              <div className="flex items-center justify-between border-b border-[#1b233a] pb-4">
                <div className="flex items-center gap-3">
                  <BFSLogo size="sm" />
                  <div>
                    <h4 className="text-sm font-black italic tracking-wide text-white">BASIC FRANCE</h4>
                    <p className="text-[11px] text-slate-400 font-mono">discord.gg/basicfrance</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-emerald-400">
                    2 418 en ligne
                  </span>
                </div>
              </div>

              {/* Bot Activity Preview */}
              <div className="space-y-2 text-xs">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Activité du Bot Officiel BASIC FRANCE
                </p>

                <div className="rounded-xl border border-[#1b253d] bg-[#0c101d] p-3 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#5865f2]">BASIC BOT v2.4</span>
                    <span className="text-slate-400 text-[10px]">Il y a 3 min</span>
                  </div>
                  <p className="text-slate-300">
                    🎉 Nouveau pass activé pour <strong>Lucas#9182</strong>. Rôle <strong>Client</strong> attribué avec succès !
                  </p>
                </div>

                <div className="rounded-xl border border-[#1b253d] bg-[#0c101d] p-3 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#5865f2]">BASIC BOT v2.4</span>
                    <span className="text-slate-400 text-[10px]">Il y a 14 min</span>
                  </div>
                  <p className="text-slate-300">
                    ⚡ Réassort terminé : nouveaux pass <strong>Fitness Park 12 Mois (60€)</strong> disponibles.
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-[#0d101c] p-3 text-[11px] text-slate-400 text-center">
                Livraison garantie sous 12h & synchronisation automatique de votre rôle Discord.
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
