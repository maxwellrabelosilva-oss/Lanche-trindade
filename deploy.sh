#!/bin/bash

# 🚀 Script para fazer deploy no Vercel com configuração completa

set -e

echo "🔍 Verificando ambiente..."

# Verificar se todas as variáveis críticas estão presentes
check_var() {
  if [ -z "${!1}" ]; then
    echo "❌ Variável $1 não configurada!"
    exit 1
  fi
}

# Se estiver em produção, verificar variáveis
if [ "$NODE_ENV" = "production" ]; then
  check_var "DATABASE_URL"
  check_var "VITE_APP_ID"
  check_var "VITE_OAUTH_PORTAL_URL"
fi

echo "📦 Instalando dependências..."
pnpm install --legacy-peer-deps

echo "🏗️ Fazendo build..."
pnpm run build

echo "✅ Build completado com sucesso!"

if [ "$NODE_ENV" = "production" ]; then
  echo "🚀 Iniciando aplicação em produção..."
  pnpm run start
fi
