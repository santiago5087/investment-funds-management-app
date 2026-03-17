import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { ConfirmDialogComponent, ConfirmDialogData } from './confirm-dialog.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('ConfirmDialogComponent', () => {
  let dialogRefMock: { close: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    dialogRefMock = {
      close: vi.fn()
    };
  });

  const defaultData: ConfirmDialogData = {
    title: 'Confirm Action',
    message: 'Are you sure you want to proceed?',
    confirmText: 'Yes',
    cancelText: 'No',
    type: 'warning'
  };

  it('should create', async () => {
    const { fixture } = await render(ConfirmDialogComponent, {
      imports: [MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: defaultData },
        { provide: MatDialogRef, useValue: dialogRefMock }
      ]
    });
    expect(fixture.componentInstance).toBeTruthy();
  });

  describe('dialog data', () => {
    it('should receive title from data', async () => {
      const { fixture } = await render(ConfirmDialogComponent, {
        imports: [MatDialogModule],
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: { ...defaultData, title: 'Custom Title' } },
          { provide: MatDialogRef, useValue: dialogRefMock }
        ]
      });
      expect(fixture.componentInstance.data.title).toBe('Custom Title');
    });

    it('should receive message from data', async () => {
      const { fixture } = await render(ConfirmDialogComponent, {
        imports: [MatDialogModule],
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: { ...defaultData, message: 'Custom message' } },
          { provide: MatDialogRef, useValue: dialogRefMock }
        ]
      });
      expect(fixture.componentInstance.data.message).toBe('Custom message');
    });

    it('should receive confirmText from data', async () => {
      const { fixture } = await render(ConfirmDialogComponent, {
        imports: [MatDialogModule],
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: { ...defaultData, confirmText: 'Confirm' } },
          { provide: MatDialogRef, useValue: dialogRefMock }
        ]
      });
      expect(fixture.componentInstance.data.confirmText).toBe('Confirm');
    });

    it('should receive cancelText from data', async () => {
      const { fixture } = await render(ConfirmDialogComponent, {
        imports: [MatDialogModule],
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: { ...defaultData, cancelText: 'Cancel' } },
          { provide: MatDialogRef, useValue: dialogRefMock }
        ]
      });
      expect(fixture.componentInstance.data.cancelText).toBe('Cancel');
    });

    it('should receive type from data', async () => {
      const { fixture } = await render(ConfirmDialogComponent, {
        imports: [MatDialogModule],
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: { ...defaultData, type: 'danger' } },
          { provide: MatDialogRef, useValue: dialogRefMock }
        ]
      });
      expect(fixture.componentInstance.data.type).toBe('danger');
    });
  });

  describe('iconName getter', () => {
    it('should return "warning" for danger type', async () => {
      const { fixture } = await render(ConfirmDialogComponent, {
        imports: [MatDialogModule],
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: { ...defaultData, type: 'danger' } },
          { provide: MatDialogRef, useValue: dialogRefMock }
        ]
      });
      expect(fixture.componentInstance.iconName).toBe('warning');
    });

    it('should return "info" for warning type', async () => {
      const { fixture } = await render(ConfirmDialogComponent, {
        imports: [MatDialogModule],
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: { ...defaultData, type: 'warning' } },
          { provide: MatDialogRef, useValue: dialogRefMock }
        ]
      });
      expect(fixture.componentInstance.iconName).toBe('info');
    });

    it('should return "help_outline" for info type', async () => {
      const { fixture } = await render(ConfirmDialogComponent, {
        imports: [MatDialogModule],
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: { ...defaultData, type: 'info' } },
          { provide: MatDialogRef, useValue: dialogRefMock }
        ]
      });
      expect(fixture.componentInstance.iconName).toBe('help_outline');
    });

    it('should return "help_outline" for undefined type', async () => {
      const { fixture } = await render(ConfirmDialogComponent, {
        imports: [MatDialogModule],
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: { ...defaultData, type: undefined } },
          { provide: MatDialogRef, useValue: dialogRefMock }
        ]
      });
      expect(fixture.componentInstance.iconName).toBe('help_outline');
    });
  });

  describe('onConfirm method', () => {
    it('should close dialog with true when confirmed', async () => {
      const { fixture } = await render(ConfirmDialogComponent, {
        imports: [MatDialogModule],
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: defaultData },
          { provide: MatDialogRef, useValue: dialogRefMock }
        ]
      });

      fixture.componentInstance.onConfirm();
      expect(dialogRefMock.close).toHaveBeenCalledWith(true);
    });

    it('should be called when confirm button is clicked', async () => {
      const user = userEvent.setup();
      await render(ConfirmDialogComponent, {
        imports: [MatDialogModule],
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: defaultData },
          { provide: MatDialogRef, useValue: dialogRefMock }
        ]
      });

      const confirmButton = screen.getByText('Yes');
      await user.click(confirmButton);

      expect(dialogRefMock.close).toHaveBeenCalledWith(true);
    });
  });

  describe('onCancel method', () => {
    it('should close dialog with false when cancelled', async () => {
      const { fixture } = await render(ConfirmDialogComponent, {
        imports: [MatDialogModule],
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: defaultData },
          { provide: MatDialogRef, useValue: dialogRefMock }
        ]
      });

      fixture.componentInstance.onCancel();
      expect(dialogRefMock.close).toHaveBeenCalledWith(false);
    });

    it('should be called when cancel button is clicked', async () => {
      const user = userEvent.setup();
      await render(ConfirmDialogComponent, {
        imports: [MatDialogModule],
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: defaultData },
          { provide: MatDialogRef, useValue: dialogRefMock }
        ]
      });

      const cancelButton = screen.getByText('No');
      await user.click(cancelButton);

      expect(dialogRefMock.close).toHaveBeenCalledWith(false);
    });
  });

  describe('visual rendering', () => {
    it('should display title', async () => {
      await render(ConfirmDialogComponent, {
        imports: [MatDialogModule],
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: { ...defaultData, title: 'Test Title' } },
          { provide: MatDialogRef, useValue: dialogRefMock }
        ]
      });
      expect(screen.getByText('Test Title')).toBeTruthy();
    });

    it('should display message', async () => {
      await render(ConfirmDialogComponent, {
        imports: [MatDialogModule],
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: { ...defaultData, message: 'Test Message' } },
          { provide: MatDialogRef, useValue: dialogRefMock }
        ]
      });
      expect(screen.getByText('Test Message')).toBeTruthy();
    });

    it('should display custom button texts', async () => {
      await render(ConfirmDialogComponent, {
        imports: [MatDialogModule],
        providers: [
          { 
            provide: MAT_DIALOG_DATA, 
            useValue: { ...defaultData, confirmText: 'Accept', cancelText: 'Decline' } 
          },
          { provide: MatDialogRef, useValue: dialogRefMock }
        ]
      });
      expect(screen.getByText('Accept')).toBeTruthy();
      expect(screen.getByText('Decline')).toBeTruthy();
    });

    it('should render icon', async () => {
      const { container } = await render(ConfirmDialogComponent, {
        imports: [MatDialogModule],
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: defaultData },
          { provide: MatDialogRef, useValue: dialogRefMock }
        ]
      });
      const icon = container.querySelector('mat-icon');
      expect(icon).toBeTruthy();
    });
  });
});
