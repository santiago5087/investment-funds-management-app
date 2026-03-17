import { Component, input, output, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { ButtonComponent } from '../../atoms/button/button.component';
import { NotificationMethod } from '../../../../domain/models';

@Component({
  selector: 'app-subscription-form',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatRadioModule, ButtonComponent],
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.scss'],
})
export class SubscriptionFormComponent {
  fundName = input.required<string>();
  minimumAmount = input.required<number>();
  currentBalance = input.required<number>();
  
  onSubmit = output<{ amount: number; notificationMethod: NotificationMethod; email?: string; phone?: string }>();
  onCancel = output<void>();

  // Signal Forms approach: FormGroup + toSignal para convertir a signals
  subscriptionForm = new FormGroup({
    amount: new FormControl<number>(0, { 
      nonNullable: true, 
      validators: [Validators.required, Validators.min(0)] 
    }),
    notificationMethod: new FormControl<NotificationMethod>('email', { 
      nonNullable: true, 
      validators: [Validators.required] 
    }),
    email: new FormControl<string>('', { 
      nonNullable: true, 
      validators: [Validators.required, Validators.email] 
    }),
    phone: new FormControl<string>('', { 
      nonNullable: true, 
      validators: [Validators.required, Validators.pattern(/^[0-9]{10}$/)] 
    }),
  });

  // Convertir valueChanges a signals para reactividad completa
  private _notificationMethod = toSignal(
    this.subscriptionForm.controls.notificationMethod.valueChanges,
    { initialValue: this.subscriptionForm.controls.notificationMethod.value }
  );

  private _amount = toSignal(
    this.subscriptionForm.controls.amount.valueChanges,
    { initialValue: this.subscriptionForm.controls.amount.value }
  );

  private _email = toSignal(
    this.subscriptionForm.controls.email.valueChanges,
    { initialValue: this.subscriptionForm.controls.email.value }
  );

  private _phone = toSignal(
    this.subscriptionForm.controls.phone.valueChanges,
    { initialValue: this.subscriptionForm.controls.phone.value }
  );

  // Signals computados públicos
  selectedNotificationMethod = computed(() => this._notificationMethod());
  amountValue = computed(() => this._amount());
  emailValue = computed(() => this._email());
  phoneValue = computed(() => this._phone());

  // Computed signals para el estado touched/dirty de los controles
  private amountTouched = signal(false);
  private emailTouched = signal(false);
  private phoneTouched = signal(false);

  // Error messages como computed signals
  amountError = computed(() => {
    const amount = this.amountValue();
    const control = this.subscriptionForm.controls.amount;

    if (!this.amountTouched() && !control.dirty) {
      return '';
    }

    if (amount === 0) {
      return 'El monto es requerido';
    }

    if (amount < this.minimumAmount()) {
      return `El monto ingresado es menor al mínimo requerido`;
    }

    if (amount > this.currentBalance()) {
      return 'Saldo insuficiente';
    }

    if (control.invalid) {
      return 'Monto inválido';
    }

    return '';
  });

  emailError = computed(() => {
    const method = this.selectedNotificationMethod();
    const emailValue = this.emailValue();
    const control = this.subscriptionForm.controls.email;

    if (method !== 'email') {
      return '';
    }

    if (!this.emailTouched() && !control.dirty) {
      return '';
    }

    if (!emailValue) {
      return 'El email es requerido';
    }

    if (control.invalid) {
      return 'Por favor ingrese un email válido';
    }

    return '';
  });

  phoneError = computed(() => {
    const method = this.selectedNotificationMethod();
    const phoneValue = this.phoneValue();
    const control = this.subscriptionForm.controls.phone;

    if (method !== 'sms') {
      return '';
    }

    if (!this.phoneTouched() && !control.dirty) {
      return '';
    }

    if (!phoneValue) {
      return 'El teléfono es requerido';
    }

    if (control.invalid) {
      return 'Por favor ingrese un número de teléfono válido (10 dígitos)';
    }

    return '';
  });

  // Computed signal para validación del formulario
  isFormValid = computed(() => {
    const amount = this.amountValue();
    const notificationMethod = this.selectedNotificationMethod();
    
    const amountValid = amount >= this.minimumAmount() && 
                       amount <= this.currentBalance() && 
                       amount > 0;
    
    if (!amountValid) return false;

    if (notificationMethod === 'email') {
      return this.subscriptionForm.controls.email.valid;
    } else if (notificationMethod === 'sms') {
      return this.subscriptionForm.controls.phone.valid;
    }

    return false;
  });

  constructor() {
    // Inicializar el estado del form
    this.subscriptionForm.controls.phone.disable();

    // Un solo effect para manejar el cambio de validadores dinámicamente
    effect(() => {
      const method = this.selectedNotificationMethod();
      
      if (method === 'email') {
        this.subscriptionForm.controls.email.enable();
        this.subscriptionForm.controls.phone.disable();
        this.subscriptionForm.controls.phone.clearValidators();
        this.subscriptionForm.controls.email.setValidators([Validators.required, Validators.email]);
      } else if (method === 'sms') {
        this.subscriptionForm.controls.phone.enable();
        this.subscriptionForm.controls.email.disable();
        this.subscriptionForm.controls.email.clearValidators();
        this.subscriptionForm.controls.phone.setValidators([
          Validators.required, 
          Validators.pattern(/^[0-9]{10}$/),
        ]);
      }
      
      this.subscriptionForm.controls.email.updateValueAndValidity({ emitEvent: false });
      this.subscriptionForm.controls.phone.updateValueAndValidity({ emitEvent: false });
    });
  }

  // Métodos helper para marcar campos como touched
  markAmountTouched() {
    this.amountTouched.set(true);
    this.subscriptionForm.controls.amount.markAsTouched();
  }

  markEmailTouched() {
    this.emailTouched.set(true);
    this.subscriptionForm.controls.email.markAsTouched();
  }

  markPhoneTouched() {
    this.phoneTouched.set(true);
    this.subscriptionForm.controls.phone.markAsTouched();
  }

  handleSubmit() {
    // Marcar todos los campos como touched para mostrar errores
    this.markAmountTouched();
    this.markEmailTouched();
    this.markPhoneTouched();
    this.subscriptionForm.controls.notificationMethod.markAsTouched();

    const amount = this.subscriptionForm.controls.amount.value;
    const notificationMethod = this.subscriptionForm.controls.notificationMethod.value;
    const emailValue = this.subscriptionForm.controls.email.value;
    const phoneValue = this.subscriptionForm.controls.phone.value;

    // Validar que no haya errores
    if (this.amountError()) {
      return;
    }

    if (notificationMethod === 'email' && this.emailError()) {
      return;
    }

    if (notificationMethod === 'sms' && this.phoneError()) {
      return;
    }

    this.onSubmit.emit({
      amount,
      notificationMethod,
      email: notificationMethod === 'email' ? emailValue : undefined,
      phone: notificationMethod === 'sms' ? phoneValue : undefined,
    });
  }
}
