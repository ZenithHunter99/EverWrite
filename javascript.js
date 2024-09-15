body {
  margin: 0;
  font-family: Arial, sans-serif;
  display: flex;
  height: 100vh;
  background-color: #f0f0f0;
}

.container {
  display: flex;
  width: 100%;
  height: 100%;
}

.sidebar {
  width: 250px;
  background-color: #333;
  color: #fff;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
}

.sidebar h2 {
  margin-top: 0;
}

#noteList {
  list-style: none;
  padding: 0;
  margin: 0;
}

#noteList li {
  padding: 10px;
  margin: 5px 0;
  background-color: #444;
  cursor: pointer;
  border-radius: 4px;
}

#noteList li:hover {
  background-color: #555;
}

.main-content {
  flex: 1;
  padding: 20px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}

.note-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#noteTitle {
  width: 70%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

#noteContent {
  width: 100%;
  height: calc(100vh - 160px);
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
  margin-top: 10px;
  resize: none;
}

button {
  padding: 10px 20px;
  background-color: #25d366;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #1ebe57;
}
