import { TemplateComponent } from '@lib/components/TemplateComponent';
import { Hero } from '@lib/components/Hero';
import { Card } from '@lib/components/Card';
import { LinkList } from '@lib/components/LinkList';

interface ApiDocsPageState {
  initialized: boolean;
}

export class ApiDocsPage extends TemplateComponent<HTMLDivElement, ApiDocsPageState> {
  private hero: Hero;
  private endpointsCard: Card;
  private dynamicRoutesCard: Card;
  private backLink: LinkList;

  constructor() {
    super('', 'div');
    this.setState({ initialized: false });
  }

  protected processTemplate(template: string): string {
    return `
      <div style="font-family: system-ui; max-width: 800px; margin: 0 auto; padding: 2rem;">
        <div id="hero-container"></div>
        <div id="endpoints-container"></div>
        <div id="dynamic-routes-container"></div>
        <div id="back-link-container"></div>
      </div>
    `;
  }

  protected onMount(): void {
    this.initializeComponents();
  }

  private initializeComponents(): void {
    // Hero component
    this.hero = new Hero('API Documentation', 'This is an example route created using file-based routing.');
    this.hero.mount('#hero-container');

    // Available endpoints
    const endpointsList = new LinkList([
      { href: '#', label: 'GET /api/routes', description: 'List all available routes' },
      { href: '#', label: 'GET /api/stats', description: 'Server statistics' },
      { href: '#', label: 'GET /api/health', description: 'Health check' }
    ], 'Available Endpoints:');
    
    this.endpointsCard = new Card(endpointsList.element.outerHTML);
    this.endpointsCard.mount('#endpoints-container');

    // Dynamic route examples
    const dynamicRoutesList = new LinkList([
      { href: '/users/1', label: 'GET /users/[id]', description: 'User details by ID' },
      { href: '/posts/hello-world', label: 'GET /posts/[slug]', description: 'Blog post by slug' },
      { href: '/api/v1/users/list', label: 'GET /api/[...path]', description: 'Catch-all API gateway' }
    ], 'Dynamic Route Examples:');
    
    this.dynamicRoutesCard = new Card(dynamicRoutesList.element.outerHTML);
    this.dynamicRoutesCard.mount('#dynamic-routes-container');

    // Back link
    this.backLink = new LinkList([
      { href: '/dashboard', label: '← Back to Dashboard' }
    ]);
    this.backLink.mount('#back-link-container');

    this.setState({ initialized: true });
  }

  protected onUnmount(): void {
    this.hero?.unmount();
    this.endpointsCard?.unmount();
    this.dynamicRoutesCard?.unmount();
    this.backLink?.unmount();
  }
}