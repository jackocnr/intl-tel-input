// Don't bundle utils.js into the examples - it's lazy-loaded at runtime from a separate URL.
// Using a plugin (rather than esbuild's built-in `external` option) because the import paths
// can include a cache-bust query string (e.g. utils.js?v=abc), and esbuild's `external` globs
// only allow a single "*" wildcard, which isn't enough to match both the path and the query.
const externalUtilsPlugin = {
  name: "external-utils-plugin",
  setup({ onResolve }) {
    onResolve({ filter: /utils/ }, args => {
      return { path: args.path, external: true };
    });
  },
};

export default externalUtilsPlugin;
