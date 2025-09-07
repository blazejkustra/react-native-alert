/* eslint-disable no-undef */
// Mock Platform for testing
jest.mock('react-native', () => ({
  Platform: {
    OS: 'ios',
    select: jest.fn((obj) => obj.ios),
  },
  Alert: {
    alert: jest.fn(),
  },
  TurboModuleRegistry: {
    getEnforcing: jest.fn(() => ({
      alert: jest.fn(),
      prompt: jest.fn(),
    })),
  },
}));

// Mock document for web platform tests
global.document = {
  createElement: jest.fn(() => ({
    className: '',
    innerHTML: '',
    showModal: jest.fn(),
    close: jest.fn(),
    addEventListener: jest.fn(),
    querySelector: jest.fn(),
    classList: {
      add: jest.fn(),
    },
  })),
  body: {
    appendChild: jest.fn(),
    removeChild: jest.fn(),
  },
};
