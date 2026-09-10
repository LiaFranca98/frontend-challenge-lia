import fs from 'fs';

const data = JSON.parse(fs.readFileSync('figma_data_deep.json', 'utf8'));

// 1. Extract Styles (Colors and Typography)
const colors = [];
const typography = [];

Object.values(data.styles || {}).forEach(style => {
  if (style.styleType === 'FILL') colors.push(style);
  if (style.styleType === 'TEXT') typography.push(style);
});

// We can analyze the document tree to find components and their properties
const components = new Set();
let borderRadiusCount = {};
let paddingCount = {};

function traverse(node) {
  if (node.type === 'COMPONENT' || node.type === 'COMPONENT_SET' || node.type === 'INSTANCE') {
    components.add(node.name);
  }
  
  if (node.cornerRadius) {
    borderRadiusCount[node.cornerRadius] = (borderRadiusCount[node.cornerRadius] || 0) + 1;
  }
  
  if (node.paddingLeft || node.paddingTop || node.itemSpacing) {
    const p = `${node.paddingTop || 0}px ${node.paddingRight || 0}px ${node.paddingBottom || 0}px ${node.paddingLeft || 0}px (Gap: ${node.itemSpacing || 0}px)`;
    paddingCount[p] = (paddingCount[p] || 0) + 1;
  }

  if (node.children) {
    node.children.forEach(traverse);
  }
}

if (data.document) traverse(data.document);

// Build markdown
let md = `# Design System Foundation

## 1. Cores (Colors)
`;

colors.forEach(c => {
  md += `- **${c.name}**: ${c.description || 'No description'}\n`;
});

md += `\n## 2. Tipografia (Typography)\n`;
typography.forEach(t => {
  md += `- **${t.name}**: ${t.description || 'No description'}\n`;
});

md += `\n## 3. Border Radius\n`;
Object.entries(borderRadiusCount).sort((a,b) => b[1] - a[1]).slice(0, 5).forEach(([radius, count]) => {
  md += `- **${radius}px** (usado ${count} vezes)\n`;
});

md += `\n## 4. Espaçamentos (Padding & Gap)\n`;
Object.entries(paddingCount).sort((a,b) => b[1] - a[1]).slice(0, 10).forEach(([pad, count]) => {
  md += `- **${pad}** (usado ${count} vezes)\n`;
});

md += `\n## 5. Componentes Principais (Figma Components)\n`;
Array.from(components).filter(c => !c.startsWith('Mobile /') && !c.startsWith('Desktop /')).slice(0, 20).forEach(c => {
  md += `- ${c}\n`;
});

md += `\n## 6. Comportamento Desktop/Mobile\n`;
md += `- **Breakpoints**: 390px (Mobile), 768px (Tablet - fluxo fluido), 1440px (Desktop).\n`;
md += `- **Layout**: Container centralizado (max-width em desktop), padding lateral em mobile.\n`;

fs.mkdirSync('docs', { recursive: true });
fs.writeFileSync('docs/DESIGN_SYSTEM.md', md);
console.log('Created docs/DESIGN_SYSTEM.md');
