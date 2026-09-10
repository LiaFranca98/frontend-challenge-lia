import { http, HttpResponse } from 'msw';
import { db } from '../db';
import { getUserFromAuth } from './auth';
import type { CartItem, Order } from '@/domain/types';

// Map to track idempotency keys to prevent duplicate processing
const processedOrders = new Map<string, Order>();

export const checkoutHandlers = [
  http.post('/api/checkout', async ({ request }) => {
    const user = getUserFromAuth(request);
    const { items, idempotencyKey } = await request.json() as { items: CartItem[], idempotencyKey?: string };
    
    // T031: Idempotency check
    if (idempotencyKey && processedOrders.has(idempotencyKey)) {
      return HttpResponse.json({ order: processedOrders.get(idempotencyKey) });
    }

    if (!items || items.length === 0) {
      return HttpResponse.json({ message: 'Cart is empty' }, { status: 400 });
    }

    // T032: Cart failure logic
    // We will simulate a failure if the user tries to buy more than available
    const failedItems: CartItem[] = [];
    const successfulItems: CartItem[] = [];
    let subtotalEth = 0;

    for (const item of items) {
      const nft = db.nfts.find(n => n.id === item.nftId);
      
      if (!nft || nft.availableEditions < item.quantity) {
        failedItems.push(item);
      } else {
        // Decrease availability
        nft.availableEditions -= item.quantity;
        successfulItems.push(item);
        subtotalEth += parseFloat(nft.priceEth) * item.quantity;
      }
    }

    if (successfulItems.length === 0) {
      return HttpResponse.json({ 
        message: 'All items failed to process. They might be out of stock.',
        failedItems 
      }, { status: 409 });
    }

    const order: Order = {
      id: `order-${Date.now()}`,
      userId: user ? user.id : 'guest',
      walletId: user && user.wallets.length > 0 ? user.wallets[0].id : 'guest-wallet',
      status: 'confirmed',
      items: successfulItems,
      subtotalEth: subtotalEth.toString(),
      networkFeeEth: '0.005',
      discountEth: '0',
      totalEth: (subtotalEth + 0.005).toString(),
      idempotencyKey: idempotencyKey || '',
      createdAt: new Date().toISOString(),
    };

    db.orders.push(order);

    if (idempotencyKey) {
      processedOrders.set(idempotencyKey, order);
    }

    // Clear successful items from the cart
    const sessionId = request.headers.get('Authorization');
    if (sessionId) {
      const currentCart = db.carts.get(sessionId) || [];
      const newCart = currentCart.filter(c => !successfulItems.some(s => s.nftId === c.nftId));
      db.carts.set(sessionId, newCart);
    }

    return HttpResponse.json({ 
      order,
      failedItems: failedItems.length > 0 ? failedItems : undefined
    });
  }),
];
