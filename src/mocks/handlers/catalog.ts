import { http, HttpResponse, delay } from 'msw';
import { db } from '../db';
import { nfts } from '../fixtures/nfts';

// Initialize in-memory DB if empty
if (db.nfts.length === 0) {
  db.nfts.push(...nfts);
}

export const catalogHandlers = [
  http.get('/api/nfts', async ({ request }) => {
    await delay(500); // Simulate network latency

    const url = new URL(request.url);
    const search = url.searchParams.get('q')?.toLowerCase() || '';
    const sort = url.searchParams.get('sort') || 'newest'; // newest, price-asc, price-desc
    const availability = url.searchParams.get('availability'); // 'available'
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '4', 10);

    let results = [...db.nfts];

    // Filter by search
    if (search) {
      results = results.filter(
        (nft) =>
          nft.title.toLowerCase().includes(search) ||
          nft.creator.toLowerCase().includes(search) ||
          nft.collection.toLowerCase().includes(search)
      );
    }

    // Filter by availability
    if (availability === 'available') {
      results = results.filter((nft) => nft.availableEditions > 0);
    }

    // Sort
    results.sort((a, b) => {
      const priceA = parseFloat(a.priceEth);
      const priceB = parseFloat(b.priceEth);
      
      switch (sort) {
        case 'price-asc':
          return priceA - priceB;
        case 'price-desc':
          return priceB - priceA;
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    // Paginate
    const totalCount = results.length;
    const totalPages = Math.ceil(totalCount / limit);
    const startIndex = (page - 1) * limit;
    const paginatedResults = results.slice(startIndex, startIndex + limit);

    return HttpResponse.json({
      data: paginatedResults,
      meta: {
        page,
        limit,
        totalCount,
        totalPages,
      },
    });
  }),
  
  http.get('/api/nfts/:id', async ({ params }) => {
    await delay(300);
    const { id } = params;
    const nft = db.nfts.find((n) => n.id === id);
    
    if (!nft) {
      return new HttpResponse(null, { status: 404, statusText: 'NFT Not Found' });
    }
    
    return HttpResponse.json(nft);
  })
];
