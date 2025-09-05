import { Component } from '@lib/Component';
import templateHtml from './UserCard.html';
import './UserCard.css';

const template = templateHtml as string;

interface UserData {
  name: string;
  title: string;
  avatarUrl: string;
  status: 'online' | 'offline' | 'busy';
  projects: number;
  commits: number;
}

/**
 * Example component using HTML template file
 * Demonstrates how to extend Component and use external HTML
 */
export class UserCard extends Component<HTMLElement> {
  private userData: UserData;
  private isFollowing: boolean = false;

  constructor(userData: UserData) {
    // Pass the imported HTML template to the base class
    super(template, 'article');
    this.userData = userData;
    
    // Add semantic attributes
    this.setAttributes({
      'role': 'article',
      'aria-label': `User card for ${userData.name}`
    });
    
    // Add component class
    this.addClass('user-card-component');
    
    // Initial render with data
    this.update(userData);
  }

  /**
   * Override to use article element instead of div
   */
  protected getDefaultTagName(): keyof HTMLElementTagNameMap {
    return 'article';
  }

  /**
   * Process template with user data
   */
  protected processTemplate(template: string): string {
    // Replace template variables with actual data
    return template
      .replace(/\{\{name\}\}/g, this.userData.name)
      .replace(/\{\{title\}\}/g, this.userData.title)
      .replace(/\{\{avatarUrl\}\}/g, this.userData.avatarUrl)
      .replace(/\{\{statusClass\}\}/g, `status-${this.userData.status}`)
      .replace(/\{\{projects\}\}/g, String(this.userData.projects))
      .replace(/\{\{commits\}\}/g, String(this.userData.commits));
  }

  /**
   * Bind events after render
   */
  protected bindEvents(): void {
    // Message button
    this.addEventListener('[data-action="message"]', 'click', (e) => {
      e.preventDefault();
      this.handleMessage();
    });

    // Follow button
    this.addEventListener('[data-action="follow"]', 'click', (e) => {
      e.preventDefault();
      this.handleFollow();
    });

    // Hover effect on avatar
    this.addEventListener('.user-avatar', 'mouseenter', () => {
      this.element.classList.add('avatar-hover');
    });

    this.addEventListener('.user-avatar', 'mouseleave', () => {
      this.element.classList.remove('avatar-hover');
    });
  }

  /**
   * Handle message action
   */
  private handleMessage(): void {
    console.log(`Opening message dialog for ${this.userData.name}`);
    
    // Dispatch custom event
    this.element.dispatchEvent(new CustomEvent('user-message', {
      detail: { user: this.userData },
      bubbles: true
    }));
  }

  /**
   * Handle follow action
   */
  private handleFollow(): void {
    this.isFollowing = !this.isFollowing;
    
    const followBtn = this.$('[data-action="follow"]') as HTMLButtonElement;
    if (followBtn) {
      followBtn.textContent = this.isFollowing ? 'Following' : 'Follow';
      followBtn.classList.toggle('following', this.isFollowing);
    }

    // Dispatch custom event
    this.element.dispatchEvent(new CustomEvent('user-follow', {
      detail: { 
        user: this.userData,
        isFollowing: this.isFollowing 
      },
      bubbles: true
    }));
  }

  /**
   * Update user status
   */
  updateStatus(status: 'online' | 'offline' | 'busy'): void {
    this.userData.status = status;
    
    const indicator = this.$('.status-indicator');
    if (indicator) {
      indicator.className = `status-indicator status-${status}`;
    }
  }

  /**
   * Update user data and re-render
   */
  updateUserData(userData: Partial<UserData>): void {
    this.userData = { ...this.userData, ...userData };
    this.update(this.userData);
  }

  /**
   * Lifecycle hook when mounted
   */
  protected onMount(): void {
    console.log(`UserCard mounted for ${this.userData.name}`);
    
    // Animate in
    this.element.style.opacity = '0';
    this.element.style.transform = 'translateY(20px)';
    
    requestAnimationFrame(() => {
      this.element.style.transition = 'opacity 0.3s, transform 0.3s';
      this.element.style.opacity = '1';
      this.element.style.transform = 'translateY(0)';
    });
  }

  /**
   * Lifecycle hook when unmounted
   */
  protected onUnmount(): void {
    console.log(`UserCard unmounted for ${this.userData.name}`);
  }

  /**
   * Static factory method for creating user cards
   */
  static create(userData: UserData): UserCard {
    return new UserCard(userData);
  }
}