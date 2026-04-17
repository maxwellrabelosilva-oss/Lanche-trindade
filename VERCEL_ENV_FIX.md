# 🔧 Como Adicionar Environment Variables no Vercel - Guia Detalhado

## ❌ Se recebeu erro: "No environment variables were created"

Isso pode acontecer por:
1. Permissões insuficientes
2. Problema na interface do Vercel
3. Caracteres especiais nas variáveis
4. Sessão expirada

---

## ✅ Solução 1: Via Interface Vercel (Correto)

### Passo 1: Acesse o Projeto
```
https://vercel.com/dashboard → Selecione lanche-trindade
```

### Passo 2: Vá para Settings
```
Settings → Environment Variables
```

### Passo 3: Adicione CORRETAMENTE

**Importante:** Cada linha deve ser:
- **Nome da variável** (exatamente como escrito)
- **Valor** (sem aspas nem espaços extras)
- **Ambientes**: marcar os 3 (Production, Preview, Development)
- **Click em: Save**

### Variáveis a Adicionar (uma por uma):

```
Nome: NODE_ENV
Valor: production
```

```
Nome: VITE_APP_ID
Valor: seu-app-id-aqui
```

```
Nome: DATABASE_URL
Valor: mysql://user:password@host:3306/cardapio
```

```
Nome: JWT_SECRET
Valor: sua-chave-secreta-32-caracteres-aleatorios
```

---

## ✅ Solução 2: Via Vercel CLI (Melhor)

### Passo 1: Instale Vercel CLI
```bash
npm install -g vercel
```

### Passo 2: Faça Login
```bash
vercel login
```

### Passo 3: Configure variáveis via CLI
```bash
vercel env add DATABASE_URL
# Quando pedir, cole o valor:
# mysql://user:password@host:3306/cardapio

vercel env add VITE_APP_ID
# Quando pedir, cole o valor

vercel env add VITE_OAUTH_PORTAL_URL
# Quando pedir, cole o valor

# E assim por diante...
```

### Passo 4: Verifique
```bash
vercel env ls
```

---

## ✅ Solução 3: Via arquivo .env no GitHub

### Passo 1: Crie arquivo `.env.production.local` (NÃO COMMITAR!)
```
DATABASE_URL=mysql://user:password@host:3306/cardapio
VITE_APP_ID=seu-app-id
NODE_ENV=production
```

### Passo 2: NO VERCEL - Importe do GitHub
```
Settings → General → Environment Variables
Clique em "Import from GitHub"
```

---

## 🔍 Verificar se Variáveis Foram Criadas

### No Vercel Dashboard:
1. Vá para: **Settings** → **Environment Variables**
2. Você deve ver uma lista com as variáveis
3. Os valores aparecem como `••••••` (mascarados por segurança)

### Via CLI:
```bash
vercel env ls
```

---

## 📝 Template de Variáveis (Copie e Cole)

Use este formato exatamente:

```
NODE_ENV
production

DATABASE_URL
mysql://user:password@localhost:3306/cardapio

VITE_APP_ID
seu-app-id

VITE_OAUTH_PORTAL_URL
https://oauth.example.com

OAUTH_SERVER_URL
https://auth.example.com

OWNER_OPEN_ID
seu-owner-id

JWT_SECRET
abcdef1234567890abcdef1234567890

ADMIN_EMAIL
admin@example.com

ADMIN_PASSWORD_HASH
$2b$12$seu_hash_bcrypt_aqui
```

---

## 🆘 Se Ainda Não Funcionar

### Opção A: Limpe e tente novamente
```bash
# No terminal, dentro do projeto:
vercel env rm DATABASE_URL  # Remove a variável
vercel env add DATABASE_URL  # Adiciona novamente
```

### Opção B: Crie novo projeto no Vercel
```bash
vercel project create lanche-trindade-novo
vercel link --project lanche-trindade-novo
```

### Opção C: Contate Suporte Vercel
- URL: https://vercel.com/help
- Email: support@vercel.com
- Conte que recebeu: "No environment variables were created"

---

## 🚀 Após Adicionar as Variáveis

1. Vá para: **Deployments**
2. Clique no deployment mais recente
3. Clique em: **⋯** (três pontos)
4. Selecione: **Redeploy**

---

## ✅ Checklist Final

- [ ] DATABASE_URL adicionada ✓
- [ ] VITE_APP_ID adicionada ✓
- [ ] VITE_OAUTH_PORTAL_URL adicionada ✓
- [ ] OAUTH_SERVER_URL adicionada ✓
- [ ] OWNER_OPEN_ID adicionada ✓
- [ ] JWT_SECRET adicionada ✓
- [ ] NODE_ENV adicionada ✓
- [ ] Clicou "Save" em cada uma ✓
- [ ] Clicou "Redeploy" ✓

**Após completar todos, o site estará funcionando!** 🎉
