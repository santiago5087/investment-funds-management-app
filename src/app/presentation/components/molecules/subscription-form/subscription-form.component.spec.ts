import { render, screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { SubscriptionFormComponent } from './subscription-form.component';
import { describe, it, expect, vi } from 'vitest';

describe('SubscriptionFormComponent', () => {
  const defaultProps = {
    fundName: 'Test Fund',
    minimumAmount: 50000,
    currentBalance: 500000
  };

  it('should create', async () => {
    const { fixture } = await render(SubscriptionFormComponent, {
      componentInputs: defaultProps
    });
    expect(fixture.componentInstance).toBeTruthy();
  });

  describe('inputs', () => {
    it('should accept fundName input', async () => {
      const { fixture } = await render(SubscriptionFormComponent, {
        componentInputs: { ...defaultProps, fundName: 'Custom Fund' }
      });
      expect(fixture.componentInstance.fundName()).toBe('Custom Fund');
    });

    it('should accept minimumAmount input', async () => {
      const { fixture } = await render(SubscriptionFormComponent, {
        componentInputs: { ...defaultProps, minimumAmount: 100000 }
      });
      expect(fixture.componentInstance.minimumAmount()).toBe(100000);
    });

    it('should accept currentBalance input', async () => {
      const { fixture } = await render(SubscriptionFormComponent, {
        componentInputs: { ...defaultProps, currentBalance: 1000000 }
      });
      expect(fixture.componentInstance.currentBalance()).toBe(1000000);
    });
  });

  describe('form initialization', () => {
    it('should initialize with default values', async () => {
      const { fixture } = await render(SubscriptionFormComponent, {
        componentInputs: defaultProps
      });

      const form = fixture.componentInstance.subscriptionForm;
      expect(form.controls.amount.value).toBe(0);
      expect(form.controls.notificationMethod.value).toBe('email');
      expect(form.controls.email.value).toBe('');
      expect(form.controls.phone.value).toBe('');
    });

    it('should have phone disabled by default', async () => {
      const { fixture } = await render(SubscriptionFormComponent, {
        componentInputs: defaultProps
      });

      expect(fixture.componentInstance.subscriptionForm.controls.phone.disabled).toBe(true);
    });

    it('should have email enabled by default', async () => {
      const { fixture } = await render(SubscriptionFormComponent, {
        componentInputs: defaultProps
      });

      expect(fixture.componentInstance.subscriptionForm.controls.email.enabled).toBe(true);
    });
  });

  describe('validation - amount', () => {
    it('should show error when amount is zero', async () => {
      const { fixture } = await render(SubscriptionFormComponent, {
        componentInputs: defaultProps
      });

      fixture.componentInstance.markAmountTouched();
      fixture.detectChanges();

      expect(fixture.componentInstance.amountError()).toBe('El monto es requerido');
    });

    it('should show error when amount is less than minimum', async () => {
      const { fixture } = await render(SubscriptionFormComponent, {
        componentInputs: defaultProps
      });

      fixture.componentInstance.subscriptionForm.controls.amount.setValue(10000);
      fixture.componentInstance.markAmountTouched();
      fixture.detectChanges();

      expect(fixture.componentInstance.amountError()).toBe('El monto ingresado es menor al mínimo requerido');
    });

    it('should show error when amount exceeds balance', async () => {
      const { fixture } = await render(SubscriptionFormComponent, {
        componentInputs: defaultProps
      });

      fixture.componentInstance.subscriptionForm.controls.amount.setValue(600000);
      fixture.componentInstance.markAmountTouched();
      fixture.detectChanges();

      expect(fixture.componentInstance.amountError()).toBe('Saldo insuficiente');
    });

    it('should not show error for valid amount', async () => {
      const { fixture } = await render(SubscriptionFormComponent, {
        componentInputs: defaultProps
      });

      fixture.componentInstance.subscriptionForm.controls.amount.setValue(100000);
      fixture.componentInstance.markAmountTouched();
      fixture.detectChanges();

      expect(fixture.componentInstance.amountError()).toBe('');
    });
  });

  describe('validation - email', () => {
    it('should show error when email is empty and touched', async () => {
      const { fixture } = await render(SubscriptionFormComponent, {
        componentInputs: defaultProps
      });

      fixture.componentInstance.markEmailTouched();
      fixture.detectChanges();

      expect(fixture.componentInstance.emailError()).toBe('El email es requerido');
    });

    it('should show error for invalid email format', async () => {
      const { fixture } = await render(SubscriptionFormComponent, {
        componentInputs: defaultProps
      });

      fixture.componentInstance.subscriptionForm.controls.email.setValue('invalid-email');
      fixture.componentInstance.markEmailTouched();
      fixture.detectChanges();

      expect(fixture.componentInstance.emailError()).toBe('Por favor ingrese un email válido');
    });

    it('should not show error for valid email', async () => {
      const { fixture } = await render(SubscriptionFormComponent, {
        componentInputs: defaultProps
      });

      fixture.componentInstance.subscriptionForm.controls.email.setValue('test@example.com');
      fixture.componentInstance.markEmailTouched();
      fixture.detectChanges();

      expect(fixture.componentInstance.emailError()).toBe('');
    });
  });

  describe('validation - phone', () => {
    it('should show error when phone is empty and SMS selected', async () => {
      const { fixture } = await render(SubscriptionFormComponent, {
        componentInputs: defaultProps
      });

      fixture.componentInstance.subscriptionForm.controls.notificationMethod.setValue('sms');
      fixture.componentInstance.markPhoneTouched();
      fixture.detectChanges();

      await waitFor(() => {
        expect(fixture.componentInstance.phoneError()).toBe('El teléfono es requerido');
      });
    });

    it('should show error for invalid phone format', async () => {
      const { fixture } = await render(SubscriptionFormComponent, {
        componentInputs: defaultProps
      });

      fixture.componentInstance.subscriptionForm.controls.notificationMethod.setValue('sms');
      fixture.detectChanges();

      await waitFor(() => {
        fixture.componentInstance.subscriptionForm.controls.phone.setValue('123');
        fixture.componentInstance.markPhoneTouched();
        fixture.detectChanges();
      });

      expect(fixture.componentInstance.phoneError()).toContain('número de teléfono válido');
    });

    it('should not show error for valid 10-digit phone', async () => {
      const { fixture } = await render(SubscriptionFormComponent, {
        componentInputs: defaultProps
      });

      fixture.componentInstance.subscriptionForm.controls.notificationMethod.setValue('sms');
      fixture.detectChanges();

      await waitFor(() => {
        fixture.componentInstance.subscriptionForm.controls.phone.setValue('3001234567');
        fixture.componentInstance.markPhoneTouched();
        fixture.detectChanges();
      });

      expect(fixture.componentInstance.phoneError()).toBe('');
    });
  });

  describe('notification method switching', () => {
    it('should enable email and disable phone when email is selected', async () => {
      const { fixture } = await render(SubscriptionFormComponent, {
        componentInputs: defaultProps
      });

      fixture.componentInstance.subscriptionForm.controls.notificationMethod.setValue('email');
      fixture.detectChanges();

      await waitFor(() => {
        expect(fixture.componentInstance.subscriptionForm.controls.email.enabled).toBe(true);
        expect(fixture.componentInstance.subscriptionForm.controls.phone.disabled).toBe(true);
      });
    });

    it('should enable phone and disable email when SMS is selected', async () => {
      const { fixture } = await render(SubscriptionFormComponent, {
        componentInputs: defaultProps
      });

      fixture.componentInstance.subscriptionForm.controls.notificationMethod.setValue('sms');
      fixture.detectChanges();

      await waitFor(() => {
        expect(fixture.componentInstance.subscriptionForm.controls.phone.enabled).toBe(true);
        expect(fixture.componentInstance.subscriptionForm.controls.email.disabled).toBe(true);
      });
    });

    it('should clear email when switching to SMS', async () => {
      const { fixture } = await render(SubscriptionFormComponent, {
        componentInputs: defaultProps
      });

      fixture.componentInstance.subscriptionForm.controls.email.setValue('test@example.com');
      fixture.componentInstance.subscriptionForm.controls.notificationMethod.setValue('sms');
      fixture.detectChanges();

      await waitFor(() => {
        expect(fixture.componentInstance.subscriptionForm.controls.email.value).toBe('');
      });
    });

    it('should clear phone when switching to email', async () => {
      const { fixture } = await render(SubscriptionFormComponent, {
        componentInputs: defaultProps
      });

      fixture.componentInstance.subscriptionForm.controls.notificationMethod.setValue('sms');
      fixture.detectChanges();

      await waitFor(() => {
        fixture.componentInstance.subscriptionForm.controls.phone.setValue('3001234567');
        fixture.componentInstance.subscriptionForm.controls.notificationMethod.setValue('email');
        fixture.detectChanges();
      });

      await waitFor(() => {
        expect(fixture.componentInstance.subscriptionForm.controls.phone.value).toBe('');
      });
    });
  });

  describe('form validity computed signal', () => {
    it('should be invalid when amount is zero', async () => {
      const { fixture } = await render(SubscriptionFormComponent, {
        componentInputs: defaultProps
      });

      expect(fixture.componentInstance.isFormValid()).toBe(false);
    });

    it('should be invalid when email is empty', async () => {
      const { fixture } = await render(SubscriptionFormComponent, {
        componentInputs: defaultProps
      });

      fixture.componentInstance.subscriptionForm.controls.amount.setValue(100000);
      fixture.detectChanges();

      expect(fixture.componentInstance.isFormValid()).toBe(false);
    });

    it('should be valid with valid amount and email', async () => {
      const { fixture } = await render(SubscriptionFormComponent, {
        componentInputs: defaultProps
      });

      fixture.componentInstance.subscriptionForm.controls.amount.setValue(100000);
      fixture.componentInstance.subscriptionForm.controls.email.setValue('test@example.com');
      fixture.detectChanges();

      await waitFor(() => {
        expect(fixture.componentInstance.isFormValid()).toBe(true);
      });
    });

    it('should be valid with valid amount and phone when SMS selected', async () => {
      const { fixture } = await render(SubscriptionFormComponent, {
        componentInputs: defaultProps
      });

      fixture.componentInstance.subscriptionForm.controls.amount.setValue(100000);
      fixture.componentInstance.subscriptionForm.controls.notificationMethod.setValue('sms');
      fixture.detectChanges();

      await waitFor(() => {
        fixture.componentInstance.subscriptionForm.controls.phone.setValue('3001234567');
        fixture.detectChanges();
      });

      await waitFor(() => {
        expect(fixture.componentInstance.isFormValid()).toBe(true);
      });
    });
  });

  describe('handleSubmit', () => {
    it('should emit onSubmit with correct data for email', async () => {
      let submittedData: any = null;
      const { fixture } = await render(SubscriptionFormComponent, {
        componentInputs: defaultProps
      });
      
      fixture.componentInstance.onSubmit.subscribe((data) => {
        submittedData = data;
      });

      fixture.componentInstance.subscriptionForm.controls.amount.setValue(100000);
      fixture.componentInstance.subscriptionForm.controls.email.setValue('test@example.com');
      fixture.detectChanges();

      fixture.componentInstance.handleSubmit();

      expect(submittedData).toEqual({
        amount: 100000,
        notificationMethod: 'email',
        email: 'test@example.com',
        phone: undefined
      });
    });

    it('should emit onSubmit with correct data for SMS', async () => {
      let submittedData: any = null;
      const { fixture } = await render(SubscriptionFormComponent, {
        componentInputs: defaultProps
      });
      
      fixture.componentInstance.onSubmit.subscribe((data) => {
        submittedData = data;
      });

      fixture.componentInstance.subscriptionForm.controls.amount.setValue(100000);
      fixture.componentInstance.subscriptionForm.controls.notificationMethod.setValue('sms');
      fixture.detectChanges();

      await waitFor(() => {
        fixture.componentInstance.subscriptionForm.controls.phone.setValue('3001234567');
        fixture.detectChanges();
      });

      fixture.componentInstance.handleSubmit();

      expect(submittedData).toEqual({
        amount: 100000,
        notificationMethod: 'sms',
        email: undefined,
        phone: '3001234567'
      });
    });

    it('should not emit when amount has error', async () => {
      let emitCount = 0;
      const { fixture } = await render(SubscriptionFormComponent, {
        componentInputs: defaultProps
      });
      
      fixture.componentInstance.onSubmit.subscribe(() => {
        emitCount++;
      });

      fixture.componentInstance.subscriptionForm.controls.amount.setValue(10000); // Less than minimum
      fixture.componentInstance.subscriptionForm.controls.email.setValue('test@example.com');
      fixture.detectChanges();

      fixture.componentInstance.handleSubmit();

      expect(emitCount).toBe(0);
    });

    it('should not emit when email has error', async () => {
      let emitCount = 0;
      const { fixture } = await render(SubscriptionFormComponent, {
        componentInputs: defaultProps
      });
      
      fixture.componentInstance.onSubmit.subscribe(() => {
        emitCount++;
      });

      fixture.componentInstance.subscriptionForm.controls.amount.setValue(100000);
      fixture.componentInstance.subscriptionForm.controls.email.setValue('invalid-email');
      fixture.detectChanges();

      fixture.componentInstance.handleSubmit();

      expect(emitCount).toBe(0);
    });
  });

  describe('onCancel output', () => {
    it('should emit onCancel when cancel is triggered', async () => {
      let cancelCalled = false;
      const { fixture } = await render(SubscriptionFormComponent, {
        componentInputs: defaultProps
      });
      
      fixture.componentInstance.onCancel.subscribe(() => {
        cancelCalled = true;
      });

      fixture.componentInstance.onCancel.emit();

      expect(cancelCalled).toBe(true);
    });
  });
});
