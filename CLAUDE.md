# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Development**: `npm run dev` - Start development server
- **Build**: `npm run build` - Build for production
- **Lint**: `npm run lint` - Run ESLint (build ignores linting errors)
- **Start**: `npm run start` - Start production server

## Project Architecture

This is a Next.js 14 application built with v0 that integrates with the Nano Banana API for AI-powered image generation and editing.

### Core Structure

- **App Router**: Uses Next.js 14 app directory structure
- **Main Application**: Single-page image generation/editing interface at `app/page.tsx`
- **Layout**: Root layout with custom fonts (Inter, JetBrains Mono) in `app/layout.tsx`
- **API Routes**: `/api/generate-image/route.ts` handles both text-to-image and image-to-image workflows
- **UI Framework**: Built with shadcn/ui components and Radix UI primitives
- **Styling**: Global styles in `app/globals.css` with Tailwind CSS

### Key Components

- `ImageCombiner` (`components/image-combiner.tsx`): Main interface component with dual modes:
  - Text-to-image generation using prompts (100 pre-defined random prompts available)
  - Image-to-image editing with file uploads
  - Random prompt generator with shuffle functionality
- `@paper-design/shaders-react`: Provides animated dithering background effect
- `ThemeProvider` (`components/theme-provider.tsx`): Handles theme management with next-themes
- `Button` (`components/ui/button.tsx`): Primary UI button component

### API Architecture

The `/api/generate-image` endpoint:
- Handles FormData for file uploads and text prompts
- Validates image files (max 10MB, supports JPEG, PNG, WebP, GIF)
- Validates prompts (max 1000 characters)
- Supports two modes:
  - **text-to-image**: Generates images from text prompts
  - **image-editing**: Combines two images with a prompt
- Integrates with Vercel Blob for image storage
- Communicates with Nano Banana API endpoints:
  - `https://api.nano-banana.com/v1/generate` for text-to-image
  - `https://api.nano-banana.com/v1/edit` for image editing
- Uses `NANO_BANANA_API_KEY` environment variable (falls back to "demo-key")
- Returns structured responses with URL, prompt, and optional description

### Configuration

- **Next.js** (`next.config.mjs`):
  - TypeScript and ESLint errors ignored during builds
  - Image optimization disabled (unoptimized)
- **TypeScript** (`tsconfig.json`):
  - Path aliases with `@/*` mapping to root directory
  - Strict mode enabled
- **shadcn/ui** (`components.json`):
  - Configured with "new-york" style
  - CSS variables enabled
  - Lucide icons library
  - Aliases: `@/components`, `@/lib/utils`, `@/components/ui`
- **Fonts**:
  - Inter (variable: `--font-inter`)
  - JetBrains Mono (variable: `--font-jetbrains-mono`)
  - Default font: monospace

### Dependencies

Built on modern React ecosystem with comprehensive UI library:
- **Core**: Next.js 14.2.33, React 18.3.1, TypeScript 5.9.2
- **UI Components**: Full shadcn/ui component library with Radix UI primitives
- **Forms**: react-hook-form 7.60.0 with Zod 3.25.67 validation
- **Styling**: Tailwind CSS 3.4.16 with tailwindcss-animate, class-variance-authority, clsx, tailwind-merge
- **Icons**: Lucide React 0.544.0
- **External Services**:
  - Vercel Blob (latest) for file storage
  - Nano Banana API for AI generation
  - Vercel Analytics 1.5.0
- **Utilities**:
  - date-fns 4.1.0
  - cmdk 1.1.1
  - next-themes 0.4.6
  - geist 1.3.1
  - embla-carousel-react 8.6.0
  - recharts 2.15.4
  - sonner 2.0.7
  - vaul 1.1.2
  - react-resizable-panels 2.1.9
  - input-otp 1.4.2
  - react-day-picker 9.11.0

### Directory Structure

```
├── app/
│   ├── api/
│   │   └── generate-image/
│   │       └── route.ts          # API endpoint for image generation
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout with fonts
│   └── page.tsx                  # Home page
├── components/
│   ├── ui/
│   │   └── button.tsx            # Button component
│   ├── image-combiner.tsx        # Main image generation component
│   └── theme-provider.tsx        # Theme management
├── lib/
│   └── utils.ts                  # Utility functions (cn helper)
├── components.json               # shadcn/ui configuration
├── next.config.mjs               # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies and scripts
```