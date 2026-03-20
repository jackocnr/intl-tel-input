const os = require('os');

module.exports = function(grunt) {
  return {
    clearBuild: {
      command: "rm -rf build tmp",
    },
    fetchStats: {
      command: `node grunt/fetchStats.js --env=${grunt.option("env") || "dev"}`,
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
