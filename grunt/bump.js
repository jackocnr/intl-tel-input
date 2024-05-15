module.exports = function(grunt) {
  return {
    options: {
      files: ['package.json', 'package-lock.json', 'composer.json', '.github/ISSUE_TEMPLATE.md'],
      updateConfigs: ['package'],
      commitFiles: ['-a'],
      pushTo: 'origin'
    }
  };
};
