import intlTelInput from "../intl-tel-input";
import { Component, Input, ViewChild, ElementRef, Output, EventEmitter, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from "@angular/forms";
import * as i0 from "@angular/core";
const _c0 = ["inputRef"];
export { intlTelInput };
export const PHONE_ERROR_MESSAGES = [
    "invalid",
    "invalid-country-code",
    "too-short",
    "too-long",
    "invalid-format",
];
export class IntlTelInputComponent {
    constructor() {
        this.initialValue = "";
        this.usePreciseValidation = false;
        this.inputProps = {};
        this.disabled = undefined;
        this.initOptions = {};
        this.numberChange = new EventEmitter();
        this.countryChange = new EventEmitter();
        this.validityChange = new EventEmitter();
        this.errorCodeChange = new EventEmitter();
        this.iti = null;
        this.countryChangeHandler = () => this.handleInput();
        // eslint-disable-next-line class-methods-use-this
        this.onChange = () => { };
        // eslint-disable-next-line class-methods-use-this
        this.onTouched = () => { };
        // eslint-disable-next-line class-methods-use-this
        this.onValidatorChange = () => { };
    }
    ngOnInit() {
        if (this.inputRef.nativeElement) {
            this.iti = intlTelInput(this.inputRef.nativeElement, this.initOptions);
        }
        this.inputRef.nativeElement.addEventListener("countrychange", this.countryChangeHandler);
        this.applyInputProps();
        for (const key in this.inputProps) {
            if (this.inputProps.hasOwnProperty(key)) {
                this.inputRef.nativeElement.setAttribute(key, this.inputProps[key]);
            }
        }
    }
    ngAfterViewInit() {
        var _a;
        if (this.initialValue) {
            (_a = this.iti) === null || _a === void 0 ? void 0 : _a.setNumber(this.initialValue);
        }
    }
    handleInput() {
        if (!this.iti)
            return;
        const num = this.iti.getNumber() || "";
        const countryIso = this.iti.getSelectedCountryData().iso2 || "";
        this.numberChange.emit(num);
        this.countryChange.emit(countryIso);
        const isValid = this.usePreciseValidation
            ? this.iti.isValidNumberPrecise()
            : this.iti.isValidNumber();
        if (isValid) {
            this.validityChange.emit(true);
            this.errorCodeChange.emit(null);
        }
        else {
            this.validityChange.emit(false);
            this.errorCodeChange.emit(this.iti.getValidationError());
        }
        this.onChange(num);
        this.onValidatorChange();
    }
    handleBlur() {
        this.onTouched();
    }
    getInstance() {
        return this.iti;
    }
    getInput() {
        return this.inputRef.nativeElement;
    }
    ngOnDestroy() {
        var _a;
        (_a = this.iti) === null || _a === void 0 ? void 0 : _a.destroy();
        this.inputRef.nativeElement.removeEventListener("countrychange", this.countryChangeHandler);
    }
    applyInputProps() {
        const props = this.inputProps;
        Object.entries(props).forEach(([key, value]) => {
            this.inputRef.nativeElement.setAttribute(key, value);
        });
    }
    // ============ ControlValueAccessor Implementation ============
    writeValue(value) {
        if (this.iti && value) {
            this.iti.setNumber(value);
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    // ============ Validator Implementation ============
    validate(control) {
        if (!control.value || !this.iti) {
            return null;
        }
        const isValid = this.usePreciseValidation
            ? this.iti.isValidNumberPrecise()
            : this.iti.isValidNumber();
        if (isValid) {
            return null;
        }
        const errorCode = this.iti.getValidationError();
        return {
            invalidPhone: {
                errorCode,
                errorMessage: PHONE_ERROR_MESSAGES[errorCode],
            },
        };
    }
    registerOnValidatorChange(fn) {
        this.onValidatorChange = fn;
    }
}
IntlTelInputComponent.ɵfac = function IntlTelInputComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || IntlTelInputComponent)(); };
IntlTelInputComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: IntlTelInputComponent, selectors: [["intl-tel-input"]], viewQuery: function IntlTelInputComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 7);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.inputRef = _t.first);
    } }, inputs: { initialValue: "initialValue", usePreciseValidation: "usePreciseValidation", inputProps: "inputProps", disabled: "disabled", initOptions: "initOptions" }, outputs: { numberChange: "numberChange", countryChange: "countryChange", validityChange: "validityChange", errorCodeChange: "errorCodeChange" }, features: [i0.ɵɵProvidersFeature([
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => IntlTelInputComponent),
                multi: true,
            },
            {
                provide: NG_VALIDATORS,
                useExisting: forwardRef(() => IntlTelInputComponent),
                multi: true,
            },
        ])], decls: 2, vars: 1, consts: [["inputRef", ""], ["type", "tel", 3, "input", "blur", "disabled"]], template: function IntlTelInputComponent_Template(rf, ctx) { if (rf & 1) {
        const _r1 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "input", 1, 0);
        i0.ɵɵlistener("input", function IntlTelInputComponent_Template_input_input_0_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.handleInput()); })("blur", function IntlTelInputComponent_Template_input_blur_0_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.handleBlur()); });
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("disabled", ctx.disabled);
    } }, encapsulation: 2 });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(IntlTelInputComponent, [{
        type: Component,
        args: [{
                selector: "intl-tel-input",
                standalone: true,
                template: `
    <input
      type="tel"
      #inputRef
      (input)="handleInput()"
      (blur)="handleBlur()"
      [disabled]="disabled"
    />
  `,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => IntlTelInputComponent),
                        multi: true,
                    },
                    {
                        provide: NG_VALIDATORS,
                        useExisting: forwardRef(() => IntlTelInputComponent),
                        multi: true,
                    },
                ],
            }]
    }], null, { inputRef: [{
            type: ViewChild,
            args: ["inputRef", { static: true }]
        }], initialValue: [{
            type: Input
        }], usePreciseValidation: [{
            type: Input
        }], inputProps: [{
            type: Input
        }], disabled: [{
            type: Input
        }], initOptions: [{
            type: Input
        }], numberChange: [{
            type: Output
        }], countryChange: [{
            type: Output
        }], validityChange: [{
            type: Output
        }], errorCodeChange: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(IntlTelInputComponent, { className: "IntlTelInputComponent", filePath: "intl-tel-input/angular.ts", lineNumber: 42 }); })();
