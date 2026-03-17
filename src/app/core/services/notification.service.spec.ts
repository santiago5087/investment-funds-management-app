import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from './notification.service';
import { ToastComponent } from '../components/toast/toast.component';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('NotificationService', () => {
  let service: NotificationService;
  let snackBarSpy: { openFromComponent: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    snackBarSpy = {
      openFromComponent: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        NotificationService,
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    });

    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('success', () => {
    it('should call snackBar.openFromComponent with success type', () => {
      service.success('Success Title', 'Success message');

      expect(snackBarSpy.openFromComponent).toHaveBeenCalledWith(
        ToastComponent,
        expect.objectContaining({
          data: {
            title: 'Success Title',
            message: 'Success message',
            type: 'success'
          },
          panelClass: ['custom-toast'],
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        })
      );
    });

    it('should work with empty message', () => {
      service.success('Success Title');

      expect(snackBarSpy.openFromComponent).toHaveBeenCalledWith(
        ToastComponent,
        expect.objectContaining({
          data: expect.objectContaining({
            title: 'Success Title',
            message: '',
            type: 'success'
          })
        })
      );
    });
  });

  describe('error', () => {
    it('should call snackBar.openFromComponent with error type', () => {
      service.error('Error Title', 'Error message');

      expect(snackBarSpy.openFromComponent).toHaveBeenCalledWith(
        ToastComponent,
        expect.objectContaining({
          data: {
            title: 'Error Title',
            message: 'Error message',
            type: 'error'
          }
        })
      );
    });
  });

  describe('warning', () => {
    it('should call snackBar.openFromComponent with warning type', () => {
      service.warning('Warning Title', 'Warning message');

      expect(snackBarSpy.openFromComponent).toHaveBeenCalledWith(
        ToastComponent,
        expect.objectContaining({
          data: {
            title: 'Warning Title',
            message: 'Warning message',
            type: 'warning'
          }
        })
      );
    });
  });

  describe('info', () => {
    it('should call snackBar.openFromComponent with info type', () => {
      service.info('Info Title', 'Info message');

      expect(snackBarSpy.openFromComponent).toHaveBeenCalledWith(
        ToastComponent,
        expect.objectContaining({
          data: {
            title: 'Info Title',
            message: 'Info message',
            type: 'info'
          }
        })
      );
    });
  });

  describe('configuration', () => {
    it('should apply default configuration', () => {
      service.success('Test');

      const call = snackBarSpy.openFromComponent.mock.calls[0][1];
      expect(call.duration).toBe(5000);
      expect(call.horizontalPosition).toBe('end');
      expect(call.verticalPosition).toBe('top');
    });
  });
});
