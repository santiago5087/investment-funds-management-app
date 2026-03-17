import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export type ButtonVariant = 'primary' | 'accent' | 'warn' | 'basic' | 'secondary';

@Component({
  selector: 'app-button',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  variant = input<ButtonVariant>('primary');
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input<boolean>(false);
  fullWidth = input<boolean>(false);
  
  clicked = output<Event>();

  getColor(): 'primary' | 'accent' | 'warn' | undefined {
    switch (this.variant()) {
      case 'primary':
        return 'primary';
      case 'accent':
        return 'accent';
      case 'warn':
        return 'warn';
      case 'basic':
      case 'secondary':
      default:
        return undefined;
    }
  }
}
