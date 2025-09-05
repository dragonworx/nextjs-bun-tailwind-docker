'use client'

import Link from 'next/link'

interface LinkItem {
  href: string
  label: string
  description?: string
}

interface LinkListProps {
  items: LinkItem[]
}

export default function LinkList({ items }: LinkListProps) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {items.map((item, index) => (
        <li key={index} style={{ marginBottom: '0.75rem' }}>
          <Link 
            href={item.href}
            style={{
              display: 'block',
              padding: '0.75rem',
              borderRadius: '6px',
              textDecoration: 'none',
              transition: 'background 0.2s',
              background: 'rgba(99, 102, 241, 0.05)',
              border: '1px solid rgba(99, 102, 241, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(99, 102, 241, 0.05)'
            }}
          >
            <div style={{ color: '#4f46e5', fontWeight: 500 }}>{item.label}</div>
            {item.description && (
              <div style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                {item.description}
              </div>
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}
