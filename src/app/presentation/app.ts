import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/organisms/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
