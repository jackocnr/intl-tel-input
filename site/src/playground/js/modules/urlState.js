import { encodeJsonParam, isDefaultForKey } from "./stateUtils.js";

export function buildShareUrlFromState(
  state,
  { optionMeta, attributeMeta, attributeQueryAliases, defaultState, windowObj = window },
  { excludeDefaults = false } = {},
) {
  const url = new URL(windowObj.location.href);
  const allMeta = {
    ...optionMeta,
    ...attributeMeta,
  };

  // Keep unrelated params, but rewrite all playground-controlled params.
  Object.keys(allMeta).forEach((key) => url.searchParams.delete(key));
  Object.values(attributeQueryAliases).forEach((aliasKey) => url.searchParams.delete(aliasKey));

  Object.entries(allMeta).forEach(([key, meta]) => {
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
  const { windowObj = window } = deps;
  const nextUrl = buildShareUrlFromState(state, deps, { excludeDefaults: true });
  const currentUrl = new URL(windowObj.location.href);
  if (currentUrl.search === nextUrl.search) return;
  windowObj.history.replaceState(null, "", nextUrl);
}
