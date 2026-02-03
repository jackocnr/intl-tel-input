const externalUtilsPlugin = {
  name: "external-utils-plugin",
  setup({ onResolve }) {
    onResolve({ filter: /utils/ }, args => {
      return { path: args.path, external: true };
    });
  },
};

export default externalUtilsPlugin;