function copyTextToClipboard(text) {
  const value = String(text || "");
  if (!value) return Promise.resolve(false);
  if (!navigator.clipboard || !window.isSecureContext) return Promise.resolve(false);
  return navigator.clipboard.writeText(value).then(
    () => true,
    () => false,
  );
}

export function bindCopyCodeButton(buttonEl, codeEl) {
  if (!buttonEl || !codeEl) return;

  let copiedResetTimer = null;

  buttonEl.addEventListener("click", () => {
    const originalLabel = buttonEl.textContent;
    copyTextToClipboard(codeEl.textContent).then((ok) => {
      if (!ok) return;
      buttonEl.textContent = "Copied!";
      if (copiedResetTimer) window.clearTimeout(copiedResetTimer);
      copiedResetTimer = window.setTimeout(() => {
        buttonEl.textContent = originalLabel;
        copiedResetTimer = null;
      }, 2000);
    });
  });
}
