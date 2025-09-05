import { Component } from '../Component';

interface LinkItem {
  href: string;
  label: string;
  description?: string;
}

interface LinkListState {
  items: LinkItem[];
  title?: string;
  listStyle?: 'default' | 'nav' | 'terminal';
}

export class LinkList extends Component<HTMLDivElement, LinkListState> {
  constructor(items: LinkItem[], title?: string, listStyle: LinkListState['listStyle'] = 'default') {
    super('', 'div');
    this.setState({ items, title, listStyle });
  }

  protected getInitialState(): LinkListState {
    return {
      items: [],
      title: undefined,
      listStyle: 'default'
    };
  }

  protected processTemplate(template: string): string {
    const state = this.getState();
    const styles = this.getListStyles(state.listStyle || 'default');
    const items = state.items || [];
    
    return `
      <div>
        ${state.title ? `<h3>${state.title}</h3>` : ''}
        <ul style="${styles.listStyle}">
          ${items.map(item => `
            <li style="${styles.itemStyle}">
              <a href="${item.href}" style="${styles.linkStyle}">${item.label}</a>
              ${item.description ? `<span style="${styles.descStyle}">${item.description}</span>` : ''}
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }

  private getListStyles(variant: LinkListState['listStyle']) {
    switch (variant) {
      case 'nav':
        return {
          listStyle: 'list-style: none; padding: 0; display: flex; gap: 1rem; flex-wrap: wrap;',
          itemStyle: 'margin: 0;',
          linkStyle: 'color: #0066cc; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px; background: #f3f4f6;',
          descStyle: 'color: #6b7280; font-size: 0.875rem; margin-left: 0.5rem;'
        };
      case 'terminal':
        return {
          listStyle: 'list-style: none; padding: 0;',
          itemStyle: 'margin: 0.5rem 0;',
          linkStyle: 'color: #569cd6;',
          descStyle: 'color: #608b4e; margin-left: 0.5rem;'
        };
      default:
        return {
          listStyle: 'padding-left: 1.5rem;',
          itemStyle: 'margin: 0.5rem 0;',
          linkStyle: 'color: #0066cc;',
          descStyle: 'color: #6b7280; font-size: 0.875rem; margin-left: 0.5rem;'
        };
    }
  }

  addItem(item: LinkItem): void {
    const currentState = this.getState();
    this.setState({
      items: [...currentState.items, item]
    });
  }

  setItems(items: LinkItem[]): void {
    this.setState({ items });
  }
}