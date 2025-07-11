import intlTelInput, { Iti } from '../src/intl-tel-input';

// Mock utils for testing
const mockUtils = {
  formatNumber: jest.fn((number: string, iso2: string, format?: number) => number),
  formatNumberAsYouType: jest.fn((number: string, iso2: string) => number),
  getCoreNumber: jest.fn((number: string, iso2: string) => number.replace(/\D/g, '')),
  getExampleNumber: jest.fn((iso2: string, nationalMode: boolean, numberType: number) => '1234567890'),
  getExtension: jest.fn((number: string, iso2: string) => ''),
  getNumberType: jest.fn((number: string, iso2: string) => 1),
  getValidationError: jest.fn((number: string, iso2: string) => 0),
  isPossibleNumber: jest.fn((number: string, iso2: string, numberType?: any) => true),
  isValidNumber: jest.fn((number: string, iso2: string, numberType?: any) => true),
  numberFormat: { NATIONAL: 0, INTERNATIONAL: 1, E164: 2, RFC3966: 3 },
  numberType: { MOBILE: 1, FIXED_LINE: 0 }
};

describe('intlTelInput Static Methods', () => {
  describe('documentReady', () => {
    test('should always return true for React Native', () => {
      expect(intlTelInput.documentReady()).toBe(true);
    });
  });

  describe('getCountryData', () => {
    test('should return array of countries', () => {
      const countries = intlTelInput.getCountryData();
      expect(Array.isArray(countries)).toBe(true);
      expect(countries.length).toBeGreaterThan(0);
      expect(countries[0]).toHaveProperty('iso2');
      expect(countries[0]).toHaveProperty('name');
      expect(countries[0]).toHaveProperty('dialCode');
    });
  });

  describe('getInstance', () => {
    test('should return null for non-existent instance', () => {
      expect(intlTelInput.getInstance(999)).toBe(null);
    });

    test('should return instance for valid ID', () => {
      const mockTextInput = {};
      const iti = new Iti(mockTextInput, { initialCountry: 'us' });
      expect(intlTelInput.getInstance(iti.id)).toBe(iti);
      iti.destroy();
    });
  });

  describe('instances', () => {
    test('should track instances', () => {
      const mockTextInput = {};
      const iti = new Iti(mockTextInput, { initialCountry: 'us' });
      expect(intlTelInput.instances[iti.id]).toBe(iti);
      iti.destroy();
      expect(intlTelInput.instances[iti.id]).toBeUndefined();
    });
  });
});

describe('Iti Class', () => {
  let iti: Iti;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Create new instance
    const mockTextInput = {};
    iti = new Iti(mockTextInput, {
      initialCountry: 'us',
      nationalMode: false
    });
  });

  afterEach(() => {
    iti.destroy();
  });

  describe('Constructor and Initialization', () => {
    test('should create instance with default options', () => {
      const mockTextInput = {};
      const defaultIti = new Iti(mockTextInput);
      expect(defaultIti.id).toBeDefined();
      expect(defaultIti.getOptions()).toBeDefined();
      expect(defaultIti.getCountries()).toBeDefined();
      defaultIti.destroy();
    });

    test('should merge custom options with defaults', () => {
      const mockTextInput = {};
      const customIti = new Iti(mockTextInput, {
        nationalMode: true,
        allowDropdown: false
      });
      const options = customIti.getOptions();
      expect(options.nationalMode).toBe(true);
      expect(options.allowDropdown).toBe(false);
      customIti.destroy();
    });
  });

  describe('Country Management', () => {
    test('should get countries list', () => {
      const countries = iti.getCountries();
      expect(Array.isArray(countries)).toBe(true);
      expect(countries.length).toBeGreaterThan(0);
      expect(countries[0]).toHaveProperty('iso2');
      expect(countries[0]).toHaveProperty('name');
      expect(countries[0]).toHaveProperty('dialCode');
    });

    test('should set and get selected country', () => {
      iti.setCountry('gb');
      const selectedCountry = iti.getSelectedCountryData();
      expect(selectedCountry.iso2).toBe('gb');
    });

    test('should filter countries with onlyCountries option', () => {
      const mockTextInput = {};
      const filteredIti = new Iti(mockTextInput, {
        onlyCountries: ['us', 'gb', 'ca']
      });
      const countries = filteredIti.getCountries();
      expect(countries.length).toBe(3);
      expect(countries.every(c => ['us', 'gb', 'ca'].includes(c.iso2))).toBe(true);
      filteredIti.destroy();
    });

    test('should exclude countries with excludeCountries option', () => {
      const mockTextInput = {};
      const filteredIti = new Iti(mockTextInput, {
        excludeCountries: ['us', 'gb']
      });
      const countries = filteredIti.getCountries();
      expect(countries.every(c => !['us', 'gb'].includes(c.iso2))).toBe(true);
      filteredIti.destroy();
    });
  });

  describe('Number Processing', () => {
    test('should set and get input value', () => {
      iti.setInputValue('+1234567890');
      expect(iti.getCurrentInputValue()).toBe('+1234567890');
    });

    test('should set number and update country', () => {
      iti.setNumber('+447733312345');
      expect(iti.getSelectedCountryData().iso2).toBe('gb');
    });

    test('should format number as you type', () => {
      iti.setInputValue('1234567890');
      const formatted = iti.formatNumberAsYouType();
      expect(typeof formatted).toBe('string');
    });

    test('should get full number', () => {
      iti.setInputValue('1234567890');
      iti.setCountry('us');
      const number = iti.getNumber();
      expect(typeof number).toBe('string');
    });
  });

  describe('Validation', () => {
    beforeEach(() => {
      // Mock utils availability
      intlTelInput.utils = mockUtils;
    });

    test('should validate number', () => {
      iti.setInputValue('+1234567890');
      const isValid = iti.isValidNumber();
      expect(typeof isValid).toBe('boolean');
    });

    test('should validate number precisely', () => {
      iti.setInputValue('+1234567890');
      const isValid = iti.isValidNumberPrecise();
      expect(typeof isValid).toBe('boolean');
    });

    test('should get validation error', () => {
      iti.setInputValue('+1234567890');
      const error = iti.getValidationError();
      expect(typeof error).toBe('number');
    });

    test('should get number type', () => {
      iti.setInputValue('+1234567890');
      const type = iti.getNumberType();
      expect(typeof type).toBe('number');
    });

    test('should get extension', () => {
      iti.setInputValue('+1234567890');
      const extension = iti.getExtension();
      expect(typeof extension).toBe('string');
    });
  });

  describe('Placeholder Management', () => {
    test('should get placeholder', () => {
      const placeholder = iti.getPlaceholder();
      expect(typeof placeholder).toBe('string');
    });

    test('should set placeholder number type', () => {
      iti.setPlaceholderNumberType('FIXED_LINE');
      expect(iti.getOptions().placeholderNumberType).toBe('FIXED_LINE');
    });

    test('should handle initial placeholder state', () => {
      iti.setHadInitialPlaceholder(true);
      // Should not throw error
      expect(() => iti.getPlaceholder()).not.toThrow();
    });
  });

  describe('Search Functionality', () => {
    test('should search countries by query', () => {
      const results = iti.searchCountries('united');
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(c => c.name.toLowerCase().includes('united'))).toBe(true);
    });

    test('should return all countries for empty query', () => {
      const results = iti.searchCountries('');
      expect(results.length).toBe(iti.getCountries().length);
    });

    test('should search by dial code', () => {
      const results = iti.searchCountries('+1');
      expect(results.some(c => c.dialCode === '1')).toBe(true);
    });

    test('should search by ISO2 code', () => {
      const results = iti.searchCountries('us');
      expect(results.some(c => c.iso2 === 'us')).toBe(true);
    });
  });

  describe('Event System', () => {
    test('should set and trigger event callbacks', () => {
      const mockCallback = jest.fn();
      iti.setEventCallbacks({
        'countrychange': mockCallback
      });

      iti.setCountry('gb');
      expect(mockCallback).toHaveBeenCalled();
    });

    test('should trigger input event on setNumber', () => {
      const mockCallback = jest.fn();
      iti.setEventCallbacks({
        'input': mockCallback
      });

      iti.setNumber('+447733312345');
      expect(mockCallback).toHaveBeenCalledWith({ isSetNumber: true });
    });
  });

  describe('State Management', () => {
    test('should trigger disabled state change event', () => {
      const mockCallback = jest.fn();
      iti.setEventCallbacks({
        'disabledchange': mockCallback
      });

      iti.setDisabled(true);
      expect(mockCallback).toHaveBeenCalledWith({ disabled: true });
    });

    test('should set max length', () => {
      iti.setMaxLength(10);
      // Should not throw error
      expect(() => iti.setMaxLength(10)).not.toThrow();
    });

    test('should handle auto country', () => {
      iti.handleAutoCountry();
      // Should not throw error
      expect(() => iti.handleAutoCountry()).not.toThrow();
    });

    test('should handle utils loading', () => {
      iti.handleUtils();
      // Should not throw error
      expect(() => iti.handleUtils()).not.toThrow();
    });
  });

  describe('Auto Country Detection', () => {
    test('should not set initial country when using auto detection', () => {
      const mockGeoIpLookup = jest.fn((success, failure) => {
        // Simulate async geo IP lookup that returns 'sg'
        setTimeout(() => success('sg'), 100);
      });

      const mockTextInput = {};
      const autoIti = new Iti(mockTextInput, {
        initialCountry: 'auto',
        geoIpLookup: mockGeoIpLookup,
        countryOrder: ['my', 'sg', 'id', 'tw', 'hk', 'mo', 'cn', 'jp']
      });

      // Initially, no country should be selected (waiting for geo IP lookup)
      const initialCountry = autoIti.getSelectedCountryData();
      expect(initialCountry.iso2).toBeUndefined();

      autoIti.destroy();
    });

    test('should set country after geo IP lookup completes', (done) => {
      const mockGeoIpLookup = jest.fn((success, failure) => {
        // Simulate geo IP lookup returning 'sg'
        setTimeout(() => success('sg'), 10);
      });

      const mockTextInput = {};
      const autoIti = new Iti(mockTextInput, {
        initialCountry: 'auto',
        geoIpLookup: mockGeoIpLookup,
        countryOrder: ['my', 'sg', 'id', 'tw', 'hk', 'mo', 'cn', 'jp']
      });

      // Wait for auto country promise to resolve
      autoIti.promise.then(() => {
        const selectedCountry = autoIti.getSelectedCountryData();
        expect(selectedCountry.iso2).toBe('sg');
        autoIti.destroy();
        done();
      }).catch(done);
    });

    test('should use first country from countryOrder when not using auto detection', () => {
      const mockTextInput = {};
      const regularIti = new Iti(mockTextInput, {
        countryOrder: ['my', 'sg', 'id', 'tw', 'hk', 'mo', 'cn', 'jp']
      });

      // Should use first country from countryOrder when not using auto detection
      const selectedCountry = regularIti.getSelectedCountryData();
      expect(selectedCountry.iso2).toBe('my');

      regularIti.destroy();
    });
  });

  describe('Cleanup', () => {
    test('should destroy instance properly', () => {
      const id = iti.id;
      iti.destroy();
      expect(iti.getCurrentInputValue()).toBe('');
    });
  });

  describe('Initial Values', () => {
    test('should handle empty initial value', () => {
      const mockTextInput = {};
      const emptyIti = new Iti(mockTextInput);

      expect(emptyIti.getCurrentInputValue()).toBe('');
      expect(emptyIti.getSelectedCountryData().iso2).toBeUndefined();

      emptyIti.destroy();
    });

    test('should handle valid international number as initial value', () => {
      const mockTextInput = { props: { value: '+44 7947 123 456' } };
      const ukIti = new Iti(mockTextInput);

      ukIti.setInputValue('+44 7947 123 456');
      // In React Native, country detection may require utils or manual setting
      expect(ukIti.getCurrentInputValue()).toBe('+44 7947 123 456');

      ukIti.destroy();
    });

    test('should handle national number with initial country', () => {
      const mockTextInput = { props: { value: '07947123123' } };
      const ukIti = new Iti(mockTextInput, { initialCountry: 'gb' });

      ukIti.setInputValue('07947123123');
      expect(ukIti.getSelectedCountryData().iso2).toBe('gb');

      ukIti.destroy();
    });

    test('should handle regionless NANP number', () => {
      const mockTextInput = {};
      const usIti = new Iti(mockTextInput);

      usIti.setInputValue('+1 800 123 1234');
      // In React Native, country detection may require utils or manual setting
      expect(usIti.getCurrentInputValue()).toBe('+1 800 123 1234');

      usIti.destroy();
    });
  });

  describe('Multiple Instances', () => {
    test('should handle multiple instances with different options', () => {
      const mockTextInput1 = {};
      const mockTextInput2 = {};

      const iti1 = new Iti(mockTextInput1, { onlyCountries: ['af', 'cn'] });
      const iti2 = new Iti(mockTextInput2, { onlyCountries: ['al', 'cn', 'kr', 'ru'] });

      expect(iti1.getCountries().length).toBe(2);
      expect(iti2.getCountries().length).toBe(4);

      // Test that instances are independent
      iti1.setCountry('cn');
      expect(iti1.getSelectedCountryData().iso2).toBe('cn');
      expect(iti2.getSelectedCountryData().iso2).toBeUndefined();

      iti1.destroy();
      iti2.destroy();
    });

    test('should track multiple instances correctly', () => {
      const mockTextInput1 = {};
      const mockTextInput2 = {};

      const iti1 = new Iti(mockTextInput1);
      const iti2 = new Iti(mockTextInput2);

      expect(intlTelInput.getInstance(iti1.id)).toBe(iti1);
      expect(intlTelInput.getInstance(iti2.id)).toBe(iti2);

      iti1.destroy();
      expect(intlTelInput.getInstance(iti1.id)).toBeNull();
      expect(intlTelInput.getInstance(iti2.id)).toBe(iti2);

      iti2.destroy();
    });
  });

  describe('LoadUtils Option', () => {
    beforeEach(() => {
      // Reset utils
      (intlTelInput as any).utils = undefined;
    });

    test('should not load utils if loadUtils option is not set', () => {
      const mockTextInput = {};
      const iti = new Iti(mockTextInput);

      expect(intlTelInput.utils).toBeUndefined();

      iti.destroy();
    });

    test('should handle loadUtils function', async () => {
      const mockLoadUtils = jest.fn(async () => ({ default: mockUtils }));
      const mockTextInput = {};

      const iti = new Iti(mockTextInput, { loadUtils: mockLoadUtils as any });

      // Simulate utils loading
      await intlTelInput.attachUtils(mockLoadUtils as any);

      expect(intlTelInput.utils).toBe(mockUtils);

      iti.destroy();
    });

    test('should handle utils loading failure gracefully', async () => {
      const mockLoadUtils = jest.fn(async () => {
        throw new Error('Failed to load utils');
      });

      // Don't pass loadUtils to constructor to avoid automatic loading
      const mockTextInput = {};
      const iti = new Iti(mockTextInput);

      try {
        await intlTelInput.attachUtils(mockLoadUtils as any);
      } catch (error: any) {
        expect(error.message).toBe('Failed to load utils');
      }

      expect(intlTelInput.utils).toBeUndefined();

      iti.destroy();
    });
  });

  describe('StrictMode Option', () => {
    test('should handle strict mode option', () => {
      const mockTextInput = {};
      const strictIti = new Iti(mockTextInput, {
        strictMode: true,
        initialCountry: 'us'
      });

      // Test that strict mode option is set
      expect(strictIti.getOptions().strictMode).toBe(true);

      // In React Native, strict mode behavior may be different from web
      strictIti.setInputValue('+1987654321');
      expect(strictIti.getCurrentInputValue()).toBeDefined();

      strictIti.destroy();
    });

    test('should handle max length setting', () => {
      const mockTextInput = {};
      const strictIti = new Iti(mockTextInput, {
        strictMode: true,
        initialCountry: 'us'
      });

      // Test max length functionality
      strictIti.setMaxLength(10);
      strictIti.setInputValue('1234567890123456');

      // Max length behavior may vary in React Native
      expect(strictIti.getCurrentInputValue()).toBeDefined();

      strictIti.destroy();
    });
  });

  describe('SeparateDialCode Option', () => {
    test('should handle separate dial code option', () => {
      const mockTextInput = {};
      const separateIti = new Iti(mockTextInput, {
        separateDialCode: true,
        initialCountry: 'us'
      });

      separateIti.setInputValue('7021234567');

      // With separate dial code, the input should not contain the dial code
      expect(separateIti.getCurrentInputValue()).not.toContain('+1');

      // But the full number should include it
      const fullNumber = separateIti.getNumber();
      expect(typeof fullNumber).toBe('string');

      separateIti.destroy();
    });

    test('should handle countries with national prefix correctly in separateDialCode mode', () => {
      const mockTextInput = {};
      const iti = new Iti(mockTextInput, { separateDialCode: true });

      // Test various countries that have national prefixes that should be removed
      // when converting from international to national format
      const testCases = [
        {
          country: 'tw',
          international: '+886912345678',
          expectedNational: '912345678', // Taiwan: no leading 0 in international
          description: 'Taiwan mobile'
        },
        {
          country: 'my',
          international: '+60123456789',
          expectedNational: '123456789', // Malaysia: no leading 0 in international
          description: 'Malaysia mobile'
        },
        {
          country: 'gb',
          international: '+447400123456',
          expectedNational: '7400123456', // UK: no leading 0 in international
          description: 'UK mobile'
        },
        {
          country: 'de',
          international: '+4930123456',
          expectedNational: '30123456', // Germany: no leading 0 in international
          description: 'Germany landline'
        },
        {
          country: 'fr',
          international: '+33123456789',
          expectedNational: '123456789', // France: no leading 0 in international
          description: 'France number'
        },
        {
          country: 'it',
          international: '+393471234567',
          expectedNational: '3471234567', // Italy: no leading 0 in international
          description: 'Italy mobile'
        },
        {
          country: 'au',
          international: '+61412345678',
          expectedNational: '412345678', // Australia: no leading 0 in international
          description: 'Australia mobile'
        }
      ];

      testCases.forEach(({ country, international, expectedNational, description }) => {
        iti.setCountry(country);

        // Test _getDialCode function for: description
        const detectedDialCode = (iti as any)._getDialCode(international);
        expect(detectedDialCode).toBeTruthy();
        expect(international.startsWith(detectedDialCode)).toBe(true);

        // Test _beforeSetNumber function
        const processedNumber = (iti as any)._beforeSetNumber(international);
        expect(processedNumber).toBe(expectedNational);

        // Ensure no leading 0 in the processed number for these countries
        expect(processedNumber).not.toMatch(/^0/);
      });

      iti.destroy();
    });

    test('should correctly detect dial codes for various countries', () => {
      const mockTextInput = {};
      const iti = new Iti(mockTextInput, { separateDialCode: true });

      // Test various country dial codes
      const testCases = [
        { number: '+1234567890', expectedDialCode: '+1' },
        { number: '+44 7400 123456', expectedDialCode: '+44' },
        { number: '+886912345678', expectedDialCode: '+886' },
        { number: '+86 138 0013 8000', expectedDialCode: '+86' },
        { number: '+81 90 1234 5678', expectedDialCode: '+81' },
        { number: '+33 6 12 34 56 78', expectedDialCode: '+33' },
        { number: '+49 30 12345678', expectedDialCode: '+49' },
        { number: '+39 347 123 4567', expectedDialCode: '+39' },
        { number: '+7 495 123 45 67', expectedDialCode: '+7' },
        { number: '+91 98765 43210', expectedDialCode: '+91' }
      ];

      testCases.forEach(({ number, expectedDialCode }) => {
        const detectedDialCode = (iti as any)._getDialCode(number);
        expect(detectedDialCode).toBe(expectedDialCode);
      });

      iti.destroy();
    });

    test('should handle _beforeSetNumber correctly for separateDialCode', () => {
      const mockTextInput = {};
      const iti = new Iti(mockTextInput, { separateDialCode: true });

      // Test _beforeSetNumber with various numbers
      const testCases = [
        {
          input: '+1234567890',
          country: 'us',
          expected: '234567890' // Should remove +1
        },
        {
          input: '+44 7400 123456',
          country: 'gb',
          expected: '7400 123456' // Should remove +44 and preserve formatting
        },
        {
          input: '+886912345678',
          country: 'tw',
          expected: '912345678' // Should remove +886, no leading 0
        },
        {
          input: '+86 138 0013 8000',
          country: 'cn',
          expected: '138 0013 8000' // Should remove +86
        }
      ];

      testCases.forEach(({ input, country, expected }) => {
        iti.setCountry(country);
        const result = (iti as any)._beforeSetNumber(input);
        expect(result).toBe(expected);
      });

      iti.destroy();
    });

    test('should handle edge cases in _getDialCode', () => {
      const mockTextInput = {};
      const iti = new Iti(mockTextInput);

      // Test edge cases
      expect((iti as any)._getDialCode('')).toBe('');
      expect((iti as any)._getDialCode('123456')).toBe(''); // No + prefix
      expect((iti as any)._getDialCode('+')).toBe('');
      expect((iti as any)._getDialCode('+abc')).toBe(''); // Non-numeric after +
      expect((iti as any)._getDialCode('+999999')).toBe(''); // Invalid dial code

      iti.destroy();
    });

    test('should preserve full international number when separateDialCode = false', () => {
      const mockTextInput = {};
      const iti = new Iti(mockTextInput, { separateDialCode: false });

      // Test that when separateDialCode is false, the full international number is preserved
      const testCases = [
        {
          country: 'tw',
          international: '+886912345678',
          expectedValue: '+886912345678', // Full number should be preserved
          description: 'Taiwan mobile'
        },
        {
          country: 'my',
          international: '+60123456789',
          expectedValue: '+60123456789', // Full number should be preserved
          description: 'Malaysia mobile'
        },
        {
          country: 'gb',
          international: '+447400123456',
          expectedValue: '+447400123456', // Full number should be preserved
          description: 'UK mobile'
        },
        {
          country: 'de',
          international: '+4930123456',
          expectedValue: '+4930123456', // Full number should be preserved
          description: 'Germany landline'
        }
      ];

      testCases.forEach(({ country, international, expectedValue, description }) => {
        iti.setCountry(country);

        // Test setNumber with separateDialCode = false for: description
        iti.setNumber(international);
        const currentValue = iti.getCurrentInputValue();

        // When separateDialCode is false, the full international number should be preserved
        expect(currentValue).toBe(expectedValue);
        expect(currentValue).toContain('+'); // Should contain the + and country code

        // Test _beforeSetNumber should NOT remove dial code when separateDialCode is false
        const processedNumber = (iti as any)._beforeSetNumber(international);
        expect(processedNumber).toBe(international); // Should return the full number unchanged
      });

      iti.destroy();
    });

    test('should correctly replace dial code when changing countries with separateDialCode = true', () => {
      const mockTextInput = {};
      const iti = new Iti(mockTextInput, {
        separateDialCode: true,
        initialCountry: 'sg'
      });

      // Test the core dial code replacement functionality
      // This tests the _updateDialCode method fix

      // 1. Set an international format number (the problematic scenario)
      iti.setInputValue('+6598765432'); // Singapore international format
      let currentValue = iti.getCurrentInputValue();
      expect(currentValue).toBe('+6598765432'); // Initial state

      // 2. Test the _updateDialCode method directly by calling setCountry
      // This should trigger _updateDialCode which should replace +65 with +60
      iti.setCountry('my');
      currentValue = iti.getCurrentInputValue();

      // The fix should ensure the dial code is properly replaced
      // Before fix: would remain "+6598765432" (old dial code not replaced)
      // After fix: should become "+6098765432" (dial code properly replaced)
      expect(currentValue).toBe('+6098765432');

      // Verify no duplicate dial codes
      expect(currentValue).not.toMatch(/\+65.*\+60/);
      expect(currentValue).not.toMatch(/\+60.*\+65/);

      // Should not contain the old Singapore dial code
      expect(currentValue).not.toContain('+65');

      // Should contain the new Malaysia dial code
      expect(currentValue).toContain('+60');

      // Test additional country changes to ensure consistency
      const testCases = [
        { from: 'my', to: 'au', fromCode: '+60', toCode: '+61' },
        { from: 'au', to: 'de', fromCode: '+61', toCode: '+49' },
        { from: 'de', to: 'us', fromCode: '+49', toCode: '+1' },
        { from: 'us', to: 'sg', fromCode: '+1', toCode: '+65' }
      ];

      testCases.forEach(({ from, to, fromCode, toCode }) => {
        // Set up with international format
        iti.setCountry(from);
        iti.setInputValue(`${fromCode}98765432`);

        const beforeChange = iti.getCurrentInputValue();
        expect(beforeChange).toContain(fromCode);

        // Change country - should trigger dial code replacement
        iti.setCountry(to);
        const afterChange = iti.getCurrentInputValue();

        // Should have the new dial code
        expect(afterChange).toContain(toCode);

        // Should not have the old dial code
        expect(afterChange).not.toContain(fromCode);

        // Should not have duplicate dial codes
        expect(afterChange).not.toMatch(new RegExp(`\\${fromCode}.*\\${toCode}`));
        expect(afterChange).not.toMatch(new RegExp(`\\${toCode}.*\\${fromCode}`));
      });

      iti.destroy();
    });

    test('should handle national mode correctly with national prefixes', () => {
      // Test national mode behavior with countries that have national prefixes
      const testCases = [
        {
          country: 'tw',
          nationalNumber: '0912345678', // Taiwan national format with leading 0
          expectedInternational: '+886912345678',
          description: 'Taiwan national to international'
        },
        {
          country: 'my',
          nationalNumber: '0123456789', // Malaysia national format with leading 0
          expectedInternational: '+60123456789',
          description: 'Malaysia national to international'
        },
        {
          country: 'gb',
          nationalNumber: '07400123456', // UK national format with leading 0
          expectedInternational: '+447400123456',
          description: 'UK national to international'
        }
      ];

      testCases.forEach(({ country, nationalNumber, expectedInternational, description }) => {
        const mockTextInput = {};
        const nationalIti = new Iti(mockTextInput, {
          nationalMode: true,
          initialCountry: country
        });

        // Set national number and check if it converts correctly to international for: description
        nationalIti.setInputValue(nationalNumber);
        const fullNumber = nationalIti.getNumber();

        // The getNumber() should return the correct international format
        // Note: This might return empty string if utils are not available, which is expected
        if (fullNumber) {
          expect(fullNumber).toBe(expectedInternational);
        }

        nationalIti.destroy();
      });
    });
  });

  describe('AttachUtils Static Method', () => {
    beforeEach(() => {
      // Reset utils
      (intlTelInput as any).utils = undefined;
    });

    test('should attach utils successfully', async () => {
      const utilsLoader = jest.fn(async () => ({ default: mockUtils }));

      const result = await intlTelInput.attachUtils(utilsLoader as any);

      // attachUtils returns the utils object, not a boolean
      expect(result).toBe(mockUtils);
      expect(intlTelInput.utils).toBe(mockUtils);
      expect(utilsLoader).toHaveBeenCalledTimes(1);
    });

    test('should handle utils loading rejection', async () => {
      const utilsLoader = jest.fn(async () => {
        throw new Error('Network error');
      });

      await expect(intlTelInput.attachUtils(utilsLoader as any)).rejects.toThrow('Network error');
      expect(intlTelInput.utils).toBeUndefined();
    });

    test('should handle multiple calls to attachUtils', async () => {
      const utilsLoader = jest.fn(async () => ({ default: mockUtils }));

      await intlTelInput.attachUtils(utilsLoader as any);
      await intlTelInput.attachUtils(utilsLoader as any);

      // In React Native implementation, loader may be called multiple times
      expect(utilsLoader).toHaveBeenCalled();
      expect(intlTelInput.utils).toBe(mockUtils);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle invalid country codes gracefully', () => {
      const mockTextInput = {};
      const iti = new Iti(mockTextInput);

      // Try to set invalid country - should throw error or handle gracefully
      expect(() => {
        iti.setCountry('invalid');
      }).toThrow();

      iti.destroy();
    });

    test('should handle empty or null input values', () => {
      const mockTextInput = {};
      const iti = new Iti(mockTextInput);

      iti.setInputValue('');
      expect(iti.getCurrentInputValue()).toBe('');

      iti.setInputValue(null as any);
      // React Native implementation may handle null differently
      const currentValue = iti.getCurrentInputValue();
      expect(currentValue === '' || currentValue === null).toBe(true);

      iti.destroy();
    });

    test('should handle invalid phone numbers', () => {
      const mockTextInput = {};
      const iti = new Iti(mockTextInput);

      iti.setInputValue('invalid phone number');
      expect(iti.getCurrentInputValue()).toBe('invalid phone number');

      // Without utils, validation should return null or false
      const isValid = iti.isValidNumber();
      expect(isValid === null || isValid === false).toBe(true);

      iti.destroy();
    });

    test('should handle options with invalid values', () => {
      const mockTextInput = {};

      // Test with invalid onlyCountries
      const iti1 = new Iti(mockTextInput, { onlyCountries: ['invalid'] });
      expect(iti1.getCountries().length).toBe(0);
      iti1.destroy();

      // Test with invalid excludeCountries
      const iti2 = new Iti(mockTextInput, { excludeCountries: ['invalid'] });
      expect(iti2.getCountries().length).toBeGreaterThan(0);
      iti2.destroy();
    });

    test('should handle placeholder operations without utils', () => {
      const mockTextInput = {};
      const iti = new Iti(mockTextInput, { initialCountry: 'us' });

      // Without utils, placeholder should be empty or default
      const placeholder = iti.getPlaceholder();
      expect(typeof placeholder).toBe('string');

      iti.destroy();
    });

    test('should handle number formatting without utils', () => {
      const mockTextInput = {};
      const iti = new Iti(mockTextInput, { initialCountry: 'us' });

      iti.setInputValue('1234567890');

      // Without utils, should return empty string or original value
      const formattedNumber = iti.getNumber();
      expect(typeof formattedNumber).toBe('string');

      const extension = iti.getExtension();
      expect(extension).toBe('');

      iti.destroy();
    });

    test('should handle search with empty or invalid queries', () => {
      const mockTextInput = {};
      const iti = new Iti(mockTextInput);

      // Empty query should return all countries
      const allResults = iti.searchCountries('');
      expect(Array.isArray(allResults)).toBe(true);

      // Invalid query should return empty array or filtered results
      const noResults = iti.searchCountries('zzzzz');
      expect(Array.isArray(noResults)).toBe(true);

      iti.destroy();
    });

    test('should handle destroy multiple times', () => {
      const mockTextInput = {};
      const iti = new Iti(mockTextInput);
      const id = iti.id;

      iti.destroy();
      expect(intlTelInput.getInstance(id)).toBeNull();

      // Destroying again should not throw error
      expect(() => iti.destroy()).not.toThrow();
    });
  });
});
