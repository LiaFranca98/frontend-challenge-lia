import { http, HttpResponse } from 'msw';
import { db } from '../db';
import { getUserFromAuth } from './auth';

export const favoritesHandlers = [
  http.get('/api/favorites', ({ request }) => {
    const user = getUserFromAuth(request);
    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const favoriteIds = db.favorites.get(user.id) || [];
    // Populate NFTs
    const nfts = favoriteIds.map(id => db.nfts.find(n => n.id === id)).filter(Boolean);
    
    return HttpResponse.json({ favorites: nfts });
  }),

  http.post('/api/favorites', async ({ request }) => {
    const user = getUserFromAuth(request);
    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { nftId } = await request.json() as { nftId: string };
    
    if (!db.nfts.find(n => n.id === nftId)) {
      return HttpResponse.json({ message: 'NFT not found' }, { status: 404 });
    }

    const userFavs = db.favorites.get(user.id) || [];
    if (!userFavs.includes(nftId)) {
      db.favorites.set(user.id, [...userFavs, nftId]);
    }

    return HttpResponse.json({ success: true });
  }),

  http.delete('/api/favorites/:nftId', ({ request, params }) => {
    const user = getUserFromAuth(request);
    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const nftId = params.nftId as string;
    const userFavs = db.favorites.get(user.id) || [];
    
    db.favorites.set(user.id, userFavs.filter(id => id !== nftId));

    return HttpResponse.json({ success: true });
  })
];
