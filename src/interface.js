// document.addEventListener('DOMContentLoaded', () => {
//   makeUrlChangeShowNoteForCurrentPage();

// const { NONAME } = require("dns");

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

  // document.querySelector('#page-switch').addEventListener('click', () => {
  //   changePage();
  // })



  function saveNote(noteText) {
    let note = new Note(noteText);
    notesArr.push(note);
    displayNotes(notesArr);
  }

  function displayNotes(notesArr) {
    let list = document.getElementById('note-list'),
    li = document.createElement('li'),
    a = document.createElement('a');

    notesArr.forEach((element) => {
      a.textContent = element.abbreviate();
      a.id = element.abbreviate();
      a.addEventListener('click', () => {
        viewWholeNote(element.getAllText());
      })
      li.appendChild(a);
      list.appendChild(li);
    });

    document.querySelector('#note-text').value = '';
  }

  function viewWholeNote(allText) {
    let container1 = document.querySelector('.container1'),
    container2 = document.querySelector('.container2');

    container1.style.display = 'none';
    container2.style.display = 'block';

    note = document.createElement('p');
    note.innerHTML = allText;
    container2.appendChild(note);
  }
})
