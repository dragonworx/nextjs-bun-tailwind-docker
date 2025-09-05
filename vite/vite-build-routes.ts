import { resolve } from 'path';
import { readdirSync, statSync } from 'fs';

/**
 * Dynamically discover route entry points for Vite build
 * This ensures production builds include all routes automatically
 * Now supports dynamic routes with parameters
 */
export function getRouteEntries(routesDir: string = 'client/routes'): Record<string, string> {
  const entries: Record<string, string> = {};
  const fullRoutesDir = resolve(process.cwd(), routesDir);
  
  function scanForEntries(dir: string, basePath = '') {
    try {
      const items = readdirSync(dir);
      
      for (const item of items) {
        const itemPath = resolve(dir, item);
        const stat = statSync(itemPath);
        
        if (stat.isDirectory()) {
          const htmlFile = resolve(itemPath, 'index.html');
          const tsFile = resolve(itemPath, 'main.ts');
          
          let hasHtml = false;
          let hasTs = false;
          
          try {
            statSync(htmlFile);
            hasHtml = true;
          } catch {}
          
          try {
            statSync(tsFile);
            hasTs = true;
          } catch {}
          
          if (hasHtml || hasTs) {
            const routeName = basePath + item;
            const isDynamic = item.includes('[') && item.includes(']');
            
            // For dynamic routes, create a fallback entry
            let entryName = routeName === 'index' ? 'main' : routeName;
            
            if (isDynamic) {
              // Strip brackets for build output name
              entryName = entryName.replace(/\[|\.\.\.|(\])/g, '');
              entryName = entryName + '-dynamic';
            }
            
            // Prefer HTML file, fallback to generating from TS
            entries[entryName] = hasHtml ? htmlFile : tsFile;
            
            const routeType = isDynamic ? '🔄 Dynamic' : '📦 Static';
            console.log(`${routeType} entry: ${entryName} → ${entries[entryName]}`);
          }
          
          // Recursively scan subdirectories
          scanForEntries(itemPath, basePath + item + '/');
        }
      }
    } catch (error) {
      console.warn(`Could not scan build entries in ${dir}:`, error);
    }
  }
  
  scanForEntries(fullRoutesDir);
  return entries;
}