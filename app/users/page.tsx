import Header from '../components/Header'
import Card from '../components/Card'
import Link from 'next/link'

interface User {
  id: number
  name: string
  email: string
  role: string
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User' }
]

export default function UsersPage() {
  return (
    <>
      <Header />
      <main style={{ padding: '2rem', fontFamily: 'system-ui', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Users</h1>
        <p style={{ color: '#6b7280' }}>Click on any user to see their details (dynamic routing)</p>
        
        <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem' }}>
          {users.map(user => (
            <Link 
              key={user.id}
              href={`/users/${user.id}`}
              style={{ textDecoration: 'none' }}
            >
              <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ margin: '0 0 0.5rem 0', color: '#4f46e5' }}>{user.name}</h3>
                    <p style={{ margin: '0 0 0.25rem 0', color: '#6b7280' }}>{user.email}</p>
                    <span style={{
                      background: user.role === 'Admin' ? '#ef4444' : user.role === 'Moderator' ? '#f59e0b' : '#10b981',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      display: 'inline-block',
                      marginTop: '0.5rem'
                    }}>
                      {user.role}
                    </span>
                  </div>
                  <div style={{ color: '#9ca3af' }}>→</div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}