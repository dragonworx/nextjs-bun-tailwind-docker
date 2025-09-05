import { router } from '@lib/router';
import { initLayout } from '@lib/layout';
import { ApiRoutePage } from './components/ApiRoutePage';

async function renderApiRoute() {
  const app = await initLayout({ containerStyle: '' }); // Remove default padding for terminal look
  
  // Create and mount the API route page component
  const apiRoutePage = new ApiRoutePage();
  apiRoutePage.mount(app);
}

// Register catch-all route and render
router.register('/api/[...path]');
renderApiRoute();

// Listen for route changes
window.addEventListener('routechange', renderApiRoute);