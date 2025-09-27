# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Development**: `pnpm dev` - Start development server
- **Build**: `pnpm build` - Build for production
- **Lint**: `pnpm lint` - Run ESLint (build ignores linting errors)
- **Start**: `pnpm start` - Start production server

## Project Architecture

This is a Next.js 14 application built with v0 that integrates with the Nano Banana API for AI-powered image generation and editing.

### Core Structure

- **App Router**: Uses Next.js 14 app directory structure
- **Main Application**: Single-page image generation/editing interface at `app/page.tsx`
- **API Integration**: `/api/generate-image/route.ts` handles both text-to-image and image-to-image workflows
- **UI Framework**: Built with shadcn/ui components and Radix UI primitives


### Key Components

- `ImageCombiner` (`components/image-combiner.tsx`): Main interface component with dual modes:
  - Text-to-image generation using prompts
  - Image-to-image editing with file uploads or URLs
- `@paper-design/shaders-react`: Provides animated dithering background effect

### API Architecture

The `/api/generate-image` endpoint:
- Handles FormData for file uploads and text prompts
- Supports two modes: "text-to-image" and "image-editing"
- Integrates with Vercel Blob for image storage
- Communicates with Nano Banana API endpoints:
  - `https://api.nano-banana.com/v1/generate` for text-to-image
  - `https://api.nano-banana.com/v1/edit` for image editing
- Uses `NANO_BANANA_API_KEY` environment variable (falls back to "demo-key")

### Configuration

- **Next.js**: Build errors and ESLint are ignored in production builds (`next.config.mjs`)
- **TypeScript**: Uses path aliases with `@/*` mapping to root directory
- **shadcn/ui**: Configured with "new-york" style, CSS variables, and Lucide icons
- **Tailwind**: Main styles in `app/globals.css`

### Dependencies

Built on modern React ecosystem with comprehensive UI library:
- Core: Next.js 14, React 18, TypeScript
- UI: Full shadcn/ui component library with Radix UI primitives
- Forms: react-hook-form with Zod validation
- Styling: Tailwind CSS with animations
- External: Vercel Blob for file storage, Nano Banana API for AI generation