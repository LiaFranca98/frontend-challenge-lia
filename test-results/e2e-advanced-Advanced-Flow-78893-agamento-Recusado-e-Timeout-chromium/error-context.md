# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/advanced.spec.ts >> Advanced Flows >> Checkout - Pagamento Recusado e Timeout
- Location: tests/e2e/advanced.spec.ts:106:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/Erro|Timeout/i)
Expected: visible
Error: strict mode violation: getByText(/Erro|Timeout/i) resolved to 2 elements:
    1) <div class="p-4 mb-4 bg-destructive/10 text-destructive text-sm rounded">Gateway Timeout</div> aka getByText('Gateway Timeout').first()
    2) <div class="p-4 bg-destructive/10 text-destructive text-sm rounded">Gateway Timeout</div> aka getByText('Gateway Timeout').nth(1)

Call log:
  - Expect "toBeVisible" getByText(/Erro|Timeout/i) with timeout 10000ms
  - waiting for getByText(/Erro|Timeout/i)

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
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
          - button "1 Carrinho" [ref=e20]:
            - generic [ref=e26]: "1"
            - generic [ref=e27]: Carrinho
          - link "Favoritos" [ref=e28] [cursor=pointer]:
            - /url: /favorites
          - link [ref=e32] [cursor=pointer]:
            - /url: /profile
            - button "Demo" [ref=e33]
    - main [ref=e34]:
      - generic [ref=e36]:
        - generic [ref=e37]:
          - link "Início" [ref=e38] [cursor=pointer]:
            - /url: /
          - text: /
          - link "Mercado" [ref=e39] [cursor=pointer]:
            - /url: /
          - text: / Pagamento
        - generic [ref=e40]:
          - generic [ref=e41]:
            - heading "Perfil do colecionador" [level=2] [ref=e42]
            - generic [ref=e43]:
              - generic [ref=e44]:
                - generic [ref=e45]: Nome de exibição*
                - textbox [ref=e46]
              - generic [ref=e47]:
                - generic [ref=e48]: Nome de usuário*
                - textbox [ref=e49]
              - generic [ref=e50]:
                - generic [ref=e51]: Rede*
                - combobox [ref=e52]:
                  - option "Selecione uma rede" [selected]
                  - option "Ethereum"
                  - option "Polygon"
                  - option "Solana"
              - generic [ref=e53]:
                - generic [ref=e54]: Nome do perfil*
                - textbox [ref=e55]
              - generic [ref=e56]:
                - generic [ref=e57]: Endereço da carteira*
                - textbox "Endereço 0x da carteira" [ref=e58]
              - generic [ref=e59]:
                - generic [ref=e60]: ENS ou carteira secundária (opcional)
                - textbox "ENS ou carteira secundária (opcional)" [ref=e61]
              - generic [ref=e62]:
                - generic [ref=e63]: Tipo de carteira*
                - combobox [ref=e64]:
                  - option "Selecione uma carteira" [selected]
                  - option "MetaMask"
                  - option "Coinbase Wallet"
                  - option "WalletConnect"
              - generic [ref=e65]:
                - generic [ref=e66]: Código de indicação*
                - textbox [ref=e67]
              - generic [ref=e68]:
                - generic [ref=e69]: E-mail*
                - textbox [ref=e70]: demo@example.com
              - generic [ref=e71]:
                - generic [ref=e72]:
                  - generic [ref=e73]: Nome ENS *
                  - combobox [ref=e74]:
                    - option ".eth" [selected]
                - textbox [ref=e76]
            - generic [ref=e77]:
              - generic [ref=e78] [cursor=pointer]
              - generic [ref=e79]: Usar outra carteira?
            - generic [ref=e80]:
              - generic [ref=e81]: Observação do colecionador (opcional)
              - textbox [ref=e82]
          - generic [ref=e83]:
            - heading "Seus NFTs" [level=2] [ref=e84]
            - generic [ref=e85]:
              - generic [ref=e86]:
                - generic [ref=e87]: NFTs
                - generic [ref=e88]: Subtotal
              - generic [ref=e89]:
                - 'img "Emerald Ape #042" [ref=e90]'
                - generic [ref=e91]:
                  - paragraph [ref=e92]: "Emerald Ape #042"
                  - paragraph [ref=e93]: "ID do token: #0001"
                - generic [ref=e94]: (x 1)
                - generic [ref=e95]: 1.19 ETH
            - generic [ref=e96]:
              - paragraph [ref=e97]: Tem um código promocional? Aplique aqui
              - generic [ref=e98]:
                - textbox "Código promocional" [ref=e99]
                - button "Aplicar" [disabled]
            - generic [ref=e100]:
              - generic [ref=e101]:
                - generic [ref=e102]: Subtotal
                - generic [ref=e103]: 1.19 ETH
              - generic [ref=e104]:
                - generic [ref=e105]: Desconto do lançamento
                - generic [ref=e106]: (-) 0.00
              - generic [ref=e107]:
                - generic [ref=e108]: Taxa de rede
                - generic [ref=e109]: 0.016 ETH
              - paragraph [ref=e110]: Taxa estimada
              - generic [ref=e111]:
                - generic [ref=e112]: Total
                - generic [ref=e113]: 1.206 ETH
            - generic [ref=e114]:
              - heading "Carteira e rede" [level=3] [ref=e115]
              - generic [ref=e118]:
                - generic [ref=e119]: METAMASK
                - generic [ref=e120]: WALLETCONNECT
                - generic [ref=e121]: COINBASE
              - generic [ref=e122] [cursor=pointer]:
                - radio "MetaMask" [ref=e123]
                - generic [ref=e124]: MetaMask
              - generic [ref=e125] [cursor=pointer]:
                - radio "Coinbase Wallet" [ref=e126]
                - generic [ref=e127]: Coinbase Wallet
            - generic [ref=e128]: Gateway Timeout
            - button "Confirmar compra" [ref=e129]
    - contentinfo [ref=e130]:
      - generic [ref=e133]:
        - generic [ref=e134]:
          - generic [ref=e135]:
            - generic [ref=e136]: W
            - heading "Segurança da carteira" [level=4] [ref=e137]
            - paragraph [ref=e138]: Proteja sua carteira e colecione arte digital verificada com confiança.
          - generic [ref=e139]:
            - generic [ref=e140]: C
            - heading "Criadores em destaque" [level=4] [ref=e141]
            - paragraph [ref=e142]: Conheça artistas, estúdios e comunidades que moldam a cultura digital na rede.
          - generic [ref=e143]:
            - generic [ref=e144]: D
            - heading "Alertas de lançamentos" [level=4] [ref=e145]
            - paragraph [ref=e146]: Receba calendários de cunhagem, novidades de listas de acesso e análises do mercado.
        - generic [ref=e147]:
          - heading "Antecipe-se ao próximo lançamento" [level=4] [ref=e148]: Antecipe-se ao próximolançamento
          - generic [ref=e149]:
            - textbox "Email para newsletter" [ref=e150]:
              - /placeholder: digite seu e-mail...
            - button "Enviar" [ref=e151]
          - paragraph [ref=e152]: Receba lançamentos selecionados, histórias de criadores e novidades do mercado.
      - generic [ref=e155]:
        - generic [ref=e156]: KURIO
        - generic [ref=e157]: Feito para colecionadores, criadores e cultura
        - generic [ref=e158]: contato@email.com
        - generic [ref=e159]: +55 11 4002 8922
      - generic [ref=e161]:
        - generic [ref=e162]:
          - generic [ref=e163]:
            - heading "Meu perfil" [level=4] [ref=e164]
            - list [ref=e165]:
              - listitem [ref=e166]:
                - link "Meu perfil" [ref=e167] [cursor=pointer]:
                  - /url: /profile
              - listitem [ref=e168]:
                - link "Minha coleção" [ref=e169] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e170]:
                - link "Atividade" [ref=e171] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e172]:
                - link "Estúdio do criador" [ref=e173] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e174]:
                - link "Lista de interesse" [ref=e175] [cursor=pointer]:
                  - /url: /
          - generic [ref=e176]:
            - heading "Central de ajuda" [level=4] [ref=e177]
            - list [ref=e178]:
              - listitem [ref=e179]:
                - link "Central de ajuda" [ref=e180] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e181]:
                - link "Como comprar NFTs" [ref=e182] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e183]:
                - link "Carteira e segurança" [ref=e184] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e185]:
                - link "Política do mercado" [ref=e186] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e187]:
                - link "Denunciar item" [ref=e188] [cursor=pointer]:
                  - /url: /
          - generic [ref=e189]:
            - heading "Coleções" [level=4] [ref=e190]
            - list [ref=e191]:
              - listitem [ref=e192]:
                - link "Arte digital" [ref=e193] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e194]:
                - link "Fotografia" [ref=e195] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e196]:
                - link "Música" [ref=e197] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e198]:
                - link "Arte 3D" [ref=e199] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e200]:
                - link "Utilidade" [ref=e201] [cursor=pointer]:
                  - /url: /
          - generic [ref=e202]:
            - heading "Redes sociais" [level=4] [ref=e203]
            - generic [ref=e204]:
              - link "Facebook" [ref=e205] [cursor=pointer]:
                - /url: "#"
              - link "Instagram" [ref=e208] [cursor=pointer]:
                - /url: "#"
              - link "Twitter" [ref=e212] [cursor=pointer]:
                - /url: "#"
              - link "LinkedIn" [ref=e215] [cursor=pointer]:
                - /url: "#"
              - link "YouTube" [ref=e220] [cursor=pointer]:
                - /url: "#"
            - heading "Carteiras compatíveis" [level=4] [ref=e224]
            - generic [ref=e225]:
              - generic [ref=e226]: METAMASK
              - generic [ref=e227]: WALLETCONNECT
              - generic [ref=e228]: COINBASE
        - generic [ref=e229]: © 2026 Kurio. Propriedade digital para todos.
```

# Test source

```ts
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
  50  |     await page.getByText('Conectar e finalizar').click();
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
  62  |     // Fill search using the desktop sidebar input
  63  |     const searchInput = page.getByPlaceholder(/Buscar colecionáveis/i);
  64  |     await searchInput.fill('Emerald');
  65  |     
  66  |     // Submit the search form
  67  |     await page.locator('form').getByRole('button', { name: 'IR' }).click();
  68  |     
  69  |     // Wait for the query to execute and URL to update
  70  |     await page.waitForURL('**/?q=Emerald*');
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
  81  |     await page.waitForURL('**/?q=Emerald*');
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
  94  |     await page.getByText('Conectar e finalizar').click();
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
  119 |     await page.getByText('Conectar e finalizar').click();
  120 |     
  121 |     await page.getByRole('button', { name: 'Confirmar compra' }).click();
> 122 |     await expect(page.getByText(/Erro|Timeout/i)).toBeVisible({ timeout: 10000 });
      |                                                   ^ Error: expect(locator).toBeVisible() failed
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