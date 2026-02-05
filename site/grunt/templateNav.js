const docsDropdownPages = [
  { name: "getting_started", href: "/docs/getting-started.html", label: "Getting started" },
  { name: "options", href: "/docs/options.html", label: "Initialisation options" },
  { name: "methods", href: "/docs/methods.html", label: "Methods" },
  { name: "events", href: "/docs/events.html", label: "Events" },
  { name: "utils", href: "/docs/utils.html", label: "Utilities script" },
  { name: "theming", href: "/docs/theming.html", label: "Theming / Dark mode" },
  { name: "troubleshooting", href: "/docs/troubleshooting.html", label: "Troubleshooting" },
];

const examplesDropdownPages = [
  { name: "validation_practical", href: "/examples/validation-practical.html", label: "Validation" },
  { name: "lookup_country", href: "/examples/lookup-country.html", label: "Lookup user's country" },
  { name: "only_countries", href: "/examples/only-countries.html", label: "Only countries" },
  { name: "single_country", href: "/examples/single-country.html", label: "Single country" },
  { name: "internationalisation", href: "/examples/internationalisation.html", label: "Internationalisation" },
  { name: "right_to_left", href: "/examples/right-to-left.html", label: "Right to Left" },
  { name: "hidden_input", href: "/examples/hidden-input.html", label: "Hidden input" },
  { name: "display_number", href: "/examples/display-number.html", label: "Display existing number" },
  { name: "multiple_instances", href: "/examples/multiple-instances.html", label: "Multiple instances" },
  { name: "validation_precise", href: "/examples/validation-precise.html", label: "Precise Validation (dangerous)" },
  { name: "large_flags", href: "/examples/large-flags.html", label: "Large flags" },
  { name: "react_component", href: "/examples/react-component.html", label: "React component" },
  { name: "vue_component", href: "/examples/vue-component.html", label: "Vue component" },
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
