'use client'

import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Card from '../components/Card'

interface ServerStats {
  uptime: number
  requests: number
  connections: number
  responseTime: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<ServerStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats')
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }

    void fetchStats()
    const interval = setInterval(fetchStats, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours}h ${minutes}m ${secs}s`
  }

  return (
    <>
      <Header />
      <main style={{ padding: '2rem', fontFamily: 'system-ui', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Server Dashboard</h1>
        
        {loading ? (
          <p>Loading stats...</p>
        ) : stats ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <Card>
              <h3 style={{ marginTop: 0, color: '#4f46e5' }}>⏱️ Uptime</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
                {formatUptime(stats.uptime)}
              </p>
            </Card>

            <Card>
              <h3 style={{ marginTop: 0, color: '#4f46e5' }}>📊 Total Requests</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
                {stats.requests}
              </p>
            </Card>

            <Card>
              <h3 style={{ marginTop: 0, color: '#4f46e5' }}>🔗 Active Connections</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
                {stats.connections}
              </p>
            </Card>

            <Card>
              <h3 style={{ marginTop: 0, color: '#4f46e5' }}>⚡ Avg Response Time</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
                {stats.responseTime}ms
              </p>
            </Card>
          </div>
        ) : (
          <p>Failed to load statistics</p>
        )}

        <div style={{ marginTop: '2rem' }}>
          <Card variant="info">
            <h3 style={{ marginTop: 0 }}>API Endpoints</h3>
            <ul>
              <li><code>/api/stats</code> - Server statistics</li>
              <li><code>/api/routes</code> - Available routes</li>
              <li><code>/api/[...path]</code> - Catch-all API handler</li>
            </ul>
          </Card>
        </div>
      </main>
    </>
  )
}
