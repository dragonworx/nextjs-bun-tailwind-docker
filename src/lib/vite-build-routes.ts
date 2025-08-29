import { resolve } from 'path';
import { readdirSync, statSync } from 'fs';

/**
 * Dynamically discover route entry points for Vite build
 * This ensures production builds include all routes automatically
 */
export function getRouteEntries(routesDir: string = 'src/routes'): Record<string, string> {
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
            const entryName = routeName === 'index' ? 'main' : routeName;
            
            // Prefer HTML file, fallback to generating from TS
            entries[entryName] = hasHtml ? htmlFile : tsFile;
            
            console.log(`📦 Build entry: ${entryName} → ${entries[entryName]}`);
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