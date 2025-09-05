import { Layout } from '@components/Layout';

/**
 * Layout utilities for consistent page structure across routes
 */

interface LayoutOptions {
  showHeader?: boolean;
  containerStyle?: string;
  containerClass?: string;
  beforeContent?: () => string;
  afterContent?: () => string;
}

/**
 * Initialize standard page layout with header and container
 * @deprecated Use Layout.init() instead for better component-based approach
 */
export async function initLayout(options: LayoutOptions = {}): Promise<HTMLElement> {
  const {
    showHeader = true,
    containerStyle = 'padding: 2rem; font-family: system-ui; max-width: 1200px; margin: 0 auto;',
    containerClass,
    beforeContent,
    afterContent
  } = options;

  // Create layout using the new component system
  const layout = await Layout.init({
    includeHeader: showHeader,
    containerStyle,
    containerClass
  });

  // Get the slot element
  const slot = layout.getSlot();
  if (!slot) {
    throw new Error('Failed to get layout slot');
  }

  // Handle before/after content if provided (legacy support)
  if (beforeContent || afterContent) {
    const wrapper = document.createElement('div');
    
    if (beforeContent) {
      const before = document.createElement('div');
      before.innerHTML = beforeContent();
      wrapper.appendChild(before);
    }
    
    const content = document.createElement('div');
    content.id = 'content';
    wrapper.appendChild(content);
    
    if (afterContent) {
      const after = document.createElement('div');
      after.innerHTML = afterContent();
      wrapper.appendChild(after);
    }
    
    slot.appendChild(wrapper);
    return content;
  }

  return slot;
}

/**
 * Helper to create a consistent page wrapper with title
 */
export function createPage(title: string, content: string, options: LayoutOptions = {}): void {
  initLayout(options).then(container => {
    container.innerHTML = `
      <h1>${title}</h1>
      ${content}
    `;
  });
}

/**
 * Helper to add breadcrumbs below header
 */
export function createBreadcrumbs(items: Array<{label: string, href?: string}>): string {
  const breadcrumbItems = items.map((item, index) => {
    const isLast = index === items.length - 1;
    if (item.href && !isLast) {
      return `<a href="${item.href}" style="color: #0066cc; text-decoration: none;">${item.label}</a>`;
    }
    return `<span style="color: ${isLast ? '#374151' : '#6b7280'}">${item.label}</span>`;
  }).join(' <span style="color: #9ca3af; margin: 0 0.5rem;">/</span> ');

  return `
    <nav style="padding: 1rem 0; font-size: 0.875rem;">
      ${breadcrumbItems}
    </nav>
  `;
}