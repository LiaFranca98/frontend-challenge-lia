export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  wallets: Wallet[];
}

export interface Wallet {
  id: string;
  address: string;
  network: string;
  isPrimary: boolean;
}

export interface NFT {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  creator: string;
  collection: string;
  priceEth: string; // Stored as string to preserve precision
  availableEditions: number;
  totalEditions: number;
  createdAt: string;
}

export interface CartItem {
  nftId: string;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  status: 'pending' | 'confirmed' | 'rejected';
  items: CartItem[];
  subtotalEth: string;
  networkFeeEth: string;
  discountEth: string;
  totalEth: string;
  walletId: string;
  idempotencyKey: string;
  createdAt: string;
}
