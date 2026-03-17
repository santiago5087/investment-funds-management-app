import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

export interface EmailNotificationData {
  email: string;
  fundName: string;
  amount: number;
  subscriptionDate: Date;
  notificationMethod: 'email' | 'sms';
}

export interface EmailResponse {
  success: boolean;
  message: string;
  emailId?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailNotificationService {
  private readonly apiUrl = environment.apiUrl || '/api';

  constructor(private http: HttpClient) {}

  /**
   * Envía un email de confirmación de suscripción
   * @param data Datos de la suscripción
   * @returns Observable con la respuesta del servidor
   */
  sendSubscriptionConfirmation(data: EmailNotificationData): Observable<EmailResponse> {
    return this.http.post<EmailResponse>(
      `${this.apiUrl}/send-email`,
      data
    );
  }
}
