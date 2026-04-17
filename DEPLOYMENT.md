# 🚀 Guia de Deployment - Cardápio Max

Este guia fornece instruções passo-a-passo para fazer deploy do Cardápio Max no Vercel com produção.

## ✅ Pre-Deployment Checklist

- [ ] Todas as variáveis de ambiente configuradas
- [ ] Banco de dados MySQL criado
- [ ] Migrações rodadas (`pnpm run db:push`)
- [ ] Build local testado (`pnpm run build`)
- [ ] Sem erros no console do desenvolvedor
- [ ] Repositório Git sincronizado

## 📋 Variáveis de Ambiente Obrigatórias

### Autenticação & OAuth
```
VITE_OAUTH_PORTAL_URL      # URL do portal OAuth
VITE_APP_ID                 # ID da aplicação
OAUTH_SERVER_URL            # URL do servidor OAuth
OWNER_OPEN_ID               # OpenID do proprietário
```

### Banco de Dados
```
DATABASE_URL                # mysql://user:pass@host:3306/db
```

### Segurança
```
JWT_SECRET                  # Chave secreta JWT (mínimo 32 caracteres aleatórios)
```

### Admin
```
ADMIN_EMAIL                 # Email do administrador
ADMIN_PASSWORD_HASH         # Hash da senha (bcrypt)
```

### Integração (Opcional)
```
BUILT_IN_FORGE_API_URL     # URL da Forge API (opcional)
BUILT_IN_FORGE_API_KEY     # Chave da Forge API (opcional)
```

## 🔧 Configuração no Vercel

### Passo 1: Conectar GitHub

1. Vá para [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Selecione "Import Git Repository"
4. Conecte sua conta GitHub
5. Selecione o repositório `Lanche-trindade`

### Passo 2: Configurar Projeto

**Build Settings:**
- Framework Preset: `Other`
- Build Command: `pnpm build`
- Output Directory: `dist`
- Install Command: `pnpm install --legacy-peer-deps`

**Environment Variables:**

1. Clique em "Environment Variables"
2. Adicione todas as variáveis do arquivo `.env.example`
3. Defina para ambiente `Production`

Exemplo:
```
VITE_OAUTH_PORTAL_URL = https://oauth.example.com
VITE_APP_ID = seu-app-id
OAUTH_SERVER_URL = https://auth.example.com
OWNER_OPEN_ID = owner-123456
DATABASE_URL = mysql://user:password@host.mysql.database.azure.com:3306/cardapio
JWT_SECRET = sua-chave-secreta-aleatoria-32-caracteres-ou-mais
ADMIN_EMAIL = admin@lanchonete.com
ADMIN_PASSWORD_HASH = $2b$12$seu-hash-bcrypt-aqui
```

### Passo 3: Deploy

1. Clique em "Deploy"
2. Aguarde o build completar
3. Vercel atribuirá um URL automático
4. Acesse a URL para testar

## 🗄️ Configuração do Banco de Dados

### Opção 1: Azure MySQL (Recomendado)

1. Crie um servidor MySQL no Azure
2. Crie um banco de dados chamado `cardapio`
3. Defina a `DATABASE_URL`:

```
DATABASE_URL=mysql://user:password@server.mysql.database.azure.com:3306/cardapio
```

### Opção 2: Local MySQL

1. Instale MySQL Server
2. Crie o banco: `CREATE DATABASE cardapio;`
3. Execute as migrações:

```bash
DATABASE_URL=mysql://user:password@localhost:3306/cardapio pnpm run db:push
```

## 🔑 Gerando Hashes Seguros

### JWT_SECRET (Node.js)
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Senha Admin (bcrypt)
Use uma ferramenta online ou:
```bash
npm install -g bcryptjs-cli
bcryptjs hash "sua-senha-super-segura"
```

## 🧪 Testando o Deploy

Após o deploy, teste:

1. **Acesso Público**
   - [ ] Página inicial carrega
   - [ ] Cardápio exibe itens
   - [ ] Link WhatsApp funciona

2. **Autenticação**
   - [ ] Login OAuth funciona
   - [ ] Redirecionamento correto
   - [ ] Sessão persiste

3. **Admin Panel**
   - [ ] Acesso ao painel admin
   - [ ] Criar novo item
   - [ ] Editar item existente
   - [ ] Deletar item
   - [ ] Atualizar configurações
   - [ ] Horários se atualizam

## 🔄 Atualizações Contínuas

### Deploy Automático (CI/CD)

Vercel faz deploy automático quando você faz push:

```bash
git add .
git commit -m "Melhoria do cardápio"
git push origin main
```

O Vercel:
1. Detecta novo push
2. Executa build automático
3. Faz testes (se configurado)
4. Deploy para produção
5. Atualiza URL em tempo real

### Rollback se Necessário

1. Vá para Vercel Dashboard
2. Projeto → Deployments
3. Selecione deployment anterior
4. Clique "Promote to Production"

## 📊 Monitoramento

### Logs do Vercel

1. Dashboard → Project
2. Clique em "Deployments"
3. Selecione deployment
4. Aba "Logs" mostra erros e output

### Console do Servidor

No navegador, abra DevTools (F12):
- Aba "Console" mostra erros frontend
- Aba "Network" mostra requisições API

## 🆘 Troubleshooting

### "No Output Directory named dist found"
**Solução:** Verifique `vite.config.ts`:
```typescript
build: {
  outDir: path.resolve(import.meta.dirname, "dist"),
  emptyOutDir: true,
}
```

### "Environment variable not defined"
**Solução:** Adicione variável em Project Settings → Environment Variables

### "Database connection failed"
**Solução:** 
- Verifique `DATABASE_URL`
- Teste conexão localmente
- Verifique firewall/whitelist de IP

### "OAuth callback error"
**Solução:**
- Verifique `VITE_OAUTH_PORTAL_URL`
- Confirme redirect URI: `{vercel-url}/api/oauth/callback`
- Verifique `VITE_APP_ID` está correto

## 📈 Performance Tips

1. **Otimize Imagens**: Comprima imagens do menu
2. **Cache**: React Query já faz caching automático
3. **Database**: Crie índices nas colunas frequentes
4. **CDN**: Vercel usa Edge Network globalmente

## 🔒 Segurança

- [ ] `JWT_SECRET` é aleatório e forte (32+ caracteres)
- [ ] Variáveis sensíveis não estão no git
- [ ] HTTPS ativado (Vercel padrão)
- [ ] CORS configurado corretamente
- [ ] SQL Injection prevenido (ORM)
- [ ] XSS prevenido (React sanitiza)

## 📞 Suporte

Em caso de problemas:
1. Verifique logs do Vercel
2. Teste localmente com mesmo `.env`
3. Crie issue no GitHub com logs
4. Contate suporte Vercel se infraestrutura

---

**🎉 Deploy bem-sucedido! Seu cardápio está ao vivo!**
