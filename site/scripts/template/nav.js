const docsDropdownPages = [
  {
    name: "integrations",
    href: "/docs/integrations",
    label: "Integrations",
  },
  {
    name: "vanilla_javascript",
    href: "/docs/vanilla-javascript",
    label: "Vanilla JavaScript",
    nested: true,
  },
  {
    name: "react_component",
    href: "/docs/react-component",
    label: "React component",
    nested: true,
  },
  {
    name: "vue_component",
    href: "/docs/vue-component",
    label: "Vue component",
    nested: true,
  },
  {
    name: "angular_component",
    href: "/docs/angular-component",
    label: "Angular component",
    nested: true,
  },
  {
    name: "svelte_component",
    href: "/docs/svelte-component",
    label: "Svelte component",
    nested: true,
  },
  {
    name: "best_practices",
    href: "/docs/best-practices",
    label: "Best practices",
  },
  {
    name: "options",
    href: "/docs/options",
    label: "Options",
  },
  {
    name: "methods",
    href: "/docs/methods",
    label: "Methods",
  },
  {
    name: "types",
    href: "/docs/types",
    label: "Types",
  },
  {
    name: "utils",
    href: "/docs/utils",
    label: "Utils script",
  },
  {
    name: "theming",
    href: "/docs/theming",
    label: "Theming / dark mode",
  },
  {
    name: "localisation",
    href: "/docs/localisation",
    label: "Localisation",
  },
  {
    name: "accessibility",
    href: "/docs/accessibility",
    label: "Accessibility",
  },
  {
    name: "troubleshooting",
    href: "/docs/troubleshooting",
    label: "Troubleshooting",
  },
  {
    name: "faq",
    href: "/docs/faq",
    label: "FAQ",
  },
];

const examplesDropdownSections = [
  {
    name: "vanilla_javascript",
    label: "Vanilla JavaScript",
    items: [
      {
        name: "validation_practical",
        href: "/examples/vanilla-javascript/validation",
        label: "Validation",
      },
      {
        name: "validation_precise",
        href: "/examples/vanilla-javascript/validation-precise",
        label: "Precise validation (advanced)",
      },
      {
        name: "lookup_country",
        href: "/examples/vanilla-javascript/lookup-country",
        label: "Lookup user's country",
      },
      {
        name: "single_country",
        href: "/examples/vanilla-javascript/single-country",
        label: "Single country",
      },
      {
        name: "right_to_left",
        href: "/examples/vanilla-javascript/right-to-left",
        label: "Right to left",
      },
      {
        name: "hidden_input",
        href: "/examples/vanilla-javascript/hidden-input",
        label: "Hidden input",
      },
      {
        name: "display_number",
        href: "/examples/vanilla-javascript/display-number",
        label: "Display existing number",
      },
      {
        name: "multiple_instances",
        href: "/examples/vanilla-javascript/multiple-instances",
        label: "Multiple instances",
      },
      {
        name: "large_flags",
        href: "/examples/vanilla-javascript/large-flags",
        label: "Large flags",
      },
    ],
  },
  {
    name: "react_component",
    label: "React component",
    items: [
      {
        name: "react_component",
        href: "/examples/react-component/validation",
        label: "Validation",
      },
      {
        name: "react_hook_form",
        href: "/examples/react-component/react-hook-form",
        label: "React Hook Form",
      },
      {
        name: "react_display_existing_number",
        href: "/examples/react-component/display-existing-number",
        label: "Display existing number",
      },
    ],
  },
  {
    name: "vue_component",
    label: "Vue component",
    items: [
      {
        name: "vue_component",
        href: "/examples/vue-component/validation",
        label: "Validation",
      },
      {
        name: "vue_display_existing_number",
        href: "/examples/vue-component/display-existing-number",
        label: "Display existing number",
      },
    ],
  },
  {
    name: "angular_component",
    label: "Angular component",
    items: [
      {
        name: "angular_component",
        href: "/examples/angular-component/validation",
        label: "Validation",
      },
      {
        name: "angular_display_existing_number",
        href: "/examples/angular-component/display-existing-number",
        label: "Display existing number",
      },
    ],
  },
  {
    name: "svelte_component",
    label: "Svelte component",
    items: [
      {
        name: "svelte_component",
        href: "/examples/svelte-component/validation",
        label: "Validation",
      },
      {
        name: "svelte_display_existing_number",
        href: "/examples/svelte-component/display-existing-number",
        label: "Display existing number",
      },
    ],
  },
];

export { docsDropdownPages, examplesDropdownSections };
