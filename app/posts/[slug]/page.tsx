import Header from '../../components/Header'
import Card from '../../components/Card'
import Link from 'next/link'

interface Post {
  slug: string
  title: string
  author: string
  date: string
  readTime: string
  content: string
}

const posts: Record<string, Post> = {
  'hello-world': {
    slug: 'hello-world',
    title: 'Hello World',
    author: 'John Doe',
    date: '2024-11-01',
    readTime: '3 min read',
    content: `Welcome to our new blog! This is our first post demonstrating the dynamic routing capabilities of Next.js.

    With dynamic routes, we can create SEO-friendly URLs that include meaningful slugs instead of numeric IDs.
    
    This makes our content more discoverable and our URLs more readable.`
  },
  'dynamic-routing-guide': {
    slug: 'dynamic-routing-guide',
    title: 'Dynamic Routing Guide',
    author: 'Jane Smith',
    date: '2024-11-15',
    readTime: '5 min read',
    content: `Dynamic routing allows you to create pages with parameters that can be filled at runtime.
    
    In Next.js, you can create dynamic routes by adding brackets to your page names:
    - [id] for single parameters
    - [slug] for SEO-friendly URLs
    - [...path] for catch-all routes
    
    This flexibility makes it easy to build scalable applications.`
  },
  'next-js-migration': {
    slug: 'next-js-migration',
    title: 'Next.js Migration',
    author: 'Bob Johnson',
    date: '2024-12-01',
    readTime: '8 min read',
    content: `We've successfully migrated from a custom Bun server with Vite to Next.js!
    
    Key benefits of this migration:
    - Built-in routing system
    - Server-side rendering capabilities
    - API routes
    - Optimized performance out of the box
    - Great developer experience
    
    The migration process was straightforward thanks to Next.js's excellent documentation.`
  }
}

export default function PostDetailPage({ params }: { params: { slug: string } }) {
  const post = posts[params.slug]

  if (!post) {
    return (
      <>
        <Header />
        <main style={{ padding: '2rem', fontFamily: 'system-ui', maxWidth: '800px', margin: '0 auto' }}>
          <h1>Post Not Found</h1>
          <p>No post found with slug: {params.slug}</p>
          <Link href="/" style={{ color: '#4f46e5' }}>← Back to Home</Link>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main style={{ padding: '2rem', fontFamily: 'system-ui', maxWidth: '800px', margin: '0 auto' }}>
        <Link href="/" style={{ color: '#4f46e5', textDecoration: 'none' }}>← Back to Home</Link>
        
        <article style={{ marginTop: '2rem' }}>
          <h1 style={{ marginBottom: '0.5rem' }}>{post.title}</h1>
          
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            color: '#6b7280', 
            fontSize: '0.875rem',
            marginBottom: '2rem'
          }}>
            <span>By {post.author}</span>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          <Card>
            <div style={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}>
              {post.content}
            </div>
          </Card>
        </article>

        <div style={{ marginTop: '2rem' }}>
          <Card variant="info">
            <p style={{ margin: 0 }}>
              This is a dynamic route. The URL parameter <code>[slug]</code> is: <strong>{params.slug}</strong>
            </p>
          </Card>
        </div>
      </main>
    </>
  )
}