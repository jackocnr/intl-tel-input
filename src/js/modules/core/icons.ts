import { ARIA } from "../constants";

/** Magnifying glass search icon */
export const buildSearchIcon = (): string => `
  <svg class="iti__search-icon-svg" width="14" height="14" viewBox="0 0 24 24" focusable="false" ${ARIA.HIDDEN}="true">
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>`;

/**
 * Clear (circle with X) icon
 * @param id Instance id used to create a unique mask id.
 */
export const buildClearIcon = (id: number): string => {
  const maskId = `iti-${id}-clear-mask`;
  return `
    <svg class="iti__search-clear-svg" width="12" height="12" viewBox="0 0 16 16" ${ARIA.HIDDEN}="true" focusable="false">
      <mask id="${maskId}" maskUnits="userSpaceOnUse">
        <rect width="16" height="16" fill="white" />
        <path d="M5.2 5.2 L10.8 10.8 M10.8 5.2 L5.2 10.8" stroke="black" stroke-linecap="round" class="iti__search-clear-x" />
      </mask>
      <circle cx="8" cy="8" r="8" class="iti__search-clear-bg" mask="url(#${maskId})" />
    </svg>`;
};
