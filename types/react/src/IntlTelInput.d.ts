import { ReactElement } from "react";
import PropTypes from "prop-types";
declare const IntlTelInput: {
    ({ initialValue, onChangeNumber, onChangeCountry, onChangeValidity, onChangeErrorCode, usePreciseValidation, initOptions, inputProps, }: {
        initialValue: string;
        onChangeNumber: (number: string) => void;
        onChangeCountry: (country: string) => void;
        onChangeValidity: (valid: boolean) => void;
        onChangeErrorCode: (errorCode: number | null) => void;
        usePreciseValidation: boolean;
        initOptions: SomeOptions;
        inputProps: object;
    }): ReactElement;
    propTypes: {
        initialValue: PropTypes.Requireable<string>;
        onChangeNumber: PropTypes.Requireable<(...args: any[]) => any>;
        onChangeCountry: PropTypes.Requireable<(...args: any[]) => any>;
        onChangeValidity: PropTypes.Requireable<(...args: any[]) => any>;
        onChangeErrorCode: PropTypes.Requireable<(...args: any[]) => any>;
        usePreciseValidation: PropTypes.Requireable<boolean>;
        initOptions: PropTypes.Requireable<PropTypes.InferProps<{
            allowDropdown: PropTypes.Requireable<boolean>;
            autoPlaceholder: PropTypes.Requireable<string>;
            containerClass: PropTypes.Requireable<string>;
            countrySearch: PropTypes.Requireable<boolean>;
            customPlaceholder: PropTypes.Requireable<(...args: any[]) => any>;
            dropdownContainer: PropTypes.Requireable<PropTypes.ReactNodeLike>;
            excludeCountries: PropTypes.Requireable<string[]>;
            fixDropdownWidth: PropTypes.Requireable<boolean>;
            formatAsYouType: PropTypes.Requireable<boolean>;
            formatOnDisplay: PropTypes.Requireable<boolean>;
            geoIpLookup: PropTypes.Requireable<(...args: any[]) => any>;
            hiddenInput: PropTypes.Requireable<(...args: any[]) => any>;
            i18n: PropTypes.Requireable<{
                [x: string]: string;
            }>;
            initialCountry: PropTypes.Requireable<string>;
            nationalMode: PropTypes.Requireable<boolean>;
            onlyCountries: PropTypes.Requireable<string[]>;
            placeholderNumberType: PropTypes.Requireable<string>;
            preferredCountries: PropTypes.Requireable<string[]>;
            showFlags: PropTypes.Requireable<boolean>;
            showSelectedDialCode: PropTypes.Requireable<boolean>;
            useFullscreenPopup: PropTypes.Requireable<boolean>;
            utilsScript: PropTypes.Requireable<string>;
        }>>;
        inputProps: PropTypes.Requireable<object>;
    };
    defaultProps: {
        initialValue: string;
        onChangeNumber: () => void;
        onChangeCountry: () => void;
        onChangeValidity: () => void;
        onChangeErrorCode: () => void;
        usePreciseValidation: boolean;
        initOptions: {};
        inputProps: {};
    };
};
export default IntlTelInput;
