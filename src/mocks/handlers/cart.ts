import { http, HttpResponse, delay } from 'msw';
import { db } from '../db';

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
    return HttpResponse.json(cart);
  }),
];
