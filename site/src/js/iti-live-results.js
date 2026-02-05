(() => {
  const errorMap = ["", "Bad country code", "Too short", "Too long"];

  const init = () => {
    const liveResults = document.querySelector(".iti-live-results");
    if (!liveResults || !window.iti) return;

    // Fix live results box width and height to prevent layout shift
    const liveResultsStyle = getComputedStyle(liveResults);
    if (liveResultsStyle.width) liveResults.style.width = liveResultsStyle.width;
    if (liveResultsStyle.height) liveResults.style.height = liveResultsStyle.height;

    const setupLiveResults = () => {
      const iti = window.iti;
      const itiInput = document.querySelector(".iti__tel-input");
      if (!itiInput) return;

      const emptyMessage = liveResults.textContent || "";

      const updateResults = () => {
        const hasValue = itiInput.value.trim().length > 0;
        if (!hasValue) {
          liveResults.textContent = emptyMessage;
          return;
        }

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

    if (window.iti.promise && typeof window.iti.promise.then === "function") {
      window.iti.promise.then(setupLiveResults);
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
