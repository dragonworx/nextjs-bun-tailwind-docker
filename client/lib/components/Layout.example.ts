/**
 * Layout Component Usage Examples
 * 
 * The Layout component provides a slot-based approach for consistent page structure
 * across all routes. It automatically includes the header and provides a content area
 * where child components are rendered.
 */

import { Layout } from './Layout';
import { Component } from '../Component';

// Example 1: Basic usage with default options
async function basicLayoutExample() {
  // Create layout with default settings (includes header)
  const layout = await Layout.init();
  
  // Create a simple page component
  const pageContent = document.createElement('div');
  pageContent.innerHTML = '<h1>Welcome to my page</h1>';
  
  // Mount content to the layout slot
  layout.mountChild(pageContent);
}

// Example 2: Custom layout options
async function customLayoutExample() {
  const layout = await Layout.init({
    includeHeader: true,
    containerStyle: 'max-width: 800px; margin: 0 auto; padding: 1rem;',
    containerClass: 'custom-layout'
  });
  
  // Mount a custom component
  class MyPageComponent extends Component {
    protected processTemplate(): string {
      return '<div><h1>Custom Page</h1><p>Content goes here</p></div>';
    }
  }
  
  const myPage = new MyPageComponent();
  layout.mountChild(myPage);
}

// Example 3: Layout without header (for special pages)
async function headerlessLayoutExample() {
  const layout = await Layout.init({
    includeHeader: false,
    containerStyle: 'padding: 0; width: 100%; height: 100vh;'
  });
  
  // Perfect for fullscreen apps, splash pages, etc.
  const fullscreenContent = document.createElement('div');
  fullscreenContent.innerHTML = '<div>Fullscreen content</div>';
  layout.mountChild(fullscreenContent);
}

// Example 4: Multiple child components
async function multipleChildrenExample() {
  const layout = await Layout.init();
  
  // You can append multiple children
  const header = document.createElement('h1');
  header.textContent = 'Page Title';
  layout.appendChild(header);
  
  const content = document.createElement('p');
  content.textContent = 'Page content';
  layout.appendChild(content);
  
  // Or mount a main component that manages its own children
  class PageWithSections extends Component {
    protected processTemplate(): string {
      return `
        <section>
          <h2>Section 1</h2>
          <p>Content 1</p>
        </section>
        <section>
          <h2>Section 2</h2>
          <p>Content 2</p>
        </section>
      `;
    }
  }
  
  const sectionsPage = new PageWithSections();
  layout.mountChild(sectionsPage); // This replaces previous children
}

// Example 5: Accessing the slot directly for advanced use cases
async function directSlotExample() {
  const layout = await Layout.init();
  
  // Get direct access to the slot element
  const slot = layout.getSlot();
  if (slot) {
    slot.style.display = 'grid';
    slot.style.gridTemplateColumns = '1fr 1fr';
    slot.style.gap = '2rem';
    
    // Add children directly
    const leftColumn = document.createElement('div');
    leftColumn.innerHTML = '<h2>Left Column</h2>';
    slot.appendChild(leftColumn);
    
    const rightColumn = document.createElement('div');
    rightColumn.innerHTML = '<h2>Right Column</h2>';
    slot.appendChild(rightColumn);
  }
}

export {
  basicLayoutExample,
  customLayoutExample,
  headerlessLayoutExample,
  multipleChildrenExample,
  directSlotExample
};