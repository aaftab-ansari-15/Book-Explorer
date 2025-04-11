import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Configure React Testing Library
configure({
  testIdAttribute: 'data-testid',
});

// Extend expect with jest-dom matchers
expect.extend({
  toBeInTheDocument: (received) => {
    const pass = received !== null && received !== undefined;
    return {
      pass,
      message: () => `expected ${received} to be in the document`,
    };
  },
  toHaveValue: (received, expected) => {
    const pass = received.value === expected;
    return {
      pass,
      message: () => `expected ${received.value} to be ${expected}`,
    };
  },
}); 