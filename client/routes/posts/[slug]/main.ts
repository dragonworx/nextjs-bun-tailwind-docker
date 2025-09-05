import { router } from '@lib/router';
import { initLayout } from '@lib/layout';
import { PostDetailPage } from './components/PostDetailPage';

async function renderPost() {
  const app = await initLayout();
  
  // Create and mount the post detail page component
  const postDetailPage = new PostDetailPage();
  postDetailPage.mount(app);
}

// Register route and render
router.register('/posts/[slug]');
renderPost();

// Listen for route changes
window.addEventListener('routechange', renderPost);