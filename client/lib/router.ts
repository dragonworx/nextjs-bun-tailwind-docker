export interface RouteParams {
  [key: string]: string;
}

export interface Route {
  pattern: string;
  regex: RegExp;
  params: string[];
}

export class Router {
  private routes: Map<string, Route> = new Map();
  private currentParams: RouteParams = {};
  
  constructor() {
    this.init();
  }
  
  private init() {
    window.addEventListener('popstate', () => this.handleRoute());
    document.addEventListener('click', (e) => {
      const link = (e.target as HTMLElement).closest('a');
      if (link && link.href && link.href.startsWith(window.location.origin)) {
        const pathname = link.pathname;
        
        // Check if this route is registered for client-side routing
        const match = this.match(pathname);
        
        if (match) {
          // This is a client-side route, handle it
          e.preventDefault();
          this.navigate(pathname);
        }
        // Otherwise, let the browser handle the navigation normally
      }
    });
  }
  
  register(pattern: string): void {
    const params: string[] = [];
    let regexPattern = pattern;
    
    // Handle [...path] catch-all routes
    regexPattern = regexPattern.replace(/\[\.\.\.(\w+)\]/g, (_, param) => {
      params.push(param);
      return '(.*)';
    });
    
    // Handle [param] dynamic segments
    regexPattern = regexPattern.replace(/\[(\w+)\]/g, (_, param) => {
      params.push(param);
      return '([^/]+)';
    });
    
    // Escape slashes and create regex
    regexPattern = '^' + regexPattern.replace(/\//g, '\\/') + '$';
    
    this.routes.set(pattern, {
      pattern,
      regex: new RegExp(regexPattern),
      params
    });
  }
  
  match(pathname: string): { route: Route; params: RouteParams } | null {
    for (const route of this.routes.values()) {
      const match = pathname.match(route.regex);
      if (match) {
        const params: RouteParams = {};
        route.params.forEach((param, index) => {
          params[param] = match[index + 1];
        });
        return { route, params };
      }
    }
    return null;
  }
  
  navigate(pathname: string): void {
    window.history.pushState({}, '', pathname);
    this.handleRoute();
  }
  
  private handleRoute(): void {
    const pathname = window.location.pathname;
    const match = this.match(pathname);
    
    if (match) {
      this.currentParams = match.params;
      this.onRouteChange(pathname, match.params);
    } else {
      // No client-side route matched, navigate to the URL directly
      window.location.href = pathname;
    }
  }
  
  private onRouteChange(pathname: string, params: RouteParams): void {
    // Dispatch custom event for route changes
    window.dispatchEvent(new CustomEvent('routechange', {
      detail: { pathname, params }
    }));
  }
  
  getParams(): RouteParams {
    return this.currentParams;
  }
  
  getParam(key: string): string | undefined {
    return this.currentParams[key];
  }
}

// Global router instance
export const router = new Router();

// Helper to get current route params in components
export function useParams(): RouteParams {
  return router.getParams();
}

export function useParam(key: string): string | undefined {
  return router.getParam(key);
}