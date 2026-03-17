import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { FundsImplementationRepository } from './funds-implementation.repository';
import { InvestmentFund } from '../../../domain/models';
import { environment } from '../../../../environments/environment';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('FundsImplementationRepository', () => {
  let repository: FundsImplementationRepository;
  let httpMock: HttpTestingController;

  const mockFunds: InvestmentFund[] = [
    {
      id: '1',
      name: 'FPV_BTG_PACTUAL_RECAUDADORA',
      description: 'Fondo de pensión voluntaria',
      minimumAmount: 75000,
      category: 'FPV'
    },
    {
      id: '2',
      name: 'FPV_BTG_PACTUAL_ECOPETROL',
      description: 'Fondo pensional Ecopetrol',
      minimumAmount: 125000,
      category: 'FPV'
    },
    {
      id: '3',
      name: 'DEUDAPRIVADA',
      description: 'Fondo de inversión colectiva',
      minimumAmount: 50000,
      category: 'FIC'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FundsImplementationRepository,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    repository = TestBed.inject(FundsImplementationRepository);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

  describe('getFunds', () => {
    it('should fetch funds from API', async () => {
      await new Promise<void>((resolve) => {
        repository.getFunds().subscribe(funds => {
          expect(funds).toEqual(mockFunds);
          expect(funds.length).toBe(3);
          resolve();
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/funds`);
        expect(req.request.method).toBe('GET');
        req.flush(mockFunds);
      });
    }, 2000);

    it('should use correct API URL from environment', async () => {
      await new Promise<void>((resolve) => {
        repository.getFunds().subscribe(() => {
          resolve();
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/funds`);
        expect(req.request.url).toBe(`${environment.apiUrl}/funds`);
        req.flush(mockFunds);
      });
    }, 2000);

    it('should apply 1 second delay', async () => {
      const startTime = Date.now();

      await new Promise<void>((resolve) => {
        repository.getFunds().subscribe(() => {
          const endTime = Date.now();
          const elapsed = endTime - startTime;
          
          // Should take at least 1000ms due to delay
          expect(elapsed).toBeGreaterThanOrEqual(1000);
          resolve();
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/funds`);
        req.flush(mockFunds);
      });
    }, 2000);

    it('should return empty array when API returns empty', async () => {
      await new Promise<void>((resolve) => {
        repository.getFunds().subscribe(funds => {
          expect(funds).toEqual([]);
          expect(funds.length).toBe(0);
          resolve();
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/funds`);
        req.flush([]);
      });
    }, 2000);

    it('should handle API errors', async () => {
      const errorMessage = 'Network error';

      await new Promise<void>((resolve) => {
        repository.getFunds().subscribe({
          error: (error) => {
            expect(error.status).toBe(500);
            resolve();
          }
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/funds`);
        req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
      });
    }, 2000);

    it('should return funds with correct structure', async () => {
      await new Promise<void>((resolve) => {
        repository.getFunds().subscribe(funds => {
          funds.forEach(fund => {
            expect(fund).toHaveProperty('id');
            expect(fund).toHaveProperty('name');
            expect(fund).toHaveProperty('description');
            expect(fund).toHaveProperty('minimumAmount');
            expect(fund).toHaveProperty('category');
          });
          resolve();
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/funds`);
        req.flush(mockFunds);
      });
    }, 2000);

    it('should handle 404 error', async () => {
      await new Promise<void>((resolve) => {
        repository.getFunds().subscribe({
          error: (error) => {
            expect(error.status).toBe(404);
            resolve();
          }
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/funds`);
        req.flush('Not found', { status: 404, statusText: 'Not Found' });
      });
    }, 2000);

    it('should make only one HTTP request', async () => {
      await new Promise<void>((resolve) => {
        repository.getFunds().subscribe(() => {
          resolve();
        });

        const requests = httpMock.match(`${environment.apiUrl}/funds`);
        expect(requests.length).toBe(1);
        requests[0].flush(mockFunds);
      });
    }, 2000);
  });

  describe('HTTP configuration', () => {
    it('should not send any body in GET request', async () => {
      await new Promise<void>((resolve) => {
        repository.getFunds().subscribe(() => {
          resolve();
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/funds`);
        expect(req.request.body).toBeNull();
        req.flush(mockFunds);
      });
    }, 2000);

    it('should have correct HTTP headers', async () => {
      await new Promise<void>((resolve) => {
        repository.getFunds().subscribe(() => {
          resolve();
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/funds`);
        // HttpClient automatically sets Accept header
        expect(req.request.headers.has('Accept')).toBe(false); // No custom headers set
        req.flush(mockFunds);
      });
    }, 2000);
  });
});
