import { render } from '@testing-library/angular';
import { SubscriptionsPageComponent } from './subscriptions-page.component';
import { Store } from '@ngxs/store';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { describe, it, expect, vi } from 'vitest';
import { InvestmentFund } from '../../../domain/models';
import { CancelSubscription } from '../../../core/store/actions/funds.actions';

// Mock Store
class MockStore {
  select = vi.fn(() => of([]));
  selectSnapshot = vi.fn(() => []);
  dispatch = vi.fn(() => of(null));
}

// Mock MatDialog
class MockMatDialog {
  open = vi.fn(() => ({
    afterClosed: () => of(false)
  }));
}

describe('SubscriptionsPageComponent', () => {
  const renderComponent = async () => {
    return render(SubscriptionsPageComponent, {
      providers: [
        { provide: Store, useClass: MockStore },
        { provide: MatDialog, useClass: MockMatDialog }
      ]
    });
  };

  it('should create', async () => {
    const { fixture } = await renderComponent();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should initialize subscribedFunds$ on ngOnInit', async () => {
    const { fixture } = await renderComponent();
    fixture.componentInstance.ngOnInit();
    
    expect(fixture.componentInstance.subscribedFunds$).toBeDefined();
  });

  describe('handleCancel', () => {
    it('should open dialog with correct data when handleCancel is called', async () => {
      const mockFund: InvestmentFund = {
        id: '1',
        name: 'Test Fund',
        description: 'Test Description',
        minimumAmount: 50000,
        category: 'FPV'
      };

      const { fixture } = await renderComponent();
      
      const dialogSpy = vi.spyOn(fixture.componentInstance['dialog'], 'open').mockReturnValue({
        afterClosed: () => of(false)
      } as any);
      
      fixture.componentInstance.handleCancel(mockFund);
      
      expect(dialogSpy).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          width: '500px',
          disableClose: true,
          data: expect.objectContaining({
            title: '¿Cancelar suscripción?',
            confirmText: 'Sí, cancelar',
            cancelText: 'No, mantener',
            type: 'danger'
          })
        })
      );
    });

    it('should dispatch CancelSubscription when dialog is confirmed', async () => {
      const mockFund: InvestmentFund = {
        id: '1',
        name: 'Test Fund',
        description: 'Test Description',
        minimumAmount: 50000,
        category: 'FPV'
      };

      const { fixture } = await renderComponent();
      
      vi.spyOn(fixture.componentInstance['dialog'], 'open').mockReturnValue({
        afterClosed: () => of(true)
      } as any);
      
      const dispatchSpy = vi.spyOn(fixture.componentInstance['store'], 'dispatch');
      
      fixture.componentInstance.handleCancel(mockFund);
      
      await vi.waitFor(() => {
        expect(dispatchSpy).toHaveBeenCalledWith(new CancelSubscription(mockFund.id));
      });
    });

    it('should not dispatch action when dialog is cancelled', async () => {
      const mockFund: InvestmentFund = {
        id: '1',
        name: 'Test Fund',
        description: 'Test Description',
        minimumAmount: 50000,
        category: 'FPV'
      };

      const { fixture } = await renderComponent();
      
      vi.spyOn(fixture.componentInstance['dialog'], 'open').mockReturnValue({
        afterClosed: () => of(false)
      } as any);
      
      const dispatchSpy = vi.spyOn(fixture.componentInstance['store'], 'dispatch');
      
      fixture.componentInstance.handleCancel(mockFund);
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      expect(dispatchSpy).not.toHaveBeenCalled();
    });
  });

  it('should have correct component selector', async () => {
    const { container } = await renderComponent();
    const element = container.querySelector('.subscriptions-page');
    expect(element).toBeTruthy();
  });
});
