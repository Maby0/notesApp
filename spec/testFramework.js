'use strict';

function expect(actual) {
  return {
    toEqual: function(expected) {
      if (actual === expected) {
        console.log("Pass");
      } else {
        console.log("Fail");
      }
    },

    toInclude: function(expected) {
      if (actual.includes(expected)) {
        console.log("Pass");
      } else {
        console.log("Fail");
      }
    },

    toBe: function(expected) {
      if (actual instanceof expected) {
        console.log("Pass");
      } else {
        console.log("Fail");
      }
    }
  }
}

function it(label, callback) {
  console.log(`Test: ${label}`)
  callback();
}