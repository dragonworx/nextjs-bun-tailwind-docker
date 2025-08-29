import { Plugin } from 'vite';
import { readFileSync } from 'fs';
import { resolve } from 'path';

/**
 * Vite plugin to import .html files as strings
 * Usage: import template from './component.html?raw';
 */
export function htmlStringPlugin(): Plugin {
  return {
    name: 'vite-plugin-html-string',
    transform(code, id) {
      // Handle .html imports with ?raw query
      if (id.endsWith('.html?raw')) {
        const filePath = id.replace('?raw', '');
        const content = readFileSync(filePath, 'utf-8');
        
        // Export the HTML content as a string
        return {
          code: `export default ${JSON.stringify(content)};`,
          map: null
        };
      }
      
      // Handle .html imports without query (for better DX)
      if (id.endsWith('.html') && !id.includes('.html?')) {
        const content = readFileSync(id, 'utf-8');
        
        return {
          code: `export default ${JSON.stringify(content)};`,
          map: null
        };
      }
      
      return null;
    }
  };
}