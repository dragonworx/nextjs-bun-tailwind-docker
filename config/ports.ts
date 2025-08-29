export const PORTS = {
  CLIENT: 3000,  // Vite dev server - what users access in browser
  API: 3001,     // Bun API server - internal API
} as const;

export const HOSTS = {
  DOCKER: '0.0.0.0',  // For Docker binding
  LOCAL: 'localhost',
} as const;