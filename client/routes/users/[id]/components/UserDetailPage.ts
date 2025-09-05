import { Component } from '@lib/Component';
import { Card } from '@lib/components/Card';
import { LinkList } from '@lib/components/LinkList';
import { UserProfile } from '@lib/components/UserProfile';
import { useParam } from '@lib/router';
import { createBreadcrumbs } from '@lib/layout';

interface User {
  name: string;
  role: string;
  email: string;
  joined: string;
}

interface UserDetailPageState {
  user: User | null;
  userId: string | null;
  initialized: boolean;
}

export class UserDetailPage extends Component<HTMLDivElement, UserDetailPageState> {
  private userProfile: UserProfile | null = null;
  private infoCard: Card;
  private backLinks: LinkList;

  constructor() {
    super('', 'div');
    this.setState({ user: null, userId: null, initialized: false });
  }

  protected processTemplate(template: string): string {
    const state = this.getState();
    
    if (!state.user) {
      return `
        <div id="breadcrumbs"></div>
        <div style="padding: 2rem; font-family: system-ui;">
          <h1>User Not Found</h1>
          <p>User with ID "${state.userId}" does not exist.</p>
          <div id="back-links"></div>
        </div>
      `;
    }

    return `
      <div id="breadcrumbs"></div>
      <div style="padding: 2rem; font-family: system-ui;">
        <div id="user-profile"></div>
        <div id="info-card"></div>
        <div id="back-links"></div>
      </div>
    `;
  }

  protected onMount(): void {
    this.loadUserData();
  }

  private loadUserData(): void {
    const userId = useParam('id');
    
    // Mock user data
    const users: Record<string, User> = {
      '1': { name: 'Alice Johnson', role: 'Developer', email: 'alice@example.com', joined: '2023-01-15' },
      '2': { name: 'Bob Smith', role: 'Designer', email: 'bob@example.com', joined: '2023-02-20' },
      '3': { name: 'Charlie Brown', role: 'Manager', email: 'charlie@example.com', joined: '2023-03-10' },
      '4': { name: 'Diana Prince', role: 'Engineer', email: 'diana@example.com', joined: '2023-04-05' },
    };

    const user = userId ? users[userId] : null;
    this.setState({ user, userId });
    
    this.initializeComponents(user, userId);
  }

  private initializeComponents(user: User | null, userId: string | null): void {
    // Add breadcrumbs
    const breadcrumbsContainer = this.$('#breadcrumbs');
    if (breadcrumbsContainer) {
      const breadcrumbs = createBreadcrumbs([
        { label: 'Home', href: '/' },
        { label: 'Users', href: '/users' },
        { label: user ? user.name : 'User Not Found' }
      ]);
      breadcrumbsContainer.innerHTML = breadcrumbs;
    }

    if (user && userId) {
      // User profile
      this.userProfile = new UserProfile(user, userId);
      this.userProfile.mount('#user-profile');

      // Info card
      this.infoCard = new Card(
        `<p style="margin: 0; color: #6b7280; font-size: 0.875rem;">
          💡 This page demonstrates dynamic routing with the [id] parameter.
          <br>Current route: <code style="background: white; padding: 2px 6px; border-radius: 4px;">/users/${userId}</code>
        </p>`,
        undefined,
        'info'
      );
      this.infoCard.mount('#info-card');
    }

    // Back links
    this.backLinks = new LinkList([
      { href: '/users', label: '← Back to Users' },
      { href: '/', label: 'Home' }
    ], '', 'nav');
    this.backLinks.mount('#back-links');

    this.setState({ initialized: true });
  }

  protected onUnmount(): void {
    this.userProfile?.unmount();
    this.infoCard?.unmount();
    this.backLinks?.unmount();
  }
}