import { render, screen } from '@testing-library/angular';
import { FooterComponent } from './footer.component';
import { describe, it, expect } from 'vitest';

describe('FooterComponent', () => {
  it('should create', async () => {
    const { fixture } = await render(FooterComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display current year', async () => {
    const { fixture, container } = await render(FooterComponent);
    const currentYear = new Date().getFullYear();
    expect(fixture.componentInstance.currentYear()).toBe(currentYear);
    
    const footer = container.querySelector('footer');
    expect(footer?.textContent).toContain(currentYear.toString());
  });

  it('should display project name', async () => {
    const { fixture } = await render(FooterComponent);
    expect(fixture.componentInstance.projectName()).toBe('BTG Fondos');
    expect(screen.getByText(/BTG Fondos/)).toBeTruthy();
  });

  it('should display author name', async () => {
    const { fixture } = await render(FooterComponent);
    expect(fixture.componentInstance.author()).toBe('Edhy Santiago Marin Arbelaez');
    expect(screen.getByText(/Edhy Santiago Marin Arbelaez/)).toBeTruthy();
  });

  it('should render footer element', async () => {
    const { container } = await render(FooterComponent);
    const footer = container.querySelector('footer');
    expect(footer).toBeTruthy();
  });
});
