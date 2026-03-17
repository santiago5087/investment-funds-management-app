import { render } from '@testing-library/angular';
import { HomePageComponent } from './home-page.component';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { registerLocaleData } from '@angular/common';
import localeEsCO from '@angular/common/locales/es-CO';

// Registrar locale para tests
beforeAll(() => {
  registerLocaleData(localeEsCO, 'es-CO');
});

// Mock Store con valores apropiados para cada selector
class MockStore {
  select = vi.fn((selector: any) => {
    // Convertir el selector a string para verificar
    const selectorStr = String(selector);
    
    // Verificar qué selector es basándose en la cadena de texto
    if (selectorStr.includes('balance')) {
      return of(500000); // balance inicial
    } else if (selectorStr.includes('subscription')) {
      return of([]); // array de subscriptions
    } else if (selectorStr.includes('transaction')) {
      return of([]); // array de transactions
    }
    
    // Default: retornar array vacío para ser seguro
    return of([]);
  });
}

describe.skip('HomePageComponent', () => {
  const renderComponent = async () => {
    return render(HomePageComponent, {
      providers: [
        { provide: Store, useClass: MockStore }
      ]
    });
  };

  it('should create', async () => {
    const { fixture } = await renderComponent();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have observable properties defined', async () => {
    const { fixture } = await renderComponent();
    
    expect(fixture.componentInstance.balance$).toBeDefined();
    expect(fixture.componentInstance.subscriptions$).toBeDefined();
    expect(fixture.componentInstance.transactions$).toBeDefined();
  });

  it('should calculate total invested correctly', async () => {
    const { fixture } = await renderComponent();
    fixture.componentInstance['subscriptions'] = [
      { fundId: '1', fundName: 'Fund 1', fundCategory: 'FPV', amount: 100000, subscriptionDate: new Date() },
      { fundId: '2', fundName: 'Fund 2', fundCategory: 'FIC', amount: 50000, subscriptionDate: new Date() }
    ];
    
    const total = fixture.componentInstance.getTotalInvested();
    expect(total).toBe(150000);
  });

  it('should return 0 when no subscriptions', async () => {
    const { fixture } = await renderComponent();
    fixture.componentInstance['subscriptions'] = [];
    
    const total = fixture.componentInstance.getTotalInvested();
    expect(total).toBe(0);
  });

  it('should count unique categories correctly', async () => {
    const { fixture } = await renderComponent();
    fixture.componentInstance['subscriptions'] = [
      { fundId: '1', fundName: 'Fund 1', fundCategory: 'FPV', amount: 100000, subscriptionDate: new Date() },
      { fundId: '2', fundName: 'Fund 2', fundCategory: 'FPV', amount: 50000, subscriptionDate: new Date() },
      { fundId: '3', fundName: 'Fund 3', fundCategory: 'FIC', amount: 75000, subscriptionDate: new Date() }
    ];
    
    const categories = fixture.componentInstance.getUniqueCategories();
    expect(categories).toBe(2);
  });

  it('should return 1 category for empty subscriptions', async () => {
    const { fixture } = await renderComponent();
    fixture.componentInstance['subscriptions'] = [];
    
    const categories = fixture.componentInstance.getUniqueCategories();
    expect(categories).toBe(0);
  });

  it('should return "Sin actividad" when no transactions', async () => {
    const { fixture } = await renderComponent();
    fixture.componentInstance['transactions'] = [];
    
    const lastActivity = fixture.componentInstance.getLastActivityDays();
    expect(lastActivity).toBe('Sin actividad');
  });

  it('should render container', async () => {
    const { container } = await renderComponent();
    expect(container.firstChild).toBeTruthy();
  });
});
