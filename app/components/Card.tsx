'use client'

import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  variant?: 'default' | 'info' | 'success' | 'warning'
}

export default function Card({ children, variant = 'default' }: CardProps) {
  const getVariantClasses = () => {
    switch(variant) {
      case 'info':
        return 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-2xl shadow-purple-500/25 border border-white/10'
      case 'success':
        return 'bg-gradient-to-br from-emerald-400 to-cyan-500 text-white shadow-2xl shadow-emerald-500/25 border border-white/10'
      case 'warning':
        return 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-2xl shadow-amber-500/25 border border-white/10'
      default:
        return 'bg-white/80 backdrop-blur-sm text-gray-800 shadow-xl shadow-gray-500/10 border border-gray-200/50 hover:bg-white/90'
    }
  }

  const variantClasses = getVariantClasses()

  return (
    <div className={`relative ${variantClasses} p-6 sm:p-8 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group overflow-hidden`}>
      {/* Animated background elements for default cards */}
      {variant === 'default' && (
        <>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-8 -translate-y-8"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-100/50 to-pink-100/50 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-4 translate-y-4"></div>
        </>
      )}
      
      {/* Animated background elements for colored cards */}
      {variant !== 'default' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 -translate-y-4"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/15 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-2 translate-y-2"></div>
        </>
      )}
      
      {/* Card border glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Bottom accent line */}
      {variant === 'default' && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}
    </div>
  )
}
