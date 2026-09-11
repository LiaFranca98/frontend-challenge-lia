# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkpoint1.spec.ts >> Checkpoint 1: Catálogo, Detalhe e Carrinho >> captura screenshots para mobile
- Location: tests/checkpoint1.spec.ts:11:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForSelector: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('text=Cosmic Bloom') to be visible

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - link "Pular para o conteúdo principal" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - generic [ref=e4]:
    - main [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e7]:
          - textbox "Explorar coleções" [active] [ref=e13]: cosmic
          - button "Filtrar coleções" [ref=e14]
        - region "Destaque" [ref=e19]:
          - generic [ref=e20]:
            - generic [ref=e21]:
              - generic [ref=e22]:
                - text: Bem-vindo à Kurio
                - heading "SEJA DONO DA CULTURA DIGITAL" [level=1] [ref=e23]: SEJA DONO DACULTURA DIGITAL
                - paragraph [ref=e24]: Descubra NFTs selecionados de criadores do mundo todo.
                - button "EXPLORAR" [ref=e25]
              - generic [ref=e29]:
                - generic [ref=e30]:
                  - img "NFT Destaque principal 1" [ref=e31]
                  - img "NFT Destaque secundário 1" [ref=e32]
                - generic [ref=e33]:
                  - img "NFT Destaque principal 2" [ref=e34]
                  - img "NFT Destaque secundário 2" [ref=e35]
                - generic [ref=e36]:
                  - img "NFT Destaque principal 3" [ref=e37]
                  - img "NFT Destaque secundário 3" [ref=e38]
            - tablist "Slides do hero" [ref=e39]:
              - tab "Slide 1" [ref=e40]
              - tab "Slide 2" [ref=e41]
              - tab "Slide 3" [selected] [ref=e42]
        - generic [ref=e44]:
          - generic [ref=e46]:
            - generic [ref=e47]: Todos os NFTs
            - generic [ref=e48] [cursor=pointer]: Novos lançamentos
            - generic [ref=e49] [cursor=pointer]: Em alta
          - generic [ref=e50]:
            - paragraph [ref=e51]: Nenhum NFT encontrado.
            - paragraph [ref=e52]: Ajuste seus filtros ou termo de busca.
        - region "Destaques editoriais" [ref=e53]:
          - generic [ref=e54]:
            - img "Lançamentos gratuitos" [ref=e55]
            - generic [ref=e57]:
              - heading "Lançamentos gratuitos de edição limitada" [level=3] [ref=e58]: Lançamentos gratuitosde edição limitada
              - paragraph [ref=e59]: Descubra edições exclusivas, distribuídas com criadores antes da cunhagem pública.
              - button "Explorar" [ref=e60]
          - generic [ref=e61]:
            - img "Tutoriais e artistas" [ref=e62]
            - generic [ref=e64]:
              - heading "Tutoriais, artistas e produtividade" [level=3] [ref=e65]
              - paragraph [ref=e66]: Cultive conexões com artistas, guias, produtividade e mais dentro da rede.
          - generic [ref=e67]:
            - img "Arte digital colecionável" [ref=e68]
            - generic [ref=e70]:
              - heading "Arte digital colecionável e muito mais" [level=3] [ref=e71]: Arte digital colecionávele muito mais
              - paragraph [ref=e72]: Explore novas mídias, coleções verificadas e drops digitais exclusivos.
        - region "Diário da Cunhagem" [ref=e73]:
          - generic [ref=e74]:
            - heading "Diário da Cunhagem" [level=2] [ref=e75]
            - paragraph [ref=e76]: Artesanato, guias e insights para colecionadores sobre o universo da propriedade digital.
          - generic [ref=e77]:
            - article [ref=e78]:
              - img "Como funciona a propriedade de NFTs" [ref=e80]
              - paragraph [ref=e81]: 18 de outubro
              - heading "Como funciona a propriedade de NFTs" [level=3] [ref=e82]
              - paragraph [ref=e83]: Entenda o certificado, registre a histórico e colecione arte digital autêntica.
            - article [ref=e84]:
              - img "10 artistas digitais para acompanhar" [ref=e86]
              - paragraph [ref=e87]: 14 de outubro
              - heading "10 artistas digitais para acompanhar" [level=3] [ref=e88]
              - paragraph [ref=e89]: Criadores criativos que estão moldando a arte digital contemporânea.
            - article [ref=e90]:
              - img "Tendências de generativas e IA" [ref=e92]
              - paragraph [ref=e93]: 21 de outubro
              - heading "Tendências de generativas e IA" [level=3] [ref=e94]
              - paragraph [ref=e95]: Como inteligência artificial está mudando o panorama da arte gerada por código.
            - article [ref=e96]:
              - img "Como proteger sua coleção" [ref=e98]
              - paragraph [ref=e99]: 10 de outubro
              - heading "Como proteger sua coleção" [level=3] [ref=e100]
              - paragraph [ref=e101]: Práticas de segurança, como usar carteiras, armazenar chaves e verificar autenticidade.
    - navigation "Navegação mobile" [ref=e102]:
      - generic [ref=e104]:
        - link "Início" [ref=e105] [cursor=pointer]:
          - /url: /
        - link "Favoritos" [ref=e109] [cursor=pointer]:
          - /url: /favorites
        - button "Explorar coleções" [ref=e113]
        - button "Carrinho" [ref=e120]
        - link "Perfil" [ref=e124] [cursor=pointer]:
          - /url: /profile
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const SIZES = [
  4  |   { name: 'mobile', width: 390, height: 844 },
  5  |   { name: 'tablet', width: 768, height: 1024 },
  6  |   { name: 'desktop', width: 1440, height: 900 },
  7  | ];
  8  | 
  9  | test.describe('Checkpoint 1: Catálogo, Detalhe e Carrinho', () => {
  10 |   for (const size of SIZES) {
  11 |     test(`captura screenshots para ${size.name}`, async ({ page }) => {
  12 |       await page.setViewportSize({ width: size.width, height: size.height });
  13 |       
  14 |       // 1. Catálogo
  15 |       await page.goto('/');
  16 |       // Aguardar carregamento dos mocks MSW e React Query
  17 |       await page.waitForSelector('text=Emerald Ape', { state: 'visible' });
  18 |       
  19 |       // Screenshot catálogo
  20 |       await page.screenshot({ 
  21 |         path: `/Users/lia/.gemini/antigravity-ide/brain/a948781e-a012-4571-8496-0bcf1d7bb847/scratch/catalog-${size.name}.png`,
  22 |         fullPage: true 
  23 |       });
  24 | 
  25 |       // Validar persistência na URL e paginação
  26 |       const desktopFilterInput = page.locator('form').getByPlaceholder('Buscar colecionáveis...');
  27 |       const mobileFilterInput = page.locator('form').getByPlaceholder('Explorar coleções');
  28 |       
  29 |       if (await desktopFilterInput.isVisible()) {
  30 |         await desktopFilterInput.fill('cosmic');
  31 |         await page.locator('form').getByRole('button', { name: 'IR' }).click();
  32 |         await page.waitForURL('**/?q=cosmic*');
  33 |         await page.waitForSelector('text=Cosmic Bloom', { state: 'visible' });
  34 |         
  35 |         await page.screenshot({ 
  36 |           path: `/Users/lia/.gemini/antigravity-ide/brain/a948781e-a012-4571-8496-0bcf1d7bb847/scratch/catalog-filtered-${size.name}.png`,
  37 |           fullPage: true 
  38 |         });
  39 | 
  40 |         // Limpar filtros para voltar
  41 |         await page.getByRole('button', { name: 'Limpar Filtros' }).click();
  42 |         await page.waitForURL('**/?page=1');
  43 |       } else if (await mobileFilterInput.isVisible()) {
  44 |         // Mobile search: just fill and submit (press Enter)
  45 |         await mobileFilterInput.fill('cosmic');
  46 |         await mobileFilterInput.press('Enter');
  47 |         await page.waitForURL('**/?q=cosmic*');
> 48 |         await page.waitForSelector('text=Cosmic Bloom', { state: 'visible' });
     |                    ^ Error: page.waitForSelector: Test timeout of 30000ms exceeded.
  49 |         
  50 |         await page.screenshot({ 
  51 |           path: `/Users/lia/.gemini/antigravity-ide/brain/a948781e-a012-4571-8496-0bcf1d7bb847/scratch/catalog-filtered-${size.name}.png`,
  52 |           fullPage: true 
  53 |         });
  54 |         
  55 |         // Navigate back to clear
  56 |         await page.goto('/');
  57 |         await page.waitForSelector('text=Emerald Ape', { state: 'visible' });
  58 |       }
  59 | 
  60 |       // 2. Navegar para detalhe
  61 |       await page.goto('/');
  62 |       await page.waitForSelector('text=Emerald Ape', { state: 'visible' });
  63 |       await page.getByText('Emerald Ape').first().click();
  64 |       await page.waitForURL('**/nfts/nft-1');
  65 |       await page.waitForSelector('text=Comprar', { state: 'visible' });
  66 | 
  67 |       await page.screenshot({ 
  68 |         path: `/Users/lia/.gemini/antigravity-ide/brain/a948781e-a012-4571-8496-0bcf1d7bb847/scratch/detail-${size.name}.png`,
  69 |         fullPage: true 
  70 |       });
  71 | 
  72 |       // 3. Adicionar ao carrinho
  73 |       await page.getByRole('button', { name: 'Comprar' }).click();
  74 |       
  75 |       // O Header tem o contador no ícone de carrinho
  76 |       // Devemos esperar o MSW responder (isAdding -> Carrinho (1))
  77 |       await expect(page.locator('header').getByText('1')).toBeVisible();
  78 | 
  79 |       await page.screenshot({ 
  80 |         path: `/Users/lia/.gemini/antigravity-ide/brain/a948781e-a012-4571-8496-0bcf1d7bb847/scratch/detail-added-cart-${size.name}.png`,
  81 |         fullPage: true 
  82 |       });
  83 |     });
  84 |   }
  85 | });
  86 | 
```