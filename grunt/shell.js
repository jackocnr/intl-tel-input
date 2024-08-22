module.exports = function(grunt) {
  return {
    buildReact: {
      command: 'node react/build.js'
    },
    buildVue: {
      command: 'vite build --config vue/viteConfig.js && vite build --config vue/viteConfigWithUtils.js'
    },
    buildJs: {
      command: 'node build.js'
    },
    genTsDeclaration: {
      //* Clean up the module names by removing the /index suffix as this is how they will be used.
      command: 'tsc --p tsconfig.json && sed -i "" -e "s/\\/index\\"/\\"/g" build/js/intlTelInput.d.ts'
    },
    genReactTsDeclaration: {
      //* Clean up the module names by removing the /index suffix as this is how they will be used.
      command: 'tsc --p react/tsconfig.json && sed -i "" -e "s/\\/index\\"/\\"/g" react/build/IntlTelInput.d.ts'
    },
    eslint: {
      command: 'eslint .'
    },
    test: {
      command: 'npm run test'
    }
  };
};
