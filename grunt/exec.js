module.exports = function(grunt) {
  return {
    evenizer: {
      command: "evenizer --resize -i src/img/flags/@2x/*.png"
    }
  };
};
