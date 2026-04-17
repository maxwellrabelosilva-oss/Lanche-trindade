# ✅ Vercel Configuration Checklist

Este arquivo lista tudo que você DEVE configurar no Vercel para o site funcionar.

## 🔴 CRÍTICO - Configure AGORA no Vercel

### 1. Vá para: https://vercel.com/dashboard

### 2. Selecione o projeto: `lanche-trindade`

### 3. Clique em: **Settings** → **Environment Variables**

### 4. Adicione EXATAMENTE estas variáveis:

| Variável | Valor | Tipo |
|----------|-------|------|
| `DATABASE_URL` | `mysql://user:password@host:3306/cardapio` | Production, Preview, Development |
| `VITE_APP_ID` | seu-app-id-aqui | Production, Preview, Development |
| `VITE_OAUTH_PORTAL_URL` | https://oauth.example.com | Production, Preview, Development |
| `OAUTH_SERVER_URL` | https://auth.example.com | Production, Preview, Development |
| `OWNER_OPEN_ID` | seu-owner-id | Production, Preview, Development |
| `JWT_SECRET` | chave-aleatória-32-chars+ | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |
| `ADMIN_EMAIL` | admin@email.com | Production, Preview, Development |
| `ADMIN_PASSWORD_HASH` | hash-bcrypt-aqui | Production, Preview, Development |

## 📋 Passo-a-Passo

1. **Clique no campo de Variável**
   - Digite o nome exatamente como na tabela
   - Cole o valor

2. **Selecione os ambientes**
   - ✅ Production
   - ✅ Preview
   - ✅ Development

3. **Clique em "Save"**

4. **Repita para cada variável**

## ✨ Após adicionar TODAS as variáveis

1. Vá para: **Deployments**
2. Clique nos 3 pontos (⋯) no último deployment
3. Selecione: **Redeploy**
4. Aguarde o build completar

## 🔍 Como Verificar se Funcionou

### No Vercel Dashboard:
- Aba **Deployments**
- Clique no deployment mais recente
- Verifique se há erros em **Logs**

### No Site:
- Acesse: https://seu-url.vercel.app
- Tente fazer login
- Tente acessar o painel admin

## 🚨 Erros Comuns

### "Environment variable not defined"
→ Falta adicionar a variável no Vercel

### "Database connection failed"
→ `DATABASE_URL` está incorreta ou MySQL está indisponível

### "Invalid URL"
→ `VITE_OAUTH_PORTAL_URL` ou `VITE_APP_ID` inválido

### "Build failed"
→ Verifique os Logs do deployment

## 📞 Próximas Ações

Após configurar as variáveis:
1. [ ] Adicione DATABASE_URL
2. [ ] Adicione VITE_APP_ID
3. [ ] Adicione VITE_OAUTH_PORTAL_URL
4. [ ] Adicione OAUTH_SERVER_URL
5. [ ] Adicione OWNER_OPEN_ID
6. [ ] Adicione JWT_SECRET
7. [ ] Adicione ADMIN_EMAIL
8. [ ] Adicione ADMIN_PASSWORD_HASH
9. [ ] Clique em Redeploy
10. [ ] Teste o site

**Após completar TODOS os passos, o site estará funcionando!** ✅
