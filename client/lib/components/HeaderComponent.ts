import { TemplateComponent } from './TemplateComponent';

interface Route {
  path: string;
  label: string;
  type: 'static' | 'dynamic' | 'api';
}

interface HeaderState {
  routes: Route[];
  loading: boolean;
  currentPath: string;
}

// Singleton to prevent multiple headers
let globalHeaderInstance: HeaderComponent | null = null;

export class HeaderComponent extends TemplateComponent<HTMLElement, HeaderState> {
  private navigationUpdateHandler = () => {
    this.setState({ currentPath: window.location.pathname });
  };

  constructor() {
    super('');
  }

  protected getDefaultTagName(): keyof HTMLElementTagNameMap {
    return 'header';
  }

  protected getInitialState(): HeaderState {
    // Start with static routes immediately to avoid loading state
    return {
      routes: this.getStaticRoutes(),
      loading: false,
      currentPath: window.location.pathname
    };
  }

  protected async onMount(): Promise<void> {
    this.bindNavigationEvents();
    // Try to fetch dynamic routes after mounting
    this.fetchRoutes();
  }

  private async fetchRoutes(): Promise<void> {
    try {
      const response = await fetch('/api/routes');
      
      if (!response.ok) {
        console.log(`API routes endpoint returned ${response.status}, using static routes`);
        return; // Keep using the static routes from initial state
      }
      
      const data = await response.json();
      
      if (data && data.routes && Array.isArray(data.routes)) {
        console.log('Successfully fetched dynamic routes:', data.routes);
        this.setState({
          routes: data.routes,
          loading: false
        });
      } else {
        console.log('Invalid routes data format, keeping static routes');
      }
    } catch (error) {
      console.log('Failed to fetch routes, keeping static routes:', error.message);
      // Don't update state - keep using the static routes from initial state
    }
  }

  private getStaticRoutes(): Route[] {
    return [
      { path: '/', label: 'Home', type: 'static' },
      { path: '/dashboard', label: 'Dashboard', type: 'static' },
      { path: '/users', label: 'Users', type: 'static' },
      { path: '/users/1', label: 'User Demo', type: 'dynamic' },
      { path: '/posts/hello-world', label: 'Blog Demo', type: 'dynamic' },
      { path: '/api/v1/test', label: 'API Demo', type: 'api' }
    ];
  }

  protected processTemplate(template: string): string {
    const state = this.getState();
    
    if (state.loading) {
      return `
        <nav style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 1rem 2rem; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
            <div style="color: white;">Loading routes...</div>
          </div>
        </nav>
      `;
    }

    const navItems = state.routes.map(route => {
      const isActive = state.currentPath === route.path || 
                      (route.path !== '/' && state.currentPath.startsWith(route.path.split('/[')[0]));
      
      const activeStyle = isActive 
        ? 'background: rgba(255,255,255,0.2); border-radius: 6px;' 
        : '';
      
      const typeIcon = this.getRouteIcon(route.type);
      
      return `
        <a href="${route.path}" 
           data-route="${route.path}"
           style="color: white; text-decoration: none; padding: 0.5rem 1rem; 
                  transition: background 0.2s; border-radius: 6px; 
                  display: inline-flex; align-items: center; gap: 0.5rem;
                  ${activeStyle}"
           onmouseover="this.style.background='rgba(255,255,255,0.1)'"
           onmouseout="this.style.background='${isActive ? 'rgba(255,255,255,0.2)' : 'transparent'}'">
          <span style="font-size: 0.875rem; opacity: 0.8;">${typeIcon}</span>
          ${route.label}
        </a>
      `;
    }).join('');

    return `
      <nav style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                  padding: 1rem 2rem; box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
                  position: sticky; top: 0; z-index: 1000;">
        <div style="max-width: 1200px; margin: 0 auto; display: flex; 
                    justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="color: white; font-size: 1.25rem; font-weight: bold;">
              🚀 Fantoccini 3D
            </div>
          </div>
          
          <nav style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
            ${navItems}
          </nav>
          
          <div style="color: rgba(255,255,255,0.7); font-size: 0.875rem;">
            <span id="route-info">
              ${this.getRouteInfo(state.currentPath)}
            </span>
          </div>
        </div>
      </nav>
    `;
  }

  private getRouteIcon(type: string): string {
    switch(type) {
      case 'dynamic': return '🔄';
      case 'api': return '🔌';
      default: return '📁';
    }
  }

  private getRouteInfo(path: string): string {
    if (path.includes('[')) {
      return 'Dynamic Route';
    }
    if (path.startsWith('/api')) {
      return 'API Route';
    }
    return 'Static Route';
  }

  private bindNavigationEvents(): void {
    // Listen for both popstate (back/forward) and pushstate/replacestate
    window.addEventListener('popstate', this.navigationUpdateHandler);
    
    // Override pushState and replaceState to catch programmatic navigation
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;
    
    history.pushState = function(...args) {
      originalPushState.apply(history, args);
      setTimeout(() => {
        if (globalHeaderInstance) {
          globalHeaderInstance.navigationUpdateHandler();
        }
      }, 0);
    };
    
    history.replaceState = function(...args) {
      originalReplaceState.apply(history, args);
      setTimeout(() => {
        if (globalHeaderInstance) {
          globalHeaderInstance.navigationUpdateHandler();
        }
      }, 0);
    };
  }

  protected bindEvents(): void {
    // Handle click events on navigation links
    this.element.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[data-route]') as HTMLAnchorElement;
      
      if (link) {
        // Update current path immediately for better UX
        const newPath = link.getAttribute('data-route') || link.pathname;
        this.setState({ currentPath: newPath });
      }
    });
  }
  
  protected afterStateUpdate(previousState: HeaderState, newState: HeaderState): void {
    // Re-bind navigation events after state updates
    if (previousState.loading && !newState.loading) {
      this.bindNavigationEvents();
    }
  }

  protected onUnmount(): void {
    window.removeEventListener('popstate', this.navigationUpdateHandler);
    if (globalHeaderInstance === this) {
      globalHeaderInstance = null;
    }
  }

  // Static helper method to easily add header to any page
  static async create(): Promise<HeaderComponent> {
    // Return existing header if already created
    if (globalHeaderInstance) {
      return globalHeaderInstance;
    }
    
    const header = new HeaderComponent();
    globalHeaderInstance = header;
    return header;
  }

  // Convenience method to mount at the top of the body
  mountAtTop(): void {
    // Check if header is already mounted
    const existingHeader = document.querySelector('header');
    if (existingHeader && existingHeader !== this._element) {
      existingHeader.remove();
    }
    
    if (document.body.firstChild) {
      document.body.insertBefore(this._element, document.body.firstChild);
    } else {
      document.body.appendChild(this._element);
    }
    // Don't call onMount() manually - it's already called by the mount() method
  }
}