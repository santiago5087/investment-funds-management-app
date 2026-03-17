import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private defaultConfig: MatSnackBarConfig = {
    duration: 4000,
    horizontalPosition: 'end',
    verticalPosition: 'top',
  };

  constructor(private snackBar: MatSnackBar) {}

  success(message: string, action: string = 'Cerrar') {
    this.show(message, action, 'success-snackbar');
  }

  error(message: string, action: string = 'Cerrar') {
    this.show(message, action, 'error-snackbar');
  }

  warning(message: string, action: string = 'Cerrar') {
    this.show(message, action, 'warning-snackbar');
  }

  info(message: string, action: string = 'Cerrar') {
    this.show(message, action, 'info-snackbar');
  }

  private show(message: string, action: string, panelClass: string) {
    this.snackBar.open(message, action, {
      ...this.defaultConfig,
      panelClass: [panelClass]
    });
  }
}
