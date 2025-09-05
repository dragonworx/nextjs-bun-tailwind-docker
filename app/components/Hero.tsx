'use client'

interface HeroProps {
  title: string
  subtitle?: string
}

export default function Hero({ title, subtitle }: HeroProps) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '3rem 2rem',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      marginBottom: '2rem'
    }}>
      <h1 style={{ margin: '0 0 1rem 0', fontSize: '2.5rem' }}>{title}</h1>
      {subtitle && (
        <p style={{ margin: 0, fontSize: '1.125rem', opacity: 0.9 }}>{subtitle}</p>
      )}
    </div>
  )
}
