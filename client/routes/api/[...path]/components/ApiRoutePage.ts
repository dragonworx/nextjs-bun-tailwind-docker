import { TemplateComponent } from '@lib/components/TemplateComponent';
import { Hero } from '@lib/components/Hero';
import { Card } from '@lib/components/Card';
import { CodeBlock } from '@lib/components/CodeBlock';
import { LinkList } from '@lib/components/LinkList';
import { useParam } from '@lib/router';

interface ApiInfo {
  version: string;
  resource: string;
  action: string;
  id: string | null;
  fullPath: string;
}

interface ApiRoutePageState {
  apiInfo: ApiInfo;
  path: string;
  initialized: boolean;
}

export class ApiRoutePage extends TemplateComponent<HTMLDivElement, ApiRoutePageState> {
  private hero: Hero;
  private requestDetailsCard: Card;
  private exampleRoutesCard: Card;
  private infoCard: Card;
  private backLinks: LinkList;

  constructor() {
    super('', 'div');
    this.setState({ 
      apiInfo: { version: 'unknown', resource: 'unknown', action: 'unknown', id: null, fullPath: '' },
      path: '',
      initialized: false 
    });
  }

  protected processTemplate(template: string): string {
    return `
      <div style="padding: 2rem; font-family: 'Courier New', monospace; background: #1e1e1e; color: #d4d4d4; min-height: 100vh;">
        <div id="hero-container"></div>
        <div id="request-details"></div>
        <div id="example-routes"></div>
        <div id="info-card"></div>
        <div id="back-links"></div>
      </div>
    `;
  }

  protected onMount(): void {
    this.loadApiData();
  }

  private loadApiData(): void {
    const path = useParam('path') || '';
    const segments = path.split('/').filter(Boolean);
    
    const apiInfo: ApiInfo = {
      version: segments[0] || 'unknown',
      resource: segments[1] || 'unknown', 
      action: segments[2] || 'unknown',
      id: segments[3] || null,
      fullPath: path
    };

    this.setState({ apiInfo, path });
    this.initializeComponents(apiInfo, path);
  }

  private initializeComponents(apiInfo: ApiInfo, path: string): void {
    // Hero component with terminal style
    this.hero = new Hero(
      'API Route Handler',
      '// Catch-all route demonstration using [...path] parameter'
    );
    this.hero.mount('#hero-container');

    // Request details with code block
    const requestDetailsCode = new CodeBlock(
      JSON.stringify({
        version: apiInfo.version,
        resource: apiInfo.resource,
        action: apiInfo.action,
        id: apiInfo.id
      }, null, 2),
      'json',
      'Parsed Segments'
    );

    const requestDetailsContent = `
      <h2 style="color: #dcdcaa; margin-top: 0;">Request Details</h2>
      
      <div style="margin: 1rem 0;">
        <span style="color: #9cdcfe;">URL Path:</span>
        <span style="color: #ce9178;"> "/api/${path}"</span>
      </div>
      
      <div style="margin: 1rem 0;">
        <span style="color: #9cdcfe;">Captured Path:</span>
        <span style="color: #ce9178;"> "${path || '(empty)'}"</span>
      </div>
      
      ${requestDetailsCode.element.outerHTML}
    `;

    this.requestDetailsCard = new Card(requestDetailsContent, undefined, 'terminal');
    this.requestDetailsCard.mount('#request-details');

    // Example API routes
    const exampleRoutesList = new LinkList([
      { href: '/api/v1/users/list', label: 'GET /api/v1/users/list', description: '// List all users' },
      { href: '/api/v1/users/get/123', label: 'GET /api/v1/users/get/123', description: '// Get user by ID' },
      { href: '/api/v2/posts/recent', label: 'GET /api/v2/posts/recent', description: '// Get recent posts (v2 API)' },
      { href: '/api/v1/analytics/dashboard/weekly/2024', label: 'GET /api/v1/analytics/dashboard/weekly/2024', description: '// Complex nested path' },
      { href: '/api/health', label: 'GET /api/health', description: '// Health check endpoint' }
    ], 'Example API Routes', 'terminal');

    const exampleContent = `
      <h2 style="color: #dcdcaa; margin-top: 0;">Example API Routes</h2>
      <p style="color: #608b4e;">// Click to navigate to different API endpoints</p>
      ${exampleRoutesList.element.outerHTML}
    `;

    this.exampleRoutesCard = new Card(exampleContent, undefined, 'terminal');
    this.exampleRoutesCard.mount('#example-routes');

    // Info card
    this.infoCard = new Card(
      `<p style="margin: 0; color: #d7ba7d;">
        ⚡ The [...path] parameter captures everything after /api/ allowing unlimited path depth.
        <br>This is useful for proxy routes, API gateways, or handling legacy URLs.
      </p>`,
      undefined,
      'info'
    );
    this.infoCard.mount('#info-card');

    // Back links
    this.backLinks = new LinkList([
      { href: '/', label: '← Back to Home' },
      { href: '/users', label: 'Users Demo' },
      { href: '/posts/hello-world', label: 'Posts Demo' }
    ], '', 'terminal');
    this.backLinks.mount('#back-links');

    this.setState({ initialized: true });
  }

  protected onUnmount(): void {
    this.hero?.unmount();
    this.requestDetailsCard?.unmount();
    this.exampleRoutesCard?.unmount();
    this.infoCard?.unmount();
    this.backLinks?.unmount();
  }
}