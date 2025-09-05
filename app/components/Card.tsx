'use client'

import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  variant?: 'default' | 'info' | 'success' | 'warning'
}

export default function Card({ children, variant = 'default' }: CardProps) {
  const getVariantStyles = () => {
    switch(variant) {
      case 'info':
        return {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }
      case 'success':
        return {
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white'
        }
      case 'warning':
        return {
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          color: 'white'
        }
      default:
        return {
          background: 'white',
          color: '#1f2937'
        }
    }
  }

  const styles = getVariantStyles()

  return (
    <div style={{
      ...styles,
      padding: '1.5rem',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s',
    }}>
      {children}
    </div>
  )
}
