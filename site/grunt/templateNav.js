const docsDropdownPages = [
  { name: "getting_started", href: "/docs/getting-started", label: "Getting started" },
  { name: "options", href: "/docs/options", label: "Initialisation options" },
  { name: "methods", href: "/docs/methods", label: "Methods" },
  { name: "events", href: "/docs/events", label: "Events" },
  { name: "utils", href: "/docs/utils", label: "Utilities script" },
  { name: "theming", href: "/docs/theming", label: "Theming / Dark mode" },
  { name: "troubleshooting", href: "/docs/troubleshooting", label: "Troubleshooting" },
];

const examplesDropdownPages = [
  { name: "validation_practical", href: "/examples/validation-practical", label: "Validation" },
  { name: "lookup_country", href: "/examples/lookup-country", label: "Lookup user's country" },
  { name: "single_country", href: "/examples/single-country", label: "Single country" },
  { name: "internationalisation", href: "/examples/internationalisation", label: "Internationalisation" },
  { name: "right_to_left", href: "/examples/right-to-left", label: "Right to Left" },
  { name: "hidden_input", href: "/examples/hidden-input", label: "Hidden input" },
  { name: "display_number", href: "/examples/display-number", label: "Display existing number" },
  { name: "multiple_instances", href: "/examples/multiple-instances", label: "Multiple instances" },
  { name: "validation_precise", href: "/examples/validation-precise", label: "Precise Validation (dangerous)" },
  { name: "large_flags", href: "/examples/large-flags", label: "Large flags" },
  { name: "react_component", href: "/examples/react-component", label: "React component" },
  { name: "vue_component", href: "/examples/vue-component", label: "Vue component" },
  { name: "angular_component", href: "/examples/angular-component", label: "Angular component" },
];

const docsPageByName = docsDropdownPages.reduce((acc, p) => {
  acc[p.name] = p;
  return acc;
}, {});

const orderedDocsKeys = docsDropdownPages.map((p) => p.name);

module.exports = {
  docsDropdownPages,
  examplesDropdownPages,
  docsPageByName,
  orderedDocsKeys,
};
