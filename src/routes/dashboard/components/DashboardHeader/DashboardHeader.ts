import { TemplateComponent } from '@components/TemplateComponent';
import templateHtml from './DashboardHeader.html';
import './DashboardHeader.css';

const template = templateHtml as string;

interface HeaderState {
  port: string;
  status: 'running' | 'stopped';
}

export class DashboardHeader extends TemplateComponent<HTMLElement, HeaderState> {
  constructor(port: string) {
    super(template, 'div');
    this.addClass('dashboard-header-component');
    this.setState({ port, status: 'running' });
  }

  protected getInitialState(): HeaderState {
    return {
      port: '',
      status: 'running'
    };
  }

  protected processTemplate(template: string): string {
    const state = this.getState();
    
    const statusClass = state.status;
    const statusText = state.status === 'running' 
      ? `API Running on port ${state.port}` 
      : 'API Stopped';

    return template
      .replace(/\{\{statusClass\}\}/g, statusClass)
      .replace(/\{\{statusText\}\}/g, statusText);
  }

  updateStatus(status: 'running' | 'stopped'): void {
    this.setState({ status });
  }

  protected onMount(): void {
    console.log('Dashboard header mounted');
  }
}