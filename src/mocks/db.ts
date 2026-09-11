import type { User, NFT, Order, CartItem } from '../domain/types';

export const db = {
  users: [] as User[],
  nfts: [] as NFT[],
  orders: [] as Order[],
  favorites: new Map<string, string[]>(), // userId -> nftIds
  carts: new Map<string, CartItem[]>(), // userId or sessionId -> cartItems
  sessions: new Map<string, string>(), // token -> userId
};

// Auto-load on initialization
try {
  const saved = localStorage.getItem('mock-db');
  if (saved) {
    const parsed = JSON.parse(saved);
    db.users = parsed.users || [];
    db.orders = parsed.orders || [];
    db.favorites = new Map(parsed.favorites || []);
    db.carts = new Map(parsed.carts || []);
    db.sessions = new Map(parsed.sessions || []);
  }
} catch (e) {
  console.error('Failed to load mock DB', e);
}

export const saveDb = () => {
  try {
    const data = {
      users: db.users,
      nfts: db.nfts,
      orders: db.orders,
      favorites: Array.from(db.favorites.entries()),
      carts: Array.from(db.carts.entries()),
      sessions: Array.from(db.sessions.entries()),
    };
    localStorage.setItem('mock-db', JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save mock DB', e);
  }
};
