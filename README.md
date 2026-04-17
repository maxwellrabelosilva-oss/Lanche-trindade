# 🍔 Cardápio Max - Lanchonete do Trindade

Sistema completo de cardápio digital para lanchonete com painel administrativo, gerenciamento de menu, configurações da loja e integração com WhatsApp.

## 🚀 Features

- ✨ **Cardápio Digital Responsivo** - Interface moderna e intuitiva
- 👨‍💼 **Painel Admin Completo** - Gerenciar menu e configurações em tempo real
- 🔐 **Autenticação Segura** - Integração OAuth com Manus
- 📱 **WhatsApp Integration** - Link direto para contato
- ⏰ **Horários de Funcionamento** - Controle de horários de abertura/fechamento
- 📦 **Banco de Dados MySQL** - Persistência completa dos dados
- 🎨 **Design Moderno** - Tailwind CSS com tema personalizável
- 🔄 **Real-time Updates** - Sincronização automática com React Query

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **tRPC** - Type-safe API
- **React Query** - Data Fetching
- **Wouter** - Lightweight Router

### Backend
- **Express.js** - Web Server
- **tRPC** - RPC Framework
- **Drizzle ORM** - Database
- **MySQL** - Database
- **Node.js 20** - Runtime

### Deployment
- **Vercel** - Hosting Platform

## 📋 Prerequisites

- Node.js 20.x+
- pnpm (or npm)
- MySQL 8.0+
- Git

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/maxwellrabelosilva-oss/Lanche-trindade.git
cd cardapio-max
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Environment Configuration
Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required variables:
```env
# Database
DATABASE_URL=mysql://user:password@localhost:3306/cardapio

# OAuth/Authentication
VITE_OAUTH_PORTAL_URL=https://your-oauth-portal.com
VITE_APP_ID=your-app-id
OAUTH_SERVER_URL=https://your-oauth-server.com
OWNER_OPEN_ID=your-owner-id

# Security
JWT_SECRET=your-secret-key

# Admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD_HASH=hashed-password
```

### 4. Database Setup
```bash
pnpm run db:push
```

### 5. Development Server
```bash
pnpm run dev
```

Access at: `http://localhost:5173`

## 📚 Project Structure

```
cardapio-max/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   ├── hooks/         # Custom hooks
│   │   └── lib/           # Utilities
│   └── index.html
├── server/                # Express Backend
│   ├── routers.ts        # tRPC routes
│   ├── db.ts             # Database functions
│   └── _core/            # Core utilities
├── drizzle/              # Database schema
│   └── schema.ts
└── vercel.json           # Deployment config
```

## 🎯 Main Features

### 1. Menu Management
- Create, read, update, delete menu items
- Support for emojis, descriptions, prices
- Categorize items

### 2. Store Configuration
- Manage store name, description
- Contact information (phone, email, Instagram)
- WhatsApp number
- Operating hours (opening/closing times)
- Delivery fees

### 3. Admin Dashboard
- Two-tab interface:
  - **Menu Tab**: Add/edit/delete items
  - **Config Tab**: Update store settings
- Real-time updates
- Toast notifications for feedback

### 4. Authentication
- OAuth-based login
- Role-based access (admin/user)
- Secure session management

## 🔧 Development Commands

```bash
# Development
pnpm run dev          # Start dev server

# Build
pnpm run build        # Build for production

# Testing
pnpm run test         # Run tests
pnpm run test:watch   # Watch mode

# Database
pnpm run db:push      # Apply migrations
pnpm run db:studio    # Open Drizzle Studio

# Code Quality
pnpm run check        # TypeScript check
pnpm run format       # Format code
```

## 📱 API Endpoints

### Public Routes
- `GET /api/menu/list` - Get all menu items
- `GET /` - Home page

### Protected Routes (Admin)
- `POST /api/menu/create` - Create menu item
- `PUT /api/menu/update` - Update menu item
- `DELETE /api/menu/delete` - Delete menu item
- `GET /api/config/get` - Get store config
- `PUT /api/config/update` - Update store config

## 🔐 Security

- OAuth 2.0 authentication
- JWT session tokens
- Protected tRPC procedures with role-based access
- CORS configured
- Environment variables for sensitive data
- Password hashing for admin

## 📊 Database Schema

### Users
- `id`, `openId`, `name`, `email`, `role`, `createdAt`, `updatedAt`

### Menu Items
- `id`, `emoji`, `name`, `description`, `price`, `categoryId`, `createdAt`, `updatedAt`

### Menu Categories
- `id`, `name`, `description`, `order`, `createdAt`, `updatedAt`

### Store Config
- `id`, `storeName`, `storeDescription`, `storePhone`, `storeEmail`, `storeAddress`, `storeInstagram`, `whatsappNumber`, `openingTime`, `closingTime`, `isOpen`, `deliveryFee`

## 🌐 Deployment to Vercel

### 1. Push to GitHub
```bash
git add .
git commit -m "Deploy to Vercel"
git push origin main
```

### 2. Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import GitHub repository
3. Configure environment variables
4. Deploy!

### 3. Environment Variables on Vercel
Set all variables from `.env.example` in Vercel project settings.

## 📝 Environment Variables

See `.env.example` for complete list of required variables.

## 🐛 Troubleshooting

### Database Connection Failed
- Check `DATABASE_URL` is correct
- Ensure MySQL server is running
- Verify credentials

### OAuth Login Not Working
- Check `VITE_OAUTH_PORTAL_URL` and `VITE_APP_ID`
- Ensure redirect URI matches: `{origin}/api/oauth/callback`

### Deploy Error "No Output Directory"
- Verify `vercel.json` configuration
- Check `vite.config.ts` build settings
- Ensure build completes successfully locally

## 📞 Support

For issues or questions:
- Check existing GitHub issues
- Create a new issue with details
- Include error logs and reproduction steps

## 📄 License

MIT License - See LICENSE file for details

## 👨‍💻 Contributors

- Maxwell Rabelo Silva ([@maxwellrabelosilva-oss](https://github.com/maxwellrabelosilva-oss))

## 🙏 Acknowledgments

- Built with Manus WebDev Templates
- Powered by Vercel
- UI components from shadcn/ui

---

**Made with ❤️ for Lanchonete do Trindade**
