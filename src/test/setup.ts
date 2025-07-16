import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Astro globals
global.Astro = {
  props: {},
  url: new URL('http://localhost:3000'),
  generator: 'Astro v5.8.1',
} as any;

// Mock window.dataLayer for Google Analytics
Object.defineProperty(window, 'dataLayer', {
  value: [],
  writable: true,
});

// Mock gtag function
global.gtag = vi.fn();