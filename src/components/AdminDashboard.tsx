import React, { useState } from 'react';
import {
  Package,
  ShoppingBag,
  Tag,
  LifeBuoy,
  Settings,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  RefreshCw,
  Users,
  DollarSign,
  ArrowLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product, PromoCode } from '../types';
import { BrandThumbnail } from './BrandLogos';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    refundOrder,
    promoCodes,
    addPromoCode,
    togglePromoCode,
    tickets,
    replyToTicket,
    setTicketStatus,
    storeSettings,
    updateStoreSettings,
    user,
    categories,
    addToast,
    setCurrentView,
    setIsAdminMode
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'products' | 'orders' | 'promos' | 'support' | 'settings'>('products');
  
  // Product creation form
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState(categories[0]?.id || 'basic-fit');
  const [newProdPrice, setNewProdPrice] = useState('29.90');
  const [newProdStock, setNewProdStock] = useState('50');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdDeliverable, setNewProdDeliverable] = useState<'license_key' | 'discord_role' | 'account_access'>('license_key');

  // New Promo form
  const [isAddingPromo, setIsAddingPromo] = useState(false);
  const [promoCodeName, setPromoCodeName] = useState('');
  const [promoPercent, setPromoPercent] = useState('15');

  // Settings form
  const [settingsForm, setSettingsForm] = useState(storeSettings);

  // Ticket reply in admin
  const [adminTicketReply, setAdminTicketReply] = useState<{ [id: string]: string }>({});

  const totalRevenue = orders.reduce((acc, o) => (o.status !== 'refunded' ? acc + o.total : acc), 0);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    const catObj = categories.find((c) => c.id === newProdCategory) || categories[0];

    const prodToCreate: Omit<Product, 'id'> = {
      name: newProdName,
      slug: newProdName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      categoryId: catObj.id,
      categoryName: catObj.name,
      price: parseFloat(newProdPrice) || 29.90,
      shortDescription: newProdDesc.slice(0, 80) || 'Accès numérique instantané délivré automatiquement.',
      description: newProdDesc || 'Accès complet garanti par l’équipe BASIC FRANCE.',
      image: '/src/assets/images/product_gym_pass_1791638976770.jpg',
      features: ['Délivrance 100% numérique', 'Activation immédiate', 'Support 7j/7'],
      deliverables: [
        {
          type: newProdDeliverable,
          label: `Accès Numérique (${newProdDeliverable})`,
          instructions: 'Code d’activation vérifiable immédiatement.'
        }
      ],
      inStock: true,
      stockCount: parseInt(newProdStock) || 50,
      rating: 5.0,
      reviewsCount: 1,
      activationDelay: 'Immédiat',
      validityDuration: '12 Mois',
      faqs: [{ question: 'Activation', answer: 'Immédiate après le paiement.' }]
    };

    addProduct(prodToCreate);
    setIsAddingProduct(false);
    setNewProdName('');
    setNewProdDesc('');
  };

  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCodeName.trim()) return;
    addPromoCode({
      code: promoCodeName.toUpperCase().trim(),
      discountPercent: parseInt(promoPercent) || 10,
      active: true,
      usesCount: 0
    });
    setPromoCodeName('');
    setIsAddingPromo(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      
      {/* Admin Title & KPIs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1f283d] pb-6">
        <div>
          <span className="rounded bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-400 border border-amber-500/20 uppercase tracking-wider">
            Console Administrateur
          </span>
          <h1 className="mt-1 text-2xl font-black text-white sm:text-3xl">Gestion de la Boutique BASIC FRANCE</h1>
          <p className="text-xs text-slate-400 mt-1">Supervisez les stocks numériques, les transactions et le support client.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsAdminMode(false);
              setCurrentView('shop');
            }}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#243354] bg-[#0c1326] px-3.5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white hover:border-amber-500/50 hover:bg-[#121c38] transition-all shadow-sm"
            title="Quitter le mode admin et retourner à la boutique"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-amber-400" />
            <span>Retour Boutique</span>
          </button>
          <span className="hidden sm:inline text-xs text-slate-400">Connecté en tant que Super Admin</span>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-[#1b253d] bg-[#0c1220] p-4">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Chiffre d’Affaires</span>
            <DollarSign className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="mt-2 font-mono text-2xl font-black text-white tabular-nums">
            {totalRevenue.toFixed(2)}€
          </p>
          <span className="text-[10px] text-slate-400">{orders.length} commandes totales</span>
        </div>

        <div className="rounded-xl border border-[#1b253d] bg-[#0c1220] p-4">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Produits Actifs</span>
            <Package className="h-4 w-4 text-blue-400" />
          </div>
          <p className="mt-2 font-mono text-2xl font-black text-white tabular-nums">
            {products.length}
          </p>
          <span className="text-[10px] text-slate-400">Dans {categories.length} catégories</span>
        </div>

        <div className="rounded-xl border border-[#1b253d] bg-[#0c1220] p-4">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Tickets Support</span>
            <LifeBuoy className="h-4 w-4 text-amber-400" />
          </div>
          <p className="mt-2 font-mono text-2xl font-black text-white tabular-nums">
            {tickets.filter((t) => t.status !== 'resolved').length}
          </p>
          <span className="text-[10px] text-slate-400">Demandes en attente</span>
        </div>

        <div className="rounded-xl border border-[#1b253d] bg-[#0c1220] p-4">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Membres Discord</span>
            <Users className="h-4 w-4 text-[#5865f2]" />
          </div>
          <p className="mt-2 font-mono text-2xl font-black text-white tabular-nums">
            {storeSettings.discordServerMembers.toLocaleString('fr-FR')}
          </p>
          <span className="text-[10px] text-slate-400">Synchronisation active</span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 border-b border-[#182136] pb-3 text-xs font-semibold">
        <button
          onClick={() => setActiveAdminTab('products')}
          className={`flex items-center gap-2 rounded-lg px-4 py-2.5 transition-colors ${
            activeAdminTab === 'products'
              ? 'bg-[#18233d] text-white border border-blue-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Package className="h-4 w-4 text-blue-400" />
          <span>Produits & Stock ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('orders')}
          className={`flex items-center gap-2 rounded-lg px-4 py-2.5 transition-colors ${
            activeAdminTab === 'orders'
              ? 'bg-[#18233d] text-white border border-blue-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ShoppingBag className="h-4 w-4 text-blue-400" />
          <span>Commandes ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('promos')}
          className={`flex items-center gap-2 rounded-lg px-4 py-2.5 transition-colors ${
            activeAdminTab === 'promos'
              ? 'bg-[#18233d] text-white border border-blue-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Tag className="h-4 w-4 text-emerald-400" />
          <span>Codes Promotionnels ({promoCodes.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('support')}
          className={`flex items-center gap-2 rounded-lg px-4 py-2.5 transition-colors ${
            activeAdminTab === 'support'
              ? 'bg-[#18233d] text-white border border-blue-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <LifeBuoy className="h-4 w-4 text-amber-400" />
          <span>Tickets Support ({tickets.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('settings')}
          className={`flex items-center gap-2 rounded-lg px-4 py-2.5 transition-colors ${
            activeAdminTab === 'settings'
              ? 'bg-[#18233d] text-white border border-blue-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Settings className="h-4 w-4 text-slate-300" />
          <span>Configuration Boutique</span>
        </button>
      </div>

      {/* Admin Tab Content */}
      <div>
        
        {/* PRODUCTS MANAGEMENT */}
        {activeAdminTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Catalogue & Clés Numériques</h3>
              <button
                onClick={() => setIsAddingProduct(!isAddingProduct)}
                className="flex items-center gap-1.5 rounded-lg bg-[#2563eb] px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-600"
              >
                <Plus className="h-4 w-4" />
                <span>Nouveau Produit</span>
              </button>
            </div>

            {/* Add product modal form */}
            {isAddingProduct && (
              <form onSubmit={handleCreateProduct} className="rounded-xl border border-[#212d4a] bg-[#0c1220] p-6 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Créer un produit ou pass numérique
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Nom du produit *</label>
                    <input
                      type="text"
                      required
                      value={newProdName}
                      onChange={(e) => setNewProdName(e.target.value)}
                      placeholder="Ex: Pass Basic-Fit 6 Mois National"
                      className="w-full rounded-lg border border-[#1e273e] bg-[#080d16] px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Catégorie *</label>
                    <select
                      value={newProdCategory}
                      onChange={(e) => setNewProdCategory(e.target.value)}
                      className="w-full rounded-lg border border-[#1e273e] bg-[#080d16] px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Prix unitaire (€) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(e.target.value)}
                      className="w-full rounded-lg border border-[#1e273e] bg-[#080d16] px-3 py-2 font-mono text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Stock disponible</label>
                    <input
                      type="number"
                      value={newProdStock}
                      onChange={(e) => setNewProdStock(e.target.value)}
                      className="w-full rounded-lg border border-[#1e273e] bg-[#080d16] px-3 py-2 font-mono text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Format de délivrance numérique</label>
                    <select
                      value={newProdDeliverable}
                      onChange={(e: any) => setNewProdDeliverable(e.target.value)}
                      className="w-full rounded-lg border border-[#1e273e] bg-[#080d16] px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="license_key">Clé d’activation officielle (Code alphanumérique)</option>
                      <option value="discord_role">Rôle Discord « Client »</option>
                      <option value="account_access">Identifiant d’accès numérique</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={newProdDesc}
                    onChange={(e) => setNewProdDesc(e.target.value)}
                    placeholder="Détails de l’accès, avantages et instructions..."
                    className="w-full rounded-lg border border-[#1e273e] bg-[#080d16] px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingProduct(false)}
                    className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500"
                  >
                    Enregistrer le produit
                  </button>
                </div>
              </form>
            )}

            {/* Products Table */}
            <div className="overflow-x-auto rounded-xl border border-[#1c2740] bg-[#0c1220]">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[#182136] bg-[#080d16] text-slate-400 uppercase font-semibold">
                  <tr>
                    <th className="px-4 py-3">Produit</th>
                    <th className="px-4 py-3">Catégorie</th>
                    <th className="px-4 py-3">Prix</th>
                    <th className="px-4 py-3">Stock</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#161f33] text-slate-300">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-[#101728]">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <BrandThumbnail
                            categoryId={p.categoryId}
                            productId={p.id}
                            className="h-10 w-10 shrink-0"
                            fallbackImage={p.image}
                          />
                          <div>
                            <p className="font-bold text-white">{p.name}</p>
                            <p className="text-[10px] text-slate-400">Réf: {p.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-blue-400 font-semibold">{p.categoryName}</td>
                      <td className="px-4 py-3 font-mono font-bold text-white tabular-nums">
                        {p.price.toFixed(2)}€
                      </td>
                      <td className="px-4 py-3 font-mono tabular-nums">
                        <span className={p.stockCount < 20 ? 'text-amber-400' : 'text-slate-300'}>
                          {p.stockCount} unités
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right space-x-2">
                        <button
                          onClick={() => {
                            const newP = prompt('Nouveau prix pour ' + p.name + ' (€):', p.price.toString());
                            if (newP) updateProduct(p.id, { price: parseFloat(newP) || p.price });
                          }}
                          className="rounded border border-[#1e2840] bg-[#12192c] p-1.5 text-slate-300 hover:text-white"
                          title="Modifier le prix"
                        >
                          <Edit2 className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Voulez-vous supprimer ' + p.name + ' ?')) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="rounded border border-[#1e2840] bg-[#12192c] p-1.5 text-rose-400 hover:bg-rose-500/20"
                          title="Supprimer"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ORDERS MANAGEMENT */}
        {activeAdminTab === 'orders' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Gestion des Commandes Clients</h3>
            <div className="overflow-x-auto rounded-xl border border-[#1c2740] bg-[#0c1220]">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[#182136] bg-[#080d16] text-slate-400 uppercase font-semibold">
                  <tr>
                    <th className="px-4 py-3">Réf</th>
                    <th className="px-4 py-3">Client Email</th>
                    <th className="px-4 py-3">Discord</th>
                    <th className="px-4 py-3">Montant</th>
                    <th className="px-4 py-3">Statut</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#161f33] text-slate-300">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#101728]">
                      <td className="px-4 py-3 font-mono font-bold text-white">{ord.reference}</td>
                      <td className="px-4 py-3">{ord.customerEmail}</td>
                      <td className="px-4 py-3 font-mono text-blue-400">{ord.discordUsername || 'N/A'}</td>
                      <td className="px-4 py-3 font-mono font-bold text-white tabular-nums">{ord.total.toFixed(2)}€</td>
                      <td className="px-4 py-3">
                        <span className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                          ord.status === 'completed'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-rose-500/10 text-rose-400'
                        }`}>
                          {ord.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {ord.status !== 'refunded' ? (
                          <button
                            onClick={() => refundOrder(ord.id)}
                            className="rounded border border-rose-500/30 bg-rose-500/10 px-2 py-1 text-[11px] text-rose-300 hover:bg-rose-500/20"
                          >
                            Rembourser
                          </button>
                        ) : (
                          <span className="text-[10px] text-slate-500">Remboursée</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PROMOS MANAGEMENT */}
        {activeAdminTab === 'promos' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Codes Promotionnels</h3>
              <button
                onClick={() => setIsAddingPromo(!isAddingPromo)}
                className="flex items-center gap-1.5 rounded-lg bg-[#2563eb] px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-600"
              >
                <Plus className="h-4 w-4" />
                <span>Créer un Code</span>
              </button>
            </div>

            {isAddingPromo && (
              <form onSubmit={handleCreatePromo} className="rounded-xl border border-[#212d4a] bg-[#0c1220] p-4 flex flex-wrap gap-3 items-end">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Code Promo (ex: BASIC25)</label>
                  <input
                    type="text"
                    required
                    value={promoCodeName}
                    onChange={(e) => setPromoCodeName(e.target.value)}
                    placeholder="CODE"
                    className="rounded-lg border border-[#1e273e] bg-[#080d16] px-3 py-2 uppercase font-mono text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Pourcentage de remise (%)</label>
                  <input
                    type="number"
                    required
                    value={promoPercent}
                    onChange={(e) => setPromoPercent(e.target.value)}
                    className="rounded-lg border border-[#1e273e] bg-[#080d16] px-3 py-2 font-mono text-xs text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500"
                >
                  Ajouter
                </button>
              </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {promoCodes.map((p) => (
                <div key={p.code} className="rounded-xl border border-[#1e2840] bg-[#0c1220] p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-base font-black text-white">{p.code}</span>
                    <button
                      onClick={() => togglePromoCode(p.code)}
                      className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                        p.active ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                      }`}
                    >
                      {p.active ? 'Actif' : 'Inactif'}
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-slate-400">
                    Réduction : {p.discountPercent ? `${p.discountPercent}%` : `${p.discountAmount}€`}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500 font-mono">
                    Utilisé {p.usesCount} fois
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUPPORT TICKETS STAFF VIEW */}
        {activeAdminTab === 'support' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Tickets Support des Membres</h3>
            <div className="space-y-4">
              {tickets.map((t) => (
                <div key={t.id} className="rounded-xl border border-[#1e2840] bg-[#0c1220] p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-xs text-blue-400">{t.reference}</span>
                      <h4 className="text-sm font-bold text-white mt-0.5">{t.subject}</h4>
                    </div>
                    <span className="rounded bg-blue-500/10 px-2 py-0.5 text-xs text-blue-400 font-semibold">
                      {t.status}
                    </span>
                  </div>

                  <div className="rounded-lg border border-[#192236] bg-[#080d16] p-3 text-xs space-y-2">
                    {t.messages.map((m) => (
                      <p key={m.id} className="text-slate-300">
                        <strong className="text-blue-400">{m.authorName} : </strong>
                        {m.content}
                      </p>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Répondre au client en tant que Staff..."
                      value={adminTicketReply[t.id] || ''}
                      onChange={(e) => setAdminTicketReply({ ...adminTicketReply, [t.id]: e.target.value })}
                      className="flex-1 rounded-lg border border-[#1e2840] bg-[#080d16] px-3 py-2 text-xs text-white"
                    />
                    <button
                      onClick={() => {
                        const txt = adminTicketReply[t.id];
                        if (txt?.trim()) {
                          replyToTicket(t.id, txt, 'support');
                          setAdminTicketReply({ ...adminTicketReply, [t.id]: '' });
                        }
                      }}
                      className="rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-500"
                    >
                      Envoyer
                    </button>
                    <button
                      onClick={() => setTicketStatus(t.id, 'resolved')}
                      className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-400 hover:bg-emerald-500/20"
                    >
                      Résolu
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {activeAdminTab === 'settings' && (
          <div className="max-w-xl rounded-xl border border-[#1e2840] bg-[#0c1220] p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Paramètres Généraux de BASIC FRANCE</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Nom de la boutique</label>
                <input
                  type="text"
                  value={settingsForm.storeName}
                  onChange={(e) => setSettingsForm({ ...settingsForm, storeName: e.target.value })}
                  className="w-full rounded-lg border border-[#1e2840] bg-[#080d16] px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Lien d’invitation Discord</label>
                <input
                  type="text"
                  value={settingsForm.discordInviteUrl}
                  onChange={(e) => setSettingsForm({ ...settingsForm, discordInviteUrl: e.target.value })}
                  className="w-full rounded-lg border border-[#1e2840] bg-[#080d16] px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Nombre de membres affichés</label>
                <input
                  type="number"
                  value={settingsForm.discordServerMembers}
                  onChange={(e) => setSettingsForm({ ...settingsForm, discordServerMembers: parseInt(e.target.value) || 10000 })}
                  className="w-full rounded-lg border border-[#1e2840] bg-[#080d16] px-3 py-2 font-mono text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Taux de commission parrainage (%)</label>
                <input
                  type="number"
                  value={settingsForm.referralRewardPercent}
                  onChange={(e) => setSettingsForm({ ...settingsForm, referralRewardPercent: parseInt(e.target.value) || 10 })}
                  className="w-full rounded-lg border border-[#1e2840] bg-[#080d16] px-3 py-2 font-mono text-xs text-white"
                />
              </div>

              <button
                onClick={() => updateStoreSettings(settingsForm)}
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-500"
              >
                Sauvegarder les modifications
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
