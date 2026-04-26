/**
 * Build a space-delimited class string from an object map of className -> truthy/falsey.
 * Only keys with truthy values are included.
 */
export const buildClassNames = (flags: Record<string, unknown>): string =>
  Object.keys(flags)
    .filter((k) => Boolean(flags[k]))
    .join(" ");

//* Create a DOM element.
export const createEl = (
  tagName: string,
  attrs?: object | null,
  container?: HTMLElement,
): HTMLElement => {
  const el = document.createElement(tagName);
  if (attrs) {
    Object.entries(attrs).forEach(([key, value]) =>
      el.setAttribute(key, value),
    );
  }
  if (container) {
    container.appendChild(el);
  }
  return el;
};
