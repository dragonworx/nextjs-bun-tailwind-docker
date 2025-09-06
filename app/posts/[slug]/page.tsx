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

export default async function PostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const post = posts[resolvedParams.slug]

  if (!post) {
    return (
      <>
        <Header />
        <main className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-6 sm:px-8 py-12 font-sans">
          <div className="max-w-4xl mx-auto">
            <Card variant="warning">
              <div className="text-center py-8">
                <div className="text-6xl mb-6">📝</div>
                <h1 className="text-3xl font-bold text-white mb-4">Post Not Found</h1>
                <p className="text-white/90 text-lg mb-8">No post found with slug: <code className="bg-white/20 px-2 py-1 rounded font-mono">{resolvedParams.slug}</code></p>
                <Link href="/" className="inline-flex items-center gap-2 text-white bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 border border-white/30">
                  <span className="text-xl">←</span>
                  Back to Home
                </Link>
              </div>
            </Card>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-6 sm:px-8 py-12 font-sans">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold text-lg mb-8 group transition-all duration-200 hover:scale-105">
            <span className="text-xl group-hover:transform group-hover:-translate-x-1 transition-transform duration-200">←</span>
            Back to Home
          </Link>
          
          <article className="space-y-8">
            <div className="text-center space-y-4 mb-12">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap justify-center items-center gap-4 text-gray-600 text-base">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {post.author.charAt(0)}
                  </div>
                  <span className="font-medium">By {post.author}</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="flex items-center gap-1">
                  <span>📅</span>
                  {post.date}
                </span>
                <span className="text-gray-400">•</span>
                <span className="flex items-center gap-1">
                  <span>⏱️</span>
                  {post.readTime}
                </span>
              </div>
            </div>

            <Card>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                {post.content}
              </div>
            </Card>
          </article>

          <div className="mt-12">
            <Card variant="info">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🚀</span>
                <p className="m-0 text-white/95 text-lg">
                  This is a dynamic route. The URL parameter <code className="bg-white/20 px-2 py-1 rounded font-mono text-yellow-300">[slug]</code> is: <strong className="text-yellow-300">{resolvedParams.slug}</strong>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </>
  )
}