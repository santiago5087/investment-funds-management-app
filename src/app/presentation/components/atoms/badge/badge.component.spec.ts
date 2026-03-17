import { render, screen } from '@testing-library/angular';
import { BadgeComponent, BadgeVariant } from './badge.component';
import { describe, it, expect } from 'vitest';

describe.skip('BadgeComponent', () => {
  it('should create', async () => {
    const { fixture } = await render(BadgeComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render with default info variant', async () => {
    const { fixture } = await render(BadgeComponent);
    expect(fixture.componentInstance.variant()).toBe('info');
  });

  it('should render with success variant', async () => {
    const { fixture } = await render(BadgeComponent, {
      componentInputs: { variant: 'success' }
    });
    expect(fixture.componentInstance.variant()).toBe('success');
  });

  it('should render with warning variant', async () => {
    const { fixture } = await render(BadgeComponent, {
      componentInputs: { variant: 'warning' }
    });
    expect(fixture.componentInstance.variant()).toBe('warning');
  });

  it('should render with danger variant', async () => {
    const { fixture } = await render(BadgeComponent, {
      componentInputs: { variant: 'danger' }
    });
    expect(fixture.componentInstance.variant()).toBe('danger');
  });

  it('should render mat-chip element', async () => {
    await render(BadgeComponent);
    const chip = document.querySelector('mat-chip');
    expect(chip).toBeTruthy();
  });

  it('should render mat-chip component', async () => {
    const { container } = await render(BadgeComponent);
    const element = container.querySelector('mat-chip');
    expect(element).toBeTruthy();
  });

  it('should accept any valid BadgeVariant', async () => {
    const variants: BadgeVariant[] = ['info', 'success', 'warning', 'danger'];
    
    for (const variant of variants) {
      const { fixture, rerender } = await render(BadgeComponent, {
        componentInputs: { variant }
      });
      expect(fixture.componentInstance.variant()).toBe(variant);
      
      // Clean up between iterations
      fixture.destroy();
    }
  });

  it('should render badge with mat-chip', async () => {
    const { container } = await render(BadgeComponent, {
      componentInputs: { variant: 'success' }
    });
    
    const badge = container.querySelector('mat-chip');
    expect(badge).toBeInTheDocument();
  });
});
