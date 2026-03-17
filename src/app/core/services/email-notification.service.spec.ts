import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { EmailNotificationService, EmailNotificationData, EmailResponse } from './email-notification.service';
import { environment } from '../../../environments/environment';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('EmailNotificationService', () => {
  let service: EmailNotificationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EmailNotificationService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(EmailNotificationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('sendSubscriptionConfirmation', () => {
    it('should send POST request to send-email endpoint', () => {
      const mockData: EmailNotificationData = {
        email: 'test@example.com',
        fundName: 'Test Fund',
        amount: 100000,
        subscriptionDate: new Date('2024-01-01'),
        notificationMethod: 'email'
      };

      const mockResponse: EmailResponse = {
        success: true,
        message: 'Email sent successfully',
        emailId: 'email-123'
      };

      service.sendSubscriptionConfirmation(mockData).subscribe(response => {
        expect(response).toEqual(mockResponse);
        expect(response.success).toBe(true);
        expect(response.emailId).toBe('email-123');
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/send-email`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockData);
      req.flush(mockResponse);
    });

    it('should handle error response', () => {
      const mockData: EmailNotificationData = {
        email: 'test@example.com',
        fundName: 'Test Fund',
        amount: 100000,
        subscriptionDate: new Date('2024-01-01'),
        notificationMethod: 'email'
      };

      const mockErrorResponse: EmailResponse = {
        success: false,
        message: 'Failed to send email',
        error: 'SMTP connection failed'
      };

      service.sendSubscriptionConfirmation(mockData).subscribe(response => {
        expect(response.success).toBe(false);
        expect(response.error).toBe('SMTP connection failed');
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/send-email`);
      req.flush(mockErrorResponse);
    });

    it('should use correct API URL from environment', () => {
      const mockData: EmailNotificationData = {
        email: 'user@test.com',
        fundName: 'Growth Fund',
        amount: 50000,
        subscriptionDate: new Date(),
        notificationMethod: 'email'
      };

      service.sendSubscriptionConfirmation(mockData).subscribe();

      const req = httpMock.expectOne(`${environment.apiUrl}/send-email`);
      expect(req.request.url).toContain('/send-email');
      req.flush({ success: true, message: 'OK' });
    });

    it('should include all required fields in request body', () => {
      const mockData: EmailNotificationData = {
        email: 'complete@test.com',
        fundName: 'Complete Fund',
        amount: 250000,
        subscriptionDate: new Date('2024-03-15T10:00:00'),
        notificationMethod: 'email'
      };

      service.sendSubscriptionConfirmation(mockData).subscribe();

      const req = httpMock.expectOne(`${environment.apiUrl}/send-email`);
      const body = req.request.body;
      
      expect(body.email).toBe('complete@test.com');
      expect(body.fundName).toBe('Complete Fund');
      expect(body.amount).toBe(250000);
      expect(body.subscriptionDate).toEqual(mockData.subscriptionDate);
      expect(body.notificationMethod).toBe('email');
      
      req.flush({ success: true, message: 'Sent' });
    });
  });
});
