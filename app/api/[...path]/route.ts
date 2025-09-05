import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { path: string[] } }
) {
  const path = params.path?.join('/') || ''
  
  return NextResponse.json({ 
    message: "Hello from Next.js API!",
    path: `/api/${path}`,
    timestamp: new Date().toISOString(),
  })
}

export async function POST(
  request: Request,
  { params }: { params: { path: string[] } }
) {
  const path = params.path?.join('/') || ''
  const body = await request.json()
  
  return NextResponse.json({ 
    message: "POST request received",
    path: `/api/${path}`,
    body,
    timestamp: new Date().toISOString(),
  })
}