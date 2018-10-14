module.exports = {
  template: {
    release: function(p) {
      var parts = p.date.split("/");
      var date = parts[2] + "-" + parts[1] + "-" + parts[0];
      return "## " + p.release + " (" + date + ")\n" + p.body;
    },
    releaseSeparator: "\n\n",
  },
};
