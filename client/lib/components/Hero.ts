import { TemplateComponent } from './TemplateComponent';

interface HeroState {
  title: string;
  subtitle?: string;
  gradient?: boolean;
}

export class Hero extends TemplateComponent<HTMLDivElement, HeroState> {
  constructor(title: string, subtitle?: string, gradient: boolean = false) {
    super('', 'div');
    // Set the actual state after super() constructor completes
    this.setState({ title, subtitle, gradient });
  }

  protected getInitialState(): HeroState {
    return {
      title: '',
      subtitle: undefined,
      gradient: false
    };
  }

  protected processTemplate(template: string): string {
    const state = this.getState();
    
    const backgroundStyle = state.gradient 
      ? 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;'
      : 'background: #f8fafc; color: #1f2937;';
    
    return `
      <div style="padding: 3rem 2rem; text-align: center; border-radius: 12px; margin-bottom: 2rem; ${backgroundStyle}">
        <h1 style="font-size: 2.5rem; line-height: 1.2; margin: 0 0 0.5rem 0;">${state.title}</h1>
        ${state.subtitle ? `<p style="margin: 0; opacity: 0.9; font-size: 1.125rem;">${state.subtitle}</p>` : ''}
      </div>
    `;
  }

  setContent(title: string, subtitle?: string): void {
    this.setState({ title, subtitle });
  }
}