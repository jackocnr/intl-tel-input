export function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

export function parseBooleanParam(value, fallback) {
  if (value === null || value === undefined) return fallback;
  const v = String(value).trim().toLowerCase();
  if (["1", "true", "yes", "y", "on"].includes(v)) return true;
  if (["0", "false", "no", "n", "off"].includes(v)) return false;
  return fallback;
}

// The playground textareas are user-facing and often contain JS-style literals
// (e.g. ['us', 'gb']) rather than strict JSON (e.g. ["us", "gb"]).
// Avoid eval; instead, do a minimal, safe normalization and retry JSON.parse.
const cleanTextForJson = (text) => {
  const withoutTrailingCommas = text.replace(/,\s*([\]}])/g, "$1");
  const normalizedQuotes = withoutTrailingCommas.replace(/'((?:\\.|[^'\\])*)'/g, (_m, inner) => {
    // Basic support for common escapes used in these inputs.
    const unescaped = String(inner)
      .replace(/\\'/g, "'")
      .replace(/\\\\/g, "\\");
    return JSON.stringify(unescaped);
  });
  return normalizedQuotes;
};

export function parseJsonParam(value, fallback) {
  if (value === null || value === undefined) return fallback;
  const text = String(value).trim();
  if (!text) return fallback;
  if (text === "null") return null;
  try {
    const cleaned = cleanTextForJson(text);
    return JSON.parse(cleaned);
  } catch {
    return fallback;
  }
}

export function parseQueryOverrides(defaults, metaMap, { aliases = {} } = {}) {
  const params = new URLSearchParams(window.location.search);
  const next = deepClone(defaults);

  Object.keys(metaMap).forEach((key) => {
    const paramKey = params.has(key) ? key : aliases[key];
    if (!paramKey || !params.has(paramKey)) return;
    const raw = params.get(paramKey);
    const meta = metaMap[key];

    if (meta.type === "boolean") {
      next[key] = parseBooleanParam(raw, next[key]);
    } else if (meta.type === "select" || meta.type === "text") {
      next[key] = raw;
    } else if (meta.type === "number") {
      const num = Number(raw);
      next[key] = Number.isFinite(num) ? num : next[key];
    } else if (meta.type === "multidropdown") {
      const parsed = parseJsonParam(raw, next[key]);
      next[key] = Array.isArray(parsed) ? parsed : next[key];
    } else if (meta.type === "json") {
      next[key] = parseJsonParam(raw, next[key]);
    }
  });

  return next;
}

export function safeStringify(value) {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

export function formatJsValue(value) {
  if (value === undefined) return "undefined";
  if (value === null) return "null";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  try {
    return JSON.stringify(value);
  } catch {
    return safeStringify(value);
  }
}

export function encodeJsonParam(value) {
  if (value === null) return "";
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

export function deepEqual(a, b) {
  if (a === b) return true;
  if (a === null || b === null || a === undefined || b === undefined) return a === b;
  if (typeof a !== typeof b) return false;

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i += 1) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  if (typeof a === "object" && typeof b === "object") {
    const aKeys = Object.keys(a).sort();
    const bKeys = Object.keys(b).sort();
    if (aKeys.length !== bKeys.length) return false;
    for (let i = 0; i < aKeys.length; i += 1) {
      if (aKeys[i] !== bKeys[i]) return false;
      const key = aKeys[i];
      if (!deepEqual(a[key], b[key])) return false;
    }
    return true;
  }

  return false;
}

export function normalizeStringArrayAsSet(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((v) => String(v))
    .filter(Boolean)
    .sort();
}

export function createDefaultState(defaultInitOptions, defaultInputAttributes) {
  return { ...deepClone(defaultInitOptions), ...deepClone(defaultInputAttributes) };
}

export function isDefaultForKey(key, meta, value, defaultState) {
  const def = defaultState[key];

  if (meta.type === "multidropdown") {
    const a = normalizeStringArrayAsSet(value);
    const b = normalizeStringArrayAsSet(def);
    return deepEqual(a, b);
  }

  if (meta.type === "text" || meta.type === "select") {
    return String(value ?? "") === String(def ?? "");
  }

  if (meta.type === "number") {
    const a = value === "" ? "" : Number(value);
    const b = def === "" ? "" : Number(def);
    return a === b || (Number.isNaN(a) && Number.isNaN(b));
  }

  if (meta.type === "boolean") {
    return Boolean(value) === Boolean(def);
  }

  if (meta.type === "json") {
    return deepEqual(value, def);
  }

  return deepEqual(value, def);
}
