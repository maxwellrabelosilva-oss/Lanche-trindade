# Backend Deployment Guide

## Current Status

O frontend da aplicação está deployado em: **https://lanche-trindade-87ld.vercel.app**

Porém, o backend (Express server com tRPC API) ainda precisa ser hospedado em um serviço externo, pois a Vercel tem limitações para rodar servidores Node.js contínuos.

## Opções de Deployment do Backend

### Opção 1: Railway (Recomendado)

**Vantagens:**
- Grátis para começar (US$ 5/mês de crédito)
- Suporta Node.js nativamente
- Muito fácil de configurar com Git
- Environment variables automáticas

**Passos:**

1. Crie uma conta em https://railway.app
2. Conecte seu GitHub
3. Crie um novo projeto e selecione este repositório
4. Configure o comando de build: `pnpm build`
5. Configure o comando de start: `pnpm start`
6. Adicione as variáveis de ambiente:
   - `DATABASE_URL`: Sua conexão MySQL
   - `VITE_APP_ID`: ID da aplicação
   - `VITE_OAUTH_PORTAL_URL`: URL do portal OAuth
   - `NODE_ENV`: `production`
7. Deploy automático no push para `main`

**URL do backend:** `https://seu-projeto.up.railway.app`

### Opção 2: Render

**Vantagens:**
- Grátis com limitações (free tier)
- Simples de usar
- Auto-deploy com GitHub

**Passos:**

1. Vá para https://render.com
2. Clique em "New +" → "Web Service"
3. Selecione este repositório
4. Configure:
   - **Build Command**: `pnpm install && pnpm build`
   - **Start Command**: `pnpm start`
   - **Runtime**: Node 20
5. Adicione environment variables
6. Deploy

### Opção 3: Heroku (Pago)

Heroku deixou de oferecer free tier, mas ainda é uma opção viável para projetos em produção.

## Configurar o Frontend para Usar Backend

Após deployar o backend, você precisa atualizar o cliente para usar a URL correta.

**Arquivo:** `client/src/main.tsx`

Altere:
```typescript
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",  // ← Mude para sua URL de backend
      // ...
    }),
  ],
});
```

Para:
```typescript
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "https://seu-projeto.up.railway.app/api/trpc",
      // ...
    }),
  ],
});
```

Ou use uma variável de ambiente para ficar dinâmico:
```typescript
const apiUrl = import.meta.env.VITE_API_URL || "/api/trpc";
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: apiUrl,
      // ...
    }),
  ],
});
```

Depois adicione em `.env.production`:
```
VITE_API_URL=https://seu-projeto.up.railway.app/api/trpc
```

## Testar a Integração

1. Faça o deploy do backend primeiro
2. Atualize a URL do cliente
3. Faça build: `pnpm build`
4. Deploy o frontend novamente em Vercel
5. Teste em https://lanche-trindade-87ld.vercel.app

## Debugging

Se a API não responder:

1. **Verifique a URL:** Acesse `https://seu-backend.com/api/trpc/menu.list`
2. **Check logs:** Veja os logs no painel do Railway/Render
3. **Verifique DB:** Confirme que `DATABASE_URL` está correto
4. **Teste localmente:** `pnpm run dev` e teste em `http://localhost:5173`

## Arquivo package.json (Start Script)

O arquivo `package.json` já tem o script correto:

```json
{
  "scripts": {
    "start": "NODE_ENV=production node dist/index.js"
  }
}
```

Isso roda o servidor Express compilado na porta 3000 por padrão.

## Próximas Etapas

1. [ ] Hospedar backend em Railway/Render
2. [ ] Atualizar URL da API no cliente
3. [ ] Redeploy do frontend
4. [ ] Testar menu carregando
5. [ ] Testar login do admin
6. [ ] Testar OAuth
