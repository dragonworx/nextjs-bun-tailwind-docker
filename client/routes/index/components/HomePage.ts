import { TemplateComponent } from '@lib/components/TemplateComponent';
import { Hero } from '@lib/components/Hero';
import { Card } from '@lib/components/Card';
import { LinkList } from '@lib/components/LinkList';

interface HomePageState {
  initialized: boolean;
}

export class HomePage extends TemplateComponent<HTMLDivElement, HomePageState> {
  private hero: Hero;
  private staticRoutesCard: Card;
  private userRoutesCard: Card;
  private postsCard: Card;
  private apiCard: Card;
  private featuresCard: Card;

  constructor() {
    super('', 'div');
    this.setState({ initialized: false });
  }

  protected processTemplate(template: string): string {
    return `
      <div style="padding: 2rem; font-family: system-ui;">
        <div id="hero-container"></div>
        <div style="display: grid; gap: 1.5rem; margin-top: 2rem;">
          <div id="static-routes"></div>
          <div id="user-routes"></div>
          <div id="posts"></div>
          <div id="api"></div>
        </div>
        <div id="features" style="margin-top: 3rem;"></div>
      </div>
    `;
  }

  protected onMount(): void {
    this.initializeComponents();
  }

  private initializeComponents(): void {
    // Hero component
    this.hero = new Hero(
      'Welcome to Dynamic Routing Demo',
      'This application demonstrates file-based routing with dynamic parameters.'
    );
    const heroContainer = this.$('#hero-container');
    if (heroContainer) {
      this.hero.mount(heroContainer);
    }

    // Static routes card
    const staticRoutesList = new LinkList([
      { href: '/dashboard', label: 'Dashboard', description: 'Regular static route' }
    ]);
    this.staticRoutesCard = new Card(
      `<h3 style="margin-top: 0;">📁 Static Routes</h3>${staticRoutesList.element.outerHTML}`
    );
    const staticRoutesContainer = this.$('#static-routes');
    if (staticRoutesContainer) {
      this.staticRoutesCard.mount(staticRoutesContainer);
    }

    // User routes card
    const userRoutesList = new LinkList([
      { href: '/users', label: 'Users List', description: 'View all users' },
      { href: '/users/1', label: 'User #1', description: 'Dynamic user details' },
      { href: '/users/2', label: 'User #2', description: 'Another user' }
    ]);
    this.userRoutesCard = new Card(
      `<h3 style="margin-top: 0;">👥 Dynamic User Routes</h3>
       <p style="color: #6b7280; font-size: 0.875rem;">Pattern: <code>/users/[id]</code></p>
       ${userRoutesList.element.outerHTML}`
    );
    const userRoutesContainer = this.$('#user-routes');
    if (userRoutesContainer) {
      this.userRoutesCard.mount(userRoutesContainer);
    }

    // Posts card
    const postsList = new LinkList([
      { href: '/posts/hello-world', label: 'Hello World', description: 'First blog post' },
      { href: '/posts/dynamic-routing-guide', label: 'Dynamic Routing Guide', description: 'Technical guide' },
      { href: '/posts/vite-and-bun', label: 'Vite and Bun', description: 'Framework overview' }
    ]);
    this.postsCard = new Card(
      `<h3 style="margin-top: 0;">📝 Blog Posts with Slugs</h3>
       <p style="color: #6b7280; font-size: 0.875rem;">Pattern: <code>/posts/[slug]</code></p>
       ${postsList.element.outerHTML}`
    );
    const postsContainer = this.$('#posts');
    if (postsContainer) {
      this.postsCard.mount(postsContainer);
    }

    // API routes card
    const apiList = new LinkList([
      { href: '/api/v1/users/list', label: '/api/v1/users/list', description: 'API v1 endpoint' },
      { href: '/api/v2/posts/recent', label: '/api/v2/posts/recent', description: 'API v2 endpoint' },
      { href: '/api/health', label: '/api/health', description: 'Health check' }
    ]);
    this.apiCard = new Card(
      `<h3 style="margin-top: 0;">🔗 Catch-All API Routes</h3>
       <p style="color: #6b7280; font-size: 0.875rem;">Pattern: <code>/api/[...path]</code></p>
       ${apiList.element.outerHTML}`
    );
    const apiContainer = this.$('#api');
    if (apiContainer) {
      this.apiCard.mount(apiContainer);
    }

    // Features card
    this.featuresCard = new Card(
      `<h3 style="margin-top: 0;">🚀 Features Demonstrated</h3>
       <ul>
         <li><strong>[id]</strong> - Single parameter capture (e.g., user IDs)</li>
         <li><strong>[slug]</strong> - SEO-friendly URL slugs</li>
         <li><strong>[...path]</strong> - Catch-all routes for nested paths</li>
         <li><strong>Client-side routing</strong> - SPA-style navigation without page reloads</li>
         <li><strong>File-based routing</strong> - Routes discovered from folder structure</li>
       </ul>`,
      undefined,
      'info'
    );
    const featuresContainer = this.$('#features');
    if (featuresContainer) {
      this.featuresCard.mount(featuresContainer);
    }

    this.setState({ initialized: true });
  }

  protected onUnmount(): void {
    this.hero?.unmount();
    this.staticRoutesCard?.unmount();
    this.userRoutesCard?.unmount();
    this.postsCard?.unmount();
    this.apiCard?.unmount();
    this.featuresCard?.unmount();
  }
}