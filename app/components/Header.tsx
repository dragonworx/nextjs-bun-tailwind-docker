'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Route {
  path: string
  label: string
  type: 'static' | 'dynamic' | 'api'
}

export default function Header() {
  const pathname = usePathname()
  const [routes, setRoutes] = useState<Route[]>([
    { path: '/', label: 'Home', type: 'static' },
    { path: '/dashboard', label: 'Dashboard', type: 'static' },
    { path: '/users', label: 'Users', type: 'static' },
    { path: '/users/1', label: 'User Demo', type: 'dynamic' },
    { path: '/posts/hello-world', label: 'Blog Demo', type: 'dynamic' },
    { path: '/api-docs', label: 'API Docs', type: 'static' }
  ])

  useEffect(() => {
    fetch('/api/routes')
      .then(res => res.json())
      .then(data => {
        if (data && data.routes) {
          // Filter out dynamic routes that contain brackets, as they can't be used directly as hrefs
          const navigationRoutes = data.routes.filter((route: Route) => 
            !route.path.includes('[') && !route.path.includes(']')
          )
          setRoutes(navigationRoutes)
        }
      })
      .catch(err => console.log('Failed to fetch routes:', err))
  }, [])

  const getRouteIcon = (type: string) => {
    switch(type) {
      case 'dynamic': return '🔄'
      case 'api': return '🔌'
      default: return '📁'
    }
  }

  return (
    <nav style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '1rem 2rem',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ color: 'white', fontSize: '1.25rem', fontWeight: 'bold' }}>
            🚀 Fantoccini 3D
          </div>
        </div>
        
        <nav style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {routes.map(route => {
            const isActive = pathname === route.path || 
                           (route.path !== '/' && pathname.startsWith(route.path.split('/[')[0]))
            
            return (
              <Link
                key={route.path}
                href={route.path}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  padding: '0.5rem 1rem',
                  transition: 'background 0.2s',
                  borderRadius: '6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: isActive ? 'rgba(255,255,255,0.2)' : 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent'
                  }
                }}
              >
                <span style={{ fontSize: '0.875rem', opacity: 0.8 }}>{getRouteIcon(route.type)}</span>
                {route.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </nav>
  )
}