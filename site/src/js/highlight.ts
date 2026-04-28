// Slim highlight.js bundle: only the languages used on this site.
// Built as a UMD-ish global (`window.hljs`) by site/scripts/esbuild.js
// and loaded site-wide via common_body_end.html.
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";

hljs.registerLanguage("bash", bash);
hljs.registerLanguage("css", css);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("xml", xml);

(window as unknown as { hljs: typeof hljs }).hljs = hljs;
