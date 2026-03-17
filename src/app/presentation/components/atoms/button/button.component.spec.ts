import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { ButtonComponent, ButtonVariant } from './button.component';
import { describe, it, expect, vi } from 'vitest';

describe('ButtonComponent', () => {
  it('should create', async () => {
    const { fixture } = await render(ButtonComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  describe('variant input', () => {
    it('should render with default primary variant', async () => {
      const { fixture } = await render(ButtonComponent);
      expect(fixture.componentInstance.variant()).toBe('primary');
    });

    it('should render with accent variant', async () => {
      const { fixture } = await render(ButtonComponent, {
        componentInputs: { variant: 'accent' }
      });
      expect(fixture.componentInstance.variant()).toBe('accent');
    });

    it('should render with warn variant', async () => {
      const { fixture } = await render(ButtonComponent, {
        componentInputs: { variant: 'warn' }
      });
      expect(fixture.componentInstance.variant()).toBe('warn');
    });

    it('should render with basic variant', async () => {
      const { fixture } = await render(ButtonComponent, {
        componentInputs: { variant: 'basic' }
      });
      expect(fixture.componentInstance.variant()).toBe('basic');
    });

    it('should render with secondary variant', async () => {
      const { fixture } = await render(ButtonComponent, {
        componentInputs: { variant: 'secondary' }
      });
      expect(fixture.componentInstance.variant()).toBe('secondary');
    });
  });

  describe('type input', () => {
    it('should have default type button', async () => {
      const { fixture } = await render(ButtonComponent);
      expect(fixture.componentInstance.type()).toBe('button');
    });

    it('should accept submit type', async () => {
      const { fixture } = await render(ButtonComponent, {
        componentInputs: { type: 'submit' }
      });
      expect(fixture.componentInstance.type()).toBe('submit');
    });

    it('should accept reset type', async () => {
      const { fixture } = await render(ButtonComponent, {
        componentInputs: { type: 'reset' }
      });
      expect(fixture.componentInstance.type()).toBe('reset');
    });
  });

  describe('disabled input', () => {
    it('should not be disabled by default', async () => {
      const { fixture } = await render(ButtonComponent);
      expect(fixture.componentInstance.disabled()).toBe(false);
    });

    it('should be disabled when disabled input is true', async () => {
      const { fixture } = await render(ButtonComponent, {
        componentInputs: { disabled: true }
      });
      expect(fixture.componentInstance.disabled()).toBe(true);
    });
  });

  describe('fullWidth input', () => {
    it('should not be full width by default', async () => {
      const { fixture } = await render(ButtonComponent);
      expect(fixture.componentInstance.fullWidth()).toBe(false);
    });

    it('should be full width when fullWidth input is true', async () => {
      const { fixture } = await render(ButtonComponent, {
        componentInputs: { fullWidth: true }
      });
      expect(fixture.componentInstance.fullWidth()).toBe(true);
    });
  });

  describe('clicked output', () => {
    it('should emit clicked event when button is clicked', async () => {
      const user = userEvent.setup();
      let clickCount = 0;

      const { fixture } = await render(ButtonComponent);
      fixture.componentInstance.clicked.subscribe(() => {
        clickCount++;
      });

      const button = screen.getByRole('button');
      await user.click(button);

      expect(clickCount).toBe(1);
    });

    it('should not emit clicked event when button is disabled', async () => {
      let clickCount = 0;

      const { fixture } = await render(ButtonComponent, {
        componentInputs: { disabled: true }
      });
      fixture.componentInstance.clicked.subscribe(() => {
        clickCount++;
      });

      const button = screen.getByRole('button');
      // Manually call click since disabled buttons prevent pointer events
      button.click();

      expect(clickCount).toBe(0);
    });
  });

  describe('getColor method', () => {
    it('should return primary color for primary variant', async () => {
      const { fixture } = await render(ButtonComponent, {
        componentInputs: { variant: 'primary' }
      });
      expect(fixture.componentInstance.getColor()).toBe('primary');
    });

    it('should return accent color for accent variant', async () => {
      const { fixture } = await render(ButtonComponent, {
        componentInputs: { variant: 'accent' }
      });
      expect(fixture.componentInstance.getColor()).toBe('accent');
    });

    it('should return warn color for warn variant', async () => {
      const { fixture } = await render(ButtonComponent, {
        componentInputs: { variant: 'warn' }
      });
      expect(fixture.componentInstance.getColor()).toBe('warn');
    });

    it('should return undefined for basic variant', async () => {
      const { fixture } = await render(ButtonComponent, {
        componentInputs: { variant: 'basic' }
      });
      expect(fixture.componentInstance.getColor()).toBeUndefined();
    });

    it('should return undefined for secondary variant', async () => {
      const { fixture } = await render(ButtonComponent, {
        componentInputs: { variant: 'secondary' }
      });
      expect(fixture.componentInstance.getColor()).toBeUndefined();
    });
  });

  describe('accessibility', () => {
    it('should have role button', async () => {
      await render(ButtonComponent);
      const button = screen.getByRole('button');
      expect(button).toBeTruthy();
    });

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup();
      let clickCount = 0;

      const { fixture } = await render(ButtonComponent);
      fixture.componentInstance.clicked.subscribe(() => {
        clickCount++;
      });

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');

      expect(clickCount).toBe(1);
    });
  });
});
