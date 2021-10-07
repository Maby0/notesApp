document.addEventListener('DOMContentLoaded', () => {
  let notesArr = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [],
    container1 = document.querySelector('.container1'),
    container2 = document.querySelector('.container2'),
    newNote = document.querySelector('#new-note'),
    noteList = document.getElementById('note-list');

  localStorage.setItem('notes', JSON.stringify(notesArr));

  listExistingNotes();
  
  newNote.addEventListener('submit', (p) => {
    p.preventDefault();
    emojify(document.querySelector('#note-text').value);
    // saveNote(document.querySelector('#note-text').value);
  })

  function listExistingNotes() {
    if (notesArr.count > 0 ) {
      notesArr.forEach((note) => {
        displayNotes(note);
      })
    }
  }

  function emojify(noteText) {
    let emojifiedText,
    jsonString = JSON.parse(`{ "text": "${noteText}"}`);

    console.log("reaches here.")
    fetch('https://makers-emojify.herokuapp.com/', { method: 'POST', headers: {'Content-Type': 'application/json',}, body: JSON.stringify(jsonString) })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        emojifiedText = response.emojified_text;
        console.log("reaches here as well")
        saveNote(emojifiedText);
      })
  }

  function saveNote(noteText) {
    notesArr.push(noteText);
    localStorage.setItem('notes', JSON.stringify(notesArr))
    let note = new Note(noteText);
    displayNotes(noteText);
  }

  function displayNotes(noteText) {
    let li = document.createElement('li'),
    a = document.createElement('a'),
    note = new Note(noteText);

    a.textContent = note.abbreviate();
    a.addEventListener('click', () => {
      viewWholeNote(note.getAllText());
    })
    li.appendChild(a);
    noteList.appendChild(li);

    document.querySelector('#note-text').value = '';
  }

  function viewWholeNote(allText) {
    container1.style.display = 'none';
    container2.style.display = 'block';

    if (!!document.getElementById('long-note')) {
      document.getElementById('long-note').remove();
    } 
       
    note = document.createElement('p');
    note.innerHTML = allText;
    note.id = 'long-note';
    container2.appendChild(note);

    document.querySelector('#back-button').addEventListener('click', () => {
      container1.style.display = 'block';
      container2.style.display = 'none';
    })
  }
})