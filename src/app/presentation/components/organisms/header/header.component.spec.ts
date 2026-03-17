import { render, screen } from '@testing-library/angular';
import { HeaderComponent } from './header.component';
import { provideRouter } from '@angular/router';
import { describe, it, expect } from 'vitest';

describe('HeaderComponent', () => {
  it('should create', async () => {
    const { fixture } = await render(HeaderComponent, {
      providers: [provideRouter([])]
    });
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display app name', async () => {
    const { fixture } = await render(HeaderComponent, {
      providers: [provideRouter([])]
    });
    expect(fixture.componentInstance.appName()).toBe('BTG Fondos');
    expect(screen.getByText('BTG Fondos')).toBeTruthy();
  });

  it('should have navigation links configured', async () => {
    const { fixture } = await render(HeaderComponent, {
      providers: [provideRouter([])]
    });
    const links = fixture.componentInstance.navigationLinks();
    expect(links).toHaveLength(4);
  });

  it('should have Home link', async () => {
    const { fixture } = await render(HeaderComponent, {
      providers: [provideRouter([])]
    });
    const links = fixture.componentInstance.navigationLinks();
    const homeLink = links.find(link => link.label === 'Inicio');
    expect(homeLink).toBeDefined();
    expect(homeLink?.path).toBe('/');
    expect(homeLink?.exact).toBe(true);
  });

  it('should have Funds link', async () => {
    const { fixture } = await render(HeaderComponent, {
      providers: [provideRouter([])]
    });
    const links = fixture.componentInstance.navigationLinks();
    const fundsLink = links.find(link => link.label === 'Fondos');
    expect(fundsLink).toBeDefined();
    expect(fundsLink?.path).toBe('/funds');
  });

  it('should have Subscriptions link', async () => {
    const { fixture } = await render(HeaderComponent, {
      providers: [provideRouter([])]
    });
    const links = fixture.componentInstance.navigationLinks();
    const subsLink = links.find(link => link.label === 'Mis Inversiones');
    expect(subsLink).toBeDefined();
    expect(subsLink?.path).toBe('/subscriptions');
  });

  it('should have Transactions link', async () => {
    const { fixture } = await render(HeaderComponent, {
      providers: [provideRouter([])]
    });
    const links = fixture.componentInstance.navigationLinks();
    const transLink = links.find(link => link.label === 'Historial');
    expect(transLink).toBeDefined();
    expect(transLink?.path).toBe('/transactions');
  });

  it('should render all navigation links', async () => {
    await render(HeaderComponent, {
      providers: [provideRouter([])]
    });
    expect(screen.getByText('Inicio')).toBeTruthy();
    expect(screen.getByText('Fondos')).toBeTruthy();
    expect(screen.getByText('Mis Inversiones')).toBeTruthy();
    expect(screen.getByText('Historial')).toBeTruthy();
  });

  it('should render nav element', async () => {
    const { container } = await render(HeaderComponent, {
      providers: [provideRouter([])]
    });
    const nav = container.querySelector('nav');
    expect(nav).toBeTruthy();
  });

  it('should have routerLink attributes', async () => {
    const { container } = await render(HeaderComponent, {
      providers: [provideRouter([])]
    });
    const links = container.querySelectorAll('[routerLink]');
    expect(links.length).toBeGreaterThan(0);
  });
});
