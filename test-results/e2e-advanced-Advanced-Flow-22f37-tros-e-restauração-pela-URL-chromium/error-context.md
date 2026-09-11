# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/advanced.spec.ts >> Advanced Flows >> Busca e Histórico - Filtros e restauração pela URL
- Location: tests/e2e/advanced.spec.ts:59:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Comprar agora' })

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
                - textbox "Buscar colecionáveis..." [active] [ref=e52]: Emerald
                - button "IR" [ref=e53]
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
              - paragraph [ref=e108]: NFT em Destaque
              - paragraph [ref=e109]: Oferta Limitada
              - generic [ref=e110]:
                - img "NFT Destaque 1" [ref=e111]
                - img "NFT Destaque 2" [ref=e112]
                - img "NFT Destaque 3" [ref=e113]
                - img "NFT Destaque 4" [ref=e114]
          - generic [ref=e115]:
            - generic [ref=e116]:
              - generic [ref=e117]:
                - generic [ref=e118]: Todos os NFTs
                - generic [ref=e119] [cursor=pointer]: Novos lançamentos
                - generic [ref=e120] [cursor=pointer]: Em alta
              - generic [ref=e121]: Ordenar por:Listados recentemente
            - generic [ref=e122]:
              - generic [ref=e123]:
                - link [ref=e124] [cursor=pointer]:
                  - /url: /nfts/nft-8
                  - 'img "Golden Signal #160" [ref=e125]'
                  - generic [ref=e127]:
                    - 'button "Adicionar Golden Signal #160 ao carrinho" [ref=e128]'
                    - 'button "Favoritar Golden Signal #160" [ref=e134]'
                    - 'link "Ver detalhes de Golden Signal #160" [ref=e137]':
                      - /url: /nfts/nft-8
                - 'link "Golden Signal #160 0.39 ETH" [ref=e142] [cursor=pointer]':
                  - /url: /nfts/nft-8
                  - 'heading "Golden Signal #160" [level=3] [ref=e143]'
                  - generic [ref=e144]: 0.39 ETH
              - generic [ref=e145]:
                - link [ref=e146] [cursor=pointer]:
                  - /url: /nfts/nft-7
                  - 'img "Golden Beat #207" [ref=e147]'
                  - generic [ref=e149]:
                    - 'button "Adicionar Golden Beat #207 ao carrinho" [ref=e150]'
                    - 'button "Favoritar Golden Beat #207" [ref=e156]'
                    - 'link "Ver detalhes de Golden Beat #207" [ref=e159]':
                      - /url: /nfts/nft-7
                - 'link "Golden Beat #207 0.99 ETH" [ref=e164] [cursor=pointer]':
                  - /url: /nfts/nft-7
                  - 'heading "Golden Beat #207" [level=3] [ref=e165]'
                  - generic [ref=e166]: 0.99 ETH
              - generic [ref=e167]:
                - link [ref=e168] [cursor=pointer]:
                  - /url: /nfts/nft-6
                  - 'img "Ivory Baron #088" [ref=e169]'
                  - generic [ref=e171]:
                    - 'button "Adicionar Ivory Baron #088 ao carrinho" [ref=e172]'
                    - 'button "Favoritar Ivory Baron #088" [ref=e178]'
                    - 'link "Ver detalhes de Ivory Baron #088" [ref=e181]':
                      - /url: /nfts/nft-6
                - 'link "Ivory Baron #088 1.79 ETH" [ref=e186] [cursor=pointer]':
                  - /url: /nfts/nft-6
                  - 'heading "Ivory Baron #088" [level=3] [ref=e187]'
                  - generic [ref=e188]: 1.79 ETH
              - generic [ref=e189]:
                - link [ref=e190] [cursor=pointer]:
                  - /url: /nfts/nft-5
                  - 'img "Violet Nomad #314" [ref=e191]'
                  - generic [ref=e193]:
                    - 'button "Adicionar Violet Nomad #314 ao carrinho" [ref=e194]'
                    - 'button "Favoritar Violet Nomad #314" [ref=e200]'
                    - 'link "Ver detalhes de Violet Nomad #314" [ref=e203]':
                      - /url: /nfts/nft-5
                - 'link "Violet Nomad #314 1.39 ETH" [ref=e208] [cursor=pointer]':
                  - /url: /nfts/nft-5
                  - 'heading "Violet Nomad #314" [level=3] [ref=e209]'
                  - generic [ref=e210]: 1.39 ETH
              - generic [ref=e211]:
                - link [ref=e212] [cursor=pointer]:
                  - /url: /nfts/nft-4
                  - 'img "Cosmic Bloom #118" [ref=e213]'
                  - generic [ref=e215]:
                    - 'button "Adicionar Cosmic Bloom #118 ao carrinho" [ref=e216]'
                    - 'button "Favoritar Cosmic Bloom #118" [ref=e222]'
                    - 'link "Ver detalhes de Cosmic Bloom #118" [ref=e225]':
                      - /url: /nfts/nft-4
                - 'link "Cosmic Bloom #118 1.29 ETH" [ref=e230] [cursor=pointer]':
                  - /url: /nfts/nft-4
                  - 'heading "Cosmic Bloom #118" [level=3] [ref=e231]'
                  - generic [ref=e232]: 1.29 ETH
              - generic [ref=e233]:
                - 'link "Neon Vessel #232 Esgotado" [ref=e234] [cursor=pointer]':
                  - /url: /nfts/nft-3
                  - 'img "Neon Vessel #232" [ref=e235]'
                  - generic [ref=e237]: Esgotado
                - 'link "Neon Vessel #232 1.99 ETH" [ref=e240] [cursor=pointer]':
                  - /url: /nfts/nft-3
                  - 'heading "Neon Vessel #232" [level=3] [ref=e241]'
                  - generic [ref=e242]: 1.99 ETH
              - generic [ref=e243]:
                - link [ref=e244] [cursor=pointer]:
                  - /url: /nfts/nft-2
                  - 'img "Sage Nomad #004" [ref=e245]'
                  - generic [ref=e247]:
                    - 'button "Adicionar Sage Nomad #004 ao carrinho" [ref=e248]'
                    - 'button "Favoritar Sage Nomad #004" [ref=e254]'
                    - 'link "Ver detalhes de Sage Nomad #004" [ref=e257]':
                      - /url: /nfts/nft-2
                - 'link "Sage Nomad #004 1.69 ETH" [ref=e262] [cursor=pointer]':
                  - /url: /nfts/nft-2
                  - 'heading "Sage Nomad #004" [level=3] [ref=e263]'
                  - generic [ref=e264]: 1.69 ETH
              - generic [ref=e265]:
                - link [ref=e266] [cursor=pointer]:
                  - /url: /nfts/nft-1
                  - 'img "Emerald Ape #042" [ref=e267]'
                  - generic [ref=e269]:
                    - 'button "Adicionar Emerald Ape #042 ao carrinho" [ref=e270]'
                    - 'button "Favoritar Emerald Ape #042" [ref=e276]'
                    - 'link "Ver detalhes de Emerald Ape #042" [ref=e279]':
                      - /url: /nfts/nft-1
                - 'link "Emerald Ape #042 1.19 ETH" [ref=e284] [cursor=pointer]':
                  - /url: /nfts/nft-1
                  - 'heading "Emerald Ape #042" [level=3] [ref=e285]'
                  - generic [ref=e286]: 1.19 ETH
        - region "Destaques editoriais" [ref=e287]:
          - generic [ref=e288]:
            - img "Lançamentos gratuitos" [ref=e289]
            - generic [ref=e291]:
              - heading "Lançamentos gratuitos de edição limitada" [level=3] [ref=e292]: Lançamentos gratuitosde edição limitada
              - paragraph [ref=e293]: Descubra edições exclusivas, distribuídas com criadores antes da cunhagem pública.
              - button "Explorar" [ref=e294]
          - generic [ref=e295]:
            - img "Tutoriais e artistas" [ref=e296]
            - generic [ref=e298]:
              - heading "Tutoriais, artistas e produtividade" [level=3] [ref=e299]
              - paragraph [ref=e300]: Cultive conexões com artistas, guias, produtividade e mais dentro da rede.
          - generic [ref=e301]:
            - img "Arte digital colecionável" [ref=e302]
            - generic [ref=e304]:
              - heading "Arte digital colecionável e muito mais" [level=3] [ref=e305]: Arte digital colecionávele muito mais
              - paragraph [ref=e306]: Explore novas mídias, coleções verificadas e drops digitais exclusivos.
        - region "Diário da Cunhagem" [ref=e307]:
          - generic [ref=e308]:
            - heading "Diário da Cunhagem" [level=2] [ref=e309]
            - paragraph [ref=e310]: Artesanato, guias e insights para colecionadores sobre o universo da propriedade digital.
          - generic [ref=e311]:
            - article [ref=e312]:
              - img "Como funciona a propriedade de NFTs" [ref=e314]
              - paragraph [ref=e315]: 18 de outubro
              - heading "Como funciona a propriedade de NFTs" [level=3] [ref=e316]
              - paragraph [ref=e317]: Entenda o certificado, registre a histórico e colecione arte digital autêntica.
            - article [ref=e318]:
              - img "10 artistas digitais para acompanhar" [ref=e320]
              - paragraph [ref=e321]: 14 de outubro
              - heading "10 artistas digitais para acompanhar" [level=3] [ref=e322]
              - paragraph [ref=e323]: Criadores criativos que estão moldando a arte digital contemporânea.
            - article [ref=e324]:
              - img "Tendências de generativas e IA" [ref=e326]
              - paragraph [ref=e327]: 21 de outubro
              - heading "Tendências de generativas e IA" [level=3] [ref=e328]
              - paragraph [ref=e329]: Como inteligência artificial está mudando o panorama da arte gerada por código.
            - article [ref=e330]:
              - img "Como proteger sua coleção" [ref=e332]
              - paragraph [ref=e333]: 10 de outubro
              - heading "Como proteger sua coleção" [level=3] [ref=e334]
              - paragraph [ref=e335]: Práticas de segurança, como usar carteiras, armazenar chaves e verificar autenticidade.
    - contentinfo [ref=e336]:
      - generic [ref=e339]:
        - generic [ref=e340]:
          - generic [ref=e341]:
            - generic [ref=e342]: W
            - heading "Segurança da carteira" [level=4] [ref=e343]
            - paragraph [ref=e344]: Proteja sua carteira e colecione arte digital verificada com confiança.
          - generic [ref=e345]:
            - generic [ref=e346]: C
            - heading "Criadores em destaque" [level=4] [ref=e347]
            - paragraph [ref=e348]: Conheça artistas, estúdios e comunidades que moldam a cultura digital na rede.
          - generic [ref=e349]:
            - generic [ref=e350]: D
            - heading "Alertas de lançamentos" [level=4] [ref=e351]
            - paragraph [ref=e352]: Receba calendários de cunhagem, novidades de listas de acesso e análises do mercado.
        - generic [ref=e353]:
          - heading "Antecipe-se ao próximo lançamento" [level=4] [ref=e354]: Antecipe-se ao próximolançamento
          - generic [ref=e355]:
            - textbox "Email para newsletter" [ref=e356]:
              - /placeholder: digite seu e-mail...
            - button "Enviar" [ref=e357]
          - paragraph [ref=e358]: Receba lançamentos selecionados, histórias de criadores e novidades do mercado.
      - generic [ref=e361]:
        - generic [ref=e362]: KURIO
        - generic [ref=e363]: Feito para colecionadores, criadores e cultura
        - generic [ref=e364]: contato@email.com
        - generic [ref=e365]: +55 11 4002 8922
      - generic [ref=e367]:
        - generic [ref=e368]:
          - generic [ref=e369]:
            - heading "Meu perfil" [level=4] [ref=e370]
            - list [ref=e371]:
              - listitem [ref=e372]:
                - link "Meu perfil" [ref=e373] [cursor=pointer]:
                  - /url: /profile
              - listitem [ref=e374]:
                - link "Minha coleção" [ref=e375] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e376]:
                - link "Atividade" [ref=e377] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e378]:
                - link "Estúdio do criador" [ref=e379] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e380]:
                - link "Lista de interesse" [ref=e381] [cursor=pointer]:
                  - /url: /
          - generic [ref=e382]:
            - heading "Central de ajuda" [level=4] [ref=e383]
            - list [ref=e384]:
              - listitem [ref=e385]:
                - link "Central de ajuda" [ref=e386] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e387]:
                - link "Como comprar NFTs" [ref=e388] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e389]:
                - link "Carteira e segurança" [ref=e390] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e391]:
                - link "Política do mercado" [ref=e392] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e393]:
                - link "Denunciar item" [ref=e394] [cursor=pointer]:
                  - /url: /
          - generic [ref=e395]:
            - heading "Coleções" [level=4] [ref=e396]
            - list [ref=e397]:
              - listitem [ref=e398]:
                - link "Arte digital" [ref=e399] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e400]:
                - link "Fotografia" [ref=e401] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e402]:
                - link "Música" [ref=e403] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e404]:
                - link "Arte 3D" [ref=e405] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e406]:
                - link "Utilidade" [ref=e407] [cursor=pointer]:
                  - /url: /
          - generic [ref=e408]:
            - heading "Redes sociais" [level=4] [ref=e409]
            - generic [ref=e410]:
              - link "Facebook" [ref=e411] [cursor=pointer]:
                - /url: "#"
              - link "Instagram" [ref=e414] [cursor=pointer]:
                - /url: "#"
              - link "Twitter" [ref=e418] [cursor=pointer]:
                - /url: "#"
              - link "LinkedIn" [ref=e421] [cursor=pointer]:
                - /url: "#"
              - link "YouTube" [ref=e426] [cursor=pointer]:
                - /url: "#"
            - heading "Carteiras compatíveis" [level=4] [ref=e430]
            - generic [ref=e431]:
              - generic [ref=e432]: METAMASK
              - generic [ref=e433]: WALLETCONNECT
              - generic [ref=e434]: COINBASE
        - generic [ref=e435]: © 2026 Kurio. Propriedade digital para todos.
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Advanced Flows', () => {
  4   | 
  5   | 
  6   |   test('Auth - Validação e Sessão Falha', async ({ page }) => {
  7   |     await page.goto('/login');
  8   |     await page.fill('input[type="email"]', 'wrong@email.com');
  9   |     await page.fill('input[type="password"]', '123');
  10  |     await page.locator('form').getByRole('button', { name: 'Entrar' }).click();
  11  | 
  12  |     await expect(page.getByText('Invalid credentials')).toBeVisible();
  13  | 
  14  |     // Signup first time to create the user
  15  |     await page.getByRole('button', { name: 'Criar conta' }).first().click();
  16  |     await page.fill('input[placeholder="Seu nome"]', 'Jane Doe');
  17  |     await page.fill('input[type="email"]', 'duplicate@example.com');
  18  |     await page.fill('input[type="password"]', 'pass');
  19  |     await page.locator('form').getByRole('button', { name: 'Criar conta' }).click();
  20  |     
  21  |     // Wait for redirect to home
  22  |     await page.waitForURL('**/');
  23  |     
  24  |     // Go back to login and try signing up with same email
  25  |     await page.goto('/login');
  26  |     await page.getByRole('button', { name: 'Criar conta' }).first().click();
  27  |     await page.fill('input[placeholder="Seu nome"]', 'Jane Doe');
  28  |     await page.fill('input[type="email"]', 'duplicate@example.com');
  29  |     await page.fill('input[type="password"]', 'pass');
  30  |     await page.locator('form').getByRole('button', { name: 'Criar conta' }).click();
  31  |     await expect(page.getByText('Email already in use')).toBeVisible();
  32  |   });
  33  | 
  34  |   test('Checkout - Simula falha 500 no backend', async ({ page }) => {
  35  |     await page.goto('/login');
  36  |     await page.fill('input[type="email"]', 'demo@example.com');
  37  |     await page.fill('input[type="password"]', 'pass');
  38  |     await page.locator('form').getByRole('button', { name: 'Entrar' }).click();
  39  |     await page.waitForURL('**/');
  40  | 
  41  |     // Add to cart
  42  |     await page.getByRole('link', { name: /Emerald Ape #042/i }).first().click();
  43  |     await page.waitForURL('**/nfts/*');
  44  |     await page.getByRole('button', { name: 'Comprar' }).click();
  45  | 
  46  |     // Trigger 500 error
  47  |     await page.evaluate(() => localStorage.setItem('simulate-error', '500'));
  48  | 
  49  |     await page.locator('header').locator('button').filter({ hasText: '1' }).click();
  50  |     await page.locator('text=Finalizar Compra').click();
  51  |     await page.waitForURL('**/checkout');
  52  | 
  53  |     await page.getByRole('button', { name: 'Confirmar compra' }).click();
  54  | 
  55  |     // Await error state on UI
  56  |     await expect(page.getByText(/Erro|Internal Server Error/i)).toBeVisible({ timeout: 10000 });
  57  |   });
  58  | 
  59  |   test('Busca e Histórico - Filtros e restauração pela URL', async ({ page }) => {
  60  |     await page.goto('/');
  61  |     
  62  |     // Fill search
  63  |     const searchInput = page.getByPlaceholder(/Buscar colecionáveis/i);
  64  |     await searchInput.fill('Emerald');
  65  |     
  66  |     // Select filter
> 67  |     await page.getByRole('button', { name: 'Comprar agora' }).click();
      |                                                               ^ Error: locator.click: Test timeout of 30000ms exceeded.
  68  |     
  69  |     // Wait for the query to execute and URL to update
  70  |     await page.waitForURL('**/?q=Emerald&availability=now**');
  71  |     
  72  |     // Assert Emerald is visible
  73  |     await expect(page.getByText('Emerald Ape #042')).toBeVisible();
  74  |     
  75  |     // Navigate to a detail page
  76  |     await page.getByRole('link', { name: /Emerald Ape #042/i }).first().click();
  77  |     await page.waitForURL('**/nfts/*');
  78  |     
  79  |     // Go back and check if filters are restored
  80  |     await page.goBack();
  81  |     await page.waitForURL('**/?q=Emerald&availability=now**');
  82  |     await expect(searchInput).toHaveValue('Emerald');
  83  |   });
  84  | 
  85  |   test('Carrinho e Cupons - Falha no cupom e persistência', async ({ page }) => {
  86  |     // We don't have to login just to add to cart
  87  |     await page.goto('/');
  88  |     await page.getByRole('link', { name: /Emerald Ape #042/i }).first().click();
  89  |     await page.getByRole('button', { name: 'Comprar' }).click();
  90  | 
  91  |     // Reload page to test persistence
  92  |     await page.reload();
  93  |     await page.getByRole('button', { name: 'Carrinho' }).click(); // Open cart
  94  |     await page.locator('text=Finalizar Compra').click();
  95  |     await page.waitForURL('**/checkout');
  96  | 
  97  |     // Try invalid coupon
  98  |     const couponInput = page.getByPlaceholder(/código promocional/i);
  99  |     await couponInput.fill('INVALID');
  100 |     await page.getByRole('button', { name: 'Aplicar' }).click();
  101 |     
  102 |     // We expect the MSW to return 'Cupom inválido' and the UI to show it
  103 |     await expect(page.getByText('Cupom inválido')).toBeVisible();
  104 |   });
  105 | 
  106 |   test('Checkout - Pagamento Recusado e Timeout', async ({ page }) => {
  107 |     await page.goto('/login');
  108 |     await page.fill('input[type="email"]', 'demo@example.com');
  109 |     await page.fill('input[type="password"]', 'pass');
  110 |     await page.locator('form').getByRole('button', { name: 'Entrar' }).click();
  111 |     await page.waitForURL('**/');
  112 | 
  113 |     await page.getByRole('link', { name: /Emerald Ape #042/i }).first().click();
  114 |     await page.getByRole('button', { name: 'Comprar' }).click();
  115 | 
  116 |     // Set timeout
  117 |     await page.evaluate(() => localStorage.setItem('simulate-error', 'timeout'));
  118 |     await page.getByRole('button', { name: 'Carrinho' }).click();
  119 |     await page.locator('text=Finalizar Compra').click();
  120 |     
  121 |     await page.getByRole('button', { name: 'Confirmar compra' }).click();
  122 |     await expect(page.getByText(/Erro|Timeout/i)).toBeVisible({ timeout: 10000 });
  123 | 
  124 |     // Set payment declined
  125 |     await page.evaluate(() => localStorage.setItem('simulate-error', 'payment_declined'));
  126 |     await page.getByRole('button', { name: 'Confirmar compra' }).click();
  127 |     
  128 |     // UI should show some error or redirect to a failed state. For now we just expect an error.
  129 |     await expect(page.getByText(/Erro|refused|Pagamento recusado/i)).toBeVisible({ timeout: 10000 });
  130 |   });
  131 | 
  132 | });
  133 | 
```