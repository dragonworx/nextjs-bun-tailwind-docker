import Hero from './components/Hero'
import Card from './components/Card'
import LinkList from './components/LinkList'
import Header from './components/Header'

export default function HomePage() {
  return (
    <>
      <Header />
      <main style={{ padding: '2rem', fontFamily: 'system-ui', maxWidth: '1200px', margin: '0 auto' }}>
        <Hero 
          title="Welcome to Dynamic Routing Demo"
          subtitle="This application demonstrates file-based routing with dynamic parameters."
        />
        
        <div style={{ display: 'grid', gap: '1.5rem', marginTop: '2rem' }}>
          <Card>
            <h3 style={{ marginTop: 0 }}>📁 Static Routes</h3>
            <LinkList items={[
              { href: '/dashboard', label: 'Dashboard', description: 'Regular static route' },
              { href: '/api-docs', label: 'API Documentation', description: 'API reference guide' }
            ]} />
          </Card>

          <Card>
            <h3 style={{ marginTop: 0 }}>👥 Dynamic User Routes</h3>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Pattern: <code>/users/[id]</code></p>
            <LinkList items={[
              { href: '/users', label: 'Users List', description: 'View all users' },
              { href: '/users/1', label: 'User #1', description: 'Dynamic user details' },
              { href: '/users/2', label: 'User #2', description: 'Another user' }
            ]} />
          </Card>

          <Card>
            <h3 style={{ marginTop: 0 }}>📝 Blog Posts with Slugs</h3>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Pattern: <code>/posts/[slug]</code></p>
            <LinkList items={[
              { href: '/posts/hello-world', label: 'Hello World', description: 'First blog post' },
              { href: '/posts/dynamic-routing-guide', label: 'Dynamic Routing Guide', description: 'Technical guide' },
              { href: '/posts/next-js-migration', label: 'Next.js Migration', description: 'Migration overview' }
            ]} />
          </Card>
        </div>

        <div style={{ marginTop: '3rem' }}>
          <Card variant="info">
            <h3 style={{ marginTop: 0 }}>🚀 Features Demonstrated</h3>
            <ul>
              <li><strong>[id]</strong> - Single parameter capture (e.g., user IDs)</li>
              <li><strong>[slug]</strong> - SEO-friendly URL slugs</li>
              <li><strong>API Routes</strong> - Next.js API endpoints</li>
              <li><strong>Server Components</strong> - React Server Components</li>
              <li><strong>File-based routing</strong> - Routes discovered from folder structure</li>
            </ul>
          </Card>
        </div>
      </main>
    </>
  )
}