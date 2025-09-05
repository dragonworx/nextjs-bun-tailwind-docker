# Fantoccini-3D Codebase Overview

This is a **Three.js-based 3D web application** built with TypeScript, Bun, and Vite. The project follows a file-based routing architecture with custom template components.

### Tech Stack
- **Runtime**: Bun (v1.2.21+)
- **Language**: TypeScript (v5.9.2)
- **Build Tool**: Vite (v7.1.3)
- **3D Library**: Three.js (v0.179.1)
- **Containerization**: Docker & Docker Compose

### Architecture

**Server** (`server/server.ts`):
- Bun HTTP server running on port 3001
- Serves API endpoints and dashboard
- Tracks server statistics (requests, connections, response times)
- Proxies development requests to Vite dev server

**Client** (`client/`):
- File-based routing system in `client/routes/`
- Custom template component system with HTML string imports
- Routes include: index, dashboard, users, posts, api-docs
- Component-based architecture with TypeScript classes

**Build System**:
- Custom Vite plugins for HTML string imports and file-based routing
- Multi-page app with separate entry points per route
- Path aliases configured (@lib, @components, @routes, etc.)

### Key Features
- **Custom Component System**: Template components extending base classes with HTML/CSS imports
- **File-Based Routing**: Automatic route generation from directory structure
- **Docker Support**: Containerized development and production environments
- **Hot Reload**: Development server with hot module replacement

### Project Structure
```
fantoccini-3d/
├── server/          # Bun backend server
├── client/          # Frontend application
│   ├── lib/         # Shared components & utilities
│   └── routes/      # File-based routing pages
├── vite/            # Custom Vite plugins
├── config/          # Configuration files
├── assets/          # Static assets
└── public/          # Build output directory
```

### Development Commands
- `bun run dev`: Docker development environment
- `bun run dev:local`: Local development (server + client)
- `bun run build`: Production build
- `bun run docker:prod`: Production Docker container

The codebase appears to be in active development with recent changes to the routing system and component architecture.
