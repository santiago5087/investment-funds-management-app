import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { ActionCardComponent, ActionCardVariant } from './action-card.component';
import { ButtonVariant } from '../../atoms/button/button.component';
import { provideRouter } from '@angular/router';
import { describe, it, expect } from 'vitest';

describe('ActionCardComponent', () => {
  const defaultProps = {
    icon: 'account_balance',
    title: 'Test Campaign',
    description: 'Test description for the card',
    buttonText: 'Click Me',
    routerLink: '/test-route'
  };

  it('should create', async () => {
    const { fixture } = await render(ActionCardComponent, {
      componentInputs: defaultProps,
      providers: [provideRouter([])]
    });
    expect(fixture.componentInstance).toBeTruthy();
  });

  describe('required inputs', () => {
    it('should accept icon input', async () => {
      const { fixture } = await render(ActionCardComponent, {
        componentInputs: { ...defaultProps, icon: 'savings' },
        providers: [provideRouter([])]
      });
      expect(fixture.componentInstance.icon()).toBe('savings');
    });

    it('should accept title input', async () => {
      const { fixture } = await render(ActionCardComponent, {
        componentInputs: { ...defaultProps, title: 'New Title' },
        providers: [provideRouter([])]
      });
      expect(fixture.componentInstance.title()).toBe('New Title');
    });

    it('should accept description input', async () => {
      const { fixture } = await render(ActionCardComponent, {
        componentInputs: { ...defaultProps, description: 'New description' },
        providers: [provideRouter([])]
      });
      expect(fixture.componentInstance.description()).toBe('New description');
    });

    it('should accept buttonText input', async () => {
      const { fixture } = await render(ActionCardComponent, {
        componentInputs: { ...defaultProps, buttonText: 'Action Button' },
        providers: [provideRouter([])]
      });
      expect(fixture.componentInstance.buttonText()).toBe('Action Button');
    });

    it('should accept routerLink input', async () => {
      const { fixture } = await render(ActionCardComponent, {
        componentInputs: { ...defaultProps, routerLink: '/new-route' },
        providers: [provideRouter([])]
      });
      expect(fixture.componentInstance.routerLink()).toBe('/new-route');
    });
  });

  describe('optional inputs', () => {
    it('should have default variant primary', async () => {
      const { fixture } = await render(ActionCardComponent, {
        componentInputs: defaultProps,
        providers: [provideRouter([])]
      });
      expect(fixture.componentInstance.variant()).toBe('primary');
    });

    it('should accept accent variant', async () => {
      const { fixture } = await render(ActionCardComponent, {
        componentInputs: { ...defaultProps, variant: 'accent' as ActionCardVariant },
        providers: [provideRouter([])]
      });
      expect(fixture.componentInstance.variant()).toBe('accent');
    });

    it('should accept history variant', async () => {
      const { fixture } = await render(ActionCardComponent, {
        componentInputs: { ...defaultProps, variant: 'history' as ActionCardVariant },
        providers: [provideRouter([])]
      });
      expect(fixture.componentInstance.variant()).toBe('history');
    });

    it('should have default buttonVariant primary', async () => {
      const { fixture } = await render(ActionCardComponent, {
        componentInputs: defaultProps,
        providers: [provideRouter([])]
      });
      expect(fixture.componentInstance.buttonVariant()).toBe('primary');
    });

    it('should accept custom buttonVariant', async () => {
      const { fixture } = await render(ActionCardComponent, {
        componentInputs: { ...defaultProps, buttonVariant: 'accent' as ButtonVariant },
        providers: [provideRouter([])]
      });
      expect(fixture.componentInstance.buttonVariant()).toBe('accent');
    });
  });

  describe('visual rendering', () => {
    it('should render icon element', async () => {
      const { container } = await render(ActionCardComponent, {
        componentInputs: { ...defaultProps, icon: 'star' },
        providers: [provideRouter([])]
      });
      const icon = container.querySelector('.material-icons');
      expect(icon).toBeTruthy();
    });

    it('should render title', async () => {
      await render(ActionCardComponent, {
        componentInputs: { ...defaultProps, title: 'Visible Title' },
        providers: [provideRouter([])]
      });
      expect(screen.getByText('Visible Title')).toBeTruthy();
    });

    it('should render description', async () => {
      await render(ActionCardComponent, {
        componentInputs: { ...defaultProps, description: 'Visible Description' },
        providers: [provideRouter([])]
      });
      expect(screen.getByText('Visible Description')).toBeTruthy();
    });

    it('should render button with correct text', async () => {
      await render(ActionCardComponent, {
        componentInputs: { ...defaultProps, buttonText: 'Test Button' },
        providers: [provideRouter([])]
      });
      expect(screen.getByText('Test Button')).toBeTruthy();
    });
  });

  describe('router integration', () => {
    it('should have router link', async () => {
      const { container } = await render(ActionCardComponent, {
        componentInputs: { ...defaultProps, routerLink: '/funds' },
        providers: [provideRouter([])]
      });
      const button = container.querySelector('app-button');
      expect(button).toBeTruthy();
    });

    it('should have router link configured', async () => {
      const { container } = await render(ActionCardComponent, {
        componentInputs: defaultProps,
        providers: [provideRouter([{ path: 'test-route', component: ActionCardComponent }])]
      });

      const button = container.querySelector('app-button');
      expect(button).toBeTruthy();
    });
  });

  describe('styling variants', () => {
    it('should apply primary variant class', async () => {
      const { container } = await render(ActionCardComponent, {
        componentInputs: { ...defaultProps, variant: 'primary' as ActionCardVariant },
        providers: [provideRouter([])]
      });
      const card = container.querySelector('.primary-action');
      expect(card).toBeTruthy();
    });

    it('should apply accent variant class', async () => {
      const { container } = await render(ActionCardComponent, {
        componentInputs: { ...defaultProps, variant: 'accent' as ActionCardVariant },
        providers: [provideRouter([])]
      });
      const card = container.querySelector('.accent-action');
      expect(card).toBeTruthy();
    });

    it('should apply history variant class', async () => {
      const { container } = await render(ActionCardComponent, {
        componentInputs: { ...defaultProps, variant: 'history' as ActionCardVariant },
        providers: [provideRouter([])]
      });
      const card = container.querySelector('.history-action');
      expect(card).toBeTruthy();
    });
  });
});
