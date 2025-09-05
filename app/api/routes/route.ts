import { NextResponse } from 'next/server'
import { readdir, stat } from 'fs/promises'
import { join } from 'path'

interface Route {
  path: string
  label: string
  type: 'static' | 'dynamic' | 'api'
}

async function scanDirectory(dir: string, basePath = ''): Promise<Route[]> {
  const routes: Route[] = []
  
  try {
    const entries = await readdir(dir)
    
    for (const entry of entries) {
      const fullPath = join(dir, entry)
      const stats = await stat(fullPath)
      
      if (stats.isDirectory()) {
        const routePath = `${basePath}/${entry}`
        
        // Check if this directory has a page.tsx or route.ts
        try {
          const dirEntries = await readdir(fullPath)
          const hasPage = dirEntries.includes('page.tsx') || dirEntries.includes('page.js')
          const hasRoute = dirEntries.includes('route.ts') || dirEntries.includes('route.js')
          
          if (hasPage) {
            const isDynamic = entry.includes('[') && entry.includes(']')
            const isApi = routePath.startsWith('/api')
            
            routes.push({
              path: routePath,
              label: generateLabel(entry, isDynamic),
              type: isApi ? 'api' : (isDynamic ? 'dynamic' : 'static')
            })
          }
          
          if (hasRoute && routePath.startsWith('/api')) {
            const isDynamic = entry.includes('[') && entry.includes(']')
            routes.push({
              path: routePath,
              label: generateLabel(entry, isDynamic),
              type: isDynamic ? 'api' : 'api'
            })
          }
          
          // Recursively scan subdirectories
          const subRoutes = await scanDirectory(fullPath, routePath)
          routes.push(...subRoutes)
          
        } catch (err) {
          // Skip directories we can't read
          continue
        }
      }
    }
  } catch (err) {
    // Skip directories we can't read
  }
  
  return routes
}

function generateLabel(segment: string, isDynamic: boolean): string {
  if (segment === '') return 'Home'
  
  // Handle dynamic segments
  if (isDynamic) {
    if (segment === '[id]') return 'Details'
    if (segment === '[slug]') return 'Post'
    if (segment === '[...path]') return 'Gateway'
    return segment.replace(/\[|\]/g, '').replace(/\.\.\./g, '')
  }
  
  // Convert kebab-case to Title Case
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export async function GET() {
  try {
    const appDir = join(process.cwd(), 'app')
    const discoveredRoutes = await scanDirectory(appDir)
    
    // Always include root route
    const routes: Route[] = [
      { path: '/', label: 'Home', type: 'static' },
      ...discoveredRoutes.filter(route => route.path !== '/')
    ]
    
    // Sort routes for consistent output
    routes.sort((a, b) => {
      // API routes last
      if (a.path.startsWith('/api') && !b.path.startsWith('/api')) return 1
      if (!a.path.startsWith('/api') && b.path.startsWith('/api')) return -1
      return a.path.localeCompare(b.path)
    })
    
    return NextResponse.json({ 
      routes,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to discover routes',
      routes: [{ path: '/', label: 'Home', type: 'static' }],
      timestamp: new Date().toISOString(),
    }, { status: 500 })
  }
}