//* Create a DOM element.
export const createEl = (tagName: string, attrs?: object | null, container?: HTMLElement): HTMLElement => {
  const el = document.createElement(tagName);
  if (attrs) {
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
  }
  if (container) {
    container.appendChild(el);
  }
  return el;
};