# Project Structure

## File-Based Routing Convention

This project uses a file-based routing system similar to Next.js where routes are organized in the `src/routes/` directory.

### Route Structure
```
src/routes/
├── {route-name}/
│   ├── index.html          # HTML template for the route
│   ├── main.ts            # Main entry point for the route
│   ├── components/        # Components specific to this route
│   │   └── {Component}/
│   │       ├── Component.html
│   │       ├── Component.css
│   │       └── Component.ts
│   ├── styles/           # Route-specific styles
│   └── examples/         # Route-specific demos/examples
```

### Current Routes
- `/` → `src/routes/index/` - Main landing page
- `/dashboard` → `src/routes/dashboard/` - Server dashboard with stats
- `/api-docs` → `src/routes/api-docs/` - API documentation

### Path Aliases
The project uses TypeScript path aliases for clean imports:

- `@/` → `src/`
- `@lib/` → `src/lib/`
- `@components/` → `src/lib/components/`
- `@dashboard/` → `src/dashboard/` (deprecated)
- `@routes/` → `src/routes/`
- `@config/` → `config/`
- `@assets/` → `assets/`

### Component Architecture
Components use the `Component` base class from `@lib/components/Component` which provides:
- State management with TypeScript generics
- Automatic re-rendering
- Lifecycle hooks
- Event binding
- DOM utilities

### Import Conventions
- Use relative imports for components within the same route: `./components/MyComponent/MyComponent`
- Use path aliases for shared utilities: `@lib/components/Component`
- Use path aliases for config: `@config/ports`

### Adding New Routes
1. Create a new directory in `src/routes/{route-name}/`
2. Add `main.ts` (required) and optionally `index.html`
3. Components go in `{route-name}/components/`
4. The route will automatically be available at `/{route-name}`

### Technologies
- **Build System**: Vite with TypeScript
- **Runtime**: Bun
- **Styling**: Modern CSS with nested rules
- **Components**: Custom template-based system
- **Routing**: Custom file-based routing plugin