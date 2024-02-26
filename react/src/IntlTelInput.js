/* eslint-disable react/jsx-filename-extension */
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import intlTelInput from "../../build/js/intlTelInput";

const IntlTelInput = ({
  initialValue,
  onChangeNumber,
  onChangeCountry,
  onChangeValidity,
  onChangeErrorCode,
  initOptions,
  className,
  disabled,
  onFocus,
  onBlur,
  placeholder,
}) => {
  const inputRef = useRef(null);
  const itiRef = useRef(null);
  
  const update = () => {
    const num = itiRef.current.getNumber();
    const countryIso = itiRef.current.getSelectedCountryData().iso2;
    // note: this number will be in standard E164 format, but any container component can use
    // intlTelInputUtils.formatNumber() to convert this to another format
    // as well as intlTelInputUtils.getNumberType() etc. if need be
    onChangeNumber(num);
    onChangeCountry(countryIso);

    if (itiRef.current.isValidNumber()) {
      onChangeValidity(true);
      onChangeErrorCode(null);
    } else {
      const errorCode = itiRef.current.getValidationError();
      onChangeValidity(false);
      onChangeErrorCode(errorCode);
    }
  };
  
  useEffect(() => {
    // store a reference to the current input ref, which otherwise is already lost in the cleanup function
    const inputRefCurrent = inputRef.current;
    itiRef.current = intlTelInput(inputRef.current, initOptions);
    inputRefCurrent.addEventListener("countrychange", update);
    return () => {
      inputRefCurrent.removeEventListener("countrychange", update);
      itiRef.current.destroy();
    };
  }, []);
  
  return (
    <input
      type="tel"
      ref={inputRef}
      onInput={update}
      defaultValue={initialValue}
      className={className}
      disabled={disabled}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={placeholder}
    />
  );
};

IntlTelInput.propTypes = {
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,
  onChangeNumber: PropTypes.func,
  onChangeCountry: PropTypes.func,
  onChangeValidity: PropTypes.func,
  onChangeErrorCode: PropTypes.func,
  initOptions: PropTypes.shape({
    allowDropdown: PropTypes.bool,
    autoInsertDialCode: PropTypes.bool,
    autoPlaceholder: PropTypes.string,
    containerClass: PropTypes.string,
    countrySearch: PropTypes.bool,
    customPlaceholder: PropTypes.func,
    dropdownContainer: PropTypes.node,
    excludeCountries: PropTypes.arrayOf(PropTypes.string),
    fixDropdownWidth: PropTypes.bool,
    formatAsYouType: PropTypes.bool,
    formatOnDisplay: PropTypes.bool,
    geoIpLookup: PropTypes.func,
    hiddenInput: PropTypes.func,
    i18n: PropTypes.objectOf(PropTypes.string),
    initialCountry: PropTypes.string,
    nationalMode: PropTypes.bool,
    onlyCountries: PropTypes.arrayOf(PropTypes.string),
    placeholderNumberType: PropTypes.string,
    preferredCountries: PropTypes.arrayOf(PropTypes.string),
    showFlags: PropTypes.bool,
    showSelectedDialCode: PropTypes.bool,
    useFullscreenPopup: PropTypes.bool,
    utilsScript: PropTypes.string,
  }),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

IntlTelInput.defaultProps = {
  initialValue: "",
  placeholder: "",
  onChangeNumber: () => {},
  onChangeCountry: () => {},
  onChangeValidity: () => {},
  onChangeErrorCode: () => {},
  initOptions: {},
  className: "",
  disabled: false,
  onFocus: () => {},
  onBlur: () => {},
};

export default IntlTelInput;