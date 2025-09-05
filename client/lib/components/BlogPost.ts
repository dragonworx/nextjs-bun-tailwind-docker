import { Component } from '../Component';

interface Post {
  title: string;
  date: string;
  author: string;
  content: string;
}

interface BlogPostState {
  post: Post;
  slug: string;
}

export class BlogPost extends Component<HTMLElement, BlogPostState> {
  constructor(post: Post, slug: string) {
    super('', 'article');
    this.setState({
      post,
      slug
    });
  }

  protected getDefaultTagName(): keyof HTMLElementTagNameMap {
    return 'article';
  }

  protected processTemplate(template: string): string {
    const state = this.getState();
    const { post, slug } = state;
    
    return `
      <div style="padding: 2rem; font-family: Georgia, serif; max-width: 800px; margin: 0 auto;">
        <header style="margin-bottom: 2rem;">
          <h1 style="font-size: 2.5rem; line-height: 1.2; margin-bottom: 0.5rem;">${post.title}</h1>
          <div style="color: #6b7280; font-family: system-ui; font-size: 0.875rem;">
            <span>By ${post.author}</span>
            <span style="margin: 0 0.5rem;">•</span>
            <span>${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </header>
        
        <div style="font-size: 1.125rem; line-height: 1.75; color: #374151;">
          ${post.content}
        </div>
        
        <div style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #e5e7eb;">
          <div style="background: #f9fafb; padding: 1rem; border-radius: 8px; font-family: system-ui;">
            <p style="margin: 0; color: #6b7280; font-size: 0.875rem;">
              📝 This page uses a <code style="background: white; padding: 2px 6px; border-radius: 4px;">[slug]</code> parameter
              <br>Current slug: <code style="background: white; padding: 2px 6px; border-radius: 4px;">${slug}</code>
            </p>
          </div>
        </div>
      </div>
    `;
  }

  setPost(post: Post, slug: string): void {
    this.setState({ post, slug });
  }
}