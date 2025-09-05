import { TemplateComponent } from '@lib/components/TemplateComponent';
import { Card } from '@lib/components/Card';
import { LinkList } from '@lib/components/LinkList';
import { BlogPost } from '@lib/components/BlogPost';
import { useParam } from '@lib/router';
import { createBreadcrumbs } from '@lib/layout';

interface Post {
  title: string;
  date: string;
  author: string;
  content: string;
}

interface PostDetailPageState {
  post: Post | null;
  slug: string | null;
  otherPosts: Array<{ slug: string; title: string }>;
  initialized: boolean;
}

export class PostDetailPage extends TemplateComponent<HTMLDivElement, PostDetailPageState> {
  private blogPost: BlogPost | null = null;
  private otherPostsCard: Card;
  private backLinks: LinkList;

  constructor() {
    super('', 'div');
    this.setState({ post: null, slug: null, otherPosts: [], initialized: false });
  }

  protected processTemplate(template: string): string {
    const state = this.getState();
    
    if (!state.post) {
      return `
        <div id="breadcrumbs"></div>
        <div style="padding: 2rem; font-family: system-ui; max-width: 800px; margin: 0 auto;">
          <h1>Post Not Found</h1>
          <p>The post with slug "${state.slug}" does not exist.</p>
          <div id="other-posts"></div>
          <div id="back-links"></div>
        </div>
      `;
    }

    return `
      <div id="breadcrumbs"></div>
      <div id="blog-post"></div>
      <div style="max-width: 800px; margin: 0 auto;">
        <div id="other-posts"></div>
        <div id="back-links"></div>
      </div>
    `;
  }

  protected onMount(): void {
    this.loadPostData();
  }

  private loadPostData(): void {
    const slug = useParam('slug');
    
    // Mock blog posts data
    const posts: Record<string, Post> = {
      'hello-world': {
        title: 'Hello World: Getting Started with Dynamic Routes',
        date: '2024-01-15',
        author: 'Alice Johnson',
        content: `
          <p>Welcome to our new blog! This post demonstrates how dynamic routing works with slug parameters.</p>
          <p>The URL slug "hello-world" is captured from the route pattern <code>/posts/[slug]</code> and used to fetch the appropriate content.</p>
          <p>This approach allows for SEO-friendly URLs while maintaining a dynamic, JavaScript-powered application.</p>
        `
      },
      'dynamic-routing-guide': {
        title: 'A Complete Guide to Dynamic Routing',
        date: '2024-01-20',
        author: 'Bob Smith',
        content: `
          <p>Dynamic routing is essential for modern web applications. It allows you to create flexible URL patterns that can handle various parameters.</p>
          <h3>Key Features:</h3>
          <ul>
            <li>Parameter extraction from URLs</li>
            <li>Pattern matching with regex</li>
            <li>Client-side navigation without page reloads</li>
          </ul>
        `
      },
      'vite-and-bun': {
        title: 'Building Modern Apps with Vite and Bun',
        date: '2024-01-25',
        author: 'Charlie Brown',
        content: `
          <p>Vite and Bun make an excellent combination for modern web development.</p>
          <p>Vite provides lightning-fast HMR and optimized builds, while Bun offers incredible JavaScript runtime performance.</p>
          <p>Together, they create a development experience that's both productive and enjoyable.</p>
        `
      }
    };

    const post = slug ? posts[slug] : null;
    const otherPosts = Object.keys(posts)
      .filter(s => s !== slug)
      .map(s => ({ slug: s, title: posts[s].title }));

    this.setState({ post, slug, otherPosts });
    this.initializeComponents(post, slug, otherPosts);
  }

  private initializeComponents(post: Post | null, slug: string | null, otherPosts: Array<{ slug: string; title: string }>): void {
    // Add breadcrumbs
    const breadcrumbsContainer = this.$('#breadcrumbs');
    if (breadcrumbsContainer) {
      const breadcrumbs = createBreadcrumbs([
        { label: 'Home', href: '/' },
        { label: 'Posts', href: '/posts/hello-world' },
        { label: post ? post.title : 'Post Not Found' }
      ]);
      breadcrumbsContainer.innerHTML = breadcrumbs;
    }

    if (post && slug) {
      // Blog post
      this.blogPost = new BlogPost(post, slug);
      this.blogPost.mount('#blog-post');
    }

    // Other posts card
    const otherPostsList = new LinkList(
      otherPosts.map(p => ({ 
        href: `/posts/${p.slug}`, 
        label: p.title 
      })),
      post ? 'Other Posts:' : 'Try these posts:'
    );
    
    this.otherPostsCard = new Card(otherPostsList.element.outerHTML);
    this.otherPostsCard.mount('#other-posts');

    // Back links
    this.backLinks = new LinkList([
      { href: '/', label: '← Back to Home' }
    ]);
    this.backLinks.mount('#back-links');

    this.setState({ initialized: true });
  }

  protected onUnmount(): void {
    this.blogPost?.unmount();
    this.otherPostsCard?.unmount();
    this.backLinks?.unmount();
  }
}