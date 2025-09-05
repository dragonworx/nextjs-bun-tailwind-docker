import { Component } from '../Component';

interface CodeBlockState {
  code: string;
  language?: string;
  title?: string;
}

export class CodeBlock extends Component<HTMLDivElement, CodeBlockState> {
  constructor(code: string, language?: string, title?: string) {
    super('', 'div');
    this.setState({
      code,
      language,
      title
    });
  }

  protected processTemplate(template: string): string {
    const state = this.getState();
    
    return `
      <div style="background: #2d2d2d; border-radius: 8px; margin: 1rem 0; overflow: hidden;">
        ${state.title ? `
          <div style="background: #1e1e1e; padding: 0.75rem 1rem; font-family: system-ui; font-size: 0.875rem; color: #d4d4d4; border-bottom: 1px solid #404040;">
            ${state.title}
          </div>
        ` : ''}
        <pre style="background: #1e1e1e; padding: 1rem; margin: 0; overflow-x: auto; color: #d4d4d4; font-family: 'Courier New', monospace;"><code>${this.highlightCode(state.code, state.language)}</code></pre>
      </div>
    `;
  }

  private highlightCode(code: string, language?: string): string {
    // Simple syntax highlighting for JSON and common patterns
    if (language === 'json' || code.trim().startsWith('{')) {
      return code
        .replace(/"([^"]+)":/g, '<span style="color: #9cdcfe;">"$1"</span>:')
        .replace(/:\s*"([^"]+)"/g, ': <span style="color: #ce9178;">"$1"</span>')
        .replace(/:\s*(true|false|null)/g, ': <span style="color: #569cd6;">$1</span>')
        .replace(/:\s*(\d+)/g, ': <span style="color: #b5cea8;">$1</span>');
    }
    
    // Basic TypeScript/JavaScript highlighting
    return code
      .replace(/(function|const|let|var|class|interface|type|export|import|from)/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/'([^']+)'/g, '<span style="color: #ce9178;">\'$1\'</span>')
      .replace(/"([^"]+)"/g, '<span style="color: #ce9178;">"$1"</span>')
      .replace(/\/\/\s*(.+)/g, '<span style="color: #608b4e;">// $1</span>');
  }

  setCode(code: string, language?: string): void {
    this.setState({ code, language });
  }
}