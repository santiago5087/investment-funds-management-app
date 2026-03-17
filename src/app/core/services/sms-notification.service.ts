import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface SmsNotificationData {
  phone: string;
  fundName: string;
  amount: number;
  subscriptionDate: Date;
}

export interface SmsResponse {
  success: boolean;
  message: string;
  messageSid?: string;
  recipient?: string;
  status?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SmsNotificationService {
  private readonly apiUrl = environment.apiUrl || '/api';

  constructor(private http: HttpClient) {}

  /**
   * Envía un SMS de confirmación de suscripción
   * @param data Datos de la suscripción
   * @returns Observable con la respuesta del servidor
   */
  sendSubscriptionConfirmation(data: SmsNotificationData): Observable<SmsResponse> {
    return this.http.post<SmsResponse>(
      `${this.apiUrl}/send-sms`,
      data
    );
  }
}
