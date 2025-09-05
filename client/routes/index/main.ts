import data from '@assets/data.json';
import { Layout } from '@lib/components';
import { HomePage } from './components/HomePage';

console.log("Hello, World!2", data);

async function init() {
  // Create the layout with header
  const layout = await Layout.init({
    includeHeader: true,
    containerStyle: 'padding: 2rem; font-family: system-ui; max-width: 1200px; margin: 0 auto;'
  });
  
  // Create and mount the home page component to the layout slot
  const homePage = new HomePage();
  layout.mountChild(homePage);
}

init();
