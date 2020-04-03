module.exports = function(grunt) {
  return {
    options: {
      files: ['package.json', 'package-lock.json', 'composer.json'],
      updateConfigs: ['package'],
      commitFiles: ['-a'],
      pushTo: 'origin'
    }
  };
};
