import { TemplateComponent } from '@lib/components/TemplateComponent';
import { DashboardHeader } from './DashboardHeader/DashboardHeader';
import { StatCard } from './StatCard/StatCard';
import { EndpointList } from './EndpointList/EndpointList';
import { HeaderComponent } from '@lib/components/HeaderComponent';
import { PORTS } from '@config/ports';

interface ServerStats {
  uptime: number;
  requests: number;
  connections: number;
  responseTime: number;
}

interface DashboardPageState {
  initialized: boolean;
}

export class DashboardPage extends TemplateComponent<HTMLDivElement, DashboardPageState> {
  private statsInterval: number | null = null;
  private startTime: number = Date.now();

  // Component instances
  private header: DashboardHeader;
  private uptimeCard: StatCard;
  private requestsCard: StatCard;
  private connectionsCard: StatCard;
  private responseCard: StatCard;
  private endpointList: EndpointList;

  constructor() {
    super('', 'div');
    this.setState({ initialized: false });
  }

  protected processTemplate(template: string): string {
    return `
      <div id="dashboard">
        <div id="header-container"></div>
        <div id="stats-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 2rem 0;"></div>
        <div id="endpoints-container"></div>
      </div>
    `;
  }

  protected async onMount(): Promise<void> {
    await this.setupDashboard();
  }

  private async setupDashboard(): Promise<void> {
    // Add global header at the top
    const globalHeader = await HeaderComponent.create();
    globalHeader.mountAtTop();
    
    // Create and mount components
    this.createComponents();
    this.mountComponents();
    this.bindEvents();

    // Start polling for stats
    this.startStatsPolling();
    
    this.setState({ initialized: true });
  }

  private createComponents(): void {
    // Create component instances
    this.header = new DashboardHeader(String(PORTS.API));

    this.uptimeCard = new StatCard({
      label: 'Uptime',
      value: '-'
    });

    this.requestsCard = new StatCard({
      label: 'Total Requests',
      value: '-'
    });

    this.connectionsCard = new StatCard({
      label: 'Active Connections',
      value: '-'
    });

    this.responseCard = new StatCard({
      label: 'Avg Response',
      value: '-',
      unit: 'ms'
    });

    this.endpointList = new EndpointList();
  }

  private mountComponents(): void {
    // Mount components to their containers
    this.header.mount('#header-container');

    const statsContainer = this.$('#stats-container');
    if (statsContainer) {
      this.uptimeCard.mount(statsContainer);
      this.requestsCard.mount(statsContainer);
      this.connectionsCard.mount(statsContainer);
      this.responseCard.mount(statsContainer);
    }

    this.endpointList.mount('#endpoints-container');
  }

  protected bindEvents(): void {
    // Listen for endpoint clicks
    this.endpointList?.element.addEventListener('endpoint-click', (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log('Endpoint interaction:', customEvent.detail);
      // Could open API documentation or test interface
    });
  }

  private startStatsPolling(): void {
    // Initial update
    this.updateStats();

    // Poll every 2 seconds
    this.statsInterval = window.setInterval(() => {
      this.updateStats();
    }, 2000);
  }

  private async updateStats(): Promise<void> {
    try {
      const response = await fetch('/api/stats');

      if (!response.ok) {
        // If stats endpoint doesn't exist yet, use mock data
        this.updateWithMockData();
        return;
      }

      const stats: ServerStats = await response.json();
      this.updateStatCards(stats);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      // Use mock data as fallback
      this.updateWithMockData();
    }
  }

  private updateWithMockData(): void {
    // Calculate uptime based on when the page loaded
    const uptimeSeconds = Math.floor((Date.now() - this.startTime) / 1000);

    const mockStats: ServerStats = {
      uptime: uptimeSeconds,
      requests: Math.floor(Math.random() * 1000) + 100,
      connections: Math.floor(Math.random() * 10) + 1,
      responseTime: Math.floor(Math.random() * 50) + 10
    };

    this.updateStatCards(mockStats);
  }

  private updateStatCards(stats: ServerStats): void {
    this.uptimeCard.setValue(this.formatUptime(stats.uptime));
    this.requestsCard.setValue(this.formatNumber(stats.requests));
    this.connectionsCard.setValue(String(stats.connections));
    this.responseCard.setValue(String(stats.responseTime));
  }

  private formatUptime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  }

  private formatNumber(num: number): string {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return String(num);
  }

  protected onUnmount(): void {
    if (this.statsInterval) {
      clearInterval(this.statsInterval);
      this.statsInterval = null;
    }

    // Unmount all components
    this.header?.unmount();
    this.uptimeCard?.unmount();
    this.requestsCard?.unmount();
    this.connectionsCard?.unmount();
    this.responseCard?.unmount();
    this.endpointList?.unmount();
  }
}