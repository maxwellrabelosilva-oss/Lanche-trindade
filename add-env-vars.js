#!/usr/bin/env node

/**
 * Script para adicionar Environment Variables no Vercel via API
 * 
 * Uso:
 * 1. Obtenha seu VERCEL_TOKEN em: https://vercel.com/account/tokens
 * 2. Execute: VERCEL_TOKEN=seu_token node add-env-vars.js
 */

const https = require('https');

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const PROJECT_ID = process.env.VERCEL_PROJECT_ID || 'lanche-trindade';
const TEAM_ID = process.env.VERCEL_TEAM_ID;

if (!VERCEL_TOKEN) {
  console.error('❌ VERCEL_TOKEN não configurada!');
  console.log('\n📝 Como obter seu token:');
  console.log('1. Vá para: https://vercel.com/account/tokens');
  console.log('2. Crie um novo token');
  console.log('3. Execute: VERCEL_TOKEN=seu_token node add-env-vars.js\n');
  process.exit(1);
}

const environmentVariables = [
  {
    key: 'NODE_ENV',
    value: 'production',
    target: ['production', 'preview', 'development']
  },
  {
    key: 'VITE_APP_ID',
    value: process.env.VITE_APP_ID || 'seu-app-id-aqui',
    target: ['production', 'preview', 'development']
  },
  {
    key: 'DATABASE_URL',
    value: process.env.DATABASE_URL || 'mysql://user:password@host:3306/cardapio',
    target: ['production', 'preview', 'development']
  },
  {
    key: 'VITE_OAUTH_PORTAL_URL',
    value: process.env.VITE_OAUTH_PORTAL_URL || 'https://oauth.example.com',
    target: ['production', 'preview', 'development']
  },
  {
    key: 'OAUTH_SERVER_URL',
    value: process.env.OAUTH_SERVER_URL || 'https://auth.example.com',
    target: ['production', 'preview', 'development']
  },
  {
    key: 'OWNER_OPEN_ID',
    value: process.env.OWNER_OPEN_ID || 'seu-owner-id',
    target: ['production', 'preview', 'development']
  },
  {
    key: 'JWT_SECRET',
    value: process.env.JWT_SECRET || 'gere-uma-chave-aleatoria-aqui',
    target: ['production', 'preview', 'development']
  },
  {
    key: 'ADMIN_EMAIL',
    value: process.env.ADMIN_EMAIL || 'admin@example.com',
    target: ['production', 'preview', 'development']
  },
  {
    key: 'ADMIN_PASSWORD_HASH',
    value: process.env.ADMIN_PASSWORD_HASH || '$2b$12$seu_hash_aqui',
    target: ['production', 'preview', 'development']
  }
];

async function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.vercel.com',
      path: path,
      method: method,
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          if (res.statusCode >= 400) {
            reject(new Error(`API Error: ${res.statusCode} - ${json.error?.message || body}`));
          } else {
            resolve(json);
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function addEnvironmentVariable(variable) {
  const path = TEAM_ID 
    ? `/v10/projects/${PROJECT_ID}/env?teamId=${TEAM_ID}`
    : `/v9/projects/${PROJECT_ID}/env`;

  try {
    await makeRequest('POST', path, variable);
    console.log(`✅ ${variable.key} adicionada com sucesso`);
  } catch (error) {
    console.error(`❌ Erro ao adicionar ${variable.key}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Adicionando Environment Variables no Vercel...\n');
  
  for (const variable of environmentVariables) {
    await addEnvironmentVariable(variable);
  }

  console.log('\n✨ Processo completado!');
  console.log('\n📋 Próximos passos:');
  console.log('1. Vá para: https://vercel.com/dashboard');
  console.log('2. Selecione: lanche-trindade');
  console.log('3. Vá para: Deployments');
  console.log('4. Clique no ⋯ do ultimo deployment');
  console.log('5. Selecione: Redeploy\n');
}

main().catch(error => {
  console.error('❌ Erro:', error.message);
  process.exit(1);
});
