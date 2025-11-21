# Social Media Safety Educational Game

## Overview

An interactive educational game designed to teach children ages 6-10 about social media safety and privacy. The application presents quiz-style scenarios where children make decisions about safe online behavior, guided by a friendly superhero mascot. Users progress through questions, receive immediate feedback with educational tips, and earn points for correct answers.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server, providing fast HMR and optimized production builds
- Wouter for lightweight client-side routing

**UI Component System**
- Shadcn UI component library with Radix UI primitives for accessible, composable components
- Tailwind CSS for utility-first styling with custom design tokens
- Design system optimized for children: rounded fonts (Poppins/Fredoka), large touch targets (80px minimum), high contrast, and playful animations
- Framer Motion for smooth transitions and engaging animations throughout the game experience

**State Management**
- TanStack Query (React Query) for server state management, caching, and data fetching
- Local React state for UI state (game phase, current question, score, feedback)
- Custom query client configured with infinite stale time and disabled automatic refetching

**Design Approach**
- Child-centric interface with single-focus screens and one primary task per view
- Full-screen viewport layouts with generous padding and spacing
- Reward-based progression with visual feedback for correct/incorrect answers
- Educational clarity through large typography and clear iconography

### Backend Architecture

**Server Framework**
- Express.js server with TypeScript
- Dual-mode operation: development (with Vite middleware) and production (serving static files)
- RESTful API design with JSON request/response format

**API Structure**
- `GET /api/questions` - Retrieves all questions, shuffled randomly for each game session
- `POST /api/answer` - Validates answer submissions and returns correctness with educational tips
- Request validation using Zod schemas for type safety

**Data Layer**
- In-memory storage implementation with interface-based design (`IStorage`) for future database integration
- Seed data includes 10+ pre-defined questions across categories: strangers, sharing, passwords, privacy
- Question model includes: scenario text, educational tip, correct answer (boolean), and category

**Development vs Production**
- Development: Vite middleware integration for HMR and client template serving
- Production: Static file serving from pre-built dist directory
- Environment-specific error handling and logging

### Data Storage Solutions

**Current Implementation**
- In-memory storage with seed data for questions
- No persistent database currently connected
- Storage interface designed for easy migration to PostgreSQL

**Planned Database Architecture**
- Drizzle ORM configured for PostgreSQL with Neon serverless driver
- Schema defined in `shared/schema.ts`:
  - `questions` table: id, scenario, tip, correctAnswer, category
  - `gameStates` table: id, currentQuestionIndex, score, answeredQuestions, completed
- Migration setup using drizzle-kit with `db:push` script
- Connection pooling via `@neondatabase/serverless`

### External Dependencies

**Database (Configured but Not Active)**
- Neon PostgreSQL serverless database via `@neondatabase/serverless`
- Drizzle ORM for type-safe database queries and schema management
- Connection requires `DATABASE_URL` environment variable

**UI Libraries**
- Shadcn UI with Radix UI primitives (@radix-ui/* packages)
- Framer Motion for animations
- Lucide React for icons
- Class Variance Authority for component variant management

**Development Tools**
- Replit-specific plugins for runtime error overlay, cartographer, and dev banner
- TypeScript for type checking across client, server, and shared code
- ESBuild for production server bundling

**Form & Validation**
- React Hook Form with Zod resolvers for form validation
- Drizzle-zod for schema-to-zod conversion

**Fonts**
- Google Fonts: Poppins (weights 400-800) and Fredoka (weights 400-700)
- Preconnected to fonts.googleapis.com for performance

**Asset Management**
- Custom mascot image stored in `attached_assets` directory
- Vite alias configuration for `@assets` path resolution