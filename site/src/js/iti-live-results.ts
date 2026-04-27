(() => {
  const getErrorMessage = (errorCode: string | null): string => {
    const { VALIDATION_ERROR } = window.intlTelInput;
    const errorMap: Record<string, string> = {
      [VALIDATION_ERROR.INVALID_COUNTRY_CODE]: "Invalid dial code",
      [VALIDATION_ERROR.TOO_SHORT]: "Too short",
      [VALIDATION_ERROR.TOO_LONG]: "Too long",
    };
    return errorCode ? errorMap[errorCode] || "" : "";
  };
  const getItiInstance = (): any => window.intlTelInput?.instances?.values().next().value;

  const init = () => {
    const liveResults = document.querySelector<HTMLElement>(".iti-live-results");
    if (!liveResults || !window.intlTelInput || !getItiInstance()) {
      return;
    }

    // Fix live results box width and height to prevent layout shift
    const liveResultsStyle = getComputedStyle(liveResults);
    if (liveResultsStyle.width) {
      liveResults.style.width = liveResultsStyle.width;
    }
    if (liveResultsStyle.height) {
      liveResults.style.height = liveResultsStyle.height;
    }

    const setupLiveResults = () => {
      const itiInput = document.querySelector<HTMLInputElement>(".iti__tel-input");
      if (!itiInput) {
        return;
      }

      const emptyMessage = liveResults.textContent || "";

      const updateResults = () => {
        const hasValue = itiInput.value.trim().length > 0;
        if (!hasValue) {
          liveResults.textContent = emptyMessage;
          return;
        }

        const iti = getItiInstance();
        if (iti.isValidNumber()) {
          const number = iti.getNumber();
          liveResults.textContent = `Valid number: ${number}`;
          return;
        }

        const errorCode = iti.getValidationError();
        const errorMessage = getErrorMessage(errorCode);
        const errorSuffix = errorMessage ? ` (${errorMessage})` : "";
        liveResults.textContent = `Invalid number${errorSuffix}`;
      };

      // No matching removeEventListener: this runs once per page load and the tel input
      // element persists across core library destroy/re-init, so the listeners live for the
      // lifetime of the page and the browser reclaims them on unload.
      itiInput.addEventListener("input", updateResults);
      // Custom event dispatched by the playground controller after it re-inits the
      // core library, to force the live results to re-render against the new instance.
      itiInput.addEventListener("iti-live-results:refresh", updateResults);
      updateResults();
    };

    const iti = getItiInstance();
    if (iti.promise && typeof iti.promise.then === "function") {
      iti.promise.then(setupLiveResults);
    } else {
      setupLiveResults();
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
