module.exports = function(grunt) {
  return {
    options: {
      files: ['package.json', 'bower.json', 'intl-tel-input.jquery.json'],
      updateConfigs: ['package'],
      commitFiles: ['-a'],
      pushTo: 'origin'
    }
  };
};