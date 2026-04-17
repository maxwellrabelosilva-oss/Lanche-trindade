# Análise de Referências - Cardápio Digital Profissional

## Plataformas Estudadas

### 1. Cardápio Web (cardapioweb.com)
**Funcionalidades principais:**
- Cardápio digital (delivery, mesa, balcão)
- Sistema PDV dentro do WhatsApp
- Pagamento online (cartão e PIX)
- Agendamento de pedidos
- Automação de atendimento
- Gestão de estoque
- Controle de caixa
- Emissão de notas fiscais
- Programa de fidelidade
- Integração com iFood

**Design & UX:**
- Interface limpa e intuitiva
- Suporte para PC, tablet e mobile
- Formulário de cadastro simples
- Navegação clara com abas (Automação, Vendas, Gestão)

### 2. Hubt (hubt.com.br)
**Funcionalidades principais:**
- Cardápio digital gratuito
- Múltiplas fotos por produto
- QR Code para cardápio na mesa
- Cálculo automático de taxa de entrega
- Impressão automática de pedidos
- Integração com WhatsApp
- Ofertas e cupons
- Pedidos no balcão e por telefone
- Domínio personalizado

**Design & UX:**
- Interface muito intuitiva
- Adicionar produtos é simples (como postar nas redes sociais)
- Excelente responsividade
- Categorias de produtos bem organizadas
- Imagens em destaque

## Funcionalidades Essenciais Identificadas

### Para Página Pública:
1. ✅ Cardápio com categorias
2. ✅ Imagens dos produtos
3. ✅ Descrição e preço
4. ✅ Status de funcionamento (aberto/fechado)
5. ✅ Horário de funcionamento
6. ✅ Formulário de pedidos
7. ✅ Integração WhatsApp
8. ✅ Responsividade (PC, tablet, mobile)

### Para Painel Administrativo:
1. ✅ Login exclusivo por email (apenas dono)
2. ✅ CRUD de itens do cardápio
3. ✅ Upload de imagens
4. ✅ Gerenciamento de categorias
5. ✅ Configuração de horário de funcionamento
6. ✅ Edição de informações da lanchonete
7. ✅ Visualização de pedidos
8. ✅ Gerenciamento de promoções/ofertas (futuro)

## Padrões de Design Recomendados

### Cores & Tipografia:
- Manter paleta laranja/vermelho (já estabelecida)
- Fonte Bebas Neue para títulos
- Fonte sans-serif para corpo do texto

### Layout:
- Header com logo e menu
- Sidebar para navegação (mobile-friendly)
- Cards para produtos com imagem em destaque
- Footer com contato e informações

### Componentes:
- Botões com estados (hover, active, disabled)
- Modais para confirmação de ações
- Toasts para feedback de ações
- Skeleton loaders durante carregamento
- Paginação ou scroll infinito

## Tecnologias & Padrões

### Frontend:
- React 19 com Tailwind CSS 4
- Componentes reutilizáveis
- Responsividade mobile-first

### Backend:
- tRPC para comunicação
- Autenticação por email (não OAuth)
- Upload de imagens para S3
- Banco de dados MySQL

### Compatibilidade:
- Chrome, Firefox, Safari, Edge
- iOS Safari, Android Chrome
- Tablets (iPad, Android tablets)
- Desktops (Windows, Mac, Linux)

## Próximos Passos

1. Implementar autenticação exclusiva por email
2. Criar schema para categorias e imagens
3. Implementar upload de imagens com S3
4. Criar painel admin completo
5. Adicionar gerenciamento de horário
6. Otimizar para todos os dispositivos
7. Testar em múltiplos navegadores
