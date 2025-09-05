import { TemplateComponent } from './TemplateComponent';

interface CardState {
  title?: string;
  content: string;
  variant?: 'default' | 'gradient' | 'terminal' | 'info';
}

export class Card extends TemplateComponent<HTMLDivElement, CardState> {
  constructor(content: string, title?: string, variant: CardState['variant'] = 'default') {
    super('', 'div');
    this.setState({ content, title, variant });
  }

  protected getInitialState(): CardState {
    return {
      content: '',
      title: undefined,
      variant: 'default'
    };
  }

  protected processTemplate(template: string): string {
    const state = this.getState();
    const styles = this.getVariantStyles(state.variant || 'default');
    
    return `
      <div style="${styles}">
        ${state.title ? `<h2 style="margin-top: 0; color: #374151;">${state.title}</h2>` : ''}
        <div>${state.content}</div>
      </div>
    `;
  }

  private getVariantStyles(variant: CardState['variant']): string {
    const baseStyles = 'border-radius: 8px; padding: 1.5rem; margin: 1rem 0;';
    
    switch (variant) {
      case 'gradient':
        return baseStyles + 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;';
      case 'terminal':
        return baseStyles + 'background: #2d2d2d; color: #d4d4d4; font-family: "Courier New", monospace;';
      case 'info':
        return baseStyles + 'background: #f9fafb; border: 1px solid #e5e7eb; color: #6b7280; font-size: 0.875rem;';
      default:
        return baseStyles + 'background: white; border: 1px solid #e5e7eb;';
    }
  }

  setContent(content: string, title?: string): void {
    this.setState({ content, title });
  }
}