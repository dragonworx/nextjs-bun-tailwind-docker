import { UserCard } from '../components/UserCard/UserCard';

/**
 * Demo of template-based components
 * Shows how to create, mount, and interact with components
 */
export function runTemplateComponentsDemo() {
  console.log('Running Template Components Demo...');

  // Sample user data
  const userData = {
    name: 'Sarah Chen',
    title: 'Senior Frontend Developer',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b97c?w=150&h=150&fit=crop&crop=face',
    status: 'online' as const,
    projects: 12,
    commits: 247
  };

  // Create component instance
  const userCard = new UserCard(userData);

  // Mount to DOM
  const container = document.getElementById('app');
  if (container) {
    userCard.mount(container);
  }

  // Listen for custom events
  userCard.element.addEventListener('user-message', (e: CustomEvent) => {
    console.log('Message clicked for:', e.detail.user.name);
    alert(`Opening message dialog for ${e.detail.user.name}`);
  });

  userCard.element.addEventListener('user-follow', (e: CustomEvent) => {
    console.log('Follow toggled:', e.detail);
    const status = e.detail.isFollowing ? 'Following' : 'Not following';
    console.log(`${status} ${e.detail.user.name}`);
  });

  // Demo programmatic interactions
  setTimeout(() => {
    console.log('Updating user status to busy...');
    userCard.updateStatus('busy');
  }, 3000);

  setTimeout(() => {
    console.log('Updating user data...');
    userCard.updateUserData({
      commits: 251,
      projects: 13
    });
  }, 5000);

  // Create multiple cards
  const moreUsers = [
    {
      name: 'Alex Rodriguez',
      title: 'Backend Engineer',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      status: 'offline' as const,
      projects: 8,
      commits: 189
    },
    {
      name: 'Maya Patel',
      title: 'UX Designer',
      avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      status: 'busy' as const,
      projects: 15,
      commits: 92
    }
  ];

  // Create a grid container
  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(320px, 1fr))';
  grid.style.gap = '1rem';
  grid.style.marginTop = '2rem';
  grid.style.padding = '1rem';

  // Add multiple cards
  moreUsers.forEach((user, index) => {
    const card = UserCard.create(user);
    
    // Stagger the mounting animation
    setTimeout(() => {
      card.mount(grid);
    }, index * 200);
  });

  container?.appendChild(grid);

  return {
    userCard,
    cleanup: () => {
      userCard.unmount();
      grid.remove();
    }
  };
}