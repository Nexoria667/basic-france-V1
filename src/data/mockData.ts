import { Category, Product, PromoCode, SupportTicket, Order, UserProfile, StoreSettings } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'basic-fit',
    name: 'Basic-Fit',
    slug: 'basic-fit',
    description: 'Abonnements digitaux & pass clubs nationaux 12 mois avec activation immédiate.',
    badge: 'Premium',
  },
  {
    id: 'fitness-park',
    name: 'Fitness Park',
    slug: 'fitness-park',
    description: 'Accès réseau France complet 12 mois avec options premium et badge digital.',
    badge: '12 Mois',
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-bf-premium-12m',
    name: 'Abonnement Basic-Fit Premium 12 Mois',
    slug: 'abonnement-basic-fit-premium-12-mois',
    categoryId: 'basic-fit',
    categoryName: 'Basic-Fit',
    price: 40.00,
    originalPrice: 59.90,
    badge: 'Premium 12 Mois',
    shortDescription: 'Accès national illimité tous clubs France 12 mois + option invité permanent et boisson Yannga incluses.',
    description: 'Abonnement complet 12 mois pour vous et votre invité. Valable sans restriction dans les 800+ clubs Basic-Fit de France et d’Europe. Délivrance 100% numérique sous 12h après validation.',
    image: '/src/assets/images/product_gym_pass_1791638976770.jpg',
    features: [
      'Validité garantie 12 Mois',
      'Accès tous clubs France & Europe',
      'Option invité permanent (accès à deux)',
      'Boissons sportives Yannga incluses',
      'Livraison garantie sous 12h',
      'Rôle Discord Client inclus'
    ],
    deliverables: [
      {
        type: 'license_key',
        label: 'Clé d’Activation Numérique',
        instructions: 'Code d’activation officiel à associer à votre compte ou à transmettre au support.',
        templateFormat: 'BF-PREM-XXXX-XXXX'
      },
      {
        type: 'discord_role',
        label: 'Rôle Discord Client',
        instructions: 'Attribution automatique du rôle « Client » sur le serveur Discord BASIC FRANCE.',
      }
    ],
    inStock: true,
    stockCount: 42,
    isPopular: true,
    isBestSeller: true,
    rating: 4.9,
    reviewsCount: 184,
    activationDelay: 'Livraison sous 12h',
    validityDuration: '12 Mois garantis',
    discordRoleGranted: 'Client',
    faqs: [
      {
        question: 'Quel est le contenu délivré après commande ?',
        answer: 'Vous recevez uniquement votre clé d’activation officielle sous 12h ainsi que le rôle Discord « Client » attribué automatiquement sur notre serveur.'
      },
      {
        question: 'Puis-je m’entraîner dans toutes les salles de France ?',
        answer: 'Oui, ce pass premium est valable sans aucune restriction dans tous les clubs du réseau en France et en Europe.'
      },
      {
        question: 'L’option invité est-elle incluse pour toute l’année ?',
        answer: 'Oui, vous pouvez venir accompagné à chaque séance pendant toute la durée des 12 mois.'
      }
    ]
  },
  {
    id: 'prod-fp-12m-60e',
    name: 'Abonnement Fitness Park 12 Mois',
    slug: 'abonnement-fitness-park-12-mois',
    categoryId: 'fitness-park',
    categoryName: 'Fitness Park',
    price: 60.00,
    originalPrice: 85.00,
    badge: 'Offre 60€',
    shortDescription: 'Accès national illimité 12 mois à tout le réseau Fitness Park avec options Burning Park & Fight Park incluses.',
    description: 'Accédez pendant 12 mois à l’ensemble des salles Fitness Park de France au tarif exclusif de 60€. Profitez du matériel haut de gamme Hammer Strength, Technogym et Eleiko avec délivrance sous 12h de votre clé d’accès.',
    image: '/src/assets/images/product_fitness_park_1791638989077.jpg',
    features: [
      'Tarif exclusif 60€ pour 12 Mois',
      'Accès tous clubs Fitness Park en France',
      'Espaces Burning Park & Fight Park débloqués',
      'Plateaux musculation charges libres & cardio',
      'Livraison garantie sous 12h',
      'Rôle Discord Client inclus'
    ],
    deliverables: [
      {
        type: 'license_key',
        label: 'Clé d’Activation Numérique 12 Mois',
        instructions: 'Code d’activation officiel à associer à votre compte ou à transmettre au support.',
        templateFormat: 'FP-12M-XXXX-XXXX'
      },
      {
        type: 'discord_role',
        label: 'Rôle Discord Client',
        instructions: 'Attribution automatique du rôle « Client » sur le serveur Discord BASIC FRANCE.'
      }
    ],
    inStock: true,
    stockCount: 28,
    isPopular: true,
    isBestSeller: true,
    rating: 4.9,
    reviewsCount: 142,
    activationDelay: 'Livraison sous 12h',
    validityDuration: '12 Mois',
    discordRoleGranted: 'Client',
    faqs: [
      {
        question: 'Quel est le contenu délivré après commande ?',
        answer: 'Vous recevez uniquement votre clé d’activation officielle sous 12h ainsi que le rôle Discord « Client » attribué automatiquement sur notre serveur.'
      },
      {
        question: 'Le prix de 60€ est-il valable pour l’année complète ?',
        answer: 'Oui, il s’agit d’un paiement unique de 60€ sans prélèvement récurrent pour 12 mois d’accès complet.'
      },
      {
        question: 'Y a-t-il des frais de dossier supplémentaires ?',
        answer: 'Aucun frais supplémentaire. Tout est inclus dès votre commande sur BASIC FRANCE.'
      }
    ]
  }
];

export const INITIAL_PROMO_CODES: PromoCode[] = [
  {
    code: 'BASIC10',
    discountPercent: 10,
    active: true,
    usesCount: 142,
  },
  {
    code: 'DISCORD20',
    discountPercent: 20,
    minOrder: 30,
    active: true,
    usesCount: 89,
  },
  {
    code: 'FRANCE5',
    discountAmount: 5,
    minOrder: 25,
    active: true,
    usesCount: 57,
  }
];

export const INITIAL_USER: UserProfile = {
  id: 'usr-bf-8812',
  username: 'Alexandre BF',
  email: 'alexandre.dev@basicfrance.io',
  joinedAt: '15 Janvier 2026',
  discordConnected: true,
  discordId: '849201948291048291',
  discordUsername: 'AlexFit#7712',
  discordAvatar: 'https://cdn.discordapp.com/embed/avatars/0.png',
  discordRoles: ['Membre Vérifié', 'Client', 'Team Basic France'],
  walletBalance: 45.00,
  referralCode: 'ALEX77',
  referralCount: 6,
  referralEarnings: 27.50,
  isAdmin: false,
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1042',
    reference: 'CMD-BF-2026-1042',
    createdAt: '08 Octobre 2026, 14:22',
    status: 'completed',
    subtotal: 34.90,
    discountAmount: 3.49,
    promoCodeApplied: 'BASIC10',
    total: 31.41,
    customerEmail: 'alexandre.dev@basicfrance.io',
    discordUsername: 'AlexFit#7712',
    paymentMethod: 'credit_card',
    items: [
      {
        productId: 'prod-bf-premium-12m',
        productName: 'Abonnement Basic-Fit Premium 12 Mois',
        unitPrice: 34.90,
        quantity: 1,
        categoryName: 'Basic-Fit'
      }
    ],
    deliveries: [
      {
        id: 'del-1042-1',
        orderId: 'ord-1042',
        productId: 'prod-bf-premium-12m',
        productName: 'Abonnement Basic-Fit Premium 12 Mois',
        type: 'license_key',
        secretContent: 'BF-PREM-8892-4910-FR',
        deliveredAt: '08 Octobre 2026, 14:22',
        status: 'active',
        instructions: 'Clé d’activation officielle transmise pour valider votre adhésion.'
      },
      {
        id: 'del-1042-2',
        orderId: 'ord-1042',
        productId: 'prod-bf-premium-12m',
        productName: 'Rôle Discord Client',
        type: 'discord_role',
        secretContent: 'ROLE_DISCORD_CLIENT_ATTRIBUE',
        deliveredAt: '08 Octobre 2026, 14:22',
        status: 'active',
        instructions: 'Rôle « Client » attribué avec succès sur le serveur Discord BASIC FRANCE.'
      }
    ]
  }
];

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'tkt-401',
    reference: 'TCK-BF-401',
    subject: 'Question sur l’option invité Basic-Fit',
    category: 'commande',
    status: 'resolved',
    createdAt: '08 Octobre 2026, 15:10',
    updatedAt: '08 Octobre 2026, 15:35',
    orderId: 'CMD-BF-2026-1042',
    discordLinked: true,
    messages: [
      {
        id: 'msg-1',
        sender: 'user',
        authorName: 'Alexandre BF',
        content: 'Bonjour l’équipe, est-ce que mon ami doit avoir un compte préalable pour venir avec moi ?',
        timestamp: '15:10'
      },
      {
        id: 'msg-2',
        sender: 'support',
        authorName: 'Support BASIC FRANCE',
        content: 'Bonjour Alexandre ! Non, aucune inscription préalable n’est obligatoire pour votre invité. Il se présente simplement à la borne avec vous et vous scannez votre badge. Bons entraînements !',
        timestamp: '15:35'
      }
    ]
  }
];

export const STORE_SETTINGS: StoreSettings = {
  storeName: 'BASIC FRANCE',
  supportEmail: 'contact@basicfrance.io',
  discordInviteUrl: 'https://discord.gg/basicfrance',
  discordServerMembers: 14850,
  referralRewardPercent: 10,
  announcementText: 'Livraison numérique sous 12h • Serveur Discord actif 14,850+ membres'
};
