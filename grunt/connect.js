module.exports = function(grunt) {
  return {
    server: {
      options: {
        keepalive: true,
        hostname: "localhost",
        base: ".",
        port: 9000,
        open: "http://localhost:9000/demo.html"
      }
    }
  };
};
