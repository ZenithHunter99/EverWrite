document.addEventListener("DOMContentLoaded", displayNotes);

// Save the note in localStorage
function saveNote() {
  const noteText = document.getElementById("noteInput").value;
  if (noteText.trim() === "") {
    alert("Please write something before saving!");
    return;
  }

  const notes = getNotesFromStorage();
  notes.push(noteText);
  localStorage.setItem("notes", JSON.stringify(notes));
  displayNotes();
  document.getElementById("noteInput").value = ""; // Clear the input field
}

// Retrieve notes from localStorage
function getNotesFromStorage() {
  const notes = localStorage.getItem("notes");
  return notes ? JSON.parse(notes) : [];
}

// Display notes
function displayNotes() {
  const notesList = document.getElementById("notesList");
  notesList.innerHTML = ""; // Clear existing notes

  const notes = getNotesFromStorage();
  if (notes.length === 0) {
    notesList.innerHTML = "<p>No notes yet. Start by adding one!</p>";
    return;
  }

  notes.forEach((note, index) => {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");
    noteElement.innerHTML = `<p>${note}</p><button onclick="deleteNote(${index})">Delete</button>`;
    notesList.appendChild(noteElement);
  });
}

// Delete a specific note
function deleteNote(index) {
  const notes = getNotesFromStorage();
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  displayNotes();
}
