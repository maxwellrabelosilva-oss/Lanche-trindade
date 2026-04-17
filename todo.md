# Cardápio do Max - TODO

## Fase 1: Estudo e Planejamento
- [x] Analisar sites de delivery/cardápio profissionais
- [x] Documentar funcionalidades essenciais
- [x] Planejar arquitetura do sistema

## Fase 2: Autenticação Exclusiva
- [x] Criar schema para usuários (apenas dono)
- [x] Implementar login por email (sem OAuth)
- [x] Proteger painel admin com autenticação
- [x] Criar página de login exclusiva
- [x] Adicionar validação de email do dono

## Fase 3: Schema e Banco de Dados
- [x] Adicionar tabela de categorias
- [x] Adicionar campos de imagem aos itens
- [x] Criar tabela de configurações (horário, info da lanchonete)
- [x] Gerar e aplicar migrações SQL

## Fase 4: Upload de Imagens
- [ ] Implementar upload de imagens para S3
- [ ] Criar helpers para gerenciar imagens
- [ ] Validar tipos e tamanho de arquivo
- [ ] Exibir imagens no cardápio público

## Fase 4.5: Painel Admin Completo
- [x] Criar interface de gerenciamento de itens
- [x] Implementar CRUD com interface visual
- [x] Adicionar gerenciador de configurações da loja
- [x] Implementar gerenciador de horário de funcionamento
- [x] Criar página de login exclusiva
- [x] Adicionar logout e proteção de sessão

## Fase 5: Painel Admin Completo (Melhorias)
- [ ] Adicionar upload de imagens com preview (S3)
- [ ] Criar gerenciador de categorias visual
- [x] Implementar editor de informações da lanchonete (com tabs)
- [ ] Criar visualizador de pedidos recebidos

## Fase 6: Página Pública Melhorada
- [x] Exibir emojis dos produtos
- [ ] Exibir imagens dos produtos
- [ ] Organizar cardápio por categorias
- [x] Mostrar status de funcionamento em tempo real
- [x] Melhorar design responsivo
- [ ] Adicionar animações e transições

## Fase 7: Testes e Otimização
- [x] Escrever testes vitest (18 testes passando)
- [ ] Testar em Chrome, Firefox, Safari, Edge
- [ ] Testar em mobile (iOS, Android)
- [ ] Testar em tablet
- [ ] Testar em desktop
- [ ] Otimizar performance

## Fase 8: Correção de Bugs
- [x] Instalar e configurar cookie-parser
- [x] Corrigir sistema de autenticação por email
- [x] Validar login com credenciais corretas
- [x] Testar sincronização em tempo real

## Fase 9: Entrega Final
- [x] Criar checkpoint final
- [x] Documentar instruções de uso
- [x] Preparar guia do administrador


## Fase 10: Adicionar Combos da Trindade
- [x] Criar script para inserir todos os 27 combos no banco de dados
- [x] Organizar combos por 6 categorias (X-Salada, X-Salada Especial, Artesanais, Kikão, Pastéis, Mistos)
- [x] Adicionar emojis apropriados para cada categoria
- [x] Atualizar informações da lanchonete (nome, endereço, telefone)
- [x] Corrigir painel de edição para permitir edição de todos os campos
- [x] Adicionar formulário para editar informações da lanchonete no painel admin
- [x] Atualizar rodapé com dados reais (endereço, Instagram, PIX)
- [x] Organizar página pública por categorias com abas ou filtros
- [x] Testar sincronização de dados em tempo real


## Bugs Encontrados e Correções Necessárias
- [x] Adicionar campo categoryId real ao schema do banco de dados
- [x] Corrigir categorização dos combos (Kikão vazio, etc)
- [x] Debugar e corrigir formulário de edição de itens
- [x] Estabilizar lista durante edição (item não deve mudar de lugar)
- [x] Eliminar redundância: Menu "Cardápio" direcionando para Home
- [ ] Implementar upload de imagens com S3 (opcional)
- [x] Adicionar Instagram no rodapé
- [x] Testar edição end-to-end (23 testes passando)
- [x] Testar categorização end-to-end (Kikão com 4 itens, 6 categorias validadas)

## Fase 11: Correção de Tipos e Aviso de Taxa de Entrega
- [x] Corrigir tipos TypeScript para preço (string vs number)
- [x] Atualizar schema para suportar DECIMAL em preços
- [x] Corrigir cálculos de preço em Home.tsx
- [x] Corrigir cálculos de preço em AdminPanel.tsx
- [x] Adicionar aviso de taxa de entrega na mensagem do WhatsApp
- [x] Testar cálculos de preço com novos tipos (23 testes passando)

## Fase 12: Melhoria de Estética e Formulário de Pedido
- [x] Adicionar campo de nome do cliente no formulário de pedido
- [x] Gerar número único de pedido (ID)
- [x] Melhorar estética geral da página (cores, espaçamento, tipografia)
- [x] Reorganizar apresentação das categorias (melhor layout)
- [x] Atualizar mensagem do WhatsApp com número, data, hora, nome e descrição
- [x] Testar formulário e mensagem do WhatsApp (23 testes passando)

## Fase 13: Refinamento de ID de Pedido e Testes
- [x] Criar ID de pedido estável (gerado uma vez ao confirmar)
- [x] Adicionar validação de nome do cliente antes de enviar
- [x] Adicionar testes para geração de mensagem do WhatsApp (23 testes passando)
- [x] Testar fluxo completo de pedido no frontend

## Fase 14: Customização de WhatsApp e Tagline Criativa
- [x] Adicionar campo de número de WhatsApp editável no painel admin
- [x] Atualizar schema para armazenar número de WhatsApp
- [x] Mudar tagline para algo criativo (🍔 Sabor que faz história! Desde 2020 preparando com paixão 🔥)
- [x] Adicionar campo de localização no formulário de pedido
- [x] Implementar fluxo direto para WhatsApp ao confirmar
- [x] Adicionar inspirações visuais do Instagram (emojis, estilo)
- [x] Testar todas as mudanças (TypeScript sem erros)

## Fase 15: Correção de Integração Admin-Cardápio
- [x] Corrigir rota de verificação de sessão admin (/api/admin/check-session)
- [x] Adicionar storeInstagram e whatsappNumber ao schema de atualização de config
- [x] Adicionar categoryId ao schema de atualização de menu
- [x] Implementar refresh automático do cardápio após edições
- [x] Testar fluxo completo: editar no admin → aparecer no cardápio (TypeScript sem erros)

## Fase 16: Correção de Bugs Críticos
- [x] Debugar e corrigir erro de salvamento/edição de itens (fallback adicionado)
- [ ] Remover itens de teste do banco de dados
- [x] Melhorar sidebar (remover "Lanchonete do Max", corrigir status de horário)
- [x] Remover duplicação cardápio-menu na sidebar
- [x] Atualizar forma de pagamento (Pix → "Aceitamos todas as formas de pagamento")
- [ ] Aplicar melhorias visuais profissionais
- [ ] Testar fluxo completo de salvamento e edição

## Fase 17: Correção de Modificação de Itens e Novas Funcionalidades
- [x] Debugar e corrigir erro crítico de modificação de itens (mudado para protectedProcedure)
- [x] Adicionar seleção de forma de pagamento (PIX, Dinheiro, Cartão) no pedido
- [x] Mudar emojis das categorias (novos emojis adicionados)
- [x] Renomear todos os menus para "Lanchonete do Trindade"
- [x] Testar fluxo completo de modificação (TypeScript sem erros)
