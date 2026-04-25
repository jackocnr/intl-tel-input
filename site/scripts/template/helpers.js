// Page-shape helpers — used by build-pages.js to construct the data object
// passed to each layout/page template.
import fs from "node:fs";
import { renderString } from "./render.js";

const readFile = (p) => fs.readFileSync(p, "utf8");

// Common partials shared by every "page" wrapper template (homepage, playground,
// 404, examples, docs). The partials may themselves be lodash templates that
// need rendering with the supplied `data` (e.g. cacheBust references).
const readCommonPagePartials = (data) => ({
  common_meta_tags: readFile("src/shared/common_meta_tags.html"),
  common_styles: renderString(
    readFile("src/shared/common_styles.html.ejs"),
    data,
  ),
  common_head_end_prod:
    data && data.isDevBuild
      ? ""
      : readFile("src/shared/common_head_end_prod.html"),
});

const readCommonBodyEndScript = () =>
  readFile("src/shared/common_body_end.html");

const readItiLiveResultsScript = (data) =>
  renderString(readFile("src/shared/iti_live_results_script.html.ejs"), data);

// Reads the rendered iti_script (produced upstream by the `iti_script` template task).
const readItiScript = () => readFile("tmp/shared/iti_script.html");

// Pre-renders the nav-related partials consumed by layout_template.html.ejs
// (`<%= header_nav %>` / `<%= mobile_nav %>` / `<%= page_pagination %>`).
// All three reference page context (pageType, name, dropdown data) so they
// need to be rendered per page rather than read as static strings.
const readNavPartials = (data) => ({
  header_nav: renderString(readFile("src/shared/header_nav.html.ejs"), data),
  mobile_nav: renderString(readFile("src/shared/mobile_nav.html.ejs"), data),
  page_pagination: renderString(
    readFile("src/shared/page_pagination.html.ejs"),
    data,
  ),
});

export {
  readCommonPagePartials,
  readCommonBodyEndScript,
  readItiLiveResultsScript,
  readItiScript,
  readNavPartials,
};
