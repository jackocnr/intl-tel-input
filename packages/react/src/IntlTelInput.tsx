import intlTelInput, { Iti } from "intl-tel-input";
import type { SomeOptions, ValidationError } from "intl-tel-input";
import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";

// make this available as a named export, so react users can access globals like intlTelInput.utils
export { intlTelInput };

const warnInputProp = (prop: string): void => {
  console.warn(`intl-tel-input: ignoring inputProps.${prop} - see docs for more info.`);
};

type InputProps = Omit<React.ComponentPropsWithoutRef<"input">, "onInput">;

const noop = () => {};

export type StrictRejectSource = "key" | "paste";
export type StrictRejectReason = "invalid" | "max-length";
type StrictRejectDetail = {
  source: StrictRejectSource;
  rejectedInput: string;
  reason: StrictRejectReason;
};

type ItiProps = SomeOptions & {
  onChangeNumber?: (number: string) => void;
  onChangeCountry?: (iso2: string) => void;
  onChangeValidity?: (isValid: boolean) => void;
  onChangeErrorCode?: (errorCode: ValidationError | null) => void;
  onOpenCountryDropdown?: () => void;
  onCloseCountryDropdown?: () => void;
  onStrictReject?: (source: StrictRejectSource, rejectedInput: string, reason: StrictRejectReason) => void;
  usePreciseValidation?: boolean;
  inputProps?: InputProps;
  disabled?: boolean | undefined;
  readOnly?: boolean | undefined;
  value?: string | null;
};

export type IntlTelInputRef = {
  getInstance: () => Iti | null;
  getInput: () => HTMLInputElement | null;
};

// Note: React v19 supports ref forwarding with function components, but we still need to use forwardRef to support React v18
const IntlTelInput = forwardRef(function IntlTelInput(
  {
    onChangeNumber = noop,
    onChangeCountry = noop,
    onChangeValidity = noop,
    onChangeErrorCode = noop,
    onOpenCountryDropdown,
    onCloseCountryDropdown,
    onStrictReject,
    usePreciseValidation = false,
    inputProps = {},
    disabled = undefined,
    readOnly = undefined,
    value = undefined,
    ...initOptions
  }: ItiProps,
  ref: React.ForwardedRef<IntlTelInputRef>,
) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const itiRef = useRef<Iti | null>(null);
  // Classes the library adds directly to the input (e.g. iti__tel-input)
  const libraryInputClassesRef = useRef<string>("");
  const lastEmittedNumberRef = useRef<string | undefined>(undefined);
  const lastEmittedCountryRef = useRef<string | undefined>(undefined);
  const lastEmittedValidityRef = useRef<boolean | undefined>(undefined);
  const lastEmittedErrorCodeRef = useRef<ValidationError | null | undefined>(undefined);
  // if an input event fires before utils has loaded, we defer the update until the promise resolves
  const pendingUpdateRef = useRef<boolean>(false);

  // keep latest pass-through event handlers in refs so listeners registered once always see fresh callbacks
  const onOpenCountryDropdownRef = useRef(onOpenCountryDropdown);
  const onCloseCountryDropdownRef = useRef(onCloseCountryDropdown);
  const onStrictRejectRef = useRef(onStrictReject);
  onOpenCountryDropdownRef.current = onOpenCountryDropdown;
  onCloseCountryDropdownRef.current = onCloseCountryDropdown;
  onStrictRejectRef.current = onStrictReject;

  // expose the instance and input ref to the parent component
  useImperativeHandle(ref, () => ({
    getInstance: () => itiRef.current,
    getInput: () => inputRef.current,
  }));

  const seedInitialState = useCallback((): void => {
    if (!itiRef.current?.isActive()) {
      return;
    }
    lastEmittedNumberRef.current = itiRef.current.getNumber() ?? "";
    lastEmittedCountryRef.current = itiRef.current.getSelectedCountryData()?.iso2 ?? "";
    const isValid = (usePreciseValidation
      ? itiRef.current.isValidNumberPrecise()
      : itiRef.current.isValidNumber()) ?? false;
    lastEmittedValidityRef.current = isValid;
    lastEmittedErrorCodeRef.current = isValid ? null : itiRef.current.getValidationError();
  }, [usePreciseValidation]);

  const update = useCallback((): void => {
    // if the instance is not valid (e.g. has been destroyed/unmounted), do not attempt to call any methods on it
    if (!itiRef.current?.isActive()) {
      return;
    }
    // if utils has not loaded yet, getNumber/isValidNumber/etc. will throw. defer until the promise resolves.
    if (!intlTelInput.utils) {
      pendingUpdateRef.current = true;
      return;
    }
    const num = itiRef.current.getNumber() ?? "";
    const countryIso = itiRef.current.getSelectedCountryData()?.iso2 ?? "";
    // note: this number will be in standard E164 format, but any container component can use
    // intlTelInput.utils.formatNumber() to convert this to another format
    // as well as intlTelInput.utils.getNumberType() etc. if need be
    if (num !== lastEmittedNumberRef.current) {
      lastEmittedNumberRef.current = num;
      onChangeNumber(num);
    }
    if (countryIso !== lastEmittedCountryRef.current) {
      lastEmittedCountryRef.current = countryIso;
      onChangeCountry(countryIso);
    }

    const isValid = (usePreciseValidation
      ? itiRef.current.isValidNumberPrecise()
      : itiRef.current.isValidNumber()) ?? false;
    const errorCode = isValid ? null : itiRef.current.getValidationError();

    if (isValid !== lastEmittedValidityRef.current) {
      lastEmittedValidityRef.current = isValid;
      onChangeValidity(isValid);
    }
    if (errorCode !== lastEmittedErrorCodeRef.current) {
      lastEmittedErrorCodeRef.current = errorCode;
      onChangeErrorCode(errorCode);
    }
  }, [
    onChangeCountry,
    onChangeErrorCode,
    onChangeNumber,
    onChangeValidity,
    usePreciseValidation,
  ]);

  useEffect(() => {
    const inputEl = inputRef.current;
    if (!inputEl) {
      return undefined;
    }
    itiRef.current = intlTelInput(inputEl, initOptions as SomeOptions);
    libraryInputClassesRef.current = inputEl.className;

    const handleOpen = (): void => onOpenCountryDropdownRef.current?.();
    const handleClose = (): void => onCloseCountryDropdownRef.current?.();
    const handleStrictReject = (e: Event): void => {
      const { source, rejectedInput, reason } = (e as CustomEvent<StrictRejectDetail>).detail;
      onStrictRejectRef.current?.(source, rejectedInput, reason);
    };
    inputEl.addEventListener("open:countrydropdown", handleOpen);
    inputEl.addEventListener("close:countrydropdown", handleClose);
    inputEl.addEventListener("strict:reject", handleStrictReject);

    return (): void => {
      inputEl.removeEventListener("open:countrydropdown", handleOpen);
      inputEl.removeEventListener("close:countrydropdown", handleClose);
      inputEl.removeEventListener("strict:reject", handleStrictReject);
      itiRef.current?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    itiRef.current?.promise.then(() => {
      if (!itiRef.current?.isActive()) {
        return;
      }
      // if an input event fired during the utils-loading gap, replay it now so the skipped emissions fire.
      // otherwise seed the refs with current state so we don't fire change callbacks on initial mount.
      if (pendingUpdateRef.current) {
        pendingUpdateRef.current = false;
        update();
      } else {
        seedInitialState();
      }
    });
  }, [seedInitialState, update]);

  useEffect(() => {
    if (itiRef.current && disabled !== undefined) {
      itiRef.current.setDisabled(disabled);
    }
  }, [disabled]);

  useEffect(() => {
    if (itiRef.current && readOnly !== undefined) {
      itiRef.current.setReadonly(readOnly);
    }
  }, [readOnly]);

  useEffect(() => {
    // if value is undefined, the component is uncontrolled - do not touch the input
    if (!itiRef.current || value === undefined) {
      return;
    }
    // wait for utils to load before trying to access iti methods that use it, e.g. getNumber, setNumber, etc.
    itiRef.current.promise.then(() => {
      if (!itiRef.current?.isActive()) {
        return;
      }
      const next = value ?? "";
      const currentCanonical = itiRef.current.getNumber() ?? "";
      const isFocused = document.activeElement === inputRef.current;
      if (isFocused || currentCanonical === next) {
        return;
      }
      itiRef.current.setNumber(next);
      update();
    });
  }, [value, update]);

  // ignore keys that would break functionality
  const ignoredInputProps = new Set(["type", "ref", "value", "disabled", "readOnly", "onInput"]);

  const sanitizedInputProps: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(inputProps)) {
    if (ignoredInputProps.has(key)) {
      warnInputProp(key);
    } else if (key === "className") {
      // Preserve any user-added or library-added classes on the input
      sanitizedInputProps[key] = `${libraryInputClassesRef.current} ${val}`;
    } else {
      sanitizedInputProps[key] = val;
    }
  }

  // The iti library reparents the input into its own `.iti` wrapper at init time.
  // If the <input> is the component's direct output, React's fiber tree (which still
  // thinks the input is a direct child of its host container) and the real DOM diverge,
  // and React 19's commit phase throws NotFoundError when it tries to call
  // parent.removeChild(input) on the wrong parent. Wrapping the input in a stable
  // React-owned element means React only ever needs to mutate *that* element as a
  // child of its container - iti's reparenting happens entirely inside it.
  // `display: contents` keeps the wrapper out of the layout tree so iti's own
  // styling (inline-block on `.iti`) is preserved.
  return (
    <span style={{ display: "contents" }}>
      <input
        {...(sanitizedInputProps as InputProps)}
        type="tel"
        ref={inputRef}
        onInput={update}
      />
    </span>
  );
});

export default IntlTelInput;
