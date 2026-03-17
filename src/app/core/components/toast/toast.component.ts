import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export interface ToastData {
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    <div class="toast-container" [ngClass]="'toast-' + data.type">
      <div class="toast-icon">
        <mat-icon>{{ getIcon() }}</mat-icon>
      </div>
      <div class="toast-content">
        <h3 class="toast-title">{{ data.title }}</h3>
        <p class="toast-message">{{ data.message }}</p>
      </div>
      <button 
        mat-icon-button 
        class="toast-close" 
        (click)="dismiss()"
        aria-label="Cerrar notificación">
        <mat-icon>close</mat-icon>
      </button>
    </div>
  `,
  styles: [`
    .toast-container {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 16px;
      min-width: 320px;
      max-width: 500px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .toast-success {
      background-color: #4caf50;
      color: white;
    }

    .toast-error {
      background-color: #f44336;
      color: white;
    }

    .toast-warning {
      background-color: #ff9800;
      color: white;
    }

    .toast-info {
      background-color: #2196f3;
      color: white;
    }

    .toast-icon {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.2);
    }

    .toast-icon mat-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
      line-height: 24px;
    }

    .toast-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding-top: 2px;
    }

    .toast-title {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      line-height: 1.4;
    }

    .toast-message {
      margin: 0;
      font-size: 14px;
      line-height: 1.4;
      opacity: 0.95;
    }

    .toast-close {
      flex-shrink: 0;
      color: white;
      opacity: 0.8;
      transition: opacity 0.2s;
      margin-top: -4px;
      margin-right: -8px;
    }

    .toast-close:hover {
      opacity: 1;
      background-color: rgba(255, 255, 255, 0.1);
    }

    .toast-close mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
      line-height: 20px;
    }

    @media (max-width: 600px) {
      .toast-container {
        min-width: 280px;
        max-width: 100%;
      }
    }
  `]
})
export class ToastComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: ToastData,
    private snackBarRef: MatSnackBarRef<ToastComponent>
  ) {}

  getIcon(): string {
    const icons = {
      success: 'check_circle',
      error: 'error',
      warning: 'warning',
      info: 'info'
    };
    return icons[this.data.type];
  }

  dismiss(): void {
    this.snackBarRef.dismiss();
  }
}
