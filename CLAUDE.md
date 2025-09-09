# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.5.2 web application using:
- Runtime: Bun (not Node.js)
- Language: TypeScript with strict mode enabled
- UI: React 19.1.1 with App Router
- Styling: Tailwind CSS 3.4.0 with utility-first approach
- Containerization: Docker with multi-stage builds

## Key Commands

### Development
```bash
bun run dev          # Start Next.js dev server on port 3000
bun run build        # Build for production (creates standalone output)
bun run start        # Start production server
bun run lint         # Run Next.js linter
bun run kill3000     # Kill process on port 3000 if stuck
```

### Docker
```bash
bun run docker:dev    # Run development environment in Docker
bun run docker:prod   # Run production environment in Docker
bun run docker:build  # Build production Docker image
bun run docker:clean  # Clean Docker containers and volumes
bun run docker:fresh  # Clean and restart Docker development
```

## Architecture

### Application Structure
- **App Router**: All pages and layouts in `app/` directory using Next.js App Router conventions
- **TypeScript Config**: Strict mode enabled with path aliases:
  - `@/*` → `app/*`
  - `@lib/*` → `app/lib/*`
  - `@components/*` → `app/components/*`
- **Output**: Configured as `standalone` for optimized Docker deployments

### Styling Architecture
- Tailwind CSS configured to scan `app/**/*.{js,ts,jsx,tsx,mdx}`
- Custom theme extensions for colors and shadows in `tailwind.config.js`
- Global styles in `app/globals.css`
- Root layout applies gradient background and antialiased fonts

### Docker Architecture
- Multi-stage Dockerfile with separate development and production stages
- Development: Hot reloading with volume mounts, preserves container node_modules
- Production: Optimized standalone build with Alpine Linux
- Both environments use Bun runtime

## Development Guidelines

### TypeScript Requirements
- Never use `any` type except for testing (use strong types or explicit casting)
- TypeScript strict mode is enabled - ensure all code passes type checking
- Build errors are not ignored (`ignoreBuildErrors: false`)

### Component Development
- Use functional components with TypeScript
- Place reusable components in `app/components/`
- Use path aliases for imports (`@components/`, `@lib/`)

### Running Tests
Currently no test framework is configured. When adding tests, update this section with the appropriate test commands.

## Port Management
Port 3000 is used for both development and production. Use `bun run kill3000` if the port is stuck.