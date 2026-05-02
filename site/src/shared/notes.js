// Single source of truth for the "Notes" callouts shown below the JavaScript
// code block on Example pages and below the Initialisation Code card on the
// Playground. Each note explains something that the displayed code deliberately
// omits for clarity, with a pointer to the full explanation in the docs.

export const NOTE_BODIES = {
  geoIpLookup:
    '<code>geoIpLookup</code> here uses ipapi\'s free tier. For production, swap for a paid plan or alternative - see <a href="/docs/options#geoiplookup">docs</a>.',
  deriveErrorMessage:
    '<code>getErrorMessage</code> is up to you - see <a href="/docs/best-practices#deriving-a-user-facing-error-message">a worked example</a>.',
};

export const renderNoteAlert = (
  key,
  { dataKey = null, hidden = false } = {},
) => {
  const body = NOTE_BODIES[key];
  if (!body) {
    throw new Error(`Unknown note key: ${key}`);
  }
  const attrs = [
    'class="alert alert-warning d-flex gap-2 align-items-start"',
    'role="note"',
    dataKey ? `data-note-for="${dataKey}"` : "",
    hidden ? "hidden" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return `<div ${attrs}>
  <i class="bi bi-lightbulb-fill flex-shrink-0 mt-1" aria-hidden="true"></i>
  <div>${body}</div>
</div>`;
};

export const renderNotesHtml = (keys) =>
  keys.map((key) => renderNoteAlert(key)).join("\n");

export const renderPlaygroundNotesHtml = (keys) =>
  keys
    .map((key) => renderNoteAlert(key, { dataKey: key, hidden: true }))
    .join("\n");

// Scan a display-code string for the identifiers that each note explains,
// and return the ordered list of note keys that apply. Used by example pages
// so notes stay in sync with the code automatically.
export const deriveNotesFromCode = (code) => {
  const notes = [];
  if (/\bgeoIpLookup\b/.test(code)) {
    notes.push("geoIpLookup");
  }
  if (/\bgetErrorMessage\b/.test(code)) {
    notes.push("deriveErrorMessage");
  }
  return notes;
};
