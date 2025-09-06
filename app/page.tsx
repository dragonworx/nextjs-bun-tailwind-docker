import Hero from './components/Hero'
import Card from './components/Card'
import LinkList from './components/LinkList'
import Header from './components/Header'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8 py-8 font-sans overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl animate-ping [animation-duration:4s]"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <Hero 
            title="Welcome to Dynamic Routing Demo"
            subtitle="This application demonstrates file-based routing with dynamic parameters."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10 mt-16">
            <Card>
              <div className="relative">
                <h3 className="text-2xl font-bold text-gray-800 mt-0 mb-4 flex items-center gap-3 group">
                  <div className="relative">
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300">📁</span>
                    <div className="absolute -inset-2 bg-blue-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <span className="group-hover:text-blue-600 transition-colors duration-300">Static Routes</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent ml-4"></div>
                </h3>
                <LinkList items={[
                  { href: '/dashboard', label: 'Dashboard', description: 'Regular static route' },
                  { href: '/api-docs', label: 'API Documentation', description: 'API reference guide' }
                ]} />
              </div>
            </Card>

            <Card>
              <div className="relative">
                <h3 className="text-2xl font-bold text-gray-800 mt-0 mb-4 flex items-center gap-3 group">
                  <div className="relative">
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300">👥</span>
                    <div className="absolute -inset-2 bg-purple-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <span className="group-hover:text-purple-600 transition-colors duration-300">Dynamic User Routes</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-purple-200 to-transparent ml-4"></div>
                </h3>
                <div className="mb-6 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200/50">
                  <p className="text-gray-600 text-sm font-mono flex items-center gap-2">
                    <span className="text-purple-500 font-bold">Pattern:</span>
                    <code className="bg-white px-2 py-1 rounded text-indigo-600 font-semibold border border-indigo-200">/users/[id]</code>
                  </p>
                </div>
                <LinkList items={[
                  { href: '/users', label: 'Users List', description: 'View all users' },
                  { href: '/users/1', label: 'User #1', description: 'Dynamic user details' },
                  { href: '/users/2', label: 'User #2', description: 'Another user' }
                ]} />
              </div>
            </Card>

            <Card>
              <div className="relative">
                <h3 className="text-2xl font-bold text-gray-800 mt-0 mb-4 flex items-center gap-3 group">
                  <div className="relative">
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300">📝</span>
                    <div className="absolute -inset-2 bg-emerald-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <span className="group-hover:text-emerald-600 transition-colors duration-300">Blog Posts with Slugs</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-emerald-200 to-transparent ml-4"></div>
                </h3>
                <div className="mb-6 p-3 bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-xl border border-emerald-200/50">
                  <p className="text-gray-600 text-sm font-mono flex items-center gap-2">
                    <span className="text-emerald-500 font-bold">Pattern:</span>
                    <code className="bg-white px-2 py-1 rounded text-indigo-600 font-semibold border border-indigo-200">/posts/[slug]</code>
                  </p>
                </div>
                <LinkList items={[
                  { href: '/posts/hello-world', label: 'Hello World', description: 'First blog post' },
                  { href: '/posts/dynamic-routing-guide', label: 'Dynamic Routing Guide', description: 'Technical guide' },
                  { href: '/posts/next-js-migration', label: 'Next.js Migration', description: 'Migration overview' }
                ]} />
              </div>
            </Card>
          </div>

          <div className="mt-20">
            <Card variant="info">
              <h3 className="text-2xl font-bold text-white mt-0 mb-6 flex items-center gap-3">
                <span className="text-3xl">🚀</span> Features Demonstrated
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <strong className="text-yellow-300 text-lg">[id]</strong>
                  <p className="text-white/90 mt-1">Single parameter capture (e.g., user IDs)</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <strong className="text-yellow-300 text-lg">[slug]</strong>
                  <p className="text-white/90 mt-1">SEO-friendly URL slugs</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <strong className="text-yellow-300 text-lg">API Routes</strong>
                  <p className="text-white/90 mt-1">Next.js API endpoints</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <strong className="text-yellow-300 text-lg">Server Components</strong>
                  <p className="text-white/90 mt-1">React Server Components</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm sm:col-span-2">
                  <strong className="text-yellow-300 text-lg">File-based routing</strong>
                  <p className="text-white/90 mt-1">Routes discovered from folder structure</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </>
  )
}
