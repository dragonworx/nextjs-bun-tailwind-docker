import Header from '../components/Header'
import Card from '../components/Card'

export default function ApiDocsPage() {
  return (
    <>
      <Header />
      <main style={{ padding: '2rem', fontFamily: 'system-ui', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>API Documentation</h1>
        
        <div style={{ display: 'grid', gap: '1.5rem', marginTop: '2rem' }}>
          <Card>
            <h2 style={{ marginTop: 0, color: '#4f46e5' }}>GET /api/routes</h2>
            <p>Returns a list of all available routes in the application.</p>
            <h4>Response:</h4>
            <pre style={{ 
              background: '#f3f4f6', 
              padding: '1rem', 
              borderRadius: '4px',
              overflow: 'auto'
            }}>
{`{
  "routes": [
    {
      "path": "/",
      "label": "Home",
      "type": "static"
    },
    // ... more routes
  ],
  "timestamp": "2024-12-01T00:00:00.000Z"
}`}
            </pre>
          </Card>

          <Card>
            <h2 style={{ marginTop: 0, color: '#4f46e5' }}>GET /api/stats</h2>
            <p>Returns server statistics including uptime and request counts.</p>
            <h4>Response:</h4>
            <pre style={{ 
              background: '#f3f4f6', 
              padding: '1rem', 
              borderRadius: '4px',
              overflow: 'auto'
            }}>
{`{
  "uptime": 3600,
  "requests": 150,
  "connections": 5,
  "responseTime": 25
}`}
            </pre>
          </Card>

          <Card>
            <h2 style={{ marginTop: 0, color: '#4f46e5' }}>GET /api/[...path]</h2>
            <p>Catch-all API endpoint that handles any API path.</p>
            <h4>Parameters:</h4>
            <ul>
              <li><code>path</code> - Dynamic path segments</li>
            </ul>
            <h4>Response:</h4>
            <pre style={{ 
              background: '#f3f4f6', 
              padding: '1rem', 
              borderRadius: '4px',
              overflow: 'auto'
            }}>
{`{
  "message": "Hello from Next.js API!",
  "path": "/api/your/path/here",
  "timestamp": "2024-12-01T00:00:00.000Z"
}`}
            </pre>
          </Card>

          <Card>
            <h2 style={{ marginTop: 0, color: '#4f46e5' }}>POST /api/[...path]</h2>
            <p>Accepts POST requests to any API path with JSON body.</p>
            <h4>Request Body:</h4>
            <pre style={{ 
              background: '#f3f4f6', 
              padding: '1rem', 
              borderRadius: '4px',
              overflow: 'auto'
            }}>
{`{
  "any": "json",
  "data": "here"
}`}
            </pre>
            <h4>Response:</h4>
            <pre style={{ 
              background: '#f3f4f6', 
              padding: '1rem', 
              borderRadius: '4px',
              overflow: 'auto'
            }}>
{`{
  "message": "POST request received",
  "path": "/api/your/path",
  "body": { /* your request body */ },
  "timestamp": "2024-12-01T00:00:00.000Z"
}`}
            </pre>
          </Card>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <Card variant="info">
            <h3 style={{ marginTop: 0 }}>Testing the API</h3>
            <p>You can test these endpoints using tools like:</p>
            <ul>
              <li><strong>curl</strong> - Command line tool</li>
              <li><strong>Postman</strong> - GUI API testing tool</li>
              <li><strong>Browser DevTools</strong> - Network tab for GET requests</li>
            </ul>
            <p>Example curl command:</p>
            <pre style={{ 
              background: 'rgba(255,255,255,0.1)', 
              padding: '0.5rem', 
              borderRadius: '4px',
              overflow: 'auto'
            }}>
              curl http://localhost:3000/api/stats
            </pre>
          </Card>
        </div>
      </main>
    </>
  )
}