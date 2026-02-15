const os = require('os');

module.exports = function(grunt) {
  return {
    clearBuild: {
      command: "rm -rf build tmp",
    },
    esbuild: {
      command: "node esbuild/build.mjs",
    },
    vite: {
      command: "vite build --config src/examples/js/viteVueDemo.config.js",
    },
    viteSvelte: {
      command: "vite build --config src/examples/js/viteSvelteDemo.config.mjs",
    },
  };
};
