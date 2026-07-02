// Site-wide chrome interactivity loaded from common_body_end.html.
// - Header nav fly-out submenus
// - Floating feedback button
// - Right-sidebar TOC scroll-spy

// Header nav fly-out submenus: hover-driven via CSS on hover devices; this
// handler provides the touch/click fallback (Bootstrap doesn't nest dropdowns)
// and resets state when the parent dropdown closes.
const closeFlyout = (toggle: Element) => {
  toggle.setAttribute("aria-expanded", "false");
  toggle.nextElementSibling?.classList.remove("show");
};
document.addEventListener("click", (e) => {
  const target = e.target as Element | null;
  const toggle = target?.closest(".iti-flyout-toggle") ?? null;
  document.querySelectorAll('.iti-flyout-toggle[aria-expanded="true"]').forEach((t) => {
    if (t !== toggle) {
      closeFlyout(t);
    }
  });
  if (toggle) {
    e.preventDefault();
    e.stopPropagation();
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    toggle.nextElementSibling?.classList.toggle("show", !expanded);
  }
});
document.querySelectorAll(".iti-header-nav .dropdown").forEach((dropdown) => {
  dropdown.addEventListener("hidden.bs.dropdown", () => {
    dropdown.querySelectorAll('.iti-flyout-toggle[aria-expanded="true"]').forEach(closeFlyout);
  });
});

// Floating feedback button: pre-fill the current URL into the GitHub issue
// form, wire up the dismiss control (hidden for the rest of the session).
// Deferred to DOMContentLoaded because on example pages this script is
// rendered inside <main>, before the button markup at the end of the layout.
function initFeedbackBtn() {
  const STORAGE_KEY = "iti-feedback-dismissed";
  const btn = document.getElementById("iti-feedback-btn");
  if (!btn) {
    return;
  }
  try {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") {
      return;
    }
  } catch {
    // sessionStorage may be unavailable (private mode, sandboxed iframe) — fall through.
  }
  const link = btn.querySelector<HTMLAnchorElement>(".iti-feedback-btn__link");
  if (!link) {
    return;
  }
  try {
    const url = new URL(link.href);
    url.searchParams.set("url", window.location.href);
    const dpr = window.devicePixelRatio || 1;
    const browserInfo = [
      "User agent: " + navigator.userAgent,
      "Viewport: " + window.innerWidth + "×" + window.innerHeight + (dpr !== 1 ? " @" + dpr + "x" : ""),
    ].join("\n");
    url.searchParams.set("browser", browserInfo);
    link.href = url.toString();
  } catch {
    // Malformed link.href — leave the URL unchanged.
  }
  btn.querySelector(".iti-feedback-btn__close")?.addEventListener("click", () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore — see above
    }
    btn.remove();
  });
  btn.hidden = false;
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initFeedbackBtn);
} else {
  initFeedbackBtn();
}

// Right-sidebar "On this page" TOC: highlight the link for the section
// currently nearest the top of the viewport.
function initTocScrollSpy() {
  const toc = document.querySelector<HTMLElement>(".iti-toc");
  if (!toc) {
    return;
  }
  const links = Array.from(toc.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
  type Section = { link: HTMLAnchorElement; el: HTMLElement };
  const sections: Section[] = [];
  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) {
      return;
    }
    const id = decodeURIComponent(href.slice(1));
    const el = id ? document.getElementById(id) : null;
    if (el) {
      sections.push({ link, el });
    }
  });
  if (!sections.length) {
    return;
  }

  // Offset to clear the sticky header before treating a section as "current".
  const HEADER_OFFSET = 100;

  // Lock each link's wrap structure: measure where its label wraps in the
  // normal (non-bold) state, insert <br>s at those points, then nowrap so
  // it can never re-wrap. When a link becomes .active (bold), bold lines
  // that no longer fit overflow horizontally past the sidebar's right edge
  // instead of pushing a word onto a new line — so the link's height (and
  // therefore the whole TOC's layout) is fixed.
  const freezeWrapping = () => {
    toc.classList.remove("iti-toc--frozen");
    // Strip .active for measurement: bold text wraps differently. Restore after.
    const wasActive = links.find((l) => l.classList.contains("active"));
    if (wasActive) {
      wasActive.classList.remove("active");
    }
    links.forEach((link) => {
      const original = link.dataset.itiOriginalText || link.textContent || "";
      link.dataset.itiOriginalText = original;
      const tokens = original.split(/(\s+)/).filter(Boolean);
      link.innerHTML = "";
      const wordSpans: { span: HTMLSpanElement; token: string }[] = [];
      tokens.forEach((tok) => {
        if (/^\s+$/.test(tok)) {
          link.appendChild(document.createTextNode(tok));
        } else {
          const span = document.createElement("span");
          span.textContent = tok;
          link.appendChild(span);
          wordSpans.push({ span, token: tok });
        }
      });
      // Single-token labels can't be wrapped, so a long one would spill far
      // past the sidebar — apply ellipsis truncation via CSS instead.
      link.classList.toggle("iti-toc-link--ellipsis", wordSpans.length === 1);
      // Sidebar hidden (mobile) or label has no words — measurement is
      // meaningless. Restore plain text; we'll re-run on resize.
      if (!wordSpans.length || wordSpans[0].span.offsetParent === null) {
        link.textContent = original;
        return;
      }
      const lines: string[] = [];
      let currentLine: string[] = [];
      let currentTop: number | null = null;
      wordSpans.forEach(({ span, token }) => {
        const top = span.offsetTop;
        if (currentTop === null || top === currentTop) {
          currentLine.push(token);
        } else {
          lines.push(currentLine.join(" "));
          currentLine = [token];
        }
        currentTop = top;
      });
      if (currentLine.length) {
        lines.push(currentLine.join(" "));
      }
      link.innerHTML = "";
      lines.forEach((line, i) => {
        if (i > 0) {
          link.appendChild(document.createElement("br"));
        }
        link.appendChild(document.createTextNode(line));
      });
    });
    if (wasActive) {
      wasActive.classList.add("active");
    }
    toc.classList.add("iti-toc--frozen");
  };

  const setActive = (i: number) => {
    sections.forEach((s, idx) => s.link.classList.toggle("active", idx === i));
  };

  const update = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const threshold = scrollY + HEADER_OFFSET;
    let activeIdx = 0;
    for (let i = 0; i < sections.length; i++) {
      const top = sections[i].el.getBoundingClientRect().top + scrollY;
      if (top <= threshold) {
        activeIdx = i;
      } else {
        break;
      }
    }
    // At very bottom: force last item active so we don't get stuck on the
    // last section whose top scrolled past, even if shorter than the viewport.
    const atBottom =
      scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 2;
    if (atBottom) {
      activeIdx = sections.length - 1;
    }
    setActive(activeIdx);
  };

  let rafId: number | null = null;
  const schedule = () => {
    if (rafId !== null) {
      return;
    }
    rafId = requestAnimationFrame(() => {
      rafId = null;
      update();
    });
  };

  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });

  freezeWrapping();
  update();
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTocScrollSpy);
} else {
  initTocScrollSpy();
}

// Re-apply hash scrolling shortly after load.
//
// When a page is opened with a #section in the URL, the browser scrolls to the
// target on a best-effort basis. But content-blocking extensions (e.g. AdBlock)
// perform a scroll operation during their pass around load, which the browser
// treats as "the user has taken over" and cancels the pending fragment scroll —
// leaving the page stuck near the top. Since that interference happens early,
// re-applying the scroll a moment after load lands us on the section.
function initHashScroll() {
  const rawHash = window.location.hash;
  if (!rawHash || rawHash === "#") {
    return;
  }
  let id: string;
  try {
    id = decodeURIComponent(rawHash.slice(1));
  } catch {
    id = rawHash.slice(1);
  }
  const target = document.getElementById(id);
  if (!target) {
    return;
  }
  // scrollIntoView honours html { scroll-padding-top }, so we land in the same
  // spot as clicking a TOC link. The small delay lets the extension finish its
  // pass first; if the browser already scrolled correctly, this is a no-op.
  window.setTimeout(() => target.scrollIntoView(), 0);
}
if (document.readyState === "complete") {
  initHashScroll();
} else {
  window.addEventListener("load", initHashScroll, { once: true });
}
