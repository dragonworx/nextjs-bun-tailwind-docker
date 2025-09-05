import { Layout } from '@lib/components';
import { ApiDocsPage } from './components/ApiDocsPage';

console.log('API Documentation page loaded');

async function init() {
  // Create the layout with header
  const layout = await Layout.init({
    includeHeader: true
  });
  
  // Create and mount the API docs page component to the layout slot
  const apiDocsPage = new ApiDocsPage();
  layout.mountChild(apiDocsPage);
}

document.addEventListener('DOMContentLoaded', init);