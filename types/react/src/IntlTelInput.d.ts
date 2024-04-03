import { ReactElement } from "react";
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
