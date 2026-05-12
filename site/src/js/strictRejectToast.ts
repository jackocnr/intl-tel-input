export const setupStrictRejectToast = (
  input: HTMLInputElement,
  toastId = "strictRejectToast",
  toastBodyId = "strictRejectToastBody",
  link: { href: string; text: string } = { href: "/docs/options#strictmode", text: "strictMode" },
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
    const linkEl = document.createElement("a");
    linkEl.href = link.href;
    linkEl.className = "link-light";
    linkEl.textContent = link.text;
    toastBody.replaceChildren(`${message} (see `, linkEl, ")");
    toast.show();
  });
};
