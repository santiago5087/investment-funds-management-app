import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  currentYear = signal(new Date().getFullYear());
  projectName = signal('BTG Fondos');
  author = signal('Edhy Santiago Marin Arbelaez');
}
