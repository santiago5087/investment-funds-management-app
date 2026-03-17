import { render } from '@testing-library/angular';
import { FundsPageComponent } from './funds-page.component';
import { provideStore } from '@ngxs/store';
import { FundsState } from '../../../core/store/states/funds.state';
import { DATA_PROVIDERS } from '../../../data/data.providers';
import { provideHttpClient } from '@angular/common/http';
import { InvestmentFund } from '../../../domain/models';
import { describe, it, expect, vi } from 'vitest';
import { NotificationService } from '../../../core/services/notification.service';
import { EmailNotificationService } from '../../../core/services/email-notification.service';
import { SmsNotificationService } from '../../../core/services/sms-notification.service';

describe.skip('FundsPageComponent', () => {
  const renderComponent = async () => {
    return render(FundsPageComponent, {
      providers: [
        provideStore([FundsState]),
        provideHttpClient(),
        ...DATA_PROVIDERS,
        {
          provide: NotificationService,
          useValue: { showNotification: vi.fn() }
        },
        {
          provide: EmailNotificationService,
          useValue: { sendEmail: vi.fn().mockResolvedValue({ success: true }) }
        },
        {
          provide: SmsNotificationService,
          useValue: { sendSms: vi.fn().mockResolvedValue({ success: true }) }
        }
      ]
    });
  };

  const mockFund: InvestmentFund = {
    id: '1',
    name: 'Test Fund',
    description: 'Test Description',
    minimumAmount: 50000,
    category: 'FPV'
  };

  it('should create', async () => {
    const { fixture } = await renderComponent();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have observable properties defined', async () => {
    const { fixture } = await renderComponent();
    
    expect(fixture.componentInstance.availableFunds$).toBeDefined();
    expect(fixture.componentInstance.balance$).toBeDefined();
    expect(fixture.componentInstance.loading$).toBeDefined();
    expect(fixture.componentInstance.error$).toBeDefined();
    expect(fixture.componentInstance.subscriptions$).toBeDefined();
  });

  it('should have selectedFund signal initialized to null', async () => {
    const { fixture } = await renderComponent();
    expect(fixture.componentInstance.selectedFund()).toBeNull();
  });

  it('should have subscribedIds signal initialized to empty array', async () => {
    const { fixture } = await renderComponent();
    expect(fixture.componentInstance.subscribedIds()).toEqual([]);
  });

  describe('openSubscriptionModal', () => {
    it('should set selectedFund signal', async () => {
      const { fixture } = await renderComponent();
      
      fixture.componentInstance.openSubscriptionModal(mockFund);
      
      expect(fixture.componentInstance.selectedFund()).toEqual(mockFund);
    });
  });

  describe('closeModal', () => {
    it('should reset selectedFund to null', async () => {
      const { fixture } = await renderComponent();
      
      fixture.componentInstance.openSubscriptionModal(mockFund);
      expect(fixture.componentInstance.selectedFund()).toEqual(mockFund);
      
      fixture.componentInstance.closeModal();
      expect(fixture.componentInstance.selectedFund()).toBeNull();
    });
  });

  describe('handleSubscribe', () => {
    it('should dispatch SubscribeToFund action when fund is selected', async () => {
      const { fixture } = await renderComponent();
      const dispatchSpy = vi.spyOn(fixture.componentInstance['store'], 'dispatch');
      
      fixture.componentInstance.openSubscriptionModal(mockFund);
      fixture.componentInstance.handleSubscribe({
        amount: 100000,
        notificationMethod: 'email',
        email: 'test@example.com'
      });
      
      expect(dispatchSpy).toHaveBeenCalled();
    });

    it('should not dispatch when no fund is selected', async () => {
      const { fixture } = await renderComponent();
      const dispatchSpy = vi.spyOn(fixture.componentInstance['store'], 'dispatch');
      
      fixture.componentInstance.handleSubscribe({
        amount: 100000,
        notificationMethod: 'email',
        email: 'test@example.com'
      });
      
      // Should only be called once for LoadFunds
      expect(dispatchSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('should render funds grid component', async () => {
    const { container } = await renderComponent();
    const fundsGrid = container.querySelector('app-funds-grid');
    expect(fundsGrid).toBeTruthy();
  });

  it('should have app-funds-page selector', async () => {
    const { container } = await renderComponent();
    const element = container.querySelector('app-funds-page');
    expect(element).toBeTruthy();
  });
});
