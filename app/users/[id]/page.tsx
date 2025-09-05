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
        <main style={{ padding: '2rem', fontFamily: 'system-ui', maxWidth: '1200px', margin: '0 auto' }}>
          <h1>User Not Found</h1>
          <p>No user found with ID: {resolvedParams.id}</p>
          <Link href="/users" style={{ color: '#4f46e5' }}>← Back to Users</Link>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main style={{ padding: '2rem', fontFamily: 'system-ui', maxWidth: '1200px', margin: '0 auto' }}>
        <Link href="/users" style={{ color: '#4f46e5', textDecoration: 'none' }}>← Back to Users</Link>
        
        <h1 style={{ marginTop: '1rem' }}>User Details</h1>
        
        <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem' }}>
          <Card>
            <h2 style={{ marginTop: 0, color: '#4f46e5' }}>{user.name}</h2>
            <div style={{ display: 'grid', gap: '0.5rem', marginTop: '1rem' }}>
              <div><strong>Email:</strong> {user.email}</div>
              <div>
                <strong>Role:</strong>{' '}
                <span style={{
                  background: user.role === 'Admin' ? '#ef4444' : user.role === 'Moderator' ? '#f59e0b' : '#10b981',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  marginLeft: '0.5rem'
                }}>
                  {user.role}
                </span>
              </div>
              <div><strong>User ID:</strong> {user.id}</div>
              <div><strong>Joined:</strong> {user.joinDate}</div>
              <div><strong>Last Active:</strong> {user.lastActive}</div>
            </div>
          </Card>

          <Card variant="info">
            <h3 style={{ marginTop: 0 }}>Activity Statistics</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{user.posts}</div>
                <div style={{ opacity: 0.9 }}>Posts</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{user.comments}</div>
                <div style={{ opacity: 0.9 }}>Comments</div>
              </div>
            </div>
          </Card>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <p style={{ color: '#6b7280' }}>
            This is a dynamic route. The URL parameter <code>[id]</code> is: <strong>{resolvedParams.id}</strong>
          </p>
        </div>
      </main>
    </>
  )
}