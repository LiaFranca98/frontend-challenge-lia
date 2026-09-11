import { http, HttpResponse, delay } from 'msw';
import { db, saveDb } from '../db';

export const cartHandlers = [
  http.get('/api/cart', async ({ request }) => {
    await delay(300);
    const sessionId = request.headers.get('Authorization') || 'guest-session';
    const cart = db.carts.get(sessionId) || [];
    return HttpResponse.json(cart);
  }),

  http.post('/api/cart', async ({ request }) => {
    await delay(300);
    const sessionId = request.headers.get('Authorization') || 'guest-session';
    const { nftId, quantity } = (await request.json()) as { nftId: string; quantity: number };

    const nft = db.nfts.find((n) => n.id === nftId);
    if (!nft) return new HttpResponse(null, { status: 404 });

    const cart = db.carts.get(sessionId) || [];
    const existingItem = cart.find((i) => i.nftId === nftId);

    const currentQuantity = existingItem ? existingItem.quantity : 0;
    const newQuantity = currentQuantity + quantity;

    if (newQuantity > nft.availableEditions) {
      return HttpResponse.json(
        { message: 'Quantidade excede o estoque disponível' },
        { status: 400 }
      );
    }

    if (existingItem) {
      existingItem.quantity = newQuantity;
    } else {
      cart.push({ nftId, quantity: newQuantity });
    }

    db.carts.set(sessionId, cart);
    saveDb();
    return HttpResponse.json(cart);
  }),

  http.delete('/api/cart/:nftId', async ({ request, params }) => {
    await delay(300);
    const sessionId = request.headers.get('Authorization') || 'guest-session';
    const { nftId } = params;
    let cart = db.carts.get(sessionId) || [];
    cart = cart.filter(i => i.nftId !== nftId);
    db.carts.set(sessionId, cart);
    saveDb();
    return HttpResponse.json(cart);
  }),

  http.patch('/api/cart/:nftId', async ({ request, params }) => {
    await delay(300);
    const sessionId = request.headers.get('Authorization') || 'guest-session';
    const { nftId } = params;
    const { quantity } = (await request.json()) as { quantity: number };

    const nft = db.nfts.find((n) => n.id === nftId);
    if (!nft) return new HttpResponse(null, { status: 404 });

    const cart = db.carts.get(sessionId) || [];
    const item = cart.find(i => i.nftId === nftId);
    
    if (!item) return new HttpResponse(null, { status: 404 });

    if (quantity > nft.availableEditions) {
      return HttpResponse.json(
        { message: 'Quantidade excede o estoque disponível' },
        { status: 400 }
      );
    }

    item.quantity = quantity;
    db.carts.set(sessionId, cart);
    saveDb();
    return HttpResponse.json(cart);
  }),

  http.post('/api/cart/coupon', async ({ request }) => {
    await delay(500);
    const { code } = (await request.json()) as { code: string };
    
    if (code === 'INVALID') {
      return HttpResponse.json({ message: 'Cupom inválido' }, { status: 400 });
    }
    if (code === 'EXPIRED') {
      return HttpResponse.json({ message: 'Cupom expirado' }, { status: 400 });
    }
    
    return HttpResponse.json({ discountEth: '0.05', code });
  }),
];
