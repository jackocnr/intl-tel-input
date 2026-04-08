function copyTextToClipboard(text: string) {
  const value = String(text || "");
  if (!value) {
    return Promise.resolve(false);
  }
  if (!navigator.clipboard || !window.isSecureContext) {
    return Promise.resolve(false);
  }
  return navigator.clipboard.writeText(value).then(
    () => true,
    () => false,
  );
}

export function bindCopyCodeButton(buttonEl: HTMLElement | null, codeEl: HTMLElement | null) {
  if (!buttonEl || !codeEl) {
    return;
  }

  let copiedResetTimer: number | null = null;
  const labelEl = buttonEl.querySelector<HTMLElement>("[data-role=\"label\"]") || buttonEl;

  buttonEl.addEventListener("click", () => {
    const originalLabel = labelEl.textContent;
    copyTextToClipboard(codeEl.textContent).then((ok) => {
      if (!ok) {
        return;
      }
      labelEl.textContent = "Copied code!";
      if (copiedResetTimer) {
        window.clearTimeout(copiedResetTimer);
      }
      copiedResetTimer = window.setTimeout(() => {
        labelEl.textContent = originalLabel;
        copiedResetTimer = null;
      }, 2000);
    });
  });
}
