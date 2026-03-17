import '@testing-library/jest-dom/vitest';
import 'zone.js';
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { afterEach } from 'vitest';

// Initialize the Angular testing environment once
const testEnvironment = getTestBed();

if (!testEnvironment.platform) {
  testEnvironment.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting(),
  );
}

// Reset TestBed after each test to avoid "Cannot configure test module when already instantiated" errors
afterEach(() => {
  testEnvironment.resetTestingModule();
});
