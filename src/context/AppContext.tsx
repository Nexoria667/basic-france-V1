import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Category,
  CartItem,
  Order,
  DigitalDelivery,
  SupportTicket,
  SupportMessage,
  PromoCode,
  UserProfile,
  StoreSettings,
  PaymentMethod
} from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_PROMO_CODES,
  INITIAL_USER,
  INITIAL_ORDERS,
  INITIAL_TICKETS,
  STORE_SETTINGS
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  // Navigation & Views
  currentView: 'home' | 'shop' | 'dashboard' | 'admin' | 'support';
  setCurrentView: (view: 'home' | 'shop' | 'dashboard' | 'admin' | 'support') => void;
  selectedProduct: Product | null;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (categoryId: string) => void;
  activeDashboardTab: 'profile' | 'purchases' | 'orders' | 'wallet' | 'referral' | 'support';
  setActiveDashboardTab: (tab: 'profile' | 'purchases' | 'orders' | 'wallet' | 'referral' | 'support') => void;

  // Cart & Drawers
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartTotal: number;

  // Promo Code
  appliedPromo: PromoCode | null;
  applyPromoCode: (codeStr: string) => { success: boolean; message: string };
  removePromoCode: () => void;

  // Legal Modal
  legalModalOpen: boolean;
  legalDocType: 'cgv' | 'refund' | 'privacy' | 'mentions';
  openLegalModal: (docType?: 'cgv' | 'refund' | 'privacy' | 'mentions') => void;
  closeLegalModal: () => void;

  // Checkout & Orders
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  lastCompletedOrder: Order | null;
  setLastCompletedOrder: (order: Order | null) => void;
  orders: Order[];
  processCheckout: (
    email: string,
    discordUsername: string,
    paymentMethod: PaymentMethod
  ) => Promise<{ success: boolean; order?: Order; error?: string }>;

  // Digital Deliveries (User's acquired items)
  userDeliveries: DigitalDelivery[];

  // User & Wallet
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  addFundsToWallet: (amount: number) => void;
  toggleDiscordConnection: () => void;
  claimReferralRewards: () => void;

  // Support Tickets
  tickets: SupportTicket[];
  createTicket: (subject: string, category: any, initialMessage: string, orderId?: string) => void;
  replyToTicket: (ticketId: string, content: string, sender?: 'user' | 'support') => void;
  setTicketStatus: (ticketId: string, status: any) => void;

  // Catalog / Admin CRUD
  products: Product[];
  categories: Category[];
  promoCodes: PromoCode[];
  storeSettings: StoreSettings;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (name: string, description: string) => void;
  addPromoCode: (newPromo: PromoCode) => void;
  togglePromoCode: (code: string) => void;
  updateStoreSettings: (settings: Partial<StoreSettings>) => void;
  refundOrder: (orderId: string) => void;

  // Admin perspective switch
  isAdminMode: boolean;
  setIsAdminMode: (val: boolean) => void;

  // Toast System
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [currentView, setCurrentView] = useState<'home' | 'shop' | 'dashboard' | 'admin' | 'support'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [activeDashboardTab, setActiveDashboardTab] = useState<'profile' | 'purchases' | 'orders' | 'wallet' | 'referral' | 'support'>('purchases');

  // Persistence helpers
  const getStored = <T,>(key: string, defaultVal: T): T => {
    try {
      const stored = localStorage.getItem(`bf_${key}`);
      return stored ? JSON.parse(stored) : defaultVal;
    } catch {
      return defaultVal;
    }
  };

  const saveStored = (key: string, val: any) => {
    try {
      localStorage.setItem(`bf_${key}`, JSON.stringify(val));
    } catch {
      // Ignore quota errors
    }
  };

  // State initialization with localStorage fallback
  const [products, setProducts] = useState<Product[]>(() => {
    const stored = getStored<Product[]>('products_v4', INITIAL_PRODUCTS);
    return Array.isArray(stored) && stored.length === 2 && stored[0]?.price === 40 && stored[0]?.discordRoleGranted === 'Client'
      ? stored
      : INITIAL_PRODUCTS;
  });
  const [categories, setCategories] = useState<Category[]>(() => INITIAL_CATEGORIES);
  const [cart, setCart] = useState<CartItem[]>(() => getStored('cart', []));
  const [orders, setOrders] = useState<Order[]>(() => getStored('orders_v4', INITIAL_ORDERS));
  const [tickets, setTickets] = useState<SupportTicket[]>(() => getStored('tickets', INITIAL_TICKETS));
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>(() => getStored('promoCodes', INITIAL_PROMO_CODES));
  const [user, setUser] = useState<UserProfile>(() => {
    const u = getStored('user', INITIAL_USER);
    return { ...u, discordRoles: ['Client', 'Membre Vérifié'] };
  });
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => getStored('settings', STORE_SETTINGS));

  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastCompletedOrder, setLastCompletedOrder] = useState<Order | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalDocType, setLegalDocType] = useState<'cgv' | 'refund' | 'privacy' | 'mentions'>('cgv');

  const openLegalModal = (docType: 'cgv' | 'refund' | 'privacy' | 'mentions' = 'cgv') => {
    setLegalDocType(docType);
    setLegalModalOpen(true);
  };

  const closeLegalModal = () => {
    setLegalModalOpen(false);
  };

  // Sync to local storage
  useEffect(() => { saveStored('products_v4', products); }, [products]);
  useEffect(() => { saveStored('categories', categories); }, [categories]);
  useEffect(() => { saveStored('cart', cart); }, [cart]);
  useEffect(() => { saveStored('orders_v4', orders); }, [orders]);
  useEffect(() => { saveStored('tickets', tickets); }, [tickets]);
  useEffect(() => { saveStored('promoCodes', promoCodes); }, [promoCodes]);
  useEffect(() => { saveStored('user', user); }, [user]);
  useEffect(() => { saveStored('settings', storeSettings); }, [storeSettings]);

  // Toast Helpers
  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart computations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  let cartDiscount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountPercent) {
      cartDiscount = (cartSubtotal * appliedPromo.discountPercent) / 100;
    } else if (appliedPromo.discountAmount) {
      cartDiscount = Math.min(appliedPromo.discountAmount, cartSubtotal);
    }
  }
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount);

  // Cart Actions
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    addToast(`${product.name} ajouté au panier`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    addToast('Article retiré du panier', 'info');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const applyPromoCode = (codeStr: string) => {
    const clean = codeStr.trim().toUpperCase();
    const found = promoCodes.find((p) => p.code.toUpperCase() === clean && p.active);
    if (!found) {
      return { success: false, message: 'Code promotionnel introuvable ou expiré.' };
    }
    if (found.minOrder && cartSubtotal < found.minOrder) {
      return {
        success: false,
        message: `Montant minimum requis de ${found.minOrder.toFixed(2)}€ pour ce code.`
      };
    }
    setAppliedPromo(found);
    addToast(`Code promotionnel ${found.code} appliqué (-${found.discountPercent ? `${found.discountPercent}%` : `${found.discountAmount}€`})`, 'success');
    return { success: true, message: 'Code promo appliqué avec succès !' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    addToast('Code promo retiré', 'info');
  };

  // Product modal
  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  // Checkout process with automatic digital deliveries creation
  const processCheckout = async (
    email: string,
    discordUsername: string,
    paymentMethod: PaymentMethod
  ): Promise<{ success: boolean; order?: Order; error?: string }> => {
    if (cart.length === 0) {
      return { success: false, error: 'Votre panier est vide' };
    }

    if (paymentMethod === 'wallet' && user.walletBalance < cartTotal) {
      return {
        success: false,
        error: `Solde insuffisant dans votre portefeuille (${user.walletBalance.toFixed(2)}€ dispo / ${cartTotal.toFixed(2)}€ requis).`
      };
    }

    const orderId = `ord-${Date.now().toString().slice(-6)}`;
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderRef = `CMD-BF-2026-${randomSuffix}`;

    // Generate digital deliveries for each item purchased
    const deliveries: DigitalDelivery[] = [];
    cart.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        item.product.deliverables.forEach((del, delIdx) => {
          let secret = '';
          const randHex = Math.random().toString(36).substring(2, 6).toUpperCase();
          const randHex2 = Math.random().toString(36).substring(2, 6).toUpperCase();

          if (del.type === 'license_key') {
            const prefix = item.product.categoryId === 'fitness-park' ? 'FP' : 'BF';
            secret = `${prefix}-${randHex}-${randHex2}-FR`;
          } else if (del.type === 'discord_role') {
            secret = `ROLE_DISCORD_CLIENT_SYNCHRONISE`;
          } else {
            secret = `CLE-${randHex}-${randHex2}`;
          }

          deliveries.push({
            id: `del-${orderId}-${item.product.id}-${delIdx}-${i}`,
            orderId: orderId,
            productId: item.product.id,
            productName: item.product.name,
            type: del.type,
            secretContent: secret,
            deliveredAt: new Date().toLocaleString('fr-FR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }),
            status: 'active',
            instructions: del.instructions
          });
        });
      }
    });

    const newOrder: Order = {
      id: orderId,
      reference: orderRef,
      createdAt: new Date().toLocaleString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'completed',
      items: cart.map((ci) => ({
        productId: ci.product.id,
        productName: ci.product.name,
        unitPrice: ci.product.price,
        quantity: ci.quantity,
        categoryName: ci.product.categoryName
      })),
      subtotal: cartSubtotal,
      discountAmount: cartDiscount,
      promoCodeApplied: appliedPromo?.code,
      total: cartTotal,
      customerEmail: email,
      discordUsername: discordUsername || user.discordUsername,
      paymentMethod,
      deliveries
    };

    // Update wallet if paid with wallet
    if (paymentMethod === 'wallet') {
      setUser((prev) => ({
        ...prev,
        walletBalance: Math.max(0, prev.walletBalance - cartTotal)
      }));
    }

    // Ensure 'Client' role is granted to user
    setUser((prev) => {
      const existingRoles = prev.discordRoles || [];
      const updatedRoles = existingRoles.includes('Client') ? existingRoles : [...existingRoles, 'Client'];
      return {
        ...prev,
        discordUsername: discordUsername || prev.discordUsername,
        email: email || prev.email,
        discordRoles: updatedRoles
      };
    });

    // Update promo uses
    if (appliedPromo) {
      setPromoCodes((prev) =>
        prev.map((p) =>
          p.code === appliedPromo.code ? { ...p, usesCount: p.usesCount + 1 } : p
        )
      );
    }

    // Save order
    setOrders((prev) => [newOrder, ...prev]);
    setLastCompletedOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    addToast(`Commande ${orderRef} validée ! Contenu numérique généré.`, 'success');

    return { success: true, order: newOrder };
  };

  // All deliveries of user across orders
  const userDeliveries: DigitalDelivery[] = orders.flatMap((o) => o.deliveries);

  // User & Wallet actions
  const addFundsToWallet = (amount: number) => {
    setUser((prev) => ({
      ...prev,
      walletBalance: prev.walletBalance + amount
    }));
    addToast(`${amount.toFixed(2)}€ crédités sur votre portefeuille BASIC FRANCE !`, 'success');
  };

  const toggleDiscordConnection = () => {
    setUser((prev) => {
      const nextConnected = !prev.discordConnected;
      const nextRoles = nextConnected
        ? ['Membre Vérifié', 'Client', 'Team Basic France']
        : [];
      const updated = {
        ...prev,
        discordConnected: nextConnected,
        discordRoles: nextRoles
      };
      if (nextConnected) {
        addToast('Compte Discord associé avec succès (Rôles synchronisés)', 'success');
      } else {
        addToast('Compte Discord dissocié', 'info');
      }
      return updated;
    });
  };

  const claimReferralRewards = () => {
    if (user.referralEarnings <= 0) {
      addToast('Aucune commission en attente de versement', 'info');
      return;
    }
    const earnings = user.referralEarnings;
    setUser((prev) => ({
      ...prev,
      walletBalance: prev.walletBalance + earnings,
      referralEarnings: 0
    }));
    addToast(`${earnings.toFixed(2)}€ transférés vers votre solde de portefeuille !`, 'success');
  };

  // Support Tickets
  const createTicket = (
    subject: string,
    category: any,
    initialMessage: string,
    orderId?: string
  ) => {
    const id = `tkt-${Date.now().toString().slice(-4)}`;
    const newTicket: SupportTicket = {
      id,
      reference: `TCK-BF-${Date.now().toString().slice(-4)}`,
      subject,
      category,
      status: 'open',
      createdAt: new Date().toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      updatedAt: 'À l’instant',
      orderId,
      discordLinked: user.discordConnected,
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'user',
          authorName: user.username,
          content: initialMessage,
          timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };
    setTickets((prev) => [newTicket, ...prev]);
    addToast(`Ticket #${newTicket.reference} ouvert auprès de l’équipe`, 'success');
  };

  const replyToTicket = (ticketId: string, content: string, sender: 'user' | 'support' = 'user') => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id !== ticketId) return t;
        const newMsg: SupportMessage = {
          id: `msg-${Date.now()}`,
          sender,
          authorName: sender === 'support' ? 'Staff BASIC FRANCE' : user.username,
          content,
          timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
        };
        return {
          ...t,
          status: sender === 'support' ? 'in_progress' : t.status,
          updatedAt: 'À l’instant',
          messages: [...t.messages, newMsg]
        };
      })
    );
  };

  const setTicketStatus = (ticketId: string, status: any) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status } : t))
    );
    addToast('Statut du ticket mis à jour', 'info');
  };

  // Admin Catalog CRUD
  const addProduct = (p: Omit<Product, 'id'>) => {
    const id = `prod-${Date.now().toString().slice(-6)}`;
    const created: Product = {
      ...p,
      id,
      slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    };
    setProducts((prev) => [created, ...prev]);
    addToast(`Produit "${created.name}" créé avec succès`, 'success');
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
    addToast('Produit mis à jour', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addToast('Produit supprimé du catalogue', 'info');
  };

  const addCategory = (name: string, description: string) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newCat: Category = {
      id: slug,
      name,
      slug,
      description
    };
    setCategories((prev) => [...prev, newCat]);
    addToast(`Catégorie "${name}" ajoutée`, 'success');
  };

  const addPromoCode = (newPromo: PromoCode) => {
    setPromoCodes((prev) => [newPromo, ...prev]);
    addToast(`Code promo ${newPromo.code} créé`, 'success');
  };

  const togglePromoCode = (code: string) => {
    setPromoCodes((prev) =>
      prev.map((p) => (p.code === code ? { ...p, active: !p.active } : p))
    );
  };

  const updateStoreSettings = (newSettings: Partial<StoreSettings>) => {
    setStoreSettings((prev) => ({ ...prev, ...newSettings }));
    addToast('Paramètres de la boutique enregistrés', 'success');
  };

  const refundOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'refunded' } : o))
    );
    addToast(`Commande ${orderId} marquée comme remboursée`, 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedProduct,
        openProductModal,
        closeProductModal,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        activeDashboardTab,
        setActiveDashboardTab,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartDiscount,
        cartTotal,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        legalModalOpen,
        legalDocType,
        openLegalModal,
        closeLegalModal,
        isCheckoutOpen,
        setIsCheckoutOpen,
        lastCompletedOrder,
        setLastCompletedOrder,
        orders,
        processCheckout,
        userDeliveries,
        user,
        setUser,
        addFundsToWallet,
        toggleDiscordConnection,
        claimReferralRewards,
        tickets,
        createTicket,
        replyToTicket,
        setTicketStatus,
        products,
        categories,
        promoCodes,
        storeSettings,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        addPromoCode,
        togglePromoCode,
        updateStoreSettings,
        refundOrder,
        isAdminMode,
        setIsAdminMode,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
