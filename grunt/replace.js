module.exports = function(grunt) {
  return {

    /**************
     * Update version numbers
     **************/
    siteDocs: {
      options: {
        patterns: [
          {
            match: /intl-tel-input@([0-9.]+)\/build/g,
            replacement: 'intl-tel-input@<%= package.version %>/build'
          }
        ]
      },
      files: {
        'site/src/docs/markdown/options.md': 'site/src/docs/markdown/options.md',
        'site/src/docs/markdown/getting_started.md': 'site/src/docs/markdown/getting_started.md',
      }
    },
    issueTemplate: {
      options: {
        patterns: [
          {
            match: /the latest version \(v[0-9]+\.[0-9]+\.[0-9]+\)/,
            replacement: 'the latest version (v<%= package.version %>)'
          }
        ]
      },
      files: {
        '.github/ISSUE_TEMPLATE/1_bug_report.yml': '.github/ISSUE_TEMPLATE/1_bug_report.yml'
      }
    },
    // grunt bump already updates the version number at the beginning of package-lock, but not the "inner" one (aprx line 9), so do that here
    packageLockInner: {
      options: {
        patterns: [
          {
            match: /"name": "intl-tel-input",\n      "version": "[0-9]+\.[0-9]+\.[0-9]+"/,
            replacement: '"name": "intl-tel-input",\n      "version": "<%= package.version %>"'
          }
        ]
      },
      files: {
        'package-lock.json': 'package-lock.json'
      }
    },

    /**************
     * Generate reactWithUtils.tsx
     **************/
    reactWithUtils: {
      options: {
        patterns: [
          {
            match: /import intlTelInput from \"intl\-tel\-input\"\;/,
            replacement: '//* THIS FILE IS AUTO-GENERATED. DO NOT EDIT.\nimport intlTelInput from "intl-tel-input/intlTelInputWithUtils";'
          }
        ]
      },
      files: {
        'react/src/reactWithUtils.tsx': 'react/src/react.tsx',
      }
    },

    /**************
     * Generate vue/src/IntlTelInputWithUtils.vue
     **************/
    vueWithUtils: {
      options: {
        patterns: [
          {
            match: /\<script setup lang=\"ts\"\>\simport intlTelInput from \"intl\-tel\-input\"\;/,
            replacement: '<!-- THIS FILE IS AUTO-GENERATED. DO NOT EDIT. -->\n<script setup lang="ts">\nimport intlTelInput from "intl-tel-input/intlTelInputWithUtils";'
          }
        ]
      },
      files: {
        'vue/src/IntlTelInputWithUtils.vue': 'vue/src/IntlTelInput.vue',
      }
    },

    /**************
     * Generate angular/src/angularWithUtils.ts
     **************/
    angularWithUtils: {
      options: {
        patterns: [
          {
            match: /import intlTelInput from \"intl\-tel\-input\"\;/,
            replacement: '//* THIS FILE IS AUTO-GENERATED. DO NOT EDIT.\nimport intlTelInput from "intl-tel-input/intlTelInputWithUtils";'
          }
        ]
      },
      files: {
        'angular/src/angularWithUtils.ts': 'angular/src/angular.ts',
      }
    },

    /**************
     * Generate svelte/src/IntlTelInputWithUtils.svelte
     **************/
    svelteWithUtils: {
      options: {
        patterns: [
          {
            match: /\<script module lang="ts"\>\s*import intlTelInput from "intl\-tel\-input"\;/,
            replacement: '<!-- THIS FILE IS AUTO-GENERATED. DO NOT EDIT. -->\n<script module lang="ts">\nimport intlTelInput from "intl-tel-input/intlTelInputWithUtils";'
          }
        ]
      },
      files: {
        'svelte/src/IntlTelInputWithUtils.svelte': 'svelte/src/IntlTelInput.svelte',
      }
    },
  };
};