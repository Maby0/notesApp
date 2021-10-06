// document.addEventListener('DOMContentLoaded', () => {
//   makeUrlChangeShowNoteForCurrentPage();

//   function makeUrlChangeShowNoteForCurrentPage() {
//     window.addEventListener("hashchange", showNoteForCurrentPage);
//   };

//   function showNoteForCurrentPage() {
//     showNote(getNoteFromUrl(window.location));
//   };

//   function getNoteFromUrl(location) {
//     return location.hash.split("#")[1];
//   };

//   function showNote(note) {
//     document
//       .getElementById("note-number")
//       .innerHTML = note;
//   };
// })

document.addEventListener('DOMContentLoaded', () => {
  let notesArr = [];

  document.querySelector('#new-note').addEventListener('submit', (p) => {
    p.preventDefault();
    saveNote(document.querySelector('#note-text').value);
  })

  function saveNote(noteText) {
    let note = new Note(noteText);
    notesArr.push(note);
    displayNotes(notesArr);
  }

  function displayNotes(notesArr) {
    let list = document.getElementById('note-list'),
    li = document.createElement('li');

    notesArr.forEach((element) => {
      li.innerHTML = element.abbreviate();
      list.appendChild(li);
    });
    
    document.querySelector('#note-text').value = '';
  }
})