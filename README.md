# NYVO
**Professional Design Editor & Creative Platform**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://typescriptlang.org/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.0-FF4154?style=for-the-badge&logo=react-query)](https://tanstack.com/query)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Fabric.js](https://img.shields.io/badge/Fabric.js-Canvas-orange?style=for-the-badge)](http://fabricjs.com/)

> A powerful, feature-rich design editor built with modern web technologies. Create stunning graphics, edit images, and design with AI-powered tools.

## 🚀 Features

### Core Design Tools
- **Canvas Editor**: Advanced HTML5 canvas-based editor powered by Fabric.js
- **Shape Tools**: Create and manipulate rectangles, circles, triangles, and custom shapes
- **Text Editing**: Rich text editor with custom fonts, sizing, and formatting
- **Image Manipulation**: Upload, resize, crop, and apply filters to images
- **Drawing Tools**: Freehand drawing with customizable brush settings
- **Layer Management**: Full layer control with reordering and grouping

### AI-Powered Features
- **AI Image Generation**: Create images from text prompts using Google Gemini AI
- **Background Removal**: Intelligent background removal powered by Remove.bg API
- **Smart Templates**: AI-suggested design templates

### Advanced Editing
- **Color Management**: Advanced color picker with fill and stroke controls
- **Opacity Control**: Precise opacity adjustments for all elements
- **Filter System**: Professional image filters and effects
- **History/Undo**: Full undo/redo functionality with state management
- **Keyboard Shortcuts**: Professional hotkey support for efficient workflow

### Data Management & Performance
- **Intelligent Caching**: TanStack Query automatically caches API responses
- **Background Synchronization**: Automatic data revalidation and updates
- **Optimistic Updates**: Instant UI updates with automatic rollback on errors
- **Offline Support**: Cached data available when offline
- **Request Deduplication**: Prevents duplicate API calls
- **Infinite Queries**: Efficient pagination for large datasets

### Project Management
- **Project Persistence**: Save and load projects with full state preservation
- **Template Library**: Pre-built templates for quick design starts
- **Duplicate Projects**: Clone existing projects for rapid iteration
- **Export Options**: Multiple export formats and quality settings

### User Experience
- **Authentication**: Secure sign-up/sign-in with NextAuth.js
- **Subscription Management**: Stripe-powered premium features
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Real-time Collaboration**: Multi-user editing capabilities

## 🏗️ Architecture

### Frontend Architecture
```
src/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication pages
│   ├── (dashboard)/         # Main dashboard
│   ├── editor/[projectId]/  # Editor interface
│   └── api/                 # API routes
├── features/                # Feature-based organization
│   ├── auth/               # Authentication logic
│   ├── editor/             # Canvas editor functionality
│   ├── projects/           # Project management
│   ├── subscriptions/      # Payment & subscriptions
│   ├── ai/                # AI integrations
│   └── images/            # Image handling
├── components/             # Reusable UI components
├── lib/                   # Third-party integrations
└── hooks/                # Custom React hooks
```

### Key Components
- **Editor Engine**: Custom Fabric.js wrapper with React integration
- **State Management**: Zustand for client-side state + TanStack Query for server state
- **Data Layer**: TanStack Query for intelligent caching, background updates, and optimistic UI
- **Database Layer**: Drizzle ORM with type-safe queries
- **API Layer**: Hono.js for fast, lightweight API routes
- **Authentication**: NextAuth.js with multiple providers
- **File Storage**: UploadThing for secure file uploads

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript 5.0+
- **Styling**: Tailwind CSS + shadcn/ui components
- **Canvas**: Fabric.js for advanced graphics manipulation
- **State Management**: Zustand + TanStack Query for server state
- **Data Fetching**: TanStack Query (React Query) for caching & synchronization
- **UI Components**: Radix UI primitives via shadcn/ui

### Backend
- **API Framework**: Hono.js
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: NextAuth.js
- **File Uploads**: UploadThing
- **Payment Processing**: Stripe

### External Services
- **AI Image Generation**: Google Gemini API
- **Background Removal**: Remove.bg API
- **Stock Images**: Unsplash API
- **Email**: Resend API

### Development Tools
- **Package Manager**: npm/yarn
- **Linting**: ESLint with Next.js config
- **Type Checking**: TypeScript strict mode
- **Database Migrations**: Drizzle Kit

## 📋 Prerequisites

- Node.js 18.0 or later
- PostgreSQL database
- npm or yarn package manager

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/ismail-gits/nyvo.git
cd nyvo
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/nyvo"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

# OAuth Providers (add as needed)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# AI Services
GEMINI_API_KEY="your-gemini-api-key"
REMOVEBG_API_KEY="your-removebg-api-key"

# Stripe
STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"

# UploadThing
UPLOADTHING_SECRET="your-uploadthing-secret"
UPLOADTHING_APP_ID="your-uploadthing-app-id"

# Unsplash
UNSPLASH_ACCESS_KEY="your-unsplash-access-key"
```

### 4. Database Setup
```bash
# Generate and run migrations
npm run db:generate
npm run db:migrate

# Optional: Seed the database
npm run db:seed
```

### 5. Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

### Core Directories

#### `/src/app`
Next.js 14 App Router structure with route groups for organization:
- `(auth)`: Authentication-related pages
- `(dashboard)`: Main application dashboard
- `api`: Server-side API routes with Hono.js integration

#### `/src/features`
Feature-based architecture following domain-driven design:
- Each feature contains its own components, hooks, API calls, and utilities
- **TanStack Query Integration**: Custom hooks for data fetching, caching, and mutations
- API hooks pattern: `use-get-*`, `use-create-*`, `use-update-*`, `use-delete-*`
- Promotes code reusability and maintainable architecture

#### `/src/components`
Reusable UI components built with shadcn/ui and Radix UI primitives:
- `query-provider.tsx`: TanStack Query client configuration and provider
- `providers.tsx`: Combined providers for authentication, theme, and data fetching

#### `/src/lib`
Third-party service integrations and utility functions

## 🎨 Editor Features Deep Dive

### Canvas Engine
Built on Fabric.js, providing:
- Object manipulation (move, resize, rotate)
- Layer management with z-index control
- Group selection and operations
- Precision alignment tools
- Snap-to-grid functionality

### Tool Palette
- **Selection Tool**: Multi-select, group operations
- **Shape Tools**: Rectangle, circle, triangle, polygon
- **Text Tool**: Rich text with font customization
- **Draw Tool**: Freehand drawing with brush controls
- **Image Tool**: Upload, resize, crop, filters
- **AI Tools**: Generate images, remove backgrounds

### Sidebar Panels
- **Properties**: Object-specific controls
- **Layers**: Visual layer management
- **Templates**: Pre-built design templates
- **Images**: Stock photo integration via Unsplash
- **AI**: AI-powered generation tools

## 🔧 API Endpoints & Data Fetching

### TanStack Query Data Flow

```mermaid
flowchart LR
    subgraph "Client Side"
        Component[React Component]
        Hook[Custom Hook]
        Cache[Query Cache]
        Optimistic[Optimistic Updates]
    end
    
    subgraph "Network Layer"
        HTTP[HTTP Request]
        Background[Background Refetch]
        Retry[Retry Logic]
    end
    
    subgraph "Server Side"
        API[API Endpoint]
        DB[(Database)]
    end
    
    Component --> Hook
    Hook --> Cache
    
    Cache -->|Cache Miss| HTTP
    Cache -->|Cache Hit| Component
    
    HTTP --> API
    API --> DB
    
    Hook --> Optimistic
    Optimistic --> Component
    
    Background --> HTTP
    Retry --> HTTP
    
    DB --> API
    API --> Cache
    Cache --> Component
```

### TanStack Query Integration
All API calls are wrapped with TanStack Query for optimal performance:

```typescript
// Example: Projects API hooks
const { data: projects } = useGetProjects();
const createProject = useCreateProject();
const updateProject = useUpdateProject();
const deleteProject = useDeleteProject();
```

### Projects API
- `GET /api/projects` - List user projects (cached with `useGetProjects`)
- `POST /api/projects` - Create new project (with optimistic updates)
- `GET /api/projects/:id` - Get project details (cached with `useGetProject`)
- `PATCH /api/projects/:id` - Update project (with optimistic updates)
- `DELETE /api/projects/:id` - Delete project (with cache invalidation)

### AI API
- `POST /api/ai/generate-image` - Generate image from prompt (cached results)
- `POST /api/ai/remove-background` - Remove image background (with retry logic)

### Images API
- `GET /api/images` - Get stock images from Unsplash (infinite query)
- `POST /api/images/upload` - Upload custom images (with progress tracking)

### Subscriptions API
- `GET /api/subscriptions` - Get user subscription status (background sync)
- `POST /api/subscriptions/checkout` - Create checkout session
- `POST /api/subscriptions/billing` - Access billing portal

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables
Ensure all required environment variables are configured in your deployment platform.

### Database
Set up PostgreSQL database and run migrations:
```bash
npm run db:migrate
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run integration tests
npm run test:integration
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow TypeScript strict mode guidelines
- Use Prettier for code formatting
- Follow the existing component architecture
- Write meaningful commit messages

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TanStack Query](https://tanstack.com/query) - Powerful data synchronization for React
- [Fabric.js](http://fabricjs.com/) - Canvas library
- [Next.js](https://nextjs.org/) - React framework
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [Hono.js](https://hono.dev/) - Fast web framework

## 📧 Contact

**Developer**: Ismail
- GitHub: [@ismail-gits](https://github.com/ismail-gits)
- Email: [your-email@domain.com]

## 🚀 Roadmap

### Upcoming Features
- [ ] Real-time collaboration
- [ ] Advanced animation tools
- [ ] Vector graphics support
- [ ] Plugin system
- [ ] Mobile app
- [ ] Team workspaces
- [ ] Advanced AI integrations
- [ ] Performance optimizations

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

[Demo](your-demo-link) • [Documentation](your-docs-link) • [Issues](https://github.com/ismail-gits/nyvo/issues) • [Discussions](https://github.com/ismail-gits/nyvo/discussions)

</div>