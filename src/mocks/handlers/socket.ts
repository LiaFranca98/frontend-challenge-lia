import { ws } from 'msw';
import { db } from '../db';


// Mock Socket.IO using standard WebSocket handler in MSW
// Socket.IO normally connects to /socket.io/?EIO=4&transport=websocket
export const socketHandlers = [
  ws.link('ws://localhost:5174').addEventListener('connection', ({ client }) => {
    console.log('[MSW] Real-time mock socket connected');
    
    // Simulate real-time updates every 10 seconds
    const interval = setInterval(() => {
      // Pick a random NFT
      const nfts = db.nfts;
      const randomNftIndex = Math.floor(Math.random() * nfts.length);
      const nft = nfts[randomNftIndex];

      if (nft) {
        // Randomly decrease available editions or slightly change price
        if (Math.random() > 0.5 && nft.availableEditions > 0) {
          nft.availableEditions -= 1;
        } else {
          // Increase or decrease price by small fraction
          const currentPrice = parseFloat(nft.priceEth);
          const change = currentPrice * 0.05 * (Math.random() > 0.5 ? 1 : -1);
          nft.priceEth = (currentPrice + change).toFixed(3);
        }

        // Send a simulated Socket.IO event: 42["event_name", payload]
        // 4 = Engine.IO MESSAGE, 2 = Socket.IO EVENT
        const payload = JSON.stringify([
          'nft_update', 
          { id: nft.id, availableEditions: nft.availableEditions, priceEth: nft.priceEth }
        ]);
        
        client.send(`42${payload}`);
      }
    }, 10000);

    client.addEventListener('close', () => {
      clearInterval(interval);
    });
  }),
];
