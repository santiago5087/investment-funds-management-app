import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { InputComponent, InputType } from './input.component';
import { describe, it, expect, vi } from 'vitest';

describe('InputComponent', () => {
  it('should create', async () => {
    const { fixture } = await render(InputComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  describe('id input', () => {
    it('should generate random id by default', async () => {
      const { fixture } = await render(InputComponent);
      const id = fixture.componentInstance.id();
      expect(id).toContain('input-');
    });

    it('should accept custom id', async () => {
      const { fixture } = await render(InputComponent, {
        componentInputs: { id: 'custom-input-id' }
      });
      expect(fixture.componentInstance.id()).toBe('custom-input-id');
    });
  });

  describe('type input', () => {
    it('should have default type text', async () => {
      const { fixture } = await render(InputComponent);
      expect(fixture.componentInstance.type()).toBe('text');
    });

    it('should accept number type', async () => {
      const { fixture } = await render(InputComponent, {
        componentInputs: { type: 'number' }
      });
      expect(fixture.componentInstance.type()).toBe('number');
    });

    it('should accept email type', async () => {
      const { fixture } = await render(InputComponent, {
        componentInputs: { type: 'email' }
      });
      expect(fixture.componentInstance.type()).toBe('email');
    });

    it('should accept tel type', async () => {
      const { fixture } = await render(InputComponent, {
        componentInputs: { type: 'tel' }
      });
      expect(fixture.componentInstance.type()).toBe('tel');
    });
  });

  describe('label input', () => {
    it('should have empty label by default', async () => {
      const { fixture } = await render(InputComponent);
      expect(fixture.componentInstance.label()).toBe('');
    });

    it('should accept custom label', async () => {
      const { fixture } = await render(InputComponent, {
        componentInputs: { label: 'Username' }
      });
      expect(fixture.componentInstance.label()).toBe('Username');
    });
  });

  describe('placeholder input', () => {
    it('should have empty placeholder by default', async () => {
      const { fixture } = await render(InputComponent);
      expect(fixture.componentInstance.placeholder()).toBe('');
    });

    it('should accept custom placeholder', async () => {
      const { fixture } = await render(InputComponent, {
        componentInputs: { placeholder: 'Enter your name' }
      });
      expect(fixture.componentInstance.placeholder()).toBe('Enter your name');
    });
  });

  describe('disabled input', () => {
    it('should not be disabled by default', async () => {
      const { fixture } = await render(InputComponent);
      expect(fixture.componentInstance.disabled()).toBe(false);
    });

    it('should be disabled when set to true', async () => {
      const { fixture } = await render(InputComponent, {
        componentInputs: { disabled: true }
      });
      expect(fixture.componentInstance.disabled()).toBe(true);
    });
  });

  describe('helperText input', () => {
    it('should have empty helper text by default', async () => {
      const { fixture } = await render(InputComponent);
      expect(fixture.componentInstance.helperText()).toBe('');
    });

    it('should accept custom helper text', async () => {
      const { fixture } = await render(InputComponent, {
        componentInputs: { helperText: 'This field is required' }
      });
      expect(fixture.componentInstance.helperText()).toBe('This field is required');
    });
  });

  describe('error input', () => {
    it('should have empty error by default', async () => {
      const { fixture } = await render(InputComponent);
      expect(fixture.componentInstance.error()).toBe('');
    });

    it('should accept error message', async () => {
      const { fixture } = await render(InputComponent, {
        componentInputs: { error: 'Invalid email format' }
      });
      expect(fixture.componentInstance.error()).toBe('Invalid email format');
    });
  });

  describe('min and max inputs', () => {
    it('should have undefined min by default', async () => {
      const { fixture } = await render(InputComponent);
      expect(fixture.componentInstance.min()).toBeUndefined();
    });

    it('should have undefined max by default', async () => {
      const { fixture } = await render(InputComponent);
      expect(fixture.componentInstance.max()).toBeUndefined();
    });

    it('should accept min value', async () => {
      const { fixture } = await render(InputComponent, {
        componentInputs: { type: 'number', min: 0 }
      });
      expect(fixture.componentInstance.min()).toBe(0);
    });

    it('should accept max value', async () => {
      const { fixture } = await render(InputComponent, {
        componentInputs: { type: 'number', max: 100 }
      });
      expect(fixture.componentInstance.max()).toBe(100);
    });

    it('should accept both min and max values', async () => {
      const { fixture } = await render(InputComponent, {
        componentInputs: { type: 'number', min: 10, max: 50 }
      });
      expect(fixture.componentInstance.min()).toBe(10);
      expect(fixture.componentInstance.max()).toBe(50);
    });
  });

  describe('value model', () => {
    it('should have empty string as default value', async () => {
      const { fixture } = await render(InputComponent);
      expect(fixture.componentInstance.value()).toBe('');
    });

    it('should accept initial value', async () => {
      const { fixture } = await render(InputComponent, {
        componentInputs: { value: 'Initial text' }
      });
      expect(fixture.componentInstance.value()).toBe('Initial text');
    });

    it('should accept number value for number type', async () => {
      const { fixture } = await render(InputComponent, {
        componentInputs: { type: 'number', value: 42 }
      });
      expect(fixture.componentInstance.value()).toBe(42);
    });

    it('should update value when user types', async () => {
      const user = userEvent.setup();
      const { fixture } = await render(InputComponent, {
        componentInputs: { label: 'Test Input' }
      });

      const input = screen.getByRole('textbox');
      await user.type(input, 'Hello');
      
      // The value is updated through ngModel binding
      expect(input).toHaveValue('Hello');
    });
  });

  describe('Material Form Field', () => {
    it('should render Material form field', async () => {
      await render(InputComponent, {
        componentInputs: { label: 'Test' }
      });
      const formField = document.querySelector('mat-form-field');
      expect(formField).toBeTruthy();
    });

    it('should render input element', async () => {
      await render(InputComponent);
      const input = document.querySelector('input');
      expect(input).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('should have proper input role', async () => {
      await render(InputComponent);
      const input = screen.getByRole('textbox');
      expect(input).toBeTruthy();
    });

    it('should associate label with input', async () => {
      const { container } = await render(InputComponent, {
        componentInputs: { label: 'Username' }
      });
      
      const input = container.querySelector('input');
      expect(input).toBeTruthy();
      
      const label = container.querySelector('mat-label');
      expect(label?.textContent).toContain('Username');
    });
  });

  describe('validation states', () => {
    it('should display error message when error is provided', async () => {
      const { fixture } = await render(InputComponent, {
        componentInputs: { error: 'This field is required' }
      });
      expect(fixture.componentInstance.error()).toBe('This field is required');
    });

    it('should not have error when error is empty', async () => {
      const { fixture } = await render(InputComponent);
      expect(fixture.componentInstance.error()).toBe('');
    });
  });
});
