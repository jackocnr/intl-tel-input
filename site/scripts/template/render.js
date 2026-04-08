// Core template rendering primitives. Uses lodash.template.
import fs from "node:fs";
import path from "node:path";
import template from "lodash.template";

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
    if (result === last) break;
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
  const output = renderString(text, resolved);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, output);
}

export { renderString, renderPage };
