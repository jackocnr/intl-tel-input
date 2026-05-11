export const setupStrictRejectToast = (
  input: HTMLInputElement,
  toastId = "strictRejectToast",
  toastBodyId = "strictRejectToastBody",
): void => {
  const toastEl = document.getElementById(toastId);
  const toastBody = document.getElementById(toastBodyId);
  if (!toastEl || !toastBody) {
    return;
  }
  const toast = window.bootstrap.Toast.getOrCreateInstance(toastEl);
  input.addEventListener("strict:reject", (e) => {
    const { reason, rejectedInput, source } = (e as CustomEvent).detail;
    let message: string;
    if (reason === "max-length") {
      message = "Maximum length reached for this country";
    } else if (source === "paste") {
      message = "Stripped invalid characters from pasted text";
    } else {
      message = `Character not allowed: "${rejectedInput}"`;
    }
    const link = document.createElement("a");
    link.href = "/docs/options#strictmode";
    link.className = "link-light";
    link.textContent = "strictMode";
    toastBody.replaceChildren(`${message} (see `, link, ")");
    toast.show();
  });
};
