module.exports = function(grunt) {
  return {
    options: {
      files: ['package.json', 'intl-tel-input.jquery.json', 'component.json'],
      updateConfigs: ['package'],
      commitFiles: ['-a'],
      pushTo: 'origin'
    }
  };
};
