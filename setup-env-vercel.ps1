# Script para configurar variáveis de ambiente no Vercel via CLI
# Execute no PowerShell no diretório do projeto

Write-Host "=== Vercel Environment Setup ===" -ForegroundColor Cyan

# PASSO 1: Instalar Vercel CLI
Write-Host "`n[1/4] Instalando Vercel CLI..." -ForegroundColor Yellow
npm install -g vercel

# PASSO 2: Login
Write-Host "`n[2/4] Faça login no Vercel..." -ForegroundColor Yellow
Write-Host "Uma janela do navegador vai abrir. Complete o login." -ForegroundColor Gray
vercel login

# PASSO 3: Conectar projeto
Write-Host "`n[3/4] Conectando projeto..." -ForegroundColor Yellow
vercel link

# PASSO 4: Puxar variáveis existentes
Write-Host "`n[4/4] Puxando arquivo .env local..." -ForegroundColor Yellow
vercel env pull

Write-Host "`n✅ Pronto! Arquivo .env.local foi criado" -ForegroundColor Green
Write-Host "`nPróximos passos:" -ForegroundColor Cyan
Write-Host "1. Abra o arquivo .env.local (criado nesse diretório)"
Write-Host "2. Atualize os valores com seus dados reais:"
Write-Host "   - DATABASE_URL"
Write-Host "   - VITE_APP_ID"
Write-Host "   - VITE_OAUTH_PORTAL_URL"
Write-Host "   - OAUTH_SERVER_URL"
Write-Host "   - OWNER_OPEN_ID"
Write-Host "   - JWT_SECRET"
Write-Host "   - ADMIN_EMAIL"
Write-Host "   - ADMIN_PASSWORD_HASH"
Write-Host "`n3. Depois, execute: vercel env push"
