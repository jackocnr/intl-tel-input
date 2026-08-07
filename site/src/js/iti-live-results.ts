(() => {
  const getErrorMessage = (errorCode: string | null): string => {
    const { VALIDATION_ERROR } = window.intlTelInput;
    switch (errorCode) {
      case VALIDATION_ERROR.INVALID_COUNTRY_CODE: return "Invalid dial code";
      case VALIDATION_ERROR.TOO_SHORT: return "Too short";
      case VALIDATION_ERROR.TOO_LONG: return "Too long";
      default: return "";
    }
  };
  const getItiInstance = (): any => window.intlTelInput?.instances?.values().next().value;

  const init = () => {
    const liveResults = document.querySelector<HTMLElement>(".iti-live-results");
    if (!liveResults || !window.intlTelInput || !getItiInstance()) {
      return;
    }

    // Fix live results box width and height to prevent layout shift. Height is
    // pinned as min-height so the box can grow when there's a second line
    // (e.g. when an extension is shown alongside the valid number).
    const liveResultsStyle = getComputedStyle(liveResults);
    if (liveResultsStyle.width) {
      liveResults.style.width = liveResultsStyle.width;
    }
    if (liveResultsStyle.height) {
      liveResults.style.minHeight = liveResultsStyle.height;
    }

    const setupLiveResults = () => {
      const itiInput = document.querySelector<HTMLInputElement>(".iti__tel-input");
      if (!itiInput) {
        return;
      }

      const emptyMessage = liveResults.textContent || "";

      const renderNoUtilsMessage = () => {
        liveResults.textContent = "Enable ";
        const link = document.createElement("a");
        link.href = "#miscellaneous-options";
        link.textContent = "loadUtils";
        liveResults.appendChild(link);
        liveResults.appendChild(document.createTextNode(" to see validation here"));
      };

      // Absent utils mean one of two very different things: loadUtils is off, or it is on and
      // the request is still in flight. The core library only starts that request on window
      // load, so treat "not loaded yet" as pending right up until it has had its chance.
      const utilsPending = (): boolean =>
        !window.intlTelInput.utils &&
        (window.intlTelInput.startedLoadingUtils ||
          !window.intlTelInput.documentReady());

      const updateResults = () => {
        if (!window.intlTelInput.utils) {
          // Only nag about loadUtils when it is genuinely disabled — while utils are still
          // loading, leave whatever the box is showing until they arrive.
          if (!utilsPending()) {
            renderNoUtilsMessage();
          }
          return;
        }
        const hasValue = itiInput.value.trim().length > 0;
        if (!hasValue) {
          liveResults.textContent = emptyMessage;
          return;
        }

        const iti = getItiInstance();
        if (iti.isValidNumber()) {
          const number = iti.getNumber();
          // E.164 strips extensions, so surface getExtension() separately when present.
          const extension = iti.getExtension();
          liveResults.textContent = `Valid number: ${number}`;
          if (extension) {
            liveResults.appendChild(document.createElement("br"));
            liveResults.appendChild(
              document.createTextNode(`Extension: ${extension}`),
            );
          }
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
      // The init promise rejects when initialCountryLookup fails (e.g. the geo-IP request is
      // blocked or offline), but that says nothing about whether we can report on the number,
      // so wire up the live results either way.
      iti.promise.then(setupLiveResults, setupLiveResults);
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
