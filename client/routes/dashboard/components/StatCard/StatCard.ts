import { Component } from '@lib/Component';
import templateHtml from './StatCard.html';
import './StatCard.css';

const template = templateHtml as string;

interface StatCardState {
  label: string;
  value: string;
  unit?: string;
}

export class StatCard extends Component<HTMLElement, StatCardState> {
  constructor(initialData: StatCardState) {
    super(template, 'div');
    this.addClass('stat-card-component');
    // Set initial state (will trigger render)
    this.setState(initialData);
  }

  protected getInitialState(): StatCardState {
    return {
      label: 'Loading...',
      value: '-'
    };
  }

  protected processTemplate(template: string): string {
    const state = this.getState();

    let processed = template
      .replace(/\{\{label\}\}/g, state.label)
      .replace(/\{\{value\}\}/g, state.value);

    // Handle conditional unit rendering
    if (state.unit) {
      processed = processed
        .replace(/\{\{#if unit\}\}/g, '')
        .replace(/\{\{\/if\}\}/g, '')
        .replace(/\{\{unit\}\}/g, state.unit);
    } else {
      // Remove the conditional block if no unit
      processed = processed.replace(/\{\{#if unit\}\}[\s\S]*?\{\{\/if\}\}/g, '');
    }

    return processed;
  }

  setValue(value: string, unit?: string): void {
    const updates: Partial<StatCardState> = { value };
    if (unit !== undefined) {
      updates.unit = unit;
    }
    this.setState(updates);
  }

  updateData(statData: Partial<StatCardState>): void {
    this.setState(statData);
  }

  protected onMount(): void {
    console.log(`Stat card mounted: ${this.getState().label}`);
  }
}
