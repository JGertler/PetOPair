"use strict";

var Nightmare = require("nightmare");
var expect = require("chai").expect;

describe("PetOPair", function() {
  // ID for the signUp button.
  var signUp = "#signUpButton";
  this.timeout(30000);
  it("allows users to sign up for a new account", function(done) {
    Nightmare({ show: true })
      .goto("http://localhost:8080/")
      .wait(signUp)
      .click(SignUp)
      .evaluate(function() {
        return document.path;
      })
      .then(function(path){
        expect(path).to.equal("http://localhost:8080/signup");
        done();
      });

  });

});
      // Complete sign up process
  //     .type("#first_name", "Test-First")
  //     .type("#user_password", "dummy*password")
  //     .click("#user_submit")
  //     // Evaluate the following selector
  //     .evaluate(function() {
  //       // Assert the catalog exists
  //       return document.querySelector("a[href='/learn/all']");
  //     })
  //     .then(function(catalog) {
  //       expect(catalog).to.not.equal(undefined);
  //       done();
  //     });
  // });
  //
  // it("should ", function() {
  //   throw new Error(
  //     "Look what you did you little jerk."
  //   );
  // });
