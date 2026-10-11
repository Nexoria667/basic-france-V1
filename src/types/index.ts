export type ProductCategory = 'basic-fit' | 'fitness-park' | 'programmes' | 'discord-vip' | 'cartes-cadeaux';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  badge?: string;
}

export type DeliverableType = 'license_key' | 'qr_code' | 'account_access' | 'pdf_guide' | 'discord_role' | 'gift_card';

export interface ProductDeliverable {
  type: DeliverableType;
  label: string;
  instructions: string;
  templateFormat?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  shortDescription: string;
  description: string;
  image: string;
  deliverables: ProductDeliverable[];
  features: string[];
  inStock: boolean;
  stockCount: number;
  isPopular?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  rating: number;
  reviewsCount: number;
  activationDelay: string;
  validityDuration: string;
  discordRoleGranted?: string;
  faqs: { question: string; answer: string }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface DigitalDelivery {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  type: DeliverableType;
  secretContent: string;
  deliveredAt: string;
  status: 'active' | 'used' | 'revoked';
  instructions: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  categoryName: string;
}

export type OrderStatus = 'completed' | 'processing' | 'refunded' | 'cancelled';
export type PaymentMethod = 'credit_card' | 'wallet' | 'crypto' | 'sepa';

export interface Order {
  id: string;
  reference: string;
  createdAt: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  promoCodeApplied?: string;
  total: number;
  customerEmail: string;
  discordUsername?: string;
  paymentMethod: PaymentMethod;
  deliveries: DigitalDelivery[];
}

export type TicketCategory = 'technique' | 'commande' | 'compte' | 'partenariat' | 'autre';
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export interface SupportMessage {
  id: string;
  sender: 'user' | 'support';
  authorName: string;
  content: string;
  timestamp: string;
}

export interface SupportTicket {
  id: string;
  reference: string;
  subject: string;
  category: TicketCategory;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  orderId?: string;
  discordLinked?: boolean;
  messages: SupportMessage[];
}

export interface PromoCode {
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  minOrder?: number;
  expiresAt?: string;
  active: boolean;
  usesCount: number;
  maxUses?: number;
}

export interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  reference: string;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  joinedAt: string;
  discordConnected: boolean;
  discordId?: string;
  discordUsername?: string;
  discordAvatar?: string;
  discordRoles: string[];
  walletBalance: number;
  referralCode: string;
  referralCount: number;
  referralEarnings: number;
  isAdmin: boolean;
}

export interface StoreSettings {
  storeName: string;
  supportEmail: string;
  discordInviteUrl: string;
  discordServerMembers: number;
  referralRewardPercent: number;
  announcementText?: string;
}
