import { Component } from '@lib/Component';
import templateHtml from './EndpointList.html';
import './EndpointList.css';

const template = templateHtml as string;

interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
}

interface EndpointListState {
  endpoints: Endpoint[];
}

export class EndpointList extends Component<HTMLElement, EndpointListState> {
  constructor(endpoints?: Endpoint[]) {
    super(template, 'div');
    this.addClass('endpoint-list-component');
    this.setState({ endpoints: endpoints || this.getDefaultEndpoints() });
  }

  protected getInitialState(): EndpointListState {
    return {
      endpoints: []
    };
  }

  private getDefaultEndpoints(): Endpoint[] {
    return [
      { method: 'GET', path: '/api', description: 'Main API endpoint' },
      { method: 'GET', path: '/api/stats', description: 'Server statistics' },
      { method: 'GET', path: '/dashboard', description: 'Server dashboard' },
    ];
  }

  protected processTemplate(template: string): string {
    const state = this.getState();
    
    // Simple template processing for the {{#each}} pattern
    const endpointsHtml = state.endpoints.map((endpoint, index) => `
      <div class="endpoint" data-delay="${index}">
        <span class="method ${endpoint.method}">${endpoint.method}</span>
        <code class="path">${endpoint.path}</code>
        <span class="separator">—</span>
        <span class="description">${endpoint.description}</span>
      </div>
    `).join('');

    // Replace the {{#each endpoints}}...{{/each}} block
    return template.replace(
      /\{\{#each endpoints\}\}[\s\S]*?\{\{\/each\}\}/g, 
      endpointsHtml
    );
  }

  addEndpoint(endpoint: Endpoint): void {
    const currentState = this.getState();
    this.setState({ endpoints: [...currentState.endpoints, endpoint] });
  }

  setEndpoints(endpoints: Endpoint[]): void {
    this.setState({ endpoints });
  }

  getEndpoints(): Endpoint[] {
    return [...this.getState().endpoints];
  }

  protected bindEvents(): void {
    // Add click handlers for endpoints (for future interactivity)
    this.$$('.endpoint').forEach(endpointEl => {
      endpointEl.addEventListener('click', (e) => {
        const path = endpointEl.querySelector('.path')?.textContent;
        if (path) {
          this.handleEndpointClick(path, e);
        }
      });
    });
  }

  private handleEndpointClick(path: string, event: Event): void {
    console.log(`Endpoint clicked: ${path}`);
    
    // Dispatch custom event for endpoint interaction
    this.element.dispatchEvent(new CustomEvent('endpoint-click', {
      detail: { path, originalEvent: event },
      bubbles: true
    }));
  }

  protected onMount(): void {
    console.log('Endpoint list mounted with', this.getState().endpoints.length, 'endpoints');
  }
}