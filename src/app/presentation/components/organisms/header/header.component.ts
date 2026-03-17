import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  appName = signal('BTG Fondos');
  
  navigationLinks = signal([
    { path: '/', label: 'Inicio', exact: true },
    { path: '/funds', label: 'Fondos', exact: false },
    { path: '/subscriptions', label: 'Mis Inversiones', exact: false },
    { path: '/transactions', label: 'Historial', exact: false },
  ]);
}
