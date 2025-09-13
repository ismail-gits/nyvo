```

## Overview

NYVO is an innovative, AI-powered creative design platform. It empowers users to generate, edit, and manage their visual projects with intelligent tools, seamless cloud storage, and robust authentication. From AI-driven image generation to background removal and a comprehensive visual editor, NYVO is designed to streamline the creative workflow for individuals and teams.

## Features

NYVO provides a rich set of features to cater to diverse creative needs:

**User Authentication & Management:**
*   Secure sign-up and sign-in processes.
*   User account management.

**Dashboard & Project Management:**
*   Intuitive dashboard for an overview of projects and templates.
*   Create, view, update, and delete projects.
*   Duplicate existing projects for rapid iteration.
*   Browse and utilize pre-designed templates.

**Advanced Visual Editor:**
*   **Text Tools:** Add and customize text with various fonts, sizes, and colors.
*   **Shape Tools:** Insert and manipulate various geometric shapes.
*   **Drawing Tools:** Freehand drawing capabilities.
*   **Image Management:** Upload, insert, and manage images within projects.
*   **AI-Powered Image Tools:**
    *   **AI Image Generation:** Generate images from text prompts.
    *   **Background Removal:** Automatically remove backgrounds from images.
*   **Styling & Effects:**
    *   Fill color selection.
    *   Stroke color and width adjustment.
    *   Opacity control.
    *   Image filters.
*   **Editor Utilities:**
    *   Undo/Redo functionality for robust editing.
    *   Clipboard operations (copy, paste).
    *   Hotkey support for efficient workflow.
    *   Auto-resizing of canvas elements.
    *   Real-time saving and loading of project states.

**API Integrations:**
*   Dedicated API endpoints for AI image generation, background removal, project management, user data, and subscriptions.
*   Integration with external services like Unsplash for image search and Uploadthing for file uploads.

**Subscription & Billing:**
*   Stripe integration for subscription management and billing.
*   Modals for managing subscription success, failure, and general subscription information.
*   Paywall management to gate premium features.

## Tech Stack

NYVO is built with a modern and robust tech stack, ensuring scalability, performance, and a delightful developer experience.

*   **Frontend Framework:** Next.js 14 (React)
*   **Styling:** Tailwind CSS, PostCSS
*   **UI Components:** Shadcn UI
*   **State Management:** React Query (TanStack Query)
*   **Authentication:** NextAuth.js
*   **Database:** Drizzle ORM (for schema definition and interaction)
*   **Backend API:** Hono (for API routes)
*   **Cloud Storage:** Uploadthing
*   **AI & Image Processing:**
    *   Gemini (for AI image generation)
    *   Remove.bg API (for background removal)
*   **Payment Processing:** Stripe
*   **Image Assets:** Unsplash API
*   **Code Quality:** ESLint
*   **TypeScript:** For type-safe development across the entire application.

## Architecture

NYVO follows a modular and component-driven architecture, leveraging Next.js's app router for clear separation of concerns and efficient routing.

```mermaid
graph TD
    A[User] --> B(Frontend - Next.js App)
    B --> C{Authentication}
    C --> D[NextAuth.js]
    D --> E[Database - Drizzle ORM]

    B --> F(Dashboard)
    F --> G[Project Management APIs]
    G --> E

    B --> H(Editor)
    H --> I[AI APIs]
    I --> J[Gemini / Remove.bg]

    H --> K[Image APIs]
    K --> L[Unsplash / Uploadthing]

    B --> M(Subscription & Billing)
    M --> N[Stripe API]
    M --> E

    G, I, K, N --> O[Backend - Hono API Routes]
    O --> E
```

### Directory Structure Highlights

*   **`public/`**: Static assets.
*   **`src/app/`**: Next.js App Router structure.
    *   **`(auth)`**: Authentication-related pages (sign-in, sign-up) and layout.
    *   **`(dashboard)`**: Main user dashboard, showcasing projects and templates, with dedicated layouts and components (sidebar, navbar).
    *   **`api/[[...route]]`**: Core Hono API routes for AI, images, projects, subscriptions, and users.
    *   **`api/auth/[...nextAuth]`**: NextAuth.js API routes for authentication.
    *   **`api/uploadthing`**: Routes for Uploadthing file uploads.
    *   **`editor/[projectId]`**: The main visual editor interface, dynamically routed per project.
*   **`src/components/`**: Reusable UI components.
    *   **`ui/`**: Shadcn UI components (avatar, button, card, dialog, etc.)
*   **`src/db/`**: Database schema definitions using Drizzle ORM.
*   **`src/features/`**: Feature-sliced architecture. Each directory represents a distinct feature with its own API hooks, components, and utilities (e.g., `ai`, `auth`, `editor`, `images`, `projects`, `subscriptions`). This promotes maintainability and scalability.
*   **`src/hooks/`**: Custom React hooks for shared logic.
*   **`src/lib/`**: Utility functions and external service integrations (Gemini, Hono, remove.bg, Stripe, Unsplash, Uploadthing, general utils).
*   **`src/` (root)**: `auth.config.ts`, `auth.ts` (NextAuth.js configuration), and `middleware.ts`.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (LTS recommended)
*   npm or yarn
*   A database (e.g., PostgreSQL compatible with Drizzle)
*   API keys for:
    *   Gemini
    *   Remove.bg
    *   Stripe
    *   Unsplash
    *   Uploadthing
    *   Google/GitHub for NextAuth.js providers (optional)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ismail-gits/nyvo.git
    cd nyvo
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add your environment variables. A `template.env` file might be provided or you'll need to create one based on the services used in `src/lib` and `src/auth.config.ts`.
    ```env
    # Database
    DATABASE_URL="your_database_connection_string"

    # NextAuth.js
    AUTH_SECRET="your_nextauth_secret"
    AUTH_GOOGLE_ID="your_google_client_id"
    AUTH_GOOGLE_SECRET="your_google_client_secret"
    # AUTH_GITHUB_ID="your_github_client_id"
    # AUTH_GITHUB_SECRET="your_github_client_secret"

    # Gemini AI
    GEMINI_API_KEY="your_gemini_api_key"

    # Remove.bg
    REMOVEBG_API_KEY="your_removebg_api_key"

    # Stripe
    STRIPE_SECRET_KEY="your_stripe_secret_key"
    STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"

    # Unsplash
    UNSPLASH_ACCESS_KEY="your_unsplash_access_key"

    # Uploadthing
    UPLOADTHING_SECRET="your_uploadthing_secret"
    UPLOADTHING_APP_ID="your_uploadthing_app_id"
    ```

4.  **Database Migration (Drizzle ORM):**
    Ensure your database is running and then apply migrations:
    ```bash
    npx drizzle-kit push:pg # or your chosen database type
    ```
    *Note: Refer to `drizzle.config.ts` for specific Drizzle commands if needed.*

5.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Contributing

We welcome contributions! If you'd like to contribute, please fork the repository and create a pull request, or open an issue with the tag "enhancement" or "bug".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Ismail – ismail.gits@example.com (Placeholder - please replace with actual contact)

Project Link: [https://github.com/ismail-gits/nyvo](https://github.com/ismail-gits/nyvo)

---