// Core template rendering primitives. Uses lodash.template.
import fs from "node:fs";
import path from "node:path";
import template from "lodash.template";
import { transformSync } from "esbuild";

// Explicit `<%`/`%>` delimiters; passing an explicit `interpolate` option
// suppresses lodash.template's "feature" of also matching ES6 `${...}`
// template literals — which would otherwise corrupt source files like
// angular_component.ts that contain real JS template literals.
const TEMPLATE_OPTIONS = {
  evaluate: /<%([\s\S]+?)%>/g,
  interpolate: /<%=([\s\S]+?)%>/g,
  escape: /<%-([\s\S]+?)%>/g,
};

// Render a template string with the given data and return the result.
// Recursive: if the output still contains `<%` tokens (because a partial
// inserted via `<%= partial %>` itself contains template tags), render
// again. Loop until no progress is made.
function renderString(text, data) {
  let result = text;
  let last;
  while (result.indexOf("<%") >= 0) {
    last = result;
    result = template(result, TEMPLATE_OPTIONS)(data);
    if (result === last) {
      break;
    }
  }
  return result;
}

// Render a template file to a destination file.
//
// `data` may be an object OR a function that returns an object — the lazy
// form lets file reads inside the data function happen at execution time,
// after upstream files exist.
function renderPage({ src, dest, data }) {
  const text = fs.readFileSync(src, "utf8");
  const resolved = typeof data === "function" ? data() : data;
  let output = renderString(text, resolved);
  // If a .ts source is being written to a .js destination, strip TypeScript
  // types so the result is browser-loadable plain JavaScript.
  if (src.endsWith(".ts") && dest.endsWith(".js")) {
    output = transformSync(output, { loader: "ts", format: "esm" }).code;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, output);
}

export { renderString, renderPage };
