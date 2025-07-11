// Jest setup file for React Native intl-tel-input tests

// Mock global objects that might be needed
global.process = {
  env: {
    VERSION: '1.0.0'
  }
};

// Mock console methods if needed
global.console = {
  ...console,
  // Uncomment to suppress console logs during tests
  // log: jest.fn(),
  // warn: jest.fn(),
  // error: jest.fn(),
};

// Setup any global test utilities here
beforeEach(() => {
  // Reset any global state before each test
});

afterEach(() => {
  // Cleanup after each test
});
