# في أمانتي الأمان السوشيال ميديا - Social Media Safety Educational Game

## Overview

An interactive educational game designed to teach children ages 6-10 about social media safety and privacy in Arabic. Styled like "Who Wants to Be a Millionaire" game show with dramatic dark backgrounds, spotlights, and green/teal brand colors. Children answer multiple-choice questions (4 options labeled أ, ب, ج, د) and receive immediate feedback with educational tips in Arabic, earning green stars for correct answers.

**Key Features**:
- Full Arabic language support with RTL (right-to-left) text direction
- Multiple-choice quiz format (4 answers per question)
- 10 educational questions about social media safety in Arabic
- Dark dramatic background with spotlight animations
- Green/teal brand colors with golden accents
- Animated feedback screens with educational tips
- Star-based scoring system
- Interactive sound effects (Web Audio API)
- Fullscreen mode for immersive experience
- Mute/unmute toggle with localStorage persistence

## Recent Changes

**November 23, 2025** - Converted to Static Frontend-Only Application:
- Moved all questions from backend to `client/src/data/questions.ts`
- Removed all API calls - game logic now runs entirely in frontend
- Added `shuffleQuestions()` and `checkAnswer()` utility functions
- Updated Game component to use local state instead of TanStack Query/API calls
- Created `vercel.json` for SPA routing and build configuration
  - Build command: `vite build` (not `npm run build`) to avoid building backend
  - Output directory: `dist/public` (matches Vite's build output)
- Created `DEPLOYMENT.md` with complete Vercel deployment instructions
- Application now works as pure static SPA (no backend required)

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
- Design system optimized for children: Arabic fonts (Cairo/Tajawal), large touch targets (200px+ drop zones), high contrast, and playful animations
- Framer Motion for smooth transitions and engaging animations throughout the game experience
- dnd-kit for touch-optimized drag-and-drop interaction with pointer and touch sensors

**Drag-and-Drop Interaction**
- Question cards are draggable by children
- Two large drop zones at bottom: green "أمن" (Safe) and red "غير أمن" (Unsafe)
- Visual feedback during drag: card scales and rotates, drop zones highlight when hovered
- Touch sensors configured with 200ms delay and 8px tolerance for child-friendly interaction
- Drag disabled during feedback phase to prevent duplicate submissions
- DragOverlay provides smooth visual feedback during drag operation

**State Management**
- Local React state for all game state (questions, game phase, current question, score, feedback)
- Questions shuffled on game start using `shuffleQuestions()` from `@/data/questions`
- Answer validation using `checkAnswer()` function (no API calls)
- `isProcessing` flag prevents duplicate submissions during feedback display

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
- In-memory storage implementation with interface-based design (`IStorage`)
- Seed data includes 10 pre-defined questions in Arabic across categories: passwords, strangers, sharing, privacy
- Question model includes: scenario text (Arabic), educational tip (Arabic), correct answer (boolean), and category
- Questions cover: password sharing, stranger danger, asking parents, friend requests, privacy settings, email scams, strong passwords, cyberbullying reporting, location sharing, and unknown links

**Development vs Production**
- Development: Vite middleware integration for HMR and client template serving
- Production: Static file serving from pre-built dist directory
- Environment-specific error handling and logging

### Data Storage Solutions

**Current Implementation**
- In-memory storage with seed data for questions
- No persistent database currently connected
- Storage interface designed for easy migration to PostgreSQL

**Future Database Architecture**
- Drizzle ORM configured for PostgreSQL with Neon serverless driver (not currently in use)
- Schema defined in `shared/schema.ts`:
  - `questions` table: id, scenario, tip, correctAnswer, category
- Game state managed in-memory (no persistence between sessions)
- Connection would require `DATABASE_URL` environment variable

### External Dependencies

**Database (Configured but Not Active)**
- Neon PostgreSQL serverless database via `@neondatabase/serverless`
- Drizzle ORM for type-safe database queries and schema management
- Connection requires `DATABASE_URL` environment variable

**UI Libraries**
- Shadcn UI with Radix UI primitives (@radix-ui/* packages)
- Framer Motion for animations
- Lucide React for icons
- dnd-kit (@dnd-kit/core, @dnd-kit/utilities) for drag-and-drop with touch support
- Class Variance Authority for component variant management

**Development Tools**
- Replit-specific plugins for runtime error overlay, cartographer, and dev banner
- TypeScript for type checking across client, server, and shared code
- ESBuild for production server bundling

**Form & Validation**
- React Hook Form with Zod resolvers for form validation
- Drizzle-zod for schema-to-zod conversion

**Fonts**
- Google Fonts: Cairo and Tajawal (Arabic fonts with multiple weights)
- Preconnected to fonts.googleapis.com for performance
- RTL (right-to-left) text direction configured in HTML root element

**Asset Management**
- Custom mascot image stored in `attached_assets` directory
- Vite alias configuration for `@assets` path resolution