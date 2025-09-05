import { TemplateComponent } from '@lib/components/TemplateComponent';
import { Hero } from '@lib/components/Hero';
import { Card } from '@lib/components/Card';
import { LinkList } from '@lib/components/LinkList';
import { UserCard } from './UserCard';

interface User {
  id: string;
  name: string;
  role: string;
}

interface UsersPageState {
  users: User[];
  initialized: boolean;
}

export class UsersPage extends TemplateComponent<HTMLDivElement, UsersPageState> {
  private hero: Hero;
  private userCards: UserCard[] = [];
  private dynamicRoutesCard: Card;
  private backLink: LinkList;

  constructor() {
    super('', 'div');
    
    const users = [
      { id: '1', name: 'Alice Johnson', role: 'Developer' },
      { id: '2', name: 'Bob Smith', role: 'Designer' },
      { id: '3', name: 'Charlie Brown', role: 'Manager' },
      { id: '4', name: 'Diana Prince', role: 'Engineer' },
    ];
    
    this.setState({ users, initialized: false });
  }

  protected processTemplate(template: string): string {
    return `
      <div style="padding: 2rem; font-family: system-ui;">
        <div id="hero-container"></div>
        <div id="users-grid" style="display: grid; gap: 1rem; margin-top: 2rem;"></div>
        <div id="dynamic-routes-container"></div>
        <div id="back-link-container"></div>
      </div>
    `;
  }

  protected onMount(): void {
    this.initializeComponents();
  }

  private initializeComponents(): void {
    const state = this.getState();

    // Hero component
    this.hero = new Hero(
      'Users Directory',
      'Click on a user to view their details (demonstrates dynamic routing)'
    );
    this.hero.mount('#hero-container');

    // Create user cards
    const usersGrid = this.$('#users-grid');
    if (usersGrid) {
      this.userCards = state.users.map(user => {
        const userCard = new UserCard(user);
        userCard.mount(usersGrid);
        return userCard;
      });
    }

    // Dynamic routes examples
    const dynamicRoutesList = new LinkList([
      { href: '/users/1', label: 'User 1 Details' },
      { href: '/users/999', label: 'Non-existent User' },
      { href: '/posts/hello-world', label: 'Blog Post (slug demo)' },
      { href: '/api/v1/users/list', label: 'API Route (catch-all demo)' }
    ], 'Try these dynamic routes:');
    
    this.dynamicRoutesCard = new Card(
      dynamicRoutesList.element.outerHTML,
      undefined,
      'info'
    );
    this.dynamicRoutesCard.mount('#dynamic-routes-container');

    // Back link
    this.backLink = new LinkList([
      { href: '/', label: '← Back to Home' }
    ]);
    this.backLink.mount('#back-link-container');

    this.setState({ initialized: true });
  }

  protected onUnmount(): void {
    this.hero?.unmount();
    this.userCards.forEach(card => card.unmount());
    this.dynamicRoutesCard?.unmount();
    this.backLink?.unmount();
  }
}