import { encodeJsonParam, isDefaultForKey } from "./stateUtils";

export function buildShareUrlFromState(
  state,
  { optionMeta, attributeMeta, defaultState },
  { excludeDefaults = false } = {},
) {
  const url = new URL(window.location.href);
  const allMeta = {
    ...optionMeta,
    ...attributeMeta,
  };

  // Keep unrelated params, but rewrite all playground-controlled params.
  Object.keys(allMeta).forEach((key) => url.searchParams.delete(key));

  Object.entries(allMeta).forEach(([key, meta]: [string, any]) => {
    const value = state[key];

    if (excludeDefaults && isDefaultForKey(key, meta, value, defaultState)) return;

    if (meta.type === "boolean") {
      url.searchParams.set(key, value ? "true" : "false");
    } else if (meta.type === "text" || meta.type === "select") {
      url.searchParams.set(key, String(value ?? ""));
    } else if (meta.type === "number") {
      url.searchParams.set(key, value === "" || value === null || value === undefined ? "" : String(value));
    } else if (meta.type === "multidropdown") {
      url.searchParams.set(key, encodeJsonParam(Array.isArray(value) ? value : []));
    } else if (meta.type === "json") {
      url.searchParams.set(key, encodeJsonParam(value));
    }
  });

  return url;
}

export function updateUrlFromState(state, deps) {
  const nextUrl = buildShareUrlFromState(state, deps, { excludeDefaults: true });
  const currentUrl = new URL(window.location.href);
  if (currentUrl.search === nextUrl.search) return;
  window.history.replaceState(null, "", nextUrl);
}
