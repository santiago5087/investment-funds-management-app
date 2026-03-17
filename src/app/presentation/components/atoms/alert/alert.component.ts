import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  type = input<'error' | 'success' | 'warning' | 'info'>('info');
  dismissible = input<boolean>(true);
  dismiss = output<void>();

  alertClasses() {
    return `alert-${this.type()}`;
  }
}
