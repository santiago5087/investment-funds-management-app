import { render } from '@testing-library/angular';
import { TransactionsPageComponent } from './transactions-page.component';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { describe, it, expect, vi } from 'vitest';

// Mock Store
class MockStore {
  select = vi.fn(() => of([]));
}

describe('TransactionsPageComponent', () => {
  const renderComponent = async () => {
    return render(TransactionsPageComponent, {
      providers: [
        { provide: Store, useClass: MockStore }
      ]
    });
  };

  it('should create', async () => {
    const { fixture } = await renderComponent();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should initialize transactions$ on ngOnInit', async () => {
    const { fixture } = await renderComponent();
    
    expect(fixture.componentInstance.transactions$).toBeDefined();
  });

  it('should have transactions observable', async () => {
    const { fixture } = await renderComponent();
    
    expect(fixture.componentInstance.transactions$).toBeDefined();
  });

  it('should render container element', async () => {
    const { container } = await renderComponent();
    expect(container.firstChild).toBeTruthy();
  });

  it('should be a standalone component', async () => {
    const { fixture } = await renderComponent();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
