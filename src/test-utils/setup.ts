import '@testing-library/jest-dom';

// Add TextEncoder polyfill for React Router v7
if (typeof TextEncoder === 'undefined') {
    const { TextEncoder, TextDecoder } = require('util');
    global.TextEncoder = TextEncoder;
    global.TextDecoder = TextDecoder;
}

declare global {
    namespace jest {
        interface Matchers<R> {
            toBeInTheDocument(): R;
            toHaveValue(value: string): R;
        }
    }
} 