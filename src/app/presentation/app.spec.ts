import '@test-setup';
import { render, screen } from '@testing-library/angular';
import { App } from './app';

describe('App', () => {
  it('should create the app', async () => {
    const { fixture } = await render(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    await render(App);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Investment Funds Management App');
  });
});
