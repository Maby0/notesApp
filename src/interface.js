document.addEventListener('DOMContentLoaded', () => {
  let notesArr = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [],
    container1 = document.querySelector('.container1'),
    container2 = document.querySelector('.container2'),
    newNote = document.querySelector('#new-note'),
    noteList = document.getElementById('note-list');

  localStorage.setItem('notes', JSON.stringify(notesArr));

  listExistingNotes(notesArr);
  
  newNote.addEventListener('submit', (p) => {
    p.preventDefault();
    emojify(document.querySelector('#note-text').value);
  })

  function listExistingNotes(notesArr) {
    if (notesArr.length > 0 ) {
      notesArr.forEach((note) => {
        console.log(note)
        displayNotes(note);
      })
    }
  }

  function emojify(noteText) {
    let emojifiedText,
    jsonString = JSON.parse(`{ "text": "${noteText}"}`);

    fetch('https://makers-emojify.herokuapp.com/', { method: 'POST', headers: {'Content-Type': 'application/json',}, body: JSON.stringify(jsonString) })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        emojifiedText = response.emojified_text;
        saveNote(emojifiedText);
      })
  }

  function saveNote(noteText) {
    notesArr.push(noteText);
    localStorage.setItem('notes', JSON.stringify(notesArr))
    displayNotes(noteText);
  }

  function displayNotes(noteText) {
    let li = document.createElement('li'),
    a = document.createElement('a'),
    div = document.createElement('div'),
    note = new Note(noteText);

    a.textContent = note.abbreviate();
    a.addEventListener('click', () => {
      viewWholeNote(note.getAllText());
    })
    li.appendChild(a);
    div.appendChild(li);
    div.className = 'abbreviated-note';
    noteList.appendChild(div);

    document.querySelector('#note-text').value = '';
  }

  function viewWholeNote(allText) {
    container1.style.display = 'none';
    container2.style.display = 'block';

    if (!!document.getElementById('long-note')) {
      document.getElementById('long-note').remove();
    } 
       
    oneNotePage = document.querySelector('.view-note')
    note = document.createElement('p');
    note.innerHTML = allText;
    note.id = 'long-note';
    
    oneNotePage.appendChild(note);

    document.querySelector('#back-button').addEventListener('click', () => {
      container1.style.display = 'block';
      container2.style.display = 'none';
    })
  }
})