import { router } from '@lib/router';
import { Layout } from '@lib/components';
import { UserDetailPage } from './components/UserDetailPage';

async function renderUser() {
  // Create the layout with header
  const layout = await Layout.init({
    includeHeader: true
  });

  // Create and mount the user detail page component to the layout slot
  const userDetailPage = new UserDetailPage();
  layout.mountChild(userDetailPage);
}

// Register route and render
router.register('/users/[id]');
renderUser();

// Listen for route changes (if navigating within SPA)
window.addEventListener('routechange', renderUser);
