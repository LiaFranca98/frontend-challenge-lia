const fs = require('fs');
const https = require('https');

const nodes = require('./image_nodes.json');
const targetNodes = nodes.filter(n => n.name.startsWith('NFT Artwork'));
// Get unique ones if needed, or just take first 6
const uniqueRefs = [...new Set(targetNodes.map(n => n.imageRef))].slice(0, 6);

// Instead of downloading from Figma Images API which requires nodeId, 
// wait, the Figma images API takes Node IDs!
const nodeIds = targetNodes.slice(0, 6).map(n => n.id).join(',');
console.log('Fetching node IDs:', nodeIds);

const options = {
  hostname: 'api.figma.com',
  path: `/v1/images/Ff0SksUi7UFtPWUO8kyNtw?ids=${nodeIds}&format=png&scale=2`,
  headers: {
    'X-Figma-Token': 'figd_KqTkf9IHmV98_O2LyGmmeRPUSKVFu_pBVI9t_R2O'
  }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    console.log(json);
    
    // Download each image
    if (json.images) {
      if (!fs.existsSync('public/nfts')) fs.mkdirSync('public/nfts');
      let i = 1;
      for (const [id, url] of Object.entries(json.images)) {
        const dest = `public/nfts/nft-${i}.png`;
        const file = fs.createWriteStream(dest);
        https.get(url, (res2) => {
          res2.pipe(file);
          console.log(`Downloaded ${dest}`);
        });
        i++;
      }
    }
  });
});
