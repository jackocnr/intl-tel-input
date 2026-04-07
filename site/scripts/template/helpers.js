// Page-shape helpers — used by build-pages.js to construct the data object
// passed to each layout/page template. Replaces site/grunt/templateGruntHelpers.js
// (which had the same shape but took grunt.file.read instead of fs.readFileSync).
import fs from "node:fs";
import { renderString } from "./render.js";

const readFile = (p) => fs.readFileSync(p, "utf8");

// Common partials shared by every "page" wrapper template (homepage, playground,
// 404, examples, docs). The partials may themselves be lodash templates that
// need rendering with the supplied `data` (e.g. cacheBust references).
const readCommonPagePartials = (data) => ({
  common_meta_tags: readFile("src/shared/common_meta_tags.html"),
  common_styles: renderString(readFile("src/shared/common_styles.html.ejs"), data),
  common_head_end_prod: data && data.isDevBuild
    ? ""
    : readFile("src/shared/common_head_end_prod.html"),
});

const readCommonBodyEndScript = () => readFile("src/shared/common_body_end.html");

const readItiLiveResultsScript = (data) =>
  renderString(readFile("src/shared/iti_live_results_script.html.ejs"), data);

// Reads the rendered iti_script (produced upstream by the `iti_script` template task).
const readItiScript = () => readFile("tmp/shared/iti_script.html");

// Standard layout-template data shape. Used by every page that wraps content
// in src/layout_template.html.ejs.
const buildLayoutData = ({
  showLeftSidebar,
  layoutClass,
  navPath,
  contentPath,
  name,
  pageType,
  docsDropdownPages,
  examplesDropdownPages,
  extra = {},
}) => ({
  showLeftSidebar,
  layoutClass,
  ...(navPath ? { nav: readFile(navPath) } : {}),
  content: readFile(contentPath),
  name,
  pageType,
  docsDropdownPages,
  examplesDropdownPages,
  ...extra,
});

export {
  readCommonPagePartials,
  readCommonBodyEndScript,
  readItiLiveResultsScript,
  readItiScript,
  buildLayoutData,
};
