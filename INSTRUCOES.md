# Cardápio do Max - Instruções de Uso

Bem-vindo ao sistema de cardápio digital da Lanchonete do Max! Este documento explica como usar a página pública e o painel administrativo.

## 📋 Visão Geral

O sistema é composto por duas partes:

1. **Página Pública** (`/`) - Exibe o cardápio e permite que clientes façam pedidos via WhatsApp
2. **Painel Administrativo** (`/admin`) - Permite gerenciar os itens do cardápio (apenas para o dono)

## 🌐 Página Pública do Cardápio

### Acessar a Página Pública

Abra seu navegador e acesse a URL principal do site. Você verá:

- **Header** com o nome "Lanchonete do Max" e descrição
- **Seção Cardápio** com todos os itens cadastrados
- **Seção Fazer Pedido** com formulário para enviar pedidos via WhatsApp
- **Rodapé** com o número de contato: **(92) 99375-1070**

### Fazer um Pedido

1. Preencha seu **nome** no campo "Seu nome"
2. Selecione o **item desejado** no dropdown "O que você quer?"
3. (Opcional) Adicione **observações** como "sem cebola" ou "ponto da carne"
4. Informe o **endereço de entrega** (rua, número, bairro)
5. Clique no botão verde **"Enviar pelo WhatsApp"**

O sistema abrirá automaticamente uma conversa no WhatsApp com o número **(92) 99375-1070** contendo todos os detalhes do seu pedido. Você poderá enviar a mensagem para confirmar o pedido.

### Atualização Automática do Cardápio

A página pública se atualiza automaticamente a cada 3 segundos. Se o dono adicionar, editar ou remover um item no painel administrativo, você verá as mudanças aparecer na página pública em poucos segundos.

## 🔐 Painel Administrativo

### Acessar o Painel

1. Acesse a URL `/admin` do seu site
2. Você será redirecionado para fazer login com **Manus OAuth**
3. Use suas credenciais de dono para fazer login
4. Após autenticação bem-sucedida, você terá acesso ao painel

**Nota:** Apenas o dono (identificado por sua conta Manus OAuth) pode acessar o painel administrativo.

### Gerenciar Itens do Cardápio

#### Adicionar um Novo Item

1. Clique no botão laranja **"Novo Item"**
2. Preencha os campos:
   - **Emoji**: Um emoji para representar o item (ex: 🍔, 🌭, 🍟)
   - **Nome**: Nome do item (ex: X-Burgão)
   - **Descrição**: Descrição detalhada (ex: Pão brioche, blend 200g, queijo, alface, tomate)
   - **Preço**: Preço em reais (ex: 22.00)
3. Clique em **"Criar"** para adicionar o item

O novo item aparecerá imediatamente no cardápio da página pública.

#### Editar um Item Existente

1. Localize o item que deseja editar na lista
2. Clique no botão laranja **"✏️"** (ícone de edição)
3. Modifique os campos desejados
4. Clique em **"Atualizar"** para salvar as mudanças

As mudanças serão refletidas imediatamente na página pública.

#### Remover um Item

1. Localize o item que deseja remover
2. Clique no botão vermelho **"🗑️"** (ícone de lixeira)
3. Confirme a exclusão no diálogo que aparecer

O item será removido imediatamente do cardápio.

#### Cancelar Operação

Se estiver criando ou editando um item e deseja cancelar, clique no botão cinza **"Cancelar"** para voltar à lista de itens sem salvar as mudanças.

## 📱 Número de WhatsApp

O número de WhatsApp configurado para receber pedidos é:

**📞 (92) 99375-1070**

Este número aparece:
- No rodapé da página pública
- Como destino dos pedidos enviados via WhatsApp
- Nos testes do sistema

## 🔄 Sincronização em Tempo Real

A página pública se atualiza automaticamente a cada 3 segundos para refletir qualquer mudança feita no painel administrativo. Isso significa:

- Se você adicionar um item no painel, ele aparecerá na página pública em até 3 segundos
- Se você editar um item, as mudanças aparecerão na página pública em até 3 segundos
- Se você remover um item, ele desaparecerá da página pública em até 3 segundos

Você pode ter a página pública aberta em uma aba e o painel administrativo em outra para ver as mudanças acontecendo em tempo real.

## 🧪 Testes

O sistema foi testado com:

- ✅ Validação de autenticação (apenas o dono pode acessar o painel)
- ✅ Validação de CRUD (criar, editar, deletar itens)
- ✅ Validação do número de WhatsApp configurado
- ✅ Sincronização em tempo real entre painel e página pública

Todos os testes passaram com sucesso.

## 🎨 Design

A página pública mantém fielmente o design original com:

- **Fundo escuro** (#0f0e0c)
- **Paleta de cores** laranja (#f5a623) e vermelho (#e8431a)
- **Fonte Bebas Neue** para títulos
- **Fonte DM Sans** para texto
- **Design responsivo** que funciona em desktop, tablet e mobile

## ❓ Dúvidas Frequentes

**P: Como altero o número de WhatsApp?**
R: O número está configurado como variável de ambiente `VITE_WHATSAPP_NUMBER`. Você pode alterar isso através do painel de configurações do Manus.

**P: Posso ter mais de um administrador?**
R: Atualmente, apenas o dono (identificado pela conta Manus OAuth) pode acessar o painel administrativo. Isso garante segurança máxima.

**P: Os pedidos são salvos no sistema?**
R: Os pedidos são enviados diretamente via WhatsApp. Você pode manter um histórico de mensagens no WhatsApp ou usar um serviço de integração adicional se desejar um registro centralizado.

**P: Posso usar emojis especiais nos nomes dos itens?**
R: Sim! Você pode usar qualquer caractere especial nos nomes e descrições dos itens.

## 📞 Suporte

Para dúvidas ou problemas, entre em contato através do WhatsApp: **(92) 99375-1070**

---

**Versão:** 1.0.0  
**Última atualização:** Abril de 2026
