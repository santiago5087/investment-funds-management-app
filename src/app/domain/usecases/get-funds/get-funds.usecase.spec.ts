import { describe, it, expect, beforeEach, vi } from 'vitest';
import { of, Observable } from 'rxjs';
import { GetFundsUseCase } from './get-funds.usecase';
import { FundsRepository } from '../../repositories/funds.repository';
import { InvestmentFund } from '../../models';

describe('GetFundsUseCase', () => {
  let useCase: GetFundsUseCase;
  let mockRepository: FundsRepository;

  const mockFunds: InvestmentFund[] = [
    {
      id: '1',
      name: 'Test Fund 1',
      description: 'Test Description 1',
      minimumAmount: 50000,
      category: 'FPV'
    },
    {
      id: '2',
      name: 'Test Fund 2',
      description: 'Test Description 2',
      minimumAmount: 100000,
      category: 'FIC'
    }
  ];

  beforeEach(() => {
    mockRepository = {
      getFunds: vi.fn().mockReturnValue(of(mockFunds))
    } as any;

    useCase = new GetFundsUseCase(mockRepository);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  describe('execute', () => {
    it('should call repository.getFunds()', async () => {
      await new Promise<void>((resolve) => {
        useCase.execute().subscribe(() => {
          expect(mockRepository.getFunds).toHaveBeenCalled();
          resolve();
        });
      });
    });

    it('should return funds from repository', async () => {
      await new Promise<void>((resolve) => {
        useCase.execute().subscribe(funds => {
          expect(funds).toEqual(mockFunds);
          expect(funds.length).toBe(2);
          expect(funds[0].name).toBe('Test Fund 1');
          expect(funds[1].name).toBe('Test Fund 2');
          resolve();
        });
      });
    });

    it('should return empty array when repository returns empty', async () => {
      mockRepository.getFunds = vi.fn().mockReturnValue(of([]));

      await new Promise<void>((resolve) => {
        useCase.execute().subscribe(funds => {
          expect(funds).toEqual([]);
          expect(funds.length).toBe(0);
          resolve();
        });
      });
    });

    it('should pass through repository errors', async () => {
      const error = new Error('Repository error');
      mockRepository.getFunds = vi.fn().mockReturnValue(
        new Observable(subscriber => subscriber.error(error))
      );

      await new Promise<void>((resolve) => {
        useCase.execute().subscribe({
          error: (err) => {
            expect(err.message).toBe('Repository error');
            resolve();
          }
        });
      });
    });

    it('should not modify data from repository', async () => {
      const originalFunds = [...mockFunds];

      await new Promise<void>((resolve) => {
        useCase.execute().subscribe(funds => {
          expect(funds).toEqual(originalFunds);
          expect(mockRepository.getFunds).toHaveBeenCalledTimes(1);
          resolve();
        });
      });
    });
  });

  describe('dependency injection', () => {
    it('should work with different repository implementations', async () => {
      const alternativeFunds: InvestmentFund[] = [
        {
          id: '999',
          name: 'Alternative Fund',
          description: 'Alternative Description',
          minimumAmount: 25000,
          category: 'FPV'
        }
      ];

      const alternativeRepo: FundsRepository = {
        getFunds: vi.fn().mockReturnValue(of(alternativeFunds))
      } as any;

      const alternativeUseCase = new GetFundsUseCase(alternativeRepo);

      await new Promise<void>((resolve) => {
        alternativeUseCase.execute().subscribe(funds => {
          expect(funds).toEqual(alternativeFunds);
          expect(funds[0].id).toBe('999');
          resolve();
        });
      });
    });
  });
});
