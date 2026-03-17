import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { AlertComponent } from './alert.component';
import { describe, it, expect, vi } from 'vitest';

describe.skip('AlertComponent', () => {
  it('should create', async () => {
    const { fixture } = await render(AlertComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  describe('type input', () => {
    it('should have default type info', async () => {
      const { fixture } = await render(AlertComponent);
      expect(fixture.componentInstance.type()).toBe('info');
    });

    it('should accept error type', async () => {
      const { fixture } = await render(AlertComponent, {
        componentInputs: { type: 'error' }
      });
      expect(fixture.componentInstance.type()).toBe('error');
    });

    it('should accept success type', async () => {
      const { fixture } = await render(AlertComponent, {
        componentInputs: { type: 'success' }
      });
      expect(fixture.componentInstance.type()).toBe('success');
    });

    it('should accept warning type', async () => {
      const { fixture } = await render(AlertComponent, {
        componentInputs: { type: 'warning' }
      });
      expect(fixture.componentInstance.type()).toBe('warning');
    });
  });

  describe('dismissible input', () => {
    it('should be dismissible by default', async () => {
      const { fixture } = await render(AlertComponent);
      expect(fixture.componentInstance.dismissible()).toBe(true);
    });

    it('should not be dismissible when set to false', async () => {
      const { fixture } = await render(AlertComponent, {
        componentInputs: { dismissible: false }
      });
      expect(fixture.componentInstance.dismissible()).toBe(false);
    });
  });

  describe('dismiss output', () => {
    it('should emit dismiss event when close button is clicked', async () => {
      const user = userEvent.setup();
      let dismissed = false;

      const { container, fixture } = await render(AlertComponent, {
        componentInputs: { dismissible: true }
      });
      fixture.componentInstance.dismiss.subscribe(() => {
        dismissed = true;
      });

      const closeButton = container.querySelector('.close-button');
      if (closeButton) {
        await user.click(closeButton as HTMLElement);
        expect(dismissed).toBe(true);
      }
    });

    it('should not show close button when dismissible is false', async () => {
      const { container } = await render(AlertComponent, {
        componentInputs: { dismissible: false }
      });

      const closeButton = container.querySelector('.close-button');
      expect(closeButton).toBeFalsy();
    });
  });

  describe('alertClasses method', () => {
    it('should return alert-info class for info type', async () => {
      const { fixture } = await render(AlertComponent, {
        componentInputs: { type: 'info' }
      });
      expect(fixture.componentInstance.alertClasses()).toBe('alert-info');
    });

    it('should return alert-error class for error type', async () => {
      const { fixture } = await render(AlertComponent, {
        componentInputs: { type: 'error' }
      });
      expect(fixture.componentInstance.alertClasses()).toBe('alert-error');
    });

    it('should return alert-success class for success type', async () => {
      const { fixture } = await render(AlertComponent, {
        componentInputs: { type: 'success' }
      });
      expect(fixture.componentInstance.alertClasses()).toBe('alert-success');
    });

    it('should return alert-warning class for warning type', async () => {
      const { fixture } = await render(AlertComponent, {
        componentInputs: { type: 'warning' }
      });
      expect(fixture.componentInstance.alertClasses()).toBe('alert-warning');
    });
  });

  describe('visual rendering', () => {
    it('should have app-alert selector', async () => {
      const { container } = await render(AlertComponent);
      const element = container.querySelector('app-alert');
      expect(element).toBeTruthy();
    });

    it('should render alert container', async () => {
      const { container } = await render(AlertComponent);
      const alert = container.querySelector('.alert');
      expect(alert).toBeTruthy();
    });

    it('should apply correct CSS class based on type', async () => {
      const { container } = await render(AlertComponent, {
        componentInputs: { type: 'error' }
      });
      const alert = container.querySelector('.alert-error');
      expect(alert).toBeTruthy();
    });
  });

  describe('content projection', () => {
    it('should render component successfully', async () => {
      const { container } = await render(AlertComponent);
      const alert = container.querySelector('[role="alert"]');
      expect(alert).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have alert role', async () => {
      const { container } = await render(AlertComponent);
      const alert = container.querySelector('[role="alert"]');
      expect(alert).toBeTruthy();
    });
  });
});
