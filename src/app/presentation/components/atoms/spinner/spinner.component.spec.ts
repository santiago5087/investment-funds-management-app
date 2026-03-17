import { render, screen } from '@testing-library/angular';
import { SpinnerComponent } from './spinner.component';
import { describe, it, expect } from 'vitest';

describe('SpinnerComponent', () => {
  it('should create', async () => {
    const { fixture } = await render(SpinnerComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render Material spinner', async () => {
    const { container } = await render(SpinnerComponent);
    const spinner = container.querySelector('mat-spinner');
    expect(spinner).toBeTruthy();
  });

  it('should be visible in the DOM', async () => {
    const { container } = await render(SpinnerComponent);
    const spinner = container.querySelector('mat-spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('should render inside a container', async () => {
    const { container } = await render(SpinnerComponent);
    const spinnerContainer = container.querySelector('.spinner-container');
    expect(spinnerContainer).toBeTruthy();
  });
});
