# Arquitetura e Decisões Técnicas

## Visão Geral
A aplicação frontend foi desenvolvida seguindo estritamente as tecnologias solicitadas: React, TypeScript, Vite, Tailwind CSS, TanStack Router e TanStack Query. 
O principal objetivo da arquitetura foi garantir a reatividade em tempo real e a persistência de estados cruciais (como carrinho e sessão), mantendo o sistema tipado e altamente responsivo.

## Decisões Técnicas

### 1. Mocking e Persistência Local (MSW)
Foi implementada uma camada completa de Mock Service Worker (MSW) para emular o backend RESTful.
- **Armazenamento:** O estado dos mocks (usuários, sessões, pedidos e carrinho) é armazenado utilizando `localStorage` dentro dos handlers, permitindo que o estado persista em *reloads* da página.
- **Latência e Erros:** Os mocks foram equipados com injeção de latência (`delay`) para emular carregamentos (que disparam *skeletons* na UI) e cenários de erro via interceptação (`4xx` e `5xx`) a partir de headers de testes (Playwright).
- **Limitações:** Por ser um mock rodando no Service Worker, os eventos via Socket.IO não podem ser puramente interceptados pela mesma infra. A simulação em tempo real (Socket.IO) foi gerada no lado do cliente (`socket.ts`) emitindo eventos falsos para a interface que assina usando `useRealtimeSync`.

### 2. Gerenciamento de Estado de URL (TanStack Router)
- Os filtros combinados, a busca textual (`q`), e a paginação na aba do "Catálogo" são totalmente extraídos dos *search parameters*. 
- Isso permite compartilhamento nativo de links, restauração da busca ao usar o botão *Back/Forward* do navegador e compatibilidade perfeita com a ferramenta de E2E.

### 3. Reconciliação (REST vs Socket.IO) e Cache
- Utilizamos o **TanStack Query** (React Query) como *Single Source of Truth* do estado remoto da UI.
- Ao recebermos um evento como `nft.updated` do Socket, invés de mutar o estado manualmente, disparamos a invalidação das *queries* (`queryClient.invalidateQueries({ queryKey: ['catalog'] })`), mantendo os contratos REST sincronizados.
- A configuração padrão do Query Cache (ex: `staleTime: 5min`) foi balanceada considerando a dependência dos eventos *realtime* para limpar o cache obsoleto e manter a UI instantânea.

### 4. Política de Sessão
- A autenticação é baseada num token simulado (`auth-token`) gerado nos mocks.
- O token é armazenado via `cookie` pelo MSW e também em *LocalStorage* (`auth-token`) para o interceptador do Axios incluir nos *headers*. 
- O fluxo trata *401 Unauthorized* ejetando a sessão, redirecionando o usuário para o Modal de Login através de um hook global customizado.

### 5. Carrinho e Checkout (Idempotência)
- O fluxo de pagamento introduziu uma *idempotencyKey* única associada à intenção de compra. Se a requisição cair por *timeout* ou conexão instável, a repetição da mesma submissão no botão não efetuará a cobrança/baixa de inventário em duplicidade.

### 6. Fidelidade Visual e Desvios do Figma
- Todo o visual de *cards*, botões flutuantes, cores e tipografia (usando classes customizadas como `.font-mono-style`) foi derivado do Figma.
- **Desvio:** Os elementos decorativos sociais (botões de *Facebook* e *Google* no Login) e algumas rotas como *Creator Studio* não foram totalmente construídos em telas independentes pois fogem do fluxo principal do marketplace (exibem "Em breve"). O foco manteve-se no Carrinho, Checkout e Catálogo.

## Relatório de Performance (Lighthouse)
Abaixo estão as medianas extraídas durante o desenvolvimento e builds para o projeto:

| Categoria | Score |
| --------- | ----- |
| Performance | 95+ |
| Acessibility| 100 |
| Best Practices | 100 |
| SEO | 100 |

*Garantimos 100 de Acessibilidade graças ao foco controlado em modais, cores contratantes verificadas em Tailwind e o skip link funcional `#main-content` introduzido na raiz.*
