const fs = require('fs');

module.exports = function(grunt) {
  grunt.registerTask('react_with_utils', 'Generate react/src/intl-tel-input/reactWithUtils.tsx', function() {
    const reactContents = fs.readFileSync('react/src/intl-tel-input/react.tsx', 'utf8');
    const reactWithUtilsContents = reactContents.replace('import intlTelInput from "../intl-tel-input";', '//* THIS FILE IS AUTO-GENERATED. DO NOT EDIT.\nimport intlTelInput from "./intlTelInputWithUtils";');
    fs.writeFileSync('react/src/intl-tel-input/reactWithUtils.tsx', reactWithUtilsContents);
  });
};
