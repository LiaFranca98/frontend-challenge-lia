# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: debug.spec.ts >> Debug checkout flow
- Location: tests/debug.spec.ts:2:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Comprar' }).first()

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e5]:
      - link "Kurio" [ref=e6] [cursor=pointer]:
        - /url: /
      - navigation [ref=e8]:
        - link "Início" [ref=e9] [cursor=pointer]:
          - /url: /
        - link "Mercado" [ref=e10] [cursor=pointer]:
          - /url: /
        - link "Criadores" [ref=e11] [cursor=pointer]:
          - /url: /
        - link "Aprenda" [ref=e12] [cursor=pointer]:
          - /url: /
      - generic [ref=e13]:
        - button "Buscar" [ref=e14]
        - button "Carrinho" [ref=e19]
        - link [ref=e26] [cursor=pointer]:
          - /url: /login
          - button "Entrar" [ref=e27]
  - main [ref=e28]:
    - generic [ref=e29]:
      - generic [ref=e30]:
        - generic [ref=e31]:
          - generic [ref=e32]: Bem-vindo à Kurio
          - heading "Seja dono do futuro da arte digital" [level=1] [ref=e33]: Seja dono do futuroda arte digital
          - paragraph [ref=e34]: Descubra NFTs selecionados de criadores emergentes e consagrados. Colecione arte digital rara, apoie artistas e tenha uma parte da cultura da internet.
          - button "Explorar" [ref=e35]
        - img "Hero Monkey" [ref=e37]
      - generic [ref=e38]:
        - complementary [ref=e39]:
          - generic [ref=e40]:
            - generic [ref=e42]:
              - textbox "Buscar colecionáveis..." [ref=e43]
              - button "IR" [ref=e44]
            - generic [ref=e45]:
              - heading "Coleções" [level=3] [ref=e46]
              - list [ref=e47]:
                - listitem [ref=e48] [cursor=pointer]:
                  - generic [ref=e49]: Arte Digital
                  - generic [ref=e50]: (33)
                - listitem [ref=e51] [cursor=pointer]:
                  - generic [ref=e52]: Fotografia
                  - generic [ref=e53]: (12)
                - listitem [ref=e54] [cursor=pointer]:
                  - generic [ref=e55]: Música
                  - generic [ref=e56]: (55)
                - listitem [ref=e57] [cursor=pointer]:
                  - generic [ref=e58]: Arte 3D
                  - generic [ref=e59]: (39)
                - listitem [ref=e60] [cursor=pointer]:
                  - generic [ref=e61]: Colecionáveis
                  - generic [ref=e62]: (22)
                - listitem [ref=e63] [cursor=pointer]:
                  - generic [ref=e64]: Generativo
                  - generic [ref=e65]: (17)
                - listitem [ref=e66] [cursor=pointer]:
                  - generic [ref=e67]: Jogos
                  - generic [ref=e68]: (15)
                - listitem [ref=e69] [cursor=pointer]:
                  - generic [ref=e70]: Assinaturas
                  - generic [ref=e71]: (10)
                - listitem [ref=e72] [cursor=pointer]:
                  - generic [ref=e73]: Utilidade
                  - generic [ref=e74]: (16)
            - generic [ref=e75]:
              - heading "Faixa de preço" [level=3] [ref=e76]
              - generic [ref=e82]: "Preço: 0,02 - 12,30 ETH"
              - button "Aplicar" [ref=e83]
            - generic [ref=e84]:
              - heading "Rede" [level=3] [ref=e85]
              - list [ref=e86]:
                - listitem [ref=e87] [cursor=pointer]:
                  - generic [ref=e88]: Ethereum
                  - generic [ref=e89]: (119)
                - listitem [ref=e90] [cursor=pointer]:
                  - generic [ref=e91]: Polygon
                  - generic [ref=e92]: (78)
                - listitem [ref=e93] [cursor=pointer]:
                  - generic [ref=e94]: Solana
                  - generic [ref=e95]: (86)
            - button "Limpar Filtros" [ref=e97]
        - generic [ref=e98]:
          - generic [ref=e99]:
            - generic [ref=e100]:
              - generic [ref=e101]: Todos os NFTs
              - generic [ref=e102] [cursor=pointer]: Novos lançamentos
              - generic [ref=e103] [cursor=pointer]: Em alta
            - generic [ref=e104]: "Ordenar por: Listados recentemente"
          - generic [ref=e105]:
            - generic [ref=e106]:
              - link [ref=e107] [cursor=pointer]:
                - /url: /nfts/nft-8
                - 'img "Golden Signal #160" [ref=e108]'
              - 'link "Golden Signal #160 0.39 ETH" [ref=e111] [cursor=pointer]':
                - /url: /nfts/nft-8
                - 'heading "Golden Signal #160" [level=3] [ref=e112]'
                - generic [ref=e113]: 0.39 ETH
            - generic [ref=e114]:
              - link [ref=e115] [cursor=pointer]:
                - /url: /nfts/nft-7
                - 'img "Golden Beat #207" [ref=e116]'
              - 'link "Golden Beat #207 0.99 ETH" [ref=e119] [cursor=pointer]':
                - /url: /nfts/nft-7
                - 'heading "Golden Beat #207" [level=3] [ref=e120]'
                - generic [ref=e121]: 0.99 ETH
            - generic [ref=e122]:
              - link [ref=e123] [cursor=pointer]:
                - /url: /nfts/nft-6
                - 'img "Ivory Baron #088" [ref=e124]'
              - 'link "Ivory Baron #088 1.79 ETH" [ref=e127] [cursor=pointer]':
                - /url: /nfts/nft-6
                - 'heading "Ivory Baron #088" [level=3] [ref=e128]'
                - generic [ref=e129]: 1.79 ETH
            - generic [ref=e130]:
              - link [ref=e131] [cursor=pointer]:
                - /url: /nfts/nft-5
                - 'img "Violet Nomad #314" [ref=e132]'
              - 'link "Violet Nomad #314 1.39 ETH" [ref=e135] [cursor=pointer]':
                - /url: /nfts/nft-5
                - 'heading "Violet Nomad #314" [level=3] [ref=e136]'
                - generic [ref=e137]: 1.39 ETH
            - generic [ref=e138]:
              - link [ref=e139] [cursor=pointer]:
                - /url: /nfts/nft-4
                - 'img "Cosmic Bloom #118" [ref=e140]'
              - 'link "Cosmic Bloom #118 1.29 ETH" [ref=e143] [cursor=pointer]':
                - /url: /nfts/nft-4
                - 'heading "Cosmic Bloom #118" [level=3] [ref=e144]'
                - generic [ref=e145]: 1.29 ETH
            - generic [ref=e146]:
              - 'link "Neon Vessel #232 Esgotado" [ref=e147] [cursor=pointer]':
                - /url: /nfts/nft-3
                - 'img "Neon Vessel #232" [ref=e148]'
                - generic [ref=e150]: Esgotado
              - 'link "Neon Vessel #232 1.99 ETH" [ref=e153] [cursor=pointer]':
                - /url: /nfts/nft-3
                - 'heading "Neon Vessel #232" [level=3] [ref=e154]'
                - generic [ref=e155]: 1.99 ETH
            - generic [ref=e156]:
              - link [ref=e157] [cursor=pointer]:
                - /url: /nfts/nft-2
                - 'img "Sage Nomad #004" [ref=e158]'
              - 'link "Sage Nomad #004 1.69 ETH" [ref=e161] [cursor=pointer]':
                - /url: /nfts/nft-2
                - 'heading "Sage Nomad #004" [level=3] [ref=e162]'
                - generic [ref=e163]: 1.69 ETH
            - generic [ref=e164]:
              - link [ref=e165] [cursor=pointer]:
                - /url: /nfts/nft-1
                - 'img "Emerald Ape #042" [ref=e166]'
              - 'link "Emerald Ape #042 1.19 ETH" [ref=e169] [cursor=pointer]':
                - /url: /nfts/nft-1
                - 'heading "Emerald Ape #042" [level=3] [ref=e170]'
                - generic [ref=e171]: 1.19 ETH
  - contentinfo [ref=e172]:
    - generic [ref=e175]:
      - generic [ref=e176]:
        - generic [ref=e177]:
          - generic [ref=e178]: W
          - heading "Segurança da carteira" [level=4] [ref=e179]
          - paragraph [ref=e180]: Proteja sua carteira e colecione arte digital verificada com confiança.
        - generic [ref=e181]:
          - generic [ref=e182]: C
          - heading "Criadores em destaque" [level=4] [ref=e183]
          - paragraph [ref=e184]: Conheça artistas, estúdios e comunidades que moldam a cultura digital na rede.
        - generic [ref=e185]:
          - generic [ref=e186]: D
          - heading "Alertas de lançamentos" [level=4] [ref=e187]
          - paragraph [ref=e188]: Receba calendários de cunhagem, novidades de listas de acesso e análises do mercado.
      - generic [ref=e189]:
        - heading "Antecipe-se ao próximo lançamento" [level=4] [ref=e190]: Antecipe-se ao próximolançamento
        - generic [ref=e191]:
          - textbox "digite seu e-mail..." [ref=e192]
          - button "Enviar" [ref=e193]
        - paragraph [ref=e194]: Receba lançamentos selecionados, histórias de criadores e novidades do mercado.
    - generic [ref=e196]:
      - generic [ref=e197]: KURIO
      - generic [ref=e198]: Feito para colecionadores, criadores e cultura
      - generic [ref=e199]: contato@email.com
      - generic [ref=e200]: +55 11 4002 8922
    - generic [ref=e201]:
      - generic [ref=e202]:
        - generic [ref=e203]:
          - heading "Meu perfil" [level=4] [ref=e204]
          - list [ref=e205]:
            - listitem [ref=e206]:
              - link "Meu perfil" [ref=e207] [cursor=pointer]:
                - /url: /
            - listitem [ref=e208]:
              - link "Minha coleção" [ref=e209] [cursor=pointer]:
                - /url: /
            - listitem [ref=e210]:
              - link "Atividade" [ref=e211] [cursor=pointer]:
                - /url: /
            - listitem [ref=e212]:
              - link "Estúdio do criador" [ref=e213] [cursor=pointer]:
                - /url: /
            - listitem [ref=e214]:
              - link "Lista de interesse" [ref=e215] [cursor=pointer]:
                - /url: /
        - generic [ref=e216]:
          - heading "Central de ajuda" [level=4] [ref=e217]
          - list [ref=e218]:
            - listitem [ref=e219]:
              - link "Central de ajuda" [ref=e220] [cursor=pointer]:
                - /url: /
            - listitem [ref=e221]:
              - link "Como comprar NFTs" [ref=e222] [cursor=pointer]:
                - /url: /
            - listitem [ref=e223]:
              - link "Carteira e segurança" [ref=e224] [cursor=pointer]:
                - /url: /
            - listitem [ref=e225]:
              - link "Política do mercado" [ref=e226] [cursor=pointer]:
                - /url: /
            - listitem [ref=e227]:
              - link "Denunciar item" [ref=e228] [cursor=pointer]:
                - /url: /
        - generic [ref=e229]:
          - heading "Coleções" [level=4] [ref=e230]
          - list [ref=e231]:
            - listitem [ref=e232]:
              - link "Arte digital" [ref=e233] [cursor=pointer]:
                - /url: /
            - listitem [ref=e234]:
              - link "Fotografia" [ref=e235] [cursor=pointer]:
                - /url: /
            - listitem [ref=e236]:
              - link "Música" [ref=e237] [cursor=pointer]:
                - /url: /
            - listitem [ref=e238]:
              - link "Arte 3D" [ref=e239] [cursor=pointer]:
                - /url: /
            - listitem [ref=e240]:
              - link "Utilidade" [ref=e241] [cursor=pointer]:
                - /url: /
        - generic [ref=e242]:
          - heading "Redes sociais" [level=4] [ref=e243]
          - generic [ref=e244]:
            - generic [ref=e245] [cursor=pointer]
            - generic [ref=e248] [cursor=pointer]
            - generic [ref=e252] [cursor=pointer]
            - generic [ref=e255] [cursor=pointer]
            - generic [ref=e260] [cursor=pointer]
          - heading "Carteiras compatíveis" [level=4] [ref=e264]
          - generic [ref=e265]:
            - generic [ref=e266]: UNISWAP
            - generic [ref=e267]: MULTICHAIN
            - generic [ref=e268]: CARDANO
      - generic [ref=e269]: © 2026 Kurio. Propriedade digital para todos.
```

# Test source

```ts
  1 | import { test, expect } from '@playwright/test';
  2 | test('Debug checkout flow', async ({ page }) => {
  3 |   await page.goto('/');
> 4 |   await page.getByRole('button', { name: 'Comprar' }).first().click();
    |                                                               ^ Error: locator.click: Test timeout of 30000ms exceeded.
  5 |   await page.locator('header').locator('button').filter({ hasText: '1' }).click();
  6 |   await page.waitForTimeout(2000);
  7 |   await page.screenshot({ path: 'scratch/cart-debug.png' });
  8 | });
  9 | 
```