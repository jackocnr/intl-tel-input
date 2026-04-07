module.exports = function (grunt) {
  // Phase 1 of the grunt → npm-scripts migration: only the templating step
  // and the file watcher still run through grunt. Everything else has been
  // ported to standalone scripts in site/scripts/ and is invoked via npm.
  // load-grunt-config picks up grunt/template.js and grunt/watch.js.
  require("load-grunt-config")(grunt);
};
