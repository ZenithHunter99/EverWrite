document.addEventListener('DOMContentLoaded', () => {
  const noteTitleInput = document.getElementById('noteTitle');
  const noteContentTextarea = document.getElementById('noteContent');
  const saveBtn = document.getElementById('saveBtn');
  const noteList = document.getElementById('noteList');
  
  let notes = JSON.parse(localStorage.getItem('notes')) || {};
  let currentNoteId = null;

  // Load notes into the sidebar
  function loadNotes() {
      noteList.innerHTML = '';
      Object.keys(notes).forEach(id => {
          const li = document.createElement('li');
          li.textContent = notes[id].title || 'Untitled Note';
          li.dataset.id = id;
          li.addEventListener('click', () => loadNoteContent(id));
          noteList.appendChild(li);
      });
  }

  // Load content of a note into the main area
  function loadNoteContent(id) {
      currentNoteId = id;
      const note = notes[id] || { title: '', content: '' };
      noteTitleInput.value = note.title;
      noteContentTextarea.value = note.content;
  }

  // Save the note
  saveBtn.addEventListener('click', () => {
      const title = noteTitleInput.value.trim();
      const content = noteContentTextarea.value.trim();
      if (currentNoteId) {
          notes[currentNoteId] = { title, content };
      } else {
          currentNoteId = Date.now().toString();
          notes[currentNoteId] = { title, content };
      }
      localStorage.setItem('notes', JSON.stringify(notes));
      loadNotes();
      noteTitleInput.value = '';
      noteContentTextarea.value = '';
      currentNoteId = null;
  });

  // Initialize the app
  loadNotes();
});
