import { initLayout } from '@lib/layout';
import { DashboardPage } from './components/DashboardPage';
import './styles/dashboard.css';

let dashboardPage: DashboardPage | null = null;

async function init() {
  const app = await initLayout();
  
  // Create and mount the dashboard page component
  dashboardPage = new DashboardPage();
  dashboardPage.mount(app);
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Cleanup on page unload
window.addEventListener('unload', () => {
  dashboardPage?.unmount();
});
