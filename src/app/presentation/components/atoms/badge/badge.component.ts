import { Component, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

export type BadgeVariant = 'info' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'app-badge',
  imports: [MatChipsModule],
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent {
  variant = input<BadgeVariant>('info');
}
