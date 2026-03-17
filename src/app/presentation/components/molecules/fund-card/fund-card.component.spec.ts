import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { FundCardComponent } from './fund-card.component';
import { InvestmentFund } from '../../../../domain/models';
import { describe, it, expect, vi } from 'vitest';

describe('FundCardComponent', () => {
  const mockFund: InvestmentFund = {
    id: '1',
    name: 'Test Fund',
    description: 'Test fund description',
    minimumAmount: 50000,
    category: 'FPV'
  };

  it('should create', async () => {
    const { fixture } = await render(FundCardComponent, {
      componentInputs: { fund: mockFund }
    });
    expect(fixture.componentInstance).toBeTruthy();
  });

  describe('fund input', () => {
    it('should accept fund input', async () => {
      const { fixture } = await render(FundCardComponent, {
        componentInputs: { fund: mockFund }
      });
      expect(fixture.componentInstance.fund()).toEqual(mockFund);
    });

    it('should display fund name', async () => {
      await render(FundCardComponent, {
        componentInputs: { fund: mockFund }
      });
      expect(screen.getByText('Test Fund')).toBeTruthy();
    });

    it('should display fund description', async () => {
      await render(FundCardComponent, {
        componentInputs: { fund: mockFund }
      });
      expect(screen.getByText('Test fund description')).toBeTruthy();
    });

    it('should display fund category', async () => {
      await render(FundCardComponent, {
        componentInputs: { fund: mockFund }
      });
      expect(screen.getByText('FPV')).toBeTruthy();
    });

    it('should format minimum amount', async () => {
      await render(FundCardComponent, {
        componentInputs: { fund: mockFund }
      });
      const formattedAmount = screen.getByText(/50\.000/);
      expect(formattedAmount).toBeTruthy();
    });
  });

  describe('isSubscribed input', () => {
    it('should have default value false', async () => {
      const { fixture } = await render(FundCardComponent, {
        componentInputs: { fund: mockFund }
      });
      expect(fixture.componentInstance.isSubscribed()).toBe(false);
    });

    it('should accept isSubscribed true', async () => {
      const { fixture } = await render(FundCardComponent, {
        componentInputs: { fund: mockFund, isSubscribed: true }
      });
      expect(fixture.componentInstance.isSubscribed()).toBe(true);
    });

    it('should show subscribe button when not subscribed', async () => {
      await render(FundCardComponent, {
        componentInputs: { fund: mockFund, isSubscribed: false }
      });
      const button = screen.getByText('Suscribirse');
      expect(button).toBeTruthy();
    });

    it('should display cancel button when subscribed', async () => {
      await render(FundCardComponent, {
        componentInputs: { fund: mockFund, isSubscribed: true }
      });
      const button = screen.getByRole('button', { name: /cancelar/i });
      expect(button).toBeTruthy();
    });
  });

  describe('onSubscribe output', () => {
    it('should emit onSubscribe event when subscribe button is clicked', async () => {
      const user = userEvent.setup();
      let emittedFund: InvestmentFund | null = null;

      const { fixture } = await render(FundCardComponent, {
        componentInputs: { fund: mockFund, isSubscribed: false }
      });
      fixture.componentInstance.onSubscribe.subscribe((fund) => {
        emittedFund = fund;
      });

      const subscribeButton = screen.getByText('Suscribirse');
      await user.click(subscribeButton);

      expect(emittedFund).toEqual(mockFund);
    });

    it('should not emit onSubscribe when subscribed', async () => {
      await render(FundCardComponent, {
        componentInputs: { fund: mockFund, isSubscribed: true }
      });

      const subscribeButton = screen.queryByText('Suscribirse');
      expect(subscribeButton).toBeFalsy();
    });
  });

  describe('onCancel output', () => {
    it('should emit onCancel event when cancel button is clicked', async () => {
      const user = userEvent.setup();
      let emittedFund: InvestmentFund | null = null;

      const { fixture } = await render(FundCardComponent, {
        componentInputs: { fund: mockFund, isSubscribed: true }
      });
      fixture.componentInstance.onCancel.subscribe((fund) => {
        emittedFund = fund;
      });

      const cancelButton = screen.getByRole('button', { name: /cancelar/i });
      await user.click(cancelButton);

      expect(emittedFund).toEqual(mockFund);
    });

    it('should not emit onCancel when not subscribed', async () => {
      await render(FundCardComponent, {
        componentInputs: { fund: mockFund, isSubscribed: false }
      });

      const cancelButton = screen.queryByText('Cancelar');
      expect(cancelButton).toBeFalsy();
    });
  });

  describe('visual rendering', () => {
    it('should render Material card', async () => {
      const { container } = await render(FundCardComponent, {
        componentInputs: { fund: mockFund }
      });
      const card = container.querySelector('mat-card');
      expect(card).toBeTruthy();
    });

    it('should render badge component', async () => {
      const { container } = await render(FundCardComponent, {
        componentInputs: { fund: mockFund }
      });
      const badge = container.querySelector('app-badge');
      expect(badge).toBeTruthy();
    });

    it('should render button component', async () => {
      const { container } = await render(FundCardComponent, {
        componentInputs: { fund: mockFund }
      });
      const button = container.querySelector('app-button');
      expect(button).toBeTruthy();
    });
  });

  describe('different fund categories', () => {
    it('should display FIC category', async () => {
      const ficFund: InvestmentFund = { ...mockFund, category: 'FIC' };
      await render(FundCardComponent, {
        componentInputs: { fund: ficFund }
      });
      expect(screen.getByText('FIC')).toBeTruthy();
    });

    it('should display FPV category', async () => {
      const fpvFund: InvestmentFund = { ...mockFund, category: 'FPV' };
      await render(FundCardComponent, {
        componentInputs: { fund: fpvFund }
      });
      expect(screen.getByText('FPV')).toBeTruthy();
    });
  });

  describe('different amounts', () => {
    it('should format large amounts correctly', async () => {
      const largeFund: InvestmentFund = { ...mockFund, minimumAmount: 1000000 };
      await render(FundCardComponent, {
        componentInputs: { fund: largeFund }
      });
      const formattedAmount = screen.getByText(/1\.000\.000/);
      expect(formattedAmount).toBeTruthy();
    });

    it('should format small amounts correctly', async () => {
      const smallFund: InvestmentFund = { ...mockFund, minimumAmount: 25000 };
      await render(FundCardComponent, {
        componentInputs: { fund: smallFund }
      });
      const formattedAmount = screen.getByText(/25\.000/);
      expect(formattedAmount).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('should have accessible button', async () => {
      await render(FundCardComponent, {
        componentInputs: { fund: mockFund, isSubscribed: false }
      });
      const button = screen.getByRole('button');
      expect(button).toBeTruthy();
    });
  });
});
