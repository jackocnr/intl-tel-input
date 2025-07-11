//* THIS FILE IS AUTO-GENERATED. DO NOT EDIT.
import intlTelInput from "./intlTelInputWithUtils";
//* Keep the TS imports separate, as the above line gets substituted in the reactNativeWithUtils build process.
import { SomeOptions, Iti } from "../intl-tel-input";
import { Country } from "./data";
import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle, useCallback } from "react";
import {
  View,
  TextInput,
  Modal,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  TextInputProps,
  SafeAreaView
} from "react-native";

// make this available as a named export, so react-native users can access globals like intlTelInput.utils
export { intlTelInput };

// Convert ISO2 country code to flag emoji
const getCountryFlag = (iso2: string): string => {
  if (!iso2 || iso2.length !== 2) return "🏳️";

  // Convert ISO2 to flag emoji using Unicode regional indicator symbols
  const codePoints = iso2.toUpperCase().split('').map(char =>
    0x1F1E6 + char.charCodeAt(0) - 'A'.charCodeAt(0)
  );
  return String.fromCodePoint(...codePoints);
};

type ItiProps = {
  initialValue?: string;
  onChangeNumber?: (number: string) => void;
  onChangeCountry?: (country: string) => void;
  onChangeValidity?: (valid: boolean) => void;
  onChangeErrorCode?: (errorCode: number | null) => void;
  usePreciseValidation?: boolean;
  initOptions?: SomeOptions;
  inputProps?: TextInputProps;
  disabled?: boolean | undefined;
  // React Native specific styling props
  style?: object;
  countrySelectorStyle?: object;
  flagStyle?: object;
  textStyle?: object;
  inputStyle?: object;
  dropdownContainerStyle?: object;
  dropdownStyle?: object;
  countryNameStyle?: object;
  dialCodeStyle?: object;
};

export type IntlTelInputRef = {
  getInstance: () => Iti | null;
  getInput: () => TextInput | null;
}

const IntlTelInput = forwardRef(function IntlTelInput({
  initialValue = "",
  onChangeNumber = () => {},
  onChangeCountry = () => {},
  onChangeValidity = () => {},
  onChangeErrorCode = () => {},
  usePreciseValidation = false,
  initOptions = {},
  inputProps = {},
  disabled = undefined,
  style,
  countrySelectorStyle,
  flagStyle,
  textStyle,
  inputStyle,
  dropdownContainerStyle,
  dropdownStyle,
  countryNameStyle,
  dialCodeStyle
}: ItiProps, ref: React.ForwardedRef<IntlTelInputRef>) {
  const [phoneNumber, setPhoneNumber] = useState(initialValue);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [placeholder, setPlaceholder] = useState("");

  const textInputRef = useRef<TextInput>(null);
  const itiRef = useRef<Iti | null>(null);
  const [processedCountries, setProcessedCountries] = useState<Country[]>([]);

  // Get search placeholder from i18n options
  const getSearchPlaceholder = useCallback(() => {
    if (itiRef.current) {
      const options = itiRef.current.getOptions();
      return options.i18n?.searchPlaceholder || "Search countries...";
    }
    return "Search countries...";
  }, []);

  // Update placeholder when country changes
  const updatePlaceholder = () => {
    if (itiRef.current) {
      // Set whether there was an initial placeholder (for polite mode)
      const hasInitialPlaceholder = Boolean(inputProps?.placeholder);
      itiRef.current.setHadInitialPlaceholder(hasInitialPlaceholder);

      // Get the placeholder using the same logic as the main implementation
      const placeholderText = itiRef.current.getPlaceholder();
      setPlaceholder(placeholderText || inputProps?.placeholder || "Phone number");
    } else {
      setPlaceholder(inputProps?.placeholder || "Phone number");
    }
  };

  // Update function similar to React implementation
  const update = useCallback((): void => {
    if (itiRef.current) {
      const num = itiRef.current.getNumber() || "";
      const countryIso = itiRef.current.getSelectedCountryData().iso2 || "";
      const currentInputValue = itiRef.current.getCurrentInputValue();

      // For display in TextInput: use appropriate format based on separateDialCode
      let displayValue = currentInputValue;
      if (initOptions.separateDialCode) {
        // When separateDialCode is true, strip the dial code from the input
        // The dial code will be shown separately in the UI
        const selectedCountryData = itiRef.current.getSelectedCountryData();
        if (selectedCountryData.dialCode && currentInputValue.startsWith(`+${selectedCountryData.dialCode}`)) {
          // Remove the dial code and any following space/separator
          const dialCodeLength = selectedCountryData.dialCode.length + 1; // +1 for the "+"
          displayValue = currentInputValue.substring(dialCodeLength).replace(/^[\s-]/, '');
        }
      }

      // Update phone number state (for TextInput display)
      setPhoneNumber(displayValue);
      // Always pass the full international number to the callback
      onChangeNumber(num);
      onChangeCountry(countryIso);

      // Update selected country state
      if (countryIso) {
        const country = processedCountries.find(c => c.iso2 === countryIso);
        if (country) {
          setSelectedCountry(country);
        }
      }

      // Validate the number
      const isValid = usePreciseValidation
        ? itiRef.current.isValidNumberPrecise()
        : itiRef.current.isValidNumber();

      if (isValid) {
        onChangeValidity(true);
        onChangeErrorCode(null);
      } else {
        const errorCode = itiRef.current.getValidationError();
        onChangeValidity(false);
        onChangeErrorCode(errorCode);
      }
    }
  }, [onChangeCountry, onChangeErrorCode, onChangeNumber, onChangeValidity, usePreciseValidation, processedCountries, initOptions.separateDialCode]);

  // Initialize Iti instance and get processed countries from it
  useEffect(() => {
    if (!itiRef.current) {
      itiRef.current = intlTelInput(textInputRef.current, initOptions);

      // Set maxLength if provided in inputProps (for _cap() method compatibility)
      if (inputProps?.maxLength) {
        itiRef.current.setMaxLength(inputProps.maxLength);
      }

      // Get processed countries from Iti instance
      const countries = itiRef.current.getCountries();
      setProcessedCountries(countries);

      // If there's an initial value, process it like the main implementation does
      if (initialValue) {
        // Use setNumber which handles country detection and formatting automatically
        itiRef.current.setNumber(initialValue);

        // Get the formatted value from the instance
        const formattedValue = itiRef.current.getCurrentInputValue() || initialValue;
        setPhoneNumber(formattedValue);
      }

      // Get selected country from Iti instance (after potential country detection)
      const selectedCountryData = itiRef.current.getSelectedCountryData();
      if (selectedCountryData.iso2) {
        const country = countries.find(c => c.iso2 === selectedCountryData.iso2);
        if (country) {
          setSelectedCountry(country);
          onChangeCountry(country.iso2);
        }
      } else {
        // Check if we're using auto country detection
        const isAutoCountry = initOptions.initialCountry === "auto" && initOptions.geoIpLookup;

        if (!isAutoCountry) {
          // If not using auto country, use the first country from the processed list as fallback
          const firstCountry = countries[0];
          if (firstCountry) {
            setSelectedCountry(firstCountry);
            onChangeCountry(firstCountry.iso2);
            itiRef.current.setCountry(firstCountry.iso2);
          }
        }
        // If using auto country, don't set any country initially - wait for geo IP lookup to complete
      }

      // When plugin initialization has finished (e.g. loaded utils script), update all the state values
      itiRef.current.promise.then(() => {
        update();

        // After auto country detection completes, update selected country if it was set
        const finalSelectedCountryData = itiRef.current?.getSelectedCountryData();
        if (finalSelectedCountryData?.iso2 && !selectedCountry) {
          const country = countries.find(c => c.iso2 === finalSelectedCountryData.iso2);
          if (country) {
            setSelectedCountry(country);
            onChangeCountry(country.iso2);
          }
        }
      }).catch(() => {
        // Handle initialization errors gracefully
      });
    }
  }, [initOptions, onChangeCountry, update]);

  // Update placeholder when selected country changes
  useEffect(() => {
    updatePlaceholder();
  }, [selectedCountry]);

  // Update placeholder and re-format initial value when utils are loaded
  useEffect(() => {
    if (itiRef.current) {
      itiRef.current.promise.then(() => {
        updatePlaceholder();

        // Re-format the initial value now that utils are loaded
        const currentValue = itiRef.current?.getCurrentInputValue();
        if (currentValue) {
          // Use setNumber to re-format with utils now available
          itiRef.current?.setNumber(currentValue);
          const formattedValue = itiRef.current?.getCurrentInputValue() || currentValue;
          setPhoneNumber(formattedValue);
        }
      }).catch(() => {
        // Utils failed to load, keep current placeholder
      });
    }

    return () => {
      if (itiRef.current) {
        itiRef.current.destroy();
        itiRef.current = null;
      }
    };
  }, []);

  // Update placeholder when utils become available (separate from promise)
  useEffect(() => {
    const utilsAvailable = !!intlTelInput.utils;
    if (utilsAvailable) {
      updatePlaceholder();
    }
  }, [intlTelInput.utils]);

  // Handle disabled state changes (like React implementation)
  useEffect(() => {
    // React Native doesn't have a setDisabled method on Iti, but we handle it in the UI
    // This effect is here for consistency with React implementation patterns
  }, [disabled]);

  // Filter countries for search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCountries(processedCountries);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = processedCountries.filter(country =>
        country.name.toLowerCase().includes(query) ||
        country.iso2.toLowerCase().includes(query) ||
        country.dialCode.includes(query)
      );
      setFilteredCountries(filtered);
    }
  }, [searchQuery, processedCountries]);

  // Handle phone number change with format-as-you-type
  const handlePhoneNumberChange = useCallback((text: string) => {
    if (itiRef.current) {
      // Update Iti instance with current input value
      itiRef.current.setInputValue(text);

      // Check if country should be updated from the number
      const countryChanged = itiRef.current.updateCountryFromNumber(text);

      // Apply format-as-you-type if enabled
      let formattedText = text;
      if (initOptions.formatAsYouType !== false) {
        formattedText = itiRef.current.formatNumberAsYouType();
      }

      // Update the phone number state
      setPhoneNumber(formattedText);

      // If country changed, trigger full update (like React implementation)
      if (countryChanged) {
        update();
      } else {
        // Just update number and validation
        onChangeNumber(formattedText);

        const isValid = usePreciseValidation
          ? itiRef.current.isValidNumberPrecise()
          : itiRef.current.isValidNumber();
        const errorCode = itiRef.current.getValidationError();

        onChangeValidity(isValid ?? false);
        onChangeErrorCode(isValid ? null : errorCode);
      }
    } else {
      // Fallback when no Iti instance
      setPhoneNumber(text);
      onChangeNumber(text);
      const isValid = text.length > 0;
      onChangeValidity(isValid);
      onChangeErrorCode(isValid ? null : 0);
    }
  }, [onChangeNumber, onChangeValidity, onChangeErrorCode, usePreciseValidation, initOptions.formatAsYouType, update]);

  // Handle country selection
  const handleCountrySelect = useCallback((country: Country) => {
    setSelectedCountry(country);
    setIsDropdownVisible(false);
    setSearchQuery("");

    // Update Iti instance with new country
    if (itiRef.current) {
      itiRef.current.setCountry(country.iso2);
      // Trigger update to sync all state (similar to React implementation)
      update();
    } else {
      // Fallback
      onChangeCountry(country.iso2);
    }
  }, [onChangeCountry, update]);

  // Expose methods via ref (simplified to match React implementation)
  useImperativeHandle(ref, () => ({
    getInstance: () => itiRef.current,
    getInput: () => textInputRef.current,
  }));

  const renderCountryItem = ({ item }: { item: Country }) => (
    <TouchableOpacity
      style={[styles.countryItem, dropdownStyle]}
      onPress={() => handleCountrySelect(item)}
    >
      {(initOptions.showFlags !== false) && (
        <Text style={[styles.flag, flagStyle]}>
          {getCountryFlag(item.iso2)}
        </Text>
      )}
      <Text style={[styles.countryName, countryNameStyle]}>{item.name}</Text>
      <Text style={[styles.dialCode, dialCodeStyle]}>+{item.dialCode}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, style]}>
        {(initOptions.allowDropdown !== false) && (
          <TouchableOpacity
            style={[styles.countrySelector, countrySelectorStyle]}
            onPress={() => setIsDropdownVisible(true)}
            disabled={disabled || false}
          >
            {(initOptions.showFlags !== false) && selectedCountry && (
              <Text style={[styles.selectedFlag, flagStyle]}>
                {getCountryFlag(selectedCountry.iso2)}
              </Text>
            )}
            <Text style={styles.dropdownArrow}>▼</Text>
            {initOptions.separateDialCode && selectedCountry && (
              <Text style={[styles.selectedDialCode, textStyle]}>
                +{selectedCountry.dialCode}
              </Text>
            )}
          </TouchableOpacity>
        )}

        <TextInput
          ref={textInputRef}
          style={[styles.textInput, textStyle, inputStyle]}
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
          placeholder={placeholder || "Phone number"}
          keyboardType="phone-pad"
          editable={disabled !== true}
          {...inputProps}
        />
      </View>

      <Modal
        visible={isDropdownVisible}
        animationType="slide"
        onRequestClose={() => setIsDropdownVisible(false)}
      >
        <SafeAreaView style={[styles.modalContainer, dropdownContainerStyle]}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsDropdownVisible(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {(initOptions.countrySearch !== false) && (
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder={getSearchPlaceholder()}
              autoFocus
            />
          )}

          <FlatList
            data={filteredCountries}
            renderItem={renderCountryItem}
            keyExtractor={(item: Country) => item.iso2}
            style={styles.countryList}
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  selectedFlag: {
    fontSize: 20,
    marginRight: 4,
  },
  selectedDialCode: {
    marginLeft: 8,
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#666',
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 12,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'ios' ? 44 : 0,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchInput: {
    margin: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    fontSize: 16,
  },
  countryList: {
    flex: 1,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  flag: {
    fontSize: 20,
    marginRight: 12,
  },
  countryName: {
    flex: 1,
    fontSize: 16,
  },
  dialCode: {
    fontSize: 16,
    color: '#666',
  },
});

export default IntlTelInput;
