# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkpoint1.spec.ts >> Checkpoint 1: Catálogo, Detalhe e Carrinho >> captura screenshots para desktop
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
    - banner [ref=e5]:
      - generic [ref=e6]:
        - link "Kurio" [ref=e7] [cursor=pointer]:
          - /url: /
        - navigation [ref=e9]:
          - link "Início" [ref=e10] [cursor=pointer]:
            - /url: /
          - link "Mercado" [ref=e11] [cursor=pointer]:
            - /url: /
          - link "Criadores" [ref=e12] [cursor=pointer]:
            - /url: /
          - link "Aprenda" [ref=e13] [cursor=pointer]:
            - /url: /
        - generic [ref=e14]:
          - button "Buscar" [ref=e15]
          - button "Carrinho" [ref=e20]
          - link [ref=e27] [cursor=pointer]:
            - /url: /login
            - button "Entrar" [ref=e28]
    - main [ref=e29]:
      - generic [ref=e30]:
        - region "Destaque" [ref=e31]:
          - generic [ref=e32]:
            - generic [ref=e33]:
              - generic [ref=e34]: Bem-vindo à Kurio
              - heading "Seja dono do futuro da arte digital" [level=1] [ref=e35]: Seja dono do futuroda arte digital
              - paragraph [ref=e36]: Descubra NFTs selecionados de criadores emergentes e consagrados. Colecione arte digital rara, apoie artistas e tenha uma parte da cultura da internet.
              - button "Explorar" [ref=e37]
            - generic [ref=e38]:
              - generic [ref=e39]:
                - img "NFT Destaque 1" [ref=e40]
                - img "NFT Destaque 2" [ref=e41]
                - img "NFT Destaque 3" [ref=e42]
              - tablist "Slides do hero" [ref=e43]:
                - tab "Slide 1" [ref=e44]
                - tab "Slide 2" [ref=e45]
                - tab "Slide 3" [selected] [ref=e46]
        - generic [ref=e47]:
          - complementary [ref=e48]:
            - generic [ref=e49]:
              - generic [ref=e51]:
                - textbox "Buscar colecionáveis..." [ref=e52]: cosmic
                - button "IR" [active] [ref=e53]
              - generic [ref=e54]:
                - heading "Coleções" [level=3] [ref=e55]
                - list [ref=e56]:
                  - listitem [ref=e57] [cursor=pointer]:
                    - generic [ref=e58]: Arte Digital
                    - generic [ref=e59]: (33)
                  - listitem [ref=e60] [cursor=pointer]:
                    - generic [ref=e61]: Fotografia
                    - generic [ref=e62]: (12)
                  - listitem [ref=e63] [cursor=pointer]:
                    - generic [ref=e64]: Música
                    - generic [ref=e65]: (55)
                  - listitem [ref=e66] [cursor=pointer]:
                    - generic [ref=e67]: Arte 3D
                    - generic [ref=e68]: (39)
                  - listitem [ref=e69] [cursor=pointer]:
                    - generic [ref=e70]: Colecionáveis
                    - generic [ref=e71]: (22)
                  - listitem [ref=e72] [cursor=pointer]:
                    - generic [ref=e73]: Generativo
                    - generic [ref=e74]: (17)
                  - listitem [ref=e75] [cursor=pointer]:
                    - generic [ref=e76]: Jogos
                    - generic [ref=e77]: (15)
                  - listitem [ref=e78] [cursor=pointer]:
                    - generic [ref=e79]: Assinaturas
                    - generic [ref=e80]: (10)
                  - listitem [ref=e81] [cursor=pointer]:
                    - generic [ref=e82]: Utilidade
                    - generic [ref=e83]: (16)
              - generic [ref=e84]:
                - heading "Faixa de preço" [level=3] [ref=e85]
                - generic [ref=e91]: "Preço: 0,02 - 12,30 ETH"
                - button "Aplicar" [ref=e92]
              - generic [ref=e93]:
                - heading "Rede" [level=3] [ref=e94]
                - list [ref=e95]:
                  - listitem [ref=e96] [cursor=pointer]:
                    - generic [ref=e97]: Ethereum
                    - generic [ref=e98]: (119)
                  - listitem [ref=e99] [cursor=pointer]:
                    - generic [ref=e100]: Polygon
                    - generic [ref=e101]: (78)
                  - listitem [ref=e102] [cursor=pointer]:
                    - generic [ref=e103]: Solana
                    - generic [ref=e104]: (86)
              - button "Limpar Filtros" [ref=e106]
            - generic [ref=e107]:
              - heading "NFT em Destaque" [level=3] [ref=e108]
              - paragraph [ref=e109]: Oferta Limitada
              - img "NFT Destaque" [ref=e111]
          - generic [ref=e112]:
            - generic [ref=e113]:
              - generic [ref=e114]:
                - generic [ref=e115]: Todos os NFTs
                - generic [ref=e116] [cursor=pointer]: Novos lançamentos
                - generic [ref=e117] [cursor=pointer]: Em alta
              - generic [ref=e118]: Ordenar por:Listados recentemente
            - generic [ref=e119]:
              - paragraph [ref=e120]: Nenhum NFT encontrado.
              - paragraph [ref=e121]: Ajuste seus filtros ou termo de busca.
        - region "Destaques editoriais" [ref=e122]:
          - generic [ref=e123]:
            - img "Lançamentos gratuitos" [ref=e124]
            - generic [ref=e126]:
              - heading "Lançamentos gratuitos de edição limitada" [level=3] [ref=e127]: Lançamentos gratuitosde edição limitada
              - paragraph [ref=e128]: Descubra edições exclusivas, distribuídas com criadores antes da cunhagem pública.
              - button "Explorar" [ref=e129]
          - generic [ref=e130]:
            - img "Tutoriais e artistas" [ref=e131]
            - generic [ref=e133]:
              - heading "Tutoriais, artistas e produtividade" [level=3] [ref=e134]
              - paragraph [ref=e135]: Cultive conexões com artistas, guias, produtividade e mais dentro da rede.
          - generic [ref=e136]:
            - img "Arte digital colecionável" [ref=e137]
            - generic [ref=e139]:
              - heading "Arte digital colecionável e muito mais" [level=3] [ref=e140]: Arte digital colecionávele muito mais
              - paragraph [ref=e141]: Explore novas mídias, coleções verificadas e drops digitais exclusivos.
        - region "Diário da Cunhagem" [ref=e142]:
          - generic [ref=e143]:
            - heading "Diário da Cunhagem" [level=2] [ref=e144]
            - paragraph [ref=e145]: Artesanato, guias e insights para colecionadores sobre o universo da propriedade digital.
          - generic [ref=e146]:
            - article [ref=e147]:
              - img "Como funciona a propriedade de NFTs" [ref=e149]
              - paragraph [ref=e150]: 18 de outubro
              - heading "Como funciona a propriedade de NFTs" [level=3] [ref=e151]
              - paragraph [ref=e152]: Entenda o certificado, registre a histórico e colecione arte digital autêntica.
            - article [ref=e153]:
              - img "10 artistas digitais para acompanhar" [ref=e155]
              - paragraph [ref=e156]: 14 de outubro
              - heading "10 artistas digitais para acompanhar" [level=3] [ref=e157]
              - paragraph [ref=e158]: Criadores criativos que estão moldando a arte digital contemporânea.
            - article [ref=e159]:
              - img "Tendências de generativas e IA" [ref=e161]
              - paragraph [ref=e162]: 21 de outubro
              - heading "Tendências de generativas e IA" [level=3] [ref=e163]
              - paragraph [ref=e164]: Como inteligência artificial está mudando o panorama da arte gerada por código.
            - article [ref=e165]:
              - img "Como proteger sua coleção" [ref=e167]
              - paragraph [ref=e168]: 10 de outubro
              - heading "Como proteger sua coleção" [level=3] [ref=e169]
              - paragraph [ref=e170]: Práticas de segurança, como usar carteiras, armazenar chaves e verificar autenticidade.
    - contentinfo [ref=e171]:
      - generic [ref=e174]:
        - generic [ref=e175]:
          - generic [ref=e176]:
            - generic [ref=e177]: W
            - heading "Segurança da carteira" [level=4] [ref=e178]
            - paragraph [ref=e179]: Proteja sua carteira e colecione arte digital verificada com confiança.
          - generic [ref=e180]:
            - generic [ref=e181]: C
            - heading "Criadores em destaque" [level=4] [ref=e182]
            - paragraph [ref=e183]: Conheça artistas, estúdios e comunidades que moldam a cultura digital na rede.
          - generic [ref=e184]:
            - generic [ref=e185]: D
            - heading "Alertas de lançamentos" [level=4] [ref=e186]
            - paragraph [ref=e187]: Receba calendários de cunhagem, novidades de listas de acesso e análises do mercado.
        - generic [ref=e188]:
          - heading "Antecipe-se ao próximo lançamento" [level=4] [ref=e189]: Antecipe-se ao próximolançamento
          - generic [ref=e190]:
            - textbox "Email para newsletter" [ref=e191]:
              - /placeholder: digite seu e-mail...
            - button "Enviar" [ref=e192]
          - paragraph [ref=e193]: Receba lançamentos selecionados, histórias de criadores e novidades do mercado.
      - generic [ref=e196]:
        - generic [ref=e197]: KURIO
        - generic [ref=e198]: Feito para colecionadores, criadores e cultura
        - generic [ref=e199]: contato@email.com
        - generic [ref=e200]: +55 11 4002 8922
      - generic [ref=e202]:
        - generic [ref=e203]:
          - generic [ref=e204]:
            - heading "Meu perfil" [level=4] [ref=e205]
            - list [ref=e206]:
              - listitem [ref=e207]:
                - link "Meu perfil" [ref=e208] [cursor=pointer]:
                  - /url: /profile
              - listitem [ref=e209]:
                - link "Minha coleção" [ref=e210] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e211]:
                - link "Atividade" [ref=e212] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e213]:
                - link "Estúdio do criador" [ref=e214] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e215]:
                - link "Lista de interesse" [ref=e216] [cursor=pointer]:
                  - /url: /
          - generic [ref=e217]:
            - heading "Central de ajuda" [level=4] [ref=e218]
            - list [ref=e219]:
              - listitem [ref=e220]:
                - link "Central de ajuda" [ref=e221] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e222]:
                - link "Como comprar NFTs" [ref=e223] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e224]:
                - link "Carteira e segurança" [ref=e225] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e226]:
                - link "Política do mercado" [ref=e227] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e228]:
                - link "Denunciar item" [ref=e229] [cursor=pointer]:
                  - /url: /
          - generic [ref=e230]:
            - heading "Coleções" [level=4] [ref=e231]
            - list [ref=e232]:
              - listitem [ref=e233]:
                - link "Arte digital" [ref=e234] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e235]:
                - link "Fotografia" [ref=e236] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e237]:
                - link "Música" [ref=e238] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e239]:
                - link "Arte 3D" [ref=e240] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e241]:
                - link "Utilidade" [ref=e242] [cursor=pointer]:
                  - /url: /
          - generic [ref=e243]:
            - heading "Redes sociais" [level=4] [ref=e244]
            - generic [ref=e245]:
              - link "Facebook" [ref=e246] [cursor=pointer]:
                - /url: "#"
              - link "Instagram" [ref=e249] [cursor=pointer]:
                - /url: "#"
              - link "Twitter" [ref=e253] [cursor=pointer]:
                - /url: "#"
              - link "LinkedIn" [ref=e256] [cursor=pointer]:
                - /url: "#"
              - link "YouTube" [ref=e261] [cursor=pointer]:
                - /url: "#"
            - heading "Carteiras compatíveis" [level=4] [ref=e265]
            - generic [ref=e266]:
              - generic [ref=e267]: METAMASK
              - generic [ref=e268]: WALLETCONNECT
              - generic [ref=e269]: COINBASE
        - generic [ref=e270]: © 2026 Kurio. Propriedade digital para todos.
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
> 33 |         await page.waitForSelector('text=Cosmic Bloom', { state: 'visible' });
     |                    ^ Error: page.waitForSelector: Test timeout of 30000ms exceeded.
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
  48 |         await page.waitForSelector('text=Cosmic Bloom', { state: 'visible' });
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