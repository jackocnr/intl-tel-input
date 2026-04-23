window.hljs.addPlugin({
  "after:highlightElement": ({ el, text }: { el: HTMLElement; text: string }) => {
    const pre = el.parentElement;
    if (!pre || pre.tagName !== "PRE" || pre.querySelector(".hljs-copy-btn")) {
      return;
    }
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "hljs-copy-btn";
    btn.setAttribute("aria-label", "Copy code to clipboard");
    btn.setAttribute("data-bs-toggle", "tooltip");
    btn.setAttribute("data-bs-title", "Copy to clipboard");
    const icon = document.createElement("i");
    icon.className = "bi bi-clipboard";
    icon.setAttribute("aria-hidden", "true");
    btn.appendChild(icon);

    const tooltip = window.bootstrap?.Tooltip ? new window.bootstrap.Tooltip(btn) : null;
    const setTooltip = (title: string) => {
      if (tooltip) {
        tooltip.setContent({ ".tooltip-inner": title });
      } else {
        btn.setAttribute("data-bs-title", title);
      }
    };

    const resetToIdle = () => {
      icon.className = "bi bi-clipboard";
      setTooltip("Copy to clipboard");
    };
    // When the button fades out (opacity 1 → 0), defer the icon/tooltip
    // reset until the fade completes so the user never sees the tick flip
    // back to the clipboard icon mid-fade.
    btn.addEventListener("transitionend", (e) => {
      if (e.propertyName === "opacity" && getComputedStyle(btn).opacity === "0") {
        resetToIdle();
      }
    });

    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(text);
        icon.className = "bi bi-check-lg";
        btn.classList.add("hljs-copy-btn--copied");
        setTooltip("Copied!");
      } catch {
        icon.className = "bi bi-x-lg";
        setTooltip("Copy failed");
      }
      // Clicking focuses the button, and the tooltip's default trigger
      // ("hover focus") would then keep it open even after the cursor leaves.
      // Drop focus so only hover governs visibility from here on.
      btn.blur();
      setTimeout(() => {
        btn.classList.remove("hljs-copy-btn--copied");
        if (btn.matches(":hover")) {
          resetToIdle();
        } else {
          // Not hovering: releasing --copied starts the fade. Leave the
          // tick in place — transitionend will reset it on opacity 0.
          tooltip?.hide();
        }
      }, 3000);
    });
    pre.appendChild(btn);
  },
});
