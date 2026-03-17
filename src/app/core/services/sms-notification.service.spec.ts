import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { SmsNotificationService, SmsNotificationData, SmsResponse } from './sms-notification.service';
import { environment } from '../../../environments/environment';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('SmsNotificationService', () => {
  let service: SmsNotificationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SmsNotificationService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(SmsNotificationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('sendSubscriptionConfirmation', () => {
    it('should send POST request to send-sms endpoint', () => {
      const mockData: SmsNotificationData = {
        phone: '3001234567',
        fundName: 'Test Fund',
        amount: 100000,
        subscriptionDate: new Date('2024-01-01')
      };

      const mockResponse: SmsResponse = {
        success: true,
        message: 'SMS sent successfully',
        messageSid: 'SM1234567890',
        recipient: '+573001234567',
        status: 'sent'
      };

      service.sendSubscriptionConfirmation(mockData).subscribe(response => {
        expect(response).toEqual(mockResponse);
        expect(response.success).toBe(true);
        expect(response.messageSid).toBe('SM1234567890');
        expect(response.status).toBe('sent');
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/send-sms`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockData);
      req.flush(mockResponse);
    });

    it('should handle error response', () => {
      const mockData: SmsNotificationData = {
        phone: '3109876543',
        fundName: 'Test Fund',
        amount: 50000,
        subscriptionDate: new Date('2024-01-01')
      };

      const mockErrorResponse: SmsResponse = {
        success: false,
        message: 'Failed to send SMS',
        error: 'Invalid phone number'
      };

      service.sendSubscriptionConfirmation(mockData).subscribe(response => {
        expect(response.success).toBe(false);
        expect(response.error).toBe('Invalid phone number');
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/send-sms`);
      req.flush(mockErrorResponse);
    });

    it('should use correct API URL from environment', () => {
      const mockData: SmsNotificationData = {
        phone: '3201234567',
        fundName: 'Growth Fund',
        amount: 75000,
        subscriptionDate: new Date()
      };

      service.sendSubscriptionConfirmation(mockData).subscribe();

      const req = httpMock.expectOne(`${environment.apiUrl}/send-sms`);
      expect(req.request.url).toContain('/send-sms');
      req.flush({ success: true, message: 'OK' });
    });

    it('should include all required fields in request body', () => {
      const mockData: SmsNotificationData = {
        phone: '3151234567',
        fundName: 'Complete Fund',
        amount: 250000,
        subscriptionDate: new Date('2024-03-15T10:00:00')
      };

      service.sendSubscriptionConfirmation(mockData).subscribe();

      const req = httpMock.expectOne(`${environment.apiUrl}/send-sms`);
      const body = req.request.body;
      
      expect(body.phone).toBe('3151234567');
      expect(body.fundName).toBe('Complete Fund');
      expect(body.amount).toBe(250000);
      expect(body.subscriptionDate).toEqual(mockData.subscriptionDate);
      
      req.flush({ success: true, message: 'Sent' });
    });

    it('should handle delivered status response', () => {
      const mockData: SmsNotificationData = {
        phone: '3007654321',
        fundName: 'Investment Fund',
        amount: 150000,
        subscriptionDate: new Date()
      };

      const mockResponse: SmsResponse = {
        success: true,
        message: 'SMS delivered',
        messageSid: 'SM9876543210',
        recipient: '+573007654321',
        status: 'delivered'
      };

      service.sendSubscriptionConfirmation(mockData).subscribe(response => {
        expect(response.status).toBe('delivered');
        expect(response.recipient).toContain('+57');
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/send-sms`);
      req.flush(mockResponse);
    });
  });
});
