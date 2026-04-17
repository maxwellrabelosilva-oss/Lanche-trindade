# 🌐 Guia Completo: Adicionar Environment Variables via Interface Web Vercel

## 📍 PASSO 1: Acesse o Vercel Dashboard

1. Abra: **https://vercel.com/dashboard**
2. Faça login com sua conta
3. Você verá todos seus projetos

---

## 📍 PASSO 2: Selecione o Projeto

1. Procure por: **lanche-trindade** (ou clique nele)
2. Você entrará no painel do projeto

---

## 📍 PASSO 3: Vá para Settings

1. No topo do projeto, clique na aba: **Settings** (engrenagem ⚙️)
2. Do lado esquerdo, procure: **Environment Variables**
3. Clique em **Environment Variables**

---

## 📍 PASSO 4: Adicione as Variáveis (UMA POR UMA)

### **IMPORTANTE:** Siga exatamente assim para cada variável:

### **Variável 1: NODE_ENV**

```
Campo "Name":        NODE_ENV
Campo "Value":       production
Ambientes:           ✓ Production   ✓ Preview   ✓ Development
Botão:               Clique em "Save"
```

**Passo a passo:**
1. Clique no campo branco "Name" (onde diz "Add a new Secret")
2. Digite: `NODE_ENV`
3. Pressione TAB ou clique no campo "Value"
4. Digite: `production`
5. Verifique se os 3 ambientes estão marcados (com ✓):
   - [✓] Production
   - [✓] Preview
   - [✓] Development
6. Clique no botão verde: **"Save"**

---

### **Variável 2: DATABASE_URL**

```
Campo "Name":        DATABASE_URL
Campo "Value":       mysql://user:password@host:3306/cardapio
Ambientes:           ✓ Production   ✓ Preview   ✓ Development
Botão:               Clique em "Save"
```

**IMPORTANTE:** Substitua `user`, `password`, `host` pelos seus dados reais!

---

### **Variável 3: VITE_APP_ID**

```
Campo "Name":        VITE_APP_ID
Campo "Value":       seu-app-id-aqui
Ambientes:           ✓ Production   ✓ Preview   ✓ Development
Botão:               Clique em "Save"
```

---

### **Variável 4: VITE_OAUTH_PORTAL_URL**

```
Campo "Name":        VITE_OAUTH_PORTAL_URL
Campo "Value":       https://oauth.example.com
Ambientes:           ✓ Production   ✓ Preview   ✓ Development
Botão:               Clique em "Save"
```

---

### **Variável 5: OAUTH_SERVER_URL**

```
Campo "Name":        OAUTH_SERVER_URL
Campo "Value":       https://auth.example.com
Ambientes:           ✓ Production   ✓ Preview   ✓ Development
Botão:               Clique em "Save"
```

---

### **Variável 6: OWNER_OPEN_ID**

```
Campo "Name":        OWNER_OPEN_ID
Campo "Value":       seu-owner-id-aqui
Ambientes:           ✓ Production   ✓ Preview   ✓ Development
Botão:               Clique em "Save"
```

---

### **Variável 7: JWT_SECRET**

```
Campo "Name":        JWT_SECRET
Campo "Value":       gere-uma-chave-aleatoria-32-caracteres
Ambientes:           ✓ Production   ✓ Preview   ✓ Development
Botão:               Clique em "Save"
```

**💡 Dica:** Gere uma chave aleatória forte em: https://randomkeygen.com

---

### **Variável 8: ADMIN_EMAIL**

```
Campo "Name":        ADMIN_EMAIL
Campo "Value":       admin@seu-email.com
Ambientes:           ✓ Production   ✓ Preview   ✓ Development
Botão:               Clique em "Save"
```

---

### **Variável 9: ADMIN_PASSWORD_HASH**

```
Campo "Name":        ADMIN_PASSWORD_HASH
Campo "Value":       $2b$12$seu_hash_bcrypt_aqui
Ambientes:           ✓ Production   ✓ Preview   ✓ Development
Botão:               Clique em "Save"
```

---

## ✅ VERIFICAÇÃO: Após adicionar TODAS as 9 variáveis

Você deve ver uma lista assim na tela:

```
✓ NODE_ENV                    •••••••••
✓ DATABASE_URL                •••••••••
✓ VITE_APP_ID                 •••••••••
✓ VITE_OAUTH_PORTAL_URL       •••••••••
✓ OAUTH_SERVER_URL            •••••••••
✓ OWNER_OPEN_ID               •••••••••
✓ JWT_SECRET                  •••••••••
✓ ADMIN_EMAIL                 •••••••••
✓ ADMIN_PASSWORD_HASH         •••••••••
```

Se você vir os 9 itens, perfeito! ✅

---

## 🚀 PASSO 5: Force o Redeploy

Agora que adicionou as variáveis, faça o Vercel rebuildar:

### Via Interface Web:

1. Clique na aba: **Deployments**
2. Você verá uma lista com os deploys (o mais recente no topo)
3. No deployment mais recente, clique nos **3 pontos (⋯)** à direita
4. Selecione: **"Redeploy"**
5. Clique em: **"Redeploy"** (confirme)

### Aguarde o Build:

- Vercel vai começar a buildar
- Você verá uma barra de progresso
- Após 5-10 minutos, estará pronto
- Quando ficar verde: ✅ **DEPLOYMENT CONCLUÍDO**

---

## 🔍 PASSO 6: Teste o Site

1. Vá para: **https://seu-url.vercel.app**
2. A página inicial deve carregar normalmente
3. Tente fazer login (clique em "Painel Admin")
4. Se abrir a página de login, significa que está funcionando!

---

## 🎯 Resumo dos Passos

```
1. Abrir: https://vercel.com/dashboard
2. Selecionar projeto: lanche-trindade
3. Settings → Environment Variables
4. Adicionar 9 variáveis (uma por uma)
5. Cada uma: clique em "Save"
6. Ir para: Deployments
7. Clicar em ⋯ do deployment mais recente
8. Selecionar: "Redeploy"
9. Aguardar 5-10 minutos
10. Testar o site
```

---

## ❌ Se Receber Erro: "No environment variables were created"

**Solução:**

1. Recarregue a página: `F5` ou `Ctrl+R`
2. Tente novamente com a primeira variável
3. Se persistir, saia e faça login novamente no Vercel

---

## ✨ Pronto!

Após completar os 6 passos, seu site estará funcionando com as variáveis de ambiente! 🎉

**Qual é o seu domínio do Vercel?** (aparece em Deployments)
Preciso para confirmar que está funcionando!
