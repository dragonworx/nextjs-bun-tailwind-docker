/**
 * Base class for components that use HTML template files with state management
 * Allows mounting components directly to DOM without web components
 */
export abstract class Component<T extends HTMLElement = HTMLDivElement, S = any> {
  protected _element: T;
  protected _template: string;
  protected _children: Map<string, Component> = new Map();
  protected _eventListeners: Array<{ target: Element; event: string; handler: EventListener }> = [];
  private _state: S;

  constructor(template: string, tagName?: keyof HTMLElementTagNameMap) {
    this._template = template;
    this._element = this.createElement(tagName);
    this._state = this.getInitialState();
    this.render();
  }

  /**
   * Creates the root element for this component
   * Override to customize the element type
   */
  protected createElement(tagName?: keyof HTMLElementTagNameMap): T {
    const tag = tagName || this.getDefaultTagName();
    return document.createElement(tag) as T;
  }

  /**
   * Override to specify default tag name for the root element
   */
  protected getDefaultTagName(): keyof HTMLElementTagNameMap {
    return 'div';
  }

  /**
   * The root element of this component
   */
  get element(): T {
    return this._element;
  }

  /**
   * Render the template into the element
   */
  protected render(): void {
    // Parse template and inject into element
    this._element.innerHTML = this.processTemplate(this._template);

    // Setup event bindings
    this.bindEvents();

    // Lifecycle hook
    this.afterRender();
  }

  /**
   * Process template before rendering (for variable substitution, etc)
   */
  protected processTemplate(template: string): string {
    // Override in subclasses for template processing
    return template;
  }

  /**
   * Lifecycle hook called after render
   */
  protected afterRender(): void {
    // Override in subclasses
  }

  /**
   * Query selector within component
   */
  protected $(selector: string): HTMLElement | null {
    return this._element.querySelector(selector);
  }

  /**
   * Query selector all within component
   */
  protected $$(selector: string): NodeListOf<HTMLElement> {
    return this._element.querySelectorAll(selector);
  }

  /**
   * Mount component to a parent element or selector
   */
  mount(parent: HTMLElement | string): void {
    const parentElement = typeof parent === 'string'
      ? document.querySelector(parent)
      : parent;

    if (!parentElement) {
      throw new Error(`Cannot mount component: parent element not found`);
    }

    parentElement.appendChild(this._element);
    this.onMount();
  }

  /**
   * Unmount component from DOM
   */
  unmount(): void {
    this.onUnmount();
    this.cleanup();
    this._element.remove();
  }

  /**
   * Replace an element with this component
   */
  replace(element: HTMLElement | string): void {
    const targetElement = typeof element === 'string'
      ? document.querySelector(element) as HTMLElement
      : element;

    if (!targetElement || !targetElement.parentNode) {
      throw new Error(`Cannot replace: target element not found or has no parent`);
    }

    targetElement.parentNode.replaceChild(this._element, targetElement);
    this.onMount();
  }

  /**
   * Lifecycle hook when component is mounted
   */
  protected onMount(): void {
    // Override in subclasses
  }

  /**
   * Lifecycle hook when component is unmounted
   */
  protected onUnmount(): void {
    // Override in subclasses
  }

  /**
   * Add event listener with automatic cleanup
   */
  protected addEventListener(selector: string, event: string, handler: EventListener): void {
    const element = this.$(selector);
    if (element) {
      element.addEventListener(event, handler);
      this._eventListeners.push({ target: element, event, handler });
    }
  }

  /**
   * Bind events after render
   */
  protected bindEvents(): void {
    // Override in subclasses to bind events
  }

  /**
   * Add a child component
   */
  protected addChild(key: string, child: Component, selector?: string): void {
    this._children.set(key, child);

    if (selector) {
      const container = this.$(selector);
      if (container) {
        container.appendChild(child.element);
        child.onMount();
      }
    }
  }

  /**
   * Get a child component by key
   */
  protected getChild(key: string): Component | undefined {
    return this._children.get(key);
  }

  /**
   * Lifecycle hook before update
   */
  protected beforeUpdate(data?: any): void {
    // Override in subclasses
  }

  /**
   * Cleanup resources
   */
  protected cleanup(): void {
    // Remove event listeners
    this._eventListeners.forEach(({ target, event, handler }) => {
      target.removeEventListener(event, handler);
    });
    this._eventListeners = [];

    // Cleanup children
    this._children.forEach(child => child.unmount());
    this._children.clear();
  }

  /**
   * Set attributes on the root element
   */
  setAttributes(attributes: Record<string, string>): void {
    Object.entries(attributes).forEach(([key, value]) => {
      this._element.setAttribute(key, value);
    });
  }

  /**
   * Add CSS classes to root element
   */
  addClass(...classes: string[]): void {
    this._element.classList.add(...classes);
  }

  /**
   * Remove CSS classes from root element
   */
  removeClass(...classes: string[]): void {
    this._element.classList.remove(...classes);
  }

  /**
   * Toggle CSS class on root element
   */
  toggleClass(className: string, force?: boolean): void {
    this._element.classList.toggle(className, force);
  }

  // ==================== STATE MANAGEMENT ====================

  /**
   * Override to provide initial state for the component
   * This method is called once during construction
   */
  protected getInitialState(): S {
    return {} as S;
  }

  /**
   * Get the current state (readonly access)
   * Do not store this reference - it may become stale after setState calls
   */
  protected getState(): Readonly<S> {
    return this._state;
  }

  /**
   * Set the component state and trigger re-render
   * For object states, accepts partial updates that are merged with current state
   * For primitive states, replaces the entire state
   */
  protected setState(newState: S extends object ? Partial<S> : S): void {
    const previousState = this._state;

    if (this.isObject(this._state) && this.isObject(newState)) {
      // For object states, merge with current state
      this._state = { ...this._state, ...newState } as S;
    } else {
      // For primitive states, replace entirely
      this._state = newState as S;
    }

    // Call lifecycle hook
    this.beforeStateUpdate(previousState, this._state);

    // Re-render component
    this.cleanup();
    this.render();

    // Call lifecycle hook
    this.afterStateUpdate(previousState, this._state);
  }

  /**
   * Force update the component state without merging (for object states)
   * Use this when you need to replace the entire state object
   */
  protected replaceState(newState: S): void {
    const previousState = this._state;
    this._state = newState;

    this.beforeStateUpdate(previousState, this._state);
    this.cleanup();
    this.render();
    this.afterStateUpdate(previousState, this._state);
  }

  /**
   * Update the component (re-render with current state)
   * Override the base class update to use current state
   */
  update(data?: any): void {
    this.beforeUpdate(data);
    this.cleanup();
    this.render();
  }

  /**
   * Lifecycle hook called before state changes and re-render
   */
  protected beforeStateUpdate(previousState: S, newState: S): void {
    // Override in subclasses if needed
  }

  /**
   * Lifecycle hook called after state changes and re-render
   */
  protected afterStateUpdate(previousState: S, newState: S): void {
    // Override in subclasses if needed
  }

  /**
   * Helper method to check if a value is an object (for state merging)
   */
  private isObject(value: any): value is Record<string, any> {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }
}
