'use strict';

class Note {
  constructor(noteText) {
    this.text = noteText;
  }

  getAllText() {
    return this.text;
  }

  abbreviate() {
    if (this.text.length > 20) {
      return this.text.substring(0, 20);
    } else {
      return this.text;
    }
  }
}
