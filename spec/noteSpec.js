'use strict';

let note = new Note("this is the text on the note.");
let longNote = new Note("this is a very long long long long long note")

it('is an instance of the Note class', () => {
  expect(note).toBe(Note);
})

it('access the text as a property within the note instance', () => {
  expect(note.getAllText()).toEqual("this is the text on the note.");
})

it('abbreviates the note to 20 characters if longer than 20', () => {
  expect(longNote.abbreviate()).toEqual('this is a very long ');
})
