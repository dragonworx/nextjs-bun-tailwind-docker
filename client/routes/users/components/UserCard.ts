import { Component } from '@lib/Component';

interface User {
  id: string;
  name: string;
  role: string;
}

interface UserCardState {
  user: User;
}

export class UserCard extends Component<HTMLAnchorElement, UserCardState> {
  constructor(user: User) {
    super('', 'a');
    this.setState({ user });
    this.element.href = `/users/${user.id}`;
  }

  protected getDefaultTagName(): keyof HTMLElementTagNameMap {
    return 'a';
  }

  protected processTemplate(template: string): string {
    const state = this.getState();
    const { user } = state;
    
    this.setAttributes({
      href: `/users/${user.id}`,
      style: 'padding: 1rem; border: 1px solid #ddd; border-radius: 8px; text-decoration: none; color: inherit; display: block; transition: background 0.2s;'
    });
    
    return `
      <h3 style="margin: 0 0 0.5rem 0;">${user.name}</h3>
      <p style="margin: 0; color: #666;">ID: ${user.id} | Role: ${user.role}</p>
    `;
  }

  protected bindEvents(): void {
    this.element.addEventListener('mouseenter', () => {
      this.element.style.background = '#f5f5f5';
    });
    
    this.element.addEventListener('mouseleave', () => {
      this.element.style.background = 'transparent';
    });
  }
}