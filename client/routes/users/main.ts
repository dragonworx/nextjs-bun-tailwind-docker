import { initLayout } from '@lib/layout';
import { UsersPage } from './components/UsersPage';

async function init() {
  const app = await initLayout();
  
  // Create and mount the users page component
  const usersPage = new UsersPage();
  usersPage.mount(app);
}

init();