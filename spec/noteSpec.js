'use strict';

let note = new Note("this is the text on the note.");

it('is an instance of the Note class', () => {
  expect(note).toBe(Note);
})

it('stores the text as a property within the note instance', () => {
  expect(note.text).toEqual("this is the text on the note.");
})
