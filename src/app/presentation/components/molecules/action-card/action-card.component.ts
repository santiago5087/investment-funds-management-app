import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent, ButtonVariant } from '../../atoms/button/button.component';

export type ActionCardVariant = 'primary' | 'accent' | 'history';

@Component({
  selector: 'app-action-card',
  imports: [CommonModule, RouterModule, ButtonComponent],
  templateUrl: './action-card.component.html',
  styleUrls: ['./action-card.component.scss'],
})
export class ActionCardComponent {
  icon = input.required<string>();
  title = input.required<string>();
  description = input.required<string>();
  variant = input<ActionCardVariant>('primary');
  buttonText = input.required<string>();
  buttonVariant = input<ButtonVariant>('primary');
  routerLink = input.required<string>();
}
