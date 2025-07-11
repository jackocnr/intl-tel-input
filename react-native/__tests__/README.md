# React Native intl-tel-input Tests

This directory contains comprehensive Jest tests for the React Native implementation of intl-tel-input.

## Setup

1. Install dependencies:
```bash
cd react-native/__tests__
npm install
```

2. Run tests:
```bash
npm test
```

## Test Coverage

The test suite covers:

### Static Utility Functions
- `getNumeric()` - Extract numeric digits from strings
- `normaliseString()` - Normalize accented characters
- `isRegionlessNanp()` - Identify regionless NANP numbers
- `translateCursorPosition()` - Calculate cursor position after formatting
- `documentReady()` - Check document ready state (React Native compatible)

### Iti Class Core Functionality
- **Constructor and Initialization**
  - Default options handling
  - Custom options merging
  - Instance creation and tracking

- **Country Management**
  - Country list retrieval
  - Country selection and data retrieval
  - Country filtering (onlyCountries, excludeCountries)
  - Country ordering

- **Number Processing**
  - Input value setting and retrieval
  - Number setting with country detection
  - Format-as-you-type functionality
  - Full number retrieval

- **Validation** (requires utils)
  - Number validation (basic and precise)
  - Validation error retrieval
  - Number type detection
  - Extension extraction

- **Placeholder Management**
  - Placeholder generation
  - Placeholder number type setting
  - Initial placeholder state handling

- **Search Functionality**
  - Country search by name
  - Search by dial code
  - Search by ISO2 code
  - Search result filtering

- **Event System**
  - Event callback registration
  - Country change events
  - Input events
  - Custom event triggering

- **State Management**
  - Disabled state handling
  - Max length setting
  - Auto country handling
  - Utils loading handling

- **Cleanup**
  - Instance destruction
  - Memory cleanup

## Test Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests with verbose output
npm run test:verbose
```

## Test Structure

- `intl-tel-input.test.ts` - Main test file with comprehensive coverage
- `jest.config.js` - Jest configuration
- `jest.setup.js` - Test setup and global mocks
- `package.json` - Test dependencies and scripts

## Mocking

The tests include mocks for:
- Utils functions (formatNumber, isValidNumber, etc.)
- Global objects (process.env)
- Console methods (optional)

## Coverage Goals

The test suite aims for:
- 100% function coverage of public API methods
- 90%+ line coverage of core functionality
- Edge case testing for error conditions
- Integration testing between components

## Running Tests

These tests can be run independently of the React Native simulator, making it easy to:
- Validate function behavior during development
- Ensure API compatibility with main implementation
- Catch regressions during refactoring
- Verify edge cases and error handling

## Notes

- Tests are designed to work without DOM dependencies
- Utils functions are mocked to test core logic independently
- Event system tests verify React Native-compatible event handling
- Search functionality tests cover all search criteria types
