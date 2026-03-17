import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ToastComponent, ToastData } from '../components/toast/toast.component';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private defaultConfig: MatSnackBarConfig = {
    duration: 5000,
    horizontalPosition: 'end',
    verticalPosition: 'top',
  };

  constructor(private snackBar: MatSnackBar) {}

  success(title: string, message: string = '') {
    this.show(title, message, 'success');
  }

  error(title: string, message: string = '') {
    this.show(title, message, 'error');
  }

  warning(title: string, message: string = '') {
    this.show(title, message, 'warning');
  }

  info(title: string, message: string = '') {
    this.show(title, message, 'info');
  }

  private show(title: string, message: string, type: NotificationType) {
    const data: ToastData = {
      title,
      message,
      type
    };

    this.snackBar.openFromComponent(ToastComponent, {
      ...this.defaultConfig,
      data,
      panelClass: ['custom-toast']
    });
  }
}
