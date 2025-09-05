import { Server } from "bun";
import { PORTS, HOSTS } from "../config/ports";
import { readFile } from "fs/promises";
import { join } from "path";

console.log("Starting Bun TypeScript server...3");

// Track server stats
const serverStats = {
  startTime: Date.now(),
  requests: 0,
  connections: 0,
  avgResponseTime: 0,
};

const server: Server = Bun.serve({
  port: PORTS.API,
  hostname: HOSTS.DOCKER, // Important for Docker to bind correctly
  async fetch(req) {
    const startTime = performance.now();
    serverStats.requests++;
    
    const url = new URL(req.url);
    const path = url.pathname;

    let response: Response;

    // Dashboard route - serve the built dashboard HTML
    if (path === '/dashboard') {
      try {
        // In development, proxy to Vite dev server
        if (process.env.NODE_ENV === 'development') {
          // Redirect to Vite's dashboard page during dev
          return Response.redirect(`http://localhost:${PORTS.CLIENT}/dashboard.html`, 302);
        }
        
        // In production, serve the built dashboard
        const dashboardPath = join(process.cwd(), 'public', 'dashboard.html');
        const html = await readFile(dashboardPath, 'utf-8');
        response = new Response(html, {
          headers: { 'Content-Type': 'text/html' },
        });
      } catch (error) {
        response = new Response('Dashboard not built. Run "bun run build" first.', {
          status: 404,
          headers: { 'Content-Type': 'text/plain' },
        });
      }
    }
    // API routes endpoint - list all available routes
    else if (path === '/api/routes') {
      const routes = [
        { path: '/', label: 'Home', type: 'static' },
        { path: '/dashboard', label: 'Dashboard', type: 'static' },
        { path: '/api-docs', label: 'API Docs', type: 'static' },
        { path: '/users', label: 'Users List', type: 'static' },
        { path: '/users/[id]', label: 'User Details', type: 'dynamic' },
        { path: '/posts/[slug]', label: 'Blog Post', type: 'dynamic' },
        { path: '/api/[...path]', label: 'API Gateway', type: 'api' },
      ];
      
      response = new Response(JSON.stringify({ 
        routes,
        timestamp: new Date().toISOString(),
      }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
    // API stats endpoint
    else if (path === '/api/stats') {
      const uptime = Math.floor((Date.now() - serverStats.startTime) / 1000);
      response = new Response(JSON.stringify({
        uptime,
        requests: serverStats.requests,
        connections: serverStats.connections,
        responseTime: Math.round(serverStats.avgResponseTime),
      }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
    // Main API endpoint
    else if (path.startsWith('/api')) {
      response = new Response(JSON.stringify({ 
        message: "Hello from Bun API!",
        timestamp: new Date().toISOString(),
      }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
    // Default response
    else {
      response = new Response(
        `API Server on port ${PORTS.API}\n` +
        `Available routes:\n` +
        `  - /api - Main API endpoint\n` +
        `  - /api/stats - Server statistics\n` +
        `  - /dashboard - Server dashboard\n` +
        `\nVisit http://localhost:${PORTS.CLIENT} for the main app`, {
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    // Update average response time
    const responseTime = performance.now() - startTime;
    serverStats.avgResponseTime = 
      (serverStats.avgResponseTime * (serverStats.requests - 1) + responseTime) / serverStats.requests;

    return response;
  },
});

console.log(`API server listening on http://localhost:${server.port}`);
