import { Component, input, output, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { InputComponent } from '../../atoms/input/input.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { NotificationMethod } from '../../../../domain/models';

@Component({
  selector: 'app-subscription-form',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatRadioModule, InputComponent, ButtonComponent],
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.scss'],
})
export class SubscriptionFormComponent {
  fundName = input.required<string>();
  minimumAmount = input.required<number>();
  currentBalance = input.required<number>();
  
  amount = model<number>(0);
  notificationMethod = model<NotificationMethod>('email');
  
  onSubmit = output<{ amount: number; notificationMethod: NotificationMethod }>();
  onCancel = output<void>();

  amountError = '';

  handleSubmit() {
    this.amountError = '';

    if (this.amount() < this.minimumAmount()) {
      this.amountError = `El monto mínimo es $${this.minimumAmount().toLocaleString('es-CO')}`;
      return;
    }

    if (this.amount() > this.currentBalance()) {
      this.amountError = 'Saldo insuficiente';
      return;
    }

    this.onSubmit.emit({
      amount: this.amount(),
      notificationMethod: this.notificationMethod(),
    });
  }

  isValid(): boolean {
    return (
      this.amount() >= this.minimumAmount() &&
      this.amount() <= this.currentBalance() &&
      this.amount() > 0
    );
  }
}
