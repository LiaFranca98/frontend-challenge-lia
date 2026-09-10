const fs = require('fs');

const data = JSON.parse(fs.readFileSync('figma_data.json', 'utf8'));

const imageNodes = [];

function traverse(node) {
  if (node.fills) {
    for (const fill of node.fills) {
      if (fill.type === 'IMAGE' && fill.imageRef) {
        imageNodes.push({
          id: node.id,
          name: node.name,
          imageRef: fill.imageRef
        });
      }
    }
  }
  if (node.children) {
    for (const child of node.children) {
      traverse(child);
    }
  }
}

traverse(data.document);

console.log('Found image nodes:', imageNodes.length);
fs.writeFileSync('image_nodes.json', JSON.stringify(imageNodes, null, 2));
