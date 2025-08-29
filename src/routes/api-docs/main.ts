console.log('API Documentation page loaded');

// Simple example of a TypeScript-only route
document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = `
      <div style="font-family: system-ui; max-width: 800px; margin: 0 auto; padding: 2rem;">
        <h1>API Documentation</h1>
        <p>This is an example route created using file-based routing.</p>
        <h2>Available Endpoints:</h2>
        <ul>
          <li><code>GET /api/stats</code> - Server statistics</li>
          <li><code>GET /api/health</code> - Health check</li>
        </ul>
        <p><a href="/dashboard">← Back to Dashboard</a></p>
      </div>
    `;
  }
});