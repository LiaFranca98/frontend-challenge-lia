# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/advanced.spec.ts >> Advanced Flows >> Carrinho e Cupons - Falha no cupom e persistência
- Location: tests/e2e/advanced.spec.ts:85:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('text=Finalizar Compra')

```

# Page snapshot

```yaml
- generic [ref=f1e1]:
  - link "Pular para o conteúdo principal" [ref=f1e2] [cursor=pointer]:
    - /url: "#main-content"
  - generic [ref=f1e4]:
    - banner [ref=f1e5]:
      - generic [ref=f1e6]:
        - link "Kurio" [ref=f1e7] [cursor=pointer]:
          - /url: /
        - navigation [ref=f1e9]:
          - link "Início" [ref=f1e10] [cursor=pointer]:
            - /url: /
          - link "Mercado" [ref=f1e11] [cursor=pointer]:
            - /url: /
          - link "Criadores" [ref=f1e12] [cursor=pointer]:
            - /url: /
          - link "Aprenda" [ref=f1e13] [cursor=pointer]:
            - /url: /
        - generic [ref=f1e14]:
          - button "Buscar" [ref=f1e15]
          - button "Carrinho" [active] [ref=f1e20]
          - link [ref=f1e27] [cursor=pointer]:
            - /url: /login
            - button "Entrar" [ref=f1e28]
    - generic [ref=f1e30]:
      - generic [ref=f1e31]:
        - heading "Seu Carrinho" [level=2] [ref=f1e32]
        - button [ref=f1e36]
      - generic [ref=f1e41]:
        - paragraph [ref=f1e45]: Seu carrinho está vazio.
        - button "Continuar Explorando" [ref=f1e46]
    - main [ref=f1e47]:
      - generic [ref=f1e48]:
        - generic [ref=f1e49]:
          - link "Início" [ref=f1e50] [cursor=pointer]:
            - /url: /
          - text: /
          - link "Mercado" [ref=f1e51] [cursor=pointer]:
            - /url: /
        - generic [ref=f1e52]:
          - generic [ref=f1e53]:
            - generic [ref=f1e54]:
              - img "Thumb" [ref=f1e55]
              - img "Thumb" [ref=f1e56]
              - img "Thumb" [ref=f1e57]
              - img "Thumb" [ref=f1e58]
            - 'img "Emerald Ape #042" [ref=f1e60]'
          - generic [ref=f1e61]:
            - 'heading "Emerald Ape #042" [level=1] [ref=f1e62]'
            - generic [ref=f1e63]:
              - generic [ref=f1e64]: 1.19 ETH
              - generic [ref=f1e65]:
                - generic [ref=f1e66]: ★★★★★
                - generic [ref=f1e67]: 19 avaliações de colecionadores
            - generic [ref=f1e68]:
              - heading "Sobre este NFT:" [level=3] [ref=f1e69]
              - paragraph [ref=f1e70]: Um colecionável digital finalizado à mão da coleção Kurio Apes, verificado na Ethereum, com arte desbloqueável e acesso para colecionadores.
            - generic [ref=f1e71]:
              - heading "Edição:" [level=3] [ref=f1e72]
              - generic [ref=f1e73]:
                - generic [ref=f1e74] [cursor=pointer]: 1/1
                - generic [ref=f1e75] [cursor=pointer]: 1/10
                - generic [ref=f1e76] [cursor=pointer]: 1/50
                - generic [ref=f1e77] [cursor=pointer]: ABERTA
            - generic [ref=f1e78]:
              - generic [ref=f1e79]:
                - button [disabled] [ref=f1e80]
                - generic [ref=f1e82]: "1"
                - button [ref=f1e83]
              - button "Comprar" [ref=f1e85]
              - button "Favoritar" [ref=f1e86]
            - generic [ref=f1e87]:
              - generic [ref=f1e88]: "ID do token: #001"
              - generic [ref=f1e89]: "Coleção: Kurio Apes"
              - generic [ref=f1e90]: "Atributos: Óculos, Esmeralda, Raro"
              - generic [ref=f1e91]:
                - generic [ref=f1e92]: "Compartilhar este NFT:"
                - generic [ref=f1e93] [cursor=pointer]: in
                - generic [ref=f1e94] [cursor=pointer]: mail
                - generic [ref=f1e95] [cursor=pointer]: tw
        - generic [ref=f1e96]:
          - generic [ref=f1e97]:
            - generic [ref=f1e98]: Detalhes do NFT
            - generic [ref=f1e99] [cursor=pointer]: Avaliações de colecionadores (19)
          - generic [ref=f1e100]:
            - paragraph [ref=f1e101]: "Emerald Ape #042 é uma obra digital 10/10 finalizada à mão da coleção Kurio Apes.Um colecionável digital finalizado à mão da coleção Kurio Editions, verificado na Ethereum, com arte desbloqueável a acesso para colecionadores. A obra explora identidade, movimento e luz em um mundo digital sem fronteiras. A propriedade inclui arte em alta resolução, lançamentos exclusivos para colecionadores e um registro permanente da procedência registrada na rede. Nova Sato recebe 5% de direitos autorais nas vendas secundárias, apoiando novos trabalhos e lançamentos da comunidade. A obra explora identidade, movimento e luz em um mundo digital sem fronteiras."
            - paragraph [ref=f1e102]: A propriedade inclui a arte em alta resolução, lançamentos exclusivos para colecionadores e um registro permanente de procedência registrada na rede.
            - generic [ref=f1e103]:
              - strong [ref=f1e104]: "Rede:"
              - text: Cunhado na Ethereum com procedência imutável e metadados armazenados no IPFS.
            - generic [ref=f1e105]:
              - strong [ref=f1e106]: "Contrato:"
              - text: "Direitos autorais do criador: 5% nas vendas secundárias, pagos automaticamente pelos mercados compatíveis."
            - generic [ref=f1e107]:
              - strong [ref=f1e108]: "Direitos autorais:"
              - text: 0x7A42...10E8 - Contrato inteligente ERC-721 verificado.
        - generic [ref=f1e109]:
          - heading "Mais desta coleção" [level=3] [ref=f1e110]
          - generic [ref=f1e112]:
            - link [ref=f1e113] [cursor=pointer]:
              - /url: /nfts/nft-4
              - 'img "Cosmic Bloom #118" [ref=f1e115]'
              - 'heading "Cosmic Bloom #118" [level=4] [ref=f1e116]'
              - text: 1.29 ETH
            - link [ref=f1e117] [cursor=pointer]:
              - /url: /nfts/nft-5
              - 'img "Violet Nomad #314" [ref=f1e119]'
              - 'heading "Violet Nomad #314" [level=4] [ref=f1e120]'
              - text: 1.39 ETH
            - link [ref=f1e121] [cursor=pointer]:
              - /url: /nfts/nft-6
              - 'img "Ivory Baron #088" [ref=f1e123]'
              - 'heading "Ivory Baron #088" [level=4] [ref=f1e124]'
              - text: 1.79 ETH
            - link [ref=f1e125] [cursor=pointer]:
              - /url: /nfts/nft-7
              - 'img "Golden Beat #207" [ref=f1e127]'
              - 'heading "Golden Beat #207" [level=4] [ref=f1e128]'
              - text: 0.99 ETH
            - link [ref=f1e129] [cursor=pointer]:
              - /url: /nfts/nft-8
              - 'img "Golden Signal #160" [ref=f1e131]'
              - 'heading "Golden Signal #160" [level=4] [ref=f1e132]'
              - text: 0.39 ETH
    - contentinfo [ref=f1e137]:
      - generic [ref=f1e140]:
        - generic [ref=f1e141]:
          - generic [ref=f1e142]:
            - generic [ref=f1e143]: W
            - heading "Segurança da carteira" [level=4] [ref=f1e144]
            - paragraph [ref=f1e145]: Proteja sua carteira e colecione arte digital verificada com confiança.
          - generic [ref=f1e146]:
            - generic [ref=f1e147]: C
            - heading "Criadores em destaque" [level=4] [ref=f1e148]
            - paragraph [ref=f1e149]: Conheça artistas, estúdios e comunidades que moldam a cultura digital na rede.
          - generic [ref=f1e150]:
            - generic [ref=f1e151]: D
            - heading "Alertas de lançamentos" [level=4] [ref=f1e152]
            - paragraph [ref=f1e153]: Receba calendários de cunhagem, novidades de listas de acesso e análises do mercado.
        - generic [ref=f1e154]:
          - heading "Antecipe-se ao próximo lançamento" [level=4] [ref=f1e155]: Antecipe-se ao próximolançamento
          - generic [ref=f1e156]:
            - textbox "Email para newsletter" [ref=f1e157]:
              - /placeholder: digite seu e-mail...
            - button "Enviar" [ref=f1e158]
          - paragraph [ref=f1e159]: Receba lançamentos selecionados, histórias de criadores e novidades do mercado.
      - generic [ref=f1e162]:
        - generic [ref=f1e163]: KURIO
        - generic [ref=f1e164]: Feito para colecionadores, criadores e cultura
        - generic [ref=f1e165]: contato@email.com
        - generic [ref=f1e166]: +55 11 4002 8922
      - generic [ref=f1e168]:
        - generic [ref=f1e169]:
          - generic [ref=f1e170]:
            - heading "Meu perfil" [level=4] [ref=f1e171]
            - list [ref=f1e172]:
              - listitem [ref=f1e173]:
                - link "Meu perfil" [ref=f1e174] [cursor=pointer]:
                  - /url: /profile
              - listitem [ref=f1e175]:
                - link "Minha coleção" [ref=f1e176] [cursor=pointer]:
                  - /url: /
              - listitem [ref=f1e177]:
                - link "Atividade" [ref=f1e178] [cursor=pointer]:
                  - /url: /
              - listitem [ref=f1e179]:
                - link "Estúdio do criador" [ref=f1e180] [cursor=pointer]:
                  - /url: /
              - listitem [ref=f1e181]:
                - link "Lista de interesse" [ref=f1e182] [cursor=pointer]:
                  - /url: /
          - generic [ref=f1e183]:
            - heading "Central de ajuda" [level=4] [ref=f1e184]
            - list [ref=f1e185]:
              - listitem [ref=f1e186]:
                - link "Central de ajuda" [ref=f1e187] [cursor=pointer]:
                  - /url: /
              - listitem [ref=f1e188]:
                - link "Como comprar NFTs" [ref=f1e189] [cursor=pointer]:
                  - /url: /
              - listitem [ref=f1e190]:
                - link "Carteira e segurança" [ref=f1e191] [cursor=pointer]:
                  - /url: /
              - listitem [ref=f1e192]:
                - link "Política do mercado" [ref=f1e193] [cursor=pointer]:
                  - /url: /
              - listitem [ref=f1e194]:
                - link "Denunciar item" [ref=f1e195] [cursor=pointer]:
                  - /url: /
          - generic [ref=f1e196]:
            - heading "Coleções" [level=4] [ref=f1e197]
            - list [ref=f1e198]:
              - listitem [ref=f1e199]:
                - link "Arte digital" [ref=f1e200] [cursor=pointer]:
                  - /url: /
              - listitem [ref=f1e201]:
                - link "Fotografia" [ref=f1e202] [cursor=pointer]:
                  - /url: /
              - listitem [ref=f1e203]:
                - link "Música" [ref=f1e204] [cursor=pointer]:
                  - /url: /
              - listitem [ref=f1e205]:
                - link "Arte 3D" [ref=f1e206] [cursor=pointer]:
                  - /url: /
              - listitem [ref=f1e207]:
                - link "Utilidade" [ref=f1e208] [cursor=pointer]:
                  - /url: /
          - generic [ref=f1e209]:
            - heading "Redes sociais" [level=4] [ref=f1e210]
            - generic [ref=f1e211]:
              - link "Facebook" [ref=f1e212] [cursor=pointer]:
                - /url: "#"
              - link "Instagram" [ref=f1e215] [cursor=pointer]:
                - /url: "#"
              - link "Twitter" [ref=f1e219] [cursor=pointer]:
                - /url: "#"
              - link "LinkedIn" [ref=f1e222] [cursor=pointer]:
                - /url: "#"
              - link "YouTube" [ref=f1e227] [cursor=pointer]:
                - /url: "#"
            - heading "Carteiras compatíveis" [level=4] [ref=f1e231]
            - generic [ref=f1e232]:
              - generic [ref=f1e233]: METAMASK
              - generic [ref=f1e234]: WALLETCONNECT
              - generic [ref=f1e235]: COINBASE
        - generic [ref=f1e236]: © 2026 Kurio. Propriedade digital para todos.
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
  67  |     await page.getByRole('button', { name: 'Comprar agora' }).click();
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
> 94  |     await page.locator('text=Finalizar Compra').click();
      |                                                 ^ Error: locator.click: Test timeout of 30000ms exceeded.
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