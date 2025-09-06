'use client'

import React, { useState, useEffect } from 'react'
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
    <nav className="relative bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 backdrop-blur-md px-4 sm:px-8 py-4 shadow-2xl border-b border-white/10 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-pulse"></div>
      <div className="absolute -top-2 -left-4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl animate-bounce"></div>
      <div className="absolute -top-2 -right-4 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-bounce [animation-delay:1s]"></div>
      
      <div className="relative max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-4 group">
          <div className="text-white text-xl sm:text-2xl font-black flex items-center gap-3 group-hover:scale-105 transition-transform duration-300">
            <span className="text-2xl sm:text-3xl animate-bounce">🚀</span>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              Fantoccini 3D
              <img src='/bike.jpg' alt="Bike" className="inline-block w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover ml-2" />
            </span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping ml-2"></div>
          </div>
        </div>
        
        <nav className="flex gap-1 sm:gap-2 flex-wrap items-center">
          {routes.map((route, index) => {
            const isActive = pathname === route.path || 
                           (route.path !== '/' && pathname.startsWith(route.path.split('/[')[0]))
            
            return (
              <Link
                key={route.path}
                href={route.path}
                className={`relative text-white no-underline px-3 sm:px-4 py-2 sm:py-3 transition-all duration-300 rounded-xl inline-flex items-center gap-2 font-medium text-sm sm:text-base group overflow-hidden ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-500/40 to-purple-500/40 backdrop-blur-sm border border-white/30 shadow-xl shadow-purple-500/25 scale-105' 
                    : 'hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5 hover:scale-105'
                }`}
                style={{'--animation-delay': `${index * 0.1}s`} as React.CSSProperties}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className={`text-lg transition-transform duration-300 group-hover:scale-110 ${isActive ? 'animate-bounce' : ''}`}>
                  {getRouteIcon(route.type)}
                </span>
                <span className="hidden sm:inline relative z-10">{route.label}</span>
                {isActive && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 animate-pulse"></div>}
              </Link>
            )
          })}
        </nav>
      </div>
    </nav>
  )
}
