import type { Plugin } from 'vite';
import { readFileSync, readdirSync, statSync } from 'fs';
import { resolve, join } from 'path';

interface RouteFile {
  path: string;
  filePath: string;
  htmlPath?: string;
}

function scanRoutes(routesDir: string, basePath = ''): RouteFile[] {
  const routes: RouteFile[] = [];
  
  try {
    const entries = readdirSync(routesDir);
    
    for (const entry of entries) {
      const fullPath = join(routesDir, entry);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Check for main.ts and index.html in directory
        const mainTs = join(fullPath, 'main.ts');
        const indexHtml = join(fullPath, 'index.html');
        
        let hasMain = false;
        let hasHtml = false;
        
        try {
          statSync(mainTs);
          hasMain = true;
        } catch {}
        
        try {
          statSync(indexHtml);
          hasHtml = true;
        } catch {}
        
        if (hasMain || hasHtml) {
          const routePath = basePath + '/' + entry;
          routes.push({
            path: routePath === '/index' ? '/' : routePath,
            filePath: hasMain ? mainTs : '',
            htmlPath: hasHtml ? indexHtml : undefined
          });
        }
        
        // Recursively scan subdirectories
        routes.push(...scanRoutes(fullPath, basePath + '/' + entry));
      }
    }
  } catch (error) {
    console.warn(`Could not scan routes directory: ${routesDir}`, error);
  }
  
  return routes;
}

function generateHtmlForRoute(route: RouteFile): string {
  if (route.htmlPath) {
    // Use existing HTML file
    return readFileSync(route.htmlPath, 'utf-8');
  }
  
  // Generate HTML for TypeScript-only routes
  const routeName = route.path === '/' ? 'index' : route.path.replace(/^\//, '');
  const title = routeName.charAt(0).toUpperCase() + routeName.slice(1);
  
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="${route.filePath.replace(process.cwd(), '')}"></script>
  </body>
</html>`;
}

export function fileBasedRoutesPlugin(routesDir: string = 'src/routes'): Plugin {
  let routes: RouteFile[] = [];
  const fullRoutesDir = resolve(process.cwd(), routesDir);
  
  return {
    name: 'vite-plugin-file-routes',
    buildStart() {
      // Scan routes at build start
      routes = scanRoutes(fullRoutesDir);
      console.log('📁 File-based routes discovered:');
      routes.forEach(route => {
        console.log(`  ${route.path} → ${route.htmlPath || route.filePath}`);
      });
    },
    buildEnd() {
      // Clean up on build end
      routes = [];
    },
    configureServer(server) {
      // Watch for new route directories and files
      const chokidar = server.watcher;
      
      chokidar.on('addDir', (path: string) => {
        if (path.startsWith(fullRoutesDir)) {
          console.log('📁 New route directory detected, rescanning...');
          routes = scanRoutes(fullRoutesDir);
          console.log('📁 Updated routes:');
          routes.forEach(route => {
            console.log(`  ${route.path} → ${route.htmlPath || route.filePath}`);
          });
        }
      });
      
      chokidar.on('add', (path: string) => {
        if (path.startsWith(fullRoutesDir) && (path.endsWith('/main.ts') || path.endsWith('/index.html'))) {
          console.log('📄 New route file detected, rescanning...');
          routes = scanRoutes(fullRoutesDir);
          console.log('📁 Updated routes:');
          routes.forEach(route => {
            console.log(`  ${route.path} → ${route.htmlPath || route.filePath}`);
          });
        }
      });
      
      chokidar.on('unlink', (path: string) => {
        if (path.startsWith(fullRoutesDir) && (path.endsWith('/main.ts') || path.endsWith('/index.html'))) {
          console.log('📄 Route file removed, rescanning...');
          routes = scanRoutes(fullRoutesDir);
          console.log('📁 Updated routes:');
          routes.forEach(route => {
            console.log(`  ${route.path} → ${route.htmlPath || route.filePath}`);
          });
          // Trigger a page refresh to clear any cached references
          server.ws.send({
            type: 'full-reload'
          });
        }
      });
      
      chokidar.on('unlinkDir', (path: string) => {
        if (path.startsWith(fullRoutesDir)) {
          console.log('📁 Route directory removed, rescanning...');
          routes = scanRoutes(fullRoutesDir);
          console.log('📁 Updated routes:');
          routes.forEach(route => {
            console.log(`  ${route.path} → ${route.htmlPath || route.filePath}`);
          });
          // Trigger a page refresh to clear any cached references
          server.ws.send({
            type: 'full-reload'
          });
        }
      });
      
      server.middlewares.use((req, res, next) => {
        if (!req.url) return next();
        
        // Remove query parameters and trailing slashes
        const cleanUrl = req.url.split('?')[0].replace(/\/$/, '') || '/';
        
        // Find matching route
        const route = routes.find(r => r.path === cleanUrl);
        
        if (route) {
          try {
            // Verify the route file still exists before serving
            if (route.filePath) {
              try {
                statSync(route.filePath);
              } catch {
                console.warn(`Route file not found: ${route.filePath}, rescanning routes...`);
                routes = scanRoutes(fullRoutesDir);
                return next();
              }
            }
            
            const html = generateHtmlForRoute(route);
            
            // Transform the HTML through Vite's transform pipeline
            server.transformIndexHtml(req.url, html).then(transformedHtml => {
              res.setHeader('Content-Type', 'text/html');
              res.end(transformedHtml);
            }).catch(next);
            
            return; // Don't call next()
          } catch (error) {
            console.error(`Error serving route ${route.path}:`, error);
            return next();
          }
        }
        
        next();
      });
    }
  };
}