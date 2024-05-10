// TODO: figure out how to spy on dynamic import to test this, as currently the dyanmic import is failing in the test env.

// "use strict";

// describe("loadUtils:", function() {

//   beforeEach(function() {
//     intlSetup();
//     //* Must be in markup for utils loaded handler to work.
//     input = $("<input>").appendTo("body");
//   });

//   afterEach(function() {
//     intlTeardown();
//   });



//   describe("calling loadUtils before init plugin", function() {

//     var url = "build/js/utils.js?v=1",
//       resolved = false;

//     beforeEach(function(done) {
//       var promise = window.intlTelInput.loadUtils(url);
//       promise.then(function() {
//         resolved = true;
//         done();
//       });
//     });

//     afterEach(function() {
//       resolved = false;
//     });

//     it("starts loading the utils", function() {
//       expect(window.intlTelInput.startedLoadingUtilsScript).toEqual(true);
//     });

//     it("does resolve the promise", function() {
//       expect(resolved).toEqual(true);
//     });



//     describe("then init plugin with utilsScript option", function() {

//       var resolved2 = false;

//       beforeEach(function(done) {
//         iti = window.intlTelInput(input[0], {
//           utilsScript: "some/other/url/ok",
//         });
//         iti.promise.then(function() {
//           resolved2 = true;
//           done();
//         });
//       });

//       afterEach(function() {
//         resolved2 = false;
//       });

//       // TODO: spy on dynamic imports to check if this fired again
//       // it("does not start loading the utils", function() {
//       //   expect($("script.iti-load-utils").length).toEqual(1);
//       //   expect($("script.iti-load-utils").attr("src")).toEqual(url);
//       // });

//       it("does resolve the promise immediately", function() {
//         expect(resolved2).toEqual(true);
//       });

//     });

//   });



//   describe("init plugin with utilsScript option, but force documentReady=false so it wont fire", function() {

//     var url2 = "build/js/utils.js?v=2",
//       resolved = false;

//     beforeEach(function(done) {
//       window.intlTelInput.documentReady = () => false;
//       iti = window.intlTelInput(input[0], {
//         utilsScript: "some/other/url/ok",
//       });
//       iti.promise.then(function() {
//         resolved = true;
//         done();
//       });
//     });

//     afterEach(function() {
//       resolved = false;
//     });

//     it("does not start loading the utils", function() {
//       expect(window.intlTelInput.startedLoadingUtilsScript).toEqual(false);
//     });

//     it("does not resolve the promise", function() {
//       expect(resolved).toEqual(false);
//     });



//     describe("calling loadUtils", function() {

//       var resolved2 = false;

//       beforeEach(function(done) {
//         var promise = window.intlTelInput.loadUtils(url2);
//         promise.then(function() {
//           resolved2 = true;
//           done();
//         });
//       });

//       afterEach(function() {
//         resolved2 = false;
//       });

//       it("does start loading the utils", function() {
//         expect(window.intlTelInput.startedLoadingUtilsScript).toEqual(true);
//       });

//       it("does resolve the promise", function() {
//         expect(resolved2).toEqual(true);
//       });



//       describe("then init another plugin instance with utilsScript option", function() {

//         var iti2,
//           input2,
//           resolved3 = false;

//         beforeEach(function(done) {
//           input2 = $("<input>").appendTo("body");
//           iti2 = window.intlTelInput(input2[0], {
//             utilsScript: "test/url/three/utils.js",
//           });
//           iti2.promise.then(function() {
//             resolved3 = true;
//             done();
//           });
//         });

//         afterEach(function() {
//           resolved3 = false;
//           iti2.destroy();
//           input2.remove();
//           iti2 = input2 = null;
//         });

//         // TODO: spy on dynamic imports to check if this fired again
//         // it("does not inject another script", function() {
//         //   expect($("script.iti-load-utils").length).toEqual(1);
//         //   expect($("script.iti-load-utils").attr("src")).toEqual(url2);
//         // });

//         it("does resolve the promise immediately", function() {
//           expect(resolved3).toEqual(true);
//         });

//       });

//     });

//   });



//   describe("force documentReady=true then init plugin with utilsScript", function() {

//     var url3 = "build/js/utils.js?v=3",
//       resolved = false;

//     beforeEach(function(done) {
//       window.intlTelInput.documentReady = () => true;
//       iti = window.intlTelInput(input[0], {
//         utilsScript: url3,
//       });
//       //* Wait for the request to finish so we don't interfere with other tests.
//       iti.promise.then(function() {
//         resolved = true;
//         done();
//       });
//     });

//     afterEach(function() {
//       resolved = false;
//     });

//     it("resolves the promise immediately", function() {
//       expect(resolved).toEqual(true);
//     });

//     it("starts loading the utils", function() {
//       expect(window.intlTelInput.startedLoadingUtilsScript).toEqual(true);
//     });

//     // TODO: spy on dynamic imports to check if this fired again
//     // it("then calling loadUtils does not inject another script", function() {
//     //   window.intlTelInput.loadUtils("this/is/a/test");

//     //   expect($("script.iti-load-utils").length).toEqual(1);
//     //   expect($("script.iti-load-utils").attr("src")).toEqual(url3);
//     // });

//   });

// });
