import { NextResponse } from 'next/server'

// Track server stats
const serverStats = {
  startTime: Date.now(),
  requests: 0,
  connections: 0,
  avgResponseTime: 0,
}

export async function GET() {
  serverStats.requests++
  const uptime = Math.floor((Date.now() - serverStats.startTime) / 1000)
  
  return NextResponse.json({
    uptime,
    requests: serverStats.requests,
    connections: serverStats.connections,
    responseTime: Math.round(serverStats.avgResponseTime),
  })
}