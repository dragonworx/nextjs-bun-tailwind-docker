import Header from '../../components/Header'
import Card from '../../components/Card'
import Link from 'next/link'

interface User {
  id: number
  name: string
  email: string
  role: string
  joinDate: string
  lastActive: string
  posts: number
  comments: number
}

const users: Record<string, User> = {
  '1': { 
    id: 1, 
    name: 'John Doe', 
    email: 'john@example.com', 
    role: 'Admin',
    joinDate: '2024-01-15',
    lastActive: '2024-12-01',
    posts: 42,
    comments: 156
  },
  '2': { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane@example.com', 
    role: 'User',
    joinDate: '2024-02-20',
    lastActive: '2024-12-02',
    posts: 18,
    comments: 89
  },
  '3': { 
    id: 3, 
    name: 'Bob Johnson', 
    email: 'bob@example.com', 
    role: 'Moderator',
    joinDate: '2024-01-01',
    lastActive: '2024-11-30',
    posts: 67,
    comments: 234
  },
  '4': { 
    id: 4, 
    name: 'Alice Brown', 
    email: 'alice@example.com', 
    role: 'User',
    joinDate: '2024-03-10',
    lastActive: '2024-12-01',
    posts: 9,
    comments: 45
  },
  '5': { 
    id: 5, 
    name: 'Charlie Wilson', 
    email: 'charlie@example.com', 
    role: 'User',
    joinDate: '2024-04-05',
    lastActive: '2024-11-28',
    posts: 3,
    comments: 12
  }
}

export default async function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const user = users[resolvedParams.id]

  if (!user) {
    return (
      <>
        <Header />
        <main className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-6 sm:px-8 py-12 font-sans">
          <div className="max-w-5xl mx-auto">
            <Card variant="warning">
              <div className="text-center py-8">
                <div className="text-6xl mb-6">👤</div>
                <h1 className="text-3xl font-bold text-white mb-4">User Not Found</h1>
                <p className="text-white/90 text-lg mb-8">No user found with ID: <code className="bg-white/20 px-2 py-1 rounded font-mono">{resolvedParams.id}</code></p>
                <Link href="/users" className="inline-flex items-center gap-2 text-white bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 border border-white/30">
                  <span className="text-xl">←</span>
                  Back to Users
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

        <div className="relative max-w-5xl mx-auto">
          <Link href="/users" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold text-lg mb-8 group transition-all duration-200 hover:scale-105">
            <span className="text-xl group-hover:transform group-hover:-translate-x-1 transition-transform duration-200">←</span>
            Back to Users
          </Link>
          
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
              User Details
            </h1>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="mt-0 mb-2 text-3xl font-bold text-indigo-600">{user.name}</h2>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                        user.role === 'Admin' ? 'bg-red-100 text-red-700' : 
                        user.role === 'Moderator' ? 'bg-amber-100 text-amber-700' : 
                        'bg-emerald-100 text-emerald-700'
                      }`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          user.role === 'Admin' ? 'bg-red-400' : 
                          user.role === 'Moderator' ? 'bg-amber-400' : 
                          'bg-emerald-400'
                        }`}></div>
                        {user.role}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                    <span className="text-xl">📧</span>
                    <div>
                      <div className="text-sm font-medium text-gray-600">Email</div>
                      <div className="font-semibold text-gray-800">{user.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                    <span className="text-xl">🆔</span>
                    <div>
                      <div className="text-sm font-medium text-gray-600">User ID</div>
                      <div className="font-semibold text-gray-800">#{user.id}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-lg border border-emerald-100">
                    <span className="text-xl">📅</span>
                    <div>
                      <div className="text-sm font-medium text-gray-600">Joined</div>
                      <div className="font-semibold text-gray-800">{user.joinDate}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-100">
                    <span className="text-xl">⚡</span>
                    <div>
                      <div className="text-sm font-medium text-gray-600">Last Active</div>
                      <div className="font-semibold text-gray-800">{user.lastActive}</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card variant="info">
                <h3 className="mt-0 mb-6 text-2xl font-bold text-white flex items-center gap-2">
                  <span className="text-2xl">📊</span>
                  Activity Stats
                </h3>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                    <div className="text-4xl font-black text-yellow-300 mb-2">{user.posts}</div>
                    <div className="text-white/90 font-semibold">Posts Created</div>
                  </div>
                  <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                    <div className="text-4xl font-black text-yellow-300 mb-2">{user.comments}</div>
                    <div className="text-white/90 font-semibold">Comments Made</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="mt-12">
            <Card variant="success">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🚀</span>
                <p className="m-0 text-white/95 text-lg">
                  This is a dynamic route. The URL parameter <code className="bg-white/20 px-2 py-1 rounded font-mono text-yellow-300">[id]</code> is: <strong className="text-yellow-300">{resolvedParams.id}</strong>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </>
  )
}