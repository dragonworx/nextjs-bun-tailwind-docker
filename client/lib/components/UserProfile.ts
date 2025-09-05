import { Component } from '../Component';

interface User {
  name: string;
  role: string;
  email: string;
  joined: string;
}

interface UserProfileState {
  user: User;
  userId: string;
}

export class UserProfile extends Component<HTMLDivElement, UserProfileState> {
  constructor(user: User, userId: string) {
    super('', 'div');
    this.setState({
      user,
      userId
    });
  }

  protected processTemplate(template: string): string {
    const state = this.getState();
    const { user, userId } = state;
    
    return `
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                  color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">
        <h1 style="margin: 0;">${user.name}</h1>
        <p style="margin: 0.5rem 0 0 0; opacity: 0.9;">User ID: ${userId}</p>
      </div>
      
      <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.5rem;">
        <h2 style="margin-top: 0; color: #374151;">User Details</h2>
        
        <div style="display: grid; gap: 1rem;">
          <div>
            <label style="display: block; color: #6b7280; font-size: 0.875rem; margin-bottom: 0.25rem;">Role</label>
            <p style="margin: 0; font-size: 1.125rem;">${user.role}</p>
          </div>
          
          <div>
            <label style="display: block; color: #6b7280; font-size: 0.875rem; margin-bottom: 0.25rem;">Email</label>
            <p style="margin: 0; font-size: 1.125rem;">${user.email}</p>
          </div>
          
          <div>
            <label style="display: block; color: #6b7280; font-size: 0.875rem; margin-bottom: 0.25rem;">Joined</label>
            <p style="margin: 0; font-size: 1.125rem;">${new Date(user.joined).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    `;
  }

  setUser(user: User, userId: string): void {
    this.setState({ user, userId });
  }
}