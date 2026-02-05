(() => {
  const errorMap = ["", "Bad country code", "Too short", "Too long"];
  const getItiInstance = () => Object.values(window.intlTelInput?.instances ?? {})[0];

  const init = () => {
    const liveResults = document.querySelector(".iti-live-results");
    if (!liveResults || !window.intlTelInput || !getItiInstance()) return;

    // Fix live results box width and height to prevent layout shift
    const liveResultsStyle = getComputedStyle(liveResults);
    if (liveResultsStyle.width) liveResults.style.width = liveResultsStyle.width;
    if (liveResultsStyle.height) liveResults.style.height = liveResultsStyle.height;

    const setupLiveResults = () => {
      const itiInput = document.querySelector(".iti__tel-input");
      if (!itiInput) return;

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
        const errorMessage = errorMap[errorCode] || "";
        const errorSuffix = errorMessage ? ` (${errorMessage})` : "";
        liveResults.textContent = `Invalid number${errorSuffix}`;
      };

      itiInput.addEventListener("input", updateResults);
      itiInput.addEventListener("countrychange", updateResults);
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
