import { Component } from '../Component';
import { HeaderComponent } from './HeaderComponent';

interface LayoutOptions {
  includeHeader?: boolean;
  containerStyle?: string;
  containerClass?: string;
}

interface LayoutState {
  options: LayoutOptions;
  headerMounted: boolean;
}

/**
 * Base Layout component that provides consistent structure for all routes
 * Uses a slot-based approach where child content is inserted into the layout
 */
export class Layout extends Component<HTMLDivElement, LayoutState> {
  private header: HeaderComponent | null = null;
  private slotElement: HTMLElement | null = null;

  constructor(options: LayoutOptions = {}) {
    super('', 'div');
    
    const defaultOptions: LayoutOptions = {
      includeHeader: true,
      containerStyle: 'max-width: 1200px; margin: 0 auto; padding: 2rem;',
      containerClass: 'layout-container'
    };
    
    this.setState({
      options: { ...defaultOptions, ...options },
      headerMounted: false
    });
  }

  protected getInitialState(): LayoutState {
    return {
      options: {
        includeHeader: true,
        containerStyle: 'max-width: 1200px; margin: 0 auto; padding: 2rem;',
        containerClass: 'layout-container'
      },
      headerMounted: false
    };
  }

  protected processTemplate(template: string): string {
    const state = this.getState();
    const { containerStyle, containerClass } = state.options;
    
    return `
      <div class="layout-wrapper">
        <div id="layout-header"></div>
        <main class="${containerClass || ''}" style="${containerStyle || ''}">
          <div id="layout-slot" class="layout-content">
            <!-- Child content will be inserted here -->
          </div>
        </main>
      </div>
    `;
  }

  protected async onMount(): Promise<void> {
    const state = this.getState();
    
    // Mount header if requested
    if (state.options.includeHeader && !state.headerMounted) {
      await this.mountHeader();
    }
    
    // Store reference to slot element
    this.slotElement = this.$('#layout-slot');
  }

  private async mountHeader(): Promise<void> {
    try {
      this.header = await HeaderComponent.create();
      const headerContainer = this.$('#layout-header');
      
      if (headerContainer) {
        headerContainer.appendChild(this.header.element);
        this.setState({ headerMounted: true });
      }
    } catch (error) {
      console.error('Failed to mount header:', error);
    }
  }

  /**
   * Mount a child component into the layout's slot
   */
  public mountChild(child: Component | HTMLElement): void {
    if (!this.slotElement) {
      // Try to get the slot element if not already cached
      this.slotElement = this.$('#layout-slot');
      
      if (!this.slotElement) {
        console.error('Layout slot not available. Ensure layout is mounted first.');
        return;
      }
    }

    // Clear existing content
    this.slotElement.innerHTML = '';

    // Mount the child
    if (child instanceof Component) {
      child.mount(this.slotElement);
    } else {
      this.slotElement.appendChild(child);
    }
  }

  /**
   * Append a child component to the layout's slot without clearing existing content
   */
  public appendChild(child: Component | HTMLElement): void {
    if (!this.slotElement) {
      // Try to get the slot element if not already cached
      this.slotElement = this.$('#layout-slot');
      
      if (!this.slotElement) {
        console.error('Layout slot not available. Ensure layout is mounted first.');
        return;
      }
    }

    if (child instanceof Component) {
      child.mount(this.slotElement);
    } else {
      this.slotElement.appendChild(child);
    }
  }

  /**
   * Get the slot element for direct manipulation if needed
   */
  public getSlot(): HTMLElement | null {
    return this.slotElement;
  }

  /**
   * Update layout options
   */
  public updateOptions(options: Partial<LayoutOptions>): void {
    const currentState = this.getState();
    this.setState({
      options: { ...currentState.options, ...options }
    });
  }

  protected onUnmount(): void {
    this.header?.unmount();
    this.slotElement = null;
  }

  /**
   * Static factory method to create and mount a layout
   */
  static async create(options: LayoutOptions = {}): Promise<Layout> {
    const layout = new Layout(options);
    return layout;
  }

  /**
   * Convenience method to create, mount to app, and return the layout
   */
  static async init(options: LayoutOptions = {}): Promise<Layout> {
    const layout = new Layout(options);
    
    // Find or create app container
    let app = document.getElementById('app');
    if (!app) {
      app = document.createElement('div');
      app.id = 'app';
      document.body.appendChild(app);
    }
    
    // Clear app and mount layout
    app.innerHTML = '';
    layout.mount(app);
    
    // Wait for next tick to ensure DOM is fully updated
    await new Promise(resolve => setTimeout(resolve, 0));
    
    return layout;
  }
}