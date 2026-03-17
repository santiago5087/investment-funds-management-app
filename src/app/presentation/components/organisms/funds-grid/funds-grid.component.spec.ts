import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { FundsGridComponent } from './funds-grid.component';
import { InvestmentFund } from '../../../../domain/models';
import { describe, it, expect, vi } from 'vitest';

describe('FundsGridComponent', () => {
  const mockFunds: InvestmentFund[] = [
    {
      id: '1',
      name: 'Fund 1',
      description: 'Description 1',
      minimumAmount: 50000,
      category: 'FPV'
    },
    {
      id: '2',
      name: 'Fund 2',
      description: 'Description 2',
      minimumAmount: 75000,
      category: 'FIC'
    }
  ];

  it('should create', async () => {
    const { fixture } = await render(FundsGridComponent, {
      componentInputs: { funds: mockFunds }
    });
    expect(fixture.componentInstance).toBeTruthy();
  });

  describe('funds input', () => {
    it('should accept funds array', async () => {
      const { fixture } = await render(FundsGridComponent, {
        componentInputs: { funds: mockFunds }
      });
      expect(fixture.componentInstance.funds()).toEqual(mockFunds);
    });

    it('should render fund cards via Material components', async () => {
      const { container } = await render(FundsGridComponent, {
        componentInputs: { funds: mockFunds }
      });
      const fundCards = container.querySelectorAll('mat-card');
      expect(fundCards.length).toBeGreaterThan(0);
    });

    it('should render empty state when funds array is empty', async () => {
      await render(FundsGridComponent, {
        componentInputs: { funds: [] }
      });
      const noFundsMessage = screen.queryByText(/No hay fondos/i);
      expect(noFundsMessage).toBeTruthy();
    });
  });

  describe('loading input', () => {
    it('should have default loading false', async () => {
      const { fixture } = await render(FundsGridComponent, {
        componentInputs: { funds: mockFunds }
      });
      expect(fixture.componentInstance.loading()).toBe(false);
    });

    it('should show spinner when loading is true', async () => {
      const { container } = await render(FundsGridComponent, {
        componentInputs: { funds: [], loading: true }
      });
      // The component renders app-spinner, which internally uses mat-progress-spinner
      const spinner = container.querySelector('app-spinner');
      expect(spinner).toBeTruthy();
    });

    it('should not show funds when loading', async () => {
      const { container } = await render(FundsGridComponent, {
        componentInputs: { funds: mockFunds, loading: true }
      });
      const fundCards = container.querySelectorAll('app-fund-card');
      expect(fundCards.length).toBe(0);
    });
  });

  describe('subscribedFundIds input', () => {
    it('should have default empty array', async () => {
      const { fixture } = await render(FundsGridComponent, {
        componentInputs: { funds: mockFunds }
      });
      expect(fixture.componentInstance.subscribedFundIds()).toEqual([]);
    });

    it('should accept subscribedFundIds array', async () => {
      const { fixture } = await render(FundsGridComponent, {
        componentInputs: { funds: mockFunds, subscribedFundIds: ['1'] }
      });
      expect(fixture.componentInstance.subscribedFundIds()).toEqual(['1']);
    });
  });

  describe('isSubscribed method', () => {
    it('should return true when fund is subscribed', async () => {
      const { fixture } = await render(FundsGridComponent, {
        componentInputs: { funds: mockFunds, subscribedFundIds: ['1', '2'] }
      });
      expect(fixture.componentInstance.isSubscribed('1')).toBe(true);
      expect(fixture.componentInstance.isSubscribed('2')).toBe(true);
    });

    it('should return false when fund is not subscribed', async () => {
      const { fixture } = await render(FundsGridComponent, {
        componentInputs: { funds: mockFunds, subscribedFundIds: ['1'] }
      });
      expect(fixture.componentInstance.isSubscribed('2')).toBe(false);
    });

    it('should return false when no funds are subscribed', async () => {
      const { fixture } = await render(FundsGridComponent, {
        componentInputs: { funds: mockFunds, subscribedFundIds: [] }
      });
      expect(fixture.componentInstance.isSubscribed('1')).toBe(false);
    });
  });

  describe('onSubscribe output', () => {
    it('should emit fund when subscribe event is triggered', async () => {
      let emittedFund: InvestmentFund | null = null;
      const { fixture } = await render(FundsGridComponent, {
        componentInputs: { funds: mockFunds }
      });
      
      fixture.componentInstance.onSubscribe.subscribe((fund) => {
        emittedFund = fund;
      });

      // Simulate fund card emitting the subscribe event
      fixture.componentInstance.onSubscribe.emit(mockFunds[0]);
      
      expect(emittedFund).toEqual(mockFunds[0]);
    });
  });

  describe('onCancel output', () => {
    it('should emit fund when cancel event is triggered', async () => {
      let emittedFund: InvestmentFund | null = null;
      const { fixture } = await render(FundsGridComponent, {
        componentInputs: { funds: mockFunds, subscribedFundIds: ['1'] }
      });
      
      fixture.componentInstance.onCancel.subscribe((fund) => {
        emittedFund = fund;
      });

      // Simulate fund card emitting the cancel event
      fixture.componentInstance.onCancel.emit(mockFunds[0]);
      
      expect(emittedFund).toEqual(mockFunds[0]);
    });
  });

  describe('visual rendering', () => {
    it('should render grid container when not loading', async () => {
      const { container } = await render(FundsGridComponent, {
        componentInputs: { funds: mockFunds }
      });
      const grid = container.querySelector('.funds-grid');
      expect(grid).toBeTruthy();
    });

    it('should render in grid layout', async () => {
      const { container } = await render(FundsGridComponent, {
        componentInputs: { funds: mockFunds }
      });
      const grid = container.querySelector('.funds-grid');
      expect(grid).toBeTruthy();
    });
  });

  describe('different fund quantities', () => {
    it('should render single fund', async () => {
      const { container } = await render(FundsGridComponent, {
        componentInputs: { funds: [mockFunds[0]] }
      });
      const fundCards = container.querySelectorAll('app-fund-card');
      expect(fundCards.length).toBe(1);
    });

    it('should render multiple funds', async () => {
      const manyFunds = Array(6).fill(null).map((_, i) => ({
        ...mockFunds[0],
        id: `${i}`,
        name: `Fund ${i}`
      }));
      const { container } = await render(FundsGridComponent, {
        componentInputs: { funds: manyFunds }
      });
      const fundCards = container.querySelectorAll('app-fund-card');
      expect(fundCards.length).toBe(6);
    });
  });
});
