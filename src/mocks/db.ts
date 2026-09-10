import type { User, NFT, Order, CartItem } from '../domain/types';

export const db = {
  users: [] as User[],
  nfts: [] as NFT[],
  orders: [] as Order[],
  favorites: new Map<string, string[]>(), // userId -> nftIds
  carts: new Map<string, CartItem[]>(), // userId or sessionId -> cartItems
  sessions: new Map<string, string>(), // token -> userId
};
