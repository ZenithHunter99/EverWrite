document.addEventListener('DOMContentLoaded', () => {
    const noteTitleInput = document.getElementById('noteTitle');
    const noteContentDiv = document.getElementById('noteContent');
    const saveBtn = document.getElementById('saveBtn');
    const newBtn = document.getElementById('newBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    const noteList = document.getElementById('noteList');
    const searchNotesInput = document.getElementById('searchNotes');
    const toggleThemeBtn = document.getElementById('toggleThemeBtn');
    const boldBtn = document.getElementById('boldBtn');
    const italicBtn = document.getElementById('italicBtn');
    const underlineBtn = document.getElementById('underlineBtn');
    const fontSizeSelect = document.getElementById('fontSize');
    const fontColorInput = document.getElementById('fontColor');

    let notes = JSON.parse(localStorage.getItem('notes')) || {};
    let currentNoteId = null;

    // Load notes into the sidebar
    function loadNotes(filter = '') {
        noteList.innerHTML = '';
        Object.keys(notes).forEach(id => {
            const noteTitle = notes[id].title || 'Untitled Note';
            if (noteTitle.toLowerCase().includes(filter.toLowerCase())) {
                const li = document.createElement('li');
                li.textContent = noteTitle;
                li.dataset.id = id;
                li.addEventListener('click', () => loadNoteContent(id));
                noteList.appendChild(li);
            }
        });
    }

    // Load content of a note into the main area
    function loadNoteContent(id) {
        currentNoteId = id;
        const note = notes[id] || { title: '', content: '' };
        noteTitleInput.value = note.title;
        noteContentDiv.innerHTML = note.content;
    }

    // Save the note
    saveBtn.addEventListener('click', () => {
        const title = noteTitleInput.value.trim();
        const content = noteContentDiv.innerHTML.trim();
        if (currentNoteId) {
            notes[currentNoteId] = { title, content };
        } else {
            currentNoteId = Date.now().toString();
            notes[currentNoteId] = { title, content };
        }
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes();
        noteTitleInput.value = '';
        noteContentDiv.innerHTML = '';
        currentNoteId = null;
    });

    // Create a new note
    newBtn.addEventListener('click', () => {
        currentNoteId = null;
        noteTitleInput.value = '';
        noteContentDiv.innerHTML = '';
        noteTitleInput.focus();
    });

    // Delete the note
    deleteBtn.addEventListener('click', () => {
        if (currentNoteId && confirm('Are you sure you want to delete this note?')) {
            delete notes[currentNoteId];
            localStorage.setItem('notes', JSON.stringify(notes));
            loadNotes();
            noteTitleInput.value = '';
            noteContentDiv.innerHTML = '';
            currentNoteId = null;
        }
    });

    // Search notes
    searchNotesInput.addEventListener('input', (event) => {
        loadNotes(event.target.value);
    });

    // Function to toggle dark mode
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        document.querySelector('.sidebar').classList.toggle('dark-mode');
        document.querySelector('.main-content').classList.toggle('dark-mode');
        document.querySelectorAll('button').forEach(btn => btn.classList.toggle('dark-mode'));
        document.getElementById('noteTitle').classList.toggle('dark-mode');
        document.getElementById('noteContent').classList.toggle('dark-mode');

        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
    }

    // Set initial theme based on saved preference
    function setInitialTheme() {
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true') {
            toggleDarkMode();
        }
    }

    toggleThemeBtn.addEventListener('click', toggleDarkMode);
    setInitialTheme();

    // Text formatting
    function toggleFormatting(command, button) {
        document.execCommand(command);
        button.classList.toggle('active');
    }

    boldBtn.addEventListener('click', () => {
        toggleFormatting('bold', boldBtn);
    });

    italicBtn.addEventListener('click', () => {
        toggleFormatting('italic', italicBtn);
    });

    underlineBtn.addEventListener('click', () => {
        toggleFormatting('underline', underlineBtn);
    });

    fontSizeSelect.addEventListener('change', (event) => {
        document.execCommand('fontSize', false, event.target.value);
    });

    fontColorInput.addEventListener('input', (event) => {
        document.execCommand('foreColor', false, event.target.value);
    });

    // Initialize the app
    loadNotes();
});

