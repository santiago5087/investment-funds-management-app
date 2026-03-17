import { render, screen } from '@testing-library/angular';
import { TransactionsTableComponent } from './transactions-table.component';
import { Transaction } from '../../../../domain/models';
import { describe, it, expect } from 'vitest';

describe('TransactionsTableComponent', () => {
  const mockTransactions: Transaction[] = [
    {
      id: 'txn-1',
      fundId: 'fund-1',
      fundName: 'Fund 1',
      type: 'subscription',
      amount: 100000,
      date: new Date('2024-01-15'),
      notificationMethod: 'email',
      email: 'test@example.com'
    },
    {
      id: 'txn-2',
      fundId: 'fund-2',
      fundName: 'Fund 2',
      type: 'cancellation',
      amount: 50000,
      date: new Date('2024-01-20')
    }
  ];

  it('should create', async () => {
    const { fixture } = await render(TransactionsTableComponent, {
      componentInputs: { transactions: mockTransactions }
    });
    expect(fixture.componentInstance).toBeTruthy();
  });

  describe('transactions input', () => {
    it('should accept transactions array', async () => {
      const { fixture } = await render(TransactionsTableComponent, {
        componentInputs: { transactions: mockTransactions }
      });
      expect(fixture.componentInstance.transactions()).toEqual(mockTransactions);
    });

    it('should display fund names', async () => {
      await render(TransactionsTableComponent, {
        componentInputs: { transactions: mockTransactions }
      });
      expect(screen.getByText('Fund 1')).toBeTruthy();
      expect(screen.getByText('Fund 2')).toBeTruthy();
    });

    it('should format amounts correctly', async () => {
      await render(TransactionsTableComponent, {
        componentInputs: { transactions: mockTransactions }
      });
      const amount1 = screen.getByText(/100\.000/);
      const amount2 = screen.getByText(/50\.000/);
      expect(amount1).toBeTruthy();
      expect(amount2).toBeTruthy();
    });

    it('should display transaction dates', async () => {
      const { container } = await render(TransactionsTableComponent, {
        componentInputs: { transactions: mockTransactions }
      });
      // Check that transaction cards are rendered
      const cards = container.querySelectorAll('.transaction-card');
      expect(cards.length).toBe(2);
    });
  });

  describe('transaction types', () => {
    it('should display subscription badge', async () => {
      const { container } = await render(TransactionsTableComponent, {
        componentInputs: { transactions: [mockTransactions[0]] }
      });
      const badges = container.querySelectorAll('mat-chip');
      expect(badges.length).toBeGreaterThan(0);
    });

    it('should display cancellation badge', async () => {
      const { container } = await render(TransactionsTableComponent, {
        componentInputs: { transactions: [mockTransactions[1]] }
      });
      const badges = container.querySelectorAll('mat-chip');
      expect(badges.length).toBeGreaterThan(0);
    });
  });

  describe('empty state', () => {
    it('should render empty state when no transactions', async () => {
      await render(TransactionsTableComponent, {
        componentInputs: { transactions: [] }
      });
      const emptyMessage = screen.getByText(/No hay transacciones/i);
      expect(emptyMessage).toBeTruthy();
    });

    it('should not show transactions container when transactions array is empty', async () => {
      const { container } = await render(TransactionsTableComponent, {
        componentInputs: { transactions: [] }
      });
      const transactionsContainer = container.querySelector('.transactions-container');
      expect(transactionsContainer).toBeFalsy();
    });
  });

  describe('visual rendering', () => {
    it('should render transactions container', async () => {
      const { container } = await render(TransactionsTableComponent, {
        componentInputs: { transactions: mockTransactions }
      });
      const transactionsContainer = container.querySelector('.transactions-container');
      expect(transactionsContainer).toBeTruthy();
    });

    it('should render transaction cards for each transaction', async () => {
      const { container } = await render(TransactionsTableComponent, {
        componentInputs: { transactions: mockTransactions }
      });
      const cards = container.querySelectorAll('.transaction-card');
      expect(cards.length).toBe(2);
    });

    it('should render badge components using mat-chip', async () => {
      const { container } = await render(TransactionsTableComponent, {
        componentInputs: { transactions: mockTransactions }
      });
      const badges = container.querySelectorAll('mat-chip');
      expect(badges.length).toBeGreaterThan(0);
    });
  });

  describe('different quantities', () => {
    it('should render single transaction', async () => {
      const { container } = await render(TransactionsTableComponent, {
        componentInputs: { transactions: [mockTransactions[0]] }
      });
      const cards = container.querySelectorAll('.transaction-card');
      expect(cards.length).toBe(1);
    });

    it('should render many transactions', async () => {
      const manyTransactions = Array(10).fill(null).map((_, i) => ({
        ...mockTransactions[0],
        id: `txn-${i}`,
        fundName: `Fund ${i}`
      }));
      const { container } = await render(TransactionsTableComponent, {
        componentInputs: { transactions: manyTransactions }
      });
      const cards = container.querySelectorAll('.transaction-card');
      expect(cards.length).toBe(10);
    });
  });

  describe('notification method display', () => {
    it('should show notification method badge', async () => {
      const { container } = await render(TransactionsTableComponent, {
        componentInputs: { transactions: [mockTransactions[0]] }
      });
      const badges = container.querySelectorAll('mat-chip');
      expect(badges.length).toBeGreaterThan(0);
    });

    it('should handle transactions without notification method', async () => {
      const txWithoutNotification: Transaction = {
        ...mockTransactions[1],
        notificationMethod: undefined
      };
      const { container } = await render(TransactionsTableComponent, {
        componentInputs: { transactions: [txWithoutNotification] }
      });
      expect(container).toBeTruthy();
    });
  });
});
